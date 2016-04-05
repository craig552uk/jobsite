var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');

Users = DB.sequelize.define('Users', {
    name: DB.Sequelize.STRING,
});

Users.belongsTo(Orgs);

module.exports = Users;