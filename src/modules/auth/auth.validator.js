const Joi = require("joi")
const { UserRole, bloodType } = require("../../config/constants")

const UserRegisterDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().allow(Joi.ref('password')).required(),
    countryCode:Joi.string(),
    phone:Joi.number().min(10).max(10),
    blood: Joi.string().allow(bloodType.A_POSITIVE, bloodType.A_NEGATIVE, bloodType.B_POSITIVE, bloodType.B_NEGATIVE, bloodType.AB_POSITIVE, bloodType.AB_NEGATIVE, bloodType.O_POSITIVE, bloodType.O_NEGATIVE).required(),
    role: Joi.string().allow(UserRole.ADMIN, UserRole.SELLER, UserRole.CUSTOMER).default(UserRole.CUSTOMER)
})

module.exports = { UserRegisterDTO }