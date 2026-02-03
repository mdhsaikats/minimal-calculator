const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentValue = '';
let previousValue = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();
        
        // Handle clear button
        if (value === 'C') {
            currentValue = '';
            previousValue = '';
            operation = null;
            display.value = '';
            return;
        }
        
        // Handle numbers and decimal point
        if (!isNaN(value) || value === '.') {
            if (value === '.' && currentValue.includes('.')) return;
            currentValue += value;
            display.value = currentValue;
        }
        
        // Handle operators
        else if (['+', '−', '×', '÷'].includes(value)) {
            if (currentValue === '') return;
            if (previousValue !== '') {
                calculate();
            }
            operation = value;
            previousValue = currentValue;
            currentValue = '';
        }
        
        // Handle equals
        else if (value === '=') {
            if (currentValue === '' || previousValue === '' || !operation) return;
            calculate();
            operation = null;
            previousValue = '';
        }
    });
});

function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
    display.value = currentValue;
}