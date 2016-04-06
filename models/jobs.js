var DB    = require('../lib/sequelize');
var Orgs  = require('./organisations');
var Users = require('./users');

Jobs = DB.sequelize.define('jobs', {
    name: DB.Sequelize.STRING,
});

Jobs.belongsTo(Orgs);
Jobs.belongsTo(Users); // The job sponsor

module.exports = Jobs;