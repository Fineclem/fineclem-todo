
const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const editingId = document.getElementById("editingId");
const todosList = document.getElementById("todosList");
const emptyState = document.getElementById("emptyState");
const submitBtn = document.getElementById("submitBtn");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todosList.innerHTML = "";
  if (todos.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  todos.forEach((todo) => {
    const item = document.createElement("div");
    item.className = `list-group-item d-flex justify-content-between align-items-start ${todo.completed ? "todo-completed" : ""}`;

    item.innerHTML = `
      <div class="d-flex flex-column">
        <span class="todo-title fw-bold">${todo.title}</span>
        <small class="text-muted">${todo.description || ""}</small>
      </div>
      <div class="btn-group btn-group-sm">
      <button class="btn btn-warning edit-btn">✏</button>
      <button class="btn btn-danger delete-btn">🗑</button>
      </div>
      `;
      
      // <button class="btn btn-success toggle-btn">✔</button>
   
    // item.querySelector(".toggle-btn").addEventListener("click", () => {
    //   todo.completed = !todo.completed;
    //   saveTodos();
    //   renderTodos();
    // });

    // Edit
    item.querySelector(".edit-btn").addEventListener("click", () => {
  titleInput.value = todo.title;
  descInput.value = todo.description;
  editingId.value = todo.id;

  // Change Add → Save
  submitBtn.textContent = "Save";
  submitBtn.classList.remove("btn-primary");
  submitBtn.classList.add("btn-success");
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title) return;

  if (editingId.value) {
    // ✅ Update existing todo
    todos = todos.map((t) =>
      t.id === parseInt(editingId.value)
        ? { ...t, title, description }
        : t
    );
    editingId.value = "";
  } else {
    // ✅ Create new todo
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    todos.push(newTodo);
  }

  saveTodos();
  renderTodos();
  todoForm.reset();

  // ✅ Reset button text and color AFTER form reset
  submitBtn.textContent = "Add";
  submitBtn.classList.remove("btn-success");
  submitBtn.classList.add("btn-primary");
});



    // Delete
    item.querySelector(".delete-btn").addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    todosList.appendChild(item);
  });
}

// --- Form submit (Add / Update) ---
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title) return;

  if (editingId.value) {
    // Update
    todos = todos.map((t) =>
      t.id === parseInt(editingId.value)
        ? { ...t, title, description }
        : t
    );
    editingId.value = "";
  } else {
    // Create
    const newTodo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    todos.push(newTodo);
  }

  saveTodos();
  renderTodos();
  todoForm.reset();
});

// Initial render
renderTodos();
