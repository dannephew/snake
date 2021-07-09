
/*---------------------------- Variables (state) ----------------------------*/
let snakeArray, foodArray, borderArray, timeLeft, numFood, numObstacles, colObstaclesArray, direction, gameEnd, theTime

let snakeArrayP1, snakeArrayP2, foodArray2, borderArray2, food2, tick2, numFood2, numObstacles2, colObstaclesArray2, directionp1, directionp2, gameEnd2, timeLeft2

/*------------------------ One Player Cached Element References ------------------------*/
const emptyBoard = document.querySelector(".grid")
const gameResult = document.querySelector("#game-result")
const time = document.querySelector("#time")
const resetBtn = document.querySelector("#reset-button")
const playBtn = document.querySelector("#play-game")
const onePlayerBtn = document.querySelector("#one-player")
const game1 = document.querySelector(".game-1")
const instructions1 = document.querySelector(".instructions-1")
const mainPage = document.querySelector(".main-page")
const result1 = document.querySelector(".result-1")
const goto1 = document.querySelector("#go-to-game-1")

const emptyBoard2 = document.querySelector(".grid-2")
const gameResult2 = document.querySelector("#game-result-2")
const resetBtn2 = document.querySelector("#reset-button-2")
const playBtn2 = document.querySelector("#play-game-2")
const twoPlayerBtn = document.querySelector("#two-players")
const game2 = document.querySelector(".game-2")
const instructions2 = document.querySelector(".instructions-2")
const result2 = document.querySelector(".result-2")
const goto2 = document.querySelector("#go-to-game-2")
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
            directionp1 = 1
            break
        case "ArrowDown":
            // console.log("down")
            direction = 2
            directionp1 = 2
            break
        case "ArrowLeft":
            // console.log("left")
            direction = 3
            directionp1 = 3
            break
        case "ArrowRight":
            // console.log("right")
            direction = 4
            directionp1 = 4
            break
        case "w": 
            // console.log("case w", e.key)
            directionp2 = 1
            break
        case "s": 
        // console.log("case s", e.key)
            directionp2 = 2
            break
        case "a": 
        // console.log("case a", e.key)

            directionp2 = 3
            break
        case "d": 
        // console.log("case d", e.key)

            directionp2 = 4
            break
        case "W": 
        // console.log("case w", e.key)

            directionp2 = 1
            break
        case "S": 
            directionp2 = 2
            break
        case "A": 
            directionp2 = 3
            break
        case "D": 
            directionp2 = 4
            break
    }
}    

/*-------------------------------- One Player Functions --------------------------------*/
function createBoard() {
    for (i=0; i<2000; i++) {
        let square = document.createElement("div")
        let id = i
        square.setAttribute("id",  id)
        emptyBoard.appendChild(square)
    }
}

createBoard()

boardNodeList = emptyBoard.childNodes
boardNodeList[0].remove()

function init() {
    borderArray=[]
    snakeArray = [1024]
    direction = 1
    timeLeft = 220
    numFood = 10
    colObstaclesArray = []
    rowObstaclesArray = []
    foodArray = []
    speed = 0.8
    gameEnd = false
    theTime = timeLeft/5
    makeBorderArray()
    getNumObstacles()
    makeFoodArray()
    renderSnake()
    makeObstaclesArrays()
    gameOver()
    timeDisplay()
} 

playBtn.onclick = function() {
    resetBtn.removeAttribute("hidden")
    init()
    timer = setInterval(function() {
        timeLeft -= 1
        advanceGame()
        if (timeLeft <= 0) {
            clearInterval(timer)
        }
        }, 200)
}

resetBtn.onclick = function() {
    timeLeft = 0
    theTime = 0
    gameResult.textContent = ""
    wipeSnake()
    wipeBoard()
    game1.setAttribute("hidden", true)
    mainPage.removeAttribute("hidden")
}

function timeDisplay() {
    let timer = setInterval(function() {
        theTime -= 1
        time.textContent= theTime
        if (theTime <= 0) {
            clearInterval(timer)
            theTime = 0
            console.log("thetime", theTime)
            time.textContent= theTime
        }
        console.log("thetime", theTime)
    }, 1000)
}


function makeBorderArray() {
    for (i=0; i <= 49; i++) {
        borderArray.push(i)
    }
    for (i=1950; i<=1999; i++) {
        borderArray.push(i)
    }
    for (i=50; i<=1949; i++) {
        if (i%50 == 0 || i%50 == 49) {
            borderArray.push(i)
        }
    }
    renderBorderArray()
}

function renderBorderArray() {
    borderArray.forEach(function (coordinate) {
        let wall = document.createElement("div")
        wall.setAttribute("id", "border") 
        boardNodeList[coordinate].appendChild(wall)
})
}

function getNumObstacles() {
    let min = 15
    let max = 20
    numObstacles = Math.floor(Math.random() * (max - min + 1) + min)
}



function renderSnake() {
    snakeArray.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot") 
        boardNodeList[coordinate].appendChild(segment)
    })
}


function wipeSnake() {
    snakeArray.forEach(function (coordinate) {
        while (boardNodeList[coordinate].firstChild)   {
            boardNodeList[coordinate].removeChild(boardNodeList[coordinate].lastChild)
        }
    })
}

function wipeBoard() {
    for (i=0; i<=1999; i++) {
        while (boardNodeList[i].firstChild)   {
            boardNodeList[i].removeChild(boardNodeList[i].lastChild)
        }
    }
}

function makeFoodArray() {
    let min = 50
    let max = 1949
    for (i=0; i<numFood; i++) {
        num = Math.floor(Math.random() * (max - min + 1) + min)
        while (snakeArray.includes(num) || borderArray.includes(num) || colObstaclesArray.includes(num)) {
            num = Math.floor(Math.random() * (max - min + 1) + min)
        }
        foodArray.push(num)
    }
    renderFoodArray()
}

function renderFoodArray() {
    foodArray.forEach(function (coordinate) {
        let foodItem = document.createElement("div")
        foodItem.setAttribute("id", "food")
        boardNodeList[coordinate].appendChild(foodItem)
    })
}

function advanceGame() {
    if (colObstaclesArray.includes(snakeArray[0])) {
        gameOver()
    } else if (!colObstaclesArray.includes(snakeArray[0])) {
        if (!foodArray.includes(snakeArray[0])) {
            switch(direction) {
                case 1: 
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]-50)
                    snakeArray.pop()
                    renderSnake()
                    break
                case 2: 
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+50)
                    snakeArray.pop()
                    renderSnake()
                    break
                case 3:
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]-1)
                    snakeArray.pop()
                    renderSnake()
                    break
                case 4:
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+1)
                    snakeArray.pop()
                    renderSnake()
                    break
            }
        }  
        if (foodArray.includes(snakeArray[0])) {
            let index = foodArray.indexOf(snakeArray[0])
            if (index>-1) {
                foodArray.splice(index, 1)
            } 
            switch(direction) {
                case 1: 
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]-50)
                    renderSnake()
                    break
                case 2: 
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+50)
                    renderSnake()
                    break
                case 3:
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]-1)
                    renderSnake()
                    break
                case 4:
                    wipeSnake()
                    snakeArray.unshift(snakeArray[0]+1)
                    renderSnake()
                    break
            }
        }
    }
    gameOver()
    playerWin()
}



function makeObstaclesArrays() {
    for (i=0; i<numObstacles; i++) {
        let min = 50
        let max = 1949
        let colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        while (snakeArray.includes(colCoord) || colObstaclesArray.includes(colCoord) || rowObstaclesArray.includes(colCoord) || foodArray.includes(colCoord) || borderArray.includes(colCoord)) {
            colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        }
        colObstaclesArray.push(colCoord) 
    }
    colObstaclesArray.forEach(function (coordinate) {
        let min = 2
        let max = 5
        let numCoords = Math.floor(Math.random() * (max - min + 1) + min)
        let nextCoordPlus = coordinate + 50
        let nextCoordMinus = coordinate - 50
        for (i = 0; i < numCoords; i++) {
            if (nextCoordPlus >= 50 && nextCoordPlus <= 1949 && !snakeArray.includes(nextCoordPlus) && !colObstaclesArray.includes(nextCoordPlus) && !rowObstaclesArray.includes(nextCoordPlus) && !foodArray.includes(nextCoordPlus) && !borderArray.includes(nextCoordPlus)) {
                colObstaclesArray.push(nextCoordPlus)
                nextCoordPlus += 50
            } else {
                return
            }
        }
        for (i = 0; i < numCoords; i++) {
            if (nextCoordMinus >= 50 && nextCoordMinus <= 1949 && !snakeArray.includes(nextCoordMinus) && !colObstaclesArray.includes(nextCoordMinus) && !rowObstaclesArray.includes(nextCoordMinus) && !foodArray.includes(nextCoordMinus) && !borderArray.includes(nextCoordPlus)) {
                colObstaclesArray.push(nextCoordMinus)
                nextCoordMinus -= 50
            } else {
                return
            }
    }
})
renderObstaclesArray()
}

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


function gameOver() {
    snakeArray.forEach(function(coordinate) {
        if (colObstaclesArray.includes(coordinate) || borderArray.includes(coordinate)) {
            timeLeft = 0
            theTime = 0
            gameResult.textContent = "Game Over!"
            gameEnd = true
        }
    })
    let checkSelfCollision = snakeArray.slice()
    checkSelfCollision.shift()
    if (checkSelfCollision.includes(snakeArray[0])) {
        timeLeft = 0
        theTime = 0
        gameResult.textContent = "Game Over!"
        gameEnd = true
    }
    if (timeLeft == 0 && !foodArray.length ==0) {
        gameResult.textContent = "Game Over!"
        gameEnd = true
        theTime = 0
    } 
    result()
} 

function playerWin() {
    if (foodArray.length == 0) {
        timeLeft = 0
        theTime = 0

        gameResult.textContent = "You Win!"
        gameEnd = true
    }
    result()
    disablePlayBtn()
}

/*-------------------------------- Page Transition Functions --------------------------------*/


onePlayerBtn.onclick = function() {
    game1.removeAttribute("hidden")
    mainPage.setAttribute("hidden", true)
    result1.setAttribute("hidden", true)
    instructions1.removeAttribute("style")
    disablePlayBtn()
}


goto1.onclick = function() {
    playBtn.disabled = false
    instructions1.style.display = "none"
    instructions1.setAttribute("display", "none")
}

function result() {
    if (gameEnd == true) {
        result1.removeAttribute("hidden")
    }
}

function disablePlayBtn() {
    if (!result1.hasAttribute("hidden") || !instructions1.hasAttribute("style") || !mainPage.hasAttribute("hidden")) {
        playBtn.disabled = true
    }
}


/*-------------------------------- Two Player Functions --------------------------------*/
function createBoard2() {
    for (i=0; i<2000; i++) {
        let square = document.createElement("div")
        let id = i
        // console.log(i)
        // square.id = `${i}`
        square.setAttribute("id",  id)
        //show number labels:
        // square.innerText = id
        emptyBoard2.appendChild(square)
        // console.log(emptyBoard)
    }
}

createBoard2()

boardNodeList2 = emptyBoard2.childNodes
boardNodeList2[0].remove()

function init2() {
    // resetBtn.setAttribute("hidden", true)
    borderArray2=[]
    snakeArrayP1 = [986]
    snakeArrayP2 = [959]
    directionp1 = 1
    directionp2 = 1
    timeLeft2 = 2000000
    numFood = 20
    colObstaclesArray2 = []
    foodArray2 = []
    speed = 0.8
    gameEnd = false
    makeBorderArray2()
    getNumObstacles2()
    // console.log("numobs", numObstacles2)
    makeFoodArray2()
    renderSnakeP1()
    renderSnakeP2()
    makeObstaclesArrays2()
    gameOver2()
} 

playBtn2.onclick = function() {
    // wipeSnake()
    resetBtn2.removeAttribute("hidden")
    init2()
    // console.log("hi")
    timer = setInterval(function() {
        // console.log("hey")
        timeLeft2 -= 1
        console.log(timeLeft2)
        advanceGameP1()
        advanceGameP2()
        if (timeLeft2 <= 0) {
            console.log("clearInterval")
            clearInterval(timer)
        }
        }, 200)
}

resetBtn2.onclick = function() {
    timeLeft2 = 0
    gameResult2.textContent = ""
    console.log("gameresult", gameResult2.textContent)
    wipeSnakeP1()
    wipeSnakeP2()
    wipeBoard2()
    game2.setAttribute("hidden", true)
    mainPage.removeAttribute("hidden")
    // spacebar.removeAttribute("hidden")
}

function wipeSnakeP1() {
    // console.log("wipeSnake called")
    // console.log("segments", segments)
    // console.log("segment DOM", boardNodeList)
    snakeArrayP1.forEach(function (coordinate) {
        // let segment = document.querySelector("#dot")
        while (boardNodeList2[coordinate].firstChild)   {
            boardNodeList2[coordinate].removeChild(boardNodeList2[coordinate].lastChild)
        }
        // boardNodeList[coordinate].removeChild(segment)
    })
    // console.log("1024", boardNodeList[1024].childNodes)
    // .removeChild(segments)
    // console.log("segment DOM after", boardNodeList)
}


function wipeSnakeP2() {
    // console.log("wipeSnake called")
    // console.log("segments", segments)
    // console.log("segment DOM", boardNodeList)
    snakeArrayP2.forEach(function (coordinate) {
        // let segment = document.querySelector("#dot")
        while (boardNodeList2[coordinate].firstChild)   {
            boardNodeList2[coordinate].removeChild(boardNodeList2[coordinate].lastChild)
        }
        // boardNodeList[coordinate].removeChild(segment)
    })
    // console.log("1024", boardNodeList[1024].childNodes)
    // .removeChild(segments)
    // console.log("segment DOM after", boardNodeList)
}


function wipeBoard2() {
    for (i=0; i<=1999; i++) {
        while (boardNodeList2[i].firstChild)   {
            boardNodeList2[i].removeChild(boardNodeList2[i].lastChild)
        }
    }
}

function getNumObstacles2() {
    let min = 15
    let max = 20
    numObstacles2 = Math.floor(Math.random() * (max - min + 1) + min)
    // console.log("numObstacles", numObstacles)
}

function makeBorderArray2() {
    console.log("makeBorderArray")
    for (i=0; i <= 49; i++) {
        borderArray2.push(i)
    }
    for (i=1950; i<=1999; i++) {
        borderArray2.push(i)
    }
    for (i=50; i<=1949; i++) {
        if (i%50 == 0 || i%50 == 49) {
            borderArray2.push(i)
        }
    }
    // console.log("borderarray", borderArray)
    renderBorderArray2()
}

function renderBorderArray2() {
    borderArray2.forEach(function (coordinate) {
        let wall = document.createElement("div")
        wall.setAttribute("id", "border") 
        boardNodeList2[coordinate].appendChild(wall)
})
}


function makeFoodArray2() {
    let min = 50
    let max = 1949
    for (i=0; i<numFood; i++) {
        num = Math.floor(Math.random() * (max - min + 1) + min)
        console.log("snakeArrayP1", snakeArrayP1)
        console.log("snakeArrayP2", snakeArrayP2)
        console.log("border array", borderArray2)
        console.log("obstalces array", colObstaclesArray2)
        // console.log("borderarray", )

        while (snakeArrayP1.includes(num) || snakeArrayP2.includes(num) || borderArray2.includes(num) || colObstaclesArray2.includes(num)) {
            num = Math.floor(Math.random() * (max - min + 1) + min)
        }
        foodArray2.push(num)
    }
    renderFoodArray2()
}
// console.log(foodArray)


// The renderFoodArray function:
// renders foodArray onto the board

function renderFoodArray2() {
    foodArray2.forEach(function (coordinate) {
        let foodItem = document.createElement("div")
        foodItem.setAttribute("id", "food")
        boardNodeList2[coordinate].appendChild(foodItem)
    })
}

//The renderSnake function: 
//For every coordinate in the snakeArray, renders it as a snake on the board
function renderSnakeP1() {
    // for (i=0; i < snakeArray.length; i++) {
    //     // console.log()
    snakeArrayP1.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot") 
        boardNodeList2[coordinate].appendChild(segment)
            //appending child is permanent 
        // console.log(boardNodeList)
        // console.log("hi")
        // console.log(boardNodeList)
    })
}

function renderSnakeP2() {
    // for (i=0; i < snakeArray.length; i++) {
    //     // console.log()
    snakeArrayP2.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot2") 
        boardNodeList2[coordinate].appendChild(segment)
            //appending child is permanent 
        // console.log(boardNodeList)
        // console.log("hi")
        // console.log(boardNodeList)
    })
}

function advanceGameP1() {
    // console.log("advance game called")
    if (colObstaclesArray2.includes(snakeArrayP1[0])) {
        gameOver2()
    } else if (!colObstaclesArray2.includes(snakeArrayP1[0])) {
        if (!foodArray2.includes(snakeArrayP1[0])) {
            switch(directionp1) {
                //check if there should be quotation marks around numbers
                case 1: 
                    wipeSnakeP1()
                    console.log("up")
                    snakeArrayP1.unshift(snakeArrayP1[0]-50)
                    snakeArrayP1.pop()
                    // console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 2: 
                    wipeSnakeP1()
                    console.log("down")
                    snakeArrayP1.unshift(snakeArrayP1[0]+50)
                    snakeArrayP1.pop()
                    console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 3:
                    wipeSnakeP1()
                    console.log("left")
                    snakeArrayP1.unshift(snakeArrayP1[0]-1)
                    snakeArrayP1.pop()
                    console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 4:
                    wipeSnakeP1()
                    console.log("right")
                    snakeArrayP1.unshift(snakeArrayP1[0]+1)
                    snakeArrayP1.pop()
                    console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
            }
        }  
        if (foodArray2.includes(snakeArrayP1[0])) {
            let index = foodArray2.indexOf(snakeArrayP1[0])
            // console.log("index", index)
            if (index>-1) {
                foodArray2.splice(index, 1)
            }
            // while (boardNodeList[snakeArrayP1[0]].firstChild)   {
            //     boardNodeList[coordinate].removeChild(boardNodeList[coordinate].lastChild)
            // }     
            switch(directionp1) {
                //check if there should be quotation marks around numbers
                case 1: 
                    // console.log("up")
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]-50)
                    // console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 2: 
                    // console.log("down")
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]+50)
                    // console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 3:
                    // console.log("left")
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]-1)
                    // console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
                case 4:
                    // console.log("right")
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]+1)
                    // console.log("snakeArrayP1", snakeArrayP1)
                    renderSnakeP1()
                    break
            }
        }
    }
    gameOver2()
    playerWin2()
    addFood()
    // console.log("advanceGame")
}

function advanceGameP2() {
    console.log("advanceGameP2 called")
    // console.log("advance game called")
    if (colObstaclesArray2.includes(snakeArrayP2[0])) {
        gameOver2()
    } else if (!colObstaclesArray2.includes(snakeArrayP2[0])) {
        if (!foodArray2.includes(snakeArrayP2[0])) {
            switch(directionp2) {
                //check if there should be quotation marks around numbers
                case 1: 
                    console.log("up")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-50)
                    snakeArrayP2.pop()
                    // console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2() 
                    break
                case 2: 
                    console.log("down")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+50)
                    snakeArrayP2.pop()
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
                case 3:
                    console.log("left")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-1)
                    snakeArrayP2.pop()
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
                case 4:
                    console.log("right") 
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+1)
                    snakeArrayP2.pop()
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
            }
        }  
        if (foodArray2.includes(snakeArrayP2[0])) {
            let index = foodArray2.indexOf(snakeArrayP2[0])
            // console.log("index", index)
            if (index>-1) {
                foodArray2.splice(index, 1)
            }
            // while (boardNodeList[snakeArrayP2[0]].firstChild)   {
            //     boardNodeList[coordinate].removeChild(boardNodeList[coordinate].lastChild)
            // }     
            switch(directionp2) {
                //check if there should be quotation marks around numbers
                case 1: 
                    wipeSnakeP2()
                    console.log("up")
                    snakeArrayP2.unshift(snakeArrayP2[0]-50)
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
                case 2: 
                    console.log("down")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+50)
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
                case 3:
                    console.log("left")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-1)
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
                case 4:
                    console.log("right")
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+1)
                    console.log("snakeArrayP2", snakeArrayP2)
                    renderSnakeP2()
                    break
            }
        }
    }
    gameOver2()
    addFood()
    playerWin2()
    // console.log("advanceGame")
}

function addFood() {
    if (foodArray2.length !== numFood2) {
        let min = 50
        let max = 1949
        let diff = numFood2 - foodArray2.length
        for (i=0; i<diff; i++) {
            num = Math.floor(Math.random() * (max - min + 1) + min)
            while (snakeArrayP1.includes(num) || snakeArrayP2.includes(num) || borderArray2.includes(num) || colObstaclesArray2.includes(num)) {
                num = Math.floor(Math.random() * (max - min + 1) + min)
            }
            foodArray2.push(num)
        }
    }
    renderFoodArray2()

}



function makeObstaclesArrays2() {
    // for (i=0; i<numObstacles; i++) {
    //     num = Math.floor(Math.random() * 2000)
    //     while (snakeArray.includes(num) || num%50 == 24) {
    //         num = Math.floor(Math.random() * 2000)
    //     }
    //     obstaclesArray.push(num)
    // }
    // let numObstacles = Math.floor(Math.random() * numObstacles)
    // console.log("numObstacles", numObstacles)
    // let numRows = numObstacles - numObstacles
    //Columns: 
    // console.log("numObstacles", numObstacles)
    // console.log("numobs", numObstacles2)
    // console.log("obstacles")
    for (i=0; i<numObstacles2; i++) {
        let min = 50
        let max = 1949
        let colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        while (snakeArrayP1.includes(colCoord) || colObstaclesArray2.includes(colCoord) || foodArray2.includes(colCoord) || borderArray2.includes(colCoord) || snakeArrayP2.includes(colCoord) || colCoord % 50 == 36 || colCoord % 50 == 9) {
            colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        }
        colObstaclesArray2.push(colCoord) 
    }
    // console.log("after for loop", colObstaclesArray)
    colObstaclesArray2.forEach(function (coordinate) {
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
            if (nextCoordPlus >= 50 && nextCoordPlus <= 1949 && !snakeArrayP1.includes(nextCoordPlus) && !colObstaclesArray2.includes(nextCoordPlus) && !foodArray2.includes(nextCoordPlus) && !borderArray2.includes(nextCoordPlus) && !snakeArrayP2.includes(nextCoordPlus)) {
                colObstaclesArray2.push(nextCoordPlus)
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
            if (nextCoordMinus >= 50 && nextCoordMinus <= 1949 && !snakeArrayP1.includes(nextCoordMinus) && !colObstaclesArray2.includes(nextCoordMinus) && !foodArray2.includes(nextCoordMinus) && !borderArray2.includes(nextCoordPlus) && !snakeArrayP2.includes(nextCoordMinus)) {
                colObstaclesArray2.push(nextCoordMinus)
                nextCoordMinus -= 50
                // console.log(colObstaclesArray)
            } else {
                // console.log("minus else")
                return
            }
    // console.log(colObstaclesArray)
    }
})
// console.log("obstacles array", colObstaclesArray)
renderObstaclesArray2()
}
//------------

//renderObstacles
function renderObstaclesArray2() {
    colObstaclesArray2.forEach(function (coordinate) {
        let obstacle = document.createElement("div")
        obstacle.setAttribute("id", "obstacle")
        boardNodeList2[coordinate].appendChild(obstacle)
    })
}



//The gameOver function: 
//if any one of snake array coords is in colObstaclesArray or outside of board, then change gameResult
function gameOver2() {
    console.log("gameOver function called")
    snakeArrayP1.forEach(function(coordinate) {
        if (colObstaclesArray2.includes(coordinate) || borderArray2.includes(coordinate)) {
            timeLeft2 = 0
            gameResult2.textContent = "Player 2 Wins!"
            gameEnd2 = true
        }
    })
    snakeArrayP2.forEach(function(coordinate) {
        if (colObstaclesArray2.includes(coordinate) || borderArray2.includes(coordinate)) {
            timeLeft2 = 0
            gameResult2.textContent = "Player 1 Wins!"
            gameEnd2 = true
        }
    })
    let checkSelfCollisionP1 = snakeArrayP1.slice()
    let checkSelfCollisionP2 = snakeArrayP2.slice()

    checkSelfCollisionP1.shift()
    checkSelfCollisionP2.shift()

    // console.log("checkSelfCollision", checkSelfCollision)
    // console.log("snakeArray", snakeArray)
    if (checkSelfCollisionP1.includes(snakeArrayP1[0])) {
        timeLeft2 = 0
        gameResult2.textContent = "Player 2 Wins!"
        gameEnd2 = true
    }
    if (checkSelfCollisionP2.includes(snakeArrayP2[0])) {
        timeLeft2 = 0
        gameResult2.textContent = "Player 1 Wins!"
        gameEnd2 = true
    }
    // console.log("gameresult", typeof gameResult2.textContent)
    console.log("gameresultdisplay", gameResult2.textContent)
    resultGame2()
} 


function playerWin2() {
    // console.log("playerwin called")
    // console.log("food length: ", foodArray.length)
    snakeArrayP1.forEach(function(coordinate) {
        if (snakeArrayP2.includes(coordinate)) {
          if (snakeArrayP1.length > snakeArrayP2.length) {
              timeLeft2 = 0
              gameResult2.textContent = "Player 1 Wins!"
              gameEnd2 = true
          } else if (snakeArrayP2.length > snakeArrayP1.length) {
            timeLeft2 = 0
            gameResult2.textContent = "Player 2 Wins!"
            gameEnd2 = true
          } else if (snakeArrayP2.length == snakeArrayP1.length) {
            timeLeft2 = 0
            gameResult2.textContent = "Don't hit each other! Both players lose."
            gameEnd2 = true
          }
        }
    })
    // console.log("gameresult2", typeof gameResult2.textContent)
    console.log("gameresult2", gameResult2.textContent)
    resultGame2()
    disablePlayBtn2()
}

// // let a = []
// // console.log("a", a.length)


twoPlayerBtn.onclick = function() {
    game2.removeAttribute("hidden")
    mainPage.setAttribute("hidden", true)
    // console.log("mainpage after click", mainPage)
    // console.log("gameResult", gameResult.textContent)
    result2.setAttribute("hidden", true)
    instructions2.removeAttribute("style")
    // instructions1.removeAttribute("display")
    // instructions1.removeAttribute("hidden")
    // instructions1.setAttribute("display", "inline-block")
    // console.log("instructions2", instructions2)
    disablePlayBtn2()
    // console.log("instructions is closed?", instructions2.hasAttribute("style"))
}


// console.log("goto1", goto1)
goto2.onclick = function() {
    // console.log("goto1 clicked")
    playBtn2.disabled = false
    console.log("playBtn2 disabled", playBtn2.disabled)
    instructions2.style.display = "none"
    instructions2.setAttribute("display", "none")
    // instructions1.setAttribute("hidden", true)
    // instructions1.setAttribute("width", "0px")
    // instructions1.setAttribute("height", "0px")
    // console.log("instructions after click", instructions1)
}

// console.log("gameResult", gameResult.textContent)
function resultGame2() {
    console.log("resultGame called")
    console.log("gameEnd true?", gameEnd2)
    if (gameEnd2 == true) {
        // console.log("gameResult", gameResult.textContent)
        result2.removeAttribute("hidden")
        // console.log("result1 hidden", result1.hasAttribute("hidden"))
    }
}
// console.log("resultpage", result1)
// console.log("result1 hidden", result1.hasAttribute("hidden"))

function disablePlayBtn2() {
    // console.log("is result hidden", result1.hasAttribute("hidden"))
    // console.log("playbtn", playBtn)
    if (!result2.hasAttribute("hidden") || !instructions2.hasAttribute("style") || !mainPage.hasAttribute("hidden")) {
        // console.log("playbtn.disabled", playBtn.disabled)
        playBtn2.disabled = true
    }
}