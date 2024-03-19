const inputs = document.getElementsByTagName('input');
const textArea = document.getElementsByTagName('textarea');

for (let i = 0; i < inputs.length; i++) {
    if(inputs[i].id != 'passwordInput' || inputs[i].id != 'passwordRepeatInput') {
        inputs[i].onkeydown = function(event) {
            inputs[i].classList.remove('invalid')
            document.getElementById(getErrorId(inputs[i].id)).innerText = ''
        };
    }
}

for (let j = 0; j < textArea.length; j++) {
    textArea[j].onkeydown = function(event) {
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