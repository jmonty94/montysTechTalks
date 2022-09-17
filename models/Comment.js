const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
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
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'comments',
    },
);

module.exports = Comment;