import { quizData, stateIndexes, questionCountForPart } from "../quiz-controller.js";

const nextButton = document.getElementById("quiz-next-question-button");
const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");


function enterResponseStage() {
    quizChoicesWrapper.classList.remove("active");
    
    if (stateIndexes.questionIndex + 1 !== questionCountForPart[stateIndexes.partIndex]) nextButton.innerHTML = 'Next question <i class="fa-solid fa-arrow-right-long"></i>'; // If not last question in part
    else if (stateIndexes.questionIndex + 1 === questionCountForPart[stateIndexes.partIndex]) nextButton.innerHTML = 'Next part <i class="fa-solid fa-arrow-right-long"></i>'; // If last question in part

    if (stateIndexes.partIndex === 0) showAnswers();
}

export { enterResponseStage };

function showAnswers() {
    const questionChoices = Array.from(document.querySelectorAll('.quiz-choice'));
    questionChoices.forEach((choice, index) => {
        choice.classList.remove("selected");

        if (quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]["correct-answer-indexes"].includes(index)) {
            choice.classList.add("correct");
        }

        else if (quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]["correct-answer-indexes"].includes(index) == false && index === stateIndexes.selectedChoiceIndex) {
            choice.classList.add("wrong");
        }
    });
}

function updateSelected() {
    
}