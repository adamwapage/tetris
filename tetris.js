const container = document.getElementById('board');
for (let i = 0; i < 200; i++) {
  container.innerHTML += '<div>' + '</div>';
}

const board = Array.from(document.querySelectorAll('#board div'));

const width = 10;

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1], // are these two lines needed??
  [width, width + 1, width + 2, width + 3],
];

const jTetrimino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const lTetrimino = [
  [width, width + 1, width + 2, width * 2],
  [0, 1, width + 1, width * 2 + 1],
  [width + 2, width * 2, width * 2 + 1, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
];

const oTetrimino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const sTetrimino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetrimino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 12, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const zTetromino = [
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [2, width + 1, width + 2, width * 2 + 1],
];

const theTetrominos = [
  iTetromino,
  jTetrimino,
  lTetrimino,
  oTetrimino,
  sTetrimino,
  tTetrimino,
  zTetromino,
];

let currentPosition = 4;
let currentRotation = 0;
let random = Math.floor(Math.random() * theTetrominos.length);
let current = theTetrominos[random][currentRotation];

function draw() {
  current.forEach(index => {
    board[currentPosition + index].classList.add('tetromino');
  });
}

function undraw() {
  current.forEach(index => {
    board[currentPosition + index].classList.remove('tetromino');
  });
}
