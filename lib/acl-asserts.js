var assert  = require('assert');


module.exports.assertListItem = function(request, org_id, type, status_code, done){
    var url = `/api/orgs/${org_id}/${type}`;
    request.get(url, (e,r,b) => {
        assert.equal(r.statusCode, status_code);
        done();
    });
}

module.exports.assertCreateItem = function(request, org_id, type, status_code, done){
    var url  = `/api/orgs/${org_id}/${type}`;
    request.post({url:url, body:{}}, (e,r,b) => {
        assert.equal(r.statusCode, status_code);
        done();
    });
}

module.exports.assertViewItem = function(request, org_id, type, id, status_code, done){
    var url = `/api/orgs/${org_id}/${type}/${id}`;
    request.get(url, (e,r,b) => {
        assert.equal(r.statusCode, status_code);
        done();
    });
}

module.exports.assertEditItem = function(request, org_id, type, id, status_code, done){
    var url = `/api/orgs/${org_id}/${type}/${id}`;
    request.post(url, (e,r,b) => {
        assert.equal(r.statusCode, status_code);
        done();
    });
}

module.exports.assertDeleteItem = function(request, org_id, type, id, status_code, done){
    var url = `/api/orgs/${org_id}/${type}/${id}`;
    request.del(url, (e,r,b) => {
        assert.equal(r.statusCode, status_code);
        done();
    });
}
