var DB    = require('./lib/sequelize');
var Orgs  = require('./models/organisations');
var Users = require('./models/users');
var Jobs  = require('./models/jobs');
var Files = require('./models/files');
var Apps  = require('./models/applications');

var DROP = true;

DB.sequelize.sync({force: DROP||false}).then(() => {
    return Orgs.create({name: "My New Org"}).then(org => {
        Users.create({organisationId: org.id, name: 'Craig',  username:'craig001',  password:'passw0rd'});
        Users.create({organisationId: org.id, name: 'Vicky',  username:'vicky001',  password:'passw0rd'});
        Users.create({organisationId: org.id, name: 'Sophie', username:'sophie001', password:'passw0rd'});
        
        Jobs.create({organisationId: org.id, name: 'Manager'}).then(job => {
            Files.create({organisationId: org.id, jobId: job.id, name: 'ManagerJobSpec.pdf', size: 9591, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
        });

        Jobs.create({organisationId: org.id, name: 'Gopher'}).then(job => {
            Files.create({organisationId: org.id, jobId: job.id, name: 'GopherJobSpec.pdf', size: 3624, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
        });

        Jobs.create({organisationId: org.id, name: 'Skivvy'}).then(job => {
            Files.create({organisationId: org.id, jobId: job.id, name: 'SkivvyJobSpec.pdf', size: 8235, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
        });

        Apps.create({organisationId: org.id, name: 'App 1'});
        Apps.create({organisationId: org.id, name: 'App 2'});
        Apps.create({organisationId: org.id, name: 'App 3'});
    })
}).catch(err => {
    console.error(err);
})