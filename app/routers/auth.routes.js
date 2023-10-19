const { Router } = require('express');
const { registerValidator, loginValidator } = require('../http/validations/auth.validator');
const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');


const router = Router();
router.post('/login', loginValidator(), expressValidatorsMapper, AuthController.login);
router.post('/register', registerValidator(), expressValidatorsMapper, AuthController.register);


module.exports = router;