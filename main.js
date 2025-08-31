const serverURL = "http://localhost:5000";

let tasks = [];
let editTaskId = null;

const getAllTodos = async () => {
  const res = await fetch(`${serverURL}/todos`);
  if (!res.ok) {
    return;
  }
  const data = await res.json();
  if (!data.todos) {
    alert("An error occurred fetching your tasks.");
    return;
  }
  tasks = data.todos;
};

async function renderTasks() {
  await getAllTodos();
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  window.addEventListener("load", () => {
    if (tasks && tasks.length === 0) {
      alert("No todos yet. Add a todo to get going.");
    }
  });
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <span class="task-name">${task.body}</span>
            <div class="actions">
                <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteTask(${index})" id="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
    todoList.appendChild(listItem);
  });
}

async function addTask() {
  const taskName = document.getElementById("new-task").value;
  if (taskName.trim() === "") return;

  tasks.push({ name: taskName, complete: false });

  const res = await fetch(`${serverURL}/todos`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ body: taskName, complete: false }),
  });
  if (res.status === 409) {
    alert(`Item: ${taskName} already exists.`);
  }
  if (!res.ok) {
    return;
  }
  document.getElementById("new-task").value = "";
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  editTaskId = task.id;
  document.getElementById("edit-task-name").value = task.body;
  document.getElementById("edit-popup").style.display = "flex";
}

async function saveEditedTask() {
  if (editTaskId === null) return;
  const taskName = document.getElementById("edit-task-name").value;
  if (taskName.trim() === "") return;

  const updatedTask = { body: taskName, complete: false };
  const remainingTasks = tasks.filter((item) => item.id !== editTaskId);

  tasks = [...remainingTasks, updatedTask];
  const res = await fetch(`${serverURL}/todos/${editTaskId}`, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "PUT",
    body: JSON.stringify({ body: taskName, complete: false }),
  });
  if (!res.ok) {
    return;
  }

  closePopup();
  renderTasks();
  editTaskId = null;
}

async function deleteTask(index) {
  const task = tasks[index];
  const remainingTasks = tasks.filter((item) => item.id !== task.id);
  tasks = [...remainingTasks];
  const res = await fetch(`${serverURL}/todos/${task.id}`, {
    headers: {
      accept: "application/json",
    },
    mode: "cors",
    method: "DELETE",
  });
  if (!res.ok) {
    return;
  }
  renderTasks();
}

function closePopup() {
  document.getElementById("edit-popup").style.display = "none";
}

// Initial render
renderTasks();
