const commentForm = document.getElementById('commentForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const commentInput = document.getElementById('commentInput');
const errorSpan = document.getElementById('errorSpan');


commentForm.addEventListener("submit", (e)=>handleSend(e))

const allCommentsData = [];

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
    if(commentInput.value.length < 20){
        errorOccured = true;
        allErrors.push("Comment is shorter than 20 characters.")
        commentInput.classList.add("invalid")
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