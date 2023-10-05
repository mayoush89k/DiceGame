//catch DOM Sections
const player1_currentScore = document.querySelector('#player1-score')
const player2_currentScore = document.querySelector('#player2-score')
const player1_finalScore = document.querySelector('#final-score1')
const player2_finalScore = document.querySelector('#final-score2')

//catch DOM Buttons
const newGame = document.querySelector('#new-game')
const roll = document.querySelector('#roll-dice')
const hold = document.querySelector('#hold')

//catch DOM Dice face images
const diceImage1 = document.querySelector("#dice1")
const diceImage2 = document.querySelector("#dice2")

// create global score holder for players
let finalScore1 = 0
let finalScore2 = 0

// create current score holder for players
let currentScore1 = 0
let currentScore2 = 0

// create current player
let currentPlayer = 1

// Dice faces
const Dice = ['1' , '2' , '3' , '4' , '5' , '6']

// save 2 random numbers for Dices face
let diceRoll1 = 0
let diceRoll2 = 0


// generate 2 random numbers for Dices face
function setRandomDices(){
    diceRoll1 =  Math.floor(Math.random() * (Dice.length - 1)) + 1; 
    diceRoll2 = Math.floor(Math.random() * (Dice.length - 1)) + 1;
    diceImage1.setAttribute('src' , `assets/Images/dice-${diceRoll1}.png`) 
    diceImage2.setAttribute('src' , `assets/Images/dice-${diceRoll2}.png`) 
}

// roll button add listener when clicked
roll.addEventListener("click" , RollDices)

function RollDices(){
    setRandomDices(); // generate random dices face
    // check rolled same dice faces
    if(diceRoll1 == diceRoll2){
        // player will loose his current score
        currentPlayer == 1 ? currentScore1 = 0 : currentScore2 = 0
        currentPlayer = currentPlayer == 1 ? 2 : 1
    }else{
        // player will add dice faces number to his current score
        currentPlayer == 1 ? currentScore1 += diceRoll1 + diceRoll2 : currentScore2 += diceRoll1 + diceRoll2
    }
    saveCurrent()    
}
// save scores to DOM catcher variables
function saveCurrent(){
    player1_currentScore.children[1].innerText = currentScore1
    player2_currentScore.children[1].innerText = currentScore2
}

// Hold the current player his current Score
hold.addEventListener('click' , holdScore)

function holdScore() {
    console.log(Number(player1_finalScore.innerText) + currentScore1);
    currentPlayer == 1 ? player1_finalScore.innerText = Number(player1_finalScore.innerText) + currentScore1 : player2_finalScore.innerText = Number(player2_finalScore.innerText) + currentScore2
    currentPlayer = currentPlayer == 1 ? 2 : 1
    currentScore1 = 0
    currentScore2 = 0
    saveCurrent()
}