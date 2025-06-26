
const express = require("express");
const authRouter = express.Router();
const bodyValidator=require("../../middlewares/request-validator.middleware")
const authController = require("./auth.controller");

const {UserRegisterDTO}=require("./auth.validator")

authRouter.post('/register',bodyValidator(UserRegisterDTO), authController.registerUser);

authRouter.post('/login', authController.loginUser);

module.exports = authRouter;