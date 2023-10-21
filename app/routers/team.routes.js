const { TeamController } = require('../http/controllers/team.controller');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');
const { mongoIDValidator } = require('../http/validations/public.validator');
const { CreateTeamValidator } = require('../http/validations/team.validator');

const router = require('express').Router();

router.post('/create', CreateTeamValidator(), expressValidatorsMapper, TeamController.createTeam);
router.get('/my-teams', expressValidatorsMapper, TeamController.getMyTeams);
router.get('/list', expressValidatorsMapper, TeamController.getListOfTeam);
router.get('/requests', expressValidatorsMapper, TeamController.getAllRequest);
router.get('/requests/:status', expressValidatorsMapper, TeamController.getRequestByStatus);
router.get('/invite/:teamID/:username', expressValidatorsMapper, TeamController.inviteUserToTeam);
router.delete('/remove/:id',mongoIDValidator(), expressValidatorsMapper, TeamController.removeTeamById);
router.get('/:id',mongoIDValidator(), expressValidatorsMapper, TeamController.getTeamById);

module.exports = router;