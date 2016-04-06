var HTTPError = require('http-errors');
var Orgs      = require('../models/organisations');

exports.list = function(req, res){
    Orgs.findAll().then(items => {
        res.jsonp(items);
    });
}

exports.item = function(req, res){
    Orgs.findById(req.params.org_id).then(item => {
        res.jsonp(item || HTTPError.NotFound());
    });
}

exports.create = function(req, res){

}

exports.update = function(req, res){

}

exports.delete = function(req, res){

}
