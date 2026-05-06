import { initalizeProgressDisplay, updateProgressDisplay } from "./quiz-progress-display.js";
import { loadQuestion } from "./quiz-questions.js";
import { animateQuestionEnter, animateQuestionExit, resetAnimationState, animateErrorShakeOnElement } from "./quiz-animations.js";

import { enterResponseStage } from "./stages/response.stage.js";
import { enterQuestionStage } from "./stages/question.stage.js";
import { nextPartStage } from "./stages/next-part.stage.js";



async function getQuizData() {
    try {
        const response = await fetch('./quiz-questions/questions.json');

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data

    } catch (error) {
        console.error('There was an error loading the JSON:', error);
    }
}

const quizData = await getQuizData();
let userAnswers = [[], []];
let questionCountForPart = [2, 1];
const totalPartCount = quizData.parts.length;
const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");

const stateIndexes = {
    "questionIndex": 0,
    "partIndex": 0,
    "selectedChoiceIndex": 0,
    "stageIndex": 0
}

export { quizData, stateIndexes, questionCountForPart, totalPartCount };


let selectionMade = false;

// Updates CSS classes whenever one of the choices in the quiz gets selected
quizChoicesWrapper.addEventListener('change', (event) => {
    if (event.target.type === 'radio' && quizChoicesWrapper.classList.contains("active")) {
        const radioButtons = Array.from(document.querySelectorAll(`input[name="${event.target.name}"]`));
        const newSelectionIndex = radioButtons.indexOf(event.target);

        try { radioButtons[stateIndexes.selectedChoiceIndex].parentElement.classList.remove("selected", "checked"); } catch {}
        radioButtons[newSelectionIndex].parentElement.classList.add("selected", "checked");

        selectionMade = true;
        stateIndexes.selectedChoiceIndex = newSelectionIndex;
    }
});


initalizeProgressDisplay();

const quizTitle = document.getElementById("quiz-title");
quizTitle.innerHTML = `Quiz — Part ${stateIndexes.partIndex + 1} of ${totalPartCount}`

loadQuestion(quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]);
animateQuestionEnter();


const quizForm = document.getElementById("quiz-form");
quizForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Enter response stage
    if (stateIndexes.stageIndex === 0) {
        // If nothing selected, return
        if (!selectionMade) {
            animateErrorShakeOnElement(event.submitter);
            return;
        } 
        selectionMade = false;

        stateIndexes.stageIndex += 1;
        //if (stateIndexes.questionIndex + 1 === questionCountForPart[stateIndexes.partIndex]) stateIndexes.stageIndex = 2;

        userAnswers[stateIndexes.partIndex][stateIndexes.questionIndex] = stateIndexes.selectedChoiceIndex;
        
        enterResponseStage();
    }

    // Enter question stage
    else if (stateIndexes.stageIndex === 1) {
        stateIndexes.stageIndex = 0;

        await animateQuestionExit();

        enterQuestionStage();

        resetAnimationState();
        
        await animateQuestionEnter();
    }

    // Enter next part stage
    else if (stateIndexes.stageIndex === 2) {
        stateIndexes.stageIndex = 0;
    }

    updateProgressDisplay();
    quizTitle.innerHTML = `Quiz — Part ${stateIndexes.partIndex + 1} of ${quizData.parts.length}`
})