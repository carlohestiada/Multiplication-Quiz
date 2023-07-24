//enter multiple values in textbox
function appendValue(value) {
    document.getElementById("result").value += value;
}

//clear content in textbox
function clearContent() {
    document.getElementById("result").value = '';
}

var challengeCompleted = 0; //track the number of challenge completed
var timerElement = document.getElementById("timer");
var timerInterval;

//generate random multiplication numbers
function newChallenge() {
    if (challengeCompleted < 10) { //check if the maximum number of chalenge reached
    var num1 = Math.floor(Math.random () * 10) + 1; 
    var num2 = Math.floor(Math.random () * 10) + 1;
    
    var multiplyChallenge = num1 + " x " + num2;
    document.getElementById("multiplyChallenge").textContent = multiplyChallenge;
    challengeCompleted++;

    startTimer();
    }
}

//start timer
function startTimer() {
    var time = 0;
    timerElement.textContent = "Timer: " + time;

    timerInterval = setInterval(function() {
        time++;
        timerElement.textContent = "Timer: " + time;
    }, 1000);
}

//stop timer
function stopTimer() {
    clearInterval(timerInterval);
}

var wrongAnswers = 1; //track the number of wrong answers
var correctAnswers = 1; //track the number of Correct answers
var points = 0; //store points


// check if the answer Correct or Wrong
function submitAnswer() {
    var multiplyChallenge = document.getElementById("multiplyChallenge").textContent;
    var result = parseInt(document.getElementById("result").value);
    var prompt = document.getElementById("prompt");
    var enterButton = document.getElementById("enterButton");
    
    var snum = multiplyChallenge.split(" x ");
    var num1 = parseInt(snum[0]);
    var num2 = parseInt(snum[1]);

    if (result === num1 * num2) {
        prompt.textContent = "Correct";
        var correctCount = document.getElementById("correctCount");
        correctCount.textContent = correctAnswers;
        enterButton.disabled = true; // Disable the Enter button
        correctAnswers++;
        points += 10;
        if (correctAnswers === 10) {
           var scoreElement = document.getElementById("score");
           scoreElement.textContent = "score: " + points + "/100"; //display score/points
           setTimeout(function() {
            correctAnswers = 0;//reset the wrong numbers
        }, 2000);
        }
        setTimeout(function() {
            prompt.textContent = "";
            document.getElementById("result").value = "";
            enterButton.disabled = false; // re-enable the button after 2 seconds
        }, 2000); // 4000 milliseconds = 2 seconds
    }
    else {
        prompt.textContent = "Wrong";
        var wrongCount = document.getElementById("wrongCount");
        wrongCount.textContent = wrongAnswers;
        enterButton.disabled = true; // Disable the Enter button
        wrongAnswers++; //increment the wrong answers
        if (wrongAnswers === 5) {
            var scoreElement = document.getElementById("score");
           scoreElement.textContent = "score: " + points + "/100"; //display score/points
            wrongCount.textContent = "Game Over";
            enterButton.disabled = true;// Disable the Enter button
            setTimeout(function() {
                wrongAnswers = 0;//reset the wrong numbers
            }, 2000);
        }
        setTimeout(function() {
            prompt.textContent = "";
            document.getElementById("result").value = "";
            enterButton.disabled = false; // re-enable the button after 2 seconds
        }, 2000); // 4000 milliseconds = 2 seconds
    }

    // generate new multiplication challenge
    newChallenge(); 
}
