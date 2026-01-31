const form = document.getElementById("event-form");
const tableBody = document.getElementById("tableBody");
const countSpan = document.querySelector(".stats span");

let eventCount = tableBody.rows.length;
countSpan.textContent = eventCount;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const eventName = document.getElementById("event-name").value.trim();
    const club = document.getElementById("club-name").value.trim();
    const start = document.getElementById("start-time").value;
    const end = document.getElementById("end-time").value;
    const coordinators = document.getElementById("coordinators").value.trim();

    if (!eventName || !club || !start || !end || !coordinators) {
        alert("Fill all fields");
        return;
    }

    eventCount++;
    countSpan.textContent = eventCount;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${eventCount}</td>
        <td>${eventName}</td>
        <td>${club}</td>
        <td>${start}</td>
        <td>${end}</td>
        <td>${coordinators}</td>
        <td class="actions">
            <button class="btnbtn-secondary" type="button">Download Report</button>
            <button class="btn btn-danger">Participants List</button>
        </td>
    `;

    tableBody.appendChild(row);
    form.reset();
});
tableBody.addEventListener("click",function(e) {
    if(e.target.classList.contains("btn-danger")){
        alert("Download of Participants List is  going to download");
    }
})

document.getElementById("download_pg").onclick = () => {
    window.open("../pages/download.html","_self");
}