const router = require('express').Router();
// const apiController = require('./apiContoller');
const { Comment, User, Post,  } = require('../models');
const sequelize = require('sequelize')


const getHomePage = async function (req, res) {
    const signedIn = req.session.isLoggedIn;
    let currentUser;
    if (req.session.user) {
        currentUser = (req.session.user.username) ? req.session.user.username : undefined
    }
    try {
        const postsFromDB = await Post.findAll();
        const posts = postsFromDB.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            signedIn,
            currentUser,
        })
    } catch (error) {
        res.status(500).json({ error })
    }
};

const getCreatePost = async (req, res) => {
    const signedIn = req.session.isLoggedIn;
    let currentUser;
    if (req.session.user) {
        currentUser = (req.session.user.username) ? req.session.user.username : undefined
    }
    res.render('createPost', {
        currentUser,
        signedIn
    });
};

const getSignInPage = async function (req, res) {
    res.render('signin');
};

const getSignUpPage = async function (req, res) {
    res.render('signup');
};

const getPostPage = async (req, res) => {
    const postId = req.params.postId;
    const signedIn = req.session.isLoggedIn;
    let currentUser;
    if (req.session.user) {
        currentUser = (req.session.user.username) ? req.session.user.username : undefined
    }
    const postData = await Post.findByPk(postId, {
        attributes: [
            'postId',
            'title',
            'content',
            [
                sequelize.literal(`(SELECT username FROM users WHERE posts.userId = users.userId)`),
                'username',
            ],
        ]
    });
    const post = postData.get({ plain: true });
    const commentData = await Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        attributes: [
                    'commentId',
                    'comment',
                    'postId'
                ],
        include: [
            {
                model: User,
                attributes: {
                    exclude: [
                        'userId',
                        'password',
                        'createdAt',
                        'updatedAt',
                    ]
                }
            },
        ],
        where: {
            postId: postId,
        }
    });
    const comments = commentData.map(comment => comment.get({plain: true}));
    res.render('post', {
        post,
        signedIn,
        currentUser,
        comments
    });

};



module.exports = {
    getCreatePost,
    getHomePage,
    getPostPage,
    getSignInPage,
    getSignUpPage
};