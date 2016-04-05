var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');

Applications = DB.sequelize.define('applications', {
    name: DB.Sequelize.STRING,
});

Applications.belongsTo(Orgs);

module.exports = Applications;