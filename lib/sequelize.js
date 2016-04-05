var Sequelize = require('sequelize');
var logger    = require('bunyan').createLogger({name:'SQL', level:'debug'});

DB_NAME = '';
DB_USER = '';
DB_PASS = '';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect:'sqlite', 
    storage: 'db.sqlite',
    logging: msg => logger.debug(msg),
});

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;