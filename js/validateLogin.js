const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('loginPasswordInput');
const errorSpan = document.getElementById('errorSpan');
const errorEmail = document.getElementById('emailError');
const errorPassword = document.getElementById('passwordError');

loginForm.addEventListener("submit", (e) => handleSend(e))

const allLoginData = [];

function handleSend(e) {
    e.preventDefault();
    errorEmail.innerText = ""
    errorPassword.innerText = ""
    let errorOccured = false;
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        errorOccured = true;
        errorEmail.innerText = "Please use real email.";
        if(emailInput.value === ""){
            errorEmail.innerText = "Email is required.";
        }
        emailInput.classList.add("invalid");
    }
    if (passwordInput.value.trim().length < 6) {
        errorOccured = true;
        errorPassword.innerText = "Please use real Password."
        if(passwordInput.value === ""){
            errorPassword.innerText = "Password is required."
        }
        passwordInput.classList.add("invalid");
    }
    if (errorOccured) return;
    errorEmail.innerText = ""
    errorPassword.innerText = ""

    const newLoginData = {
        email: emailInput.value,
        password: passwordInput.value
    }

    //check if user is registered.
    const allRegisterData = JSON.parse(localStorage.getItem("registerData"));
    let isUserFound = false;
    allRegisterData.forEach((user) => {
        if (user.email === emailInput.value && user.password === passwordInput.value) {
            isUserFound = true;
            return;
        }
    })
    allLoginData.push(newLoginData)
    console.log(allLoginData)
    if (isUserFound) {
        errorSpan.innerHTML = '<span class="success">Login Successfully!</span>'
        emailInput.value = ""
        passwordInput.value = ""
    }
    else {
        errorSpan.innerHTML = '<span class="failed">Incorrect Email or Password!</span>'
    }
}