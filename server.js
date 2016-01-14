var express = require('express');
var path = require('path');
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
var routes = require('./routes/routes.js');
var database = require('./routes/database.js');

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

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 
app.use(session({ secret: 'secret tunnel' }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

routes(app, passport);

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'webdata', // 'Alexander12!',
	database: 'todo'
});

connection.connect();

database(app, connection);

app.listen(3000);
