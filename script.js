let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
        startStopButton.textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;
    timeDisplay.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
    startStopButton.textContent = 'Start';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${++lapCounter}: ${lapTime}`;

    
        lapsContainer.appendChild(lapElement);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}
