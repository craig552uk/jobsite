var assert    = require('assert');
var bootstrap = require('../bootstrap');
var Users     = require('../../models/users');

var requestNoAuth = bootstrap.requestJSON;
var requestAuth   = bootstrap.requestAPI;

describe('API Authentication', () => {

    it('GET /api/ should deny unauthenticated requests', done => {
        requestNoAuth.get('/api/', (err, res, body) => {
            assert.equal(res.statusCode, 401);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {errors: [{status: 401, title: "Unauthorized"}]});
            done();
        });
    });

    // Pending implementation
    xit('GET /api/ should deny bad username/password requests', done => {
        requestBadAuth.get({
            url: '/api/',
            auth: {user: 'foo', pass: 'bar'}
        }, (err, res, body) => {
            assert.equal(res.statusCode, 401);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {errors: [{status: 401, title: "Unauthorized"}]});
            done();
        });
    });

    it('GET /api/ should grant authenticated requests', done => {
        requestAuth.get('/api/', (err, res, body) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.headers['content-type'], "application/json; charset=utf-8");
            assert.deepEqual(body, {data: "Hello API"});
            done();
        });
    });
});