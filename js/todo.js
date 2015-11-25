var list = {};
var counter = 0;
var editing

window.onload = function () {
	$('#new-add').click(function() { addTask(); });
	$('#delete-task').click(function() { deleteTask(); });
	$('#finish-task').click(function() { finishTask(); });
	$('#edit-task').click(function() { editTask(); });	
	$('#sort-select').change(function() { sortTasks(); });
	$('#new-task').submit(function(event) {
		addTask();
		event.preventDefault();
	});
}

function addTask() {
	if(($('#new-descr').val() == '' )) {
        alert( 'Please enter a description of the task!' );
		return false;
	} else if(inEditMode()) {
		var task = list[editing];
		task.setNote($('#new-descr').val());
		task.setDate($('#new-duedate').val());
		task.setPriority($('#new-priority').val());
		task.update();   
		editMode();
	} else {
		var name = $('#new-descr').val();
		var date = $('#new-duedate').val();
		var priority = $('#new-priority').val();
		var task = new Task(name, date, priority, counter);
		list[counter] = task;
		$('#task-list').append(task.getTask());
		counter = counter + 1;
	}
	$('#new-descr').val('');
	$('#new-duedate').val('');
	$('#new-priority').val(0);	
}

function inEditMode() {
	var title = $('#form-legend').text();
	if (title == 'New Task') {
		return false;
	} else {
		return true;
	}
}

function editMode() {
	var title = $('#form-legend').text();
	if (title == 'New Task') {
		$('#form-legend').replaceWith('<legend id="form-legend">Edit Task</legend>');
		$('#delete-task').prop('disabled', true);
		$('#finish-task').prop('disabled', true);
		$('#edit-task').prop('disabled', true);
	} else {
		$('#form-legend').replaceWith('<legend id="form-legend">New Task</legend>');
		$('#delete-task').prop('disabled', false);
		$('#finish-task').prop('disabled', false);
		$('#edit-task').prop('disabled', false);
	}
}

function sortTasks() {
	if ($('#sort-select').val() == 0) {
		console.log(0);
		$('#task-list').find('.note').sort(function(a, b) {
			return $(a).attr('date') < ($(b).attr('date'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 1) {
		console.log(1);
		$('#task-list').find('.note').sort(function(a, b) {
			return $(a).attr('date') > ($(b).attr('date'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 2) {
		console.log(2);
		$('#task-list').find('.note').sort(function(a, b) {
			return $(a).attr('priority') > ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	} else if ($('#sort-select').val() == 3) {
		console.log(2);
		$('#task-list').find('.note').sort(function(a, b) {
			return $(a).attr('priority') < ($(b).attr('priority'));
		}).appendTo($('#task-list'));
	}
}

function editTask() {
    if($('input:checkbox:checked').length == 1 ) {
        $.each( $('input:checkbox:checked'), function (index, value) {
			var id = $(value).attr('id')
            var task = list[id];
			editing = id;
			editMode();
			$('#new-descr').val(task.getNote());
			$('#new-duedate').val(task.getDate());
			$('#new-priority').val(task.getPriority());	         
        });
    }
    else {
        alert('Select only one task to edit!');
    }
}

function deleteTask() {
    if( $('input:checkbox:checked').length > 0 ) {
        $.each( $('input:checkbox:checked'), function (index, value) {
            var checkbox = $(value);
            var id = (checkbox.attr('id'));
            var task = list[id];
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
            var checkbox = $(value);
            var id = (checkbox.attr('id'));
            var task = list[id];
            task.finished();
			task.update();
        });
    }
    else {
		alert('Select at least one task!');
    }
}

