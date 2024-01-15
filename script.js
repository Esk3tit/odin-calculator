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

function evaluate(isOperator) {
    if (shouldClearDisplay && isOperator) return;
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

function addDigit(digit) {
    if ((displayResult.textContent === '0' && displayHistory.textContent === '') || shouldClearDisplay) {
        displayResult.textContent = '';
        shouldClearDisplay = false;
    }
    displayResult.textContent += digit;
}

function addDecimal() {
    if (!displayResult.textContent.includes('.')) {
        if (shouldClearDisplay) {
            displayResult.textContent = '0.';
            shouldClearDisplay = false;
        } else {
            displayResult.textContent += '.';
        }
    }
}

function setOperator(op) {
    if (operator) evaluate(true);
    operand1 = Number(displayResult.textContent);
    operator = op;
    displayHistory.textContent = `${operand1} ${operator}`;
    shouldClearDisplay = true;
}

function deleteDigit() {
    if (shouldClearDisplay) return;
    displayResult.textContent = displayResult.textContent.slice(0, -1);
    if (displayResult.textContent === '') displayResult.textContent = '0';
}

function negate() {
    let value = Number(displayResult.textContent);
    if (value === 0) {
        return;
    } else {
        displayResult.textContent = -value;
    }
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
        addDigit(e.target.textContent);
    } else if (e.target.classList.contains('operator')) {
        setOperator(e.target.textContent);
    } else if (e.target.id === 'equals') {
        evaluate(false);
    } else if (e.target.id === 'clear') {
        clear();
    } else if (e.target.id === 'backspace') {
        deleteDigit();
    } else if (e.target.id === 'decimal') {
        addDecimal();
    } else if (e.target.id === 'negate') {
        negate();
    }
});

// Hook up keyboard support
addEventListener('keydown', function(e) {
    if (e.key >= 0 && e.key <= 9) {
        addDigit(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        setOperator(e.key === '*' ? 'x' : e.key === '/' ? '÷' : e.key);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        evaluate(false);
    } else if (e.key === 'Backspace') {
        deleteDigit();
    } else if (e.key === '.') {
        addDecimal();
    } else if (e.key === 'Escape') {
        e.preventDefault();
        clear();
    } else if (e.key === 'n') {
        e.preventDefault();
        negate();
    }
});