const { TeamController } = require('../http/controllers/team.controller');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');
const { CreateTeamValidator } = require('../http/validations/team.validator');

const router = require('express').Router();

router.post('/create', CreateTeamValidator(), expressValidatorsMapper, TeamController.createTeam);
router.get('/list', expressValidatorsMapper, TeamController.getListOfTeam);

module.exports = router;