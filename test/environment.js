var assert = require('assert');
var http   = require('http');
var config = require('../lib/config');

// Assert that the test environment is correctly configured

describe('Testing Environment', () => {

    it('Environment should be "testing"', () => {
        assert.equal(process.env.NODE_ENV, "testing");
    });

    it('Database should be in memory SQlite', () => {
        assert.equal(config.database.dialect, "sqlite");
        assert.equal(config.database.storage, "");
    });

    it('Logging should be off', () => {
        assert.equal(config.logging.level, 100); // Disables logging
    });
});