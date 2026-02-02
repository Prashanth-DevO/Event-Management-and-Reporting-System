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


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const role = loginRole.value;

    if (role === "participant") {
        window.open("pages/user.html", "_self");
    } else if (role === "admin") {
        window.open("pages/admin.html", "_self");
    }
});


document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const role = registerRole.value;

    if (role === "participant") {
        window.open("pages/user.html", "_self");
    } else if (role === "admin") {
        window.open("pages/admin.html", "_self");
    }
});
