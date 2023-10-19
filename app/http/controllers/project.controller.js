const { ProjectModel } = require('../../models/project.model');

class ProjectController {
    async createProject(req, res, next){
        console.log(req.body);
        try {
            const { title, text, image } = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({ text, owner, title, image });
            if(!result) throw {
                status: 400,
                message: 'روند افزودن پروژه با مشکل مواجه شد',
            };
            return res.status(201).json({
                status: 201,
                message: 'پروژه با موفقیت ایجاد شد',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    getAllProjects(){

    };

    getProjectById(){

    };

    getProjectByTeam(){

    };

    getAllProjectsByTeam(){

    };

    getProjectOfUser(){

    };

    updateProject(){

    };

    removeProject(){

    };
};

module.exports = {
    ProjectController: new ProjectController(),
}