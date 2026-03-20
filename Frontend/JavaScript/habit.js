function addHabit() {
    const input = document.getElementById("habit-bar");
    const text = input.value.trim();

    if (text === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${text}</span>
        <button onclick="completeHabit(this)">✔</button>
    `;

    document.getElementById("habit-list").appendChild(li);

    input.value = "";
}

function completeHabit(btn) {
    const li = btn.parentElement;

    if (!li.classList.contains("completed")) {
        li.classList.add("completed");
        const span = li.querySelector("span");
        span.innerHTML = " ✅ " + span.innerText;
    }
}