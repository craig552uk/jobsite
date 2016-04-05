var express = require('express');
var parser  = require('body-parser');
var logger  = require('bunyan').createLogger({name:'HTTP', level:'debug'});

HOST = '127.0.0.1';
PORT = 3000;

var Orgs  = require('./models/organisations');
var Users = require('./models/users');
var Jobs  = require('./models/jobs');
var Files = require('./models/files');
var Apps  = require('./models/applications');


var app = express();
app.use(parser.json());

app.use((req, res, next) => {
    logger.info([res.statusCode, req.method, req.url].join(' '));
    next();
});

app.use('/api/orgs/:org_id/applications/:app_id/', (req, res) => {
    Apps.findById(req.params.app_id, {
        where: {organisationId: req.params.org_id}
    }).then(item => {
        res.jsonp({data: item});
    });
});

app.use('/api/orgs/:org_id/applications/', (req, res) => {
    Apps.findAll({
        where: {organisationId: req.params.org_id}
    }).then(items => {
        res.jsonp({data: items});
    });
});

app.use('/api/orgs/:org_id/files/:file_id/', (req, res) => {
    Files.findById(req.params.file_id, {
        where: {organisationId: req.params.org_id}
    }).then(item => {
        res.jsonp({data: item});
    });
});

app.use('/api/orgs/:org_id/files/', (req, res) => {
    Files.findAll({
        where: {organisationId: req.params.org_id}
    }).then(items => {
        res.jsonp({data: items});
    });
});

app.use('/api/orgs/:org_id/jobs/:job_id/', (req, res) => {
    Jobs.findById(req.params.job_id, {
        where: {organisationId: req.params.org_id}
    }).then(item => {
        res.jsonp({data: item});
    });
});

app.use('/api/orgs/:org_id/jobs/', (req, res) => {
    Jobs.findAll({
        where: {organisationId: req.params.org_id}
    }).then(items => {
        res.jsonp({data: items});
    });
});

app.use('/api/orgs/:org_id/users/:user_id/', (req, res) => {
    Users.findById(req.params.user_id, {
        where: {organisationId: req.params.org_id}
    }).then(item => {
        res.jsonp({data: item});
    });
});

app.use('/api/orgs/:org_id/users/', (req, res) => {
    Users.findAll({
        where: {organisationId: req.params.org_id}
    }).then(items => {
        res.jsonp({data: items});
    });
});

app.use('/api/orgs/:org_id/', (req, res) => {
    Orgs.findById(req.params.org_id).then(item => {
        res.jsonp({data: item});
    });
});

app.use('/api/orgs/', (req, res) => {
    Orgs.findAll().then(items => {
        res.jsonp({data: items});
    });
});

// Listen on host and port
app.listen(PORT, HOST, () => {
    logger.info(`Listening on http://${HOST}:${PORT}`);
});