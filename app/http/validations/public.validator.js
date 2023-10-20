const { param } = require("express-validator");

function mongoIDValidator(){
    return [
        param('id').isMongoId().withMessage('شناسه ارسال شده صحیح نمی باشد')
    ];
};

module.exports = {
    mongoIDValidator,
};