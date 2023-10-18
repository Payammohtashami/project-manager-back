class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                data: user,
                status: 200,
            });
        } catch (error) {
            next(error)
        }
    };

    editProfie(){

    };

    addSkilles(){

    };

    editSkilles(){

    };

    acceptInviteInTeam(){

    };

    rejectInviteInTeam(){

    };

    
};

module.exports = {
    UserController: new UserController(),
};