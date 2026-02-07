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
        const response = await fetch("http://localhost:3000/api/auth/login", {
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
        const response = await fetch("http://localhost:3000/api/auth/register", {
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
