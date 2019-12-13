const h1 = document.querySelector('h1')
const menu = document.querySelector('#menu-container')
let r = 255
let g = 0
let b = 0

function changeColor () {
    h1.style.color = `rgb(${r}, ${g}, ${b})`
    h1.style.border = `2px solid rgb(${r}, ${g}, ${b})`
    menu.style.border = `2px solid rgb(${r}, ${g}, ${b})`
    if (r == 255 && g == 0 && b < 255) {
        b++
    } else if (b == 255 && g == 0 && r > 0) {
        r--
    } else if (b == 255 && r == 0 && g < 255) {
        g++
    } else if (g == 255 && r == 0 && b > 0) {
        b--
    } else if (g == 255 && b == 0 && r < 255) {
        r++
    } else {
        g--
    }
    setTimeout(changeColor, 10)
}

changeColor()