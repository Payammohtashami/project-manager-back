const { default: omitEmpty } = require('omit-empty');
const { ProjectModel } = require('../../models/project.model');
const { createLinkForFiles } = require('../../modules/functions');

class ProjectController {
    async createProject(req, res, next){
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
            for(const project of projects){
                project.image = createLinkForFiles(req, project.image);
            }
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
            project.image = createLinkForFiles(req,project.image);
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
    
    async updateProject(req, res, next){
        try {
            let data = omitEmpty(req.body);
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if(!project) throw {
                status: 404,
                message: 'پروژه یافت نشد',
            };
            Object.entries(data).forEach(([key, value]) => {
                if(!['title', 'tags', 'text'].includes(key)) delete data[key];
            });
            const updateResult = await ProjectModel.updateOne({_id: projectId}, {$set: data});
            if(updateResult.matchedCount === 0) throw {
                message: 'بروزرسانی انجام نشد',
                status: 400,
            };
            return res.status(201).json({
                status: 201,
                message: 'بروزرسانی با موفقیت انجام شد',
                data,
            })
        } catch (error) {
            next(error)
        }
    };
    async updateProjectImage(req, res, next){
        try {
            let { image } = req.body;
            const owner = req.user._id;
            const projectId = req.params.id;
            const project = await ProjectModel.findOne({owner, _id: projectId});
            if(!project) throw {
                status: 404,
                message: 'پروژه یافت نشد',
            };
           
            const updateResult = await ProjectModel.updateOne({_id: projectId}, {$set: {image}});
            if(updateResult.matchedCount === 0) throw {
                message: 'بروزرسانی انجام نشد',
                status: 400,
            };
            return res.status(201).json({
                status: 201,
                message: 'بروزرسانی با موفقیت انجام شد',
                data,
            })
        } catch (error) {
            next(error)
        }
    };

    async getProjectByTeam(){

    };

    async getAllProjectsByTeam(){

    };

    async getProjectOfUser(){

    };
};

module.exports = {
    ProjectController: new ProjectController(),
}