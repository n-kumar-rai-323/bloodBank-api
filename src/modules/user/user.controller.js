class UserController {
    user = (req, res, next) => {
res.json({
    data:null,
    message:"From User",
    status:"Success",
    options:null
})
    }
}

const userCtrl = new UserController()

module.exports = userCtrl