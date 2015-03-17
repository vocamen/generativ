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
var startPattern = ['#ff0000'];
var prevRules = ['#ffffff', '#ff0000'];//, '#00ff00'];
var ruleW = 2;
var ruleH = 2;
var nextRules = [['#00ff00', '#ffffff', '#000000', '#ff0000'], ['#ffffff', '#ff0000', '#ffffff', '#ff0000']];
//var nextRules = [['#000000', '#000000', '#000000', '#ffffff'], ['#ffffff', '#ffffff', '#000000', '#000000']];
//var nextRules = [['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], 
//                 ['#ff0000', '#ff0000', '#ff0000', '#ff0000', '#00ff00', '#ff0000', '#ff0000', '#ff0000', '#ff0000'],
//                 ['#ffffff', '#00ff00', '#ffffff', '#00ff00', '#ff0000', '#00ff00', '#ffffff', '#00ff00', '#ffffff']];
//var nextRules = [['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], 
//                 ['#000000', '#000000', '#000000', '#000000', '#ffffff', '#000000', '#000000', '#000000', '#000000'],
//                 ['#ffffff', '#000000', '#ffffff', '#000000', '#000000', '#000000', '#ffffff', '#000000', '#ffffff']];
//var nextRules = [['#000000', '#ffffff', '#ffffff', 0], ['#ffffff', '#000000', '#000000', '#ffffff']];
//var nextRules = [['#000000', '#ffffff', '#ffffff', '#000000', '#000000', '#ffffff'], ['#ffffff', '#000000', '#000000', '#ffffff', '#ffffff', 0]];

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
	for (var i = 0; i < 8; i++) {
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
			
			if (newCellData[index] === '#ffffff')
				setPixel(imageData, x, y, 255, 255, 255, 255);
			else if (newCellData[index] === '#ff0000')
				setPixel(imageData, x, y, 255, 0, 0, 255);
			else if (newCellData[index] === '#00ff00')
				setPixel(imageData, x, y, 0, 255, 0, 255);
            else if (newCellData[index] === '#0000ff')
				setPixel(imageData, x, y, 0, 0, 255, 255);
			else
				setPixel(imageData, x, y, 0, 0, 0, 255);
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