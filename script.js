const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');


//making variables

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player1: ${currentPlayer}`;
player2.textContent = `Player2: ${nextPlayer}`;


//func to start game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if ( checkWin()) {
            showAlert(`${playerTurn} is a Winner!`);
            disableCells();
        }
        else if (checkTie()) {
            showAlert("It's a Tie!");
            disableCells();
        }else{
            changePlayerTurn();
            showAlert(`Player ${playerTurn}'s Turn`);
        }
    }
}

//func to change player turn
const changePlayerTurn = () => {
    if (playerTurn == currentPlayer) {
        playerTurn = nextPlayer;
    }
    else{
        playerTurn = currentPlayer;
    }

    // playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}

//func to check win
const checkWin = () => {
    const winningConditions = 
    [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        if (gameCells[pos1].textContent !== '' && 
        gameCells[pos1].textContent === gameCells[pos2].textContent && 
        gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

//func check for a tie
const checkTie = () => {
    let emptycellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptycellsCount++;
        }
    });

    return emptycellsCount === 0 && !checkWin();
}

//fucn to disable game board 
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

//func to restart game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}

//func to show alert
const showAlert = (msg) => {
    alertBox.style.display = "block";
    alertBox.textContent = msg;
    setTimeout(() => {
        alertBox.style.display = "none";
    },3000);
}

restartBtn.addEventListener('click', restartGame);

startGame();