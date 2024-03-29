// Login
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const loginErrorSpan = document.getElementById('loginErrorSpan');
const loginErrorEmail = document.getElementById('loginEmailError');
const loginErrorPassword = document.getElementById('loginPasswordError');
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');

// Register
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const passwordRepeatInput = document.getElementById('passwordRepeatInput');
const errorSpan = document.getElementById('errorSpan');
const errorPassword = document.getElementById('errorPassword');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const passwordRepeatError = document.getElementById('passwordRepeatError');

const allRegisterData = [];

// Event listeners
document.getElementById('showRegister').addEventListener('click', () => {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'flex';
});
document.getElementById('showLogin').addEventListener('click', () => {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'flex';
});
loginForm.addEventListener("submit", (e) => handleLogin(e));
registerForm.addEventListener("submit", (e) => handleSend(e));
passwordInput.addEventListener("keyup", (e) => checkPassword(e.target.value));
passwordRepeatInput.addEventListener("keyup", checkPasswordRepeat);

// Functions
function handleLogin(e) {
    e.preventDefault();
    loginErrorEmail.innerText = "";
    loginErrorPassword.innerText = "";
    loginErrorSpan.innerText = "";
    let errorOccured = false;
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(loginEmailInput.value.trim())) {
        errorOccured = true;
        loginErrorEmail.innerText = "Please use a valid email.";
        if (loginEmailInput.value === "") {
            loginErrorEmail.innerText = "Email is required.";
        }
        loginEmailInput.classList.add("invalid");
    }
    if (loginPasswordInput.value.trim().length < 6) {
        errorOccured = true;
        loginErrorPassword.innerText = "Please use a valid Password.";
        if (loginPasswordInput.value === "") {
            loginErrorPassword.innerText = "Password is required.";
        }
        loginPasswordInput.classList.add("invalid");
    }
    if (errorOccured) return;
    loginErrorEmail.innerText = "";
    loginErrorPassword.innerText = "";
    //check if user is registered.
    let isUserFound = false;
    allRegisterData.forEach((user) => {
        if (user.email === loginEmailInput.value && user.password === loginPasswordInput.value) {
            isUserFound = true;
            return;
        }
    });
    if (isUserFound) {
        loginErrorSpan.innerHTML = '<span class="success">Login Successful!</span>';
        loginEmailInput.value = "";
        loginPasswordInput.value = "";
    } else {
        loginErrorSpan.innerHTML = '<span class="failed">Incorrect Email or Password!</span>';
    }
}

function handleSend(e) {
    e.preventDefault();
    let errorOccured = false;
    errorSpan.innerText = "";
    resetAllErrors();
    const nameRegex = /^(?![0-9])[a-zA-Z0-9]{5,}$/;
    if (!nameRegex.test(nameInput.value.trim())) {
        errorOccured = true;
        nameError.innerText = "Please use a valid name.";
        if (nameInput.value == "") nameError.innerText = "Name is required.";
        nameInput.classList.add("invalid");
    }
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        errorOccured = true;
        emailError.innerText = "Please use a valid email.";
        if (emailInput.value == "") emailError.innerText = "Email is required.";
        emailInput.classList.add("invalid");
    }
    if (passwordInput.value.trim() !== passwordRepeatInput.value.trim()) {
        errorOccured = true;
        passwordRepeatError.innerText = "Passwords do not match.";
        if (passwordRepeatInput.value == "") passwordRepeatError.innerText = "Repeat password is required.";
        passwordRepeatInput.classList.add("invalid");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(passwordInput.value.trim())) {
        errorOccured = true;
        passwordError.innerText = "Please choose a strong password.";
        if (passwordInput.value == "") passwordError.innerText = "Password is required.";
        passwordInput.classList.add("invalid");
    }
    if (passwordRepeatInput.value == "") {
        errorOccured = true;
        passwordRepeatError.innerText = "Confirm password is required.";
        passwordRepeatInput.classList.add("invalid");
    }
    if (errorOccured) return;
    resetAllErrors();
    //check if user is already registered.
    let isUserRegistered = false;
    allRegisterData.forEach((user) => {
        if (user.email === emailInput.value) {
            isUserRegistered = true;
            return;
        }
    });
    if (isUserRegistered) {
        errorSpan.innerHTML = '<span class="failed">User is already registered. Try a different Email.</span>';
        return;
    }
    const newRegisterData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    allRegisterData.push(newRegisterData);
    console.log(allRegisterData);
    errorSpan.innerHTML = '<span class="success">Registered successfully!</span>';
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    passwordRepeatInput.value = "";
    passwordInput.classList.remove("valid");
    passwordRepeatInput.classList.remove("valid");
}

function checkPassword(passwordValue) {
    const requirements = [
        { regex: /[A-Z]/g, message: " Uppercase | " },
        { regex: /[a-z]/g, message: "Lowercase | " },
        { regex: /\d/g, message: "Digit | " },
        { regex: /[^A-Za-z0-9]/g, message: "Special Char | " },
        { regex: /.{8,}/g, message: "8 Chars" }
    ];
    errorPassword.innerHTML = "";
    passwordError.innerText = "";
    let allMatches = true;
    requirements.forEach(requirement => {
        const span = document.createElement("span");
        span.classList.add("single-error-span");
        const isValid = requirement.regex.test(passwordValue);
        span.classList.add(isValid ? "validPass" : "invalidPass");
        span.innerHTML = ` ${requirement.message} `;
        errorPassword.appendChild(span);
        allMatches = allMatches && isValid;
    });
    if (allMatches) {
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
        errorPassword.innerHTML = "";
    } else {
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
    }
}

function checkPasswordRepeat() {
    passwordRepeatError.innerText = "";
    if (passwordInput.value == passwordRepeatInput.value) {
        passwordRepeatInput.classList.remove("invalid");
        passwordRepeatInput.classList.add("valid");
    } else {
        passwordRepeatInput.classList.remove("valid");
        passwordRepeatInput.classList.add("invalid");
    }
}

function resetAllErrors() {
    nameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    passwordRepeatError.innerText = "";
}