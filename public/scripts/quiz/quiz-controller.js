import { fetchQuizQuestions } from "./question-loading.js";
import { showQuestion } from "./question-updating.js";


const quizQuestions = await fetchQuizQuestions();

let questionIndex = 0;
let stage = 0;
let partIndex = 0;

showQuestion(quizQuestions.parts[partIndex][questionIndex]);


const quizForm = document.getElementById("quiz-form");
const nextButton = document.getElementById("quiz-next-question-button");

quizForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (stage === 0) {
        nextButton.innerHTML = 'Next question <i class="fa-solid fa-arrow-right-long"></i>';

        checkAnswer();

        stage += 1;
    }

    else if (stage === 1) {
        nextButton.innerHTML = 'Check answer';
        questionIndex += 1;

        nextQuestion();

        stage = 0;
    }
})


function checkAnswer() {
    
}

function nextQuestion() {
    if (questionIndex > 5) {
        questionIndex = 0;
        partIndex += 1;
    }

    showQuestion(quizQuestions.parts[partIndex][questionIndex]);
}


