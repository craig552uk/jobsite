var assert = require('assert');
var config = require('../lib/config');

describe('Config', () => {

    it('Environment should be "testing"', () => {
        assert.equal(process.env.NODE_ENV, "testing");
    });

    it('Database should be in memory SQlite', () => {
        assert.equal(config.database.dialect, "sqlite");
        assert.equal(config.database.storage, "");
    });

    it('Logging should be off', () => {
        assert.equal(config.logging.level, false);
    });
});