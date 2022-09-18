const router = require('express').Router();
const apiController = require('./../../../controllers/apiController');

router.route('/signin').post(apiController.signInUser);
router.route('/signout').post(apiController.signOutUser);
router.route('/signup').post(apiController.signUpUser);
// router.route('/posts/:username/').post(apiController.getPostsFromUser);

module.exports = router;