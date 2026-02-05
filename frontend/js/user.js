alert("Greate to see you here! Participate in exciting events organized by various clubs.");
const clubsMenu = document.getElementById("clubs");
const venueName = document.getElementById("venues");
const eventsMenu = document.getElementById("eventsMenu");
const numberOfEvents=document.getElementById("numberOfEvents");
const numberOfClubs = document.getElementById("numberOfClubs");
const numberOfVenues = document.getElementById("numberOfVenues");
const numberOfOpens = document.getElementById("numberOfOpens");

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function menufunction(events){
    clubsMenu.innerHTML=` <option>All Clubs</option>`;
    venueName.innerHTML= `<option>All Venues</option>`;
    eventsMenu.innerHTML = "";
    let count=0;
    let clubMenuSet = new Set();
    let venueSet = new Set();
    events.forEach(event =>{
         count++;
         clubMenuSet.add(event.clubName);
         venueSet.add(event.venue);

         
         const card = document.createElement("div");
         card.className="event-card";
         card.innerHTML=`
                <h3>${event.eventName}</h3>
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <p><strong>Date:</strong> ${formatDate(event.startDate)}</p>
                <button class="register-btn" onclick="register(${event._id})">Register</button>
         `;

         eventsMenu.appendChild(card);

    })
    numberOfEvents.innerHTML = count;
    numberOfClubs.innerHTML= clubMenuSet.size;
    clubMenuSet.forEach(club => {
         const option1 = document.createElement("option");
         option1.innerHTML=`
         ${club}
         `;
         clubsMenu.appendChild(option1);
    })
    numberOfVenues.innerHTML=venueSet.size;
    venueSet.forEach(venue_place => {
         const option2 = document.createElement("option");
         option2.innerHTML=`
         ${venue_place}
         `;
         venueName.appendChild(option2);
    })
}

async function forFetching(){
    try {
        const response = await fetch("http://localhost:3000/api/events/menu");
        if(!response.ok){
            console.error(`Error between - frontend to get the menu ${response.status}`);
        }
        else{
            const events = await response.json();
            menufunction(events);
        }
    }
    catch(error){
        console.error("Frontend fetch error:", error);
    }
}

forFetching();