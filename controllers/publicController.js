const router = require('express').Router();
// const apiController = require('./apiContoller');
const { User, Post } = require('../models');


const getHomePage = async function (req,res) {
    const signedIn = req.session.isLoggedIn;
    let currentUser;
    if (req.session.user) {
        currentUser = (req.session.user.username) ? req.session.user.username : undefined
    }
try {
    const postsFromDB = await Post.findAll();
    const posts = postsFromDB.map(post => post.get({plain: true}));
    res.render('homepage',{
        posts,
        signedIn,
        currentUser,
    })
} catch (error) {
    res.status(500).json({ error })
}
};

const getSignInPage = async function (req, res) {
    res.render('signin');
};

const getSignUpPage = async function (req,res) {
    res.render('signup');
};


module.exports = {
    getHomePage,
    getSignInPage,
    getSignUpPage
};