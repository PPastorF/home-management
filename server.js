var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var port = 8080;

app.use(express.static(path.join('public')));

app.listen(port, function () {
  console.log('Listening on port '+ port +'...')
});