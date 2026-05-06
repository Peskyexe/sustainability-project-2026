import { loadQuestion } from "../quiz-questions.js";
import { quizData, stateIndexes, questionCountForPart } from "../quiz-controller.js";

const nextButton = document.getElementById("quiz-next-question-button");
const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");


function enterQuestionStage() {
    quizChoicesWrapper.classList.add("active");

    stateIndexes.questionIndex += 1;
    nextQuestion();

    if (stateIndexes.partIndex === 0) nextButton.innerHTML = 'Check answer';
    else if (stateIndexes.partIndex === 1) nextButton.innerHTML = 'Save answer';
}

export { enterQuestionStage };

function nextQuestion() {
    if (stateIndexes.questionIndex >= questionCountForPart[stateIndexes.partIndex]) {
        stateIndexes.questionIndex = 0;
        stateIndexes.partIndex += 1;
    }

    loadQuestion(quizData.parts[stateIndexes.partIndex][stateIndexes.questionIndex]);
}
