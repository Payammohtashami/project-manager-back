const router = require('express').Router();
const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');
const teamRoutes = require('./team.routes');
const userRoutes = require('./user.routes');


router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);

module.exports = {
    AllRoutes: router,
}