const { body } = require("express-validator");
const { UserModel } = require("../../models/user.model");

function registerValidation(){
    return [
        body('username').notEmpty().isLength({min: 4, max: 24}).custom(async (value, ctx) => {
            if(value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_]/gi;
                if(usernameRegex.test(value)){
                    const user = await UserModel.findOne({username: value});
                    if(!!user) throw 'نام کاربری وارد شده تکراری می باشد'
                    return true;
                } else throw 'نام کاربری صحیح نمی باشد';
            } else throw 'نام کاربر نمی تواند خالی باشد'
        }),
        body('email').isEmail().withMessage('ایمیل وارد شده صحیح نمی باشد').custom(async (value, ctx) => {
            const user = await UserModel.findOne({email: value});
            if(!!user) throw 'ایمیل وارد شده تکراری می باشد'
            return true;
        }),
        body('mobile').isMobilePhone('fa-IR').withMessage('شماره موبایل وارد شده صحیح نمی باشد').custom(async (value, ctx) => {
            const user = await UserModel.findOne({mobile: value});
            if(!!user) throw 'شماره موبایل وارد شده تکراری می باشد'
            return true;
        }),
        body('password').isLength({min: 6, max: 32}).withMessage('رمز عبور حداقل باید 6 و حداکثر باید 32 کاراکتر باشد')
            .custom((value, ctx) => {
                if(!value) throw 'رمز عبور نمی تواند خالی باشد';
                if(value !== ctx.req.body.confirm_password) throw 'رمز عبور با تکرار آن یکسان نمی باشند';
                return true;
            }
        ),
    ];
};

module.exports = {
    registerValidation
};