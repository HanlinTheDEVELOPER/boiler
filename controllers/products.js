const Products = require("../models/products");

exports.create = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    console.log(product);
    res.status(201).send(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
