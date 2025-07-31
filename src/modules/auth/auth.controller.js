const { UserStatus } = require("../../config/constants");
const authSvc = require("./auth.service");

class AuthController {
    registerUser = async (req, res, next) => {
        try {

            const payload = await authSvc.transformUserData(req)
            const userObj = await authSvc.dataStore(payload)
            await authSvc.activationNotify(userObj)


            res.json({
                data: userObj,
                message: "Your account has been registered successfully.",
                status: "REGISTERED_SUCCESS",
                options: null
            });
        } catch (exception) {

            next(exception)
        }
    }

   // ...existing code...
    activateAccount = async (req, res, next) => {
        try {
            const token = req.params.token;
            let userinfo = await authSvc.getSingleRowByFilter({ activationCode: token });
            if (!userinfo) {
                throw {
                    status: 404,
                    message: "Invalid activation code.",
                    options: null
                };
            }
            userinfo = await authSvc.updateOneRowByFilter(
                { _id: userinfo._id },
                { activationCode: null, status: UserStatus.ACTIVE }
            );
            await authSvc.notifyActivationSuccess(userinfo);
            res.json({
                data:null,
                message: "Your account has been activated successfully.",
                status: "ACCOUNT_ACTIVATED",
                options: null
            });
        } catch (exception) {
            next(exception)
        }
    }
}

const authControllerInstance = new AuthController();
module.exports = authControllerInstance;