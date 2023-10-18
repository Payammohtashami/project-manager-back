const { UserController } = require('../http/controllers/user.controller');
const checkLogin = require('../http/middlewares/autoLogin');

const router = require('express').Router();

router.get('/profile', checkLogin, UserController.getProfile);
router.put('/profile', checkLogin, UserController.editProfie);
module.exports = router;