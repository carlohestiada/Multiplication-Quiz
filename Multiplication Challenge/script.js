    //enter multiple values in textbox
    function appendValue(value) {
        document.getElementById("result").value += value;
    }

    //clear content in textbox
    function clearContent() {
        document.getElementById("result").value = '';
    }

    function challengeEnd() {
        var scoreElement = document.getElementById("score");
        scoreElement.textContent = "Score: " + points;

        // Hide the multiplication challenge display
        var multiplyChallenge = document.getElementById("multiplyChallenge");
        multiplyChallenge.textContent = "";

        // Hide the input and buttons
        var mcAnswer = document.querySelector(".mcAnswer");
        mcAnswer.style.display = "none";

        // Show the score container
        var scoreContainer = document.querySelector(".scoreContainer");
        scoreContainer.style.display = "block";

        // Show the "Restart" button
        var restartButton = document.getElementById("restartButton");
        restartButton.style.display = "block";

        // Update the current score
        var scoreText = document.getElementById("scoreText");
        scoreText.display = "flex";
        scoreText.textContent = "Your Score is: " + points;

        // Hide the "Score" section
        var scoreElement = document.getElementById("score");
        scoreElement.style.display = "none";
    }

    var challengeCompleted = 0; //track the number of challenge completed
    var timerElement = document.getElementById("timer");
    var timerInterval;

    //generate random multiplication numbers
    function newChallenge() {
            var num1 = Math.floor(Math.random () * 10) + 1; 
            var num2 = Math.floor(Math.random () * 10) + 1;
            
            var multiplyChallenge = num1 + " x " + num2;
            document.getElementById("multiplyChallenge").textContent = multiplyChallenge;
            challengeCompleted++;

            startTimer();
    }

    var timerInterval;
    var timeLeft = 50;
    var timerRunning = false;

    //start timer
    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            var timerElement = document.getElementById("timer");
            timerElement.textContent = "Timer: " + timeLeft;

            timerInterval = setInterval(function() {

                if (timeLeft > 0) {
                    timeLeft--;
                    timerElement.textContent = "Timer: " + timeLeft;
                }
                else {
                    clearInterval(timerInterval);
                    challengeEnd();
                }
            }, 1000);
        }
    }

    //stop timer
    function stopTimer() {
        clearInterval(timerInterval);
    }   

    var wrongAnswers = 1; //track the number of wrong answers
    var correctAnswers = 1; //track the number of Correct answers
    var points = 10; //store points


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
            var scoreCount = document.getElementById("scoreCount");
            scoreCount.textContent = points;
            var correctCount = document.getElementById("correctCount");
            correctCount.textContent = correctAnswers;
            enterButton.disabled = true; // Disable the Enter button
            correctAnswers++;
            points += 10;
            setTimeout(function() {
                prompt.textContent = "";
                document.getElementById("result").value = "";
                enterButton.disabled = false; // re-enable the button after 2 seconds
                startTimer();
            }, 1000); // 4000 milliseconds = 2 seconds
        }
        else {
            prompt.textContent = "Wrong";
            var wrongCount = document.getElementById("wrongCount");
            wrongCount.textContent = wrongAnswers;
            enterButton.disabled = true; // Disable the Enter button
            wrongAnswers++; //increment the wrong answers
            setTimeout(function() {
                prompt.textContent = "";
                document.getElementById("result").value = "";
                enterButton.disabled = false; // re-enable the button after 2 seconds
                startTimer();
            }, 1000); // 4000 milliseconds = 2 seconds
        }

        // generate new multiplication challenge
        newChallenge(); 
    }

    function restartGame() {
        // Reset all the variables and counters
        challengeCompleted = 0;
        timeLeft = 50;
        wrongAnswers = 1;
        correctAnswers = 1;
        points = 0;

        // Clear the displayed results and messages
        document.getElementById("multiplyChallenge").textContent = "";
        document.getElementById("prompt").textContent = "";
        document.getElementById("correctCount").textContent = "0";
        document.getElementById("wrongCount").textContent = "0";
        document.getElementById("score").textContent = "Score: 0";
        document.getElementById("timer").textContent = "Timer: 50";
        document.getElementById("result").value = "";

        // Enable the "Enter" button
        document.getElementById("enterButton").disabled = false;

        // Show the multiplication challenge display
        var multiplyChallenge = document.getElementById("multiplyChallenge");
        multiplyChallenge.style.display = "flex";

        // Show the input and buttons
        var mcAnswer = document.querySelector(".mcAnswer");
        mcAnswer.style.display = "block";

        // Hide the score container
        var scoreContainer = document.querySelector(".scoreContainer");
        scoreContainer.style.display = "none";

        // Hide the "Restart" button
        var restartButton = document.getElementById("restartButton");
        restartButton.style.display = "none";

        // Reset the displayed score
        var scoreText = document.getElementById("scoreText");
        scoreText.textContent = "Your Score is: 0/200";

        // Show the "Score" section
        var scoreElement = document.getElementById("score");
        scoreElement.style.display = "block";

        // Start a new challenge
        newChallenge();

        // Restart the timer
        clearInterval(timerInterval);
        timerRunning = false;
        startTimer();
    }