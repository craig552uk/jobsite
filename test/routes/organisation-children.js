// 
// Generated test suite for all child models of Organisation
// 
var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Users   = require('../../models/users');
var Files   = require('../../models/files');
var Apps    = require('../../models/applications');
var Jobs    = require('../../models/jobs');

// A random 10 character string
var rand = () => Math.random().toString(36).slice(-10);

// Child models to apply test suite to
var models = [
    {model:Users, type:'user',        name:'User',        data: function(){ return {name:'Jim', username:rand(), password:rand()}; }},
    {model:Files, type:'file',        name:'File',        data: function(){ return {name:'file.txt', mime:'text/plain', size:1024, url:'http://example.com'}; }},
    {model:Apps,  type:'application', name:'Application', data: function(){ return {form_data: '{}'}; }},
    {model:Jobs,  type:'job',         name:'Job',         data: function(){ return {name:'Job'}; }},
];

models.forEach(m => {

    describe(`${m.name}s API`, function(){

        // Get List //

        it(`GET /api/orgs/:id/${m.type}s/ should return array of all ${m.type}s`, done => {
            request.get(`/api/orgs/1/${m.type}s/`, (err, res, body) => {

                m.model.findAll({
                    where:{organisation_id: 1}
                }).then(items => {

                    // Ensure we actually have some records to test
                    assert.ok(items.length > 0, `No ${m.name} records to test`);

                    // Assert type and id
                    var ids = items.map(item => item.id);
                    body.data.forEach(item => {
                        assert.equal(item.type, `${m.type}s`);
                        assert.ok(ids.indexOf(item.id) >=0 );
                        assert.ok(item.properties.organisation_id);
                        assert.ok(item.properties.created_at);
                        assert.ok(item.properties.updated_at);
                    });
                    done();
                });
            });
        });

        // TODO FIX: Currently returns 200
        xit(`GET /api/orgs/:id/${m.type}s should return 404 if organisation with id does not exist`, done => {
            request.get(`/api/orgs/9999/${m.type}s`, (err, res, body) => {
                console.log(body);
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        // Get Item //

        it(`GET /api/orgs/:id/${m.type}s/:id should return ${m.type} with id`, done => {
            request.get(`/api/orgs/1/${m.type}s/1`, (err, res, body) => {
            
                m.model.findOne({
                    where:{organisation_id: 1, id: 1}
                }).then(item => {

                    assert.equal(body.data.type, `${m.type}s`);
                    assert.equal(body.data.id,   item.id);
                    assert.ok(body.data.properties.organisation_id);
                    assert.ok(body.data.properties.created_at);
                    assert.ok(body.data.properties.updated_at);
                    done();
                });
            });
        });

        it(`GET /api/orgs/:id/${m.type}s/:id should return 404 if organisation with id does not exist`, done => {
            request.get(`/api/orgs/9999/${m.type}s/1`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        it(`GET /api/orgs/:id/${m.type}s/:id should return 404 if ${m.type} with id does not exist`, done => {
            request.get(`/api/orgs/1/${m.type}s/9999`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        // Create New //

        it(`POST /api/orgs/:id/${m.type}s/ should create new ${m.type}`, done => {
            request.post({
                url: `/api/orgs/1/${m.type}s`,
                body: m.data(),
            }, (err, res, body) => {

                m.model.findOne({
                    where:{organisation_id: 1, id: body.data.id}
                }).then(item => {

                    assert.equal(body.data.type, `${m.type}s`);
                    assert.equal(body.data.id,   item.id);
                    assert.ok(body.data.properties.organisation_id);
                    assert.ok(body.data.properties.created_at);
                    assert.ok(body.data.properties.updated_at);
                    done();
                });
            });
        });

        it(`POST /api/orgs/:id/${m.type}s/ should return 404 if organisation with id does not exist`, done => {
            request.post({
                url: `/api/orgs/9999/${m.type}s`,
                body: m.data(),
            }, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        // Update Item //

        it(`POST /api/orgs/:id/${m.type}s/:id should update ${m.type} with id`, done => {

            var data_1 = m.data();
            var data_2 = m.data();

            data_1.organisation_id = 1;

            m.model.create(data_1).then(item1 => {

                request.post({
                    url: `/api/orgs/1/${m.type}s/${item1.id}`,
                    body: data_2
                }, (err, res, body) => {

                    m.model.findOne({
                        where:{organisation_id: 1, id: item1.id}
                    }).then(item2 => {

                        assert.equal(body.data.type, `${m.type}s`);
                        assert.equal(body.data.id, item1.id);
                        assert.equal(body.data.id, item2.id);
                        assert.notEqual(item1.updated_at, item2.updated_at);
                        assert.ok(body.data.properties.organisation_id);
                        assert.ok(body.data.properties.created_at);
                        assert.ok(body.data.properties.updated_at);
                        done();
                    });
                });
            });
        });

        it(`POST /api/orgs/:id/${m.type}s/:id should return 404 if organisation with id does not exist`, done => {
            request.post(`/api/orgs/9999/${m.type}s/1`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        it(`POST /api/orgs/:id/${m.type}s/:id should return 404 if ${m.type} with id does not exist`, done => {
            request.post(`/api/orgs/1/${m.type}s/9999`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        // Delete Item //

        it(`DELETE /api/orgs/:id/${m.type}s/:id should delete ${m.type} with id`, done => {
            var data = m.data();
            data.organisation_id = 1;
            m.model.create(data).then(item1 => {

                request.del(`/api/orgs/1/${m.type}s/${item1.id}`, (err, res, body) => {

                    m.model.findOne({
                        where:{organisation_id: 1, id: item1.id}
                    }).then(item2 => {
                        assert.strictEqual(item2, null);
                        assert.deepEqual(body, {data: {type: `${m.type}s`, ids:[item1.id]}});
                        done();
                    });
                });
            });
        });

        it(`DELETE /api/orgs/:id/${m.type}s/:id should return 404 if organisation with id does not exist`, done => {
            request.del(`/api/orgs/9999/${m.type}s/1`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });

        it(`DELETE /api/orgs/:id/${m.type}s/:id should return 404 if ${m.type} with id does not exist`, done => {
            request.del(`/api/orgs/1/${m.type}s/9999`, (err, res, body) => {
                assert.equal(res.statusCode, 404);
                done();
            });
        });
    });
});