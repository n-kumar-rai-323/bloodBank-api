const { AppConfig } = require("../../config/config");
const { UserStatus } = require("../../config/constants");
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
                data: null,
                message: "Your account has been activated successfully.",
                status: "ACCOUNT_ACTIVATED",
                options: null
            });
        } catch (exception) {
            next(exception)
        }
    }

    loginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const userDetail = await authSvc.getSingleRowByFilter({ email: email });
            if (!userDetail) {
                throw {
                    code: 422,
                    message: "Invalid email or password.",
                    status: "NOT_FOUND",
                };
            }
            if (!bcrypt.compareSync(password, userDetail.password)) {
                throw {
                    code: 401,
                    message: "Invalid email or password.",
                    status: "UNAUTHORIZED",
                    options: null
                };
            }
            if (userDetail.status !== UserStatus.ACTIVE || userDetail.activationCode !== null) {
                throw {
                    code: 403,
                    message: "Account is not active.",
                    status: "FORBIDDEN",
                };
            }
            let accessToken = jwt.sign({
                sub: userDetail._id,
                typ: "Bearer"
            }, AppConfig.jwtSecret, {
                expiresIn: "1hr"
            })
            let refreshToken = jwt.sign({
                sub: userDetail._id,
                typ: "Refresh"
            }, AppConfig.jwtSecret, {
                expiresIn: "2hr"
            })
            res.json({
                data: { accessToken, refreshToken },
                message: "Login successful.",
                status: "LOGIN_SUCCESS",
                options: null
            });
        } catch (exception) {
            next(exception)
        }
    }

    getLoggedInUserDetail = async (req, res, next) => {
        try {
            res.json({
                data: await req.loggedInUser,
                message: "User profile fetched successfully.",
                status: "PROFILE_FETCHED",
          
            })
        } catch (exception) {
            next(exception)
        }
    }
}

const authControllerInstance = new AuthController();
module.exports = authControllerInstance;