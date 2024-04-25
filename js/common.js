const inputs = document.getElementsByTagName('input');
const textArea = document.getElementsByTagName('textarea');

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id != 'passwordInput' || inputs[i].id != 'passwordRepeatInput') {
        inputs[i].onkeydown = function (event) {
            inputs[i].classList.remove('invalid')
            document.getElementById(getErrorId(inputs[i].id)).innerText = ''
        };
    }
}

for (let j = 0; j < textArea.length; j++) {
    textArea[j].onkeydown = function (event) {
        textArea[j].classList.remove('invalid')
        document.getElementById(getErrorId(textArea[j].id)).innerText = ''
    };
}


function getErrorId(inputId) {
    const index = inputId.indexOf('Input');
    if (index !== -1) {
        const errorId = inputId.substring(0, index).trim() + "Error";
        return errorId;
    }
    return '-';
}


function logoutUser(event) {
    event.preventDefault();
    document.cookie = "token=none; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/my-brand/login.html";
}

onload=checkLoginToken()



async function checkLoginToken() {
    if (getCookies("token")) {
        const links = document.querySelectorAll(".menu a");
        links.forEach(link => {
            if (link.textContent === "Login") {
                link.textContent = "Logout";
                link.href = "#";
                link.addEventListener("click", logoutUser);
            }
        });
    }
}

function getCookies(name) {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}
