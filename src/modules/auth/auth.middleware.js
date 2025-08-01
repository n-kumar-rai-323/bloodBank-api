const jwt = require("jsonwebtoken");
const { AppConfig } = require("../../config/config");
const authSvc = require("./auth.service");
const { UserRole } = require("../../config/constants");
const auth = (role = null) => {
    return async (req, res, next) => {
        try {
            let token = req.headers["authorization"];
            if (!token) {
                throw {
                    code: 401,
                    message: "Unauthorized access, token is missing",
                    status: "UNAUTHORIZED"
                }
            }
            token = token.split(" ").pop();
            const data = jwt.verify(token, AppConfig.jwtSecret);

            if (data.typ !== "Bearer") {
                throw {
                    code: 403,
                    message: "Unauthorized access, invalid token type",
                    status: "ACCESS_DENIED"
                }
            }

            const userDetail = await authSvc.getSingleRowByFilter({
                _id: data.sub
            })
            if (!userDetail) {
                throw {
                    code: 404,
                    message: "User not found",
                    status: "NOT_FOUND"
                }
            }
            const profile =req.loggedInUser = authSvc.getUserPublicProfile(userDetail)
            console.log(profile)

            if (userDetail.role === UserRole.ADMIN || role === null || role.includes(userDetail.role)) {
                next();
            } else {
                throw {
                    code: 403,
                    message: "You are not authorized to access this resource",
                    status: "FORBIDDEN"
                }
            }

        } catch (exception) {
            let code = exception.code || 500;
            let message = exception.message || "Internal server error";
            next({
                code: code,
                message: message,
                status: "ERROR"
            });
        }
    }
}

module.exports = auth;  