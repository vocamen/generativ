var wordDict = {};

var helpMessage = "scan the input text and extract words;\n" + 
				  "organize words in lists like 'LEFT' words followed by 'RIGHT' words 1, 'RIGHT' words 2 ...;\n" +
				  "init: select some random 'LEFT' words and any of the following 'RIGHT' words;\n" + 
				  "start: print 'LEFT' words + 'RIGHT' words;\n" + 
				  "		  then 'RIGHT' words become 'LEFT' words;\n" + 
				  "		  repeat start: until max length;\n\n\n" + 		
				  "Example: input text = 'w1 w2 w3 w4 w1 w3 w2 w1 w1 w2 w4 w2 w7 w3 w1'\n\n" +
		 		  "Nr of left words = 3; nr of right words = 1;\n" +
		 		  "words lists: 'w1 w2 w3' -> 'w4'; 'w2 w3 w4' -> 'w1'; 'w3 w4 w1' -> 'w3' ..... 'w2 w7 w3' -> 'w1'\n\n" +
				  "Nr of left words = 1; nr of right words = 2;\n" + 
		 		  "words lists: 'w1' -> 'w2 w3'; 'w2' -> 'w2 w4'; 'w3' -> 'w4 w1' ..... 'w7' -> 'w3 w1'";

function parseText(text, leftWords, rightWords) {
	wordDict = {};
    var textParts = text.split(/\s+/);
    
    for (var i = 0; i < textParts.length - (leftWords + rightWords - 1); i++) {
		var leftStr = "";
		for (var li = 0; li < leftWords; li++) {
			leftStr += textParts[i + li].trim() + " ";
		}
		leftStr = leftStr.trim();
		
		var rightStr = "";
		for (var ri = 0; ri < rightWords; ri++) {
			rightStr += textParts[i + leftWords + ri].trim() + " ";
		}
		rightStr = rightStr.trim();
		
		if (wordDict[leftStr] === undefined) {
			wordDict[leftStr] = [];
		}
		
		wordDict[leftStr].push(rightStr);
	}
}

function recreate(maxLength, inputText, leftWordsNr, rightWordsNr) {
	
	if (leftWordsNr < 1)
		leftWordsNr = 1;
	
	if (rightWordsNr < 1)
		rightWordsNr = 1;
	
	if (inputText === "") {
		alert("Input text is empty !");
		return;
	}
	
	inputText = inputText.replace(/[^A-Za-z0-9\-\s]+/gi, " "); 
	inputText = inputText.replace(/\s+/gi, " "); 
	
	parseText(inputText, leftWordsNr, rightWordsNr);
	
	var wordKeys = Object.keys(wordDict);
	var startWords = wordKeys[randInt(0, wordKeys.length - 1)];
	var nextWords = wordDict[startWords][randInt(0, wordDict[startWords].length - 1)];
	var genText = startWords + " ";
	
	while (genText.length < maxLength) {
		var newWords = startWords + " " + nextWords;
		
		genText += nextWords + " ";
		
		var newWordsParts = newWords.split(/\s+/);
		var newKey = newWordsParts.slice(rightWordsNr);
		var newKeyStr = "";
		
		for (var i = 0; i < newKey.length; i++) {
			newKeyStr += newKey[i] + " ";
		}
		
		startWords = newKeyStr.trim();
		
		if (wordDict[startWords] === undefined) {
			startWords = wordKeys[randInt(0, wordKeys.length - 1)];
		}
		
		nextWords = wordDict[startWords][randInt(0, wordDict[startWords].length - 1)];
	}
	
	genText = genText.trim();
	
	$('#output').val(genText);
}

function showHelpMessage() {
	alert(helpMessage);
}
