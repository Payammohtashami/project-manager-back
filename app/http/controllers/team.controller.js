const { TeamModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");

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

    async getTeamById(req, res, next){
        try {
            const teamID = req.params.id;
            const teamResult = await TeamModel.findOne({_id: teamID});
            if(!teamResult) throw {
                status: 404,
                message: 'تیم یافت نشد',
            };
            return res.status(200).json({
                status: 200,
                data: teamResult,
            });
        } catch (error) {
            next(error);
        };
    };

    async getMyTeams(req, res, next){
        const userID = req.user._id  
        try {
            const teams = await TeamModel.find({
                $or: [
                    {owner: userID},
                    {users: userID},
                ]
            });
            return res.status(200).json({
                status: 200,
                data: teams
            })
        } catch (error) {
            next(error);
        }
    };
    
    async removeTeamById(req, res, next){
        try {
            const teamID = req.params.id;
            const teamResult = await TeamModel.findOne({_id: teamID});
            if(!teamResult) throw {
                status: 404,
                message: 'تیم یافت نشد',
            };
            const result = await TeamModel.deleteOne({_id: teamID});
            if(result.deletedCount === 0) throw {
                status: 500,
                message: 'تیم حذف نشد',
            };
            return res.status(201).json({
                status: 201,
                message: 'تیم با موفقیت انجام شد',
            });
        } catch (error) {
            next(error)
        };
    };

    async getRequestByStatus(req, res, next){
        try {
            const { status } = req.params;
            const userID = req.user._id;
            const requests = await UserModel.aggregate([
                {$match: {_id: userID, }},
                {$project: {
                    _id: 0,
                    inviteRequest: 1, 
                    inviteRequest: {
                        $filter: {
                            input: "$inviteRequest",
                            as: "request",
                            cond: {
                                $eq: ["$$request.status", status]
                            },
                        }
                    },
                }},
            ]);
            return res.status(200).json({
                status: 200,
                data: requests?.[0]?.inviteRequest || [],
            });
        } catch (error) {
            next(error);
        }
    };
    
    async inviteUserToTeam(req, res, next){
        try {
            const userID = req.user._id;
            const { teamID, username } = req.params;
            const team = await TeamModel.findOne({
                $or: [{owner: userID}, {users: userID}], 
                _id: teamID
            });
            if(!team) throw {
                status: 404,
                message: 'تیم مورد نظر یافت نشد',
            };
            const user = await UserModel.findOne({username});
            if(!user) throw {
                status: 404,
                message: 'کاربر موردنظر جهت دعوت به تیم یافت نشد',
            };
            const request = {
                teamID,
                status: 'PENDING',
                caller: req.user.username,
                requestDate: new Date(),
            };
            const updateUserResult = await UserModel.updateOne({username}, {
                $push: {inviteRequest: request},
            });
            if(updateUserResult.matchedCount === 0) throw {
                ststua: 500,
                messgae: 'ثبت درخواست دعوت انجام نشد',
            };
            return res.status(200).json({
                status: 200,
                messgae: 'ثبت درخواست با موفقیت ایجاد شد',
            });
        } catch (error) {
            next(error)
        };
    };

    async getAllRequest(req, res, next){
        try {
            const userID = req.user._id;
            const requests = await UserModel.findById(userID, {inviteRequest: 1});
            return res.status(200).json({
                status: 200,
                data: requests,
            });
        } catch (error) {
            next(error);
        };
    }
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