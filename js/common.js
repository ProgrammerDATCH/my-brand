const inputs = document.getElementsByTagName('input');
const textArea = document.getElementsByTagName('textarea');

for (let i = 0; i < inputs.length; i++) {
    if(inputs[i].id != 'passwordInput' || inputs[i].id != 'passwordRepeatInput') {
        inputs[i].onkeydown = function(event) {
            inputs[i].classList.remove('invalid')
        };
    }
}

for (let j = 0; j < textArea.length; j++) {
    textArea[j].onkeydown = function(event) {
        textArea[j].classList.remove('invalid')
    };
}
