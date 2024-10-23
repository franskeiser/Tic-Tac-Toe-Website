const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

let cells;
let currentPlayer;
let gameActive;
let gameState;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    board.innerHTML = '';
    currentPlayer = 'x';
    gameActive = true;
    gameState = Array(9).fill(null);
    statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);
    if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
    }
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer.toUpperCase();
    checkResult();
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    if (gameActive) {
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]); // Highlight winning cells
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()} has won!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes(null);
    if (roundDraw) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('winning-cell'); // Add special class to winning cells
    });
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
