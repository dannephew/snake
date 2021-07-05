/*-------------------------------- Constants --------------------------------*/
// segment = 

/*---------------------------- Variables (state) ----------------------------*/
let snake, head, segment, food, obstacle, wall, boardLength, tick, direction

/*------------------------ Cached Element References ------------------------*/
const emptyBoard = document.querySelector(".grid")
const gameResult = document.querySelector("#game-result")
const score = document.querySelector("#score")

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
//create board with 2000 divs
function createBoard() {
    for (i=0; i<2000; i++) {
        let square = document.createElement("div")
        let id = i
        // console.log(i)
        // square.id = `${i}`
        square.setAttribute("id",  id)
        square.innerText = id
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

//turn emptyBoard into a node list and remove excess elements that aren't divs
boardNodeList = emptyBoard.childNodes
// boardNodeList.shift()
boardNodeList[0].remove()
console.log(boardNodeList)

