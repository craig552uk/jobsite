var request = require('request');
var app     = require('../app');
var DB      = require('../lib/sequelize');
var Orgs    = require('../models/organisations');
var Users   = require('../models/users');

var API_USER = 'user001';
var API_PASS = 'passw0rd';

// Populate DB with records
DB.sequelize.sync().then(() => {
    return Orgs.create({name: "Test Org"}).then(org => {
        Users.create({organisation_id: org.id, name: 'Test User 1',  username:API_USER,  password:API_PASS, acl: Users.ACL_GOD});
    });
});

// Start server for tests
var HOST = '127.0.0.1';
var PORT = 3333;
exports.app = app.listen(PORT, HOST);

// HTTP Client
exports.request = request;

// HTTP Client for JSON
exports.requestJSON = request.defaults({
    baseUrl: `http://${HOST}:${PORT}/`,
    json: true,
    followRedirect: false,
});

// HTTP Client for JSONAPI
exports.requestAPI = exports.requestJSON.defaults({
    auth: {user: API_USER, pass: API_PASS}
});