
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
        square.setAttribute("id",  id)
        emptyBoard2.appendChild(square)
    }
}

createBoard2()



boardNodeList2 = emptyBoard2.childNodes
boardNodeList2[0].remove()


function init2() {
    borderArray2=[]
    snakeArrayP1 = [986]
    snakeArrayP2 = [959]
    directionp1 = 1
    directionp2 = 1
    timeLeft2 = 2000000
    numFood2 = 50
    colObstaclesArray2 = []
    foodArray2 = []
    speed = 0.8
    gameEnd = false
    makeBorderArray2()
    getNumObstacles2()
    makeFoodArray2()
    renderSnakeP1()
    renderSnakeP2()
    makeObstaclesArrays2()
    gameOver2()
} 


playBtn2.onclick = function() {
    resetBtn2.removeAttribute("hidden")
    init2()
    timer = setInterval(function() {
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
}

function wipeSnakeP1() {
    snakeArrayP1.forEach(function (coordinate) {
        while (boardNodeList2[coordinate].firstChild)   {
            boardNodeList2[coordinate].removeChild(boardNodeList2[coordinate].lastChild)
        }
    })
}


function wipeSnakeP2() {
    snakeArrayP2.forEach(function (coordinate) {
        while (boardNodeList2[coordinate].firstChild)   {
            boardNodeList2[coordinate].removeChild(boardNodeList2[coordinate].lastChild)
        }
    })
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
    for (i=0; i<numFood2; i++) {
        num = Math.floor(Math.random() * (max - min + 1) + min)
        while (snakeArrayP1.includes(num) || snakeArrayP2.includes(num) || borderArray2.includes(num) || colObstaclesArray2.includes(num)) {
            num = Math.floor(Math.random() * (max - min + 1) + min)
        }
        foodArray2.push(num)
    }
    renderFoodArray2()
}

function renderFoodArray2() {
    foodArray2.forEach(function (coordinate) {
        let foodItem = document.createElement("div")
        foodItem.setAttribute("id", "food")
        boardNodeList2[coordinate].appendChild(foodItem)
    })
}

function renderSnakeP1() {
    snakeArrayP1.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot") 
        boardNodeList2[coordinate].appendChild(segment)
    })
}

function renderSnakeP2() {
    snakeArrayP2.forEach(function (coordinate) {
        let segment = document.createElement("div")
        segment.setAttribute("id", "dot2") 
        boardNodeList2[coordinate].appendChild(segment)
    })
}


function advanceGameP1() {
    if (colObstaclesArray2.includes(snakeArrayP1[0])) {
        gameOver2()
    } else if (!colObstaclesArray2.includes(snakeArrayP1[0])) {
        if (!foodArray2.includes(snakeArrayP1[0])) {
            switch(directionp1) {
                case 1: 
                    wipeSnakeP1()
                    console.log("up")
                    snakeArrayP1.unshift(snakeArrayP1[0]-50)
                    snakeArrayP1.pop()
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
            if (index>-1) {
                foodArray2.splice(index, 1)
            }  
            switch(directionp1) {
                case 1: 
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]-50)
                    renderSnakeP1()
                    break
                case 2: 
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]+50)
                    renderSnakeP1()
                    break
                case 3:
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]-1)
                    renderSnakeP1()
                    break
                case 4:
                    wipeSnakeP1()
                    snakeArrayP1.unshift(snakeArrayP1[0]+1)
                    renderSnakeP1()
                    break
            }
        }
    }
    gameOver2()
    playerWin2()
}

function advanceGameP2() {
    if (colObstaclesArray2.includes(snakeArrayP2[0])) {
        gameOver2()
    } else if (!colObstaclesArray2.includes(snakeArrayP2[0])) {
        if (!foodArray2.includes(snakeArrayP2[0])) {
            switch(directionp2) {
                case 1: 
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-50)
                    snakeArrayP2.pop()
                    renderSnakeP2() 
                    break
                case 2: 
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+50)
                    snakeArrayP2.pop()
                    renderSnakeP2()
                    break
                case 3:
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-1)
                    snakeArrayP2.pop()
                    renderSnakeP2()
                    break
                case 4:
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+1)
                    snakeArrayP2.pop()
                    renderSnakeP2()
                    break
            }
        }  
        if (foodArray2.includes(snakeArrayP2[0])) {
            let index = foodArray2.indexOf(snakeArrayP2[0])
            if (index>-1) {
                foodArray2.splice(index, 1)
            }
            switch(directionp2) {
                case 1: 
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-50)
                    renderSnakeP2()
                    break
                case 2: 
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+50)
                    renderSnakeP2()
                    break
                case 3:
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]-1)
                    renderSnakeP2()
                    break
                case 4:
                    wipeSnakeP2()
                    snakeArrayP2.unshift(snakeArrayP2[0]+1)
                    renderSnakeP2()
                    break
            }
        }
    }
    gameOver2()
    playerWin2()
}


function makeObstaclesArrays2() {
    for (i=0; i<numObstacles2; i++) {
        let min = 50
        let max = 1949
        let colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        while (snakeArrayP1.includes(colCoord) || colObstaclesArray2.includes(colCoord) || foodArray2.includes(colCoord) || borderArray2.includes(colCoord) || snakeArrayP2.includes(colCoord) || colCoord % 50 == 36 || colCoord % 50 == 9) {
            colCoord = Math.floor(Math.random() * (max - min + 1) + min)
        }
        colObstaclesArray2.push(colCoord) 
    }
    colObstaclesArray2.forEach(function (coordinate) {
        let min = 2
        let max = 5
        let numCoords = Math.floor(Math.random() * (max - min + 1) + min)
        let nextCoordPlus = coordinate + 50
        let nextCoordMinus = coordinate - 50
        for (i = 0; i < numCoords; i++) {
            if (nextCoordPlus >= 50 && nextCoordPlus <= 1949 && !snakeArrayP1.includes(nextCoordPlus) && !colObstaclesArray2.includes(nextCoordPlus) && !foodArray2.includes(nextCoordPlus) && !borderArray2.includes(nextCoordPlus) && !snakeArrayP2.includes(nextCoordPlus)) {
                colObstaclesArray2.push(nextCoordPlus)
                nextCoordPlus += 50
            } else {
                return
            }
        }
        for (i = 0; i < numCoords; i++) {
            if (nextCoordMinus >= 50 && nextCoordMinus <= 1949 && !snakeArrayP1.includes(nextCoordMinus) && !colObstaclesArray2.includes(nextCoordMinus) && !foodArray2.includes(nextCoordMinus) && !borderArray2.includes(nextCoordPlus) && !snakeArrayP2.includes(nextCoordMinus)) {
                colObstaclesArray2.push(nextCoordMinus)
                nextCoordMinus -= 50
            } else {
                return
            }
    }
})
renderObstaclesArray2()
}

function renderObstaclesArray2() {
    colObstaclesArray2.forEach(function (coordinate) {
        let obstacle = document.createElement("div")
        obstacle.setAttribute("id", "obstacle")
        boardNodeList2[coordinate].appendChild(obstacle)
    })
}



function gameOver2() {
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
    resultGame2()
} 


function playerWin2() {
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
    resultGame2()
    disablePlayBtn2()
}



twoPlayerBtn.onclick = function() {
    game2.removeAttribute("hidden")
    mainPage.setAttribute("hidden", true)
    result2.setAttribute("hidden", true)
    instructions2.removeAttribute("style")
    disablePlayBtn2()
}


goto2.onclick = function() {
    playBtn2.disabled = false
    console.log("playBtn2 disabled", playBtn2.disabled)
    instructions2.style.display = "none"
    instructions2.setAttribute("display", "none")
}

function resultGame2() {
    if (gameEnd2 == true) {
        result2.removeAttribute("hidden")
    }
}


function disablePlayBtn2() {
    if (!result2.hasAttribute("hidden") || !instructions2.hasAttribute("style") || !mainPage.hasAttribute("hidden")) {
        playBtn2.disabled = true
    }
}