// Simple Habit Manager
let habits = [];

// Load habits from localStorage
function loadHabits() {
    try {
        const stored = localStorage.getItem('dlm_habits');
        habits = stored ? JSON.parse(stored) : [];
    } catch (e) {
        habits = [];
    }
}

// Save habits to localStorage
function saveHabits() {
    localStorage.setItem('dlm_habits', JSON.stringify(habits));
}

// Display all habits in the table
function displayHabits() {
    const tbody = document.getElementById('habit-list');
    tbody.innerHTML = '';

    // Update counts
    const totalEl = document.getElementById('habit-total');
    const completedEl = document.getElementById('habit-completed');
    
    if (totalEl) totalEl.textContent = habits.length;
    
    let completed = 0;
    habits.forEach(h => {
        const daysChecked = h.days.filter(d => d).length;
        if (daysChecked === 7) completed++;
    });
    if (completedEl) completedEl.textContent = completed;

    // If no habits, show message
    if (habits.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 20px; color: #999;">No habits yet. Add one to get started!</td></tr>';
        return;
    }

    // Create table rows
    habits.forEach((habit, habitIdx) => {
        const row = document.createElement('tr');
        
        // Habit name
        const nameCell = document.createElement('td');
        nameCell.innerHTML = `<strong>${habit.text}</strong>`;
        row.appendChild(nameCell);

        // 7 day checkboxes
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        habit.days.forEach((dayValue, dayIdx) => {
            const dayCell = document.createElement('td');
            dayCell.style.textAlign = 'center';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'day-checkbox';
            checkbox.checked = dayValue;
            checkbox.dataset.habitIdx = habitIdx;
            checkbox.dataset.dayIdx = dayIdx;
            checkbox.title = days[dayIdx];
            
            checkbox.addEventListener('change', (e) => {
                habits[habitIdx].days[dayIdx] = e.target.checked;
                saveHabits();
                displayHabits();
            });
            
            dayCell.appendChild(checkbox);
            row.appendChild(dayCell);
        });

        // Percentage
        const daysChecked = habit.days.filter(d => d).length;
        const percent = Math.round((daysChecked / 7) * 100);
        const percentCell = document.createElement('td');
        percentCell.style.textAlign = 'center';
        percentCell.style.fontWeight = 'bold';
        
        if (percent === 100) {
            percentCell.innerHTML = '✓ Everyday';
            percentCell.style.color = '#27ae60';
        } else {
            percentCell.innerHTML = percent + '%';
            percentCell.style.color = percent >= 50 ? '#f39c12' : '#e74c3c';
        }
        row.appendChild(percentCell);

        // Delete button
        const actionCell = document.createElement('td');
        actionCell.style.textAlign = 'center';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.padding = '8px 12px';
        deleteBtn.style.backgroundColor = '#e74c3c';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.fontWeight = 'bold';
        
        deleteBtn.addEventListener('click', () => {
            if (confirm('Delete this habit?')) {
                habits.splice(habitIdx, 1);
                saveHabits();
                displayHabits();
            }
        });
        
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}

// Add new habit
function addHabit() {
    const input = document.getElementById('habit-bar');
    const habitName = input.value.trim();
    
    if (!habitName) {
        alert('Please enter a habit name');
        return;
    }

    habits.push({
        text: habitName,
        days: [false, false, false, false, false, false, false]
    });

    saveHabits();
    input.value = '';
    displayHabits();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadHabits();
    displayHabits();

    // Add button
    const addBtn = document.getElementById('add-habits-btn');
    if (addBtn) {
        addBtn.addEventListener('click', addHabit);
    }

    // Enter key support
    const input = document.getElementById('habit-bar');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addHabit();
            }
        });
    }
});

// Listen for storage changes from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'dlm_habits') {
        loadHabits();
        displayHabits();
    }
});

