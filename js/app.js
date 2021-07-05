/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let snakeArray, head, food, obstacle, wall, boardLength, tick, direction

/*------------------------ Cached Element References ------------------------*/
// console.log("segment", segment)
const emptyBoard = document.querySelector(".grid")
const gameResult = document.querySelector("#game-result")
const score = document.querySelector("#score")
const resetBtn = document.querySelector("#reset-button")
const playBtn = document.querySelector("#play-game")

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("keydown", logKey)

function logKey(e) {
    console.log("e", e)
    console.log("e.key", e.key)
    const key = e.key
    //get key attribute of e
    switch(key) {
        case "ArrowUp": 
            console.log("up")
            break
        case "ArrowDown":
            console.log("down")
            break
        case "ArrowLeft":
            console.log("left")
            break
        case "ArrowRight":
            console.log("right")
            break
    }
}



/*-------------------------------- Functions --------------------------------*/
//create board with 2000 divs labelled with incrementing ids
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
console.log(boardNodeList)

function init() {
    snakeArray = [1024, 1025]
    makeSnake()
}

//whatever numbers are in the snakeArray, renders it as a snake on the board

// function makeSegment() {
//     for (i=0; i <= snakeArray.length; i++) {
//         let segment = document.createElement("div")
//         segment.setAttribute("class", "dot") 
//         // console.log()
//     }
// }

function makeSnake() {
    // for (i=0; i < snakeArray.length; i++) {

    //     // console.log()
    snakeArray.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("class", "dot") 
        boardNodeList[coordinate].appendChild(segment)
        console.log(boardNodeList)
        // console.log("hi")
        // console.log(boardNodeList)
    })
}

init()

// boardNodeList[0].textContent = "dani was here"