'use strict'
const WALL = '<img src="img/wall.png">'
const FOOD = '<img src="img/food.png">'
const EMPTY = ' '
const SUPER_FOOD = '<img src="img/super.png">'
const CHERRY = '<img src="img/cherry.png">'
const SIZE = 13

var gBoard
var gFoodCount = -1 //start at -1 because pacman takes a cell
var gCherryInterval
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    updateScore(-gGame.score)
    printMat(gBoard, '.board-container')
    gCherryInterval = setInterval(() => {
        var emptyCells = shuffle(locateEmpty())
        renderCell(emptyCells[0], CHERRY)
        gBoard[emptyCells[0].i][emptyCells[0].j] = CHERRY
    }, 10000);
    gGame.isOn = true
    document.querySelector('.game-over').style.display = 'none' //hide modal
}

function buildBoard() {

    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++ //how much food on board
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1) {
                gFoodCount-- //food minus walls
                board[i][j] = WALL;
            }
        }
    }
    getWallsAndSuper(board)
    return board;
}

function getWallsAndSuper(board) {
    board[1][1] = SUPER_FOOD
    board[1][SIZE - 2] = SUPER_FOOD
    board[SIZE - 2][1] = SUPER_FOOD
    board[SIZE - 2][SIZE - 2] = SUPER_FOOD
    board[Math.floor(SIZE / 2)][Math.floor(SIZE / 2)] = WALL
    board[Math.floor(SIZE / 2 - 1)][Math.floor(SIZE / 2)] = WALL
    board[Math.floor(SIZE / 2)][Math.floor(SIZE / 2 - 1)] = WALL
    board[Math.floor(SIZE / 2 + 1)][Math.floor(SIZE / 2)] = WALL
    board[Math.floor(SIZE / 2)][Math.floor(SIZE / 2 + 1)] = WALL
    board[1][Math.floor(SIZE / 2)] = WALL
    board[SIZE - 2][Math.floor(SIZE / 2)] = WALL
    board[Math.floor(SIZE / 2)][1] = WALL
    board[Math.floor(SIZE / 2)][SIZE - 2] = WALL
    gFoodCount -= 9
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
        // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
    renderCell(gPacman.location, EMPTY)
    document.querySelector('.game-over').style.display = 'block' //show modal
    gFoodCount = -1
    gFoodEaten = 0

}