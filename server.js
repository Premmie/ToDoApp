var express = require('express');
var mysql = require('mysql');
var url = require('url');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session')
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var credentials = require('./credentials.js');
var routes = require('./routes.js');
var database = require('./database.js');

passport.use(new Strategy({
		consumerKey: credentials.twitter.consumerKey,
		consumerSecret: credentials.twitter.consumerSecret,
		callbackURL: credentials.twitter.callbackURL
	},
	function(token, tokenSecret, profile, done) {
		return done(null, profile);
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});	

var app = express();

//app.configure(function () {
	app.use(express.static(__dirname + '/public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	})); 
	app.use(session({ secret: 'secret tunnel' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(logger('dev'));
//});

routes(app, passport);


var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'webdata',
	database: 'todo'
});

connection.connect();

database(app, connection);

app.listen(1010);
