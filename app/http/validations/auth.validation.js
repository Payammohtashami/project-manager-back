const { body } = require("express-validator");

function registerValidation(){
    return [
        body('username').notEmpty().isLength({min: 4, max: 24}).custom((value, ctx) => {
            if(value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_]/gi;
                if(usernameRegex.test(value)){
                    return true
                } else throw 'نام کاربری صحیح نمی باشد';
            } else throw 'نام کاربر نمی تواند خالی باشد'
        }),
        body('email').isEmail().withMessage('ایمیل وارد شده صحیح نمی باشد'),
        body('mobile').isMobilePhone('fa-IR').withMessage('شماره موبایل وارد شده صحیح نمی باشد'),
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