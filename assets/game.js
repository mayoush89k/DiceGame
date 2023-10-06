//catch DOM Window instruction
const start_window = document.querySelector("#window");
const inputTarget = document.querySelector("#target");

//catch DOM Sections
const player1_currentScore = document.querySelector("#player1-score");
const player2_currentScore = document.querySelector("#player2-score");
const player1_finalScore = document.querySelector("#final-score1");
const player2_finalScore = document.querySelector("#final-score2");

//catch DOM Buttons
const newGame = document.querySelector("#new-game");
const roll = document.querySelector("#roll-dice");
const hold = document.querySelector("#hold");

//catch DOM Dice face images
const diceImage1 = document.querySelector("#dice1");
const diceImage2 = document.querySelector("#dice2");

// create target variable
let target = 0;

// create global score holder for players
let finalScore1 = 0;
let finalScore2 = 0;

// create current score holder for players
let currentScore1 = 0;
let currentScore2 = 0;

// create current player
let currentPlayer = 1;

// Dice faces
const Dice = ["1", "2", "3", "4", "5", "6"];

// save 2 random numbers for Dices face
let diceRoll1 = 0;
let diceRoll2 = 0;

//Winner as object of saving data of every game
// Add local storage so our data will be persistent.
const winner = [{}];

// add listener to window items
start_window.addEventListener("click", startGame);

function startGame(e) {
  // listener to specific item (start game button)
  if (e.target.id == "start") {
    target = Number(inputTarget.value);
    start_window.classList.add("hide");
  }
}

// generate 2 random numbers for Dices face
function setRandomDices() {
  diceRoll1 = Math.floor(Math.random() * (Dice.length - 1)) + 1;
  diceRoll2 = Math.floor(Math.random() * (Dice.length - 1)) + 1;
  diceImage1.setAttribute("src", `assets/Images/dice-${diceRoll1}.png`);
  diceImage2.setAttribute("src", `assets/Images/dice-${diceRoll2}.png`);
}
// holding player
const holdingPlayer1 = document.createElement("p");
const holdingPlayer2 = document.createElement("p");
holdingPlayer1.classList.add("holdingPlayer");
holdingPlayer2.classList.add("holdingPlayer");
player1_finalScore.appendChild(holdingPlayer1);
player2_finalScore.appendChild(holdingPlayer2);

// roll button add listener when clicked
roll.addEventListener("click", RollDices);

function RollDices() {
  setRandomDices(); // generate random dices face
  // check rolled same dice faces
  if (diceRoll1 == diceRoll2) {
    /* if you get 6 and 6 hold your event listeners for 1 second and display a message that you got 6 and 6*/
    roll.removeEventListener("click", RollDices);
    const msg =
      "HOLDING ROLL DICE \n You lost your current score, and your turn";
    currentPlayer == 1
      ? (holdingPlayer1.innerText = msg)
      : (holdingPlayer2.innerText = msg);
    setTimeout(() => {
      roll.addEventListener("click", RollDices);
      holdingPlayer1.innerText = "";
      holdingPlayer2.innerText = "";
    }, 3000);
    // player will loose his current score
    currentPlayer == 1 ? (currentScore1 = 0) : (currentScore2 = 0);
    currentPlayer = currentPlayer == 1 ? 2 : 1;
  } else {
    // player will add dice faces number to his current score
    currentPlayer == 1
      ? (currentScore1 += diceRoll1 + diceRoll2)
      : (currentScore2 += diceRoll1 + diceRoll2);
  }
  saveCurrent();
  checkWinner();
}
// save scores to DOM catcher variables
function saveCurrent() {
  player1_currentScore.children[1].innerText = currentScore1;
  player2_currentScore.children[1].innerText = currentScore2;
}

// Hold the current player his current Score
hold.addEventListener("click", holdScore);

function holdScore() {
  currentPlayer == 1
    ? (finalScore1 += currentScore1)
    : (finalScore2 += currentScore2);
  player1_finalScore.innerText = finalScore1;
  player2_finalScore.innerText = finalScore2;
  currentPlayer = currentPlayer == 1 ? 2 : 1;
  currentScore1 = 0;
  currentScore2 = 0;
  saveCurrent();
  checkWinner();
}

/* start new game button
    reset all variables 
    reset all inner texts 
    also re-open the instruction window
*/
newGame.addEventListener("click", newGameFunction);
function newGameFunction() {
  target = 0;
  finalScore1 = 0;
  finalScore2 = 0;
  currentScore1 = 0;
  currentScore2 = 0;
  currentPlayer = 1;
  diceRoll1 = 1;
  diceRoll2 = 1;

  player1_currentScore.children[1].innerText = "0";
  player2_currentScore.children[1].innerText = "0";
  player1_finalScore.innerText = 0;
  player2_finalScore.innerText = 0;

  start_window.classList.remove("hide");
  inputTarget.value = 100;
}

// check winner function
// Add how many times the player has won the game
function checkWinner() {
  if (finalScore1 >= target || finalScore1 + currentScore1 >= target) {
    setTimeout(alert("player 1 wins"), 600);
    winner.push({
      player1: {
        finalScore: finalScore1 + currentScore1,
        win: 1,
      },
      player2: {
        finalScore: finalScore2 + currentScore2,
        win: 0,
      },
    });
    console.log("winner ", winner);
    newGameFunction();
  } else if (finalScore2 >= target || finalScore2 + currentScore2 >= target) {
    setTimeout(alert("player 2 wins"), 600);
    winner.push({
      player1: {
        finalScore: finalScore1 + currentScore1,
        win: 0,
      },
      player2: {
        finalScore: finalScore2 + currentScore2,
        win: 1,
      },
    });
    console.log("winner ", winner);
    newGameFunction();
  }
}
