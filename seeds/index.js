const { Comment, Post, User } = require('./../models');
const sequelize = require('./../config/connection');
const users = require('./users');

const seeder = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    process.exit(0);
};


(async () => {
    await seeder();
})();