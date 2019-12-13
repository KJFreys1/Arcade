const gameBoard = document.querySelector('#game-board')
const modal = document.querySelector('#modal')

const currentScoreBox = document.querySelector('#current-score')
const highScoreBox = document.querySelector('#high-score')
const modalScore = document.querySelector('h2')
const modalHighScore = document.querySelector('h3')

const resetButton = document.querySelector('#play-again')
resetButton.addEventListener('click', resetBoard)

let justScored = false
let gameover = false
let boxes = []
let snakeLength = 1
let snakeBoxes = []
let index = 0
let direction = ''
let seed = 0
let snakeIndex = [0]
let score = 0
let highScore = 0
let speed = 70

for (i = 0; i < 625; i++) {
    createBoard()
}

snakeBoxes.push(boxes[0])
snakeBoxes[0].style.backgroundColor = 'white'

createSeed()
moveBox()

function resetBoard () {
    justScored = false
    gameover = false
    snakeLength = 1
    snakeBoxes = []
    index = 0
    direction = ''
    seed = 0
    snakeIndex = [0]
    score = 0
    currentScoreBox.textContent = `Current Score: 0`
    speed = 70
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = 'black'
    }
    snakeBoxes.push(boxes[0])
    snakeBoxes[0].style.backgroundColor = 'white'
    modal.style.display = 'none'
    createSeed()
    moveBox()
}

function playerOut () {
    modalScore.textContent = `Your Score: ${score}`
    modalHighScore.textContent = `High Score: ${highScore}`
    modal.style.display = 'block'
}

function createSeed () {
    seed = Math.ceil(Math.random() * 624)
    for (let i = 0; i < snakeLength; i++) {
        if (seed == snakeIndex[i]) {
            i = snakeLength
            createSeed()
        }
    }
    boxes[seed].style.backgroundColor = 'orange'
}

function checkSeed () {
    if (index == seed) {
        snakeBoxes.push(boxes[snakeIndex[snakeLength-1]])
        snakeIndex.push(index)
        snakeLength++
        score++
        currentScoreBox.textContent = `Current Score: ${score}`
        if (score > highScore) {
            highScore = score
        }
        highScoreBox.textContent = `High Score: ${highScore}`
        justScored = true
        changeDefault(boxes[seed])
        if (speed > 35) {
            speed--
        }
        createSeed()
    }
}

function createBoard () {
    let newBox = document.createElement('div')
    newBox.classList.add('box')
    gameBoard.appendChild(newBox)
    boxes.push(newBox)
}

function moveBox () {
    if (direction == 'KeyD') {
        if ((index + 1) % 25 == 0) {
            gameover = true
        } else {
            index++
            checkSeed()
            snakeFunction()
        }
    } if (direction == 'KeyA') {
        if (index % 25 == 0) {
            gameover = true
        } else {
            index--
            checkSeed()
            snakeFunction()
        }
    } if (direction == 'KeyW') {
        if (index - 25 < 0) {
            gameover = true
        } else {
            index -= 25
            checkSeed()
            snakeFunction()
        }
    } if (direction == 'KeyS') {
        if (index + 25 > 624) {
            gameover = true
        } else {
            index += 25
            checkSeed()
            snakeFunction()
        }
    }
    if (!justScored) {
        for (let j = snakeLength; j > 0; j--) {
            if (snakeIndex[j - 2] == index) {
                j = 0
                gameover = true
            }
        }
    } else {
        justScored = false
    }
    if (gameover) {
        playerOut()
    } else {
        snakeBoxes[snakeLength - 1].style.backgroundColor = 'white'
        setTimeout(moveBox, speed)
    }
}

function snakeFunction () {
    snakeBoxes.push(boxes[index])
    changeDefault(snakeBoxes[0])
    snakeBoxes.shift()
    if (!justScored) {
        snakeIndex.push(index)
        snakeIndex.shift()
    }
}

function changeDefault (blackBox) {
    blackBox.style.backgroundColor = 'black'
}

document.addEventListener('keydown', evt => {
    if (evt.code == 'KeyW' || evt.code == 'KeyA' || evt.code == 'KeyS' || evt.code == 'KeyD') {
        direction = evt.code
    }
})