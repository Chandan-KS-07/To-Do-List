let taskList = document.getElementById("task-list");
let taskInput = document.getElementById("task-input");

window.onload = function () {
  loadTasks();
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (isCompleted) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskItem = createTaskElement(task.text, task.completed);
    taskList.appendChild(taskItem);
  });
}
