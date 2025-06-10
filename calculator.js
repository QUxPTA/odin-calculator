// Display and State Variables
const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('[data-digit]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

// Digit Button clicks handler
digitButtons.forEach((button) =>
  button.addEventListener('click', () => appendDigit(button.dataset.digit))
);

function appendDigit(digit) {
  if (display.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += digit;
}
function resetScreen() {
  display.textContent = '';
  shouldResetScreen = false;
}

// Operator Button clicks handler
operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperator(button.dataset.operator))
);

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

// Equals Button handler
equalsButton.addEventListener('click', evaluate);

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.textContent;
  const result = operate(currentOperator, firstOperand, secondOperand);
  display.textContent = roundResult(result);
  currentOperator = null;
}

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

// Clear & Backspace buttons handlers
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);

function clear() {
  display.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldResetScreen = false;
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}

// Decimal input logic, preventing multiple decimals
decimalButton.addEventListener('click', appendDecimal);

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}
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
  if (b === 0) return 'ERROR cannot divide by zero';
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}
