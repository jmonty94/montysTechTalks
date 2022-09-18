const router = require('express').Router();
// const apiController = require('./apiContoller');
const { User, Post } = require('./../models');


router.get('/', async (req,res) => {
try {
    const postsFromDB = await Post.findAll();
    const posts = postsFromDB.map(post => post.get({plain: true}));
    res.render('homepage',{
        posts
    })
} catch (error) {
    res.status(500).json({ error })
}
});

router.get('/signin', async (req, res) => {
    res.render('signin');
});

router.get('/signup', async (req,res) => {
    res.render('signup');
});


module.exports = router;