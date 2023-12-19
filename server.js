const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

require("./database");
const productRoutes_v1 = require("./routes/v1/product");
const authRoutes_v1 = require("./routes/v1/auth");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

const store = new MongoStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center;'>Hello World</h1>");
});

app.use("/api/v1", router);

router.use(authRoutes_v1);
router.use("/products", productRoutes_v1);

app.listen(3000, () => {
  console.log("Node App started");
});
