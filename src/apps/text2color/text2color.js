var imageData;
var width;
var height;
var c;
var pattern;
var text

// source http://nbickford.wordpress.com/2013/05/19/hilberthilbert/

function createImageData(canvasId, inputText) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");
	
	element.width = $(element).width();
	element.height = $(element).height();

	width = element.clientWidth;
	height = element.clientHeight;
	
	imageData = c.createImageData(1000, 1000);
	c.putImageData(imageData, 0, 0);
	
	text = inputText;
	pattern = new Array(text.length);

	anim();
}

function transform() {
	for (var i = 0; i < text.length; i++) {
		pattern[i] = text.charCodeAt(i);
	}
}


function anim() {
	transform();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	var stepH = 5;
	var stepW = 5;
	
	for (var x = 0; x < width; x+=stepW) {
		for (var y = 0; y < height; y+=stepH) {
			var index = (x) + (y) * width;
			var r = parseInt(pattern[index]);
			var g = parseInt(pattern[index]);
			var b = parseInt(pattern[index]);
			
			for (var x2 = 0; x2 < stepW; x2+=1) {
				for (var y2 = 0; y2 < stepH; y2+=1) {
					setPixel(imageData, x + x2, y + y2, r, g, b, 255);
				}
			}
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