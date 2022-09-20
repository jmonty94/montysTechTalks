const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');


// Root based routes

router.route('/')
.get(apiController.getComments)
.post(apiController.createComment);

// ID based routes
router.route(':/id')
.get(apiController.getCommentById)
.put(apiController.updateComment)
.delete(apiController.deleteComment);

module.exports = router