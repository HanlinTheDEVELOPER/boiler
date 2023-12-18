const express = require("express");
const productRoutes = require("./routes/products");
require("./database");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/r", (req, res) => {
  res.send("Hello World");
});

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Node App started");
});
