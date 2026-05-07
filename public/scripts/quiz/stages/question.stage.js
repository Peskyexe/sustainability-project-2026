import { loadQuestion } from "../quiz-questions.js";
import { quizData, stateIndexes, questionCountForPart } from "../quiz-controller.js";
import { animateQuestionEnter, animateQuestionExit, resetQuestionAnimationState } from "../quiz-animations.js";
import { hideResponse } from "./response.stage.js";
import { updateProgressDisplay } from "../quiz-progress-display.js";


const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");


async function enterQuestionStage(unload = true) {
    // Animate out previous
    if (unload === true) {
        hideResponse();
        await animateQuestionExit();
    }

    // Allow choice selection
    quizChoicesWrapper.classList.add("active");

    // Load DOM for next
    nextQuestion();
    updateButtonText();
    console.log(stateIndexes.questionIndex)
    updateProgressDisplay();

    // Animate next
    resetQuestionAnimationState();
    await animateQuestionEnter();
}


function nextQuestion() {
    stateIndexes.questionIndex += 1;

    if (stateIndexes.questionIndex >= questionCountForPart[stateIndexes.partIndex]) {
        stateIndexes.questionIndex = 0;
    }
    
    loadQuestion(quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]);
}


const nextButton = document.getElementById("quiz-next-question-button");

function updateButtonText() {
    if (stateIndexes.partIndex === 0) nextButton.innerHTML = 'Check answer';
    else if (stateIndexes.partIndex === 1) nextButton.innerHTML = 'Save answer';
}


export { enterQuestionStage };
