const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const loginForm = document.getElementById('loginForm');
const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');
const loginErrorSpan = document.getElementById('loginErrorSpan');
const loginErrorEmail = document.getElementById('loginEmailError');
const loginErrorPassword = document.getElementById('loginPasswordError');

loginForm.addEventListener("submit", (e) => handleLogin(e));


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
    document.getElementById("adminLoginBtn").innerText = "Logging in...";
    const res = await getPostServerResponse("/admin/login", loginData)
    document.getElementById("adminLoginBtn").innerText = "Login";
    if(!res){
        loginErrorSpan.innerHTML = `<span class="failed">No Connection to the server</span>`;
        return;
    }
    if (!res.status) {
        loginErrorSpan.innerHTML = `<span class="failed">${res.message}</span>`;
        return;
    }
    else {
        document.cookie = `adminToken=${res.message.token}; path=/`;
        loginEmailInput.value = "";
        loginPasswordInput.value = "";
        loginErrorSpan.innerHTML = `<span class="success">${res.message.admin.name} Login Successful!</span>`;
        setTimeout(() => {
            window.location.href = "/my-brand/admin/";
        }, 2000);
    }

}



async function getPostServerResponse(apiLink, postData) {
    try{
        const res = await fetch(`${serverLink}${apiLink}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        });
        if (!res.ok) {
            return false;
        }
        return await res.json();
    }
    catch (err) {
        return false;
    }
}



function getErrorId(inputId) {
    const index = inputId.indexOf('Input');
    if (index !== -1) {
        const errorId = inputId.substring(0, index).trim() + "Error";
        return errorId;
    }
    return '-';
}

const inputs = document.getElementsByTagName('input');

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id != 'passwordInput' || inputs[i].id != 'passwordRepeatInput') {
        inputs[i].onkeydown = function (event) {
            inputs[i].classList.remove('invalid')
            document.getElementById(getErrorId(inputs[i].id)).innerText = ''
        };
    }
}