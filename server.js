const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const pry = require('pryjs');

var app = express();
var server = http.createServer(app);
var compiler = webpack(config);
var io = socketIO(server);
var port = process.env.PORT || 3000;

server.title = 'Water da Zones2';

server.listen(port, function () {
  console.log(`${server.title} is running on port ${port}`);
});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Water da Zones';

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);
  socket.emit('statusMessage', "HEY DUDE");

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});


module.exports = server;
// app.listen(app.get('port'), 'localhost', function (err) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(`${app.locals.title} is running on port ${app.get('port')}`);
// });
