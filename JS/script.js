$(".stopwatch-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp()
    // show stopwatch wrapper
    $(".stopwatch").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

// back button stopwatch
$(".back-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp()
    // show clock wrapper
    $(".clock").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

// back button timer

$(".timer-btn").click(function () {
    // hide all other wrappers
    $(".outer-wrapper > div").slideUp()
    // show timer wrapper
    $(".timer").slideDown();
    // update type text
    $(".type").html("Stopwatch");
});

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
}

const updateTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    // Converting 24 hours to 12
    hours = hours % 12 || 12;

    // add trailing zeros if less than 10
    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").text(ampm);
    $("#other-ampm").text(otherampm);
};

// call the function on page load
updateTime();

// call function after every second
setInterval(updateTime, 1000);


// Stopwatch

let stopwatchHours = 0;
let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchMiliSeconds = 0;
let stopWatchRunning = false;
let laps = 0;
let stopwatchInterval;

const stopwatch = () => {
    // Increase Milisecond by one
    stopwatchMiliSeconds++;

    if (stopwatchMiliSeconds === 100) {
        // if stopwatchMiliSeconds equals 100 increase one second and set ms = 0
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0

    }

    if (stopwatchSeconds === 60) {
        // same with minutes
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }
    if (stopwatchMinutes === 60) {
        // same with hours
        stopwatchHours++;
        stopwatchMinutes = 0;
    }

    // show values on document

    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}

const startStopwatch = () => {
    if (!stopWatchRunning) {
        // if stopwatch already not running
        stopwatchInterval = setInterval(stopwatch, 10);
        stopWatchRunning = true;

    }
}

// Function to stop stopwatch 
const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopWatchRunning = false;
}


// Reset stopwatch on clicking reset button
const resetStopwatch = () => {
    // clear interval and set all values to default
    clearInterval(stopwatchInterval);
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopWatchRunning = false;
    laps = 0;

    // update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
}

// Start stopwatch on start button

$(".start-stopwatch").click(function () {
    startStopwatch();
    // hide start button show lap button
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
})

$(".reset-stopwatch").click(function () {
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
});

$(".lap-stopwatch").click(function () {
    // on lap button click
    laps++;
    // remove active class
    $(".lap").removeClass("active");

    // on click laps will be displayed
    $(".laps").prepend(`<div class="lap active">
    <p>lap ${laps}</p>
    <p>${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}
    ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}
    </p >
</div > `);

});


// Timer

let time = 0;
let timerHours = 0;
let timerMinutes = 0;
let timerSeconds = 0;
let timerMiliseconds = 0;
let timerInterval;

const getTime = () => {
    time = prompt("Enter time in minutes");
    // convert time to seconds
    time = time * 60;
    // update timer defaults
    setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

    // show user entered time on document
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
};

const timer = () => {
    timerMiliseconds--;
    if (timerMiliseconds === -1) {
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if (timerSeconds === -1) {
        timerSeconds = 59;
        timerMinutes--;
    }
    if (timerMinutes === -1) {
        timerMinutes = 59;
        timerHours--;
    }

    // update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

    // check time up on every interval
    timeUp();
};

const startTimer = () => {
    // before starting check if valid time given
    if (timerHours === 0 & timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
        // get the time if all values are zero
        getTime();
    }
    else {
        // start timer
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
};

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
};

// check if remaing time is 0
const timeUp = () => {
    if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
        // get the time if all values are zero
        resetTimer();
        alert("Time's Up");
        setTime();
    }
};

$(".start-timer").click(function () {
    startTimer();
});

$(".stop-timer").click(function () {
    stopTimer();
});

$(".reset-timer").click(function () {
    resetTimer();
});