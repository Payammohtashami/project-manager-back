const { Router } = require('express');
const { registerValidation, loginValidation } = require('../http/validations/auth.validation');
const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');
const router = Router();
router.post('/register', registerValidation(), expressValidatorsMapper, AuthController.register)
router.post('/login', loginValidation(), expressValidatorsMapper, AuthController.login)
module.exports = router;