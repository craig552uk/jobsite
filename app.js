var express = require('express');
var parser  = require('body-parser');
var logger  = require('bunyan').createLogger({name:'HTTP', level:'debug'});
var args    = require('aargs');

HOST = args.host || '127.0.0.1';
PORT = args.port || 3000;

var app = express();
app.use(parser.json());

// Controllers
var orgs  = require('./controllers/organisations');
var apps  = require('./controllers/applications');
var users = require('./controllers/users');
var files = require('./controllers/files');
var jobs  = require('./controllers/jobs');

// Log HTTP request
app.use((req, res, next) => {
    next();
    logger.info(`${res.statusCode} ${req.method} ${req.url}`);
});

// Routes
app.get('/error/', (req, res) => { throw Error("Oh Crap!")});

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


// 404
app.use((req, res, next) => {
    res.status(404).jsonp({error: "Not Found"});
    next();
})

// 500
app.use((err, req, res, next) => {
    res.status(500).jsonp({error: "Unknown Server Error"});
    logger.error(err);
    next();
});

// Listen on host and port
app.listen(PORT, HOST, () => {
    logger.info(`Listening on http://${HOST}:${PORT}`);
});