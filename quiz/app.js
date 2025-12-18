//The global state or variables are declared for easy debugging
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-questions");
const resultSection = document.getElementById("result-section");
const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("RESTART-BTN");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quizForm = document.getElementById("quiz-form");
const optionContainer = document.getElementById("quiz-options");
const questionText = document.getElementById("quiz-text");
const currentQuestionEl = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const categorySelect = document.getElementById("category");
const ul = document.getElementById("result-list");
const loadingEl = document.getElementById("loding");

// The app states are declared here.
let questions = [];
let currenteQuestionIndex = 0;
let userAnswer = [];
let score = 0;
let selectedCategory = "";

// This function initialises all the state when the page is loaded
function initApp(){
    questions = [];
    currentQuestionIndex = 0;
    userAnswer = [];
    score = 0;
    selectedCategory = "";
    
    questionText.textContent = "";
    answerOptions.innerHTML = "";
    currentQuestion.textContent = "";
    totalQuestions.textContent = "";
    
    //shows just the start section and then hides the rest of the sections
    startSection.classList.remove("hidden");
    quizSection.classList.add("hidden");
    resultSection.classList.add("hidden");

    // Event listeners to buttons
    startBtn.addEventListener("click", startQuiz);
    quizForm.addEventListener("click", handleSubmitAnswer);
    restartBtn.addEventListener("click", restartQuiz)

    if(prevBtn) prevBtn.addEventListener("click", goToPreviousQuestion);
    if(nextBtn) nextBtn.addEventListener("click", goToNextQuestion);

}

//Run initApp when the page loads
document.addEventListener("DOMContentLoaded", initApp);

//This function acts a s a bridge between the start button and the quiz section
//This hides the start and result sections and prompts the user to select category while questions are fetched
function startQuiz(){
    if(!categorySelect || !categorySelect.value){
        alert("Please select a category and continue");
        return;
    }
    selectedCategory = categorySelect.value;
    questions = [];
    currentQuestionIndex = 0;
    score = 0;
    userAnswer = [];


    //hide start section and result section but show the quiz section
    startSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    // fetch questions
    fetchQuestions(selectedCategory)
        .then(() => {
            totalQuestions.textContent = questions.length;
             renderQuestion();
        })
        .catch((error) => {
            alert("Falled to load questions, please try again!");
            console.error(error);
        });
}


// Fetch questions from the Trivia API for quizzes
async function fetchQuestions(category){
    const categoryMap - {
        javascript: 18,
        html: 18,
        react: 18,
        css: 18
    };
    const categoryId = [categoryMap] || 18;
    const API_URL = "https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple";
    const response = await fetch(API_URL);
    if(!response.ok){
        throw new Error("Failed to fetch quiz questions");
    }
    const data = await response.json();
    // here we need to normalise the API data to dynamically fit the options and with correct and incorrecy answers
    questions = data.results.map((items) => {
        const options = [...items.incorrect_answer];
        const correctIndex = Math.floor(Math.random() * (options.length + 1));
        options.splice(correctIndex, 0, items.correct_answer);
        return {
            questions: items.question,
            options,
            correctIndex
        };
    });
}
