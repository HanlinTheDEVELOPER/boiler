const express = require("express");
const AuthController = require("../../controllers/auth");

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/logout", AuthController.logout);

module.exports = authRoutes;
