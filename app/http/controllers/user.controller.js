const omitEmpty = require('omit-empty');
const { UserModel } = require("../../models/user.model");
const { createLinkForFiles } = require('../../modules/functions');

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            user.profile_image = createLinkForFiles(req, user.profile_image);
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

    async uploadProfileImage(req, res, next){
        try {
            const userId = req.user._id;
            if(Object.keys(req.file) === 0) throw 'لطفا یک تصویر را انتخاب کنید';
            const filePath = req.file?.path.replace('\\\\', '/').substring(7);
            const result = await UserModel.updateOne({_id: userId}, {$set: {profile_image: filePath}});
            if(result.modifiedCount === 0) throw 'به روز رسانی انجام نشد';
            return res.status(200).json({
                status: 200,
                messgae: 'به روز رسانی با موفقیت انجام شد',
            });
        } catch (error) {
            next(error)
        }
    };

    addSkilles(){

    };

    editSkilles(){

    };

    async changeStatusRequest(req, res, next){
        try {
            const { id, status } = req.params;
            const request = await UserModel.findOne({"inviteRequest._id": id});
            if(!request) throw { status: 404, message: 'درخواستی با این مشخصات یافت نشد', };
            const findRequest = request.inviteRequest.find((item) => item?.id === id);
            if(findRequest.status !== 'PENDING') throw { status: 400, message: 'این درخواست قبلا رد یا قبول شده است'};
            if(!["ACCEPTED", "REJETED"].includes(status)) throw {
                status: 400,
                message: 'اطلاعات ارسال شده صحیح نمی باشد',
            };
            const updateResult = await UserModel.updateOne({'inviteRequest._id': id}, {
                $set: {
                    "inviteRequest.$.status": status
                }
            });
            if(updateResult.modifiedCount === 0) throw {
                status: 500,
                message: 'تغییر درخواست عضویت انجام نشد',
            };
            return res.status(200).json({
                status: 200,
                message: 'تغییر درخواست وضعیت با موفقیت انجام شد',
            });
        } catch (error) {
            next(error);
        };
    };

    rejectInviteInTeam(){

    };

    
};

module.exports = {
    UserController: new UserController(),
};