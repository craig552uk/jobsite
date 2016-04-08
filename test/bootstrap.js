var request = require('request');
var app     = require('../app');
var DB      = require('../lib/sequelize');
var Orgs    = require('../models/organisations');
var Users   = require('../models/users');
var Jobs    = require('../models/jobs');
var Files   = require('../models/files');
var Apps    = require('../models/applications');

var API_USER = 'user001';
var API_PASS = 'passw0rd';

// Before any test runs
before(done => {
    
    // Create DB tables
    DB.sequelize.sync({force:true}).then(() => {
        
        return Orgs.create({name:'Org'}).then(org => {

            return Promise.all([

                // User with full API access
                Users.create({organisation_id: org.id, name: 'GOD',  username:API_USER,  password:API_PASS, acl: Users.ACL_GOD}),

                // TODO more

            ]);
        });

    }).then(() => {

        // Start HTTP server for tests
        var HOST = '127.0.0.1';
        var PORT = 3333;
        app.listen(PORT, HOST);

    }).then(done).catch(done);
});

// Base HTTP Client
exports.request = request;

// HTTP Client configired for test HTTP server
exports.requestJSON = request.defaults({
    baseUrl: `http://${HOST}:${PORT}/`,
    json: true,
    followRedirect: false,
});

// As above, but with user crednetials
exports.requestAPI = exports.requestJSON.defaults({
    auth: {user: API_USER, pass: API_PASS}
});