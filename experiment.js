let timeLeft = 20
const playBtn = document.querySelector("#play-game")
console.log(playBtn)
playBtn.onclick = function() {
    console.log("hi")
    timer = setInterval(function() {
        console.log("hey")
        timeLeft -= 1
        console.log(timeLeft)
        // advanceGame()
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