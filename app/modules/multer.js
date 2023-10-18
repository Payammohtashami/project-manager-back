const multer = require('multer');
const path = require("path");
const { createPathDirectory } = require('./functions');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, createPathDirectory())
    },
    filename: (req, file, cb) => {
        const fileType = "" + path.extname(file?.originalname ?? "");
        cb(null, Date.now() + fileType)
    },
});

const uploadMulter = multer({storage});
module.exports = uploadMulter;