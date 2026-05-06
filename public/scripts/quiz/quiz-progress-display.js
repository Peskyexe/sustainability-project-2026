import { stateIndexes, questionCountForPart, totalPartCount } from "./quiz-controller.js";

const progressWrapper = document.getElementById("quiz-progress-wrapper");
const progressBarWrapper = document.getElementById("quiz-progress-bar-wrapper");
const questionLabel = document.getElementById("quiz-question-label");
const progressLabel = document.getElementById("quiz-progress-label");


const getProgressPercentage = () => { return ((stateIndexes.questionIndex + 1) / questionCountForPart[stateIndexes.partIndex]) * 100 };
const updateQuestionLabel = () => questionLabel.innerHTML = `Question ${stateIndexes.questionIndex + 1} of ${questionCountForPart[stateIndexes.partIndex]}`;
const updateProgressLabel = () => progressLabel.innerHTML = `${getProgressPercentage()}%`;


const progressBarsArray = [];

function initalizeProgressDisplay() {
    progressBarWrapper.innerHTML = "";

    // Creates a progress bar for each part of the quiz
    for (let i = 0; i < totalPartCount; i++) {
        const progressBarSubWrapper = document.createElement("div");
        progressBarSubWrapper.classList.add("quiz-progress-bar-sub-wrapper");
        
        progressBarWrapper.appendChild(progressBarSubWrapper);

        const progressBarElement = document.createElement("div");
        progressBarElement.classList.add("quiz-progress-bar");
        progressBarElement.id = `progress-bar-part-${i + 1}`;

        progressBarSubWrapper.appendChild(progressBarElement);
        progressBarsArray.push(progressBarElement);
    }

    resetProgressDisplay();
    updateProgressDisplay();
}


function updateProgressBars() {
    progressBarsArray.forEach((progressBar, index) => {
        if (stateIndexes.partIndex > index) {
            progressBar.style.width = "100%";
            progressBar.style.backgroundColor = "var(--primary)"
        }

        else if (stateIndexes.partIndex == index) {
            progressBar.style.width = getProgressPercentage() + "%";
            progressBar.style.backgroundColor = "var(--primary)"
        }

        else if (stateIndexes.partIndex < index) {
            progressBar.style.width = "0%";
            progressBar.style.backgroundColor = "var(--bg-dark)"
        }  
    });
}


function updateProgressDisplay() {
    // Check answers stage
    if (stateIndexes.stageIndex === 0) {
        updateQuestionLabel();
    }

    // Next question stage
    else if (stateIndexes.stageIndex === 1) {
        updateQuestionLabel();
        updateProgressLabel();
        updateProgressBars();
    }

    // Next part stage
    else if (stateIndexes.stageIndex === 2) {
        updateQuestionLabel();
        progressLabel.innerHTML = "0%";
    }
}


function resetProgressDisplay() {
    progressBarsArray.forEach(progressBar => {
        progressBar.style.backgroundColor = "var(--bg-dark)";
    });

    progressLabel.innerHTML = "0%";
}


export { initalizeProgressDisplay, updateProgressDisplay };