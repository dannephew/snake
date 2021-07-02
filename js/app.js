/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/



/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/




// 1. Define snake 
//     1. Composed of head and segments 
//     2. Segments is a list of coordinate positions 
//     3. x-coordinates increase from 1 to board-length (inclusive) toward the right 
//     4. y-coordinates increase from 1 to board-length (inclusive) toward the top 
//     5. The default value for board-length is 50 
// 2. Define head 
//     1. First segment of snake; looks identical to a segment 
// 3. Define segments 
//     1. Circle  
// 4. Define food 
//     1. Food is either empty or a list of coordinate positions 
// 5. Define obstacles 
//     1. Obstacles is either empty or a list of coordinate positions 
// 6. Define wall 
//     1. Boundaries of the game  
// 7. Define boardLength 
//     1. Coordinate length of board 
// 8. Define ticks 
//     1. To be used for gameScore 
// 9. Define direction 
//     1. Create event listeners for arrow keys  
// 10. Cached element references:  
//     1. Board: references snakeBox 
//     2. Reset button  
//     3. Play button 
//     4. Game result 
// 11. foodRandomizer function 
//     1. See if the number of food items === 10  
//         1. If not, then add food in random positions  
// 12. CSS 
//     1. Create snakeBox that corresponds to board boardLength somehow  
//     2. Play button 
//     3. Game result  
//     4. Hidden reset button  
// 13. makeSnake function 
//     1. Gives snake a direction and coordinate positions 
// 14. Initialize function 
//     1. Begin tick 
//     2. Begin gameKey 
//     3. Call gameOver 
//     4. Call render 
// 15. Render function 
//     1. Create 
// 16. addFood function 
//     1. Adds food at a specified coordinate 
// 17. changeDirection function 
//     1. Changes direction where snake is travelling 
// 18. gameScore function 
//     1. Multiple snake length by 100 and subtract elapsed ticks 
// 19. gameOver function 
//     1. Game ends when snake runs into itself, a wall, or obstacle 
// 20. advanceGame function 
//     1. Moves the game forward by one step 
//     2. Increments ticks by 1 
//     3. Moves the snake by:  
//         1. If snake does not eat:  
//             1. Getting the snake to lose a segment and gain a segment in the right direction/path 
//             2. New segment determined by coordinates of the head and the direction of the snake 
//             3. Loses the segment at the end of the snake 
//         2. Check if snake has eaten: 
//             1. See if adding a new segment in the direction of the head collides with food 
//             2. If snake has eaten, then no segment is lost and new segment is added where food was  
// 21. gameKey function 
//     1. Given up, down, left, right arrows, change the direction variable 
