import { initalizeProgressDisplay, updateProgressDisplay } from "./quiz-progress-display.js";
import { loadQuestion } from "./quiz-questions.js";
import { checkForSelection } from "./quiz-choice-selection.js";
import { animateQuestionEnter } from "./quiz-animations.js";

import { enterResponseStage } from "./stages/response.stage.js";
import { enterQuestionStage } from "./stages/question.stage.js";
import { enterNextPartStage } from "./stages/next-part.stage.js";


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

let questionCountForPart = [quizData.parts[0].length, quizData.parts[1].length];
const totalPartCount = quizData.parts.length;

const stateIndexes = {
    "questionIndex": 0,
    "partIndex": 0,
    "selectedChoiceIndex": 0,
    "stageIndex": 0
}

export { quizData, stateIndexes, questionCountForPart, totalPartCount };


initalizeProgressDisplay();

loadQuestion(quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]);

animateQuestionEnter();
//enterNextPartStage();

const quizForm = document.getElementById("quiz-form");
quizForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Enter response stage
    if (stateIndexes.stageIndex === 0) {
        if (checkForSelection(event) === false) return
        
        // Save answers
        userAnswers[stateIndexes.partIndex][stateIndexes.questionIndex] = stateIndexes.selectedChoiceIndex;
        
        enterResponseStage();
        
        stateIndexes.stageIndex += 1;
        updateProgressDisplay();

        if (stateIndexes.questionIndex + 1 === questionCountForPart[stateIndexes.partIndex]) stateIndexes.stageIndex = 2;
    }

    // Enter question stage
    else if (stateIndexes.stageIndex === 1) {
        enterQuestionStage();

        stateIndexes.stageIndex = 0;
    }

    // Enter next part stage
    else if (stateIndexes.stageIndex === 2) {
        enterNextPartStage();

        stateIndexes.stageIndex = 0;
    }
})