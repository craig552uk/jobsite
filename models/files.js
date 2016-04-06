var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');
var Jobs = require('./jobs');
var Apps = require('./applications');

Files = DB.sequelize.define('files', {
    name: DB.Sequelize.STRING,
    mime: DB.Sequelize.STRING,
    url:  DB.Sequelize.STRING,
    size: DB.Sequelize.INTEGER,
});

Files.belongsTo(Orgs);
Files.belongsTo(Jobs); // A File for a Job -or-
Files.belongsTo(Apps); // A File for an application

module.exports = Files;