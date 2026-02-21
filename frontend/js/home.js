const banner = document.getElementById("banner");
const signInForm = document.getElementById("signIn");
const signUpForm = document.getElementById("signup");

const registerRole = document.getElementById("registerRole");
const loginRole = document.getElementById("loginRole");


document.getElementById("userLoginBtn").onclick = () => openLogin("participant");
document.getElementById("adminLoginBtn").onclick = () => openLogin("admin");

document.getElementById("userRegisterBtn").onclick = () => openRegister("participant");
document.getElementById("adminRegisterBtn").onclick = () => openRegister("admin");

document.getElementById("goToSignUp").onclick = () => openRegister(loginRole.value);
document.getElementById("goToSignIn").onclick = () => openLogin(registerRole.value);



function openLogin(role) {
    banner.style.display = "none";
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
    loginRole.value = role;
}

function openRegister(role) {
    banner.style.display = "none";
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
    registerRole.value = role;
}


document.getElementById("loginForm").addEventListener("submit", async(e) => {
    e.preventDefault();
    const form = document.getElementById("loginForm");
    const role = loginRole.value;
    const data = new FormData(form);

    const formDetails = {
        email: data.get("email"),
        password: data.get("password")
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formDetails)
        });
        console.log("Login response status:", response.status);
        if (response.ok) {
            const result = await response.json();
            console.log("Login result:", result);
            if (role === "participant") {
                window.location.href = "pages/user.html";
            } else if (role === "admin") {
                window.location.href = "pages/admin.html";
            }
        }
        else {
            const errorResult = await response.json();
            alert("Login failed: " + (errorResult.message || response.statusText));
        }
       
    }
    catch (error) {
        console.error("Error during login:", error);
        alert("Login error: " + error.message);
    }
});


document.getElementById("registerForm").addEventListener("submit", async(e) => {
    e.preventDefault();

    const role = registerRole.value;
    const form = document.getElementById("registerForm");
    const data = new FormData(form);
   
    const formDetails= {
        registerRole: role,
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password")
    };

    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formDetails)
        });
        const result = await response.json();
        console.log("Register response status:", response.status);
        console.log("Register result:", result);
        if (response.ok) {
            if (role === "participant") {
                window.location.href = "pages/user.html";
            } else if (role === "admin") {
                window.location.href = "pages/admin.html";
            }
        } else {
            alert("Registration failed: " + result.message);
        }
    }
    catch (error) {
        console.error("Error during registration:", error);
        alert("Registration error: " + error.message);
    }
});


const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 100;
const CONNECT_DISTANCE = 120;

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticles(){
    particles = [];
    for(let i = 0; i < PARTICLE_COUNT; i++){
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            r: Math.random() * 2 + 1
        });
    }
}
createParticles();

function drawParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw circles
    for(const p of particles){
        p.x += p.vx;
        p.y += p.vy;

        // bounce edges
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    // connect nearby particles
    for(let i = 0; i < particles.length; i++){
        for(let j = i + 1; j < particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if(dist < CONNECT_DISTANCE){
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255,255,255,${1 - dist / CONNECT_DISTANCE})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}

drawParticles();
