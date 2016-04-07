var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Users   = require('../../models/users');

var my_org;

describe('Users API', () => {

    before(done => {
        return Orgs.create({name: "Users Org"}).then(org => {my_org = org; done()}).catch(done);
    });

    xit('GET /api/orgs/:id/users/ should return array of all users', done => {
        done();
    });

    xit('GET /api/orgs/:id/users/:id should return user with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/users should create new user', done => {
        done();
    });

    xit('POST /api/orgs/:id/users/:id should update user with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/users/:id should delete user with id', done => {
        done();
    });
});