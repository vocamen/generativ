var testText = 'w1 w2 w3 w4 w1 w3 w2 w1 w1 w2 w4 w2 w7 w3 w1';

var test1x1 = '"{"w1":["w2","w3","w1","w2"],"w2":["w3","w1","w4","w7"],"w3":["w4","w2","w1"],"w4":["w1","w2"],"w7":["w3"]}"';
var test1x2 = '"{"w1":["w2 w3","w3 w2","w1 w2","w2 w4"],"w2":["w3 w4","w1 w1","w4 w2","w7 w3"],"w3":["w4 w1","w2 w1"],"w4":["w1 w3","w2 w7"],"w7":["w3 w1"]}"';
var test1x3 = '"{"w1":["w2 w3 w4","w3 w2 w1","w1 w2 w4","w2 w4 w2"],"w2":["w3 w4 w1","w1 w1 w2","w4 w2 w7","w7 w3 w1"],"w3":["w4 w1 w3","w2 w1 w1"],"w4":["w1 w3 w2","w2 w7 w3"]}"'; 
var test1x4 = '"{"w1":["w2 w3 w4 w1","w3 w2 w1 w1","w1 w2 w4 w2","w2 w4 w2 w7"],"w2":["w3 w4 w1 w3","w1 w1 w2 w4","w4 w2 w7 w3"],"w3":["w4 w1 w3 w2","w2 w1 w1 w2"],"w4":["w1 w3 w2 w1","w2 w7 w3 w1"]}"';
var test2x1 = '"{"w1 w2":["w3","w4"],"w2 w3":["w4"],"w3 w4":["w1"],"w4 w1":["w3"],"w1 w3":["w2"],"w3 w2":["w1"],"w2 w1":["w1"],"w1 w1":["w2"],"w2 w4":["w2"],"w4 w2":["w7"],"w2 w7":["w3"],"w7 w3":["w1"]}"';
var test2x2 = '"{"w1 w2":["w3 w4","w4 w2"],"w2 w3":["w4 w1"],"w3 w4":["w1 w3"],"w4 w1":["w3 w2"],"w1 w3":["w2 w1"],"w3 w2":["w1 w1"],"w2 w1":["w1 w2"],"w1 w1":["w2 w4"],"w2 w4":["w2 w7"],"w4 w2":["w7 w3"],"w2 w7":["w3 w1"]}"';
var test2x3 = '"{"w1 w2":["w3 w4 w1","w4 w2 w7"],"w2 w3":["w4 w1 w3"],"w3 w4":["w1 w3 w2"],"w4 w1":["w3 w2 w1"],"w1 w3":["w2 w1 w1"],"w3 w2":["w1 w1 w2"],"w2 w1":["w1 w2 w4"],"w1 w1":["w2 w4 w2"],"w2 w4":["w2 w7 w3"],"w4 w2":["w7 w3 w1"]}"';
var test2x4 = '"{"w1 w2":["w3 w4 w1 w3","w4 w2 w7 w3"],"w2 w3":["w4 w1 w3 w2"],"w3 w4":["w1 w3 w2 w1"],"w4 w1":["w3 w2 w1 w1"],"w1 w3":["w2 w1 w1 w2"],"w3 w2":["w1 w1 w2 w4"],"w2 w1":["w1 w2 w4 w2"],"w1 w1":["w2 w4 w2 w7"],"w2 w4":["w2 w7 w3 w1"]}"';
var test3x1 = '"{"w1 w2 w3":["w4"],"w2 w3 w4":["w1"],"w3 w4 w1":["w3"],"w4 w1 w3":["w2"],"w1 w3 w2":["w1"],"w3 w2 w1":["w1"],"w2 w1 w1":["w2"],"w1 w1 w2":["w4"],"w1 w2 w4":["w2"],"w2 w4 w2":["w7"],"w4 w2 w7":["w3"],"w2 w7 w3":["w1"]}"';
var test3x2 = '"{"w1 w2 w3":["w4 w1"],"w2 w3 w4":["w1 w3"],"w3 w4 w1":["w3 w2"],"w4 w1 w3":["w2 w1"],"w1 w3 w2":["w1 w1"],"w3 w2 w1":["w1 w2"],"w2 w1 w1":["w2 w4"],"w1 w1 w2":["w4 w2"],"w1 w2 w4":["w2 w7"],"w2 w4 w2":["w7 w3"],"w4 w2 w7":["w3 w1"]}"';
var test3x3 = '"{"w1 w2 w3":["w4 w1 w3"],"w2 w3 w4":["w1 w3 w2"],"w3 w4 w1":["w3 w2 w1"],"w4 w1 w3":["w2 w1 w1"],"w1 w3 w2":["w1 w1 w2"],"w3 w2 w1":["w1 w2 w4"],"w2 w1 w1":["w2 w4 w2"],"w1 w1 w2":["w4 w2 w7"],"w1 w2 w4":["w2 w7 w3"],"w2 w4 w2":["w7 w3 w1"]}"';
var test3x4 = '"{"w1 w2 w3":["w4 w1 w3 w2"],"w2 w3 w4":["w1 w3 w2 w1"],"w3 w4 w1":["w3 w2 w1 w1"],"w4 w1 w3":["w2 w1 w1 w2"],"w1 w3 w2":["w1 w1 w2 w4"],"w3 w2 w1":["w1 w2 w4 w2"],"w2 w1 w1":["w2 w4 w2 w7"],"w1 w1 w2":["w4 w2 w7 w3"],"w1 w2 w4":["w2 w7 w3 w1"]}"';
var test4x1 = '"{"w1 w2 w3 w4":["w1"],"w2 w3 w4 w1":["w3"],"w3 w4 w1 w3":["w2"],"w4 w1 w3 w2":["w1"],"w1 w3 w2 w1":["w1"],"w3 w2 w1 w1":["w2"],"w2 w1 w1 w2":["w4"],"w1 w1 w2 w4":["w2"],"w1 w2 w4 w2":["w7"],"w2 w4 w2 w7":["w3"],"w4 w2 w7 w3":["w1"]}"';
var test4x2 = '"{"w1 w2 w3 w4":["w1 w3"],"w2 w3 w4 w1":["w3 w2"],"w3 w4 w1 w3":["w2 w1"],"w4 w1 w3 w2":["w1 w1"],"w1 w3 w2 w1":["w1 w2"],"w3 w2 w1 w1":["w2 w4"],"w2 w1 w1 w2":["w4 w2"],"w1 w1 w2 w4":["w2 w7"],"w1 w2 w4 w2":["w7 w3"],"w2 w4 w2 w7":["w3 w1"]}"';
var test4x3 = '"{"w1 w2 w3 w4":["w1 w3 w2"],"w2 w3 w4 w1":["w3 w2 w1"],"w3 w4 w1 w3":["w2 w1 w1"],"w4 w1 w3 w2":["w1 w1 w2"],"w1 w3 w2 w1":["w1 w2 w4"],"w3 w2 w1 w1":["w2 w4 w2"],"w2 w1 w1 w2":["w4 w2 w7"],"w1 w1 w2 w4":["w2 w7 w3"],"w1 w2 w4 w2":["w7 w3 w1"]}"';
var test4x4 = '"{"w1 w2 w3 w4":["w1 w3 w2 w1"],"w2 w3 w4 w1":["w3 w2 w1 w1"],"w3 w4 w1 w3":["w2 w1 w1 w2"],"w4 w1 w3 w2":["w1 w1 w2 w4"],"w1 w3 w2 w1":["w1 w2 w4 w2"],"w3 w2 w1 w1":["w2 w4 w2 w7"],"w2 w1 w1 w2":["w4 w2 w7 w3"],"w1 w1 w2 w4":["w2 w7 w3 w1"]}"';

function startTests() {
	
	recreate(20, testText, 1, 1);
	var rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test1x1) {
		printResult("Failed @ 1x1!");
		return;
	}
	
	recreate(20, testText, 1, 2);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test1x2) {
		printResult("Failed @ 1x2!");
		return;
	}
	
	recreate(20, testText, 1, 3);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test1x3) {
		printResult("Failed @ 1x3!");
		return;
	}
	
	recreate(20, testText, 1, 4);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test1x4) {
		printResult("Failed @ 1x4!");
		return;
	}
	
	recreate(20, testText, 2, 1);
	var rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test2x1) {
		printResult("Failed @ 2x1!");
		return;
	}
	
	recreate(20, testText, 2, 2);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test2x2) {
		printResult("Failed @ 2x2!");
		return;
	}
	
	recreate(20, testText, 2, 3);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test2x3) {
		printResult("Failed @ 2x3!");
		return;
	}
	
	recreate(20, testText, 2, 4);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test2x4) {
		printResult("Failed @ 2x4!");
		return;
	}
	
	recreate(20, testText, 3, 1);
	var rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test3x1) {
		printResult("Failed @ 3x1!");
		return;
	}
	
	recreate(20, testText, 3, 2);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test3x2) {
		printResult("Failed @ 3x2!");
		return;
	}
	
	recreate(20, testText, 3, 3);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test3x3) {
		printResult("Failed @ 3x3!");
		return;
	}
	
	recreate(20, testText, 3, 4);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test3x4) {
		printResult("Failed @ 3x4!");
		return;
	}
	
	recreate(20, testText, 4, 1);
	var rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test4x1) {
		printResult("Failed @ 4x1!");
		return;
	}
	
	recreate(20, testText, 4, 2);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test4x2) {
		printResult("Failed @ 4x2!");
		return;
	}
	
	recreate(20, testText, 4, 3);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test4x3) {
		printResult("Failed @ 4x3!");
		return;
	}
	
	recreate(20, testText, 4, 4);
	rez = "\"" + JSON.stringify(wordDict) + "\"";
	if (rez !== test4x4) {
		printResult("Failed @ 4x4!");
		return;
	}
	
	printResult("Passed");
}

function printResult(message) {
	var $div = $('<div>', {
	    'id':'dashboard'
	}).appendTo('body');

	$("<h1></h1>").text(message).appendTo($div);
}