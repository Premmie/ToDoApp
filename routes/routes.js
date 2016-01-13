var path = require('path');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
	//	res.sendFile(path.join(__dirname, '../public', 'splash.html'));
        res.render('splash', { title: 'splash' });

	});

	app.get('/+s+pl+a+s+h+', function(req, res, next) {
		res.redirect('/');
	});

	app.get('/+h+o+m+e+', function(req, res, next) {
		res.redirect('/');
	});
	
	app.get('/+a+n+a+lytic+s+', function(req, res, next) {
		res.sendFile(path.join(__dirname, '../public', 'analytics.html'));

    });

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/login', passport.authenticate('twitter', { failureRedirect: '/' }),
		function(req, res) {
			res.redirect('/user/' + req.user.id);	
	});
	
	app.get('/user/:id', function(req, res) {
		res.render('todo', { title: 'todo' });
	});
}




/**
 * Created by Luke on 11-1-2016.
 

exports.addRoutes = function(app) {

    var list = {};
    var counter = 0;
    var user = 1;
    var listId = 2;

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

}

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
*/





