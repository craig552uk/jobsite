var DB = require('../lib/sequelize');

Organisations = DB.sequelize.define('organisations', {
    name: {type: DB.Sequelize.STRING, allowNull: false},
});

module.exports = Organisations;