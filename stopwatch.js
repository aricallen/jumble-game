// Copyright (C)2007 Windy Road
// This work is licensed under a Creative Commons Attribution 2.5 License.  See http://creativecommons.org/licenses/by/2.5/au/
function StopWatch() {
	this.startTime = new Date();
	this.endTime = null;
	
	this.stop = function() {
		this.endTime = new Date();
	}

	this.reset = function() {
		this.startTime = new Date();
		this.endTime = null;
	}

	this.resume = function() {
		this.endTime = null;
	}
	
	this.duration = function() {
		if( this.endTime == null ) {
			this.stop();
			var rval = this.endTime-this.startTime;
			this.resume();
			return rval;
		}
		else {
			return this.endTime-this.startTime;
		}
	}
}

var stopWatch = new StopWatch();
var interval = null;

function startStopWatch() {
	stopWatch.reset();
	updateDisplay();
}

function stopStopWatch() {
	stopWatch.stop();
	clearTimeout( interval );
	updateDisplay();
	clearTimeout( interval );
}

function updateDisplay() {
	var ms = stopWatch.duration();
	var micro = Math.floor( ms / 10 ) % 100;
	if( micro < 10 )
		micro = '0' + micro;
	var sec = Math.floor( ms / 1000 ) % 60;
	if( sec < 10 )
		sec = '0' + sec;
	else sec = sec;
	var min = Math.floor( ms / 60000 );
	if( min < 10 )
		min = '0' + min;	
	else if( min < 100 )
		min = '0' + min;	
	document.getElementById( 'minutes' ).innerHTML = min;
	document.getElementById( 'seconds' ).innerHTML = sec;
	document.getElementById( 'microseconds' ).innerHTML = micro;
	interval = setTimeout( updateDisplay, 100 );
}


