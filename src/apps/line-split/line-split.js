var imageData;
var width;
var height;
var c;
var patternH = 0;
var patternW = 0;
var pattern = [];
var topXPoints = [];

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
	
	initPatterns();
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function interpolate(x0, y0, x1, y1) {
	if (x0 > x1) { //|| y0 > y1) {
		var tmp = x0;
		x0 = x1;
		x1 = tmp;
		tmp = y0;
		y0 = y1;
		y1 = tmp;
	}
	
	var points = [];
	var diffX = Math.abs(x1 - x0);
	var diffY = Math.abs(y1 - y0);
	
	if (diffX >= diffY) {
		//interpolate y
		for (var i = 0; i < Math.abs(diffX); i++) {
			var x = x0 + i;
			var y = y0 + (y1 - y0) * (x -x0) / (x1 - x0);
			points.push(Math.round(x));
			points.push(Math.round(y));
		}
	} else {
		for (var i = 0; i < Math.abs(diffY); i++) {
			var y = y0 + i;
			var x = x0 + (y - y0) * (x1 -x0) / (y1 - y0);
			points.push(Math.round(x));
			points.push(Math.round(y));
		}
	}
	
	return points;
}

function drawLineBetweenPoints() {
	var tx1 = randInt(0, patternW - 1);
	var ty1 = randInt(0, patternH - 1);
	
	var tx2 = randInt(0, patternW - 1);
	var ty2 = randInt(0, patternH - 1);
	
//	if (pattern[ty1][tx1] === 1 && pattern[ty2][tx2] === 1) {
		var pts = interpolate(tx1, ty1, tx2, ty2);
		for (var i = 0; i < pts.length; i+=2) {
			var x = pts[i];
			var y = pts[i+1] % (patternH - 1);
			//console.log(x + " ---- " + y + " ---- " + tx1 + " ---- " + ty1 + " ---- " + tx2 + " ---- " + ty2);
			pattern[y][x] = 1;
		}
//	}
}

function initPatterns() {
	topXPoints.push(0);
	
	for (var i = 0; i < patternW; i++) {
		var saved = false;
		if (randInt(0, 200) < 5) {
			topXPoints.push(i);
			saved = true;
		} 
		for (var j = 0; j < patternH; j++) {
			if (saved)
				pattern[j][i] = 0; //TODO
			else
				pattern[j][i] = 0;
		}
	}
}

function setHorizLines() {
	var rx = randInt(0, patternW - 1);
	var ry = randInt(0, patternH - 1);
	
	for (var i = rx; i < patternW; i++) {
		if (pattern[ry][i] === 1) {
			for (var k = i + 1; k < patternW; k++) {
				if (pattern[ry][k] === 1)
					break;
				else
					pattern[ry][k] = 1;
			}
			break;
		}
	}
}

function setVertLines() {
	var rx = randInt(0, patternW - 1);
	var ry = randInt(0, patternH - 1);
	
	for (var i = ry; i < patternH; i++) {
		if (pattern[i][rx] === 1) {
			for (var k = i + 1; k < patternH; k++) {
				if (pattern[k][rx] === 1)
					break;
				else
					pattern[k][rx] = 1;
			}
			break;
		}
	}
}

function createPattern() {
	for (var i = 0; i < 50; i++) { //TODO
		drawLineBetweenPoints();
	}
	for (var i = 0; i < 50; i++) {
		setHorizLines();
	}
	for (var i = 0; i < 50; i++) {
		setVertLines();
	}
	for (var i = 0; i < 50; i++) {
		setHorizLines();
	}
	
}

function anim() {
	createPattern();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < patternW; x++) {
		for (var y = 0; y < patternH; y++) {
			index = x + y * patternW;
			
			if (pattern[y][x] === 1)
				setPixel(imageData, x, y, 0, 0, 0, 255);
			else
				setPixel(imageData, x, y, 255, 255, 255, 255);
		}
	}
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}