var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');

Jobs = DB.sequelize.define('Jobs', {
    name: DB.Sequelize.STRING,
});

Jobs.belongsTo(Orgs);

module.exports = Jobs;