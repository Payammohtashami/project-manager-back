const { UserModel } = require("../../models/user.model");
const { hashString, tokenGenerator } = require("../../modules/functions");
const bcrypt = require('bcrypt')

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

    async login(req, res, next){
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({username});
            if(!user) throw {
                status: 401,
                message: 'نام کاربری یا رمز عبور صحیح نمی باشند',
            };
            const compareResult = bcrypt.compareSync(password, user.password);
            if(!compareResult){
                throw {
                    status: 401,
                    message: 'نام کاربری یا رمز عبور صحیح نمی باشند',
                };
            } else {
                res.status(200).json({
                    status: 200,
                    message: 'شما با موفقیت وارد حساب کاربری خود شدید',
                    token: tokenGenerator({username}),
                });
            }
        } catch (error) {
            next(error);
        };
    };

    resetPassword(req, res, next){

    };
};

module.exports = {
    AuthController: new AuthController(),
}