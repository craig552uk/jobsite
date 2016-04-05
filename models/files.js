var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');

Files = DB.sequelize.define('Files', {
    name: DB.Sequelize.STRING,
});

Files.belongsTo(Orgs);

module.exports = Files;