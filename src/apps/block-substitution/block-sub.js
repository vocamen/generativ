var imageData;
var width;
var height;
var c;
var oldCellData;
var newCellData;

var rule = ['000000', '000000', 'ffffff', '000000', '000000']; /// [[[0]], [['000000', 'ffffff'], ['000000', '000000']]];

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(rule[0][0].length, rule[0].length);
	
	cellData = new Array(width * height);
	
	initCellData();
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function initCellData() {
	for (var i = 0; i < rule; i++) {
		
	}
}


function nextGen() {
	
	for (var y = 1; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var index = x + y * width;
		
			
		}
	}
}

function anim() {
	draw(imageData);
	setTimeout(anim, 1000);
	nextGen();
	continueCellData();
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			index = x + y * width;

			if (cellData[index] == 1)
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