var DB    = require('./lib/sequelize');
var Orgs  = require('./models/organisations');
var Users = require('./models/users');
var Jobs  = require('./models/jobs');
var Files = require('./models/files');
var Apps  = require('./models/applications');

var DROP = true;

DB.sequelize.sync({force: DROP||false}).then(() => {
    return Orgs.create({name: "My New Org"}).then(org => {
        Users.create({organisation_id: org.id, name: 'Craig',  username:'craig001',  password:'passw0rd', acl: Users.ACL_GOD});
        Users.create({organisation_id: org.id, name: 'Vicky',  username:'vicky001',  password:'passw0rd', acl: Users.ACL_ADMIN});
        Users.create({organisation_id: org.id, name: 'Sophie', username:'sophie001', password:'passw0rd', acl: Users.ACL_SPONSOR});
        Users.create({organisation_id: org.id, name: 'Woody',  username:'woody001',  password:'passw0rd', acl: Users.ACL_INTERNAL_APPLICANT});
        Users.create({organisation_id: org.id, name: 'Maisie', username:'maisie001', password:'passw0rd', acl: Users.ACL_EXTERNAL_APPLICANT});
        Users.create({organisation_id: org.id, name: 'Puddle', username:'puddle001', password:'passw0rd', acl: Users.ACL_NOTHING});
        
        Jobs.create({organisation_id: org.id, name: 'Manager', user_id:3}).then(job => {
            Files.create({organisation_id: org.id, job_id: job.id, name: 'ManagerJobSpec.pdf', size: 9591, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:4}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 6548, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:5}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 9875, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
        });

        Jobs.create({organisation_id: org.id, name: 'Cleaner', user_id:3}).then(job => {
            Files.create({organisation_id: org.id, job_id: job.id, name: 'CleanerJobSpec.pdf', size: 9591, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:4}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 6548, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:5}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 9875, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
        });

        Jobs.create({organisation_id: org.id, name: 'Gopher', user_id:3}).then(job => {
            Files.create({organisation_id: org.id, job_id: job.id, name: 'GopherJobSpec.pdf', size: 9591, mime: 'application/pdf', url: 'http://aws.amazon.com/bar'});
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:4}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 6548, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
            
            Apps.create({organisation_id: org.id, job_id:job.id, user_id:5}).then(app => {
                Files.create({organisation_id: org.id, application_id: app.id, name: 'CV.pdf', size: 9875, mime: 'application/pdf', url: 'http://aws.amazon.com/safd.pdf'});
            });
        });
    })
}).catch(err => {
    console.error(err);
})