function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultValue = []) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error('Failed to load planner data', e);
        return defaultValue;
    }
}

function renderPlanner() {
    const tasks = loadData('dlm_tasks', []);
    const list = document.getElementById('list');
    if (!list) return;

    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        const displayText = task.completed ? `✅ ${task.time} - ${task.text}` : `${task.time} - ${task.text}`;

        li.innerHTML = `
            <span>${displayText}</span>
            <div>
                <button class="tick-btn" data-index="${index}" onclick="toggleTask(${index})">✔</button>
                <button class="delete-btn" data-index="${index}" onclick="removeTask(${index})">❌</button>
            </div>
        `;
        list.appendChild(li);
    });

    const totalTaskEl = document.getElementById('total-task');
    if (totalTaskEl) totalTaskEl.textContent = tasks.length;

    const completedTaskEl = document.getElementById('completed-task');
    if (completedTaskEl) completedTaskEl.textContent = tasks.filter(t => t.completed).length;
}

function addTask() {
    const taskInput = document.getElementById('task');
    const timeInput = document.getElementById('time');
    if (!taskInput || !timeInput) return;

    const text = taskInput.value.trim();
    const time = timeInput.value;
    if (!text || !time) return;

    const tasks = loadData('dlm_tasks', []);
    tasks.push({ text, time, completed: false, createdAt: new Date().toISOString() });
    saveData('dlm_tasks', tasks);

    taskInput.value = '';
    timeInput.value = '';

    renderPlanner();
}

function toggleTask(index) {
    const tasks = loadData('dlm_tasks', []);
    if (!tasks[index]) return;
    tasks[index].completed = !tasks[index].completed;
    saveData('dlm_tasks', tasks);
    renderPlanner();
}

function removeTask(index) {
    const tasks = loadData('dlm_tasks', []);
    if (!tasks[index]) return;
    tasks.splice(index, 1);
    saveData('dlm_tasks', tasks);
    renderPlanner();
}

document.addEventListener('DOMContentLoaded', renderPlanner);