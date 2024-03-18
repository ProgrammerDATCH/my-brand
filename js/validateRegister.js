const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const passwordRepeatInput = document.getElementById('passwordRepeatInput');
const errorSpan = document.getElementById('errorSpan');
const errorPassword = document.getElementById('errorPassword');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const passwordRepeatError = document.getElementById('passwordRepeatError');

registerForm.addEventListener("submit", (e) => handleSend(e))

passwordInput.addEventListener("keyup", (e) => checkPassword(e.target.value))
passwordRepeatInput.addEventListener("keyup", checkPasswordRepeat)

const allRegisterData = [];

function handleSend(e) {
  e.preventDefault();
  let errorOccured = false;
  resetAllErrors()
  const nameRegex = /^[a-zA-Z]{5,}$/;
  if (!nameRegex.test(nameInput.value.trim())) {
    errorOccured = true;
    nameError.innerText = "Please use real name.";
    if(nameInput.value == "") nameError.innerText = "Name is required.";
    nameInput.classList.add("invalid")
  }
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    errorOccured = true;
    emailError.innerText = "Please use real email."
    if(emailInput.value == "") emailError.innerText = "Email is required.";
    emailInput.classList.add("invalid")
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (passwordInput.value.trim() !== passwordRepeatInput.value.trim()) {
    errorOccured = true;
    passwordRepeatError.innerText = "Passwords do not match.";
    if(passwordRepeatInput.value == "") passwordRepeatError.innerText = "Repeat password is required.";
    passwordRepeatInput.classList.add("invalid")
  }
  if (!passwordRegex.test(passwordInput.value.trim())) {
    errorOccured = true;
    passwordError.innerText = "Please choose strong password.";
    if(passwordInput.value == "") passwordError.innerText = "Password is required.";
    passwordInput.classList.add("invalid")
  }
  if (passwordRepeatInput.value == "") {
    errorOccured = true;
    passwordRepeatError.innerText = "Confirm password is required.";
    passwordRepeatInput.classList.add("invalid")
  }

  if (errorOccured) return;

  resetAllErrors();
  
  //check if user is already registered.
  let isUserRegistered = false;
  allRegisterData.forEach((user) => {
    if(user.email === emailInput.value){
      isUserRegistered = true;
      return;
    }
  })

  if(isUserRegistered){
    errorSpan.innerHTML = '<span class="failed">User is already registered, try different Email.</span>'
    return;
  }


  const newRegisterData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }
  allRegisterData.push(newRegisterData)
  localStorage.setItem("registerData", JSON.stringify(allRegisterData));
  console.log(allRegisterData)
  errorSpan.innerHTML = '<span class="success">Registered successfully!</span>'
  nameInput.value = ""
  emailInput.value = ""
  passwordInput.value = ""
  passwordRepeatInput.value = ""
  passwordInput.classList.remove("valid");
  passwordRepeatInput.classList.remove("valid");
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
  passwordError.innerText = "";

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

function checkPasswordRepeat() {
  passwordRepeatError.innerText = ""
  if (passwordInput.value == passwordRepeatInput.value) {
    passwordRepeatInput.classList.remove("invalid");
    passwordRepeatInput.classList.add("valid");
  } else {
    passwordRepeatInput.classList.remove("valid");
    passwordRepeatInput.classList.add("invalid");
  }
}


function resetAllErrors(){
  nameError.innerText = ""
  emailError.innerText = ""
  passwordError.innerText = ""
  passwordRepeatError.innerText = ""
}