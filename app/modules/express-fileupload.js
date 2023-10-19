const fileUpload = require('express-fileupload');
const path = require('path');
const { createPathDirectory } = require('./functions');

async function uploadFile(req, res, next){
    fileUpload();
    if(!req?.file || Object.keys(req.file).length === 0) throw 'تصویر مورد نظر یافت نشد';
    let image = req.file?.image;
    const imagepath = path.join(createPathDirectory,  Date.now() + path.extname(image.name));
    let uploadPath = path.join(__dirname, '..', '..', 'public', imagepath);
    req.body.image = uploadPath;
    image.mv(uploadPath, (err) => {
        if(!!err) throw {status: 500, message: 'بارگزاری تصویر انجام نشد',}
        next();
    });
};

module.exports = {
    uploadFile,
};