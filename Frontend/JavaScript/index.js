function autoUpdate() {
    const now = new Date();
    const hour = now.getHours();

    let greet;
    if (hour < 12) greet = "Good Morning, User!";
    else if (hour < 17) greet = "Good Afternoon, User!";
    else if (hour < 20) greet = "Good Evening, User!";
    else greet = "Good Night, User!";

    const greetingEl = document.getElementById("greeting");
    if (greetingEl) greetingEl.innerText = greet;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    function getSuffix(d) {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }
    const formattedDate = `Today is ${dayName}, ${day}${getSuffix(day)} ${month} ${year}`;

    const dateEl = document.getElementById("date");
    if (dateEl) dateEl.innerText = formattedDate;
}

function updateDashboard() {
    // Load habits from localStorage
    let habits = [];
    try {
        const stored = localStorage.getItem('dlm_habits');
        habits = stored ? JSON.parse(stored) : [];
    } catch (e) {
        habits = [];
    }

    // Calculate habit statistics
    let completedCount = 0;
    let totalPercentage = 0;
    
    habits.forEach(h => {
        const completedDays = h.days.filter(Boolean).length;
        const percent = Math.round((completedDays / 7) * 100);
        totalPercentage += percent;
        
        if (percent === 100) {
            completedCount++;
        }
    });

    // Update total habit count
    const totalEl = document.getElementById('total-habit');
    if (totalEl) totalEl.textContent = habits.length;

    // Update completed habit count (everyday habits)
    const completedEl = document.getElementById('completed-habit');
    if (completedEl) completedEl.textContent = completedCount;

    // Average daily progress
    const avgProgress = habits.length > 0 ? Math.round(totalPercentage / habits.length) : 0;
    console.log(`Habits Dashboard: Total: ${habits.length}, Everyday: ${completedCount}, Average Progress: ${avgProgress}%`);

    // Load tasks (if needed)
    let tasks = [];
    try {
        const stored = localStorage.getItem('dlm_tasks');
        tasks = stored ? JSON.parse(stored) : [];
    } catch (e) {
        tasks = [];
    }

    // Update task counts
    const totalTaskEl = document.getElementById('total-task');
    if (totalTaskEl) totalTaskEl.textContent = tasks.length;
}

window.addEventListener("DOMContentLoaded", () => {
    autoUpdate();
    updateDashboard();
    setInterval(autoUpdate, 60 * 1000);
});

// Real-time sync from other tabs and habit updates
window.addEventListener('storage', (event) => {
    if (event.key === 'dlm_habits' || event.key === 'dlm_tasks') {
        updateDashboard();
    }
});

// Listen for habit updates from habit page
window.addEventListener('habitsUpdated', () => {
    updateDashboard();
});