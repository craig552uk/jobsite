var Jobs = require('../models/jobs');

exports.list = function(req, res){
    Jobs.findAll({
        where: {organisation_id: req.params.org_id}
    }).then(items => {
        res.jsonp(items);
    });
}

exports.item = function(req, res){
    Jobs.findById(req.params.job_id, {
        where: {organisation_id: req.params.org_id}
    }).then(item => {
        res.jsonp(item);
    });
}

exports.create = function(req, res){

}

exports.update = function(req, res){

}

exports.delete = function(req, res){

}
