/*** custom script ***/

// global array of words to build jumbles out of
var sessionName = "";
var wordArray = [];
var jumbleArray = [];
var friendTime = [];
var isChallenge = false;

function setupDOM() {
      // set up the DOM 
    for (i=0; i< wordArray.length; i++){
        $('#puzzles').append('<div id="jumble'+i+'" class="jumble"></div>');
        $('#jumble'+i).append('<input id="input'+i+'" type=text size="10" oninput="checkAnswers()">');
        $('#jumble'+i).append('<div id="answer'+i+'" class="hidden" ></div>');
    }
    
    var wordsLeft = wordArray.length;
    for (x = 0; x < wordsLeft; x++) {
        createPuzzle(String(wordArray[x]), x);
    }
}

function grabNewWords() {
    // start new challenge has been selected
    $('#game-wrapper').removeClass('hidden');
    $('#options').addClass('hidden');
    $('#sessionPasswordSection').addClass('hidden');
    var dataString = {};
    $.ajax( {
    	type: 'POST',
        url: "/jumble/word-grabber.php",
        data: dataString, 
        success: function(data) {
            // build word array
            wordArray = JSON.parse(data);
            setupDOM();
        } // success
	}); // ajax
}

function showPasswordInput() {
    $('#sessionPasswordSection').removeClass('hidden');
}

function displayFriendTime() {
    var mins = friendTime['minutes'];
    var secs = friendTime['seconds'];
    var micros = friendTime['microseconds'];
    //console.log(mins+":"+secs+":"+micros);
    $('#friendTime').append("Time to beat = "+mins+":"+secs+":"+micros);
}

function grabFriendWords() {
    isChallenge = true;
    $('#friendTime').removeClass('hidden');
    // grab password
    // pass along to session-handler
    var sessionPassword = $('#sessionPassword').val();
    var dataString = "session_password="+sessionPassword;
    $.ajax( {
    	type: 'POST',
        url: "/jumble/session-grabber.php",
        data: dataString, 
        success: function(data) {
            // data returned is a JSON object with 2 arrays
            if(!data) {
                console.log("session doesn't exist");
            } else {
                $('#game-wrapper').removeClass('hidden');
                $('#options').addClass('hidden');
                var dataArray = JSON.parse(data);
                wordArray = dataArray['sessionWords'];
                jumbleArray = dataArray['sessionJumbles'];
                friendTime = dataArray['sessionTime'];
                displayFriendTime();
                setupDOM();
            }
        } // success
	}); // ajax
}

function displayPlayAgainButton() {
    $('#playAgain').removeClass('hidden');
}

function buildSessionFile() {
    var mins = parseInt($('#minutes').text());
    var secs = parseInt($('#seconds').text());
    var micros = parseInt($('#microseconds').text());
    var timeArray = {
        "minutes":mins, 
        "seconds":secs, 
        "microseconds":micros
    }
    for (i=0;i<4;i++){
        sessionName = sessionName + Math.floor(Math.random()*10);
    }
    var dataArray = {
        "sessionName":sessionName,
        "sessionTime":timeArray,
        "sessionWords":wordArray,
        "sessionJumbles":jumbleArray
    };
    $.ajax( {
    	type: 'POST',
        url: "/jumble/session-writer.php",
        // dataType:'json',
        data: { dataArray : dataArray }, 
        success: function(data) {
            alert("Let a friend try to beat your time.\nShare this password with them: "+sessionName);
            displayPlayAgainButton();
        } // success
	}); // ajax
}

function fillInPuzzle(word, index) {
    for (i=0; i < word.length; i++){
        $('#jumble'+index).append('<span class="letterBox">'+word[i]+'</span>');
    }
    $('#jumble'+index).append('<span class="correctBox wrong"></span>');
}

function createPuzzle(word, index) {
    // grab random word with ajax
    word = word.replace("\n", "");
    word = word.replace(" ", "");
    var letters = word.split("");
    var lettersLeft = letters.length;
    var jumbled = "";
    // grab random letter and begin building new string
    // can only use each letter once
    for (i=lettersLeft; i > 0; i--){
        var randomIndex = Math.floor(Math.random()*i);
        var nextLetter = letters.splice(randomIndex, 1);
        jumbled = jumbled+nextLetter;
    }
    
    jumbleArray.push(jumbled);
    fillInPuzzle(jumbled, index);
    $('#answer'+index).text(word);
}

// bind click function to autofocus on first input
$(document).ready(function() {
    $('#revealButton').click(function(){
        $('#input0').focus();
    });
});

function revealPuzzles() {
    $('#puzzles').removeClass('hidden');
    $('#stopWatchDiv').removeClass('hidden');
    $('#sessionPasswordSection').addClass('hidden');
    $('#revealButton').addClass('hidden');
    
    // start clock
    startStopWatch();
}

function compareTimes() {
    // compare times and display who won
    // alert("You Won! \nRefresh your browser to play again.");
    var mins = parseInt($('#minutes').text());
    var secs = parseInt($('#seconds').text());
    var micros = parseInt($('#microseconds').text());
    var totalTime = (mins * 60) + secs + (micros/100);
    
    var fmins = parseInt(friendTime['minutes']);
    var fsecs = parseInt(friendTime['seconds']);
    var fmicros = parseInt(friendTime['microseconds']);
    var totalFriendTime = (fmins * 60) + fsecs + (fmicros/100);
    var message = "";
    if(totalTime < totalFriendTime) {
        message = "You Won! Way to go!\nPlay again?";
    } else {
        message = "Sorry, too slow. You lose.\nPlay again?";
    }
    
    var r=confirm(message);
    if (r) {
        location.reload();
    } else {
        displayPlayAgainButton();
    }
    
}

function playAgain() {
    location.reload();
}

function checkForAllCorrect(){
    var numCorrect = 0;
    var boxes = $('.correct');
    var allPuzzles = wordArray.length;
    //console.log(boxes.length);
    //console.log(allPuzzles);
    numCorrect = boxes.length;
    if(numCorrect == allPuzzles){
        stopStopWatch();
        
        if(isChallenge){
            compareTimes();
        } else {
            buildSessionFile();
        }
    }
}

function checkAnswers() {
    for (i=0; i< wordArray.length; i++) {
        // grab input value
        
        var input = $('#input'+i).val();
        var answer = $('#answer'+i).text();
        if(input == answer) {
            //console.log("correct");
            // change correctBox to green
            $('#jumble'+i+' span.correctBox').removeClass('wrong');
            $('#jumble'+i+' span.correctBox').addClass('correct');
        } else {
            // do nothing
            $('.correctBox'+i).addClass('wrong');
        }
    }

    checkForAllCorrect()
}






