var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Apps    = require('../../models/applications');

var my_org;

describe('Applications API', () => {

    before(done => {
        return Orgs.create({name: "Applications Org"}).then(org => {my_org = org; done()}).catch(done);
    });

    xit('GET /api/orgs/:id/applications/ should return array of all applications', done => {
        done();
    });

    xit('GET /api/orgs/:id/applications/:id should return application with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications should create new application', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications/:id should update application with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/applications/:id should delete application with id', done => {
        done();
    });
});