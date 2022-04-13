const question = document.getElementById("question");
const choices = Array.from( document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];



let questions = [
    {
    question: "Inside which HTML element do we put the Javascript ?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
},

{
    question: "What does HTML stand for?", 
    choice1: "Hyper Text Markup Language",
    choice2: "Home Tool Markup Language",
    choice3: "Hyperlinks and Text Markup Language",
    choice4: "<scripting>",
    answer: 1
},

{
    question: "Who is making the Web standards?",
    choice1:"The World Wide Web Consortium",
    choice2: "Microsoft",
    choice3: "Mozilla",
    choice4: "Google",
    answer: 1
},

{
    question: "Correct HTML tag for the largest heading is",
    choice1: "<head>",
    choice2: "<h6>",
    choice3: "<heading>",
    choice4: "<h1>",
    answer: 4
},

{
    question: "www is based on which model?",
    choice1:"Local-server",
    choice2: "Client-server",
    choice3: "3-tier",
    choice4: "None of these",
    answer: 2
},

{
    question: "Web pages starts with which of the following tag?",
    choice1:"< Body>",
    choice2: "<Title>",
    choice3: "<HTML>",
    choice4: "<Form>",
    answer: 3
},

{
    question: " How many tags are in a regular element?",
    choice1:"2",
    choice2: "1",
    choice3: "3",
    choice4: "4",
    answer: 1
},

{
    question: "what is the difference in an opening tag and a closing tag?",
    choice1:"Opening tag has a / in front",
    choice2: "Closing tag has a / in front",
    choice3: "Closing tag has a / on both sides",
    choice4: "There is no difference",
    answer: 2
},

{
    question: "< br  / > What type of tag is this?",
    choice1:"Break tag",
    choice2: "A broken one",
    choice3: "An opening tag",
    choice4: "Closing tag",
    answer: 1
},

{
    question: "HTML is what type of language ?",
    choice1:"Scripting Language",
    choice2: "Markup Language",
    choice3: "Programming Language",
    choice4: "Network Protocol",
    answer: 2
}];

//CONSTANTS
const CORRECT_BONUS = 10;
MAX_QUESTIONS = 10;



//fetch("https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple")

//.then(res => {
   // return res.json();
//})
//.then(loadedQuestions => {
   // console.log(loadedQuestions.results);
   // questions = loadedQuestions.results.map( loadedQuestion => {
        //const formattedQuestion = {
           // question: loadedQuestion.question
        //};


       // const answerChoices = [...loadedQuestion.incorrect_answers];
        //formattedQuestion.answer = Math.floor(Math.random() * 10) + 1;
       // answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

       // answerChoices.forEach((choice, index) => {
           // formattedQuestion["choice" + (index + 1)]= choice;
        //});

      // return formattedQuestion;
   // });

    

    
   // questions = loadedQuestions;
    //startGame();
//})

//.catch(err =>{
   // console.log(err);
//});

    





startGame=()=>{
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    
    getNewQuestion();

    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion =()=>{
    if(availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/html/end.html");
    }


 questionCounter++;

 questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
 const questionIndex = Math.floor(Math.random() * availableQuesions.length);
 currentQuestion = availableQuesions[questionIndex];
 question.innerText = currentQuestion.question;

 choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    
    acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;


        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct":"incorrect";
        if(classToApply === "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        
        setTimeout( ()=> {
         selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);
    });
});
 incrementScore = num => {
     score += num;
     scoreText.innerText = score;
 };

 startGame();

