// Define your questions and answers here
const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1, // Index of the correct option
    },
    {
      question: "What is the capital of Italy?",
      options: ["Madrid", "Paris", "Rome", "Berlin"],
      correctAnswer: 2,
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 2,
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
      correctAnswer: 2,
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Hg", "Pb"],
      correctAnswer: 0,
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: 1,
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yen", "Dollar", "Euro", "Pound"],
      correctAnswer: 0,
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "Korea", "Japan", "Vietnam"],
      correctAnswer: 2,
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: 1,
    },
    {
      question: "What is the freezing point of water in Fahrenheit?",
      options: ["0°F", "32°F", "100°F", "212°F"],
      correctAnswer: 1,
    },
    // Add more questions here
];

let currentQuestion = 0;
let score = 0;

// Get the "Start Quiz" button and quiz container elements
const startQuizButton = document.querySelector("#start-quiz-button");
const quizContainer = document.querySelector(".quiz-container");

const questionCounter = document.querySelector("#question-counter");
const scoreCounter = document.querySelector("#score");
const questionText = document.querySelector("#question-text");
const options = document.querySelectorAll(".option");
const nextButton = document.querySelector("#next-button");
const scoreboardContainer = document.querySelector(".scoreboard-container");
const finalScore = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-button");

// Add an event listener to startQuizButton to start the quiz when the button is clicked
startQuizButton.addEventListener("click", (event) => {
    // Hide the start-quiz-button-container
    event.target.parentElement.style.display = "none";
    // (or)
    // startQuizButton.parentElement.style.display = "none";

    // Show the quiz container
    quizContainer.style.display = "block";

    // load Questions to start the quiz
    loadQuestions();
});

// Initially disable the "Next" button
nextButton.disabled = true;

// Variable to track whether an option has been clicked
let optionClicked = false;

// declaring the handleOptionClickEventListener in global scope
let handleOptionClickEventListener

function loadQuestions() {
    if(currentQuestion < questions.length) {
        questionCounter.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
        questionText.textContent = questions[currentQuestion].question;
        options.forEach((option, index) => {
            option.textContent = questions[currentQuestion].options[index];
            option.style.backgroundColor = "white"; // Reset option background color
            option.style.pointerEvents = "auto"; // Re-enable click events
            handleOptionClickEventListener = option.addEventListener("click", function() {
                handleOptionClick(index);
            });
        });
        // Re-enable the "Next" button only if an option has been clicked
        nextButton.disabled = !optionClicked;
    } else {
        showScoreboard();
    }
}

function handleOptionClick(selectedOptionIndex) {
    const correctAnswerIndex = questions[currentQuestion].correctAnswer;

    // Remove click event listeners from all options to prevent multiple clicks
    options.forEach((option) => {
        option.style.pointerEvents = "none";
        option.removeEventListener("click", handleOptionClickEventListener);
        // (or)
        // option.handleOptionClickEventListener = null;
    });

    if(selectedOptionIndex === correctAnswerIndex) {
        options[selectedOptionIndex].style.backgroundColor = "green";
        score++;
        scoreCounter.textContent = `Score: ${score}`;
    } else {
        options[selectedOptionIndex].style.backgroundColor = "red";
        options[correctAnswerIndex].style.backgroundColor = "green";
    }

    optionClicked = true; // Mark an option as clicked
    nextButton.disabled = false;
}

function showScoreboard() {
    scoreboardContainer.style.display = "block";
    finalScore.textContent = score;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    optionClicked = false; // Reset optionClicked flag
    nextButton.disabled = true;
    loadQuestions();
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreboardContainer.style.display = "none";
    loadQuestions();
    scoreCounter.textContent = `Score: 0`;
    optionClicked = false; // Reset optionClicked flag
});

// Initialize the quiz
loadQuestions();
