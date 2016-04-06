var express   = require('express');
var HTTPError = require('http-errors');
var parser    = require('body-parser');
var logger    = require('bunyan').createLogger({name:'HTTP', level:'debug'});
var args      = require('aargs');

HOST = args.host || '127.0.0.1';
PORT = args.port || 3000;

var app = express();
app.use(parser.json());

// Wrap jsonp responses in json API format and log
app.use((req, res, next) => {
    var orig_jsonp = res.jsonp;
    res.jsonp = function(obj){

        if(obj instanceof Error){
            res.status(obj.statusCode);
            var json = {errors: [{status: obj.statusCode, title: obj.message}]};
        }else{
            var json = {data: obj};
        }

        orig_jsonp.call(this, json);
        logger.info({request: req.body, response: json}, `${res.statusCode} ${req.method} ${req.url}`);
    }
    next();
});

// Controllers
var orgs  = require('./controllers/organisations');
var apps  = require('./controllers/applications');
var users = require('./controllers/users');
var files = require('./controllers/files');
var jobs  = require('./controllers/jobs');

// Routes
app.all('/error/',  (req, res) => { throw Error("Oh Crap!")});
app.all('/teapot/', (req, res) => res.jsonp(HTTPError.ImATeapot()));
app.all('/redir/',  (req, res) => res.redirect(301, 'https://google.com'));
app.all('/echo/',   (req, res) => res.jsonp({body:req.body, headers:req.headers}));

app.get(   '/api/orgs/:org_id/applications/:app_id/', apps.item);
app.post(  '/api/orgs/:org_id/applications/:app_id/', apps.update);
app.delete('/api/orgs/:org_id/applications/:app_id/', apps.delete);
app.get(   '/api/orgs/:org_id/applications/',         apps.list);
app.post(  '/api/orgs/:org_id/applications/',         apps.create);

app.get(   '/api/orgs/:org_id/users/:user_id/',       users.item);
app.post(  '/api/orgs/:org_id/users/:user_id/',       users.update);
app.delete('/api/orgs/:org_id/users/:user_id/',       users.delete);
app.get(   '/api/orgs/:org_id/users/',                users.list);
app.post(  '/api/orgs/:org_id/users/',                users.create);

app.get(   '/api/orgs/:org_id/files/:file_id/',       files.item);
app.post(  '/api/orgs/:org_id/files/:file_id/',       files.update);
app.delete('/api/orgs/:org_id/files/:file_id/',       files.delete);
app.get(   '/api/orgs/:org_id/files/',                files.list);
app.post(  '/api/orgs/:org_id/files/',                files.create);

app.get(   '/api/orgs/:org_id/jobs/:job_id/',         jobs.item);
app.post(  '/api/orgs/:org_id/jobs/:job_id/',         jobs.update);
app.delete('/api/orgs/:org_id/jobs/:job_id/',         jobs.delete);
app.get(   '/api/orgs/:org_id/jobs/',                 jobs.list);
app.post(  '/api/orgs/:org_id/jobs/',                 jobs.create);

app.get(   '/api/orgs/:org_id/',                      orgs.item);
app.post(  '/api/orgs/:org_id/',                      orgs.update);
app.delete('/api/orgs/:org_id/',                      orgs.delete);
app.get(   '/api/orgs/',                              orgs.list);
app.post(  '/api/orgs/',                              orgs.create);

// 404
app.use((req, res, next) => {
    res.jsonp(HTTPError.NotFound());
    next();
})

// 500
app.use((err, req, res, next) => {
    switch(err.name){
        case 'SequelizeValidationError': 
        case 'SequelizeUniqueConstraintError': 
        case 'SequelizeExclusionConstraintError': 
        case 'SequelizeForeignKeyConstraintError': 
            res.jsonp(HTTPError.BadRequest(err.message)); break;
        default:
            res.jsonp(HTTPError.InternalServerError());
    }
    logger.error(err);
    next();
});

// Listen on host and port
app.listen(PORT, HOST, () => {
    logger.info(`Listening on http://${HOST}:${PORT}`);
});