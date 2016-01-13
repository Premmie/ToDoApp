module.exports = function(app, connection) {

	var listId = 2;

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

        var object = {};

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
        res.end();
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

    app.get('/a21', function(req, res) {
        var user = req.query.user;
        var query = 'SELECT ToDoList.* FROM ToDoList JOIN User ON(ToDoList.Owner=User.Id) WHERE User.id=' + user;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a22', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT ToDoItem.* FROM ToDoItem JOIN ToDoList ON(ToDoItem.ToDoListId=ToDoList.Id) WHERE ToDoList.Id=' + id;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a23', function(req, res) {
        var id = req.query.id;
        var page = { start: req.query.start, end: req.query.end };
        var query = 'SELECT ToDoItem.* FROM ToDoItem JOIN ToDoList ON(ToDoItem.ToDoListId=ToDoList.Id) WHERE ToDoList.Id=' + id + ' LIMIT ' + page.start + ', ' + page.end;

        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end('Error');
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a24', function(req, res) {
        var id = req.query.id;
        var page = { start: req.query.start, end: req.query.end };
        var dateStart = req.query.dateStart;
        var dateEnd = req.query.dateEnd;
        var priority = req.query.priority;
        var completed = req.query.completed;
        var query = 'SELECT ToDoItem.* FROM ToDoItem JOIN ToDoList ON(ToDoItem.ToDoListId=ToDoList.Id) WHERE ToDoList.Id=' + id;

        if (dateStart != '' && dateEnd != '' ) {

            query += ' AND ToDoItem.CreationDate BETWEEN "' + new Date(dateStart).toISOString() + '" AND "' + new Date(dateEnd).toISOString() + '"';
        }

        if (priority != 'undefined') {
            query += ' AND ToDoItem.Priority=' + priority;
        }

        query += ' AND ToDoItem.Completed=' + completed;
        query += ' LIMIT ' + page.start + ', ' + page.end;

        console.log(query);
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a25', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT * FROM ToDoItem WHERE ParentToDo=' + id;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a26', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT Tag.Text FROM ItemTag, Tag WHERE ItemTag.TagId = Tag.Id AND ItemTag.ToDoId=' + id;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a27', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT DISTINCT ToDoList.* FROM ToDoList, ToDoItem, ItemTag WHERE ItemTag.ToDoId = ToDoItem.Id AND ToDoItem.ToDoListId = ToDoList.Id AND ItemTag.TagId=' + id;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a28', function(req, res) {
        var query = 'SELECT ItemTag.TagId, SUM(ToDoItem.Completed=0) as Pending, SUM(ToDoItem.Completed=1) as Completed FROM ItemTag, ToDoItem WHERE ItemTag.ToDoId = ToDoItem.Id GROUP BY ItemTag.TagId';
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a29', function(req, res) {
        var query = 'SELECT WEEK(CompletionDate) AS CompletionWeek, COUNT(*) AS CompletedTodos FROM ToDoItem WHERE ToDoItem.Completed=1 GROUP BY CompletionWeek';
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a210', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT ToDoItem.Id AS ToDoItem, TIMESTAMPDIFF(SECOND, ToDoItem.CreationDate, ToDoItem.CompletionDate) as CompletionTime FROM ItemTag, ToDoItem WHERE ItemTag.ToDoId = ToDoItem.Id AND ItemTag.TagId=' + id + ' HAVING CompletionTime IS NOT NULL AND CompletionTime > 0 ORDER BY CompletionTime ASC LIMIT 10';
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a211', function(req, res) {
        var query = 'SELECT Tag1.TagId as FirstTag, Tag2.TagId as SecondTag, COUNT(*) FROM ItemTag AS Tag1, ItemTag AS Tag2 WHERE Tag1.TagId <> Tag2.TagId AND Tag1.TagId < Tag2.TagId AND Tag1.ToDoId=Tag2.ToDoId GROUP BY Tag1.TagId, Tag2.TagId'
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a212', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT AVG(TIMESTAMPDIFF(SECOND, ToDoItem.CreationDate, ToDoItem.CompletionDate)) AS Average FROM ToDoList, ToDoItem WHERE ToDoItem.ToDoListId=ToDoList.Id AND ToDoItem.Completed=1 AND ToDoList.Id='+ id;
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
    });

    app.get('/a213', function(req, res) {
        var id = req.query.id;
        var query = 'SELECT ToDoItem.* FROM ToDoList, ToDoItem WHERE ToDoItem.ToDoListId=ToDoList.Id AND ToDoItem.Completed=1 AND ToDoList.Id= ' + id + ' HAVING TIMESTAMPDIFF(SECOND, ToDoItem.CreationDate, ToDoItem.CompletionDate) > (SELECT AVG(TIMESTAMPDIFF(SECOND, ToDoItem.CreationDate, ToDoItem.CompletionDate)) FROM ToDoList, ToDoItem WHERE ToDoItem.ToDoListId=ToDoList.Id AND ToDoItem.Completed=1 AND ToDoList.Id=' + id + ')';
        connection.query(query, function(error, result) {
            if (error) {
                console.log(error);
                res.end();
            } else {
                res.json(result);
                res.end();
            }
        });
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





