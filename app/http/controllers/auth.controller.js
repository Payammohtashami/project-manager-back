const { UserModel } = require("../../models/user.model");
const { hashString } = require("../../modules/functions");

class AuthController{
    async register(req, res, next){
        try {
            const { username, password, email, mobile } = req.body;
            const hashPassword = hashString(password);
            const user = await UserModel.create({
                email,
                mobile,
                password: hashPassword,
                username,
                confirm_password: hashPassword
            }).catch(err => {
                if(err?.code === 11000) { 
                    console.log(err);
                    throw {
                        status: 400,
                        message: 'نام کاربری قبلا در سیستم استفاده شده است',
                    };
                } else {
                    console.log(err);
                }; 
            });
            return res.json(user);
        } catch (error) {
            next(error);
        }
    };

    login(req, res, next){

    };

    resetPassword(req, res, next){

    };
};

module.exports = {
    AuthController: new AuthController(),
}