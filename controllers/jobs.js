var Jobs = require('../models/jobs');
var model = require('../lib/sequelize').model;

exports.list = function(req, res, next){
    model.list(Jobs).then(data => res.jsonp(data)).catch(next);
}

exports.item = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.job_id};
    model.item(Jobs, where).then(data => res.jsonp(data)).catch(next);
}

exports.create = function(req, res, next){
    model.create(Jobs, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.update = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.job_id};
    model.update(Jobs, where, req.body).then(data => res.jsonp(data)).catch(next);
}

exports.delete = function(req, res, next){
    var where = {organisation_id: req.params.org_id, id: req.params.job_id};
    model.delete(Jobs, where, 'organisations').then(data => res.jsonp(data)).catch(next);
}