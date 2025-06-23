

const express = require("express");
const authRouter = express.Router();

const authController = require("./auth.controller");

authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);
console.log("I a from Auth Router")
module.exports = authRouter;