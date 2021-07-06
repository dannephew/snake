/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let snakeArray, foodArray, food, timeLeft, speed, obstacle, wall, boardLength, tick, numFood, direction

/*------------------------ Cached Element References ------------------------*/
// console.log("segment", segment)
const emptyBoard = document.querySelector(".grid")
const gameResult = document.querySelector("#game-result")
const time = document.querySelector("#time")
const resetBtn = document.querySelector("#reset-button")
const playBtn = document.querySelector("#play-game")
console.log(playBtn)

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("keydown", logKey)

function logKey(e) {
    // console.log("e", e)
    // console.log("e.key", e.key)
    const key = e.key
    //get key attribute of e
    switch(key) {
        case "ArrowUp": 
            // console.log("up")
            direction = 1
            break
        case "ArrowDown":
            // console.log("down")
            direction = 2
            break
        case "ArrowLeft":
            // console.log("left")
            direction = 3
            break
        case "ArrowRight":
            // console.log("right")
            direction = 4
            break
    }
}


/*-------------------------------- Functions --------------------------------*/

//The createBoard function: 
//creates board with 2000 divs labelled with incrementing ids
function createBoard() {
    for (i=0; i<2000; i++) {
        let square = document.createElement("div")
        let id = i
        // console.log(i)
        // square.id = `${i}`
        square.setAttribute("id",  id)
        // square.innerText = id
        emptyBoard.appendChild(square)
        // console.log(emptyBoard)
    }
}

createBoard()
// console.log(emptyBoard)
// const board = document.querySelectorAll("#div")
// const boardNodeList = Array.from(emptyBoard)
// console.log(boardNodeList)
// board[1].textContent = "0"

//turn emptyBoard into a node list by obtaining the divs within .grid and removing excess elements that aren't divs
boardNodeList = emptyBoard.childNodes
// boardNodeList.shift()
boardNodeList[0].remove()
// console.log(boardNodeList)

function init() {
    snakeArray = [1024, 1025, 1026]
    direction = 1
    timeLeft = 10
    numFood = 10
    foodArray = []
    speed = 0.8
    renderSnake()
    makeFoodArray()
}

init()

//When clicking the play button, the set timeout function will call advanceGame repeatedly
playBtn.onclick = function() {
    // console.log("hi")
    timer = setInterval(function() {
        // console.log("hey")
        timeLeft -= 1
        console.log(timeLeft)
        advanceGame()
        if (timeLeft <= 0) {
            clearInterval(timer)
        }
        }, 1000)
}



// let interval = setInterval(function() {
//     timeLeft -= 1
//     console.log(timeLeft)
//     // advanceGame()
//     if (timeLeft <= 0) {
//         clearInterval(interval)
//     }
//     }, 1000)

//playBtn.addEventListener("click", console.log("hi"))
//     //doesn't work bc interval is not a function


// function makeSegment() {
//     for (i=0; i <= snakeArray.length; i++) {
//         let segment = document.createElement("div")
//         segment.setAttribute("class", "dot") 
//         // console.log()
//     }
// }

//for every coordinate in the snakeArray, renders it as a snake on the board
function renderSnake() {
    // for (i=0; i < snakeArray.length; i++) {

    //     // console.log()
    snakeArray.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot") 
        boardNodeList[coordinate].appendChild(segment)
        // console.log(boardNodeList)
        // console.log("hi")
        // console.log(boardNodeList)
    })
}

//The makeFoodArray function: 
//Creates an array of food positions for numFood amounts of food onto random coordinates of the board
//If random num is the initial position of snake, then num will be set as last coordinate on board
function makeFoodArray() {
    for (i=0; i<numFood; i++) {
        num = Math.floor(Math.random() * 2000)
        while (snakeArray.includes(num)) {
            num = Math.floor(Math.random() * 2000)
        }
        foodArray.push(num)
    }
    renderFoodArray()
}
// console.log(foodArray)

// The renderFoodArray function:
// renders foodArray onto the board

function renderFoodArray() {
    foodArray.forEach(function (coordinate) {
        let foodItem = document.createElement("div")
        foodItem.setAttribute("id", "food")
        boardNodeList[coordinate].appendChild(foodItem)
    })
}


//change snake coordinates depending on direction 
// function moveSnake() {
//     console.log("moveSnake")
//     advanceGame()
// }

//determines velocity (speed and direction) of snake movement
//how fast should moveSnake be called? 
// function velocity () {
//     console.log("velocity")
// }



//The advanceGame function: 
//increment ticks by 1
//change snake coordinates depending on direction 
    //if snake doesn't eat: lose a segment, gain a segment 
    //if snake eats: gain a segment 
//checks if new snake coordinate bumps into food 
function advanceGame() {
    // console.log("advance game called")
    if (!foodArray.includes(snakeArray[0])) {
        switch(direction) {
            //check if there should be quotation marks around numbers
            case 1: 
                console.log("up")
                break
            case 2: 
                console.log("down")
                break
            case 3:
                console.log("left")
                break
            case 4:
                console.log("right")
                break
        }
    if (foodArray.includes(snakeArray[0])) {
        switch(direction) {
            //check if there should be quotation marks around numbers
            case 1: 
                console.log("up")
                break
            case 2: 
                console.log("down")
                break
            case 3:
                console.log("left")
                break
            case 4:
                console.log("right")
                break
        }
    }

    console.log("advanceGame")
    }
}

