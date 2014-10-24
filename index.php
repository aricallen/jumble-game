<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Jumble Race Game</title>
	<meta name="description" content="Simple jumble race game. Challenge your friends and see if you can solve the puzzles quicker than they can." />
	<link rel="canonical" href="http://www.curiousrhythms.com/jumble/index.html" />
	<meta property="og:title" content="Jumble Race Game" />
	<meta property="og:description" content="Simple jumble race game. Challenge your friends and see if you can solve the puzzles quicker than they can." />
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<script src="stopwatch.js"></script>
	<script src="script.js"></script>
	<link type="text/css" rel="stylesheet" href="style.css" />

<script type="text/javascript">
</script>

<style type="text/css">
</style>

</head>

<body>
<div id="container">
	<div id="header">Simple Jumble Race Game<br />
		<span style="font-size:.8em;">Challenge Your Friends To Beat Your Time</span></div> <!-- header -->
		<!-- options -->

	<div id="game-wrapper" class="hidden"><button id="revealButton" onclick="revealPuzzles()">Reveal Puzzles</button>
		<div id="stopWatchDiv" class="hidden">
			<span id="minutes" class="stopWatch"></span> :
			<span id="seconds" class="stopWatch"></span> :
			<span id="microseconds" class="stopWatch"></span>
		</div>
		<div id="friendTime" class="stopWatch hidden"></div>
		Click the button to the right to reveal puzzles and start timer.<br />
		Type in the correct word next to each puzzle. <br />
		The box to the right will turn green once the correct answer has been recognized.<br />
		Once all words are correct, the clock will stop.<br />
		<div id="puzzles" class="hidden">
		</div> <!-- puzzles -->
	</div><!-- game wrapper -->
	<div id="options">
			<div id="buttonWrapper">
			<button id="newChallengeButton" onclick="grabNewWords()">Start New Challenge</button>
			<button id="competeButton" onclick="showPasswordInput()">Race Friend's Time</button>
			<div id="sessionPasswordSection" class="hidden">
				Enter Session Password:
			<input type="text" id="sessionPassword" autofocus>
			<button id="submitPassword" onclick="grabFriendWords()">Submit</button>
			</div> <!-- session password -->
			</div><!--buttonWrapper-->
		</div> <!-- options -->
		<button id="playAgain" class="hidden" onclick="playAgain()">Play Again</button>
</div><!-- container -->
</body>
</html>