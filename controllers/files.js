var Files = require('../models/files');

exports.list = function(req, res){
    Files.findAll({
        where: {organisation_id: req.params.org_id}
    }).then(items => {
        res.jsonp(items);
    });
}

exports.item = function(req, res){
    Files.findById(req.params.file_id, {
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
