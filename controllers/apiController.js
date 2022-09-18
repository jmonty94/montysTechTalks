const {User, Post, Comment} = require('../models');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');

const getPost = async (req,res) => {
    try {
        const allPostsFromDb = await Post.findAll({
            attributes: [
                'postId',
                'title',
                'content',
            ]
        });
        const posts = allPostsFromDb.map(post => post.get({plain: true}));
        res.status.json
    } catch (error) {
        res.status(500).json({error});
    }
};

const signInUser = async (req,res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid Credentials'})           ;
        }
        const passwordMatch = await bcrypt.compare(req.body.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Credentials'});
        } else {
            req.session.save(() => {
                req.session.user = existingUser;
                req.session.isLoggedIn = true;
                res.json({success: true});
            });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
};

const signUpUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json({success: true})
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
};