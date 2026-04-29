const questionTitle = document.getElementById("quiz-question-title");
const questionDescription = document.getElementById("quiz-question-description");
const questionIcon = document.getElementById("quiz-question-icon");
const choicesContainer = document.getElementById("quiz-choices-wrapper");

function updateQuestionHTML(questionData) {
    questionTitle.innerHTML = questionData.title;
    questionDescription.innerHTML = questionData.description;
    questionIcon.src = `assets/icons/${questionData["icon-filename"]}`
}

function generateChoiceElement(choice) {
    const choiceWrapper = document.createElement("label");
    choiceWrapper.classList.add("quiz-choice");

    const choiceRadio = document.createElement("input");
    choiceRadio.type = "radio";
    choiceRadio.name = "quiz-choice";
    choiceRadio.value = choice.value;
    choiceWrapper.appendChild(choiceRadio);

    const choiceIcon = document.createElement("img");
    choiceIcon.src = `assets/icons/${choice["icon-filename"]}`;
    choiceIcon.width = "40";
    choiceWrapper.appendChild(choiceIcon);

    const choiceText = document.createElement("span");
    choiceText.classList.add("quiz-choice-text");
    choiceText.innerHTML = choice.text;
    choiceWrapper.appendChild(choiceText)

    return choiceWrapper;
}


function showQuestion(questionData) {
    updateQuestionHTML(questionData)

    choicesContainer.innerHTML = "";
    
    questionData.choices.forEach(choice => {
        const choiceElement = generateChoiceElement(choice)
        console.log(choiceElement)
        choicesContainer.appendChild(choiceElement)
    });
}

export { showQuestion };