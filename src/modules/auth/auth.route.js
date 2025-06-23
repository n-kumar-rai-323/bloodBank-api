

const express = require("express");
const authRouter = express.Router();

const authController = require("./auth.controller");

authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);

module.exports = authRouter;