const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

// Use user routes
router.use('/api/users', userRoutes);

// Use thought routes
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;
