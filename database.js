const mongoose = require("mongoose");
const mongoDb = process.env.DATABASE_URL;

mongoose.connect(mongoDb);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
