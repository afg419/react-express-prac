const assert = require('assert');
const server_io = require('../server');
var server = server_io.server;

const pry = require('pryjs');

var options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Server', () => {
  

  it('should exist', () => {
    assert(server);
  });

  it('has the right title', () => {
    assert.equal(server.title, "Water da Zones2");
  });
});
