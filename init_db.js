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
        
        Jobs.create({organisationId: org.id, name: 'Manager'});
        Jobs.create({organisationId: org.id, name: 'Gopher'});
        Jobs.create({organisationId: org.id, name: 'Skivvy'});

        Files.create({organisationId: org.id, name: 'CV.pdf'});
        Files.create({organisationId: org.id, name: 'JobSpec.pdf'});
        Files.create({organisationId: org.id, name: 'CoverLetter.doc'});

        Apps.create({organisationId: org.id, name: 'App 1'});
        Apps.create({organisationId: org.id, name: 'App 2'});
        Apps.create({organisationId: org.id, name: 'App 3'});
    })
}).catch(err => {
    console.error(err);
})