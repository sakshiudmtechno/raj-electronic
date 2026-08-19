import express from "express";
import { Order } from "../models/Order.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const router = express.Router();

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const ordersFilePath = path.join(dataDir, "orders.json");

const defaultSeedOrders = [
  {
    _id: "order_1",
    orderId: "ORD-928104",
    customerName: "Rahul Sharma",
    customerPhone: "9876543210",
    customerAddress: "123 Main Street, Sector 15",
    city: "Jaipur",
    pincode: "302015",
    items: [
      {
        title: "Eveready 9W LED Bulb B22 6500K Cool Day Light (4 Bulbs Value Pack)",
        price: "₹299",
        qty: 2,
        img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-3.png",
      },
    ],
    totalAmount: 598,
    paymentMethod: "Cash on Delivery (COD)",
    paymentStatus: "Pending (COD)",
    transactionId: "",
    orderStatus: "Processing",
    createdAt: new Date().toISOString(),
  },
];

function getPersistentOrders() {
  if (fs.existsSync(ordersFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(ordersFilePath, "utf8"));
    } catch (e) {
      console.error("Error reading orders.json:", e.message);
    }
  }
  savePersistentOrders(defaultSeedOrders);
  return defaultSeedOrders;
}

function savePersistentOrders(orders) {
  try {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing orders.json:", e.message);
  }
}

// 1. Create a new order (Public Customer Checkout & Online Payment Gateway)
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      customerAddress,
      city,
      pincode,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    if (!customerName || !customerPhone || !customerAddress || !items || items.length === 0) {
      return res.status(400).json({ message: "Please fill in all required customer and order details!" });
    }

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrderObj = {
      _id: "order_" + Date.now(),
      orderId,
      customerName,
      customerPhone,
      customerAddress,
      city: city || "Local",
      pincode: pincode || "",
      items,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "Cash on Delivery (COD)",
      paymentStatus: paymentStatus || (paymentMethod?.includes("COD") ? "Pending (COD)" : "Paid"),
      transactionId: transactionId || "",
      orderStatus: "Pending",
      createdAt: new Date().toISOString(),
    };

    const orders = getPersistentOrders();
    orders.unshift(newOrderObj);
    savePersistentOrders(orders);

    if (mongoose.connection.readyState === 1) {
      try {
        const dbOrder = await Order.create({
          orderId,
          customerName,
          customerPhone,
          customerAddress,
          city: city || "Local",
          pincode: pincode || "",
          items,
          totalAmount: Number(totalAmount) || 0,
          paymentMethod: paymentMethod || "Cash on Delivery (COD)",
          paymentStatus: paymentStatus || (paymentMethod?.includes("COD") ? "Pending (COD)" : "Paid"),
          transactionId: transactionId || "",
          orderStatus: "Pending",
        });
        console.log(`🛍️ New Order Placed: ${orderId} by ${customerName}`);
        return res.status(201).json({ message: "Order placed successfully!", order: dbOrder });
      } catch (dbErr) {
        console.warn("DB Order save failed, saved to persistent file store:", dbErr.message);
      }
    }

    console.log(`🛍️ New Order Placed (Persistent File): ${orderId} by ${customerName}`);
    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrderObj,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Failed to place order. " + error.message });
  }
});

// 2. Track order by Order ID or Phone number (Public)
router.get("/track/:query", async (req, res) => {
  try {
    const q = req.params.query.trim().toLowerCase();

    if (mongoose.connection.readyState === 1) {
      try {
        const orders = await Order.find({
          $or: [
            { orderId: { $regex: q, $options: "i" } },
            { customerPhone: { $regex: q, $options: "i" } },
          ],
        }).sort({ createdAt: -1 });

        if (orders && orders.length > 0) return res.json(orders);
      } catch (e) {}
    }

    const orders = getPersistentOrders();
    const matches = orders.filter(
      (o) =>
        (o.orderId && o.orderId.toLowerCase().includes(q)) ||
        (o.customerPhone && o.customerPhone.includes(q))
    );

    if (matches.length === 0) {
      return res.status(404).json({ message: "No matching orders found. Please check your Order ID or Phone Number." });
    }
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Failed to track order", error: error.message });
  }
});

// 3. Get all orders (Admin protected or dev access fallback)
router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.json(orders);
      } catch (e) {}
    }
    const orders = getPersistentOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// 4. Update order status (Admin)
router.put("/:id/status", async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const id = req.params.id;

    const orders = getPersistentOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].orderStatus = orderStatus;
      savePersistentOrders(orders);
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
        if (order) return res.json(order);
      } catch (e) {}
    }

    if (idx !== -1) return res.json(orders[idx]);
    res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status" });
  }
});

// 5. Delete order (Admin)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let orders = getPersistentOrders();
    orders = orders.filter((o) => o._id !== id);
    savePersistentOrders(orders);

    if (mongoose.connection.readyState === 1) {
      try {
        await Order.findByIdAndDelete(id);
      } catch (e) {}
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;


