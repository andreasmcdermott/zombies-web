var express = require('express.io');
var secure = require('./security/secure')
var bodyParser = require('body-parser');
var mongo = require('mongojs');

var app = express().http().io();
app.use(express.static('client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
var requireAuth = secure(app);

require('./routes')(app, requireAuth);

app.listen(3000);