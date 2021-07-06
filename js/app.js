/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let snakeArray, foodArray, food, timeLeft, speed, obstacle, wall, boardLength, tick, numFood, numObstacles, colObstaclesArray, rowObstaclesArray, direction

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
        //show number labels:
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
    snakeArray = [1024]
    direction = 1
    timeLeft = 200
    numFood = 10
    colObstaclesArray = []
    rowObstaclesArray = []
    foodArray = []
    speed = 0.8
    getNumObstacles()
    makeFoodArray()
    renderSnake()
    makeObstaclesArrays()
    gameOver()
} 


// init()
// console.log(numObstacles)


//When clicking the play button, the set timeout function will call advanceGame repeatedly
//------------------------------------------------------------------------
playBtn.onclick = function() {
    // wipeSnake()
    init()
    // console.log("hi")
    timer = setInterval(function() {
        // console.log("hey")
        timeLeft -= 1
        console.log(timeLeft)
        advanceGame()
        if (timeLeft <= 0) {
            console.log("clearInterval")
            clearInterval(timer)
        }
        }, 200)
}
//------------------------------------------------------------------------


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
function getNumObstacles() {
    let min = 10
    let max = 15
    numObstacles = Math.floor(Math.random() * (max - min + 1) + min)
}

console.log("numobstacles", numObstacles)

function renderSnake() {
    // for (i=0; i < snakeArray.length; i++) {
    //     // console.log()
    snakeArray.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot") 
        boardNodeList[coordinate].appendChild(segment)
            //appending child is permanent 
        // console.log(boardNodeList)
        // console.log("hi")
        // console.log(boardNodeList)
    })
}

//The wipeSnake function: 
//before renderSnake is called, the wipeSnake function wipes out the previous snake segements
function wipeSnake() {
    // console.log("wipeSnake called")
    // console.log("segments", segments)
    // console.log("segment DOM", boardNodeList)
    snakeArray.forEach(function (coordinate) {
        // let segment = document.querySelector("#dot")
        while (boardNodeList[coordinate].firstChild)   {
            boardNodeList[coordinate].removeChild(boardNodeList[coordinate].lastChild)
        }
        // boardNodeList[coordinate].removeChild(segment)
    })
    // console.log("1024", boardNodeList[1024].childNodes)
    // .removeChild(segments)
    // console.log("segment DOM after", boardNodeList)

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
    if (colObstaclesArray.includes(snakeArray[0])) {
        gameOver()
    } else if (!colObstaclesArray.includes(snakeArray[0])) {
        if (!foodArray.includes(snakeArray[0])) {
            switch(direction) {
                //check if there should be quotation marks around numbers
                case 1: 
                    wipeSnake()
                    console.log("up")
                    snakeArray.unshift(snakeArray[0]-50)
                    snakeArray.pop()
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 2: 
                    wipeSnake()
                    console.log("down")
                    snakeArray.unshift(snakeArray[0]+50)
                    snakeArray.pop()
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 3:
                    wipeSnake()
                    console.log("left")
                    snakeArray.unshift(snakeArray[0]-1)
                    snakeArray.pop()
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 4:
                    wipeSnake()
                    console.log("right")
                    snakeArray.unshift(snakeArray[0]+1)
                    snakeArray.pop()
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
            }
        } else if (foodArray.includes(snakeArray[0])) {
            // while (boardNodeList[snakeArray[0]].firstChild)   {
            //     boardNodeList[coordinate].removeChild(boardNodeList[coordinate].lastChild)
            // }     
            switch(direction) {
                //check if there should be quotation marks around numbers
                case 1: 
                    wipeSnake()
                    console.log("up")
                    snakeArray.unshift(snakeArray[0]-50)
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 2: 
                    console.log("down")
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+50)
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 3:
                    console.log("left")
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]-1)
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
                case 4:
                    console.log("right")
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+1)
                    console.log("snakeArray", snakeArray)
                    renderSnake()
                    break
            }
        }
    }
    gameOver()
    playerWin()
    // console.log("advanceGame")
}


//makeObstaclesArrays
//----------
function makeObstaclesArrays() {
    // for (i=0; i<numObstacles; i++) {
    //     num = Math.floor(Math.random() * 2000)
    //     while (snakeArray.includes(num) || num%50 == 24) {
    //         num = Math.floor(Math.random() * 2000)
    //     }
    //     obstaclesArray.push(num)
    // }
    // let numCols = Math.floor(Math.random() * numObstacles)
    let numCols = numObstacles
    // console.log("numCols", numCols)
    // let numRows = numObstacles - numCols
    //Columns: 
    for (i=0; i<numCols; i++) {
        colCoord = Math.floor(Math.random() * 2000)
        while (snakeArray.includes(colCoord) || colObstaclesArray.includes(colCoord) || rowObstaclesArray.includes(colCoord) || foodArray.includes(colCoord)) {
            colCoord = Math.floor(Math.random() * 2000)
        }
        colObstaclesArray.push(colCoord) 
    }
    colObstaclesArray.forEach(function (coordinate) {
        let min = 2
        let max = 5
        let numCoords = Math.floor(Math.random() * (max - min + 1) + min)
        // let nextCoordPlus50 = 50
        //make Coord
        // let coord = coordinate
        let nextCoordPlus = coordinate + 50
        let nextCoordMinus = coordinate - 50
            //how to make coordinate equal to 
        for (i = 0; i < numCoords; i++) {
            // console.log("for loop plus")
            if (nextCoordPlus >= 0 && nextCoordPlus <= 1999 && !snakeArray.includes(nextCoordPlus) && !colObstaclesArray.includes(nextCoordPlus) && !rowObstaclesArray.includes(nextCoordPlus) && !foodArray.includes(nextCoordPlus)) {
                colObstaclesArray.push(nextCoordPlus)
                // nextCoordPlus50 *= -1
                nextCoordPlus += 50
                // console.log(colObstaclesArray)
            } else {
                // console.log("plus else")
                return
            }
        }
        for (i = 0; i < numCoords; i++) {
            // console.log("for loop minus")
            if (nextCoordMinus >= 0 && nextCoordMinus <= 1999 && !snakeArray.includes(nextCoordMinus) && !colObstaclesArray.includes(nextCoordMinus) && !rowObstaclesArray.includes(nextCoordMinus) && !foodArray.includes(nextCoordMinus)) {
                colObstaclesArray.push(nextCoordMinus)
                nextCoordMinus -= 50
                // console.log(colObstaclesArray)
            } else {
                // console.log("minus else")
                return
            }
    // console.log(colObstaclesArray)
    }
})
renderObstaclesArray()
}
//------------

//The makeObstacles function: 
//Create columns of obstacles and rows of obstacles 
//columns: find a random num, then add (random num between 2 and 5) coordinates +- 50 to the array 
    //if num is <= 249 OR >=1750: 
        //if last row and first row: 
        //stop
    //just add coordinates until we reach the edge 
        //if newly added coordinate is between 0 and 49 OR if num is between 1950 and 1999, stop
        //if newly added coordinate is +- 50 from another obstalce or food, stop

//rows: find a random num, then add (random num between 2 and 5) coordinates +- 1 to the array
    //if num is on the edge of board
        // if num%50 >= 45 && num%50 <= 49: 
            // check if I need to create border case inside if statement or outside
            //just add coordinates until we reach the edge 
            //if newly added coordinate %50 == 0 OR coordinate %50 == 49, stop
        //if num%50 >= 0 && num%50 <= 4: 
            //just add coordinates until we reach the edge 
            //if newly added coordinate %50 == 0 OR coordinate %50 == 49, stop
    //if newly added coordinate is +- 1 from another obstacle or food, stop



// colObstaclesArray = [1204, 626, 1694, 619, 1291, 1864, 996, 184, 1087, 1816, 1790, 1254, 1304, 1354, 1154, 1104, 1054, 676, 726, 776, 576, 526, 476, 1744, 1794, 1644, 1594, 669, 719, 769, 819, 569, 519, 469, 419, 1341, 1391, 1241, 1191, 1914, 1964, 1046, 1096, 1146, 1196, 946, 896, 846, 796, 234, 284, 334, 134, 84, 34, 1137, 1187, 1237, 1287, 1037, 987, 937, 887, 1866, 1916, 1966, 1766, 1716, 1666, 1840, 1890, 1940, 1740, 1690, 1640]
// renderObstaclesArray()


//renderObstacles
function renderObstaclesArray() {
    colObstaclesArray.forEach(function (coordinate) {
        let obstacle = document.createElement("div")
        obstacle.setAttribute("id", "obstacle")
        boardNodeList[coordinate].appendChild(obstacle)
    })
    rowObstaclesArray.forEach(function (coordinate) {
        let obstacle = document.createElement("div")
        obstacle.setAttribute("id", "obstacle")
        boardNodeList[coordinate].appendChild(obstacle)
    })
}



//The gameOver function: 
//if any one of snake array coords is in colObstaclesArray or outside of board, then change gameResult
function gameOver() {
    snakeArray.forEach(function(coordinate) {
        if (colObstaclesArray.includes(coordinate)) {
            timeLeft = 0
            gameResult.textContent = "Game Over!"
        }
    })
    console.log("gameOver")
}

//The playerWin function: 

function playerWin() {
    console.log("playerWin")
}
