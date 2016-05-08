var express = require('express'),
    fs      = require('fs'),
    app     = express()
;

app.get('/', function(req, res) {
  res.type('html');
  res.send(fs.readFileSync(__dirname + '/index.html'));
});

app.get('/dist/build.js', function(req, res) {
  res.type('javascript');
  res.send(fs.readFileSync(__dirname + '/dist/build.js'));
});

var port = +(process.env.PORT || 5000);
app.listen(port);
