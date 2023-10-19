const { body } = require("express-validator");

function CreateProjectValidator(){
    return [
        body('title').notEmpty().withMessage('عنوان نمی تواند خالی باشد').isLength({min: 6, max: 48}),
        body('text').notEmpty().withMessage('توضیحات نمی تواند خالی باشد').isLength({min: 20}).withMessage('توضیحات حداقل باید 20 کاراکتر باشد'),
    ];
};

module.exports = {
    CreateProjectValidator,
};