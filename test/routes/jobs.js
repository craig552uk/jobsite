var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Jobs    = require('../../models/jobs');

var my_org;

describe('Jobs API', () => {

    before(done => {
        return Orgs.create({name: "Jobs Org"}).then(org => {my_org = org; done()}).catch(done);
    });

    xit('GET /api/orgs/:id/jobs/ should return array of all jobs', done => {
        done();
    });

    xit('GET /api/orgs/:id/jobs/:id should return job with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/jobs should create new job', done => {
        done();
    });

    xit('POST /api/orgs/:id/jobs/:id should update job with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/jobs/:id should delete job with id', done => {
        done();
    });
});