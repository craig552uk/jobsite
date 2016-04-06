var Sequelize = require('sequelize');
var logger    = require('bunyan').createLogger({name:'SQL', level:'debug'});
var HTTPError = require('http-errors');

DB_NAME = '';
DB_USER = '';
DB_PASS = '';

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect:'sqlite', 
    storage: 'db.sqlite',
    logging: msg => logger.debug(msg),
    define: {
        underscored: true,
    }
});

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

// Helpers for working with models in HTTP routes
// All return Promises which resolve to the affected model(s) or an HTTP error
module.exports.model = {};

/**
 * Return all models or []
 */
module.exports.model.list = function(model){
    return model.findAll();
}

/**
 * Return a model or 404
 */
module.exports.model.item = function(model, where){
    return model.findOne({where: where}).then(item => {
        return item || HTTPError.NotFound();
    });
}

/**
 * Create and return a model or 401
 */
module.exports.model.create = function(model, data){
    return model.create(data);
}

/**
 * Update and return a model or 401
 */
module.exports.model.update = function(model, where, data){
    return model.update(data, {where: where}).then(() => modelItem(model, id));
}

/**
 * Delete a model, return success or 404
 */
module.exports.model.delete = function(model, where, type){
    return model.destroy({where: where}).then(rows => {
        return (rows == 0) ? HTTPError.NotFound() : {type: type, ids:[where.id]};
    });
}
