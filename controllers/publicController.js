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
            'createdAt',
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
    console.log(comments, 86);
    res.render('post', {
        post,
        signedIn,
        currentUser,
        comments
    });

};

const getUpdatePost = async (req,res) => {
    const signedIn = req.session.isLoggedIn;
    let currentUser;
    if (req.session.user) {
        currentUser = (req.session.user.username) ? req.session.user.username : undefined
    }
    const postId = req.params.postId;
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
    res.render('updatePost', 
    {
        post, signedIn, currentUser
    })
};

const getUserPage = async (req,res) => {
    const signedIn = req.session.isLoggedIn;
    const user = req.session.user
    const postData = await Post.findAll({
        attributes: [
            'postId',
            'title',
            'content',
            'createdAt',
            [
                sequelize.literal(`(SELECT username FROM users WHERE posts.userId = users.userId)`),
                'username',
            ],
        ],
        where: {
            userid: user.userId
        },
    })
    const posts = postData.map(post => post.get({plain: true}))
    const username = user.username
    res.render('user', {
        signedIn, user, username, posts
    })
};

const getUserPost = async (req, res) => {
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
            'createdAt',
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
    console.log(comments, 86);
    res.render('userPost', {
        post,
        signedIn,
        currentUser,
        comments
    });

};

module.exports = {
    getCreatePost,
    getHomePage,
    getUserPost,
    getPostPage,
    getUpdatePost,
    getSignInPage,
    getSignUpPage,
    getUserPage
};