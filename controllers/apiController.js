const { User, Post, Comment } = require('../models');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');

const createPost = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getPosts = async (req, res) => {
    try {
        const allPostsFromDb = await Post.findAll({
            attributes: [
                'postId',
                'title',
                'content',
            ]
        });
        const posts = allPostsFromDb.map(post => post.get({ plain: true }));
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: `No post found with ID ${postId}` });
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const originalPost = await Post.findByPk(postId);
        if (!originalPost) {
            return res.status(404).json({ error: `No post found with ID ${postId}` });
        }
        await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: { postId: postId }
            },
        );
        const updatedPost = await Post.findByPk(postId);
        res.status(200).json({ original: originalPost, updated: updatedPost});
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        console.log(post);
        if (!post) {
            return res.status(404).json({ error: `No post found with ID ${postId}` });            
        }
        await Post.destroy({
            where: {
                postId: postId
            }
        });
        res.status(200).json({message: `Successfully Deleted post with ID: ${postId}`, deletedPost: post});
    } catch (error) {
        res.status(500).json({ error });
    }
};

const signInUser = async (req, res) => {
    try {
        //console.log(req.body);
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!existingUser) {
            return res.status(401).json({ error: 'invalid credentials' });
        }
        //console.log(existingUser);
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        //console.log(passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'invalid credentials' });
        } else {
            //console.log('outside saving cookie');
            req.session.save(() => {
                //console.log("saving user to cookie");
                req.session.user = existingUser;
                req.session.isLoggedIn = true;
                res.json({ success: true });
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

const signUpUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json({ success: true })
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const signOutUser = async (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
            res.json({ success: true });
        });
    }
}


module.exports = {
    deletePost,
    getPosts,
    getPostById,
    signInUser,
    signOutUser,
    signUpUser,
    updatePost,
}