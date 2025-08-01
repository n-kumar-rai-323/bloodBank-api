const userSvc = require("./user.service");

class UserController {
   async getAllUsersList(req,res,next) {
        try {
            let {data, pagination}=await userSvc.getAllRowsByFilter()
            res.json({
                data:data,
                status: "SUCCESS",
                message: "All users fetched successfully.",
                options: {
                    pagination:pagination
                }
            })
        } catch (exception) {
            next(exception);
        }
    }
}

const userCtrl = new UserController();
module.exports = userCtrl;