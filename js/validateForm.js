const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const subjectInput = document.getElementById('subjectInput');
const messageInput = document.getElementById('messageInput');
const errorSpan = document.getElementById('errorSpan');


contactForm.addEventListener("submit", (e)=>handleSend(e))

const allContactsData = [];

function handleSend(e){
    e.preventDefault();
    let errorOccured = false;
    let allErrors = [];
    const nameRegex = /^[a-zA-Z]{5,}$/;
    if(!nameRegex.test(nameInput.value)){
        errorOccured = true;
        allErrors.push("Please use real name.")
        nameInput.classList.add("invalid")
    }
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(emailInput.value)){
        errorOccured = true;
        allErrors.push("Please use real email.")
        emailInput.classList.add("invalid")
    }
    if(subjectInput.value.length < 10){
        errorOccured = true;
        allErrors.push("Subject is shorter than 10 characters.")
        subjectInput.classList.add("invalid")
    }
    if(messageInput.value.length < 20){
        errorOccured = true;
        allErrors.push("Message is shorter than 20 characters.")
        messageInput.classList.add("invalid")
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

    const newContactData = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    }
    allContactsData.push(newContactData)
    console.log(allContactsData)
    errorSpan.innerHTML = '<span class="success">Message Sent!</span>'
    nameInput.value = ""
    emailInput.value = ""
    subjectInput.value = ""
    messageInput.value = ""
}