import { quizData, stateIndexes } from "../quiz-controller.js";
import { hideResponse } from "./response.stage.js";
import { animateQuestionExit, animateNextPartEnter, animateNextPartExit, resetNextPartAnimationState } from "../quiz-animations.js";
import { enterQuestionStage } from "./question.stage.js";
import { updateProgressDisplay } from "../quiz-progress-display.js";

// Part 2 text changes
const part2Description = "How can you reduce how much you waste?";
const part2CardText = "In this section, we'll look at how your everyday- habits and energy consumption could be improved to reduce wastage, and how you can achive a more sustainable life.";

const quizTitle = document.getElementById("quiz-title");
const quizDescription = document.getElementById("quiz-description");

const cardButton = document.getElementById("next-part-card-button");

async function enterNextPartStage() {
    stateIndexes.partIndex += 1;

    quizTitle.innerHTML = `Quiz — Part ${stateIndexes.partIndex + 1} of ${quizData.parts.length}`;

    // If part 2, change quiz description
    if (stateIndexes.partIndex === 1) quizDescription.innerHTML = part2Description;

    updateProgressDisplay();

    // Animate out previous elements
    hideResponse();
    await animateQuestionExit();

    // Update card DOM
    updateCardText();

    // Animate in card
    resetNextPartAnimationState();
    await animateNextPartEnter();

    // Wait for button input
    cardButton.addEventListener("click", async () => {
        // Animate out card
        await animateNextPartExit();

        // Start question stage
        enterQuestionStage(false);
    }, { once: true });    
}

const cardTitle = document.getElementById("next-part-card-title");
const cardDescription = document.getElementById("next-part-card-breadtext");

function updateCardText() {
    cardTitle.innerHTML = `Ready for part ${stateIndexes.partIndex + 1}?`;
    cardDescription.innerHTML = part2CardText;
    cardButton.innerHTML = `Start part ${stateIndexes.partIndex + 1}`;

    if (stateIndexes.partIndex === 2) {
        cardTitle.innerHTML = "Quiz finished!";
        cardDescription.innerHTML = "Congratulations on finishing the quiz, you're well on your way to improvment already! Click the button below to see your results, and to get some tips on how you can improve.";
        cardButton.innerHTML = "Go to results";
    }
}

export { enterNextPartStage };