var list = [];
var counter = 0;
var editing

window.onload = function () {
	$('#new').submit(function(event) {
		addTask();
		event.preventDefault();
	});
	$('#edit').submit(function(event) {
		editTask(editing);
		event.preventDefault();
	});	
	$('#edit').hide();
	$('#new-duedate').val(new Date().toDateInputValue());
	$('#new-confirm').click(function() { addTask(); });
	$('#edit-confirm').click(function() { editTask(editing); });
	$('#delete-task').click(function() { deleteTask(); });
	$('#finish-task').click(function() { finishTask(); });
	$('#select-all').click(function() { selectAll(); });
	$('#select-none').click(function() { selectNone(); });
	$('#sort-select').change(function() { sortTasks(); });
	$('#filter-select').change(function() { filterTasks(); });
	$('body').on('mouseenter', '.task', function(event) {
		$(this).find('.task-details').show();
	});
	$('body').on('mouseleave', '.task', function(event) {
		$(this).find('.task-details').hide();
	});
	$('body').on('click', '.task', function(event) {
		var id = getId($(this).attr('id'));
		loadTask(id);
	});
}

function filterTasks() {
	$('#task-list').empty();
	filter = $('#filter-select').val();
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

function selectAll() {
	$('input:checkbox').prop('checked', true);
}

function selectNone() {
	$('input:checkbox').prop('checked', false);
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

function addTask() {
	if(($('#new-descr').val() == '')) {
        alert( 'Please enter a description of the task!' );
		return false;
	} else {
		var name = $('#new-descr').val();
		var date = $('#new-duedate').val();
		var priority = $('#new-priority').val();
		var task = new Task(name, date, priority, counter);
		task.add($('#task-list'));
		list[counter] = task;
		counter = counter + 1;
	}
	sortTasks();
	$('#new-descr').val('');
	$('#new-duedate').val(new Date().toDateInputValue());
	$('#new-priority').val(0);	
}

function sortTasks() {
	if ($('#sort-select').val() == 0) {
		console.log(0);
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('date') < ($(b).attr('date'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 1) {
		console.log(1);
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('date') > ($(b).attr('date'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 2) {
		console.log(2);
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('priority') > ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 3) {
		console.log(2);
		$('#task-list').find('.task').sort(function(a, b) {
			return $(a).attr('priority') < ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	}
}

function deleteTask() {
    if( $('input:checkbox:checked').length > 0 ) {
        $.each( $('input:checkbox:checked'), function (index, value) {
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
    if( $('input:checkbox:checked').length > 0 ) {
        $.each( $( 'input:checkbox:checked' ), function (index, value) {
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
