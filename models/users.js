var bcrypt = require('bcrypt');
var DB     = require('../lib/sequelize');
var Orgs   = require('./organisations');

Users = DB.sequelize.define('users', {
    username: {type: DB.Sequelize.STRING,  allowNull: false, unique: true},
    password: {type: DB.Sequelize.STRING,  allowNull: false, set: setPassword},
    acl:      {type: DB.Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    source:   {type: DB.Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    name: DB.Sequelize.STRING,
}, {
    instanceMethods: {
        checkPassword: checkPassword,
        checkACL:      checkACL,
        toJSON:        toJSON,
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

Users.SOURCE_FACEBOOK        =  4; // User created via facebook login
Users.SOURCE_TWITTER         =  3; // User created via twitter login
Users.SOURCE_GOOGLE          =  2; // User created via google login
Users.SOURCE_LDAP            =  1; // User created via LDAP login
Users.SOURCE_SIGNUP          =  0; // User created via signup form

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

/**
 * JSON representation
 * Excludes password field
 */
function toJSON(){
    var modelName  = this.$modelOptions.name.plural;
    var dataValues = this.dataValues;
    delete dataValues.password;
    return {type: modelName, id: this.id, properties: dataValues}
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