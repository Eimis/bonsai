console.log('hello world')


var express = require('express');
var app = express();
var path = require('path');

//serve static files:
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/app/config',  express.static(__dirname + '/app/config'));
app.use('/app/components',  express.static(__dirname + '/app/components'));

//main view:
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});


//Middleware
app.listen(8000)
