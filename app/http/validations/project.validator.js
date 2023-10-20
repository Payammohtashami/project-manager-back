const { body } = require("express-validator");

function CreateProjectValidator(){
    return [
        body('title').notEmpty().withMessage('عنوان نمی تواند خالی باشد').isLength({min: 6, max: 48}),
        body('tags').isArray({min: 0, max: 10}).withMessage('حداکثر تعداد هشتگ ها 10 تا می باشد'),
        body('text').notEmpty().withMessage('توضیحات نمی تواند خالی باشد').isLength({min: 20}).withMessage('توضیحات حداقل باید 20 کاراکتر باشد'),
    ];
};

module.exports = {
    CreateProjectValidator,
};