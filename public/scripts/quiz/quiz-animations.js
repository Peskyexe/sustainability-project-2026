function waitForTransition(element) {
    return new Promise((resolve) => {
        const handler = (event) => {
            if (event.target !== element) return;

            element.removeEventListener("transitionend", handler);
            resolve();
        };

        element.addEventListener("transitionend", handler, { once: true });
    });
}

function resetAnimationState() {
    const question = document.getElementById("quiz-question-group");
    const choices = document.querySelectorAll(".quiz-choice"); 

    question.classList.remove("enter-active", "exit-active");

    choices.forEach(choice => {
        choice.classList.remove("enter-active", "exit-active");
    });
}


async function animateQuestionEnter(stagger = 100) {
    const question = document.getElementById("quiz-question-group");
    const choices = Array.from(document.querySelectorAll(".quiz-choice"));

    question.offsetHeight; // Force reflow to ensure transition starts
    question.classList.add("enter-active");
    await waitForTransition(question);

    const choicePromises = choices.map((choice, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                choice.offsetHeight; // Force reflow
                choice.classList.add("enter-active");
                waitForTransition(choice).then(resolve);
            }, index * stagger);
        });
    });

    await Promise.all(choicePromises);
}

async function animateQuestionExit(stagger = 80) {
    const question = document.getElementById("quiz-question-group");
    const choices = Array.from(document.querySelectorAll(".quiz-choice")).reverse();

    const choicePromises = choices.map((choice, index) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                choice.offsetHeight; // Force reflow
                choice.classList.add("exit-active");
                waitForTransition(choice).then(resolve);
            }, index * stagger);
        });
    });

    await Promise.all(choicePromises);

    question.offsetHeight; // Force reflow
    question.classList.add("exit-active");
    await waitForTransition(question);
}


function animateErrorShakeOnElement(element) {
    element.classList.add("error-shake");

    element.addEventListener("animationend", () => {
        element.classList.remove("error-shake");
    }, { once: true });
}


export { animateQuestionEnter, animateQuestionExit, resetAnimationState, animateErrorShakeOnElement };