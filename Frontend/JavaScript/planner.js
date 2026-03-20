function addTask() {
    let task = document.getElementById("task").value;
    let time = document.getElementById("time").value;

    if (task === "" || time === "") {
        alert("Please enter both task and time");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `<strong>${time}</strong> - ${task}`;

    document.getElementById("list").appendChild(li);

    document.getElementById("task").value = "";
    document.getElementById("time").value = "";
}