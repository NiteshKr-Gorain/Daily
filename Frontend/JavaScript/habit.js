function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key, defaultValue = []) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error('Failed to load data for', key, e);
        return defaultValue;
    }
}

function habitManager(action = null, btn = null) {
    let habits = loadData('dlm_habits', []);

    if (action === 'add') {
        const input = document.getElementById('habit-bar');
        if (!input) return;

        const text = input.value.trim();
        if (!text) return;

        habits.push({ text, completed: false, createdAt: new Date().toISOString() });
        saveData('dlm_habits', habits);
        input.value = '';
    }

    if (action === 'complete' && btn) {
        const index = Number(btn.getAttribute('data-index'));
        if (!Number.isNaN(index) && habits[index]) {
            habits[index].completed = !habits[index].completed;
            saveData('dlm_habits', habits);
        }
    }

    if (action === 'delete' && btn) {
        const index = Number(btn.getAttribute('data-index'));
        if (!Number.isNaN(index) && habits[index]) {
            habits.splice(index, 1);
            saveData('dlm_habits', habits);
        }
    }

    const list = document.getElementById('habit-list');
    if (!list) return;

    list.innerHTML = '';

    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = habit.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${habit.completed ? '✅ ' : ''}${habit.text}</span>
            <div>
                <button data-index="${index}" onclick="habitManager('complete', this)">✔</button>
                <button data-index="${index}" onclick="habitManager('delete', this)">❌</button>
            </div>
        `;
        list.appendChild(li);
    });

    const totalHabitsEl = document.getElementById('total-habits');
    const completedHabitsEl = document.getElementById('completed-habits');
    if (totalHabitsEl) totalHabitsEl.textContent = habits.length;
    if (completedHabitsEl) completedHabitsEl.textContent = habits.filter(h => h.completed).length;
}

document.addEventListener('DOMContentLoaded', () => {
    habitManager();
});