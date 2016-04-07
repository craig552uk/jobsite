var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Files   = require('../../models/files');

var my_org;

describe('Files API', () => {

    before(done => {
        return Orgs.create({name: "Files Org"}).then(org => {my_org = org; done()}).catch(done);
    });

    xit('GET /api/orgs/:id/files/ should return array of all files', done => {
        done();
    });

    xit('GET /api/orgs/:id/files/:id should return file with id', done => {
        done();
    });

    xit('POST /api/orgs/:id/files should create new file', done => {
        done();
    });

    xit('POST /api/orgs/:id/files/:id should update file with id', done => {
        done();
    });

    xit('DELETE /api/orgs/:id/files/:id should delete file with id', done => {
        done();
    });
});