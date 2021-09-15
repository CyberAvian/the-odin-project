// const MOVES = ['rock', 'paper', 'scissors'];
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

let score = {
    'tie': 0,
    'win': 0,
    'lose': 0
};

const main = () => {
    rounds = prompt('How many rounds do you want to play (5 is the default)? ');
    if (!rounds) {
        rounds = 5;
    }
    game(rounds);
}

const game = (totalRounds) => {
    for (let round = 0; round < totalRounds; round++) {
        let computerMove = getComputerMove();
        let playerMove = getPlayerMove();
        console.log(playRound(playerMove, computerMove));
    }

    console.log(`You tied ${score['tie']} out of ${totalRounds} games!`);
    console.log(`You won ${score['win']} out of ${totalRounds} games!`);
    console.log(`You lost ${score['lose']} out of ${totalRounds} games!`);
}

const getComputerMove = () => {
    let computerMoveNum = Math.floor(Math.random() * 3);
    let computerMoveName = Object.keys(MOVES)[computerMoveNum];

    return computerMoveName;
}

const getPlayerMove = () => {
    let playerInput;
    while (true) {
        playerInput = prompt("Select your move: ").toLowerCase();

        if (playerInput in MOVES) {
            break;
        }
        console.log(`${playerInput} is not valid.`)
        console.log("Select from rock, paper, or scissors.");
    }
    return playerInput;
}

const playRound = (playerSelection, computerSelection) => {
    console.log(`Computer chooses ${computerSelection}!`);
    console.log(`Player chooses ${playerSelection}!`);

    if (playerSelection == computerSelection) {
        // Tie
        score['tie'] += 1;
        return `It's a tie. :/\n${playerSelection} ties with ${computerSelection}.`;
    } else if (MOVES[playerSelection]['win'].includes(computerSelection)) {
        // Win
        score['win'] += 1;
        return `You win! :)\nYour ${playerSelection} beats the computer's ${computerSelection}!`;
    } else if (MOVES[playerSelection]['lose'].includes(computerSelection)) {
        // Lose
        score['lose'] += 1;
        return `You lose. :(\nThe computer's ${computerSelection} beat your ${playerSelection}.`
    } else {
        // Something is wrong
        return `Something went horribly wrong.`;
    }
}

main();