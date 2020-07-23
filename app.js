// Arry of Object

var quiz = [
    {
        q: ' Which month comes right before June ? ',
        options: ['July', 'May', 'September', 'August'],
        answer: 1
    },
    {
        q: ' What is the colour of banana ?',
        options: ['Red', 'Orange', 'yellow', 'blue'],
        answer: 2
    },
    {
        q: ' 3 + 6 = 9',
        options: ['True', 'False'],
        answer: 0
    },
    {
        q: ' At what time of the day do we have breakfast ? ',
        options: ['In the evening', 'In the afternoon', 'In the morning'],
        answer: 2
    },
    {
        q: ' Answer of 2 + 6 = ? ',
        options: ['10', '5', '9', 'none of these'],
        answer: 3
    },
]
var questionNumber = document.querySelector(".question-number");
var questionText = document.querySelector(".question-text");
var optionContainer = document.querySelector(".option-container");
var answerIndicatorContainer = document.querySelector(".answers-indicator");
var homeBox = document.querySelector(".home-box");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");

var questionCounter = 0;
var currentQuestion;
var availabeQuestion = [];
var availabeOptions = [];
var correctAnswer = 0;
var attempt = 0;


//push the questions into availabeQuestion Array

function setAvailabeQuestion() {
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        availabeQuestion.push(quiz[i])
    }
}

// set Question numbers and questions and options
function getNewQuestion() {

    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

    // set question text
    // get rendom question
    var questionIndex = availabeQuestion[Math.floor(Math.random() * availabeQuestion.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //  get the position of 'questionIndex' from availableQuestion
    var index1 = availabeQuestion.indexOf(questionIndex);

    //  remove the 'questionIndex' from availableQuestion so that the questions is not repeat
    availabeQuestion.splice(index1, 1);

    //  set options
    // get the length of options

    var optionsLen = currentQuestion.options.length;

    // push optins into available option Array
    for (var i = 0; i < optionsLen; i++) {
        availabeOptions.push(i)
    }

    optionContainer.innerHTML = '';

    var animationDelay = 0.15;
    // creat options in HTML

    for (var i = 0; i < optionsLen; i++) {
        // random option
        var optonIndex = availabeOptions[Math.floor(Math.random() * availabeOptions.length)];

        // get the position of 'optonIndex' from the availabeOptions
        var index2 = availabeOptions.indexOf(optonIndex);

        //  remove the 'optonIndex' from availableOptions so that the questions is not repeat
        availabeOptions.splice(index2, 1);
        var option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)")

    }

    // console.log(currentQuestion.options)



    questionCounter++

}

// get the result of current attempt

function getResult(element) {
    var id = parseInt(element.id);

    // get the answer by comparingthe id of clicked option

    if (id === currentQuestion.answer) {

        // set the green color to the correct option

        element.classList.add("correct");

        // add the indicator to correct mark

        updateAnswerIndicator("correct");
        correctAnswer++
        }
    else {

        // set the red color to the incorrect option

        element.classList.add("wrong");

        // add the indicator to wrong mark

        updateAnswerIndicator("wrong")

        // if the answer is incorrect then show the correct answer by adding green colour to the option

        var optionLen = optionContainer.children.length;
        for (var i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    attempt++
    unclickableOptions();
}

//  make all the aptions unclickable when a user select a option (RISTRICT THE USER TO CHANGE A OPTOIN AGAIN)

function unclickableOptions() {

    var optionLen = optionContainer.children.length;
    for (var i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
    }
}

// add the indicator to correct mark


function answersIndicator() {
    answerIndicatorContainer.innerHTML = '';
    var totalQuestion = quiz.length;
    for (var i = 0; i < totalQuestion; i++) {
        var indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator)
    }
}

function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}


function next() {
    if (questionCounter === quiz.length) {

        quizOver()

    }
    else {
        getNewQuestion();
    }
}

function quizOver() {
    // hide quizBox

    quizBox.classList.add("hide");

    // show result box

    resultBox.classList.remove("hide");

    quizResult()
}

// get the quiz result 

function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".attempt-question").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswer
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswer;

    var percentage = (correctAnswer / quiz.length) * 100;

    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswer + " / " + quiz.length;
}

function resetQuiz() {
     questionCounter = 0; 
     correctAnswer = 0;
     attempt = 0;

}

function tryAgainQuiz() {
    // hidethe result button 

    resultBox.classList.add("hide");

    // show the quiz box
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz()

}

function goToHome(){
// hide result Box

    resultBox.classList.add("hide");

// show homeBox

    homeBox.classList.remove("hide");

    resetQuiz();
}

// STARTING POINT

 function startQuiz() {

    // hide home box

    homeBox.classList.add("hide");

        // show quiz box

        quizBox.classList.remove("hide");

    // first we will set all question in availableQuestion Array
    setAvailabeQuestion();

    // seconfd we will call getNewQuestion function 
    getNewQuestion();

    // to craete indicator of answer    
    answersIndicator()
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
