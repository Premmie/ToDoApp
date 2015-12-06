
function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.getTask = function() {
var String = '<div id="task' + this.id + '" class="task" priority="' + this.priority + '" date="' + this.date + '"done="' + this.done + '" editing="false">' +
		'<div class="task-select"><input type="checkbox" id="task-select' + this.id + '"></div>' +
		'<div class="task-details task-priority"></div><div class="task-details task-note">' + this.note +
		'</div><div class="task-details task-date"> ' + this.date +
		'</div></div>';
	return String;
}

Task.prototype.add = function(list) { list.append(this.getTask()); $('#task' + this.id).find('.priority-input').hide(); };
Task.prototype.finished = function() { this.done = true; };
Task.prototype.isFinished = function() { return this.done; };
Task.prototype.delete = function() { $('#task' + this.id).remove(); };
Task.prototype.update = function() {$('#task' + this.id).replaceWith(this.getTask());};
Task.prototype.getNote = function () {return this.note;};
Task.prototype.setNote = function (note) {this.note = note;};
Task.prototype.getDate = function () {return this.date;};
Task.prototype.setDate = function (date) {this.date = date;};
Task.prototype.getPriority = function () {return this.priority;};
Task.prototype.setPriority = function (priority) {this.priority = priority;};
Task.prototype.getId = function () {return this.id;};