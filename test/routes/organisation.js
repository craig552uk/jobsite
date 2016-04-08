var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');

describe('Organisation API', () => {

    it('GET /api/orgs/ should return array of all organisations', done => {

        request.get('/api/orgs', (err, res, body) => {

            Orgs.findAll().then(orgs => {

                assert.ok(body.data.length > 0);
                var ids = orgs.map(o => o.id);
                body.data.forEach(org => {
                    assert.equal(org.type, 'organisations')
                    assert.ok(ids.indexOf(org.id) >= 0);
                    // TODO assert json api format
                });

                done();
            });
        });
    });

    it('GET /api/orgs/:id should return organisation with id', done => {

        request.get('/api/orgs/1', (err, res, body) => {

            Orgs.findById(1).then(org => {

                assert.equal(body.data.type, 'organisations');
                assert.equal(body.data.id,   org.id);
                // TODO assert json api format
                done();
            });
        });
    });

    it('GET /api/orgs/:id should return 404 if organisation with id does not exist', done => {
        request.get('/api/orgs/999', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('POST /api/orgs/ should create new organisation', done => {

        var data = {name: "My Org"};

        request.post({
            url: '/api/orgs',
            body: data
        }, (err, res, body) => {

            Orgs.findById(body.data.id).then(org => {
                assert.equal(body.data.type, 'organisations');
                assert.equal(body.data.id,   org.id);
                assert.equal(body.data.properties.name, data.name);
                assert.equal(body.data.properties.name, org.name);
                // TODO assert json api format
                done();
            });
        });
    });

    it('POST /api/orgs/:id should update organisation with id', done => {
        var name_1 = 'Old Name';
        var name_2 = 'New Name';

        Orgs.create({name: name_1}).then(org1 => {

            request.post({
                url: '/api/orgs/'+org1.id,
                body: {name: name_2}
            }, (err, res, body) => {

                Orgs.findById(org1.id).then(org2 => {
                    assert.equal(body.data.type, 'organisations');
                    assert.equal(body.data.id,   org1.id);
                    assert.equal(body.data.id,   org2.id);
                    assert.equal(body.data.properties.name, name_2);
                    assert.equal(body.data.properties.name, org2.name);
                    // TODO assert json api format
                    done();
                });
            });
        });
    });

    it('POST /api/orgs/:id should return 404 if organisation with id does not exist', done => {
        request.post('/api/orgs/999', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('DELETE /api/orgs/:id should delete organisation with id', done => {
        Orgs.create({name: 'Org'}).then(org1 => {

            request.del('/api/orgs/'+org1.id, (err, res, body) => {

                Orgs.findById(org1.id).then(org2 => {
                    assert.strictEqual(org2, null);
                    assert.deepEqual(body, {data: {type: 'organisations', ids:[org1.id]}});
                    done();
                });
            });
        });
    });

    it('DELETE /api/orgs/:id should return 404 if organisation with id does not exist', done => {
        request.del('/api/orgs/999', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });
});