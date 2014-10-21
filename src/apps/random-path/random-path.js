var imageData;
var width;
var height;
var c;
var pattern;

// source http://nbickford.wordpress.com/2013/05/19/hilberthilbert/

function createImageData(canvasId, rule) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");
	
	element.width = $(element).width();
	element.height = $(element).height();

	width = element.clientWidth;
	height = element.clientHeight;
	
	imageData = c.createImageData(1000, 1000);
	c.putImageData(imageData, 0, 0);
	
	pattern = new Array(width * height);

	anim();
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

function cosineInterpolate(x0, y0, x1, y1) {
	
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
			var mu = 0.5;
		    var mu2 = (1 - Math.cos(mu * 3.1415)) / 2;
		    var y = ((x-1) * (1 - mu2) + x * mu2);
			
			points.push(Math.round(x));
			points.push(Math.round(y));
		}
	} else {
		for (var i = 0; i < Math.abs(diffY); i++) {
			var y = y0 + i;
			var mu = 0.5;
		    var mu2 = (1 - Math.cos(mu * 3.1415)) / 2;
		    var x = ((y - 1) * (1 - mu2) + (y) * mu2);
			
			points.push(Math.round(x));
			points.push(Math.round(y));
		}
	}
	
	return points;
	
}

function drawLineBetweenPoints(p1x, p1y, p2x, p2y) {
	var pts = interpolate(p1x, p1y, p2x, p2y);
	for (var i = 0; i < pts.length; i += 2) {
		var x = pts[i];
		var y = pts[i + 1] % (height - 1);
		pattern[x + y * width] = 1;
	}
}

function createPatternHoriz() {
	var startHeight = randInt(0, height - 1);
	var step = 1;
	
	for (var i = 0; i < width; i++) {
		pattern[i + startHeight * width] = 1;
		startHeight += randInt(-step, step);
	}
}

function createPatternVert() {
	var startWidth = randInt(0, width - 1);
	var step = 1;
	
	for (var i = 0; i < height; i++) {
		pattern[startWidth + i * width] = 1;
		startWidth += randInt(-step, step);
	}
}

function createPattern2() {
	var startHeight = height/2;
	var step = 15;
	var nrOfPoints = 1000;
	var nextWidth = width/2;
	
	for (var i = 0; i < nrOfPoints; i++) {
		pattern[nextWidth + startHeight * width] = 1;
		startHeight += randInt(-step, step);
		nextWidth += randInt(-step, step);
	}
}

function createPattern3() {
	var startHeight = height/2;
	var step = 15;
	var nrOfPoints = 1000;
	var nextWidth = width/2;
	
	var lastx = nextWidth;
	var lasty = startHeight;
	
	for (var i = 0; i < nrOfPoints; i++) {
		pattern[nextWidth + startHeight * width] = 1;
		startHeight += randInt(-step, step);
		nextWidth += randInt(-step, step);
		
		drawLineBetweenPoints(lastx, lasty, nextWidth, startHeight);
		
		lastx = nextWidth;
		lasty = startHeight;
	}
}

function createPattern4() {
	var startHeight = height/2;
	var step = 5;
	var nrOfPoints = 1000;
	var nextWidth = width/2;
	
	var lastx = nextWidth;
	var lasty = startHeight;
	
	for (var i = 0; i < nrOfPoints; i++) {
		pattern[nextWidth + startHeight * width] = 1;
		var chooseF = randInt(0, 3);
		
		if (chooseF == 0) {
			startHeight -= step;
		} else if (chooseF == 1) {
			nextWidth += step;
		} else if (chooseF == 2){
			startHeight += step;
		} else {
			nextWidth -= step;
		}
		
		drawLineBetweenPoints(lastx, lasty, nextWidth, startHeight);
		
		lastx = nextWidth;
		lasty = startHeight;
	}
}

function anim() {
	createPatternVert();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var index = x + y * width;
			
			if (pattern[index] == 1)
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