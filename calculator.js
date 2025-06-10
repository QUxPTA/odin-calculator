// Display and State Variables
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
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
let justEvaluated = false;

// Digit Button clicks handler
digitButtons.forEach((button) =>
  button.addEventListener('click', () => appendDigit(button.dataset.digit))
);

function appendDigit(digit) {
  if (display.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  display.textContent += digit;
  justEvaluated = false;
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
  if (currentOperator !== null && !justEvaluated) evaluate(); // Chain calculations;
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
  updateExpressionDisplay();
  justEvaluated = false;
}

// Equals Button handler
equalsButton.addEventListener('click', evaluate);

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondOperand = display.textContent;
  const result = operate(currentOperator, firstOperand, secondOperand);
  display.textContent = roundResult(result);
  expressionDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;

  firstOperand = result.toString();
  secondOperand = '';
  currentOperator = null;
  justEvaluated = true;
}

// Round result to avoid long decimals
function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

// Clear & Backspace buttons handlers
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);

function clear() {
  display.textContent = '0';
  expressionDisplay.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldResetScreen = false;
  justEvaluated = false;
}

function backspace() {
  if (shouldResetScreen || justEvaluated) return;
  display.textContent = display.textContent.slice(0, -1) || '0';
}

// Decimal input logic, preventing multiple decimals
decimalButton.addEventListener('click', appendDecimal);

function appendDecimal() {
  if (shouldResetScreen || justEvaluated) resetScreen();
  if (!display.textContent.includes('.')) {
    display.textContent += display.textContent ? '.' : '0';
  }
  justEvaluated = false;
}

function updateExpressionDisplay() {
  expressionDisplay.textContent = `${firstOperand} ${currentOperator}`;
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
  if (b === 0) {
    display.textContent = '';
    expressionDisplay.textContent = `${a} / ${b}`;
    firstOperand = '';
    secondOperand = '';
    currentOperator = "Nice try. 🤨 You can't divide by zero.";
    justEvaluated = true;
    return '';
  }
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
