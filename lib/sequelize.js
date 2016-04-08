var Sequelize = require('sequelize');
var HTTPError = require('http-errors');
var config    = require('./config');
var logger    = require('bunyan').createLogger({name: 'SQL', level: config.logging.level});

// Config or defaults
config.database          = config.database          || {};
config.database.database = config.database.database || '';
config.database.username = config.database.username || '';
config.database.password = config.database.password || '';

config.database.logging = function(msg){ logger.debug(msg) };

config.database.define = {
    underscored: true,
    instanceMethods: {},
    classMethods: {},
}

/**
 * Format model data for JSON API
 */
config.database.define.instanceMethods.toJSON = function(){
    var json = {
        type:       this.$modelOptions.name.plural, 
        id:         this.id, 
        properties: this.dataValues, 
    };

    if(json.type === 'organisations'){
        json.links = {self: `${config.hostname}/api/orgs/${this.id}/`};
    }

    if(this.organisation_id){
        json.links = {
            self:         `${config.hostname}/api/orgs/${this.organisation_id}/${json.type}/${this.id}/`,
            organisation: `${config.hostname}/api/orgs/${this.organisation_id}/`,
        }
    }

    return json;
}

var sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
module.exports.define    = config.database.define;

// Helpers for working with models in HTTP routes
// All return Promises which resolve to the affected model(s) or an HTTP error
module.exports.model = {};

/**
 * Return all models or []
 */
module.exports.model.list = function(model, where){
    where = where || {};
    return model.findAll({where:where}).then(items => items.map(item => item.toJSON()));
}

/**
 * Return a model or 404
 */
module.exports.model.item = function(model, where){
    return model.findOne({where: where}).then(item => {
        return (item && item.toJSON()) || HTTPError.NotFound();
    });
}

/**
 * Create and return a model or 404
 */
module.exports.model.create = function(model, data){
    // Prevent defining these attributes
    delete data.id;
    delete data.organisation_id;
    delete data.created_at;
    delete data.updated_at;
    return model.create(data).then(item => item.toJSON());
}

/**
 * Update and return a model or 404
 */
module.exports.model.update = function(model, where, data){
    // Prevent modification of these attributes
    delete data.id;
    delete data.organisation_id;
    delete data.created_at;
    delete data.updated_at;
    return model.update(data, {where: where}).then(() => module.exports.model.item(model, where));
}

/**
 * Delete a model, return success or 404
 */
module.exports.model.delete = function(model, where){
    return model.destroy({where: where}).then(rows => {
        return (rows == 0) ? HTTPError.NotFound() : {type: model.name, ids:[where.id]};
    });
}
