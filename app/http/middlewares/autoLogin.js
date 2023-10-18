const { UserModel } = require("../../models/user.model");
const { tokenVerify } = require("../../modules/functions");

const checkLogin = async (req, res, next) => {
    try {
        const authError = {
            status: 401,
            message: 'لطفا وارد حساب کاربری خود شوید',
        }
        const authorization = req.headers.authorization ?? null;
        if(!authorization) throw authError;
        let token = authorization.split(" ");
        if(!token[1]) throw authError;
        const { username } = tokenVerify(token[1]);
        const user = await UserModel.findOne({username}, {password: 0});
        if(!user) throw authError;
        req.user = user;
        return next();
    } catch (error) {
        next(error);        
    };
};

module.exports = checkLogin;