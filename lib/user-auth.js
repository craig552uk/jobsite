var HTTPError = require('http-errors');
var Users     = require('../models/users');

module.exports = function(req, res, next){
    if(req.header('Authorization')){
        var auth = new Buffer(req.header('Authorization').replace('Basic',''), 'base64').toString().split(':');

        Users.authenticate(auth[0], auth[1]).then(user => {
            if(user){
                req.user = user;
                next();
            }else{
                res.jsonp(HTTPError.Unauthorized());
            }
        })
    }else{
        res.jsonp(HTTPError.Unauthorized());
    }
};