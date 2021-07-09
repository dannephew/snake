
/*---------------------------- Variables (state) ----------------------------*/
let snakeArray, foodArray, borderArray, food, timeLeft, speed, obstacle, wall, boardLength, boardWidth, squareLength, tick, numFood, numObstacles, colObstaclesArray, rowObstaclesArray, direction, gameEnd

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



/*------------------------ Two Players Cached Element References ------------------------*/
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
    const key = e.key
    switch(key) {
        case "ArrowUp": 
            direction = 1
            directionp1 = 1
            break
        case "ArrowDown":
            direction = 2
            directionp1 = 2
            break
        case "ArrowLeft":
            direction = 3
            directionp1 = 3
            break
        case "ArrowRight":
            direction = 4
            directionp1 = 4
            break
        case "w": 
            directionp2 = 1
            break
        case "s": 
            directionp2 = 2
            break
        case "a": 
            directionp2 = 3
            break
        case "d":
            directionp2 = 4
            break
        case "W": 
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
    theTime = timeLeft/5
    let timer = setInterval(function() {
        theTime -= 1
        time.textContent= theTime
        if (theTime <= 0) {
            clearInterval(timer)
            time.textContent= theTime
        }
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