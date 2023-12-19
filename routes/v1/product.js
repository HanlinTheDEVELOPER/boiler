const express = require("express");

const PostController = require("../../controllers/product");

const productRoutes = express.Router();

productRoutes.use((req, res, next) => {
  console.log("Product middleware");
  next();
});

productRoutes.get("/", PostController.index);
productRoutes.post("/", PostController.create);

module.exports = productRoutes;
