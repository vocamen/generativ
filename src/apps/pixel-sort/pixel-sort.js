var imageData;
var width;
var height;
var c;
var oldCellData;
var newCellData;
var timer;
var stepWidth = 1;
var stepHeight = 10;

function loadCanvas(imagePath) {

	var oc = document.getElementById("originalCanvas");
	var ctx = oc.getContext("2d");
	var img = new Image();
	img.onload = function() {

		if (timer) {
			clearTimeout(timer);
			timer = 0;
		}

		oc.width = img.width;
		oc.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);

		var originalImgData = ctx.getImageData(0, 0, img.width, img.height);
		var originalPixels = originalImgData.data;

		oldCellData = new Array(img.width * img.height);
		newCellData = new Array(img.width * img.height);

		for (var x = 0; x < img.width; x++) {
			for (var y = 0; y < img.height; y++) {
				var i = (x + y * img.width) * 4;

				var r = originalPixels[i];
				var g = originalPixels[i + 1];
				var b = originalPixels[i + 2];
				var a = originalPixels[i + 3];

				var tmpPv = rgbToInt(r, g, b)

				oldCellData[x + y * img.width] = tmpPv;
			}
		}
	};
	//img.crossOrigin = 'anonymous';
	img.src = imagePath;
}

function createImageData(canvasId, rule) {
	currentRule = rule;
	
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");
	
	element.width = $(element).width();
	element.height = $(element).height();

	width = element.clientWidth;
	height = element.clientHeight;

	imageData = c.createImageData(width, height);
	
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function widthSort() {
	for (var x = 0; x < width - 1; x+=1) {
		for (var y = 0; y < height - 1; y+=1) {
			var index1 = x + y * width;
			var index2 = x + 1 + y * width;
			
			var p1 = oldCellData[index1];
			var p2 = oldCellData[index2];
			
			if (p2 > p1) {
				newCellData[index1] = p2;
				newCellData[index2] = p1;
			} else {
				newCellData[index1] = p1;
				newCellData[index2] = p2;
			}
		}
	}
}

function heightSort() {
	for (var x = 0; x < width - 1; x+=1) {
		for (var y = 0; y < height - 1; y+=1) {
			var index1 = x + y * width;
			var index2 = x + (y+1) * width;
			
			var p1 = oldCellData[index1];
			var p2 = oldCellData[index2];
			
			if (p2 > p1) {
				newCellData[index1] = p2;
				newCellData[index2] = p1;
			} else {
				newCellData[index1] = p1;
				newCellData[index2] = p2;
			}
		}
	}
}

function diagSort() {
	for (var x = 0; x < width - 1; x+=1) {
		for (var y = 0; y < height - 1; y+=1) {
			var index1 = x + y * width;
			var index2 = (x + 10) + (y + 10) * width;
			
			var p1 = oldCellData[index1];
			var p2 = oldCellData[index2];
			
			if (p2 > p1) {
				newCellData[index1] = p2;
				newCellData[index2] = p1;
			} else {
				newCellData[index1] = p1;
				newCellData[index2] = p2;
			}
		}
	}
}

var i = 0;

function anim() {
	widthSort();
//    heightSort();
//    diagSort();
	
	draw(imageData);
	timer = setTimeout(anim, 500);
	oldCellData = newCellData.slice(0);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var index = x + y * width;
			
			var r = newCellData[index] >> 16 & 0xFF;
			var g = newCellData[index] >> 8 & 0xFF; 
			var b = newCellData[index] & 0xFF;

			setPixel(imageData, x, y, r, g, b, 255);
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