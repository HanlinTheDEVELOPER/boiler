const express = require("express");
const { create } = require("../controllers/products");

const productRoutes = express.Router();

productRoutes.use((req, res, next) => {
  console.log("Product middleware");
  next();
});

productRoutes.post("/", create);

module.exports = productRoutes;
