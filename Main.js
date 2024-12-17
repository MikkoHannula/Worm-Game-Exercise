const squares = document.querySelectorAll(".grid div")
const scoreDisplay = document.querySelector("#score span")
const startBtn = document.querySelector("#Start")

//määritetään pelin asetuksia
let currentSnake = [2, 1, 0]
let direction = 1
let score = 0
let interval = null
let intervalTime = 1000
let speed = 0.9
let appleIndex = 0
const columns = 10
const rows = 10


function moveSnake() {

//tarkistetaan osuuko mato oikeaan seinään
  if(direction === 1 && currentSnake[0] % columns === columns - 1) {
    alert("osuit seinään, GAME OVER")
    location.reload
    clearInterval(interval)
  return
 }
 //tarkistetaan osuuko mato vasempaan seinään
 if(direction === -1 && currentSnake[0] % columns === 0) {
  alert("osuit seinään, GAME OVER")
  clearInterval(interval)
return
}
//tarkistetaan osuuko mato ylä seinään
if(direction === -10 && currentSnake[0] < columns) {
  alert("osuit seinään, GAME OVER")
  clearInterval(interval)
return
}
//tarkistetaan osuuko mato ala seinään
if(direction === 10 && currentSnake[0] + direction >= rows * columns) {
  alert("osuit seinään, GAME OVER")
  clearInterval(interval)
return
}
//tarkistetaan osuuko mato itseensä
if(squares[currentSnake[0]+direction].classList.contains("snake")){
  alert("osuit itseesi, GAME OVER!")
  clearInterval(interval)
  return
}
 
  //poistetaan käärmeen häntä
  let tailIndex = currentSnake.pop()
  squares[tailIndex].classList.remove("snake")

  //Siirretään käärmeen päätä
  currentSnake.unshift(currentSnake[0] + direction)
  squares[currentSnake[0]].classList.add("snake")

  if( squares[currentSnake[0]].classList.contains("apple") ) {
    scoreDisplay.innerHTML = ++score

    squares[currentSnake[0]].classList.remove("apple")
    squares[tailIndex].classList.add("snake")
    currentSnake.push(tailIndex)

    randomApple()

    clearInterval(interval)
    intervalTime = intervalTime * speed
    interval = setInterval(moveSnake, intervalTime)

  }
}

function startGame() {

  //alustetaan muuttujat uudestaan uuden pelin alussa
  currentSnake = [2, 1, 0]
  direction = 1
  interval = 1000
  score = 0
  scoreDisplay.innerHTML = score
  
  clearInterval(interval)
  squares[appleIndex].classList.remove("apple")

  
   squares.forEach((div) => {
     div.classList.remove("snake")
    })

  //currentSnake.forEach((snakeIndex) => {
    //squares[snakeIndex].classList.remove("snake")
  //})

//lisätään mato pelialueelle
  currentSnake.forEach((snakeIndex) => {
    squares[snakeIndex].classList.add("snake")
  })

  randomApple()

  interval = setInterval(moveSnake,intervalTime)

} 

function randomApple() {

  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while(squares[appleIndex].classList.contains("snake"))

  squares[appleIndex].classList.add("apple")
}

function control(e) {
  //console.log(e.keyCode)

  if(e.keyCode === 37) {
    direction = -1
  } else if (e.keyCode === 38) {
    direction = -10
  } else if (e.keyCode === 39) {
    direction = 1
  } else if (e.keyCode === 40) {
    direction = 10
  }
}

//luodaan tapahtumakuuntelija
startBtn.addEventListener("click", startGame)
document.addEventListener("keyup",control)

