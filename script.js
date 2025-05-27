window.onload = function() {
    loadTasks();
    loadTheme();
};

function addTask() {
    let input = document.getElementById("taskInput");
    let dateInput = document.getElementById("dueDate");
    let taskText = input.value.trim();
    let dueDate = dateInput.value;

    if (taskText !== "") {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, due: dueDate, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks();
        input.value = "";
        dateInput.value = "";
        showNotification("Task Added Successfully!");
    } else {
        alert("Please enter a task.");
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    showNotification("Task Deleted Successfully!");
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();

    let notificationText = tasks[index].completed ? "Task Completed!" : "Task Reopened!";
    showNotification(notificationText);
}

function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        localStorage.removeItem('tasks');
        renderTasks();
        showNotification("All Tasks Cleared!");
    }
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `${task.text} ${task.due ? `(Due: ${task.due})` : ''} 
                        <button onclick="deleteTask(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </button>`;

        li.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                toggleComplete(index);
            }
        });

        taskList.appendChild(li);
    });
}

function loadTasks() {
    renderTasks();
}

function showNotification(message) {
    let notification = document.getElementById("taskNotification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function toggleMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
}
