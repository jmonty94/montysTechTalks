const { Comment, Post, User } = require('./../models');
const sequelize = require('./../config/connection');

const seeder = async () => {
    await sequelize.sync({ force: true });
    process.exit(0);
};


(async () => {
    await seeder();
})();