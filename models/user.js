const e = require("express");
const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      // select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reset_password_token: String,
    token_expire_time: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
