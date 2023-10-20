const fileUpload = require('express-fileupload');
const path = require('path');
const { createPathDirectory } = require('./functions');

async function uploadFile(req, res, next){
    try {
        fileUpload();
        if(!req?.file || Object.keys(req.file).length === 0) throw {ststus: 400, message: 'تصویر مورد نظر یافت نشد'};
        let image = req.file?.image;
        const imageType = path.extname(image.name);
        if(!['.png', '.jpeg', '.jpg', '.webp'].includes(imageType)) throw 'فرمت فایل ارسال شده صحیح نمی باشد'
        const image_path = path.join(createPathDirectory(),  (Date.now() + imageType));
        req.body.image = image_path.substring(7);
        let uploadPath = path.join(__dirname, '..', '..', image_path);
        image.mv(uploadPath, (err) => {
            if(!!err) throw {status: 500, message: 'بارگزاری تصویر انجام نشد',}
            next();
        });
    } catch (error) {
        next(error)        
    }
};

module.exports = {
    uploadFile,
};