const router = require('express').Router();

// const postRoutes = require('./postRoutes');
// const commentRoutes = require('./commentRoutes');
// const imageRoutes = require('./imageRoutes');
const userRoutes = require('./userRoutes');

// router.use('/posts',postRoutes);
// router.use('/comments',commentRoutes);
// router.use('/images',imageRoutes);
router.use('/users',userRoutes);

module.exports = router;
