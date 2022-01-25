'use strict'
const PACMAN = '<img src="img/pacman.gif" class="pacman ">';

var gPacman;
var gFoodEaten = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
        // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
        // return if cannot move
    if (nextCell === WALL) return
        // hitting a ghost?  call gameOver
    if (nextCell === GHOST && gPacman.isSuper === false) {
        document.querySelector('.msg').innerText = 'GAME OVER' //change moadl text back to game over
        gameOver();
        return
    }
    if (nextCell === GHOST && gPacman.isSuper === true) {
        var deadGhostLocation = {
            i: nextLocation.i,
            j: nextLocation.j
        }
        renderCell(deadGhostLocation, ' ')
        for (var i = 0; i < gGhosts.length; i++) {
            if ((gGhosts[i].location.i === deadGhostLocation.i) && (gGhosts[i].location.j === deadGhostLocation.j)) {
                if (gGhosts[i].currCellContent == FOOD) gFoodEaten++
                    gGhosts[i].currCellContent = EMPTY
                gDeadGhosts.push(gGhosts.splice(i, 1)[0])
            }
        }

    }
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodEaten++
        if (gFoodCount === gFoodEaten) { //eat all food? call gameOver
            document.querySelector('.msg').innerText = 'VICTORY!' //change modal text to victory
            gameOver()
        }
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === SUPER_FOOD && gPacman.isSuper === false) {
        gFoodEaten++
        changeColorGhost()
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            changeColorGhost()
            gGhosts.push(...gDeadGhosts)
            gDeadGhosts = []
        }, 5000)
        updateScore(1)
        if (gFoodCount === gFoodEaten) { //eat all food? call gameOver
            document.querySelector('.msg').innerText = 'VICTORY!' //change modal text to victory
            gameOver()
        }
    } else if (nextCell === SUPER_FOOD && gPacman.isSuper === true) return

    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM

    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
        // update the DOM
    renderCell(gPacman.location, PACMAN)
    switch (ev.key) {
        case 'ArrowUp':
            document.querySelector('.pacman').classList.add('up')
            break;
        case 'ArrowDown':
            document.querySelector('.pacman').classList.add('down')
            break;
        case 'ArrowLeft':
            document.querySelector('.pacman').classList.add('left')
            break;
        case 'ArrowRight':
            document.querySelector('.pacman').classList.add('right')
            break;
        default:
            return null
    }
}

function getNextLocation(keyboardEvent) {
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
                console.log('up')
            break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }
    return nextLocation;
}