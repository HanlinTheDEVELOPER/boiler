const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/**
 * Schema for product documents in MongoDB.
 * Defines required fields and types for product name, price,
 * description, category, and image.
 */
const productSchema = new Schema(
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
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const Products = model("products", productSchema);
module.exports = Products;
