const { Router } = require('express');
const { registerValidation } = require('../http/validations/auth.validation');
const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');
const router = Router();
router.post('/register', registerValidation(), expressValidatorsMapper, AuthController.register)
module.exports = router;