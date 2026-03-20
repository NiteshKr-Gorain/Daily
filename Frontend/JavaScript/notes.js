let currentUL = null;

function nextNote() {
    let title = document.getElementById("title").value;

    if (title === "") return;

    let notesArea = document.getElementById("notesArea");

    let section = document.createElement("div");
    section.className = "note-section";

    let h3 = document.createElement("h3");
    h3.innerText = title;

    currentUL = document.createElement("ul");

    section.appendChild(h3);
    section.appendChild(currentUL);
    notesArea.appendChild(section);
    document.getElementById("title").value = "";
}

    function addPoint() {
    let point = document.getElementById("point").value;

    if (point === "" || currentUL === null) {
        alert("First click Next Note to create a title!");
    return;
    }

    let li = document.createElement("li");
    li.innerText = point;

    currentUL.appendChild(li);

    document.getElementById("point").value = "";
}