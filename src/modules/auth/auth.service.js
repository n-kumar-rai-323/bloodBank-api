const { UserStatus } = require("../../config/constants");
const BaseService = require("../../services/base.service");
const cloudinarySvc = require("../../services/cloudinary.services");
const randdomStringGenerate = require("../../utilities/helplers");
const UserModel = require("../user/user.model")
const bcrypt = require("bcryptjs")
const emailSvc = require("../../services/email.service");
const { AppConfig } = require("../../config/config");

class AuthService extends BaseService {
    transformUserData = async (req) => {
        try {
            let payload = req.body;
            payload.image = await cloudinarySvc.uploadFile(req.file.path, "user/")
            payload.password = bcrypt.hashSync(payload.password, 12)

            payload.status = UserStatus.INACTIVE
            payload.activationCode = randdomStringGenerate(100)
            return payload
        } catch (exception) {
            throw (exception)
        }
    }

    activationNotify = async (user) => {
        try {
            const response = await emailSvc.sendEmail({
                // ...existing code...
                to: user.email,
                sub: "Activate Your Account!!!",
                message: `
                <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 32px;">
                    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
                        <h2 style="color: #d32f2f; margin-bottom: 16px;">Welcome to BloodBank!</h2>
                        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
                        <p style="font-size: 16px; color: #333;">
                            Congratulations! Your account has been registered.<br>
                            Your username is: <strong>${user.email}</strong>.
                        </p>
                        <p style="font-size: 16px; color: #333;">
                            To activate your account, please click the button below or copy and paste the link into your browser:
                        </p>
                        <div style="text-align: center; margin: 24px 0;">
                            <a href="${AppConfig.frontUrl}activate/${user.activationCode}"
                               style="background: #d32f2f; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 4px; font-size: 16px; display: inline-block;">
                               Activate Account
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #555; word-break: break-all;">
                            ${AppConfig.frontUrl}activate/${user.activationCode}
                        </p>
                        <hr style="margin: 32px 0;">
                        <p style="font-size: 14px; color: #888;">
                            Regards,<br>
                            <strong>System Support</strong><br>
                            <small>
                                Do not reply to this email directly. If you need to communicate, please contact the admin or support.
                            </small>
                        </p>
                    </div>
                </div>
                `

            })
        } catch (exception) {
            throw exception
        }
    }

    notifyActivationSuccess = async (user) => {
        try {
            return await emailSvc.sendEmail({
                to: user.email,
                sub: "Account Activated Successfully!!!",
                message: `
                <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 32px;">
                    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 32px;">
                        <h2 style="color: #d32f2f; margin-bottom: 16px;">Account Activated!</h2>
                        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
                        <p style="font-size: 16px; color: #333;">
                            Your account has been activated successfully! You can now log in and start using our services.
                        </p>
                        <div style="text-align: center; margin: 24px 0;">
                            <a href="${AppConfig.frontUrl}login"
                               style="background: #d32f2f; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 4px; font-size: 16px; display: inline-block;">
                               Go to Login
                            </a>
                        </div>
                        <p style="font-size: 14px; color: #555; word-break: break-all;">
                            ${AppConfig.frontUrl}login
                        </p>
                        <hr style="margin: 32px 0;">
                        <p style="font-size: 14px; color: #888;">
                            Regards,<br>
                            <strong>System Support</strong><br>
                            <small>
                                Do not reply to this email directly. If you need to communicate, please contact the admin or support.
                            </small>
                        </p>
                    </div>
                </div>
                `
            })
        } catch (exception) {
            throw exception
        }
    }

    getUserPublicProfile = async (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            phone: user.phone,
            bloodGroup: user.bloodGroup,
            address: user.address,
            gender: user.gender
        }
    }
}

const authSvc = new AuthService(UserModel)
module.exports = authSvc