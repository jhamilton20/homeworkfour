//define the constant variables based on our HTML elements
const start = document.getElementById("start");
const title = document.getElementById("title");
const instructions = document.getElementById("instructions");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");

const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");

const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {question : "Commonly used data types DO NOT include:",
        choiceA : "strings",
        choiceB : "booleans",
        choiceC : "alerts",
        choiceD : "none",
        correct : "C"},

    {question : "Where do links to stylesheets belong?",
        choiceA : "< div/ >",
        choiceB : "< head/ >",
        choiceC : "< script/ >",
        choiceD : "< styles >",
        correct : "B"},

    {question : "The condition in an if / else statement is enclosed within ____.",
        choiceA : "Parentheses",
        choiceB : "Quotes",
        choiceC : "Square brackets",
        choiceD : "All of the above",
        correct : "C"},

    {question : "Where is the best place to find bootstrap?",
      choiceA : "GetBootstrap.com",
      choiceB : "Classroom",
      choiceC : "W3 Schools",
      choiceD : "StackOverflow",
      correct : "A"},

    {question : "The fourth of july is on the ____.",
        choiceA : "3rd",
        choiceB : "2nd",
        choiceC : "30th",
        choiceD : "4th",
        correct : "D"},
  ];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    //imports the question and options from the array, into the HTML slots
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
//start the quiz
start.addEventListener("click",startQuiz);

// hide the start container elements, display the quiz, and begin the first timer.
function startQuiz(){
    start.style.display = "none";
    instructions.style.display ="none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

// render correct and incorrect answers in the progress icons 
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change the progress icon to red 
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// check answers 

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0ac7ae";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#fa7e70";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // display the score at the end
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}