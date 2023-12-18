const mongoose = require("mongoose");

/**
 * Schema for product documents in MongoDB.
 * Defines required fields and types for product name, price,
 * description, category, and image.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("products", productSchema);
module.exports = Products;
