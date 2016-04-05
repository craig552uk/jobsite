var Orgs  = require('../models/organisations');

exports.list = function(req, res){
    Orgs.findAll().then(items => {
        res.jsonp({data: items});
    });
}

exports.item = function(req, res){
    Orgs.findById(req.params.org_id).then(item => {
        res.jsonp({data: item});
    });
}

exports.create = function(req, res){}
exports.update = function(req, res){}
exports.delete = function(req, res){}