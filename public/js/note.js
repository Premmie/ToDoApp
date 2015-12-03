
function Task(note, date, priority, id) {
	this.note = note;
	this.date = date;
	this.priority = priority;
	this.id = id;
	this.done = false;
}

Task.prototype.getTask = function() {
var String = '<div id="task' + this.id + '" class="task" priority="' + priority(this.priority) + '" date="' + this.date + '"><input type="checkbox" class="task-select"><h3>' 
		+ this.note + '</h3><div class="task-details"><br>Due Date: ' 
		+ this.date + ' Priority: ' + priority(this.priority) + ' Completed: ' 
		+ this.done + '</br></div></div>';
	return String;
}

Task.prototype.add = function(list) { list.append(this.getTask()); $('#task' + this.id).find('.task-details').hide(); }
Task.prototype.finished = function() { this.done = true; }
Task.prototype.delete = function() { $('#task' + this.id).remove(); }
Task.prototype.update = function() {$('#task' + this.id).replaceWith(this.getTask());}
Task.prototype.getNote = function () {return this.note;}
Task.prototype.setNote = function (note) {this.note = note;}
Task.prototype.getDate = function () {return this.date;}
Task.prototype.setDate = function (date) {this.date = date;}
Task.prototype.getPriority = function () {return this.priority;}
Task.prototype.setPriority = function (priority) {this.priority = priority;}
Task.prototype.toJSON = function () { JSON.stringify(this); }
Task.prototype.toJavaScript = function (string) { JSON.parse(string) };

function priority(p) {
	if (p == 0) {
		return 'Normal'
	} else {
		return 'Urgent'
	}
}