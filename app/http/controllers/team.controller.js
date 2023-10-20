const { TeamModel } = require("../../models/team.model");

class TeamController {
    async createTeam(req, res, next){
        try {
            const { name, username, description } = req.body;
            const owner = req.user._id;
            const teamResult = await TeamModel.create({
                name,
                owner,
                username,
                description,
            });
            if(!teamResult) throw {status: 500, message: 'تیم موردنظر ایجاد نشد'};
            return res.status(201).json({
                message: 'تیم با موفقیت ایجاد شد',
                status: 201,
                data: teamResult,
            })
        } catch (error) {
            
        }
    };

    async getListOfTeam(req, res, next){
        try {
            const teams = await TeamModel.find({});
            if(teams.length === 0) throw 'هیج تیمی یافت نشد';
            return res.status(200).json({
                status: 200,
                data: teams,
            })
        } catch (error) {
            next(error)
        }
    };

    inviteUserToTeam(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        };
    };

    removeTeamById(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        };
    };

    updateTeam(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        };
    };

    removeUserFromTeam(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        };
    };
};

module.exports = {
    TeamController: new TeamController(),
};