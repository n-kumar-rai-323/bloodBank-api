// src/modules/auth/auth.controller.js

class AuthController {
    registerUser(req, res, next) {
        let result = req.body;
        res.json({
            data: result,
            message: "hello from auth register..",
            status: "Success",
            options: null
        });
    }

    loginUser(req, res, next) {
        res.json({
            data:null,
            message: "Login successful!",
            status: "Success",
            options:null
        });
    }
}

const authControllerInstance = new AuthController();
console.log("i am from Auth Controller")
module.exports = authControllerInstance;