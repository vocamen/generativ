var imageData;
var width;
var height;
var c;
var patternW = 0;
var patternH = 0;
var pattern;
var twillPattern = "3/3/2"; // filled/empty/shift 
var twillPattern2 = "3/3/0,2,4,0,2,4"; //filled/empty/shift pattern

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(1000, 1000);
	
	patternH = 300;
	patternW = 300;
	
	pattern = new Array(patternH);
	for (var i = 0; i < patternW; i++) {
		pattern[i] = new Array(patternW);
	}
	
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function createPattern() {
	var parts = twillPattern.split("/");
	var fillNr = parseInt(parts[0]);
	var emptyNr = parseInt(parts[1]);
	var rot = parseInt(parts[2]);
	
	for (var j = 0; j < patternW; j++) {
		var mj = j % (fillNr + emptyNr);
		
		if (mj < fillNr)
			pattern[0][j] = 1;
		else
			pattern[0][j] = 0;
	}
	
	for (var i = 1; i < patternH; i++) {
		for (var j = 0; j < patternW; j++) {
			pattern[i][(j + rot) % patternW] = pattern[i-1][j];
		}
	}
	
}

function createPattern2() {
	var parts = twillPattern2.split("/");
	var fillNr = parseInt(parts[0]);
	var emptyNr = parseInt(parts[1]);
	var rotParts = parts[2].split(",");
	
	for (var j = 0; j < patternW; j++) {
		var mj = j % (fillNr + emptyNr);
		
		if (mj < fillNr)
			pattern[0][j] = 1;
		else
			pattern[0][j] = 0;
	}
	
	for (var i = 1; i < patternH; i++) {
		for (var j = 0; j < patternW; j+=1) {
			var shiftAmount = parseInt(rotParts[i % rotParts.length]);
			pattern[i][(j + shiftAmount) % patternW] = pattern[i-1][j];
		}
	}
}


function shiftArray(arr, shift) {
	while (shift--) {
		arr.unshift(arr.pop());
	}
}

function anim() {
	createPattern2();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	
	for (var x = 0; x < patternW; x++) {
		for (var y = 0; y < patternH; y++) {
			var rr = (1 - parseInt(pattern[y][x])) * 255;
			setPixel(imageData, x, y, rr, rr, rr, 255);
		}
	}
}

function setPixel(imageData, x, y, r, g, b, a) {
    var index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}