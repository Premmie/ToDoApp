var express = require('express');
var url = require('url');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); 

var list = {};
var counter = 0;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.redirect('/splash.html');
    res.end;
});

app.get('/tasklist', function(req, res) {
    console.log('Returning: ' + JSON.stringify(list));
	res.json(list);
	res.end();
});

app.post('/add', function(req, res) {
	var task = new Task(req.body.note, req.body.date, req.body.priority, counter);
	list[counter++] = task;
	console.log(task);
	res.json(task);
	res.end();
});

app.post('/update', function(req, res) {
    console.log(req.body.id);
    var task = list[req.body.id];
    if (list[req.body.id] != undefined) {
        task.setNote(req.body.note);
        task.setDate(req.body.date);
        task.setPriority(req.body.priority);
        if (req.body.done) {
            task.finished();
        }
        res.json(task);
    }
    console.log('Updated: ' + JSON.stringify(task));
    res.end();
});

app.post('/remove', function(req, res) {
    var id = req.body.id;
    var task = list[id];
    if (task != undefined) {
        delete list[id];
        console.log('Deleted: ' + id);
    }
    res.end();
});


var server = app.listen(1010, function() {
    var port = server.address().port;
  console.log("DoList app listening at http://localhost:" + port);
});

// server task item

function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.finished = function() { this.done = true; };
Task.prototype.getNote = function () {return this.note;};
Task.prototype.setNote = function (note) {if (note != undefined) this.note = note;};
Task.prototype.getDate = function () {return this.date;};
Task.prototype.setDate = function (date) {if (date != undefined) this.date = date;};
Task.prototype.getPriority = function () {return this.priority;};
Task.prototype.setPriority = function (priority) {if (priority != undefined) this.priority = priority;};

