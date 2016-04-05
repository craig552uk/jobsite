var bcrypt = require('bcrypt');
var DB     = require('../lib/sequelize');
var Orgs   = require('./organisations');

Users = DB.sequelize.define('Users', {
    username: {type: DB.Sequelize.STRING,  allowNull: false, unique: true},
    password: {type: DB.Sequelize.STRING,  allowNull: false, set: setPassword},
    acl:      {type: DB.Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    name: DB.Sequelize.STRING,
}, {
    instanceMethods: {
        checkPassword: checkPassword,
        checkACL:      checkACL,
    },
    classMethods: {
        authenticate: authenticate,
    },
});

Users.belongsTo(Orgs);


// Enums //

Users.ACL_GOD                = 99; // Everything, Everywhere
Users.ACL_ADMIN              = 40; // CRUD all records in Org and lower
Users.ACL_SPONSOR            = 30; // CRUD own Jobs in Org and lower
Users.ACL_INTERNAL_APPLICANT = 20; // Apply for all Jobs in Org and lower
Users.ACL_EXTERNAL_APPLICANT = 10; // Apply for public Jobs in Org and lower
Users.ACL_NOTHING            =  0; // Nothing


// Instance Methods //

/**
 * Encrypt and store the password
 */
function setPassword(password){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return this.setDataValue('password', hash);
}

/**
 * Validate encrypted password
 */
function checkPassword(password){
    return bcrypt.compareSync(password, this.password);
}

/**
 * Check Users ACL level
 */
function checkACL(min_acl_level){
    return this.acl >= min_acl_level;
}


// Class Methods //

/**
 * Attempt to authenticate a user
 */
function authenticate(username, password){
    return Users.findOne({where:{username:username}}).then(u => {
        return (u && u.checkPassword(password)) ? u : undefined;
    });
}


module.exports = Users;