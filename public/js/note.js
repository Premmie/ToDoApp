
function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.getTask = function() {
var String = '<div id="task' + this.id + '" class="task" priority="' + this.priority + '" date="' + this.date + '" editing="false">' +
		'<input type="checkbox" class="task-select">' +
		'<div class="task-details"><input type="text" class="note-input" value="' + this.note +'" disabled>' +
		'<input type="date" class="date-input" value="'+ this.date +'" disabled>' +
		'<select class="priority-input"><option value="0">Normal</option><option value="3">Urgent</option></select></div>' +
		'</div>';
	return String;
}

Task.prototype.add = function(list) { list.append(this.getTask()); $('#task' + this.id).find('.priority-input').hide(); };
Task.prototype.finished = function() { this.done = true; };
Task.prototype.delete = function() { $('#task' + this.id).remove(); };
Task.prototype.update = function() {$('#task' + this.id).replaceWith(this.getTask());};
Task.prototype.getNote = function () {return this.note;};
Task.prototype.setNote = function (note) {this.note = note;};
Task.prototype.getDate = function () {return this.date;};
Task.prototype.setDate = function (date) {this.date = date;};
Task.prototype.getPriority = function () {return this.priority;};
Task.prototype.setPriority = function (priority) {this.priority = priority;};