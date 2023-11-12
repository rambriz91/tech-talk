const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const PostRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/post', PostRoutes);

module.exports = router;
