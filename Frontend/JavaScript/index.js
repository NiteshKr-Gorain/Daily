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

function loadData(key, defaultValue = []) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error('Failed to load data for', key, e);
        return defaultValue;
    }
}

function initDashboard() {
    autoUpdate();
    setInterval(autoUpdate, 60 * 1000); // update every minute

    const habits = loadData('dlm_habits', []);
    const tasks = loadData('dlm_tasks', []);

    const totalHabitsEl = document.getElementById('total-habits');
    const completedHabitsEl = document.getElementById('completed-habits');
    const totalTaskEl = document.getElementById('total-task');
    const completedTaskEl = document.getElementById('completed-task');

    if (totalHabitsEl) totalHabitsEl.textContent = habits.length;
    if (completedHabitsEl) completedHabitsEl.textContent = habits.filter(h => h.completed).length;
    if (totalTaskEl) totalTaskEl.textContent = tasks.length;
    if (completedTaskEl) completedTaskEl.textContent = tasks.filter(t => t.completed).length;
}

window.addEventListener("DOMContentLoaded", initDashboard);