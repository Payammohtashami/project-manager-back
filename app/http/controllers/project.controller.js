const { ProjectModel } = require('../../models/project.model');

class ProjectController {
    async createProject(req, res, next){
        console.log(req);
        try {
            const { title, text, image, tags } = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({ text, owner, title, image, tags });
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

    async getAllProjects(req, res, next){
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({owner});
            return res.status(200).json({
                status: 200,
                data: projects,
            });
        } catch (error) {
            next(error);
        }
    };

    async getProjectById(req, res, next){
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if(!project) throw {
                status: 404,
                message: 'پروژه یافت نشد',
            };
            return res.status(200).json({
                status: 200,
                data: project,
            })
        } catch (error) {
            next(error);
        }
    };

    async removeProject(req, res, next){
        try {
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if(!project) throw {
                status: 404,
                message: 'پروژه یافت نشد',
            };
            const deleteProjectResult = await ProjectModel.deleteOne({_id: projectId});
            if(deleteProjectResult?.deletedCount === 0) throw {
                status: 400,
                message: 'پروژه حذف نشد',
            };
            return res.status(201).json({
                status: 201,
                message: 'پروژه با موفقیت حذف شد',
            })
        } catch (error) {
            next(error);
        }
    };

    getProjectByTeam(){

    };

    getAllProjectsByTeam(){

    };

    getProjectOfUser(){

    };

    updateProject(){

    };
};

module.exports = {
    ProjectController: new ProjectController(),
}