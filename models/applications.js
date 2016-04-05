var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');

Applications = DB.sequelize.define('Applications', {
    name: DB.Sequelize.STRING,
});

Applications.belongsTo(Orgs);

module.exports = Applications;