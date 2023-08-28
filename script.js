// Disini akan dibuat tentang update, reset, dan membuat papan permainan
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // create the board when game starts
  const createBoard = () => {
    let boardHTML = "";
    board.forEach((box, index) => {
      boardHTML += `<div class="box" id="box-${index}">${box}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", gameControl.handleClick);
    });
  };

  const updateBoard = (index, symbol) => {
    if (board[index] == "") {
      board[index] = symbol;
      createBoard();
    } else {
      alert("Please select another box");
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  const getBoard = () => board;

  return {
    createBoard,
    updateBoard,
    resetBoard,
    getBoard,
  };
})();

function createPlayer(name, symbol) {
  return {
    name,
    symbol,
  };
}

// Disini akan dibuat tentang giliran siapa, pemenang, mulai dan akhiri game
const gameControl = (() => {
  let player = [];
  let currentPlayer;
  let gameOver;

  const start = () => {
    player = [
      createPlayer(document.querySelector("#player-1").value, "X"),
      createPlayer(document.querySelector("#player-2").value, "O"),
    ];
    gameBoard.createBoard();
    currentPlayer = player[0];

    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    if (gameOver == true) {
      return
    }
    let index = parseInt(event.target.id.split("-")[1]);
    gameBoard.updateBoard(index, currentPlayer.symbol);

    if (checkForWinner(gameBoard.getBoard(), currentPlayer.symbol)) {
      gameOver = true;
      displayWinner(`${currentPlayer.name} Win!`);
    } else if (checkForTie(gameBoard.getBoard())) {
      gameOver = true;
      displayWinner("It's a Tie!");
    }
    currentPlayer = currentPlayer == player[0] ? player[1] : player[0];
  };

  const reset = () => {
    gameBoard.resetBoard();
    gameBoard.createBoard();
    currentPlayer = player[0];
    gameOver = false;
    document.querySelector("#message").innerHTML = "";
    document.querySelector("#message").style.display = "none";
  };

  return {
    start,
    reset,
    handleClick,
  };
})();

function checkForWinner(board) {
  winnerPatterns = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winnerPatterns.length; i++) {
    const [a, b, c] = winnerPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie(board) {
  return board.every((box) => box !== "");
}

function displayWinner(message) {
  document.querySelector("#message").style.display = "flex";
  document.querySelector("#message").innerHTML = message;
}

const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const gameboard = document.querySelector("#gameboard");
const inputForm = document.querySelector("#input");
// const boards = document.querySelectorAll(".box");

startBtn.addEventListener("click", () => {
  gameControl.start();
  gameboard.style.display = "flex";
  inputForm.style.display = "none";
  resetBtn.style.display = "block";
});
resetBtn.addEventListener("click", gameControl.reset);
