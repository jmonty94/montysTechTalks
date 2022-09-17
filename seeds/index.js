const { Comment, Post, User } = require('./../models');
const sequelize = require('./../config/connection');
const posts = require('./posts')
const users = require('./users');
const comments = require('./comments');

const seeder = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    const allUsers = await User.findAll({
        attributes: ['userId']
    });
        //setting userID to each post
        let userindex = 0;
        for(let i=0; i<posts.length; i++) {
            userindex++;
            if(userindex === allUsers.length) {
                userindex = 0;
            }
            posts[i].userId = allUsers[userindex].dataValues.userId;
        }
    
        //seeding posts
        await Post.bulkCreate(posts);
    const allPosts = await Post.findAll({
        attributes: ['postId'],
    });
    let postindex = 0;
    userindex = 0;
    for(let i=0; i<comments.length; i++) {
        if(i !== 0 && i%3 === 0) {
            postindex++;
        }
        userindex++;
        if(userindex == allUsers.length) {
            userindex = 0;
        }
        //console.log(`postindex: ${postindex}, userindex:${userindex}`);
        comments[i].postID = allPosts[postindex].dataValues.postID;
        comments[i].userID = allUsers[userindex].dataValues.userID;
    };
    process.exit(0);
};


(async () => {
    await seeder();
})();