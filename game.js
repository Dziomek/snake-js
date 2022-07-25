import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from "./snake.js";
import {update as updateFood, draw as drawFood} from "./food.js";
import {outsideGrid} from "./grid.js";

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {

    if (gameOver) {
        if (confirm('Game over. Press OK to restart')) {
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    console.log('Render')
    lastRenderTime = currentTime
    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
}

function draw() {
    gameBoard.innerHTML = '' // odpowiada za to, że gdy rysuje sie nastepny element, nie kasowal sie poprzedni (dlatego jakby resetujemy html)
    drawSnake(gameBoard)
    drawFood(gameBoard)
    checkFailure()
}

function checkFailure() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}