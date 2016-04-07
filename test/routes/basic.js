// 
// Basic routes testing simple web responses
// 
var assert  = require('assert');
var request = require('../bootstrap').requestJSON;

describe('Basic Routes', () => {

    it('GET /hello should return "Hello"', done => {
        request.get('/hello', (err, res, body) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {data: 'Hello'});
            done();
        });
    });

    it('GET /redir/ should return redirect to Google', done => {
        request.get('/redir', (err, res, body) => {
            assert.equal(res.statusCode, 301);
            assert.equal(res.headers['location'], "https://google.com");
            done();
        });
    });

    it('POST /echo/ should return JSON request data', done => {
        var data = {foo: 'bar', baz: 123};
        request.post({url: '/echo', body: data}, (err, res, body) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {data: data});
            done();
        });
    });

    it('GET /teapot/ should return JSON API 418 Error', done => {
        request.get('/teapot', (err, res, body) => {
            assert.equal(res.statusCode, 418);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {errors: [{status: 418, title: "I'm a teapot"}]});
            done();
        });
    });

    it('GET /error/ should return a JSON API 500 error', done => {
        request.get('/error', (err, res, body) => {
            assert.equal(res.statusCode, 500);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {errors: [{status: 500, title: "Internal Server Error"}]});
            done();
        });
    });
});