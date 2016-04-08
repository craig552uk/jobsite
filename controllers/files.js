var Files = require('../models/files');
var model = require('../lib/sequelize').model;

exports.list = function(req, res, next){
    var where = {organisation_id: req.params.org_id};
    model.list(Files, where).then(data => res.jsonp(data)).catch(next);
}

exports.item = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.file_id};
    model.item(Files, where).then(data => res.jsonp(data)).catch(next);
}

exports.create = function(req, res, next){
    model.create(Files, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.update = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.file_id};
    model.update(Files, where, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.delete = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.file_id};
    model.delete(Files, where).then(data => res.jsonp(data)).catch(next);
}