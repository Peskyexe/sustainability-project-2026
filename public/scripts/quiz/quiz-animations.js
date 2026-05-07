function waitForTransition(element) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            element.removeEventListener("transitionend", handler);
            resolve();
        }, 1000);

        const handler = (event) => {
            if (event.target !== element) return;

            clearTimeout(timeout);
            element.removeEventListener("transitionend", handler);
            resolve();
        };

        element.addEventListener("transitionend", handler, { once: true });
    });
}

async function animateElementEnter(element) {
    element.offsetHeight;
    element.classList.add("enter-active");
    await waitForTransition(element);
}

async function animateElementExit(element) {
    element.offsetHeight;
    element.classList.add("exit-active");
    await waitForTransition(element);    
}


function animateErrorShakeOnElement(element) {
    element.classList.add("error-shake");

    element.addEventListener("animationend", () => {
        element.classList.remove("error-shake");
    }, { once: true });
}

export { animateErrorShakeOnElement };


function resetQuestionAnimationState() {
    const question = document.getElementById("quiz-question-group");
    const choices = document.querySelectorAll(".quiz-choice"); 
    const button = document.getElementById("quiz-next-question-button");

    question.classList.remove("enter-active", "exit-active");
    button.classList.remove("enter-active", "exit-active");

    choices.forEach(choice => {
        choice.classList.remove("enter-active", "exit-active");
    });
}

async function animateQuestionEnter(stagger = 100) {
    const question = document.getElementById("quiz-question-group");
    const choices = Array.from(document.querySelectorAll(".quiz-choice"));
    const button = document.getElementById("quiz-next-question-button");

    await animateElementEnter(question);

    const choicePromises = choices.map((choice, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                animateElementEnter(choice).then(resolve);
            }, index * stagger);
        });
    });

    await Promise.all(choicePromises);

    await animateElementEnter(button);
}

async function animateQuestionExit(stagger = 70) {
    const question = document.getElementById("quiz-question-group");
    const choices = Array.from(document.querySelectorAll(".quiz-choice")).reverse();
    const button = document.getElementById("quiz-next-question-button");

    animateElementExit(button)

    const choicePromises = choices.map((choice, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                animateElementExit(choice).then(resolve);
            }, index * stagger);
        });
    });

    await Promise.all(choicePromises);

    await animateElementExit(question)
}

export { animateQuestionEnter, animateQuestionExit, resetQuestionAnimationState };


function resetResponseAnimationState() {
    const responseCard = document.getElementById("quiz-response-wrapper");

    responseCard.classList.remove("enter-active", "exit-active");
}

async function animateResponseEnter() {
    const responseCard = document.getElementById("quiz-response-wrapper");

    await animateElementEnter(responseCard);
}

async function animateResponseExit() {
    const responseCard = document.getElementById("quiz-response-wrapper");

    await animateElementExit(responseCard);
}

export { animateResponseEnter, animateResponseExit, resetResponseAnimationState };


function resetNextPartAnimationState() {
    const nextPartCard = document.getElementById("next-part-card");

    nextPartCard.classList.remove("enter-active", "exit-active");
    nextPartCard.style.display = "none"
}

async function animateNextPartEnter() {
    const nextPartCard = document.getElementById("next-part-card");

    nextPartCard.style.display = "flex"
    await animateElementEnter(nextPartCard);
}

async function animateNextPartExit() {
    const nextPartCard = document.getElementById("next-part-card");

    await animateElementExit(nextPartCard);
    nextPartCard.style.display = "none"
}

export { animateNextPartEnter, animateNextPartExit, resetNextPartAnimationState };