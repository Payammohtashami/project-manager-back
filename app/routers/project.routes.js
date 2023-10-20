const fileUpload = require('express-fileupload');
const { mongoIDValidator } = require('../http/validations/public.validator');
const { ProjectController } = require('../http/controllers/project.controller');
const { CreateProjectValidator } = require('../http/validations/project.validator');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');

const router = require('express').Router();

router.post('/create', fileUpload, CreateProjectValidator(), expressValidatorsMapper, ProjectController.createProject);
router.get('/list', ProjectController.getAllProjects)
router.get('/:id', mongoIDValidator(), expressValidatorsMapper, ProjectController.getProjectById)
router.delete('/remove/:id', mongoIDValidator(), expressValidatorsMapper, ProjectController.removeProject)
router.put('/edit/:id', expressValidatorsMapper, ProjectController.updateProject)

module.exports = router;