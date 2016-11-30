function escapeQuotes(text){
	return text.replace(/"/g, "&#34");
}

function getEditHTML(index, todoItemTask){
	var html = '<input id="newTask" type="text" value="'+escapeQuotes(todoItemTask)+'"><button class="save">&#128190;</button>';
	return html;
}

function addToDo(todoItemTask, todoList) {
	var todoList = todoList || [],
		todoItem;

	todoItem = buildToDoItem(todoItemTask);
	if(todoItem){
		todoList.push(todoItem);
		return todoList;
	}
	return false;
}

function buildToDoItem(todoItemTask){
	if(todoItemTask && typeof todoItemTask === 'string') {
		var todoItem = {};
		todoItem.task = todoItemTask;
		todoItem.status = 'Incomplete';
		todoItem.date = (new Date()).getTime();
		return todoItem;
	}
	return null;
}

function removeToDo(index, todoList) {
	index = parseInt(index);
	if(todoList && todoList.length > 0 && !isNaN(index) && index >= 0){
		todoList.splice(index, 1);
		return todoList;
	}
	return false;
}

function editToDo(index, todoItemTask, todoList) {
	index = parseInt(index);
	if(todoList && todoList.length > 0 && !isNaN(index) && index >= 0){
		if(todoItemTask){
			todoList[index].task = todoItemTask;
			todoList[index].date = (new Date()).getTime();
			return todoList;
		}
	}
	return false;
}

function markToDoAsDone(index, todoList) {
	index = parseInt(index);
	if(todoList && todoList.length > 0 && !isNaN(index) && index >= 0){
		todoList[index]['status'] = 'Done';
		todoList[index]['date'] = (new Date()).getTime();
		return todoList;
	}
	return false;
}

function markToDoAsUnDone(index, todoList) {
	index = parseInt(index);
	if(todoList && todoList.length > 0 && !isNaN(index) && index >= 0){
		todoList[index]['status'] = 'Incomplete';
		todoList[index]['date'] = (new Date()).getTime();
		return todoList;
	}
	return false;
}
 
function buildListHTML(todoList) {
	var html = ''; 
 	if(todoList && todoList.length > 0){
	    html = '<ul>';
	    for(var i=0; i<todoList.length; i++) {
	    	if(todoList[i].status === 'Done'){
	    		html += '<li class="taskList"><button class="undo">&#10004;</button>' +
	    			    '<span class="strike-through taskName">' + escapeQuotes(todoList[i].task) + '</span>'+
	    			    '<button class="remove">&#10008;</button>'+
	    			    '<button class="edit">&#9998;</button></li>';
	    	}else{
	    		html += '<li class="taskList"><button class="done">&#10004;</button>'+
	    		'<span class="taskName">' + escapeQuotes(todoList[i].task) + '</span>'+
	    		'<button class="remove")">&#10008;</button>'+
	    		'<button class="edit">&#9998;</button></li>';
	    	}	        
	    };
	    html += '</ul>';
 	}
    return html;
}


if (typeof module !== 'undefined' && module.exports != null){
  exports.buildToDoItem = buildToDoItem;
  exports.addToDo = addToDo;
  exports.removeToDo = removeToDo;
  exports.editToDo = editToDo;
  exports.markToDoAsDone = markToDoAsDone;
  exports.markToDoAsUnDone = markToDoAsUnDone;
  exports.buildListHTML = buildListHTML;
  exports.getEditHTML = getEditHTML;
}
