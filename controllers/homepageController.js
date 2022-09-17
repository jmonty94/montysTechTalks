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
    
}
});

module.exports = router;