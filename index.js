// finds the canvas by the "id" - which is game
const canvas = document.getElementById('game')
// asking the canvas for context
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;

    }
}
// speed var controls the speed at which the screen is updated
let speed = 7;
 
// our canvas is comprised of 20x20
let tileCount = 20;

let tileSize = canvas.width / tileCount - 2;
// this is the head of the snake, setting it to the middle screen - across
let headX = 10;
// setting head to middle of the screen - down
let headY = 10;

// defining array that is constant because it is not removed only modifying contents
const snakeParts = [];

// ****** when snake starts moving, it will automatically have two tail pieces -- Set to CONST *********
const tailLength = 2; 
// setting apple to location 
let appleX = 5;
let appleY = 5;

// controls movement of snake across
let xVelocity = 0;

// controls movement of snake down
let yVelocity = 0;

let score = 0;


// this game loop is going to continuously update the screen
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    // only job is to clear the screen
    clearScreen();
    // creates a function within draw game to draw the snake
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    // setTimeout -- gives us an opportunity to change how often the screen gets updated, takes miliseconds in (1000)
    setTimeout(drawGame, 1000/ speed);
}

// checking if you have broken a rule, resulting in game over

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }
    
    
    // checking walls
    if(headX <= 0){
        gameOver = true;
    }
    // We could put 20 here but since we know tileCount = 20, we will use that instead. 
    else if(headX == tileCount){
        gameOver = true;
    }
    // ""
    else if(headY < 0){
        gameOver = true;
    }
    // ""
    else if(headY == tileCount){
        gameOver = true;
    }
    // this will not allow for the snake to collide with itself
    for( let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        // using triple ='s when comparing numbers
        if(part.x === headX && part.y === headY){
            gameOver = true;
            // stop the for loop
            break;
        }
    }
// prints "Game Over!" if above condition is met
    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Veranda';

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
    }
    return gameOver;
}
// draw score function
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana"';
    ctx.fillText('Score ' + score, canvas.width - 50, 10);
}

function clearScreen(){
    // allows us to draw to the screen - assigns it the color black 
    ctx.fillStyle = 'black';
    //fill the rectangle the same height and width as the canvas
    ctx.fillRect(0,0, canvas.width, canvas.height );
}

function drawSnake(){
    // sets head color to orange
    ctx.fillStyle = 'orange';
    // sets orange square to head of snake in the middle of the canvas
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    //sets body color to green
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    // puts an item at the end of the list next to the head 
    snakeParts.push(new SnakePart(headX, headY)); 
    if(snakeParts.length > tailLength){
        // remove the furthest item from the snakeParts if we have more than our tail size
        snakeParts.shift();
    }

}


// will change the head and the Y position
function changeSnakePosition(){
    // value can be positive or negative to move snake head left or right
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
   

}

// creates event keydown and passes function keydown
document.body.addEventListener('keydown' , keyDown);

// listens for any key presses
function keyDown(event){
// this is a keyCode that can be googled, but it signifies 'up'
    if(event.keyCode == 38){
        // prevents you from moving down, and then up. 
        if(yVelocity == 1){
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }

    //this keycode implements the 'down' arrow
    if(event.keyCode == 40 ){
        // prevents you from moving up, and then down.
        if(yVelocity == -1){
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }

    // this keycode implements left
    if(event.keyCode == 37 ){
        // prevents you from moving left and then right. 
        if(xVelocity == 1){
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }

   // this keycode implements right
    if(event.keyCode == 39 ){
        // prevents you from moving right and then left. 
        if(xVelocity == -1){
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();

