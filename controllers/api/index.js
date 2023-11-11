const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const newPostRoutes = require('./newpostRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/newpost', newPostRoutes);

module.exports = router;
