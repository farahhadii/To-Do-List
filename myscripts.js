    // Model
    let todosArr;

    const Todos = JSON.parse(localStorage.getItem('todos'));
    
    if (Array.isArray(Todos)) {
    todosArr = Todos;
    } else {
        todosArr = [{
            titleTodo: 'Have breakfast with family',
            dueDateTodo: '2023-01-10',
            id: '1'
            }, {
            titleTodo: 'Complete a previous task',
            dueDateTodo: '2023-01-10',
            id: '2'
            }, {
            titleTodo: 'Discuss new project with team',
            dueDateTodo: '2023-01-10',
            id: '3'
            }, {
            titleTodo: 'Study for Exam',
            dueDateTodo: '2023-01-10',
            id: '4'
        },{
            titleTodo: 'Meeting at 2:00pm',
            dueDateTodo: '2023-01-10',
            id: '5'
        },{
            titleTodo: 'Read a book',
            dueDateTodo: '2023-01-10',
            id: '6'
            }
        ];
    }

    
    function makeTodo(title, datePicked) {
        const idTodo =  "" + new Date().getTime();

        todosArr.push({
            titleTodo: title,
            dueDateTodo: datePicked,
            id: idTodo
        });

        saveTodosList(); 
    }

    function alertMessage(title) {
        if (title.trim() === "") {
            window.alert("Please enter a todo");
            return false;
        }
        else {
            return true; 
        }
    }

    function DeleteTodo(idDelete) {
        todosArr = todosArr.filter(function (todo) {
            if (todo.id === idDelete) {
            return false;
            } else {
            return true;
            }
        });

        saveTodosList(); 
    }

    function editElement(idTodo) {
        todosArr.forEach(function (todo) {
            if (todo.id === idTodo) {
            todo.isModifying = true;
            }
        });

        saveTodosList(); 
    }

    function updateElement(todoId, newTitle, newDate) {
        todosArr.forEach(function (todo) {
            if (todo.id === todoId) {
            todo.titleTodo = newTitle;
            todo.dueDateTodo = newDate;
            todo.isModifying = false;
            }
        });
        saveTodosList(); 
    }

    function switchTodo(idTodo, check) {
        todosArr.forEach(function (todo) {
            if (todo.id === idTodo) {
            todo.isFinished = check; 
            }
        });
    }

    function saveTodosList() {
        localStorage.setItem('todos', JSON.stringify(todosArr));
        }

        function changeTodo(editButtonId) {
        todosArr.forEach(function (todo) {
            if (todo.id === editButtonId) {
                todo.isModifying = true; 
            }  
        });
        saveTodosList(); 
    }

    // Controller
    function onAddTodo() {
        const textbox = document.getElementById('todos-title');
        const title = textbox.value;

        if (alertMessage(title) == false) {
            return;
        }
        alertMessage(title);
        
        const date = document.getElementById('generateDate');
        const datePicked = date.value;
        makeTodo(title, datePicked);
        render();
    }

    function onDelete(event) {
        const deleteButton = event.target;
        const idDelete = deleteButton.id;

        DeleteTodo(idDelete);
        render();
        }
        
        function onChange(event) {
        const editingButton = event.target;
        const idTodo = editingButton.dataset.todoId;

        editElement(idTodo);
        render();
    }

    
    function onCheck(event) {
        const checkbox = event.target; 
        const idTodo = checkbox.dataset.todoId;
        const check = checkbox.checked; 

        switchTodo(idTodo, check); 

        render(); 
    }

    function onModify(event) {
        const updateButton = event.target;
        const todoId = updateButton.dataset.todoId;

        const textbox = document.getElementById('change-title' + todoId);
        const newTitle = textbox.value;

        
        if (alertMessage(newTitle) == false) {
            return;
        }
        alertMessage(newTitle);

        const datePicker = document.getElementById('change-date' + todoId);
        const newDate = datePicker.value;

        updateElement(todoId, newTitle, newDate);
        render();
    }


    // View
    function render() {
        document.getElementById('list-todo').innerHTML = '';

        todosArr.forEach(function (todo) {
            const element = document.createElement('div');

            if (todo.isModifying === true) {
            const textboxTitle = document.createElement('input');
            textboxTitle.type = 'text';
            textboxTitle.placeholder = "max characters 26"; 
            textboxTitle.maxLength = "26"; 
            textboxTitle.id = 'change-title' + todo.id;
            textboxTitle.setAttribute('class', 'textbox-title');

            element.appendChild(textboxTitle);

            const dueDate = document.createElement('input');
            dueDate.type = 'date';
            dueDate.id = 'change-date' + todo.id;
            dueDate.setAttribute('class', 'due-date'); 
            
            element.appendChild(dueDate);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onModify;
            updateButton.setAttribute('class', "update-button");
            element.appendChild(updateButton);

            } else {

            element.innerText = ' ' +  todo.titleTodo + ' ' + todo.dueDateTodo;
            element.style.fontSize = "18px";
            element.setAttribute('class', 'title-todo');

            const checkbox = document.createElement('input');        
            checkbox.type =  'checkbox';
            checkbox.dataset.todoId = todo.id;        
            checkbox.onchange = onCheck;            
            checkbox.setAttribute('class', 'checkbox-todo');

            if (todo.isFinished === true) {
                checkbox.checked = true; 
            } else {
                checkbox.checked = false; 
            }
            element.prepend(checkbox); 

            const editingButton = document.createElement('button');
            editingButton.innerText = 'Edit';
            editingButton.onclick = onChange;
            editingButton.dataset.todoId = todo.id;
            editingButton.setAttribute('class', "edit-button");
            element.appendChild(editingButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('class', 'delete-button');
            deleteButton.onclick = onDelete;
            deleteButton.id = todo.id;
            element.appendChild(deleteButton);
            }
            
            const List = document.getElementById('list-todo');
            List.appendChild(element);
        });
    }
    render();

    