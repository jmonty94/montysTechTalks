const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
    {
        commentId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        postId: {
            type: DataTypes.UUID,
            references: {
                model: 'posts',
                key: 'postId',
            },
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'userId',
            },
        },
    },
    {
        sequelize,
        modelName: 'comments',
    },
);

module.exports = Comment;