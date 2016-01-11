var express = require('express');
var mysql = require('mysql');
var url = require('url');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var routes = require('routes.js');
var dbRoutes = require('dbRoutes.js');
var analyticsRoutes = require('analyticsRoutes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'webdata',
	database: 'todo'
});

app.use(express.static('public'));

connection.connect();

// DATABASE COMMUNICATIONS FUNCTIONALITY
dbRoutes.addRoutes(app);

// DATABASE ANALYTICS FUNCTIONALITY
analyticsRoutes.addRoutes(app);


var server = app.listen(1010, function(error) {
	var port = server.address().port;
  	console.log("DoList app listening at http://localhost:" + port);
});
