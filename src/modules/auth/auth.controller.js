// src/modules/auth/auth.controller.js

class AuthController {
    registerUser(req, res, next) {
        res.json({
            data: null,
            message: "hello from auth register..",
            status: "Success",
            options: null
        });
    }

    loginUser(req, res, next) {
        res.json({
            message: "Login successful!",
            status: "Success"
        });
    }
}

const authControllerInstance = new AuthController();
module.exports = authControllerInstance;