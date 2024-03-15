const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const passwordRepeatInput = document.getElementById('passwordRepeatInput');
const errorSpan = document.getElementById('errorSpan');
const errorPassword = document.getElementById('errorPassword');


registerForm.addEventListener("submit", (e) => handleSend(e))

passwordInput.addEventListener("keyup", (e) => checkPassword(e.target.value))
passwordRepeatInput.addEventListener("keyup", checkPasswordRepeat)

const allRegisterData = [];

function handleSend(e) {
    e.preventDefault();
    let errorOccured = false;
    let allErrors = [];
    const nameRegex = /^[a-zA-Z]{5,}$/;
    if (!nameRegex.test(nameInput.value.trim())) {
        errorOccured = true;
        allErrors.push("Please use real name.")
        nameInput.classList.add("invalid")
    }
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        errorOccured = true;
        allErrors.push("Please use real email.")
        emailInput.classList.add("invalid")
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (passwordInput.value.trim() !== passwordRepeatInput.value.trim()) {
        errorOccured = true;
        allErrors.push("Passwords do not match.")
        passwordRepeatInput.classList.add("invalid")
    }
    if (!passwordRegex.test(passwordInput.value.trim())) {
        errorOccured = true;
        allErrors.push("Please choose strong password.")
        passwordInput.classList.add("invalid")
    }

    if (errorOccured) {
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

    const newRegisterData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    allRegisterData.push(newRegisterData)
    console.log(allRegisterData)
    errorSpan.innerHTML = '<span class="success">Registered successfully!</span>'
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
    passwordRepeatInput.value = ""
}



function checkPassword(passwordValue) {
    const requirements = [
      { regex: /[A-Z]/g, message: "Uppercase" },
      { regex: /[a-z]/g, message: "Lowercase" },
      { regex: /\d/g, message: "Digit" },
      { regex: /[^A-Za-z0-9]/g, message: "Special Char" },
      { regex: /.{8,}/g, message: "8 Chars" }
    ];
  
    errorPassword.innerHTML = "";
  
    let allMatches = true;
    requirements.forEach(requirement => {
      const span = document.createElement("span");
      const isValid = requirement.regex.test(passwordValue);
      span.classList.add(isValid ? "validPass" : "invalidPass");
      span.innerHTML = ` ${requirement.message} |`;
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

  function checkPasswordRepeat(){
    if (passwordInput.value == passwordRepeatInput.value) {
        passwordRepeatInput.classList.remove("invalid");
        passwordRepeatInput.classList.add("valid");
      } else {
        passwordRepeatInput.classList.remove("valid");
        passwordRepeatInput.classList.add("invalid");
      }
  }