const Sequelize = require('sequelize');
var Op = Sequelize.Op;
const sequelize = new Sequelize('database', 'pbappstore', 'PB@PP$TORE', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database.sqlite'
});

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

module.exports = {
    createUser: function (user) {
        return User.sync().then(() => {
            return User.create(user);
        });
    },
    getUser: function (email) {
        return User.findOne({
            where: {
                email: email
            }
        });
    }
};