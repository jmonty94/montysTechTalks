const { User, Post, Comment } = require('../models');
const bcrypt = require('bcryptjs');
const sequelize = require('sequelize');


const allUsers = async (req, res) => {
    try {
        const usersInDB = await User.findAll();
        const allUsers = usersInDB.map(user => user.get({ plain: true }));
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getComments = async (req, res) => {
    try {
        const allCommentsFromDb = await Comment.findAll();
        const comments = allCommentsFromDb.map(comment => comment.get({ plain: true }));
        res.status(200).json(comments);
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

const getCommentById = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: `No Comment found with ID: ${commentId}` });
        }
        res.status(200).json(comment);
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

const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const originalComment = await Comment.findByPk(commentId);
        if (!originalComment) {
            return res.status(404).json({ error: `No Comment found with ID: ${commentId}` });
        }
        await Comment.update(
            {
                comment: req.body.comment
            },
            {
                where: {
                    commentId: commentId
                },
            },
        );
        const updatedComment = await Comment.findByPk(commentId);
        res.status(200).json({ original: originalComment, updatedComment: updatedComment });
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
        res.status(200).json({ original: originalPost, updated: updatedPost });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteComment = async (req,res) => {
    try {
        const commentId = req.params.id;
        const comment = Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: `No comment found with ID: ${commentId}`});
        }
        await Comment.destroy({
            where:{
                commentId: commentId
            }
        })
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: `No post found with ID ${postId}`});
        }
        await Post.destroy({
            where: {
                postId: postId
            }
        });
        res.status(200).json({ message: `Successfully Deleted post with ID: ${postId}`, deletedPost: post });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createComment = async (req, res) => {

    try {
        const comment = req.body.comment;
        const postId = req.body.postId;
        const userId = req.session.user.userId;
        if (!userId) {
            return res(400).json("Must be signed in to post comments");
        };
        const newComment = { comment: comment, postId: postId, userId: userId };
        await Comment.create(newComment);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.user.userId
        });
        res.status(200).json(newPost);
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
        console.log(existingUser);
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'invalid credentials' });
        } else {
            req.session.save(() => {
                req.session.user = existingUser;
                req.session.isLoggedIn = true;
                res.json({ success: true });
            });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
}

const signUpUser = async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await User.create(req.body);
        console.log(newUser);
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
    allUsers,
    getComments,
    getPosts,
    getCommentById,
    getPostById,
    updateComment,
    updatePost,
    deleteComment,
    deletePost,
    createComment,
    createPost,
    signInUser,
    signOutUser,
    signUpUser,
}