var express = require('express');
var url = require("url");
var http = require("http");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); 

var list = [];
var counter = 0;

app.use(express.static('public'));

app.get('/', function(req, res) {
   res.send('Hello World');
});

app.get('/tasklist', function(req, res) {
	res.json(list);
	res.end;
});

app.post('/add', function(req, res) {
	var task = new Task(req.body.name, req.body.date, req.body.priority, counter);
	list[counter] = task;
	console.log(task);
	res.json(task);
	res.end();
	counter++
});

var server = app.listen(8081, function() {

  var host = server.address().address
  var port = server.address().port

  console.log("DoList app listening at http://%s:%s", host, port)

});

// server task item

function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.finished = function() { this.done = true; }
Task.prototype.delete = function() { delete this }
Task.prototype.getNote = function () {return this.note;}
Task.prototype.setNote = function (note) {this.note = note;}
Task.prototype.getDate = function () {return this.date;}
Task.prototype.setDate = function (date) {this.date = date;}
Task.prototype.getPriority = function () {return this.priority;}
Task.prototype.setPriority = function (priority) {this.priority = priority;}
Task.prototype.toJSON = function () { JSON.stringify(this); }

