const form = document.getElementById("event-form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const adminUser = document.getElementById("adminUser").value.trim();
    if (!adminUser) {
        alert("Admin username required");
        return;
    }

    const eventName = document.getElementById("event-name").value.trim();
    const club = document.getElementById("club-name").value.trim();
    const start = document.getElementById("start-date").value;
    const end = document.getElementById("end-date").value;
    const coord1 = document.getElementById("coordinator1").value.trim();
    const coord2 = document.getElementById("coordinator2").value.trim();
    const coord1_num = document.getElementById("coordinator1_number").value.trim();
    const coord2_num = document.getElementById("coordinator2_number").value.trim();
    const venue = document.getElementById("venueName").value.trim();

    if (!eventName || !club || !start || !end || !venue ) {
        alert("Fill all fields");
        return;
    }
    try{
        const eventDetails={
            eventName,
            clubName:club,
            startDate:start,
            endDate:end,
            coordinator:[
                {
                    name:coord1,
                    contactNumber:coord1_num
                },
                {
                    name:coord2,
                    contactNumber:coord2_num
                }
            ],
            adminUser,
            venue,
            participants:[]
        }
        const response = await fetch("http://localhost:3000/api/events/create",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(eventDetails)
        });
        if(!response.ok){
            const errText = await response.text().catch(() => response.statusText);
            alert(`Error adding event: ${response.status} ${errText}`);
            return;
        } else {
            alert("Event added successfully");
            form.reset();
            fetchEvents();
        }
    }
    catch(error){
        console.error("Error in adding the event for frontend", error);
        alert("Unexpected error adding event. See console for details.");
    }

});

document.getElementById("download_pg").onclick = () => {
    window.open("../pages/download.html","_self");
}


function appendInToTables(events){
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML="";

    let count=0;
    
    events.forEach(event => {
        count++;
        const startDate = new Date(event.startDate).toLocaleString();
        const endDate = new Date(event.endDate).toLocaleString();
        const coordinators = event.coordinator.map(c => `${c.name} (${c.contactNumber})`).join("<br>");
        const row = document.createElement("tr");
        row.innerHTML=`
            <td>${count}</td>
            <td>${event.eventName}</td>
            <td>${event.clubName}</td>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>${coordinators}</td>
            <tb>${event.venue}</td>
            <td class="Buttons">
                <button id="downloadReport" onclick="DownloadReport(${event._id})">DownloadReport</button>
                <button id="downloadParticipants" onclick="DownloadParticipants(${event._id})">Participants</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
        
}


async function fetchEvents() {
    try {
        const adminUser = document.getElementById("adminUser").value;

        const response = await fetch(`http://localhost:3000/api/events/fetch?adminUser=${adminUser}`);

        if(!response.ok){
            console.error(`HTTP ERROR ${response.status}`);
            return
        }

        const events = await response.json();
        appendInToTables(events);
    }
    catch (error) {
         console.error("Error during the fetch events");
    }
}