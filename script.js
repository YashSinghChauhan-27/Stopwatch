let timer;
let isRunning = false;
let isPaused = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCount = 1;

function startStop() {
    if (isPaused) {
        return; // If paused, do nothing
    }

    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopBtn").innerText = "Start";
        document.getElementById("startStopBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("lapBtn").disabled = true;
    } else {
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopBtn").innerText = "Stop";
    }
    isRunning = !isRunning;
}

function pause() {
    if (isRunning && !isPaused) {
        isPaused = true;
        clearInterval(timer);
        document.getElementById("startStopBtn").innerText = "Start";
        document.getElementById("startStopBtn").disabled = true;
        document.getElementById("pauseBtn").innerText = "Resume";
    } else if (isPaused) {
        isPaused = false;
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopBtn").disabled = false;
        document.getElementById("startStopBtn").innerText = "Stop";
        document.getElementById("pauseBtn").innerText = "Pause";
    }
}

function lap() {
    if (isRunning) {
        const lapTime = getFormattedTime();
        const lapList = document.getElementById("lapList");
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCount++;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 1;
    updateDisplay();
    document.getElementById("startStopBtn").innerText = "Start";
    document.getElementById("pauseBtn").innerText = "Pause";
    document.getElementById("startStopBtn").disabled = false;
    document.getElementById("pauseBtn").disabled = false;
    document.getElementById("lapBtn").disabled = false;
    document.getElementById("lapList").innerHTML = "";
}

function updateDisplay() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    document.getElementById("hours").innerText = padNumber(hours);
    document.getElementById("minutes").innerText = padNumber(minutes);
    document.getElementById("seconds").innerText = padNumber(seconds);
    document.getElementById("milliseconds").innerText = padNumber(milliseconds);
}

function padNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

function getFormattedTime() {
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds)}`;
}
