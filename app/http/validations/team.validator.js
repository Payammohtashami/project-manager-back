const { body, param } = require("express-validator");
const { TeamModel } = require("../../models/team.model");

function CreateTeamValidator(){
    return [
        body('name').notEmpty().isLength({min: 6}).withMessage('نام تیم حداقل باید 6 کاراکتر باشد'),
        body('username').custom( async (username, ctx) => {
            if(username.match(/^[a-zA-z]+[a-z0-9\_\.]{3,}/)){
                const team = await TeamModel.findOne({username});
                if(team) throw 'نام کاربری قبلا توسط تیم دیگری استفاده شده است';
                return true;
            }
            else throw 'نام کاربری به طور صحیح وارد کنید';
        }),
        body('description').notEmpty().withMessage('توضیحات نمی تواند خالی باشد'),
    ];
};

module.exports = {
    CreateTeamValidator,
};