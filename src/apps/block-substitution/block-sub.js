var imageData;
var width;
var height;
var c;
var oldW = 0;
var oldH = 0;
var oldCellData;
var newW = 0;
var newH = 0;
var newCellData;

var startH = 1;
var startW = 1;
var startPattern = [0xff0000];
var prevRules = [0xffffff, 0xff0000, 0x00ff00];
var ruleW = 3;
var ruleH = 3;
//var nextRules = [[0, 0xffffff, 0, 0], [0xffffff, 0xffffff, 0xffffff, 0xffffff]];
////var nextRules = [[0, 0, 0, 0xffffff], [0xffffff, 0xffffff, 0, 0]];
var nextRules = [[0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff], 
                 [0xff0000, 0xff0000, 0xff0000, 0xff0000, 0x00ff00, 0xff0000, 0xff0000, 0xff0000, 0xff0000],
                 [0xffffff, 0x00ff00, 0xffffff, 0x00ff00, 0xff0000, 0x00ff00, 0xffffff, 0x00ff00, 0xffffff]];
//var nextRules = [[0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff, 0xffffff], 
//                 [0, 0, 0, 0, 0xffffff, 0, 0, 0, 0],
//                 [0xffffff, 0, 0xffffff, 0, 0, 0, 0xffffff, 0, 0xffffff]];
//var nextRules = [[0, 0xffffff, 0xffffff, 0], [0xffffff, 0, 0, 0xffffff]];
//var nextRules = [[0, 0xffffff, 0xffffff, 0, 0, 0xffffff], [0xffffff, 0, 0, 0xffffff, 0xffffff, 0]];

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(1000, 1000);
	
	oldCellData = startPattern.slice(0);
	oldH = startH;
	oldW = startW;
	
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function nextGen() {
	newH = oldH * ruleH;
	newW = oldW * ruleW;
	newCellData = new Array(newH * newW);
	
	for (var i = 0; i < oldH; i++) {
		for (var j = 0; j < oldW; j++) {
			var oldIndex = j + i * oldW;

			for (var ri = 0; ri < ruleH; ri++) {
				for (var rj = 0; rj < ruleW; rj++) {
					var newi = ri + i * ruleH;
					var newj = rj + j * ruleW;
					var newIndex =  newj + newi * newW;
					
					var ruleIndex = rj + ri * ruleW;
					
					for (var r = 0; r < prevRules.length; r++) {
						var cRule = prevRules[r];
						
						if (oldCellData[oldIndex] === cRule) {
							newCellData[newIndex] = nextRules[r][ruleIndex];
							break;
						}
					}
				}
			}	
		}
	}
	
	oldCellData = newCellData.slice(0);
	oldH = newH;
	oldW = newW;
}

function anim() {
	for (var i = 0; i < 6; i++) {
		nextGen();
	}
	draw(imageData);
//	setTimeout(anim, 1000);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	for (var x = 0; x < newW; x++) {
		for (var y = 0; y < newH; y++) {
			index = x + y * newW;
			
			if (newCellData[index] === 0xffffff)
				setPixel(imageData, x, y, 255, 255, 255, 255);
			else if (newCellData[index] === 0xff0000)
				setPixel(imageData, x, y, 255, 0, 0, 255);
			else if (newCellData[index] === 0x00ff00)
				setPixel(imageData, x, y, 0, 255, 0, 255);
//			if (newCellData[index] === 0)
//				setPixel(imageData, x, y, 0, 0, 0, 255);
//			else
//				setPixel(imageData, x, y, 255, 255, 255, 255);
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