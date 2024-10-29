const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

// Load existing todos from localStorage
let allTodos = JSON.parse(localStorage.getItem('todos')) || [];

// Load existing todos on page load
document.addEventListener('DOMContentLoaded', updateTodoList);

// Corrected event listener for form submission
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default form submission behavior
    addTodo(); // Call addTodo function on form submit
});

function addTodo() {
    const todoText = todoInput.value.trim(); // Get the value of the input
    if (todoText.length > 0) { 
        const todoObject = {
            text: todoText, // Changed semicolon to comma here
            completed: false
        };
        allTodos.push(todoObject); // Add the new todo to the array
        updateTodoList(); // Update the displayed todo list
        saveTodos(); // Save the updated list to localStorage
        todoInput.value = ""; // Clear the input field
    }
}

function updateTodoList() {
    todoListUL.innerHTML = ""; // Clear the current list

    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex); // Create a todo item with index
        todoListUL.appendChild(todoItem); // Append the created item to the list
    });
}

function createTodoItem(todo, todoIndex) { 
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoID}" ${todo.completed ? 'checked' : ''} onchange="toggleTodoCompletion(${todoIndex})">
        <label class="custom-checkbox" for="${todoID}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoID}" class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</label>
        <button type="button" class="delete-button" onclick="deleteTodo(${todoIndex})">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;
    return todoLI; // Return the created list item
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson); // Save the todos to localStorage
}

function deleteTodo(index) {
    allTodos.splice(index, 1); // Remove the todo from the array
    updateTodoList(); // Update the displayed list
    saveTodos(); // Save the updated list to localStorage
}

function toggleTodoCompletion(index) {
    allTodos[index].completed = !allTodos[index].completed; // Toggle the completion status
    updateTodoList(); // Update the displayed list
    saveTodos(); // Save the updated list to localStorage
}
