const express = require("express");

const PostController = require("../../controllers/product");
const { isAdmin } = require("../../middlewares/isAdmin");

const productRoutes = express.Router();

productRoutes.get("/", PostController.index);
productRoutes.post("/", isAdmin, PostController.create);

module.exports = productRoutes;
