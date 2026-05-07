import { quizData, stateIndexes, questionCountForPart } from "../quiz-controller.js";
import { animateResponseEnter, animateResponseExit, resetResponseAnimationState } from "../quiz-animations.js";


let activeQuestionData = {};

const nextButton = document.getElementById("quiz-next-question-button");
const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");

function enterResponseStage() {
    quizChoicesWrapper.classList.remove("active");
    activeQuestionData = quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex];
    
    if (stateIndexes.questionIndex + 1 !== questionCountForPart[stateIndexes.partIndex]) nextButton.innerHTML = 'Next question <i class="fa-solid fa-arrow-right-long"></i>'; // If not last question in part
    else if (stateIndexes.questionIndex + 1 === questionCountForPart[stateIndexes.partIndex]) nextButton.innerHTML = 'Next part <i class="fa-solid fa-arrow-right-long"></i>'; // If last question in part

    if (stateIndexes.partIndex === 0) {
        showAnswers();
        showResponse();
    }
}


function showAnswers() {
    const questionChoices = Array.from(document.querySelectorAll('.quiz-choice'));
    questionChoices.forEach((choice, index) => {
        choice.classList.remove("selected");

        if (activeQuestionData["correct-answer-indexes"].includes(index)) {
            choice.classList.add("correct");
        }

        else if (activeQuestionData["correct-answer-indexes"].includes(index) == false && index === stateIndexes.selectedChoiceIndex) {
            choice.classList.add("wrong");
        }
    });
}


const responseWrapper = document.getElementById("quiz-response-wrapper");
const responseTitle = document.getElementById("quiz-response-title");
const responseText = document.getElementById("quiz-response-text");

function showResponse() {
    updateResponseDOM();

    responseWrapper.style.display = "block"

    resetResponseAnimationState();

    animateResponseEnter();
}

function hideResponse() {
    animateResponseExit();

    responseWrapper.style.display = "none"

    clearResponseDOM();
}

function updateResponseDOM() {
    const answerIsCorrect = activeQuestionData["correct-answer-indexes"].includes(stateIndexes.selectedChoiceIndex);

    if (answerIsCorrect === true) responseTitle.innerHTML = "Correct!";
    if (answerIsCorrect === false) responseTitle.innerHTML = "Close one!";

    responseText.innerHTML = activeQuestionData["response-html"];
}

function clearResponseDOM() {
    responseTitle.innerHTML = "unloaded";
    responseText.innerHTML = "unloaded";
}


export { enterResponseStage, hideResponse };