/*jshint esversion: 6 */

/* Declarations of global variables */
const quiz = document.getElementById('quiz'); // Variable for the question
const answerEls = document.querySelectorAll('.answer'); // Variable to list all answers
const questionEl = document.getElementById('question'); // Variable for the question
const a_text = document.getElementById('a_text'); // Variable for the option a
const b_text = document.getElementById('b_text'); // Variable for the option b
const c_text = document.getElementById('c_text'); // Variable for the option c
const d_text = document.getElementById('d_text'); // Variable for the option d
const startQuiz = document.getElementById('startquiz'); // Variable for the start quiz button
let currentQuestionIndex = 0; // Variable to store the question index
let score = 0; // Variable to store the score
let correctAnswer = 0; // Variable to store the correct answer count
let choice = null; // Variable to store the choice opted by user
let username = null; // Variable to store the username

/* Array consisting a set of 5 easy level difficulty question 
    and their corresponding possible options */
let easyQuest = [
    {
        question: "Who got the first Oscar award in India?",
        opt_a: 'Anil Kapoor',
        opt_b: 'AR Rahman',
        opt_c: 'Bhanu Athaiya',
        opt_d: 'None of these',
        rightAnswer: "opt_c"
    },
    {
        question: "Who is known as the Father of Indian cinema?",
        opt_a: 'Dhundiraj Govind Phalke',
        opt_b: 'Charan Singh',
        opt_c: 'Raja Lalith Rai',
        opt_d: 'Balram Naidu',
        rightAnswer: "opt_a"
    },
    {
        question: "Which is the highest-grossing Indian film ever?",
        opt_a: 'Bajrangi Bhaijaan',
        opt_b: 'PK',
        opt_c: 'Dangal',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
    {
        question: "Which actor has won the most national awards in India?",
        opt_a: 'Shah Rukh Khan',
        opt_b: 'Amitabh Bachchan',
        opt_c: 'Aamir Khan',
        opt_d: 'None of these',
        rightAnswer: 'opt_a'
    },
    {
        question: "Which director has directed the most movies in India?",
        opt_a: 'Aditya Chopra',
        opt_b: 'Rohit Shetty',
        opt_c: 'Rajkumar Hirani',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
    {
        question: "Which was the first Color movie in India?",
        opt_a: ' Kisan Kanya',
        opt_b: 'Alam Ara',
        opt_c: 'Raja Harishchandra',
        opt_d: 'None of these',
        rightAnswer: 'opt_a'
    },
    {
        question: " Which Hindi movie got the first National Award?",
        opt_a: 'Shree 420',
        opt_b: 'Jagriti',
        opt_c: 'Mirza Ghalib',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
    {
        question: "Which was the first film to win the Filmfare Best Film Award?",
        opt_a: 'Boot Polish',
        opt_b: 'Jagriti',
        opt_c: 'Do Bigha Zamin',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
    {
        question: "Which was the first Indian movie nominated for Oscar?",
        opt_a: 'Salaam Bombay',
        opt_b: 'Lagaan',
        opt_c: 'Mother India',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
    {
        question: "Which was the first Indian movie to win an Oscar?",
        opt_a: 'Slumdog Millionaire',
        opt_b: 'Mother India',
        opt_c: 'Gandhi',
        opt_d: 'None of these',
        rightAnswer: 'opt_c'
    },
];

// Event listener: wait for the DOM to finish loading before running the quiz
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("hello-area").innerHTML = params.get('yname');
    document.getElementById("level-area").innerHTML = params.get('level');
    document.getElementById("score-area").innerHTML = score;
    username = params.get('yname');
    choice = params.get('level');
    runQuiz(choice);
});

/** 
 * Function to start the quiz with question index and initial score set to 0 
 *  then call the function to show the question based upon the level of 
 *  difficulty selected by the user. 
 */


/** 
 * Function to display the question and available options 
 *  for the user to select.
 */
function displayQuestion(currentQuestion) {
    unselectAnswers();
    questionEl.innerText = currentQuestion.question;
    a_text.innerText = currentQuestion.opt_a;
    b_text.innerText = currentQuestion.opt_b;
    c_text.innerText = currentQuestion.opt_c;
    d_text.innerText = currentQuestion.opt_d;
    document.getElementById("score-area").innerHTML = score;
}

/**
 * Function to unselect answers on page reload.
 */
function unselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

/**
 * Function to check the correct answer based upon the answer submitted by 
 * the user and correct answer stored in our system and returns bool value.
 */
function checkCorrectAnswer() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

/**
 * Event listener with click event for the selection of the answer and
 * perform calculation for score and correct answer count. Increase score by 10 
 * points for each correct answer and decrease score by 5 points for each 
 * incorrect answer.
 * It also keep the game running by calling runQuiz() function and increasing
 * question index number. 
 * Once all questions are displayed. This function show the final results message
 * to the user and give options to restart the gave or try again the same level.
 */
startQuiz.addEventListener('click', function () {
    const answer = checkCorrectAnswer();
    if (answer) {
        let questionLevel;
        if (choice === 'easy') {
            questionLevel = easyQuest;
        } else if (choice === 'medium') {
            questionLevel = mediumQuest;
        } else if (choice === 'hard') {
            questionLevel = hardQuest;
        }
        if (answer === questionLevel[currentQuestionIndex].rightAnswer) {
            score = score + 10;
            correctAnswer++;
        } else {
            score = score - 5;
            alert("Opps! Incorrect answer. The correct answer is : " + questionLevel[currentQuestionIndex][questionLevel[currentQuestionIndex].rightAnswer] + ".");
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questionLevel.length) {
            runQuiz(choice);
        } else {
            quiz.innerHTML = `
                <div id="result">
                    Hi <span> ${username}</span>,<br><br>
                    You have answered <span> ${correctAnswer} </span> 
                    question(s) correctly out of total <span> ${questionLevel.length} 
                    </span> questions.<br>
                    Your total score is <span> ${score}</span>.<br><br>
                    Thanks! <br>
                    Quiz India Team :)
                </div>
                <div>
                    <button onclick="location.reload()" class="btn1">Try again!</button>
                </div>
                <div>
                    <a href="index.html" class="btn2">Select different level</a>
                </div>
            `;
        }
    }
    else {
        alert("Please choose a valid option!");
    }
});