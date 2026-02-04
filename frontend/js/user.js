alert("Greate to see you here! Participate in exciting events organized by various clubs.");
const clubsMenu = document.getElementById("clubs");
const venueName = document.getElementById("venues");

function menufunction(events){
    events.forEach(event =>{
         const option1 = document.createElement("option");
         option1.innerHTML=`
         ${event.clubName}
         `;
         clubsMenu.appendChild(option1);
         const option2 = document.createElement("option");
         option2.innerHTML=`
         ${event.venue}
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
            const events =await response.json();
            menufunction(events);
        }
    }
    catch(error){
        console.error("Error from the frontend ");
    }
}

forFetching();