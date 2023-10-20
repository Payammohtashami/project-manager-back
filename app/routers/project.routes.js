const fileUpload = require('express-fileupload');
const { uploadFile } = require('../modules/express-fileupload');
const { mongoIDValidator } = require('../http/validations/public.validator');
const { ProjectController } = require('../http/controllers/project.controller');
const { CreateProjectValidator } = require('../http/validations/project.validator');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');

const router = require('express').Router();

router.post('/create', fileUpload(), uploadFile, CreateProjectValidator(), expressValidatorsMapper, ProjectController.createProject);
router.get('/list', ProjectController.getAllProjects)
router.get('/:id', mongoIDValidator(), expressValidatorsMapper, ProjectController.getProjectById)
router.delete('/remove/:id', mongoIDValidator(), expressValidatorsMapper, ProjectController.removeProject)
router.put('/edit/:id', expressValidatorsMapper, ProjectController.updateProject)
router.patch('/edit-image/:id', fileUpload(), uploadFile, expressValidatorsMapper, ProjectController.updateProjectImage)

module.exports = router;