var Apps  = require('../models/applications');
var model = require('../lib/sequelize').model;

exports.list = function(req, res, next){
    var where = {organisation_id: req.params.org_id};
    model.list(Apps, where).then(data => res.jsonp(data)).catch(next);
}

exports.item = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.app_id};
    model.item(Apps, where).then(data => res.jsonp(data)).catch(next);
}

exports.create = function(req, res, next){
    req.body.organisation_id = req.params.org_id;
    model.create(Apps, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.update = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.app_id};
    model.update(Apps, where, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.delete = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.app_id};
    model.delete(Apps, where).then(data => res.jsonp(data)).catch(next);
}