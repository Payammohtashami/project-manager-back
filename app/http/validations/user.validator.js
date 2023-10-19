const { body } = require('express-validator');
const path = require('path');
function imageValidator(){
    return [
        body('image').custom((value, { req }) => {
            if(Object.keys?.length === 0) throw 'لطفا یک تصویر را انتخاب کنید';
            const ext = path.extname(req.file.originalname);
            const validExt = ['.png', '.jpg', '.jpeg', '.webp'];
            if(!validExt.includes(ext)) throw 'پسوند فایل باید جزء پسوند های png , jpg, jpeg , webp باشد';
            const maxSize = 2 * 1024 * 1024;
            if(req.file.size > maxSize) throw 'حجم فایل نمیتواند بیشتر از 2 مگابایت باشد';
            return true;
        })
    ];
};

module.exports = {
    imageValidator,
};