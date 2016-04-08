var request = require('../bootstrap').requestJSON;
var acl     = require('../../lib/acl-asserts');
var Users   = require('../../models/users');

var USERNAME = 'acl-admin';
var PASSWORD = 'passw0rd';
var user;

describe('ACL Administrator', function(){
    

    before(done => {
        request = request.defaults({auth: {user: USERNAME, pass: PASSWORD}});

        var data = {organisation_id:1, name:USERNAME, username:USERNAME, password:PASSWORD, acl:Users.ACL_ADMINISTRATOR};

        Users.create(data).then(u => {
            user = u;
            done();
        }).catch(done);
    })

    it('Can view own User account', done => acl.assertViewItem(request, 1, 'users', user.id, 200, done));
    it('Can edit own User account', done => acl.assertEditItem(request, 1, 'users', user.id, 200, done));
});