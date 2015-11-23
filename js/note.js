
function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.getTask = function() {
var String = '<div id="task' + this.id + '" class="note" priority="' + priority(this.priority) + '" date="' + this.date + '"><h3><input type="checkbox" id=' 
		+ this.id + ' value="selected">' + this.note + '</h3><p>Due Date: ' 
		+ this.date + '</p><p>Priority: ' + priority(this.priority) + '</p><p>Completed: ' 
		+ this.done + '</p></div>';
	return String;
}

Task.prototype.delete = function() {
	var div = document.getElementById( "task" + this.id);
	div.parentNode.removeChild(div);
}

Task.prototype.finished = function() {
	this.done = true;
}

Task.prototype.update = function() {$('#task' + this.id).replaceWith(this.getTask());}
Task.prototype.getNote = function () {return this.note;}
Task.prototype.setNote = function (note) {this.note = note;}
Task.prototype.getDate = function () {return this.date;}
Task.prototype.setDate = function (date) {this.date = date;}
Task.prototype.getPriority = function () {return this.priority;}
Task.prototype.setPriority = function (priority) {this.priority = priority;}

function priority(p) {
	if (p == 0) {
		return 'Normal'
	} else {
		return 'Urgent'
	}
}