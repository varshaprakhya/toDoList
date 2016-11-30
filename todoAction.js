( function() {
	var  $output = $("#output"),
	$todoInput = $("#todoInput"),                                 
	todoList = initTodoList() || [],
	todoItem;

	$todoInput.on('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (( key == 13 ) && ( $todoInput.val().length > 0 )) { // 13 is enter
	    	addAction( this.value.trim() );
	    } 
    });

	$output.on('click','.remove', function(e){
		var $listItem = $(this).closest('li');
		var index = $output.find('li').index($listItem);
		removeAction(index);
	});
	$output.on('click','.done', function(e){
		var $listItem = $(this).closest('li');
		var index = $output.find('li').index($listItem);
		doneAction(index);
	});
	$output.on('click','.undo', function(e){
		var $listItem = $(this).closest('li');
		var index = $output.find('li').index($listItem);
		undoAction(index);
	});
	$output.on('click','.edit', function(e){
		var $listItem = $(this).closest('li');
		var index = $output.find('li').index($listItem);
		editAction(index,e);
	});
	$output.on('click','.save', function(e){
		var $listItem = $(this).closest('li');
		var index = $output.find('li').index($listItem);
		saveAction(index,e);
	});

	function addAction(todoItem){
		todoList = addToDo(todoItem, todoList);
		$output.html(buildListHTML(todoList));
		$todoInput.val('');
		saveTodoList();
	}

	function removeAction(index){
		todoList = removeToDo(index, todoList);
		$output.html(buildListHTML(todoList));
		saveTodoList();
	}
	function doneAction(index){
		todoList = markToDoAsDone(index, todoList);
		$output.html(buildListHTML(todoList));
		saveTodoList();
	}
	function undoAction(index){
		todoList = markToDoAsUnDone(index, todoList);
		$output.html(buildListHTML(todoList));
		saveTodoList();
	}
	function editAction(index, e){
		$(e.target).parent().html(getEditHTML(index, todoList[index].task));
	}
	/*function saveAction(index,e) {
	  	var todoItemTask =  $(e.target).prev().val();
	  	if(todoItemTask) {
			todoList = editToDo(index, todoItemTask, todoList);
			$("#todolist").html(buildListHTML(todoList));
		 	saveToDoList();
		}
	}*/
	function saveAction(index, e){
		var newTask = $(e.target).prev().val();
		todoList[index].task = newTask;
		$output.html(buildListHTML(todoList));
		saveTodoList();
	}
	function initTodoList(){
		var todoListString = localStorage.getItem('myTodoList');
		if(todoListString !== "undefined"){
			var todos = JSON.parse(todoListString);
			// $output.html(buildListHTML(todos));
			document.getElementById("output").innerHTML = buildListHTML(todos);
			return todos;
		}
		return [];
	}
	function saveTodoList(){
		localStorage.setItem('myTodoList', JSON.stringify(todoList));
	}
})();   