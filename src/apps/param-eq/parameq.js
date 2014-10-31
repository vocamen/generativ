/*
 * Supershapes / Superformula / super ellipse
 *  x = pow(pow(abs(cos(m*t/4)/a),n2)+pow(abs(sin(m*t/4)/b),n3),neg(1)/n1) * cos(t)
	y = pow(pow(abs(cos(m*t/4)/a),n2)+pow(abs(sin(m*t/4)/b),n3),neg(1)/n1) * sin(t)
 * 
 */


var imageData;
var width;
var height;
var context;
var cellData;
var scale = 1;

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	context = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = context.createImageData(width, height);
	
	cellData = new Array(width * height);
	
	context.putImageData(imageData, 0, 0);
}

function drawParamEq(xeq, yeq, minVal, maxVal, step, color) {
	 var bigint = parseInt(color.substring(1), 16);
	 var r = (bigint >> 16) & 255;
	 var g = (bigint >> 8) & 255;
	 var b = bigint & 255;
	
	for (var t = parseFloat(minVal); t < parseFloat(maxVal); t+=parseFloat(step)) {
		var x = Math.abs(Math.round(width/2 + scale * eval(xeq)));
		var y = Math.abs(Math.round(height/2 + scale * eval(yeq)));
		
		setPixel(imageData, x, y, r, g, b, 255);
	}
	
	context.putImageData(imageData, 0, 0);
}

function clearCanvas() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			setPixel(imageData, x, y, 255, 255, 255, 255);
		}
	}
	context.putImageData(imageData, 0, 0);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}
