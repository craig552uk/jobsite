var assert = require('assert');
var http   = require('http');
var config = require('../lib/config');
var app    = require('../app').app;

describe('Config', () => {

    it('Environment should be "testing"', () => {
        assert.equal(process.env.NODE_ENV, "testing");
    });

    it('Database should be in memory SQlite', () => {
        assert.equal(config.database.dialect, "sqlite");
        assert.equal(config.database.storage, "");
    });

    it('Logging should be off', () => {
        assert.equal(config.logging.level, 100); // Effectively disables logging
    });
});

describe('Test Routes', () => {

    var req = {
        host: '127.0.0.1',
        port: 3333,
        path: '',
        method: 'GET',
    };

    before(done => {
        app.listen(req.port, (err, result) => {
            err ? done(err) : done();
        });
    });

    it('GET /hello should return "Hello"', done => {
        req.path = '/hello/'

        http.get(req, res => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "text/html; charset=utf-8");
            done();
        });
    });

});