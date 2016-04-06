var Users = require('../models/users');

exports.list = function(req, res){
    Users.findAll({
        where: {organisation_id: req.params.org_id}
    }).then(items => {
        res.jsonp(items);
    });
}

exports.item = function(req, res){
    Users.findById(req.params.user_id, {
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
