/**
 * Created by Luke on 11-1-2016.
 */

exports.addRoutes = function(app) {
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