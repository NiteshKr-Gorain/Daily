function autoUpdate() {
    const now = new Date();
    const hour = now.getHours();

    let greet;
    if (hour < 12) greet = "Good Morning, User!";
    else if (hour < 17) greet = "Good Afternoon, User!";
    else if (hour < 20) greet = "Good Evening, User!";
    else greet = "Good Night, User!";

    document.getElementById("greeting").innerText = greet;

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
    let formattedDate = `Today is ${dayName}, ${day}${getSuffix(day)} ${month} ${year}`;

    document.getElementById("date").innerText = formattedDate;
}
setInterval(autoUpdate, 10);
autoUpdate();

// function for daily time

document.addEventListener("DOMContentLoaded", ()=>{
    const habits = window.loadData('dlm_habits',[]);
    const tasks = window.loadData('dlm_tasks',[]);
    const profile = window.loadData('dlm_profile',{ name : 'user', gole : 'be produtive' ,bio : ''});

    const totalHabitsEl = document.getElementById("total-habits");
    const completedHabitsEl = document.getElementById("completed-habits");
    const totalTaskEl = document.getElementById("total-task");

    if(totalHabitsEl) totalHabitsEl.textContent = habits.length;
    if(completedHabitsEl) {
        const completed = habits.filter(h => h.completed).length;
        completedHabitsEl.textContent = completed;
    }

    if(totalTaskEl)totalTaskEl.textContent = tasks.length;
})