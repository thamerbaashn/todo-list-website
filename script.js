const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const todoList = document.getElementById('todoList');

let todos = [];

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (todoInput.value.trim() === '' || dateInput.value === '') {
        alert('Isi kegiatan dan tanggal dulu!');
        return;
    }

    todos.push({
        text: todoInput.value,
        date: dateInput.value,
        completed: false
    });

    todoInput.value = '';
    dateInput.value = '';

    renderTodos();
});

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = `${todo.text} - ${todo.date}`;

        if (todo.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', function() {
            todos[index].completed = !todos[index].completed;
            renderTodos(filter);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Hapus';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            todos.splice(index, 1);
            renderTodos(filter);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function filterTodos(status) {
    renderTodos(status);
}