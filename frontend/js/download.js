const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");
const eventName1 = document.getElementById("eventName1");
const eventName2 = document.getElementById("eventName2");
const clubName1 = document.getElementById("clubName1");
const clubName2 = document.getElementById("clubName2");
const venue1  = document.getElementById("venue1");
const venue2  = document.getElementById("venue2");
const date = document.getElementById("date");
const totalParticipants1 = document.getElementById("totalParticipants1");
const totalParticipants2 = document.getElementById("totalParticipants2");
const coordinators = document.getElementById("coordinators");
const coordinator1 = document.getElementById("coordinator1");
const coordinator11 = document.getElementById("coordinator11");
const coordinator2 = document.getElementById("coordinator2");
const coordinator22 = document.getElementById("coordinator22");
const admin = document.getElementById("admin");


//learn this properly
function listTheData(event) {
    console.log(event);
    console.log(event.coordinator);
    console.log(event.participants);

    eventName1.innerHTML = `<strong>Event Name:</strong> ${event.eventName}`;
    eventName2.innerHTML = event.eventName;

    clubName1.innerHTML = `<strong>Organized by:</strong> ${event.clubName}`;
    clubName2.innerHTML = event.clubName;

    venue1.innerHTML = `<strong>Venue:</strong> ${event.venue}`;
    venue2.innerHTML = event.venue;

    date.innerHTML = `<strong>Date:</strong> ${new Date(event.startDate).toLocaleDateString()}`;

    const count = event.participants?.length || 0;

    totalParticipants1.innerHTML = `<strong>Total Participants:</strong> ${count}`;
    totalParticipants2.innerHTML = count;

    const coord1 = event.coordinator?.[0];
    const coord2 = event.coordinator?.[1];

    coordinators.innerHTML = `<strong>Coordinators: </strong>${coord1?.name || ""}, ${coord2?.name || ""}`;

    coordinator1.innerHTML = coord1?.name || "";
    coordinator2.innerHTML = coord2?.name || "";

    coordinator11.innerHTML = `Event Coordinator 1: ${coord1?.name || ""}`;
    coordinator22.innerHTML = `Event Coordinator 2: ${coord2?.name || ""}`;

    admin.innerHTML = `Event Admin: ${event.adminUser}`;
}


async function fetchingData(){
     try {
         const data = {
            eventId:eventId
         }
         const response = await fetch("http://localhost:3000/api/events/menu",{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
         })

         if(response.ok){
            const data= await response.json();
            listTheData(data);
         }
         else{
            alert("failed to fetch the data!!!!!!!");
         }
     }
     catch (error) {
          console.error("Error in fetching the data from the server", error);
     }
}

fetchingData();

function downloadReport(){
    window.print();
};