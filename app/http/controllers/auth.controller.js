class AuthController{
    register(req, res, next){
        const { username, password, email, mobile } = req.body;
        return res.json(req);
    };

    login(req, res, next){

    };

    resetPassword(req, res, next){

    };
};

module.exports = {
    AuthController: new AuthController(),
}