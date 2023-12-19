const express = require("express");

const { login, logout } = require("../../controllers/auth");

const authRoutes = express.Router();

authRoutes.get("/login", login);
authRoutes.get("/logout", logout);

module.exports = authRoutes;
