const serverLink = 'https://mybrandbackend-4e8h.onrender.com/api';

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const subjectInput = document.getElementById('subjectInput');
const messageInput = document.getElementById('messageInput');
const errorSpan = document.getElementById('errorSpan');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');


contactForm.addEventListener("submit", (e)=>handleSend(e))


async function handleSend(e){
    e.preventDefault();
    errorSpan.innerText = ""
    let errorOccured = false;
    resetAllErrors();
    const nameRegex = /^(?![0-9])[a-zA-Z0-9]{5,}$/;
    if(!nameRegex.test(nameInput.value)){
        errorOccured = true;
        nameError.innerText = "Please use real name."
        if(nameInput.value == "") nameError.innerText = "Name is required."
        nameInput.classList.add("invalid")
    }
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(emailInput.value)){
        errorOccured = true;
        emailError.innerText = "Please use real email."
        if(emailInput.value == "") emailError.innerText = "Email is required."
        emailInput.classList.add("invalid")
    }
    if(subjectInput.value.length < 10){
        errorOccured = true;
        subjectError.innerText = "Subject is shorter than 10 characters."
        if(subjectInput.value == "") subjectError.innerText = "Subject is required."
        subjectInput.classList.add("invalid")
    }
    if(messageInput.value.length < 20){
        errorOccured = true;
        messageError.innerText = "Message is shorter than 20 characters."
        if(messageInput.value == "") messageError.innerText = "Message is required."
        messageInput.classList.add("invalid")
    }

    if(errorOccured) return;

    resetAllErrors();
    
    const newContactData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    }
    document.getElementById("sendSuggestionBtn").innerText = "Sending..."
    const res = await getPostServerResponse("/suggestion/add", newContactData)
    document.getElementById("sendSuggestionBtn").innerText = "Send"
   if(res.status){
       errorSpan.innerHTML = '<span class="success">Message Sent!</span>'
    }
    else{
       errorSpan.innerHTML = `<span class="failed">Error: ${res.message}</span>`
   }
    nameInput.value = ""
    emailInput.value = ""
    subjectInput.value = ""
    messageInput.value = ""
}

function resetAllErrors(){
    nameError.innerText = ""
    emailError.innerText = ""
    subjectError.innerText = ""
    messageError.innerText = ""
}


async function getPostServerResponse(apiLink, postData) {
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