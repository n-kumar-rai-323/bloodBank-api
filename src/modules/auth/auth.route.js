
const express = require("express");
const authRouter = express.Router();
const bodyValidator = require("../../middlewares/request-validator.middleware")
const authController = require("./auth.controller");
const { UserRegisterDTO, loginDTO } = require("./auth.validator");
const uploader = require("../../middlewares/uploader.middleware");
const auth = require("./auth.middleware");

authRouter.post('/register', uploader().single("image"), bodyValidator(UserRegisterDTO), authController.registerUser);
authRouter.get("/activate/:token", authController.activateAccount)
authRouter.post("/login", bodyValidator(loginDTO), authController.loginUser);
authRouter.get("/me", auth(), authController.getLoggedInUserDetail);


module.exports = authRouter;