const questions = [
    {
        question: "Which is the largest animal in the world? ",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world? ",
        answers: [
            {text: "Vetican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world? ",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: true},
            {text: "Antarctia", correct: false}
        ]
    },
    {
        question: "Which is the largest continent in the world? ",
        answers: [
            {text: "Asia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Australia", correct: false},
            {text: "Africa", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question");
const answersButton = document.getElementById("answar-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () =>{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () =>{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answersButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", SelectAnswer);
    });
}
const resetState= () =>{
    nextButton.style.display = "none";
    while(answersButton.firstChild){
        answersButton.removeChild(answersButton.firstChild);
    }
}

const SelectAnswer = (e) =>{
    const SelectBtn = e.target;
    const isCorrect = SelectBtn.dataset.correct === "true";
    if(isCorrect){
        SelectBtn.classList.add("correct");
        score++;
    }else{
        SelectBtn.classList.add("incorrect");
    }
    Array.from(answersButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

const showScore = () =>{
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

const handleNextButton = () =>{
     currentQuestionIndex++;
     if(currentQuestionIndex<questions.length){
        showQuestion();
     }else{
        showScore();
     }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();

