const uploadMulter = require('../modules/multer');
const { UserController } = require('../http/controllers/user.controller');
const { imageValidator } = require('../http/validations/user.validation');
const { expressValidatorsMapper } = require('../http/middlewares/check-error');

const router = require('express').Router();

router.get(
    '/profile', 
    UserController.getProfile,
);

router.put(
    '/profile', 
    UserController.editProfie,
);

router.put(
    '/profile-avatar',
    uploadMulter.single('image'),
    imageValidator(),
    expressValidatorsMapper,
    UserController.uploadProfileImage,
);
module.exports = router;