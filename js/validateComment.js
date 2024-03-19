const commentForm = document.getElementById('commentForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const commentInput = document.getElementById('commentInput');
const errorSpan = document.getElementById('errorSpan');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const commentError = document.getElementById('commentError');


commentForm.addEventListener("submit", (e)=>handleSend(e))

const allCommentsData = [];

function handleSend(e){
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
    if(commentInput.value.length < 20){
        errorOccured = true;
        commentError.innerText = "Comment is shorter than 20 characters."
        if(commentInput.value == "") commentError.innerText = "Comment is required."
        commentInput.classList.add("invalid")
    }

    if(errorOccured) return;
    resetAllErrors()

    const newCommentData = {
        name: nameInput.value,
        email: emailInput.value,
        comment: commentInput.value
    }
    allCommentsData.push(newCommentData)
    console.log(allCommentsData)
    errorSpan.innerHTML = '<span class="success">Comment published.</span>'
    nameInput.value = ""
    emailInput.value = ""
    commentInput.value = ""
}

function resetAllErrors(){
    nameError.innerText = ""
    emailError.innerText = ""
    commentError.innerText = ""
}