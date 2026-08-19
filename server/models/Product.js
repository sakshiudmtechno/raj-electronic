import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Product price is required"],
    },
    mrp: {
      type: String,
      default: "",
    },
    off: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      default: "general",
    },
    brand: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 5,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
