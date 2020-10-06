//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//FUNCTIONS
function addTodo() {
  //prevent form from submit
  event.preventDefault();
  //TODO DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CREATE LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TO LOCAL STORAGE
  saveLocalTodo(todoInput.value);

  //CHECK BUTTONS
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  //DELETE BUTTON
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //CLEAR TODO INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //here classList[0]  means  class of every single element
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    //ANIMATION HERE
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("checkMark"); //we use toggle here inplace of add(toggle works like on off switch)
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checkMark")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("checkMark")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function saveLocalTodo(todo) {
  //CHECK
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //CHECK BUTTONS
    const completedButton = document.createElement("button");
    completedButton.innerHTML =
      '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
