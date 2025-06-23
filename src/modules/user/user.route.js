const userRoute = require("express").Router()
const userCtrl = require("./user.controller")


userRoute.post('/user', userCtrl.user)



module.exports = userRoute