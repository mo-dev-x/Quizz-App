const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {text : "Berlin", correct : false},
            {text : "Madrid", correct : false},
            {text : "Paris", correct : true},
            {text : "Lisbon", correct : false}
        ]
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: [
            {text : "Jeff Bezos", correct : false},
            {text : "Elon Musk", correct : true},
            {text : "Bill Gates", correct : false},
            {text : "Tony Stark", correct : false}
        ]
    },
    {
        question: "The iPhone was created by which company?",
        answers: [
            {text : "Apple", correct : true},
            {text : "Intel", correct : false},
            {text : "Amazon", correct : false},
            {text : "Microsoft", correct : false}
        ]
    },
    {
        question: "How many Harry Potter books are there?",
        answers: [
            {text : "4", correct : false},
            {text : "6", correct : false},
            {text : "7", correct : true},
            {text : "8", correct : false}
        ]
    }
];

const questionEl = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNumber + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('btn');
        answerBtn.appendChild(button);
        if(answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetstate() {
    nextBtn.style.display = "none";
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetstate();
    questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();
