var express = require('express');
var mysql = require('mysql');
var url = require('url');
var http = require('http');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session')
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var routes = require('./routes.js');
var dbRoutes = require('./dbRoutes.js');
var analyticsRoutes = require('./analyticsRoutes.js');
var cred = require('./credentials.js');

passport.use(new Strategy({
	consumerKey: cred.twitter.consumerKey,
	consumerSecret: cred.twitter.consumerSecret,
	callbackURL: cred.twitter.callbackURL
	},
	function(token, tokenSecret, profile, cb) {
		return cb(null, profile);
	})
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});	

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'webdata',
	database: 'todo'
});

connection.connect();

app.get('/', function(req, res) {
    res.redirect('/splash.html');
    res.end();
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/login', passport.authenticate('twitter', { failureRedirect: '/' }),
	function(req, res) {
		console.log('login success');
		res.redirect('/todo.html');	
});

// DATABASE COMMUNICATIONS FUNCTIONALITY
dbRoutes.addRoutes(app, connection);

// DATABASE ANALYTICS FUNCTIONALITY
analyticsRoutes.addRoutes(app, connection);


var server = app.listen(1010, function(error) {
	var port = server.address().port;
  	console.log("DoList app listening at http://127.0.0.1:" + port);
});
