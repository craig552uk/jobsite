var assert  = require('assert');
var request = require('../bootstrap').requestAPI;
var Orgs    = require('../../models/organisations');
var Users   = require('../../models/users');

describe('Users API', () => {

    it('GET /api/orgs/:id/users/ should return array of all users', done => {

        request.get(`/api/orgs/1/users/`, (err, res, body) => {

            Users.findAll({
                where:{organisation_id: 1}
            }).then(users => {

                assert.ok(users.length > 0);

                var ids = users.map(u => u.id);
                body.data.forEach(user => {
                    assert.equal(user.type, 'users');
                    assert.ok(ids.indexOf(user.id) >=0 );
                });
                done();
            });
        });
    });

    // returns 200
    xit('GET /api/orgs/:id/users/ should return 404 if organisation with id does not exist', done => {
        
        request.get(`/api/orgs/9999/users`, (err, res, body) => {
            
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('GET /api/orgs/:id/users/:id should return user with id', done => {
        
        request.get(`/api/orgs/1/users/1`, (err, res, body) => {
            
            Users.findOne({
                where:{organisation_id: 1, id: 1}
            }).then(user => {

                assert.equal(body.data.type, 'users');
                assert.equal(body.data.id,   user.id);
                // TODO assert json api format
                done();
            });
        });
    });

    it('GET /api/orgs/:id/users/:id should return 404 if organisation with id does not exist', done => {
        
        request.get(`/api/orgs/9999/users/1`, (err, res, body) => {
            
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('GET /api/orgs/:id/users/:id should return 404 if user with id does not exist', done => {
        
        request.get(`/api/orgs/1/users/9999`, (err, res, body) => {
            
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('POST /api/orgs/:id/users should create a new user', done => {

        var data = {name: 'User', username: 'user002', password: 'passw0rd'};

        request.post({
            url: '/api/orgs/1/users',
            body: data
        }, (err, res, body) => {

            Users.findOne({
                where:{organisation_id: 1, id: body.data.id}
            }).then(user => {

                assert.equal(body.data.type, 'users');
                assert.equal(body.data.id,   user.id);
                assert.equal(body.data.properties.name,     user.name);
                assert.equal(body.data.properties.name,     data.name);
                assert.equal(body.data.properties.username, user.username);
                assert.equal(body.data.properties.username, data.username);
                // TODO assert json api format
                done();
            });
        });
    });

    it('POST /api/orgs/:id/users should return 404 if organisation does not exist', done => {
        
        var data = {name: 'User', username: 'user003', password: 'passw0rd'};

        request.post({
            url:'/api/orgs/9999/users',
            body: data
        }, (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('POST /api/orgs/:id/users/:id should update user with id', done => {
        var name_1 = 'User Old Name';
        var name_2 = 'User New Name';

        Users.create({organisation_id:1, name:name_1, username:'user004', password:'pass'}).then(user1 => {

            request.post({
                url: '/api/orgs/1/users/'+user1.id,
                body: {name: name_2}
            }, (err, res, body) => {

                Users.findOne({
                    where:{organisation_id: 1, id: user1.id}
                }).then(user2 => {

                    assert.equal(body.data.type, 'users');
                    assert.equal(body.data.id,   user1.id);
                    assert.equal(body.data.id,   user2.id);
                    assert.equal(body.data.properties.name, user2.name);
                    assert.equal(body.data.properties.name, name_2);
                    // TODO assert json api format
                    done();
                });
            });
        });
    });

    it('POST /api/orgs/:id/users/:id should return 404 if organisation does not exist', done => {

        request.post('/api/orgs/9999/users/1', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('POST /api/orgs/:id/users/:id should return 404 if user does not exist', done => {

        request.post('/api/orgs/1/users/9999', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('DELETE /api/orgs/:id/users/:id should delete user with id', done => {
        
        Users.create({organisation_id:1, name:'User', username:'user005', password:'pass'}).then(user1 => {

            request.del('/api/orgs/1/users/'+user1.id, (err, res, body) => {

                Users.findOne({
                    where:{organisation_id: 1, id: user1.id}
                }).then(user2 => {
                    assert.strictEqual(user2, null);
                    assert.deepEqual(body, {data: {type: 'users', ids:[user1.id]}});
                    done();
                });
            });
        });
    });

    it('DELETE /api/orgs/:id/users/:id should return 404 if organisation does not exist', done => {

        request.del('/api/orgs/9999/users/1', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it('DELETE /api/orgs/:id/users/:id should return 404 if user does not exist', done => {

        request.del('/api/orgs/1/users/9999', (err, res, body) => {
            assert.equal(res.statusCode, 404);
            done();
        });
    });
});