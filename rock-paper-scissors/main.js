const MOVES = {
    'rock': {
        'win': ['scissors'],
        'lose': ['paper']
    },
    'paper': {
        'win': ['rock'],
        'lose': ['scissors']
    },
    'scissors': {
        'win': ['paper'],
        'lose': ['rock']
    }
}

let scores = {
    'playerScore': 0,
    'computerScore': 0,
    'ties': 0,
    'gamesWon': 0,
    'gamesLost': 0
}

const resultElement = document.createElement("p");
const playerScoreElement = document.createElement("p");
const computerScoreElement = document.createElement("p");
const tieScoreElement = document.createElement("p");
const gamesWonElement = document.createElement("p");
const gamesLostElement = document.createElement("p");

function game() {
    resetGame();

    const roundScores = document.querySelector("#roundScores>ul");
    const gamesScores = document.querySelector("#gamesScores>ul");

    roundScores.appendChild(resultElement);
    roundScores.appendChild(playerScoreElement);
    roundScores.appendChild(computerScoreElement);
    roundScores.appendChild(tieScoreElement);
    gamesScores.appendChild(gamesWonElement);
    gamesScores.appendChild(gamesLostElement);
    
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.addEventListener('click', playRound));
}

function resetGame() {
    resultElement.textContent = "Round Result: ";

    scores['playerScore'] = 0;
    scores['computerScore'] = 0;
    scores['ties'] = 0;

    setRoundScores();
    setGamesScores();
}

function setRoundScores() {
    playerScoreElement.textContent = `Player Score: ${scores['playerScore']}`;
    computerScoreElement.textContent = `Computer Score: ${scores['computerScore']}`;
    tieScoreElement.textContent = `Ties: ${scores['ties']}`;
}

function setGamesScores() {
    gamesWonElement.textContent = `Games Won: ${scores['gamesWon']}`;
    gamesLostElement.textContent = `Games Lost: ${scores['gamesLost']}`;
}

function getComputerMove() {
    let computerMoveNum = Math.floor(Math.random() * 3);
    let computerMoveName = Object.keys(MOVES)[computerMoveNum];

    return computerMoveName;
}

function playRound(e) {
    let playerSelection = e.target.id;
    let computerSelection = getComputerMove();

    if (playerSelection == computerSelection) {
        scores['ties'] += 1;
        resultElement.textContent = `Round Result: It's a tie. :/\n${playerSelection} ties with ${computerSelection}.`;
    } else if (MOVES[playerSelection]['win'].includes(computerSelection)) {
        scores['playerScore'] += 1;
        resultElement.textContent = `Round Result: You win! :)\nYour ${playerSelection} beats the computer's ${computerSelection}!`;
    } else if (MOVES[playerSelection]['lose'].includes(computerSelection)) {
        scores['computerScore'] += 1;
        resultElement.textContent = `Round Result: You lose. :(\nThe computer's ${computerSelection} beat your ${playerSelection}.`
    } else {
        resultElement.textContent = `Round Result: Something went horribly wrong.`;
    }

    setRoundScores();
    checkVictory();
}

function checkVictory() {
    if (scores['playerScore'] === 5 || scores['computerScore'] === 5) {
        if (scores['playerScore'] === 5) {
            alert('You won!');
            scores['gamesWon'] += 1;
        } else {
            alert('You lost!');
            scores['gamesLost'] += 1;
        }

        resetGame();
    }
}

game();