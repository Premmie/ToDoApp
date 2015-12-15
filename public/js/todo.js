var list = {};

window.onload = function() {
	var $edit = $('#edit-form');
	var $body = $('body');
    getTaskList();
    $('#edit').hide();
	$('#new-form').submit(function(event) {
		event.preventDefault();
        addTask();
	});
	$edit.submit(function(event) {
        event.preventDefault();
		editTask();
	});
	$('#new-duedate').val(new Date().toDateInputValue());
	$('#apply-confirm').click(function() { applyAction(); });
	$('#sort-select').change(function() { sortTasks(); });
	$('#filter-select').change(function() { filterTasks(); });
	$('.select-all').change(function(event) { selectAll($('.select-all').prop('checked'));});
	$body.on('click', '.task-details', function(event) {
		var id = getId($(this).parent().attr('id'));
        $edit.prop('task', id);
        $('.task').removeClass('selected');
        $(this).parent().addClass('selected');
		loadEdit();
	});
};

function applyAction() {
	if ($('#action-select').val() == 0) {
		deleteTasks();
	} else {
		finishTasks();
	}
    $('.select-all').val(false);
}

function selectAll(value) {
	$('input:checkbox:not(.select-all)').prop('checked', value);
}

function clearEdit() {
	$('#edit-descr').val('');
	$('#edit-duedate').val(new Date().toDateInputValue());
	$('#edit-priority').val(0);
	$('#edit').hide();
    $('#new').show();
    $('.task').removeClass('selected');
}

function loadEdit() {
	var task = list[$('#edit-form').prop('task')];
    if (task != undefined) {
        $('#edit-descr').val(task.getNote());
        $('#edit-duedate').val(task.getDate());
        $('#edit-priority').val(task.getPriority());
        $('#edit').show();
        $('#new').hide();
    }
}

function deleteTask(id) {
    var data = {id: id};
    $.post('/delete', data, function(res) {
        list[res].delete();
        delete list[res];
    }, 'json');
}

function createTask(note, date, priority) {
    var data = { note:note, date:date, priority:priority };
    $.post('/add', data, function(res) {
        var task = new Task(res.note, res.date, res.priority, res.id);
        list[res.id] = task;
        filterTasks();
    }, 'json');
}

function updateTask(note, date, priority, done, id) {
    var data = {note: note,
        date: date,
        priority: priority,
        done: done,
        id: id};
    console.log(data);
    $.post('/update', data, function(res) {
        if (list[res.id] != undefined) {
            var task = list[res.id];
            task.setNote(res.note);
            task.setDate(res.date);
            task.setPriority(res.priority);
            if (res.done) {
                task.finished();
            }
            task.update();
        }
    }, 'json');
}

function editTask() {
    var id = $('#edit-form').prop('task');
    var task = list[id];
    if (task != undefined) {
        updateTask($('#edit-descr').val(), $('#edit-duedate').val(),
        $('#edit-priority').val(), undefined, id);
        filterTasks();
        clearEdit();
    }
}

function getTaskList() {
	$.getJSON('/tasklist', function(res) {
		$.each(res, function(index, task) {
            var newTask = new Task(task.note, task.date, task.priority, task.id);
            if (task.done) {
                newTask.finished();
            }
			list[task.id] = newTask;
		});
		filterTasks();
	});
}

function addTask() {
	if(($('#new-descr').val() == '')) {
        alert( 'Please enter a description of the task!' );
		return false;
	} else {
		var note = $('#new-descr').val();
		var date = $('#new-duedate').val();
		var priority = $('#new-priority').val();
		createTask(note, date, priority);
	}
	$('#new-descr').val('');
	$('#new-duedate').val(new Date().toDateInputValue());
	$('#new-priority').val(0);	
}

function sortTasks() {
	if ($('#sort-select').val() == 0) {
		$('#task-list').find('.task').sort(function(a, b) {
			return new Date($(a).attr('date')) > new Date(($(b).attr('date')));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 1) {
		$('#task-list').find('.task').sort(function(a, b) {
            return new Date($(a).attr('date')) < new Date(($(b).attr('date')));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 2) {
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('priority') > ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 3) {
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('priority') < ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	}
}

function filterTasks() {
    $('#task-list').empty();
    var filter = $('#filter-select').val();
    if (filter == 0) {
        $.each(list, function(id, task) {
            task.add($('#task-list'));
            if (new Date(task.getDate()) < new Date(new Date().toDateString())) {
                $('#task' + task.getId()).addClass('overdue');
            }
        });
    } else if (filter == 1) {
        var today = new Date().toDateInputValue();
        $.each(list, function(id, task) {
            if (task.getDate() == today) {
                task.add($('#task-list'));
            }
        });
    } else if (filter == 2) {
        $.each(list, function(id, task) {
            if (task.getPriority() == 3) {
                task.add($('#task-list'));
            }
        });
    } else if (filter == 3) {
        $.each(list, function(id, task) {
            if (task.getPriority() == 0) {
                task.add($('#task-list'));
            }
        });
    }
    sortTasks();
}

function deleteTasks() {
    var checkboxes = $('input:checkbox:checked:not(.select-all)');
    if(checkboxes.length > 0) {
        $.each(checkboxes, function (index, value) {
            var id = getId($(value).attr('id'));
            var task = list[id];
            if (task != undefined) {
                if ($('#edit-form').prop('task') == id) {
                    clearEdit();
                }
                deleteTask(id);
            }
        } );
    }
}

function finishTasks() {
    var checkboxes = $('input:checkbox:checked:not(.select-all)');
    if(checkboxes.length > 0) {
        $.each(checkboxes, function(index, value) {
            var id = getId($(value).attr('id'));
            if (list[id] != undefined) {
                updateTask(undefined, undefined, undefined, true, id);
            }
        });
    }
}

// Extra functions for convenience

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function getId(string) {
    if (string != undefined) {
        return string.match(/\d+/)[0];
    }
	return 0;
} 
