const serverLinkGlobal = 'https://mybrandbackend-4e8h.onrender.com/api';

function logout() {
    document.cookie = "adminToken=none; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/my-brand/admin/login.html';
}


document.addEventListener("DOMContentLoaded", checkToken);

async function checkToken() {
    const token = getCookie();
    if (!token) {
        window.location.href = "/my-brand/admin/login.html";
        return;
    }
    try{
        const res = await fetch(`${serverLinkGlobal}/admin/check`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok) {
            console.error('Failed to call API');
            window.location.href = "/my-brand/admin/login.html";
            return;
        }
        const data = await res.json();
        if (!data.status) {
            window.location.href = "/my-brand/admin/login.html";
        }
    }
    catch(error){
        window.location.href = "/my-brand/admin/login.html";
    } 
}

function getCookie() {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === "adminToken") {
            return cookieValue;
        }
    }
    return null;
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