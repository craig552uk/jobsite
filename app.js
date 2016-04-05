var express = require('express');
var parser  = require('body-parser');
var logger  = require('bunyan').createLogger({name:'HTTP', level:'debug'});
var args    = require('aargs');

HOST = args.host || '127.0.0.1';
PORT = args.port || 3000;

var orgs  = require('./controllers/organisations');
var apps  = require('./controllers/applications');
var users = require('./controllers/users');
var files = require('./controllers/files');
var jobs  = require('./controllers/jobs');

var app = express();
app.use(parser.json());

app.get('/api/orgs/:org_id/applications/:app_id/', apps.item);
app.get('/api/orgs/:org_id/applications/',         apps.list);

app.get('/api/orgs/:org_id/users/:user_id/',       users.item);
app.get('/api/orgs/:org_id/users/',                users.list);

app.get('/api/orgs/:org_id/files/:file_id/',       files.item);
app.get('/api/orgs/:org_id/files/',                files.list);

app.get('/api/orgs/:org_id/jobs/:job_id/',         jobs.item);
app.get('/api/orgs/:org_id/jobs/',                 jobs.list);

app.get('/api/orgs/:org_id/',                      orgs.item);
app.get('/api/orgs/',                              orgs.list);

app.use((req, res, next) => {
    res.status(404).jsonp({error: "Not Found"});
    next();
})

app.use((req, res, next) => {
    next();
    logger.info([res.statusCode, req.method, req.url].join(' '));
});

// Listen on host and port
app.listen(PORT, HOST, () => {
    logger.info(`Listening on http://${HOST}:${PORT}`);
});