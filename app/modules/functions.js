const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function hashString (str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
};

function tokenGenerator(payload){
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '30 days'
    });
    return token;
};

function tokenVerify(token){
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY)
        if(!result?.username) {
            throw {
                status: 401,
                message: 'لطفا وارد حساب کاربری خود شوید',
            };
        };
        return result;
    } catch (error) {
        throw {
            status: 401,
            message: 'لطفا وارد حساب کاربری خود شوید',
        };
    }
};

function createPathDirectory(){
    const date = new Date();
    const Year = "" + date.getFullYear();
    const Month = "" + date.getMonth();
    const Day = "" + date.getDay();
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", Year, Month, Day);
    fs.mkdirSync(uploadPath, {recursive: true})
    return path.join("public", "upload", Year, Month, Day);
};

module.exports = {
    hashString,
    tokenVerify,
    tokenGenerator,
    createPathDirectory,
};