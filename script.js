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
      box.addEventListener("click", () => {
        if (box.innerHTML == "") {
          box.innerHTML = "X";
        }
      });
    });
  };

  const updateBoard = () => {
    if (board == "") {
      board = "X";
    } else {
      console.log("Select another box");
    }
  };

  // const resetBoard = () => {
  //   board = ["", "", "", "", "", "", "", "", ""];
  // };

  return {
    createBoard,
    updateBoard,
  };
})();

// Disini akan dibuat tentang player. Nama, symbol, dan skor
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
  let gameends;

  const start = () => {
    player = [
      createPlayer(document.querySelector("#player-1").value, "X"),
      createPlayer(document.querySelector("#player-2").value, "O"),
    ];
    gameBoard.createBoard();
  };

  const checkWinner = () => {
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

    for (const pattern of winnerPatterns) {
      let [a, b, c] = pattern;
      if (pattern[a] === pattern[b] && pattern[a] === pattern[c]) {
        console.log(`The Winner is ${pattern[a]}`);
      } else if (gameBoard.board.every((board) => board !== "")) {
        console.log("TIE!");
      } else {
        return null;
      }
    }
  };

  return {
    start,
  };
})();

const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");

startBtn.addEventListener("click", gameControl.start);
