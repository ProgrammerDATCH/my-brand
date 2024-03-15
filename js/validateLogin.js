const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('loginPasswordInput');
const errorSpan = document.getElementById('errorSpan');


loginForm.addEventListener("submit", (e)=>handleSend(e))

const allLoginData = [];

function handleSend(e){
    e.preventDefault();
    let errorOccured = false;
    let allErrors = [];
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(emailInput.value.trim())){
        errorOccured = true;
        allErrors.push("Please use real email.")
        emailInput.classList.add("invalid");
    }
    if(passwordInput.value.trim().length < 6){
        errorOccured = true;
        allErrors.push("Please use real Password.")
        passwordInput.classList.add("invalid");
    }
    if(errorOccured){
        const ul = document.createElement("ul")
        allErrors.forEach(error => {
            const li = document.createElement("li")
            li.classList.add("failed")
            li.innerHTML = `${error}`
            ul.appendChild(li)
        }
        )
        errorSpan.innerHTML = ""
        errorSpan.appendChild(ul)
        return;
    }

    const newLoginData = {
        email: emailInput.value,
        password: passwordInput.value
    }
    allLoginData.push(newLoginData)
    console.log(allLoginData)
    errorSpan.innerHTML = '<span class="success">Login Successfully!</span>'
    emailInput.value = ""
    passwordInput.value = ""
}