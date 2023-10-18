const omitEmpty = require('omit-empty');
const { UserModel } = require("../../models/user.model");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                data: user,
                status: 200,
            });
        } catch (error) {
            next(error)
        }
    };

    async editProfie(req, res, next){
        try {
            let data = omitEmpty(req.body);
            const userId = req.user?._id;
            let fields = ["first_name", "last_name", "skills"];
            Object.entries(data).forEach(([key, value]) => {
                if(!fields.includes(key)) delete data[key];
            });
            const result = await UserModel.updateOne({_id: userId}, {$set: data});
            if(result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    message: "به روز رسانی پروفایل با موفقیت انجام شد",
                    data,
                });
            };
            throw {
                status: 400,
                message: "به روز رسانی انجام نشد",
            };
        } catch (error) {
            next(error);
        }
    };

    addSkilles(){

    };

    editSkilles(){

    };

    acceptInviteInTeam(){

    };

    rejectInviteInTeam(){

    };

    
};

module.exports = {
    UserController: new UserController(),
};