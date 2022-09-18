const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');


//Root base routes
router.route('/')
.get(apiController.getPosts)
// .post(apiController.createPost)

//ID base routes
router.route('/:id')
.get(apiController.getPostById)
.put(apiController.updatePost)
.delete(apiController.deletePost);



module.exports = router;