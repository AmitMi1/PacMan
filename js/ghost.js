'use strict'
// var GHOST = '&#9781;';
var GHOST = '<img src="img/red.png">'
var gGhosts;
var gDeadGhosts = []
    // var gGhostPics = [
    //     '<img src="img/red.png">',
    //     '<img src="img/lightblue.png">',
    //     '<img src="img/pink.png">'
    // ]
var gGhostPics = []
var blueGhost = '<img src="img/blue.png">'
var gIntervalGhosts;
// console.log('ghost')

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRndGhost(),
        previousColor: ''
    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhostPics = [
        '<img src="img/red.png">',
        '<img src="img/lightblue.png">',
        '<img src="img/pink.png">'
    ]
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }
        // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // console.log('nextCell', nextCell)
        // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
        // hitting a pacman?  call gameOver
    if (nextCell === PACMAN && gPacman.isSuper === false) {
        document.querySelector('.msg').innerText = 'GAME OVER' //change modal text to GAME OVER
        gameOver();
        return
    }
    if (nextCell === PACMAN && gPacman.isSuper === true) return

    // moving from corrent position:
    // update the model

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
        // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    // return (gPacman.isSuper) ? `<span style="color:#0000FF;">${GHOST}</span>` : `<span>${ghost.color}</span>`
    return (gPacman.isSuper) ? `<span>${blueGhost}</span>` : `<span>${ghost.color}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function changeColorGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhostLocation = gGhosts[i].location
        var val = getGhostHTML(gGhosts[i])
        renderCell(currGhostLocation, val)
    }
}

function getRndGhost() {
    return shuffle(gGhostPics).pop()
}