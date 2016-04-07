var assert = require('assert');
var http   = require('http');
var app    = require('../../app').app;

// Basic routes testing simple web responses

function request(method, path, callback){
    var req = {
        host: '127.0.0.1',
        port: 3333,
        path: path || '',
        method: method || 'GET',
    };

    http.get(req, res => {
        res.body = '';
        res.on('data', chunk => res.body += chunk);
        res.on('end', () => {
            if(res.headers['content-type'] == "application/json; charset=utf-8") res.body = JSON.parse(res.body);
            callback.call(null, res);
        });
    });
}


describe('Basic Routes', () => {

    before(done => {
        app.listen(3333, () => {
            done();
        });
    });

    it('GET /hello should return "Hello"', done => {
        request('GET', '/hello/', res => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(res.body, {data: 'Hello'});
            done();
        });
    });

    it('GET /redir/ should return redirect to Google', done => {
        request('GET', /redir/, res => {
            assert.equal(res.statusCode, 301);
            assert.equal(res.headers['location'], "https://google.com");
            done();
        });
    });

    it('POST /echo/ should return JSON request data', done => {
        request('POST', '/echo/', res => {
            // TODO POST some data
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            done();
        });
    });

    it('GET /teapot/ should return JSON API 418 Error', done => {
        request('GET', '/teapot/', res => {
            assert.equal(res.statusCode, 418);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            done();
        });
    });

    it('GET /error/ should return a JSON API 500 error', done => {
        request('GET', '/error/', res => {
            assert.equal(res.statusCode, 500);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            done();
        });
    });


});