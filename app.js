console.log('hello world')


var express = require('express');
var app = express();
var path = require('path');

//serve static files:
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

//main view:
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});


//Middleware
app.listen(8000)
