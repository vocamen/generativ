
var nextRule = 110;

function getNextCell(neighbors) {
	var state = 4 * neighbors[0] + 2 * neighbors[1] + 1 * neighbors[2];
	return nextRule >> state & 0x1;
}

var imageData;
var width;
var height;
var c;
var cellData;

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	
	cellData = new Array(width * height);
	
	initCellData();
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function initCellData() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var index = x + y * width;
			var r = Math.random() * 256;

			if (r < 30)
				cellData[index] = 1;
			else
				cellData[index] = 0;
		}
	}
}

function anim() {
	draw(imageData);
	setTimeout(anim, 1000);
	
	evolve(cellData, width, height, 200, 200, 300, 300, "NS", 3, getNextCell);
	evolve(cellData, width, height, 600, 200, 300, 300, "NS", 3, getNextCell);
	
	nextRule = 30;
	evolve(cellData, width, height, 885, 220, 200, 200, "WE", 3, getNextCell);
	nextRule = 110;
	
	evolve(cellData, width, height, 200, 600, 300, 300, "WE", 3, getNextCell);
	nextRule = 30;
	evolve(cellData, width, height, 600, 600, 500, 300, "EW", 3, getNextCell);
	nextRule = 110	;
	
//	nextGen();
//	continueCellData();
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