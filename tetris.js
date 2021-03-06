// Creating the game board
const board = Array.from(document.querySelectorAll('#board div'));
const width = 10;
let nextRandom = 0;
let timerId;

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

// Randomly select a tetromino
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

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  stop();
}

function stop() {
  if (current.some(index => board[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach(index => board[currentPosition + index].classList.add('taken'));
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominos.length);
    current = theTetrominos[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

function moveLeft() {
  undraw();
  const isAtLeft = current.some(index => (currentPosition + index) % width === 0);

  if (!isAtLeft) currentPosition -= 1;
  if (current.some(index => board[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1;
  }
  draw();
}

function moveRight() {
  undraw();
  const isAtRight = current.some(index => (currentPosition + index) % width === width - 1);

  if (!isAtRight) currentPosition += 1;
  if (current.some(index => board[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1;
  }
  draw();
}

function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominos[random][currentRotation];
  draw();
}

function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keydown', control);

const displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));
const displayWidth = 4;
let displayIndex = 0;

const upNextTetrominos = [
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2],
  [0, 1, displayWidth, displayWidth + 1],
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
  [1, displayWidth, displayWidth + 1, displayWidth + 2],
  [displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
];

function displayShape() {
  displaySquares.forEach(square => {
    square.classList.remove('tetromino');
  });
  upNextTetrominos[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add('tetromino');
  });
}

const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 800);
    nextRandom = Math.floor(Math.random() * theTetrominos.length);
    displayShape();
  }
});

