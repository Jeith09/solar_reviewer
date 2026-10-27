// js/quiz.js - quiz logic only (questions come from data.js)

let current = 0; // which question we are on
let score = 0;   // how many are correct

// Get page elements
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const scoreBox = document.getElementById("score-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// Show the current question and its choices
function showQuestion() {
  const q = QUESTIONS[current];
  progressEl.textContent = "Question " + (current + 1) + " of " + QUESTIONS.length;
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  nextBtn.classList.add("hidden");

  // Make one button per choice
  q.choices.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "btn-choice";
    btn.addEventListener("click", function () { checkAnswer(btn); });
    choicesEl.appendChild(btn);
  });
}

// Check the clicked answer
function checkAnswer(clickedBtn) {
  const answer = QUESTIONS[current].answer;
  const buttons = choicesEl.querySelectorAll(".btn-choice");

  buttons.forEach(function (b) {
    b.disabled = true;                                   // no more clicking
    if (b.textContent === answer) b.classList.add("correct");
  });

  if (clickedBtn.textContent === answer) {
    score++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.className = "correct";
  } else {
    clickedBtn.classList.add("wrong");
    feedbackEl.textContent = "The answer is " + answer + ".";
    feedbackEl.className = "wrong";
  }
  nextBtn.classList.remove("hidden");
}

// Show the final score
function showScore() {
  quizBox.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  scoreText.textContent = "You scored " + score + " out of " + QUESTIONS.length + "!";
}

// Start again from the first question
function restartQuiz() {
  current = 0;
  score = 0;
  scoreBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

// Next button: go to next question or show score
nextBtn.addEventListener("click", function () {
  current++;
  if (current < QUESTIONS.length) showQuestion();
  else showScore();
});
restartBtn.addEventListener("click", restartQuiz);

showQuestion(); // start the quiz
