let display = document.getElementById('display');
let lastInput = '';
let justCalculated = false; // Flag to track if the last action was a calculation
let history = [];

function appendToDisplay(value) {
    if (justCalculated && !isOperator(value)) {
        // If a calculation was just done and the next input is not an operator, clear the display
        display.value = '';
        justCalculated = false;
    }

    if (display.value.length >= 9) {
        return; // Prevent input if display already has 9 characters
    }

    if (isOperator(value) && isOperator(lastInput)) {
        return; // Prevent adding consecutive operators
    }

    display.value += value;
    lastInput = value;
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function calculate() {
    try {
        let result = eval(display.value).toString();
        if (result.length > 9) {
            result = result.slice(0, 9);
        }
        history.push(`${display.value} = ${result}`);
        updateHistory();
        display.value = result;
        lastInput = display.value;
        justCalculated = true; // Set the flag after a calculation
    } catch (e) {
        display.value = 'Error';
        lastInput = '';
        justCalculated = false;
    }
}

function clearDisplay() {
    display.value = '';
    lastInput = '';
    justCalculated = false; // Reset the flag when the display is cleared
}

function undo() {
    display.value = display.value.slice(0, -1);
    lastInput = display.value.charAt(display.value.length - 1);
}

function showHistory() {
    document.getElementById('history').style.display = 'block';
}

function closeHistory() {
    document.getElementById('history').style.display = 'none';
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    for (let entry of history) {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    }
}
