var DB   = require('../lib/sequelize');
var Orgs = require('./organisations');
var Users = require('./users');
var Jobs = require('./jobs');

Applications = DB.sequelize.define('applications', {
    form_data: {type: DB.Sequelize.STRING, defaultValue:'{}'}, // JSON serialised form field data
});

Applications.belongsTo(Orgs);
Applications.belongsTo(Users); // The applicant
Applications.belongsTo(Jobs);  // The job being applied for

module.exports = Applications;