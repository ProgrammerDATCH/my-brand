
const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

// Login
const loginContainer = document.getElementById('loginContainer');
const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const loginErrorSpan = document.getElementById('loginErrorSpan');
const loginErrorEmail = document.getElementById('loginEmailError');
const loginErrorPassword = document.getElementById('loginPasswordError');

// Register
const registerContainer = document.getElementById('registerContainer');
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

//Token
const verifyContainer = document.getElementById('verifyContainer');
const verifyForm = document.getElementById('verifyForm');
const userEmail = document.getElementById('userEmail');
const emailTokenInput = document.getElementById('emailTokenInput');
const tokenInput = document.getElementById('tokenInput');
const tokenErrorSpan = document.getElementById('tokenError');
const tokenSubmit = document.getElementById('tokenSubmit');



const allRegisterData = [];

//static
verifyContainer.style.display = 'none';

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
verifyForm.addEventListener("submit", (e) => handleVerify(e));
passwordInput.addEventListener("keyup", (e) => checkPassword(e.target.value));
passwordRepeatInput.addEventListener("keyup", checkPasswordRepeat);

// Functions

async function handleVerify(e) {
    e.preventDefault();
    if (tokenInput.value == "") {
        tokenErrorSpan.innerHTML = '<span class="failed">Enter 6-digits code you received on email please.</span>'
        return;
    }
    if (tokenInput.value.length !== 6) {
        tokenErrorSpan.innerHTML = '<span class="failed">Token must be 6 digits please.</span>'
        return;
    }
    const data = {
        token: tokenInput.value,
        email: emailTokenInput.value
    }
    tokenSubmit.innerText = "Verifying..."
    const { status, message } = await getPostServerResponse("/users/verify", data)
    tokenSubmit.innerText = "Verify"
    if (!status) {
        tokenErrorSpan.innerHTML = `<span class="failed">${message}</span>`
        return;
    }
    tokenErrorSpan.innerHTML = `<span class="success">${message}</span>`;
    setTimeout(() => {
        window.location.href = "/my-brand/blogs.html";
    }, 2000);
}


function showVerifyContainer(email, isFromRegister) {
    if (isFromRegister) registerContainer.style.display = 'none';
    else loginContainer.style.display = 'none';
    emailTokenInput.value = email
    userEmail.innerText = email
    verifyContainer.style.display = 'flex';
}

async function handleLogin(e) {
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
    const loginData = {
        email: loginEmailInput.value.trim(),
        password: loginPasswordInput.value.trim(),
    }
    document.getElementById('userLoginBtn').innerText = "Logging in..."
    try {
        const res = await getPostServerResponse("/users/login", loginData)
        if (!res.status) {
            loginErrorSpan.innerHTML = `<span class="failed">${res.message}</span>`;
            return;
        }
        else {
            document.cookie = `token=${res.message.token}; path=/`;
            loginEmailInput.value = "";
            loginPasswordInput.value = "";
            loginErrorSpan.innerHTML = `<span class="success">${res.message.user.name} Login Successful!</span>`;
            setTimeout(() => {
                if (!res.message.user.isVerified) {
                    showVerifyContainer(res.message.user.email, false)
                }
                else window.location.href = "/my-brand/blogs.html";
            }, 2000);
        }
    }
    catch (error) {
        if (error.response && error.response.status === 409) {
            loginErrorSpan.innerHTML = `<span class="failed">User already exists.</span>`;
        } else {
            console.dir(error)
            loginErrorSpan.innerHTML = `<span class="failed">${error.message}</span>`;
        }
    } finally {
        document.getElementById('userLoginBtn').innerText = "Login";
    }

}

async function handleSend(e) {
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
    const newRegisterData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    //add to database
    document.getElementById('userRegisterBtn').innerText = "Registering..."
    const res = await getPostServerResponse("/users/register", newRegisterData)
    document.getElementById('userRegisterBtn').innerText = "Register"
    if (!res.status) {
        errorSpan.innerHTML = `<span class="failed">${res.message}</span>`;
        return;
    }
    else {
        errorSpan.innerHTML = '<span class="success">Registered successfully!</span>';
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        passwordRepeatInput.value = "";
        passwordInput.classList.remove("valid");
        passwordRepeatInput.classList.remove("valid");
        setTimeout(() => {
            showVerifyContainer(res.message.email, true)
        }, 2000)
    }
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

async function getPostServerResponse(apiLink, postData) {
    const res = await fetch(`${serverLink}${apiLink}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
    });
    return await res.json();
}

onload = ()=> {
    const emailToVerify = localStorage.getItem('emailToVerify');
    if(emailToVerify)
    {
        showVerifyContainer(emailToVerify, false)
        localStorage.removeItem("emailToVerify")
    }
}