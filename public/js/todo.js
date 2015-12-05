var list = {};
var editing;

window.onload = function() {
	setup();
	var $edit = $('#edit');
	var $body = $('body');
	$('#new').submit(function(event) {
		addTask();
		event.preventDefault();
	});
	$edit.submit(function(event) {
		editTask(editing);
		event.preventDefault();
	});
	$edit.hide();
	$('#new-duedate').val(new Date().toDateInputValue());
	$('#new-confirm').click(function() { addTask(); });
	$('#edit-confirm').click(function() { editTask(editing); });
	$('#apply-confirm').click(function() { applyAction(); });
	$('#sort-select').change(function() { sortTasks(); });
	$('#filter-select').change(function() { filterTasks(); });
	$('.select-all').change(function(event) { selectAll($('.select-all').prop('checked')); });
	$body.on('click', '.task', function(event) {
		var task = $(this);
		var id = getId(task.attr('id'));
		task.attr('editing', true);
		loadTask(id);
	});
};

function applyAction() {
	var action = $('#action-select').val();
	if (action == 0) {
		deleteTask();
	} else {
		finishTask();
	}
}

function filterTasks() {
	$('#task-list').empty();
	var filter = $('#filter-select').val();
	if (filter == 0) {
		$.each(list, function(id, task) {
			task.add($('#task-list'));
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

function selectAll(value) {
	$('input:checkbox:not(.select-all)').prop('checked', value);
}

function clearTask() {
	$('#edit-descr').val('');
	$('#edit-duedate').val(new Date().toDateInputValue());
	$('#edit-priority').val(0);
	$('#edit').hide();
}

function loadTask(id) {
	var task = list[id];
	$('#edit-descr').val(task.getNote());
	$('#edit-duedate').val(task.getDate());
	$('#edit-priority').val(task.getPriority());	 
	$('#edit').show();	
	editing = id;
}

function editTask(id) {
	var task = list[id];
	task.setNote($('#edit-descr').val());
	task.setDate($('#edit-duedate').val());
	task.setPriority($('#edit-priority').val());	
	filterTasks();
	clearTask();
}

function setup() {
	getTaskList();
}

function getTaskList() {
	$.getJSON('/tasklist', function(res) {
		$.each(res, function(id, task) {
			list[id] = new Task(task.note, task.date, task.priority, task.id);
		});
		filterTasks();
	});
}

function createTask(note, date, priority) {
	var data = { note:note, date:date, priority:priority };
	$.post('/add', data, function(res) {
		var task = new Task(res.note, res.date, res.priority, res.id);
		list[res.id] = task;
		filterTasks();
	}, 'json');
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
			return $(a).attr('date') < ($(b).attr('date'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 1) {
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('date') > ($(b).attr('date'));
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

function deleteTask() {
    if( $('input:checkbox:checked:not(.select-all)').length > 0 ) {
        $.each( $('input:checkbox:checked:not(.select-all)'), function (index, value) {
            var id = getId($(value).parent().attr('id'));
            var task = list[id];
			if (id == editing) {
				clearTask();
			}
            task.delete();
        } );
    }
    else {
        alert('Select at least one task!');
    }
}

function finishTask() {
    if( $('input:checkbox:checked:not(.select-all)').length > 0 ) {
        $.each($('input:checkbox:checked:not(.select-all)'), function(index, value) {
            var id = getId($(value).parent().attr('id'));
            var task = list[id];
            task.finished();
			task.update();
        });
    }
    else {
		alert('Select at least one task!');
    }
}

// Extra functions for convenience

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function getId(string) {
	return string.match(/\d+/)[0];
} 
