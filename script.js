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
    switch (operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '*':
        case 'x':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
}

let operand1 = null;
let operand2 = null;
let operator = null;

// Hook up listener to all buttons with event delegation on the div with class "buttons"
const buttons = document.querySelector('.buttons');
const displayResult = document.querySelector('#display-result');
const displayHistory = document.querySelector('#display-history');

buttons.addEventListener('click', function(e) {
    if (e.target.classList.contains('number')) {
        // If the button clicked is a number, add it to the display
        // Check if we need to clear the display first if it is the first number that we entered
        // it should be the first number if the display is 0 and there is no display history/previous result
        // We also want to clear the display if the previous button clicked was an operator so we can enter the second operand
        if ((displayResult.textContent === '0' && displayHistory.textContent === '') || (operand1 && displayHistory.textContent !== '')) {
            displayResult.textContent = '';
        }
        displayResult.textContent += e.target.textContent;
    } else if (e.target.classList.contains('operator')) {
        // If the button clicked is an operator, store the first operand and the operator
        // else it might be part of a chain of operations, so we need to operate on the previous result, check if there is a previous result
        if (displayHistory.textContent !== '') {
            // If there is a previous result, then this must be a chain of operations so we have the second operand in the display
            // and the operand1 is the previous result with the operator so we can operate on them and then update the display history
            operand2 = Number(displayResult.textContent);
            const result = operate(operator, operand1, operand2);
            displayResult.textContent = result;
            operand1 = result;
            operator = e.target.textContent;
        } else {
            operand1 = Number(displayResult.textContent);
            operator = e.target.textContent;
        }
        // Update the display history with the first operand and the operator
        displayHistory.textContent = `${operand1} ${operator}`;
    } else if (e.target.id === 'equals') {
        // If the button clicked is the equals button, store the second operand and operate
        // also update history with the second operand and equals sign
        operand2 = Number(displayResult.textContent);
        displayResult.textContent = operate(operator, operand1, operand2);
        displayHistory.textContent += ` ${operand2} =`;
    } else if (e.target.id === 'clear') {
        // If the button clicked is the clear button, clear the display
        // and reset all state variables
        displayResult.textContent = '0';
        displayHistory.textContent = '';
        operand1 = null;
        operand2 = null;
        operator = null;
    }
});