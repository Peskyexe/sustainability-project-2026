async function fetchQuizQuestions() {
    try {
        const response = await fetch('./quiz-questions/questions.json');

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data

    } catch (error) {
        console.error('There was an error loading the JSON:', error);
    }
}

export { fetchQuizQuestions }