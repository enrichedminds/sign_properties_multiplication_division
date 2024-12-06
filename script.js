const problemElement = document.getElementById("problem");
const resultElement = document.getElementById("result");
const startContainer = document.getElementById("start-container");
const practiceContainer = document.getElementById("practice-container");
const summaryContainer = document.getElementById("summary");
const timerElement = document.getElementById("time-remaining");
const correctCountElement = document.getElementById("correct-count");
const incorrectCountElement = document.getElementById("incorrect-count");
const percentageElement = document.getElementById("percentage");

const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

let currentProblem = {};
let correctAnswers = 0;
let incorrectAnswers = 0;
let practiceTime = 0;
let timer;

function startPractice() {
    const timeInput = document.getElementById("time-select").value;
    practiceTime = parseInt(timeInput);

    // Reset counters and hide the start page
    correctAnswers = 0;
    incorrectAnswers = 0;
    startContainer.style.display = "none";
    practiceContainer.style.display = "block";
    summaryContainer.style.display = "none";

    // Update the timer and generate the first problem
    timerElement.textContent = practiceTime;
    generateProblem();

    // Start the timer
    clearInterval(timer);
    timer = setInterval(() => {
        practiceTime--;
        timerElement.textContent = practiceTime;

        if (practiceTime <= 0) {
            endPractice();
        }
    }, 1000);
}

function endPractice() {
    clearInterval(timer);

    // Show the summary
    practiceContainer.style.display = "none";
    summaryContainer.style.display = "block";

    const totalAnswers = correctAnswers + incorrectAnswers;
    const percentage = totalAnswers > 0 ? ((correctAnswers / totalAnswers) * 100).toFixed(2) : 0;

    correctCountElement.textContent = `Correct: ${correctAnswers}`;
    incorrectCountElement.textContent = `Incorrect: ${incorrectAnswers}`;
    percentageElement.textContent = `Correct Percentage: ${percentage}%`;
}

function goToStart() {
    // Show the start page and hide others
    startContainer.style.display = "block";
    practiceContainer.style.display = "none";
    summaryContainer.style.display = "none";

    // Reset visual values
    document.getElementById("time-select").value = 60; // Default value
}

function generateProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const sign1 = Math.random() > 0.5 ? 1 : -1;
    const sign2 = Math.random() > 0.5 ? 1 : -1;
    const operation = Math.random() > 0.5 ? "multiply" : "divide";

    const term1 = num1 * sign1;
    const term2 = num2 * sign2;

    currentProblem = {
        term1,
        term2,
        operation,
        correctAnswer: calculateSign(term1, term2, operation),
    };

    if (operation === "multiply") {
        problemElement.innerHTML = `${term1} × ${term2}`;
    } else {
        problemElement.innerHTML = `
            <span id="numerator">${term1}</span>
            <span id="divider"></span>
            <span id="denominator">${term2}</span>
        `;
    }

    resultElement.textContent = "";
    resultElement.className = "";
}

function calculateSign(term1, term2, operation) {
    if (operation === "multiply") {
        return term1 * term2 > 0 ? "positive" : "negative";
    } else {
        return term1 / term2 > 0 ? "positive" : "negative";
    }
}

function checkAnswer(answer) {
    if (answer === currentProblem.correctAnswer) {
        correctAnswers++;
        resultElement.textContent = "Correct! 😊";
        resultElement.className = "correct";
        correctSound.play(); // Play correct sound
    } else {
        incorrectAnswers++;
        const actualResult =
            currentProblem.correctAnswer === "positive" ? "Positive" : "Negative";
        resultElement.textContent = `Incorrect ❌. The result is ${actualResult}.`;
        resultElement.className = "incorrect";
        incorrectSound.play(); // Play incorrect sound
    }

    // Automatically generate a new problem after a short delay
    setTimeout(() => {
        generateProblem();
    }, 1000);
}
