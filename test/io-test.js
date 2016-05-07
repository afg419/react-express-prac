const assert = require('assert');
const server = require('../server').server;
const io = require('socket.io-client');
var pry = require('pryjs');

describe('io', function(){

  var options = {
                  transports: ['websocket'],
                  'force new connection': true
                };


  before(done => {
    this.port = 9876;
    this.test_server = server.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });
  });

  after(() => {
    this.test_server.close();
  });

  it("pushes number of connected clients", function (done) {
        var client1 = io.connect("http://localhost:9876", options);
        var client2 = io.connect("http://localhost:9876", options);

        client1.once("connect", function () {
            client1.once("usersConnected", function (message) {
                assert.equal(message, 2);
                // message.should.equal("Hello World");
                //
                client1.disconnect();
                done();
            });
        });
  });
});
