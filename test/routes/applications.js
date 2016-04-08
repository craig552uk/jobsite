var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Apps    = require('../../models/applications');

describe('Applications API', () => {

    xit('GET /api/orgs/:id/applications/ should return array of all applications', done => {
        done();
    });

    xit('GET /api/orgs/:id/applications/ should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('GET /api/orgs/:id/applications/:id should return application with id', done => {
        done();
    });

    xit('GET /api/orgs/:id/applications/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('GET /api/orgs/:id/applications/:id should return 404 if application with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications should create new application', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications/ should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications/:id should update application with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/applications/:id should return 404 if applicaton with id does not exist', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/applications/:id should delete application with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/applications/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/applications/:id should return 404 if application with id does not exist', done => {
        done();
    });
});