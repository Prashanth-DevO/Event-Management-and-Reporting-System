const clubsMenu = document.getElementById("clubs");
const venueName = document.getElementById("venues");
const eventsMenu = document.getElementById("eventsMenu");
const numberOfEvents=document.getElementById("numberOfEvents");
const numberOfClubs = document.getElementById("numberOfClubs");
const numberOfVenues = document.getElementById("numberOfVenues");
const sort = document.getElementById("sort");
const search = document.getElementById("Search");

let page = 1;
let totalPages = 10;

function prevPage() {
    if (page > 1) {
        page = page - 1;
        forFetching();
    }
}

function nextPage() {
    if(page!=totalPages){
        page = page + 1;
        forFetching();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

let condition = true;

async function register(eventid){
    try {
        const response =await fetch("http://localhost:3000/api/events/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body: JSON.stringify({ eventId: eventid })
        })
        const data =await response.json();
        if(response.ok){
            alert("Your registration is confirmed");
            alert(data.message);
        }
        else{
            alert("Failed to register to the event");
            alert(data.message);
        }
    }
    catch(error) {
         console.error("Frontend register error:", error);
    }
}

function menufunction(events){
    eventsMenu.innerHTML = "";
    events.forEach(event =>{         
         const card = document.createElement("div");
         card.className="event-card";
         card.innerHTML=`
                <h3>${event.eventName}</h3>
                <p><strong>Club:</strong> ${event.clubName}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <p><strong>Date:</strong> ${formatDate(event.startDate)}</p>
                <button class="register-btn" onclick="register('${event._id}')">Register</button>
         `;

         eventsMenu.appendChild(card);

    })
}

function updateDetails(data){
    numberOfEvents.innerHTML = data.count;
    totalPages = Math.ceil(data.count/6);
    numberOfClubs.innerHTML = data.clubset.length;
    numberOfVenues.innerHTML = data.venueset.length;
    clubsMenu.innerHTML=` <option>All Clubs</option>`;
    venueName.innerHTML= `<option>All Venues</option>`;
    data.clubset.forEach(club => {
        const option1 = document.createElement("option");
        option1.innerHTML=`
        ${club}
        `;
        clubsMenu.appendChild(option1);
    })
    data.venueset.forEach(venue => {
        const option2 = document.createElement("option");
        option2.innerHTML=`
        ${venue}
        `;
        venueName.appendChild(option2);
    })
}

async function forFetching(){
    try {
        const data = {
             club :clubsMenu.value ,
             venue : venueName.value ,
             search : search.value , 
             sort : sort.value,
             pageNo: page,
             limit: 6
        };

        const response = await fetch("http://localhost:3000/api/events/menu",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
            credentials: "include"

        });
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

async function fetchdetails(){
    try {
        const response = await fetch("http://localhost:3000/api/events/menu/details");

        if(!response.ok){
            console.error(`Error between - frontend to get the menu ${response.status}`);
        }
        const data = await response.json();
        updateDetails(data);
    }
    catch (error) {
        console.error("Error fetching details:", error);
    }
}

window.addEventListener("load", () => {
    forFetching();
    fetchdetails();
});


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
    ctx.clearRect(0, 0, canvas.width, canvas.height); // FIX

    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

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

