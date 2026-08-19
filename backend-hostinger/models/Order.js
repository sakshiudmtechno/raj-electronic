import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  img: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      default: "Store Local",
    },
    pincode: {
      type: String,
      default: "",
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery (COD)",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    transactionId: {
      type: String,
      default: "",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
