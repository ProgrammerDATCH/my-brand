const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const loginErrorSpan = document.getElementById('loginErrorSpan');
const loginErrorEmail = document.getElementById('loginEmailError');
const loginErrorPassword = document.getElementById('loginPasswordError');

const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
document.getElementById('showRegister').addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'flex';
})
document.getElementById('showLogin').addEventListener('click', () => {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'flex';
})

loginForm.addEventListener("submit", (e) => handleLogin(e))


function handleLogin(e) {
    e.preventDefault();
    loginErrorEmail.innerText = ""
    loginErrorPassword.innerText = ""
    loginErrorSpan.innerText = ""
    let errorOccured = false;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(loginEmailInput.value.trim())) {
        errorOccured = true;
        loginErrorEmail.innerText = "Please use real email.";
        if(loginEmailInput.value === ""){
            loginErrorEmail.innerText = "Email is required.";
        }
        loginEmailInput.classList.add("invalid");
    }
    if (loginPasswordInput.value.trim().length < 6) {
        errorOccured = true;
        loginErrorPassword.innerText = "Please use real Password."
        if(loginPasswordInput.value === ""){
            loginErrorPassword.innerText = "Password is required."
        }
        loginPasswordInput.classList.add("invalid");
    }
    if (errorOccured) return;
    loginErrorEmail.innerText = ""
    loginErrorPassword.innerText = ""


    //check if user is registered.
    const allRegisterData = JSON.parse(localStorage.getItem("registerData"));
    let isUserFound = false;
    allRegisterData.forEach((user) => {
        if (user.email === loginEmailInput.value && user.password === loginPasswordInput.value) {
            isUserFound = true;
            return;
        }
    })
    if (isUserFound) {
        loginErrorSpan.innerHTML = '<span class="success">Login Successfully!</span>'
        loginEmailInput.value = ""
        loginPasswordInput.value = ""
        return;
    }
    else {
        loginErrorSpan.innerHTML = '<span class="failed">Incorrect Email or Password!</span>'
    }
}