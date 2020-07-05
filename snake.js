'use strict'

const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')

const box = 32
let score = 0

const ground = new Image()
ground.src = 'img/ground.png'

const food = new Image()
food.src = 'img/food.png'

let snake = []
snake[0] = {
  x: 9 * box,
  y: 10 * box
}

let eat = new Audio()
let dead = new Audio()
let left = new Audio()
let right = new Audio()
let down = new Audio()
let up = new Audio()
eat.src = 'audio/eat.mp3'
dead.src = 'audio/dead.mp3'
left.src = 'audio/left.mp3'
right.src = 'audio/right.mp3'
down.src = 'audio/down.mp3'
up.src = 'audio/up.mp3'

let foodPos = {
  x: Math.floor(Math.random()*17+1) * box,
  y: Math.floor(Math.random()*15+3) * box
}

let direction

document.addEventListener('keydown', ({keyCode: key}) => {
  if(key === 37 && direction !== 'right') {
    direction = 'left'
    left.play()
  }
  if(key === 38 && direction !== 'down') {
    direction = 'up'
    up.play()
  }
  if(key === 39 && direction !== 'left') {
    direction = 'right'
    right.play()
  }
  if(key === 40 && direction !== 'up') {
    direction = 'down'
    down.play()
  }
})

function draw() {
  ctx.drawImage(ground, 0, 0)
  ctx.drawImage(food, foodPos.x, foodPos.y)

  let {x: sx, y: sy} = snake[0]

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'tomato' : '#ffffff'
    ctx.fillRect(snake[i].x,snake[i].y,box,box)
    ctx.strokeRect(snake[i].x,snake[i].y,box,box)
  }

  if(direction === 'left') sx -= box
  if(direction === 'right') sx += box
  if(direction === 'down') sy += box
  if(direction === 'up') sy -= box

  if(sx > 17*box) sx = 1*box
  if(sx < 1*box) sx = 17*box
  if(sy < 3*box) sy = 17*box
  if(sy > 17*box) sy = 3*box

  if(sx === foodPos.x && sy === foodPos.y) {
    score++
    foodPos = {
      x: Math.floor(Math.random()*17+1) * box,
      y: Math.floor(Math.random()*15+3) * box
    }
    eat.play()
  } else {
    snake.pop()
  }

  let nextSnake = {
    x: sx,
    y: sy
  }

  for(let r of snake) {
    if(r.x === sx && r.y === sy) {
      // clearInterval(interval)
      snake = [{
        x: 9 * box,
        y: 10 * box
      }]
      direction = ''
      score = 0
      dead.play()
      return null
    }
  }

  snake.unshift(nextSnake)

  ctx.font = "36px sans-serif"
  ctx.fillStyle = 'white'
  ctx.fillText(score,2*box, 1.5*box)
  setTimeout(draw, 250 - score * 10)
}

setTimeout(draw, 250 - score * 10)