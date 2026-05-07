import { stateIndexes } from "./quiz-controller.js";
import { animateErrorShakeOnElement } from "./quiz-animations.js";


let selectionMade = false;
const quizChoicesWrapper = document.getElementById("quiz-choices-wrapper");

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


function checkForSelection(event) {
    if (selectionMade === false) {
        animateErrorShakeOnElement(event.submitter);
        return false;
    } 

    selectionMade = false;
    return true;
}


export { checkForSelection };
