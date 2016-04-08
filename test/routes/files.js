var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Files   = require('../../models/files');

describe('Files API', () => {

    xit('GET /api/orgs/:id/files/ should return array of all files', done => {
        done();
    });

    xit('GET /api/orgs/:id/files/ should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('GET /api/orgs/:id/files/:id should return file with id', done => {
        done();
    });

    xit('GET /api/orgs/:id/files/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('GET /api/orgs/:id/files/:id should return 404 if file with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/files should create new file', done => {
        done();
    });

    xit('POST /api/orgs/:id/files/ should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/files/:id should update file with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/files/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('POST /api/orgs/:id/files/:id should return 404 if applicaton with id does not exist', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/files/:id should delete file with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/files/:id should return 404 if organisation with id does not exist', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/files/:id should return 404 if file with id does not exist', done => {
        done();
    });
});