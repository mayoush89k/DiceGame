//catch DOM Window instruction
const start_window = document.querySelector("#window");
const inputTarget = document.querySelector("#target");
const list = document.querySelector("#list");

//catch DOM Sections
const player1_currentScore = document.querySelector("#player1-score");
const player2_currentScore = document.querySelector("#player2-score");
const player1_finalScore = document.querySelector("#final-score1");
const player2_finalScore = document.querySelector("#final-score2");
const player1_container = document.querySelector("#player1-container");
const player2_container = document.querySelector("#player2-container");
const player_winner = document.querySelectorAll(".winner");

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

// catch DOM sections
const PreviousWin_player1 = document.getElementById("db-player1");
const PreviousWin_player2 = document.getElementById("db-player2");
// save it as variable
let player1_win = 0;
let player2_win = 0;

//Sound Effect DOM catcher
const RollSound = document.getElementById("rollDice");
const HoldSound = document.getElementById("HoldingTurn");
const finished = document.getElementById("gameFinished");
const Winning = document.getElementById("Winning");

// Key Press event listener - easier for user
document.addEventListener("keydown", keyDownFunction);
function keyDownFunction(e) {
  switch (e.key) {
    case "N":
    case "n":
      newGameFunction();
      break;
    case "R":
    case "r":
      RollDices();
      break;
    case "H":
    case "h":
      holdScore();
      break;
    default:
      break;
  }
}

// add listener to window items
start_window.addEventListener("click", startGame);
document.addEventListener("keypress", startGame);

function startGame(e) {
  // listener to specific item (start game button)
  if (e.target.id == "start" || e.key == "Enter") {
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
const msg = document.getElementsByClassName("msg");

// roll button add listener when clicked
roll.addEventListener("click", RollDices);

function RollDices() {
  RollSound.play();
  removeListener();
  setTimeout(() => {
    reAddListener();
  }, 2500);
  setRandomDices(); // generate random dices face
  // check rolled same dice faces
  if (diceRoll1 == 6 && diceRoll2 == 6) {
    HoldSound.play();
    /* if you get 6 and 6 hold your event listeners for 1 second and display a message that you got 6 and 6*/
    removeListener();
    msg[currentPlayer - 1].classList.remove("hide");
    setTimeout(() => {
      reAddListener();
      msg[0].classList.add("hide");
      msg[1].classList.add("hide");
    }, 3000);
    changingPlayers();
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

// changing between players turn
function changingPlayers() {
  if (currentPlayer == 1) {
    player1_container.setAttribute("id", "player2-container");
    player2_container.setAttribute("id", "player1-container");
  } else {
    player1_container.setAttribute("id", "player1-container");
    player2_container.setAttribute("id", "player2-container");
  }
  // player will loose his current score
  currentPlayer == 1 ? (currentScore1 = 0) : (currentScore2 = 0);
  currentPlayer = currentPlayer == 1 ? 2 : 1;
}

// Hold the current player his current Score
hold.addEventListener("click", holdScore);

function holdScore() {
  currentPlayer == 1
    ? (finalScore1 += currentScore1)
    : (finalScore2 += currentScore2);
  player1_finalScore.innerText = finalScore1;
  player2_finalScore.innerText = finalScore2;
  changingPlayers();
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
  reAddListener();

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
  list.setAttribute("id", "hide-list");
  inputTarget.value = 100;

  player_winner[0].innerText = "";
  player_winner[1].innerText = "";

  PreviousWin_player1.innerText = player1_win;
  PreviousWin_player2.innerText = player2_win;

  player1_container.setAttribute("id", "player1-container");
  player2_container.setAttribute("id", "player2-container");
}

// check winner function
// Add how many times the player has won the game
function checkWinner() {
  if (finalScore1 == target || finalScore2 > target) {
    player1_win++;
    player2_container.setAttribute("id", "winner-container");
    winner.push({
      player1: {
        finalScore: finalScore1,
        win: 1,
      },
      player2: {
        finalScore: finalScore2,
        win: 0,
      },
    });
    player_winner[0].innerText = "You Win!";
    player_winner[1].innerText = "You missed the Target";
    removeListener();
    finished.play();
    Winning.play();
    newGame.removeAttribute("disabled" , false)
  } else if (finalScore2 == target || finalScore1 > target) {
    player2_win++;
    player1_container.setAttribute("id", "winner-container");
    winner.push({
      player1: {
        finalScore: finalScore1,
        win: 0,
      },
      player2: {
        finalScore: finalScore2,
        win: 1,
      },
    });
    player_winner[1].innerText = "You Win!";
    player_winner[0].innerText = "You didn't Pass the Target";
    removeListener();
    finished.play();
    Winning.play();
    newGame.removeAttribute("disabled" , false)
  }
}

function removeListener() {
  roll.removeEventListener("click", RollDices);
  hold.removeEventListener("click", holdScore);
  document.removeEventListener("keydown", keyDownFunction);
  roll.setAttribute("disabled" , true)
  hold.setAttribute("disabled" , true)
  newGame.setAttribute("disabled" , true)
}
function reAddListener() {
    roll.addEventListener("click", RollDices);
    hold.addEventListener("click", holdScore);
    newGame.addEventListener("click", newGameFunction);
    document.addEventListener("keydown", keyDownFunction);
    roll.removeAttribute("disabled" , false)
    hold.removeAttribute("disabled" , false)
    newGame.removeAttribute("disabled" , false)
}

// more Games 
const more = document.getElementById('more')
more.addEventListener('click' , () => {
    window.location = 'https://ladder-and-snake.netlify.app/' 
})