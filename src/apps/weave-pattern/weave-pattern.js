var imageData;
var width;
var height;
var c;
var weaveW = 0;
var weaveH = 0;
var weavePattern;
var topSize = 0;
var topPattern = [];
var middlePattern = [];
var leftSize = 0;
var leftPattern = [];

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(1000, 1000);
	
	weaveH = 300;
	weaveW = 300;
	topSize = 4;
	leftSize = 4;
	
	topPattern = new Array(weaveW);
	for (var i = 0; i < weaveW; i++) {
		topPattern[i] = new Array(topSize);
	}
	
	middlePattern = new Array(leftSize);
	for (var i = 0; i < weaveH; i++) {
		middlePattern[i] = new Array(topSize);
	}
	
	leftPattern = new Array(weaveH);
	for (var i = 0; i < weaveH; i++) {
		leftPattern[i] = new Array(leftSize);
	}
	
	weavePattern = new Array(weaveH);
	for (var i = 0; i < weaveH; i++) {
		weavePattern[i] = new Array(weaveW);
	}
	
	initPatterns();
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function initPatterns() {
	for (var i = 0; i < weaveH; i++) {
		for (var j = 0; j < weaveW; j++) {
			if (i < topSize) {
				topPattern[i][j] =  ((j + i) % 4 === 0 || (j + i) % 7 === 0 || (j + i) % 3 === 0|| (j + i) % 8 === 0 || (j + i) % 9 === 0) ? 1 : 0;// randInt(0, 1);
			} else {
				topPattern[i][j] = 0;
			}
			
			if (j < leftSize) {
				leftPattern[i][j] = (j + i) % 3 === 0 ? 1 : 0;
			} else {
				leftPattern[i][j] = 0;
			}
			
			if (i < topSize && j < leftSize) {
				middlePattern[i][j] = ((j + i) % 3 === 0 || (j + i) % 7 === 0 || (j + i) % 8 === 0 || (j + i) % 9 === 0)? 1 : 0;
			} else {
				middlePattern[i][j] = 0;
			}
		}
	}
}

function multiplyMatrices(first, second) {
    var newMatrix = [],
        newWidth = second[0].length,
        newHeight = first.length;
    //iterating through first matrix rows
    for (var row = 0; row < newHeight; row++) {
        newMatrix[row] = [];
        //iterating through second matrix columns
        for (var column = 0; column < newWidth; column++) { 
            var sum = 0;
            //calculating sum of pairwise products
            for (var index = 0; index < first[0].length; index++) {
                sum += first[row][index] * second[index][column];
            }
            newMatrix[row][column] = sum;
        }
    }
    return newMatrix;
}

function createPattern() {
	var tmp = multiplyMatrices(leftPattern, middlePattern);
	var result = multiplyMatrices(tmp, topPattern);
	weavePattern = result.slice(0);
}

function anim() {
	createPattern();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	
	var rc1 = randInt(201, 255);
	var rc2 = randInt(201, 255);
	var rc3 = randInt(201, 255);
	
	for (var x = 0; x < weaveW; x++) {
		for (var y = 0; y < weaveH; y++) {
			index = x + y * weaveW;
			
			var rr = parseInt(weavePattern[y][x]) * 255;//rc1 % 255;
			var gg = parseInt(weavePattern[y][x]) * 255;//rc1 % 255;
			var bb = parseInt(weavePattern[y][x]) * 255;//rc1 % 255;
			
			setPixel(imageData, x, y, rr, gg, bb, 255);
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