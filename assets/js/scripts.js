// the document."_____" is used to apply javascript coding functions to classes that are on the HTML sheet
var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

// var - could also be referred to as 'let' - creating objects to interacts with
var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// using arrays to create blank spaces and letters ont he screen 
var lettersInChosenWord = [];
var blanksLetters = [];

// arrays of words that will be used in the game 
var words = ['rocky', 'shmocky', 'pizza', 'goodboy', 'peanutbutter', 'cutie'];

// the init function is activated when the page loads - INITIALIZE!!!
function init() {
    getWins();
    getlosses();
}

// the startGame function is made so that when the start button is clicked the game begins
function startGame() {
    isWin = false;
    timerCount = 15;
    // prevents the start button from being clicked while the game is in progress
    startButton.disabled = true;
    renderBlanks()
    startTimer()
}

// the winGame function is called when the win condition is met - WHEN USER WINS THE GAME
function winGame() {
    wordBlank.textContent = "🐕🐶HELL YEA!! YOU WON THE GAME!!!!🐶🐕"
    // 'wincounter ++' means that when you win it will add a number meaning it will GO UP - not DOWN
    winCounter++
    startButton.disabled = true;
    setWins()
}

// the loseGame function is used to let the user know they lost! KICKS IN WHEN THE TIMER IS 0
function loseGame() {
    wordBlank.textContent = "TRY AGAIN!🖕😢🖕"
    // 'losecounter ++' means that when you lose it will add a number meaning it will GO UP - not DOWN
    loseCounter++
    startButton.disabled = false;
    setLosses()
}

// the setTimer function STARTS AND STOPS the TIMER - also triggers the WINGAME and LOSEGAME functions
function startTimer() {
    // sets the timer
    timer = setInterval(function () {
        // 'timercount --' means that the clock will be decending - '++' would mean it goes up 
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // tests if the win condition is met
            if (isWin && timerCount > 0) {
                // clears interval(timer) and stops the timer
                clearInterval(timer);
                // wingame function will run because the win condition is met
                winGame();
            }
        }
        // 1000 miliseconds means the clock will count down in 1s intervals
    }, 1000);
}

// creates blanks on the screen for the user to fill out - GUESS THE WORDS
function renderBlanks() {
    // randomly picks words from the shmocky array above
    chosenWord = words[Math.floor(Math.random() * words.length)];
    // the letters in the words selected by array are being entered in using the 'split' function = how you enter things into an array in no specific order i.e. THE GAME
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanksLetters = []
    // uses loop to push blanks to 'blankLetters' array
    for (var i = 0; i < numBlanks; i++) {
        blanksLetters.push("_");
    }
    // converts the 'blankLetters' array into a string and renders it on the screen
    wordBlank.textContent = blanksLetters.join(" ")
}

// Updates WIN COUNT on the screen and SETS THE WIN COUNT TO CLIENT STORAGE - on the pc 
function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

// updates the LOSS COUNT on the screen and sets the lose count to the client storage - on the pc 
function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
}

// THESE FUNCTIONS ARE USED BY 'INIT' function -- MEANING, they load up when the page initializes - gonna load the wins on the page - using internal storage!!
function getWins() {
    // pull from stored value on the internal storage of the machine
    var storedWins = localStorage.getItem("winCount");
    // if the stored value doesn't exist, counter wil be 0
    if (storedWins === null) {
        winCounter = 0;
    } else {
        // IF THERE IS A VALUE in the client storage - winCounter object will reflect that accordingly
        winCounter = storedWins;
    }
    // RENDER WIN COUNT ON THE PAGE
    win.textContent = winCounter;
}

// same thing as the wins above ^^^
function getlosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        loseCounter = 0;        
    } else {
        loseCounter = storedLosses;
    }
    lose.textContent = loseCounter;
}

// This is the function used to make the user WIN THE GAME - see if win conditions are being met
function checkWin() {
    // If the word equals whats in the 'blankLetters' array when converted to string, THEN 'isWin' function is set to TRUE 
    if (chosenWord === blanksLetters.join("")) {
        // This value is used in the timer function to test if win condition is met
        isWin = true;
    }
}

// Tests IF the guessed letter in the word - THEN it renders it on the screen
function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    //  var 'j' is the same thing as var 'i' but since its in the same function we choose a new letter to represent the different index
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanksLetters[j] = letter;
            }
        }
        wordBlank.textContent = blanksLetters.join(" ");
    }
}


startButton.addEventListener("click", startGame);