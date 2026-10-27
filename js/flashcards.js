// js/flashcards.js - flashcard logic only (cards come from data.js)

let index = 0; // which card is showing

const cardEl = document.getElementById("card");
const frontEl = document.getElementById("card-front");
const backEl = document.getElementById("card-back");
const countEl = document.getElementById("card-count");

// Show the current card, front side first
function showCard() {
  const c = FLASHCARDS[index];
  frontEl.textContent = c.term;
  backEl.textContent = c.definition;
  cardEl.classList.remove("flipped");
  countEl.textContent = "Card " + (index + 1) + " of " + FLASHCARDS.length;
}

// Turn the card over
function flipCard() {
  cardEl.classList.toggle("flipped");
}

// Go forward (wraps to the first card)
function nextCard() {
  index = (index + 1) % FLASHCARDS.length;
  showCard();
}

// Go back (wraps to the last card)
function prevCard() {
  index = (index - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  showCard();
}

cardEl.addEventListener("click", flipCard);
document.getElementById("flip-btn").addEventListener("click", flipCard);
document.getElementById("next-btn").addEventListener("click", nextCard);
document.getElementById("prev-btn").addEventListener("click", prevCard);

showCard(); // show the first card
