const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const subjectInput = document.getElementById('subjectInput');
const messageInput = document.getElementById('messageInput');
const errorSpan = document.getElementById('errorSpan');


contactForm.addEventListener("submit", (e)=>handleSend(e))


function handleSend(e){
    e.preventDefault();
    let errorOccured = false;
    let allErrors = [];
    if(nameInput.value.length < 4){
        errorOccured = true;
        allErrors.push("Please use real name!")
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(emailInput.value)){
        errorOccured = true;
        allErrors.push("Email should have '@' and '.'.")
    }
    if(subjectInput.value.length < 10){
        errorOccured = true;
        allErrors.push("Subject is shorter than 10 characters.")
    }
    if(messageInput.value.length < 20){
        errorOccured = true;
        allErrors.push("Message is shorter than 20 characters.")
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
    errorSpan.innerHTML = '<span class="success">Message SENT!</span>'
}