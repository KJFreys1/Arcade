const colors = ['green', 'red', '#dbdb04', 'blue']
const colorSelected = ['#8dfc81', '#ff8585', '#ffffa1', '#8381fc']

const button = document.querySelectorAll('.button')
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', evt => {
        isClicked(evt, i)
    })
    button[i].style.backgroundColor = colors[i]
}

const resetButton = document.querySelectorAll('.reset-button')
for (let m = 0; m < resetButton.length; m++) {
    resetButton[m].addEventListener('click', resetBoard)
}

const modal = document.querySelector('#modal')

const currentScoreBox = document.querySelector('#current-score')
const highScoreBox = document.querySelector('#high-score')
const modalScore = document.querySelector('h2')
const modalHighScore = document.querySelector('h3')

let inPlay = true
let playerTurn = false
let playerScore = 0
let highScore = 0
let sequence = []
let sequenceIndex = 0
let playerIndex = 0
let pause = 500

startSequence()

function startSequence () {
    setTimeout(addSequence, 1000)
}

function addSequence () {
    sequence.push(Math.ceil(Math.random() * 4) - 1)
    setTimeout(showSequence, 50)
}

function showSequence () {
    if (sequenceIndex < sequence.length) {
        if (inPlay) {
            button[sequence[sequenceIndex]].style.backgroundColor = colorSelected[sequence[sequenceIndex]]
            sequenceIndex++
            setTimeout(changeDefault, pause)
            if (inPlay) {
                setTimeout(showSequence, pause * 2)
            }
        }
    } else {
        playerTurn = true
        sequenceIndex = 0
    }
}

function isClicked (evt, i) {
    if (playerTurn) {
        if (i == sequence[playerIndex]) {
            evt.target.style.backgroundColor = colorSelected[i]
            setTimeout(changeDefault, 300)
            playerIndex++
            if (playerIndex == sequence.length) {
                playerTurn = false
                playerIndex = 0
                playerScore++
                currentScoreBox.textContent =  `Current Score: ${playerScore}`
                startSequence()
            }
        } else {
            openModal()
        }
    }
}

function changeDefault() {
    for (let j = 0; j < button.length; j++) {
        button[j].style.backgroundColor = colors[j]
    }
}

function openModal () {
    if (playerScore > highScore) {
        highScore = playerScore
        highScoreBox.textContent = `High Score: ${playerScore}`
        modalHighScore.textContent = "New high score! Woo-hoo!"
    } else {
        modalHighScore.textContent = ''
    }
    modalScore.textContent = `Score: ${playerScore}`
    modal.style.display = 'block'
}

function resetBoard () {
    if (inPlay) {
        inPlay = false
        setTimeout(allowPlay, 1500)
        playerTurn = false
        playerScore = 0
        sequence = []
        sequenceIndex = 0
        playerIndex = 0
        currentScoreBox.textContent =  `Current Score: ${playerScore}`
        modal.style.display = 'none'
        setTimeout(startSequence, 500)
    }
}

function allowPlay () {
    inPlay = true
}