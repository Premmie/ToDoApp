/**
 * Created by Luke on 11-1-2016.
 */

exports.addRoutes = function(app) {

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

}