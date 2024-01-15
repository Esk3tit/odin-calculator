function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

function operate(operator, operand1, operand2) {
    let result;
    switch (operator) {
        case '+':
            result = add(operand1, operand2);
            break;
        case '-':
            result = subtract(operand1, operand2);
            break;
        case 'x':
            result = multiply(operand1, operand2);
            break;
        case '÷':
            result = divide(operand1, operand2);
            break;
    }
    return Number.isInteger(result) ? result : Number(result.toFixed(4));
}

function clear() {
    displayResult.textContent = '0';
    displayHistory.textContent = '';
    operand1 = null;
    operand2 = null;
    operator = null;
}

function evaluate() {
    if (!operator) {
        displayHistory.textContent = `${displayResult.textContent} =`;
    } else {
        operand2 = Number(displayResult.textContent);
        displayHistory.textContent += ` ${operand2} =`;
        if (operator === '÷' && operand2 === 0) {
            displayResult.textContent = 'BRUH MOMENT';
        } else {
            displayResult.textContent = operate(operator, operand1, operand2);
        }
    }
    shouldClearDisplay = true;
    operator = null;
}

let operand1 = null;
let operand2 = null;
let operator = null;
let shouldClearDisplay = false;

// Hook up listener to all buttons with event delegation on the div with class "buttons"
const buttons = document.querySelector('.buttons');
const displayResult = document.querySelector('#display-result');
const displayHistory = document.querySelector('#display-history');

buttons.addEventListener('click', function(e) {
    if (e.target.classList.contains('number')) {
        if ((displayResult.textContent === '0' && displayHistory.textContent === '') || shouldClearDisplay) {
            displayResult.textContent = '';
            shouldClearDisplay = false;
        }
        displayResult.textContent += e.target.textContent;
    } else if (e.target.classList.contains('operator')) {
        if (operator) evaluate();
        operand1 = Number(displayResult.textContent);
        operator = e.target.textContent;
        displayHistory.textContent = `${operand1} ${operator}`;
        shouldClearDisplay = true;
    } else if (e.target.id === 'equals') {
        evaluate();
    } else if (e.target.id === 'clear') {
        clear();
    } else if (e.target.id === 'backspace') {
        if (shouldClearDisplay) return;
        displayResult.textContent = displayResult.textContent.slice(0, -1);
        if (displayResult.textContent === '') displayResult.textContent = '0';
    } else if (e.target.id === 'decimal') {
        if (!displayResult.textContent.includes('.')) {
            if (shouldClearDisplay) {
                displayResult.textContent = '0.';
                shouldClearDisplay = false;
            } else {
                displayResult.textContent += '.';
            }
        }
    }
});