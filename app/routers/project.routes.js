const uploadMulter = require('../modules/multer');
const { ProjectController } = require('../http/controllers/project.controller');
const { CreateProjectValidator } = require('../http/validations/project.validator');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');

const router = require('express').Router();
router.post(
    '/create-project', 
    CreateProjectValidator(), 
    expressValidatorsMapper,
    uploadMulter.single('image'),
    ProjectController.createProject
);

module.exports = router;