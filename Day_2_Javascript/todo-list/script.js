// DOM Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterBtns = document.querySelectorAll(".filter-btn");

// Stats elements
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

// State
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Initialize app
function init() {
  renderTasks();
  updateStats();

  // Add event listeners
  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
  });

  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Set current filter and re-render
      currentFilter = this.dataset.filter;
      renderTasks();
    });
  });
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task); // Add to beginning of array
  saveTasks();
  renderTasks();
  updateStats();

  // Clear input and focus
  taskInput.value = "";
  taskInput.focus();

  // Show success animation
  addBtn.innerHTML = '<i class="fas fa-check"></i> Added!';
  setTimeout(() => {
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
  }, 2000);
}

// Render tasks based on current filter
function renderTasks() {
  // Filter tasks
  let filteredTasks = tasks;
  if (currentFilter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  // Clear task list
  taskList.innerHTML = "";

  // Show empty state if no tasks
  if (filteredTasks.length === 0) {
    taskList.appendChild(emptyState);
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  // Add each task to the list
  filteredTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.setAttribute("data-id", task.id);

    taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${
                      task.completed ? "checked" : ""
                    }>
                    <span class="task-text ${
                      task.completed ? "completed" : ""
                    }">${task.text}</span>
                    <div class="task-actions">
                        <button class="task-btn edit" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

    taskList.appendChild(taskItem);

    // Add event listeners for this task
    const checkbox = taskItem.querySelector(".task-checkbox");
    const editBtn = taskItem.querySelector(".edit");
    const deleteBtn = taskItem.querySelector(".delete");

    // Toggle completion
    checkbox.addEventListener("change", function () {
      toggleTaskCompletion(task.id);
    });

    // Edit task
    editBtn.addEventListener("click", function () {
      editTask(task.id);
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });
  });
}

// Toggle task completion status
function toggleTaskCompletion(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
    renderTasks();
    updateStats();
  }
}

// Edit task text
function editTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) return;

  const currentText = tasks[taskIndex].text;
  const newText = prompt("Edit your task:", currentText);

  if (newText !== null && newText.trim() !== "") {
    tasks[taskIndex].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete a task
function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
  }
}

// Update statistics
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initialize the app when page loads
document.addEventListener("DOMContentLoaded", init);
