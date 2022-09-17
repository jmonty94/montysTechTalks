const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init(
    {
        postId: {
            type: DataTypes.UUID,
            primaryKey: true,

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        modelName: 'posts',
    },
);


module.exports = Post;