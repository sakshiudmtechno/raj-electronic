import { Product } from "../models/Product.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Ensure data directory exists for persistent local backup storage
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const productsFilePath = path.join(dataDir, "products.json");

// Default initial catalog
const defaultSeedProducts = [
  {
    _id: "prod_1",
    title: "Eveready 9W LED Bulb B22 6500K Cool Day Light (4 Bulbs Value Pack)",
    price: "₹299",
    mrp: "₹499",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-3.png",
    category: "ledBulbs",
    brand: "Eveready",
    inStock: true,
    isFeatured: true,
    rating: 4.8,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_2",
    title: "Surya Turbo Inverter Lamp 10W B22 — Upto 4 Hrs Backup, 25000 Hrs Life",
    price: "₹549",
    mrp: "₹899",
    off: "39% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-29.png",
    category: "ledBulbs",
    brand: "Surya",
    inStock: true,
    isFeatured: false,
    rating: 4.6,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_3",
    title: "MZ M982 Pro LED Torch 200W High Power Rechargeable Telescopic Zoom",
    price: "₹1,299",
    mrp: "₹1,799",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-4.png",
    category: "torches",
    brand: "MZ",
    inStock: true,
    isFeatured: true,
    rating: 4.9,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_4",
    title: "MZ M035-C LED Torch 120 Lumen Rechargeable Long Range Focus Beam",
    price: "₹499",
    mrp: "₹799",
    off: "37% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-5.png",
    category: "torches",
    brand: "MZ",
    inStock: true,
    isFeatured: false,
    rating: 4.5,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_5",
    title: "PowerCell LED Torch 9712B 0.75W Bright White Light",
    price: "₹149",
    mrp: "₹249",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-8.png",
    category: "torches",
    brand: "PowerCell",
    inStock: true,
    isFeatured: false,
    rating: 4.4,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_6",
    title: "Unibeam Dhurandar LED Torch — Rahe Kare Roshan",
    price: "₹179",
    mrp: "₹299",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-9.png",
    category: "torches",
    brand: "Unibeam",
    inStock: true,
    isFeatured: false,
    rating: 4.6,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_7",
    title: "Eveready DL40 0.5W Torch — Give Me Red (Free 3 AA Batteries)",
    price: "₹199",
    mrp: "₹299",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-10.png",
    category: "torches",
    brand: "Eveready",
    inStock: true,
    isFeatured: false,
    rating: 4.7,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_8",
    title: "LAMAT LM-7704 Metal Torch 120W Zooming Head 1200mAh Type-C",
    price: "₹599",
    mrp: "₹999",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-15.png",
    category: "torches",
    brand: "LAMAT",
    inStock: true,
    isFeatured: false,
    rating: 4.8,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_9",
    title: "Vioia Portable Geyser — Instant Water Heater for Hard & Soft Water",
    price: "₹1,999",
    mrp: "₹2,999",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-6.png",
    category: "kitchenAppliances",
    brand: "Vioia",
    inStock: true,
    isFeatured: true,
    rating: 4.9,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_10",
    title: "Spare King G-Coil Hot Plate 1 Year Warranty — Fast Heating Stainless Steel",
    price: "₹1,850",
    mrp: "₹2,499",
    off: "26% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-7.png",
    category: "kitchenAppliances",
    brand: "Spare King",
    inStock: true,
    isFeatured: false,
    rating: 4.6,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_11",
    title: "BLU Berry Infrared Cooker — Crystal Glass, 4-Digit Display, Time Control",
    price: "₹2,499",
    mrp: "₹3,499",
    off: "29% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-12.png",
    category: "kitchenAppliances",
    brand: "BLU Berry",
    inStock: true,
    isFeatured: false,
    rating: 4.7,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_12",
    title: "Surya Sizzle Storage Water Heater / Geyser — Power Saver",
    price: "₹6,499",
    mrp: "₹8,999",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-31.png",
    category: "kitchenAppliances",
    brand: "Surya",
    inStock: true,
    isFeatured: false,
    rating: 4.8,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_13",
    title: "Reliable Evoke LED Street Light 36W IP65 Streetlight",
    price: "₹1,499",
    mrp: "₹2,199",
    off: "32% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-11.png",
    category: "streetLights",
    brand: "Reliable",
    inStock: true,
    isFeatured: false,
    rating: 4.5,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_14",
    title: "Reliable Evoke LED Street Light 50W IP65 Streetlight",
    price: "₹1,899",
    mrp: "₹2,699",
    off: "30% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-11.png",
    category: "streetLights",
    brand: "Reliable",
    inStock: true,
    isFeatured: false,
    rating: 4.6,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: "prod_15",
    title: "Sturmax 50W LED Flood Light IP66 — Outdoor Weatherproof",
    price: "₹1,199",
    mrp: "₹1,799",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-19.png",
    category: "streetLights",
    brand: "Sturmax",
    inStock: true,
    isFeatured: false,
    rating: 4.7,
    reviews: [],
    createdAt: new Date().toISOString(),
  },
];

// Helper to load products from disk
function getPersistentProducts() {
  if (fs.existsSync(productsFilePath)) {
    try {
      const data = fs.readFileSync(productsFilePath, "utf8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading products.json:", e.message);
    }
  }
  savePersistentProducts(defaultSeedProducts);
  return defaultSeedProducts;
}

// Helper to save products to disk
function savePersistentProducts(products) {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing products.json:", e.message);
  }
}

// Helper to filter product array
function filterLocalProducts(products, category, search, brand) {
  return products.filter((p) => {
    let matchCat = !category || p.category === category;
    let matchBrand = !brand || (p.brand && p.brand.toLowerCase().includes(brand.toLowerCase()));
    let matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));

    return matchCat && matchBrand && matchSearch;
  });
}

// @desc    Get all products (with optional filtering)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, search, brand } = req.query;

    if (mongoose.connection.readyState === 1) {
      try {
        let query = {};
        if (category) query.category = category;
        if (brand) query.brand = { $regex: brand, $options: "i" };
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
          ];
        }
        const products = await Product.find(query).sort({ createdAt: -1 });
        if (products && products.length > 0) return res.json(products);
      } catch (dbErr) {
        console.warn("DB fetch failed, using persistent products.json catalog:", dbErr.message);
      }
    }

    // Fallback to persistent disk file store
    const persistentList = getPersistentProducts();
    const filtered = filterLocalProducts(persistentList, category, search, brand);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findById(req.params.id);
        if (product) return res.json(product);
      } catch (e) {}
    }

    const persistentList = getPersistentProducts();
    const localItem = persistentList.find((p) => p._id === req.params.id);
    if (!localItem) return res.status(404).json({ message: "Product not found" });
    res.json(localItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res) => {
  try {
    const { title, price, mrp, off, img, category, brand, description, inStock, isFeatured } = req.body;

    if (!title || !price || !img || !category) {
      return res.status(400).json({ message: "Please provide title, price, img, and category" });
    }

    const newProductObj = {
      _id: "prod_" + Date.now(),
      title,
      price,
      mrp: mrp || "",
      off: off || "",
      img,
      category,
      brand: brand || "",
      description: description || "",
      inStock: inStock !== undefined ? inStock : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      rating: 5,
      reviews: [],
      createdAt: new Date().toISOString(),
    };

    // Save to persistent disk file
    const list = getPersistentProducts();
    list.unshift(newProductObj);
    savePersistentProducts(list);

    if (mongoose.connection.readyState === 1) {
      try {
        const dbProd = new Product({
          title,
          price,
          mrp: mrp || "",
          off: off || "",
          img,
          category,
          brand: brand || "",
          description: description || "",
          inStock: inStock !== undefined ? inStock : true,
          isFeatured: isFeatured !== undefined ? isFeatured : false,
          rating: 5,
          reviews: [],
        });
        const saved = await dbProd.save();
        return res.status(201).json(saved);
      } catch (dbErr) {
        console.warn("DB product save failed, saved to persistent file store:", dbErr.message);
      }
    }

    res.status(201).json(newProductObj);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Update in persistent disk file
    const list = getPersistentProducts();
    const idx = list.findIndex((p) => p._id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body };
      savePersistentProducts(list);
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findById(id);
        if (product) {
          Object.assign(product, req.body);
          const updated = await product.save();
          return res.json(updated);
        }
      } catch (e) {}
    }

    if (idx !== -1) {
      return res.json(list[idx]);
    }

    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    // Remove from persistent disk file
    let list = getPersistentProducts();
    list = list.filter((p) => p._id !== id);
    savePersistentProducts(list);

    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findById(id);
        if (product) {
          await product.deleteOne();
        }
      } catch (e) {}
    }

    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add review to product
// @route   POST /api/products/:id/reviews
// @access  Public
export const addReview = async (req, res) => {
  try {
    const { customerName, rating, comment } = req.body;
    const id = req.params.id;

    const review = {
      customerName: customerName || "Customer",
      rating: Number(rating) || 5,
      comment: comment || "Great quality product!",
      createdAt: new Date(),
    };

    const list = getPersistentProducts();
    const idx = list.findIndex((p) => p._id === id);
    if (idx !== -1) {
      list[idx].reviews.push(review);
      const avg =
        list[idx].reviews.reduce((acc, item) => item.rating + acc, 0) / list[idx].reviews.length;
      list[idx].rating = Number(avg.toFixed(1));
      savePersistentProducts(list);
    }

    if (mongoose.connection.readyState === 1) {
      try {
        const product = await Product.findById(id);
        if (product) {
          product.reviews.push(review);
          const avgRating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
          product.rating = Number(avgRating.toFixed(1));
          await product.save();
          return res.status(201).json({ message: "Review added successfully", product });
        }
      } catch (e) {}
    }

    if (idx !== -1) {
      return res.status(201).json({ message: "Review added successfully", product: list[idx] });
    }

    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};


