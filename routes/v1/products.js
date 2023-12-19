const express = require("express");

const { create, index } = require("../../controllers/products");

const productRoutes = express.Router();

productRoutes.use((req, res, next) => {
  console.log("Product middleware");
  next();
});

productRoutes.get("/", index);
productRoutes.post("/", create);

module.exports = productRoutes;
