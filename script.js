function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let result;
    switch(operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        default:
            console.log('operate: operator error');
            break;
    }
    if(result.toString().length > 12) {
        return result.toExponential(2);
    }
    return result;
}

let currentNum = 0;
let prevNum;
let currentOperator = '';
let resultDone = false;
const display = document.querySelector('#display-output');

function buttonPress() {
    const btnVal = this.textContent;
    switch(true) {
        case /\d/.test(btnVal):
            if (display.textContent === '0' || resultDone) {
                display.textContent = btnVal;
            } else if (display.textContent.length > 12) {
                return;
            } else {
                display.textContent += btnVal;
            }
            currentNum = +display.textContent;
            resultDone = false;
            break;
        case btnVal === 'C':
            display.textContent = '0';
            currentNum = 0;
            prevNum = undefined;
            resultDone = false;
            break;
        case /[\+\-x÷]/.test(btnVal):
            if(prevNum && currentNum) {
                prevNum = operate(prevNum, currentNum, currentOperator);
                display.textContent = prevNum;
                currentNum = undefined;
                resultDone = true;
                currentOperator = btnVal;
                return;
            }
            prevNum = currentNum;
            currentNum = undefined;
            display.textContent = '0';
            currentOperator = btnVal;
            break;
        case btnVal === '=':
            if(!(prevNum && currentNum)) {
                return;
            } else {
            currentNum = operate(prevNum, currentNum, currentOperator);
            display.textContent = currentNum;
            prevNum = undefined;
            currentOperator = '';
            resultDone = true;
            }
            break;
        default:
            console.log('no match');
            break;
    }
}

//generate buttons
const btnContainer = document.querySelector('#button-container');

const buttonLabels = [
    7, 8, 9, '+', 6, 5, 4, '-', 3, 2, 1, 'x', 'C', 0, '=', '÷'
];

function generateButtons() {
    for (let i = 0; i < 16; i++) {
        const btn = document.createElement('button');
        btn.textContent = buttonLabels[i];
        btn.classList.add('calc-button');
        btn.addEventListener('click', buttonPress);
        btnContainer.appendChild(btn);
        if(/[\+\-x÷=]/.test(btn.textContent)) {
            btn.classList.add('operator');
        }
    }
}

generateButtons();

