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