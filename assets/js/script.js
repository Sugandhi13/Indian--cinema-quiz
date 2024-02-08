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
        question: "Which wonder of the world is in India?",
        opt_a: 'Machu Picchu',
        opt_b: 'The Colosseum',
        opt_c: 'Taj Mahal',
        opt_d: 'The Great Wall',
        rightAnswer: "opt_c"
    },
    {
        question: "What is the Capital of India?",
        opt_a: 'New Delhi',
        opt_b: 'Mumbai',
        opt_c: 'Chandigarh',
        opt_d: 'Bengaluru',
        rightAnswer: "opt_a"
    },
    {
        question: "Which is the national animal of India?",
        opt_a: 'Loin',
        opt_b: 'Elephant',
        opt_c: 'Deer',
        opt_d: 'Tiger',
        rightAnswer: 'opt_d'
    },
    {
        question: "Name the national bird of India?",
        opt_a: 'Eagle',
        opt_b: 'Peacock',
        opt_c: 'Sparrow',
        opt_d: 'Pigeon',
        rightAnswer: 'opt_b'
    },
    {
        question: "Which festival in India is called the festival of colours?",
        opt_a: 'Diwali',
        opt_b: 'Dussehra',
        opt_c: 'Holi',
        opt_d: 'Onam',
        rightAnswer: 'opt_c'
    },

];

/* Array consisting a set of 5 medium level difficulty question 
    and their corresponding possible options */
let mediumQuest = [
    {
        question: "Which is the national sport of India?",
        opt_a: 'Cricket',
        opt_b: 'Hockey',
        opt_c: 'Badminton',
        opt_d: 'Kabaddi',
        rightAnswer: 'opt_b'
    },
    {
        question: "What is India’s national flower?",
        opt_a: 'Lotus',
        opt_b: 'Rose',
        opt_c: 'Marigold',
        opt_d: 'Lily',
        rightAnswer: 'opt_a'
    },
    {
        question: "Who was the first person in India to receive the Nobel Prize?",
        opt_a: 'Har Gobind Khorana',
        opt_b: 'C V Raman',
        opt_c: 'Rabindranath Tagore',
        opt_d: 'Amartya Kumar Sen',
        rightAnswer: 'opt_c'
    },
    {
        question: "Who was India’s first Prime Minister?",
        opt_a: 'Gulzarilal Nanda',
        opt_b: 'Lal Bahadur Shastri',
        opt_c: 'Morarji Desai',
        opt_d: 'Jawaharlal Nehru',
        rightAnswer: 'opt_d'
    },
    {
        question: "Which temple shaped like a chariot is dedicated to the Sun God?",
        opt_a: 'Badrinath Temple',
        opt_b: 'Golden Temple',
        opt_c: 'Sun Temple in Puri',
        opt_d: 'Akshardham',
        rightAnswer: 'opt_c'
    },
];

/* Array consisting a set of 5 hard level difficulty question 
    and their corresponding possible options */
let hardQuest = [
    {
        question: "Who was the first to discover India?",
        opt_a: 'Magellan',
        opt_b: 'Columbus ',
        opt_c: 'Vasco da Gama',
        opt_d: 'John Cabot',
        rightAnswer: 'opt_c'
    },
    {
        question: "How many languages does the Indian constitution recognise?",
        opt_a: '26',
        opt_b: '24',
        opt_c: '28',
        opt_d: '22',
        rightAnswer: 'opt_d'
    },
    {
        question: "Which Indian cricketer won the ‘Padma Bhushan’ in 2018?",
        opt_a: 'Sunil Gavaskar',
        opt_b: 'Rahul Dravid',
        opt_c: 'Sachin Tendulkar',
        opt_d: 'MS Dhoni',
        rightAnswer: 'opt_d'
    },
    {
        question: "Who was the first Indian woman to be awarded the Bharat Ratna?",
        opt_a: 'Indira Gandhi',
        opt_b: 'Mother Teresa',
        opt_c: 'Aruna Asaf Ali',
        opt_d: 'M. S. Subbulakshmi',
        rightAnswer: 'opt_a'
    },
    {
        question: "Which state is also known as the “fruit bowl” of India?",
        opt_a: 'Uttrakhand',
        opt_b: 'Maharashtra',
        opt_c: 'Himachal Pradesh',
        opt_d: 'Andhra Pradesh',
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
function runQuiz(level) {
    if (level === 'easy') {
        let easyQuestion = easyQuest[currentQuestionIndex];
        displayQuestion(easyQuestion);
    } else if (level === 'medium') {
        let mediumQuestion = mediumQuest[currentQuestionIndex];
        displayQuestion(mediumQuestion);
    } else if (level === 'hard') {
        let hardQuestion = hardQuest[currentQuestionIndex];
        displayQuestion(hardQuestion);
    } else {
        alert("You have not selected any difficulty level.");
    }
}

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