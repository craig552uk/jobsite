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
        instanceMethods: {
            toJSON: function(){
                // Format for JSON API
                var modelName = this.$modelOptions.name.plural;
                return {type: modelName, id: this.id, properties: this.dataValues}
            }
        }
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
    return model.findAll().then(items => items.map(item => item.toJSON()));
}

/**
 * Return a model or 404
 */
module.exports.model.item = function(model, where){
    return model.findOne({where: where}).then(item => {
        return item.toJSON() || HTTPError.NotFound();
    });
}

/**
 * Create and return a model or 401
 */
module.exports.model.create = function(model, data){
    return model.create(data).then(item => item.toJSON());
}

/**
 * Update and return a model or 401
 */
module.exports.model.update = function(model, where, data){
    return model.update(data, {where: where}).then(() => module.exports.model.item(model, id));
}

/**
 * Delete a model, return success or 404
 */
module.exports.model.delete = function(model, where){
    return model.destroy({where: where}).then(rows => {
        return (rows == 0) ? HTTPError.NotFound() : {type: model.name, ids:[where.id]};
    });
}
