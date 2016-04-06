var Apps  = require('../models/applications');

exports.list = function(req, res){
    Apps.findAll({
        where: {organisation_id: req.params.org_id}
    }).then(items => {
        res.jsonp(items);
    });
}

exports.item = function(req, res){
    Apps.findById(req.params.app_id, {
        where: {organisation_id: req.params.org_id}
    }).then(item => {
        res.jsonp(item || HTTPError.NotFound());
    });
}

exports.create = function(req, res){

}

exports.update = function(req, res){

}

exports.delete = function(req, res){

}
