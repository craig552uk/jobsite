var Orgs  = require('../models/organisations');
var model = require('../lib/sequelize').model;

exports.list = function(req, res, next){
    model.list(Orgs).then(data => res.jsonp(data)).catch(next);
}

exports.item = function(req, res, next){
    var where = {id: req.params.org_id};
    model.item(Orgs, where).then(data => res.jsonp(data)).catch(next);
}

exports.create = function(req, res, next){
    model.create(Orgs, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.update = function(req, res, next){
    var where = {id: req.params.org_id};
    model.update(Orgs, where, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.delete = function(req, res, next){
    var where = {id: req.params.org_id};
    model.delete(Orgs, where).then(data => res.jsonp(data)).catch(next);
}
