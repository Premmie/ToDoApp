var express = require('express');
var mysql = require('mysql');
var url = require('url');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 

var list = {};
var counter = 0;
var user = 1;
var listId = 2;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'webdata',
	database: 'todo'
});

app.use(express.static('public'));

connection.connect();

app.get('/', function(req, res) {
    res.redirect('/splash.html');
    res.end();
});

app.get('/tasklist', function(req, res) {
    console.log('Returning: ' + JSON.stringify(list));
	res.json(list);
	res.end();
});


app.post('/add', function(req, res) {
	var task = new Task(req.body.note, req.body.date, req.body.priority, counter);	
	list[counter++] = task;
	console.log('Created: ' + JSON.stringify(task));
	res.json(task);
	res.end();
});

app.post('/update', function(req, res) {
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

app.post('/delete', function(req, res) {
    var id = req.body.id;
    var task = list[id];
    if (task != undefined) {
        delete list[id];
        console.log('Deleted: Task ' + id);
    }
    res.json(id);
    res.end();
});

// DATABASE COMMUNICATIONS FUNCTIONALITY

app.get('/tasklistdb', function(req, res) {
	connection.query('SELECT * FROM ToDoItem WHERE ToDoItem.ToDoListId = ' + listId, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
			res.end();
			console.log(result);
		}	
	});
});

app.post('/adddb', function(req, res) {
	var creationDate = new Date().toISOString();
	var dueDate = new Date(req.body.date).toISOString();
	var object = { 
		Title: req.body.note, 
		Text: req.body.note, 
		CreationDate: creationDate,
		DueDate: dueDate,
		Completed: 0,
		Priority: req.body.priority,
		ToDoListID: listId
	}
	connection.query('INSERT INTO ToDoItem SET ?', object, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			var task = new Task(req.body.note, dueDate, req.body.priority, result.insertId);
			res.json(task);
			res.end();
			console.log(task);
		}	
	});
});

app.post('/updatedb', function(req, res) {
	var id = req.body.id;
	
	var object = {}
	
	if (req.body.note != undefined) {
		object.Title = req.body.note;
		object.Text = req.body.note;
	}
	
	if (req.body.date != undefined) {
		var dueDate = new Date(req.body.date).toISOString();
		object.DueDate = dueDate;
	}
	
	if (req.body.done != undefined) {
		object.Completed = req.body.done ? 1 : 0;
	}
	
	if (req.body.priority != undefined) {
		object.Priority = req.body.priority;
	}
	
 	connection.query('UPDATE ToDoItem SET ? WHERE Id = ' + id, object, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			console.log('Task ' + id + ' Updated');
		}	
	});
	
	res.json({});
});

app.post('/deletedb', function(req, res) {
	var id = req.body.id;
	connection.query('DELETE FROM ToDoItem WHERE ToDoItem.Id = ' + id , function(error, result) {
		if (error) {
			console.log(error);
		} else {
			res.json(id);
			res.end();
			console.log('Task ' + id + ' Deleted');
		}	
	});
});

// DATABASE ANALYTICS FUNCTIONALITY

var server = app.listen(1010, function(error) {
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

