const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  if (!cells.includes('')) {
    return 'draw';
  }

  return null;
}

function handleClick(index) {
  if (cells[index] || gameEnded) return;

  cells[index] = currentPlayer;
  render();

  const winner = checkWinner();
  if (winner) {
    if (winner === 'draw') {
      message.textContent = "It's a draw!";
    } else {
      message.textContent = `${winner} wins!`;
    }
    gameEnded = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;

  // Remove "selected" class from all cells
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('selected');
  });

  // Add "selected" class to the clicked cell
  board.children[index].classList.add('selected');
}

function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameEnded = false;
  message.textContent = `Player ${currentPlayer}'s turn`;
  render();
}

function render() {
  cells.forEach((value, index) => {
    const cell = board.children[index];
    cell.textContent = value;
  });
}

board.addEventListener('click', function(event) {
  const index = event.target.dataset.index;
  if (index !== undefined) {
    handleClick(parseInt(index));
  }
});

resetButton.addEventListener('click', resetGame);

resetGame();
