"use strict";

//Selecting elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const image = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, isGameOver; //We  declared them outside the function to be globally accessible

//Starting conditions
const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isGameOver = false;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  image.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
};

initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

//ROLL DICE button
btnRoll.addEventListener("click", function () {
  if (!isGameOver) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    image.setAttribute("src", `/images/dice-${String(dice)}.png`);
    image.classList.remove("hidden");

    //3. Check for rolled 1
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player and reset current score
      switchPlayer();
    }
  }
});

//HOLD button
btnHold.addEventListener("click", function () {
  if (!isGameOver) {
    //1. score = current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score >= 100 & finish game
    if (scores[activePlayer] >= 100) {
      isGameOver = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      image.classList.toggle("hidden");
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//NEW GAME button
btnNewGame.addEventListener("click", initialization);
