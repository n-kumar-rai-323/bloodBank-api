const fs = require("fs")
const bcrypt = require("bcryptjs")
const cloudinarySvc = require("../../services/cloudinary.services");

class AuthController {
    registerUser = async (req, res, next) => {
        try {
            
            let payload = req.body;
            payload.image = await cloudinarySvc.uploadFile(req.file.path, "user/")
            payload.password = bcrypt.hashSync(payload.password, 12)





            res.json({
                data: {
                    payload
                },
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