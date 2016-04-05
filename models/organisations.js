var DB = require('../lib/sequelize');

Organisations = DB.sequelize.define('organisations', {
    name: DB.Sequelize.STRING,
});

module.exports = Organisations;