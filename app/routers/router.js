const { Router } = require('express');
const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');
const teamRoutes = require('./team.routes');
const userRoutes = require('./user.routes');

const router = Router();


router.use('/auth', authRoutes);
// router.use('/team', teamRoutes);
// router.use('/user', userRoutes);
// router.use('/project', projectRoutes);

module.exports = router;