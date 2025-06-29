// src/modules/auth/auth.controller.js

const cloudinarySvc = require("../../services/cloudinary.services");

class AuthController {
    registerUser = async (req, res, next)=>{
        try {
            let payload = req.body;
            let image = await cloudinarySvc.uploadFile(req.file.path, "user/")
            res.json({
                data: {
                    payload,
                    image
                },
                // message: "hello from auth register..",
                // status: "Success",
                // options: null
            });
        } catch (exception) {
            next(exception)
        }
    }

    // loginUser(req, res, next) {
    //     res.json({
    //         data: null,
    //         message: "Login successful!",
    //         status: "Success",
    //         options: null
    //     });
    // }
}

const authControllerInstance = new AuthController();
module.exports = authControllerInstance;