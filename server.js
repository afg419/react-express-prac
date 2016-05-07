var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var path = require('path');
var app = express();

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Water da Zones';

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(app.get('port'), 'localhost', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log(`${app.locals.title} is running on port ${app.get('port')}`);
});
