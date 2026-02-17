const form  = document.getElementById("event-form") ;

form.addEventListener("submit", async(e) => {
    e.preventDefault();
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
            venue,
            participants:[]
        }
        const response = await fetch("http://localhost:3000/api/events/create",{
            method: "POST",
            credentials: "include",
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
                <button id="downloadReport" onclick="DownloadReport('${event._id}')" class="btn btn-primary">DownloadReport</button>
                <button id="downloadParticipants" onclick="DownloadParticipants('${event._id}')" class="btn btn-primary">Participants</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
        
}

function DownloadParticipants(eventId){
    window.open(`../pages/participants.html?eventId=${eventId}`,"_self");
}

function DownloadReport(eventId){
    window.open(`../pages/download.html?eventId=${eventId}`,"_self");
}

async function fetchEvents() {
    try {
        const response = await fetch(`http://localhost:3000/api/events/fetch`, {
            method: "GET",
            credentials: "include"
        });

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

fetchEvents();

/* ===== Particle Background Canvas ===== */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 90;
const CONNECT_DISTANCE = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticles() {
    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 1
        });
    }
}

createParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move + draw particles
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // bounce from edges
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECT_DISTANCE) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / CONNECT_DISTANCE})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

fetchEvents();