const eventName = document.getElementById("eventName");
const clubName = document.getElementById("clubName");
const tableBody = document.getElementById("tableBody");
const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");

function listTheData(data){
    tableBody.innerHTML="";
     const event = data;
     eventName.innerHTML=event.eventName;
     clubName.innerHTML =`Club: ${event.clubName}`;
     const participants =event.participants;
     participants.forEach((participant)=> {
          const row = document.createElement("tr");
          row.innerHTML=`
                <td>${participant.name}</td>
                <td>${participant.email}</td>
                <td>unPaid</td>
                <td>________</td>
          `;
          tableBody.appendChild(row);
     })

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

function download(){
    window.print();
};