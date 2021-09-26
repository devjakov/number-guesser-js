//GAME FUNCTION
// - Player must guess a number between min and max
// - Player gets a certain amount of guesses
// - Notify player of guesses remaining
// - Notify player of correct answer if he looses
// - Let player choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.getElementById('guess-btn'),
    guessInput = document.getElementById('guess-input'),
    message = document.querySelector('.message');

// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listen
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);
    
    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }  

    // check if won
    if(guess === winningNum){
        // Game over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else {
        // Wrong number
        if(guessesLeft > 0){guessesLeft -= 1;}
            if(guessesLeft === 0){
                // Game over - Lost
                gameOver(false, `Game Over, but try again! || The correct number was ${winningNum}`)
            } else {
                // Game continues - Wrong answer
                guessInput.style.borderColor = 'red';

                guessInput.value = '';

                // Tell user wrong guess
                setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left.`, 'red');
            }
 }
});

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    // Set message
    setMessage(msg, color);

    // Play again?
    guessBtn.value = 'Play again?';
    guessBtn.className += 'play-again';
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    guessInput.style.borderColor = color;
    message.textContent = msg;
}

// Get winning num
function getRandomNum(min, max){
    return Math.ceil(Math.random()*(max*min-1)+min);
}