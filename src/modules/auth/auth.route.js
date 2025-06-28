
const express = require("express");
const authRouter = express.Router();
const bodyValidator=require("../../middlewares/request-validator.middleware")
const authController = require("./auth.controller");
const {UserRegisterDTO}=require("./auth.validator");
const uploader = require("../../middlewares/uploader.middleware");

authRouter.post('/register',bodyValidator(UserRegisterDTO), authController.registerUser);



module.exports = authRouter;