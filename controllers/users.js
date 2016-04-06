var Users = require('../models/users');
var model = require('../lib/sequelize').model;

exports.list = function(req, res, next){
    model.list(Users).then(data => res.jsonp(data)).catch(next);
}

exports.item = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.user_id};
    model.item(Users, where).then(data => res.jsonp(data)).catch(next);
}

exports.create = function(req, res, next){
    model.create(Users, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.update = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.user_id};
    model.update(Users, where, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.delete = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.user_id};
    model.delete(Users, where).then(data => res.jsonp(data)).catch(next);
}