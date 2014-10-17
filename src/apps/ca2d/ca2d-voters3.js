var oldCellData;
var newCellData;
var dataWidth;
var dataHeight;
var timer;

/**
 * 
 * @param startPattern - String - initial pattern name
 * @param dataW - Integer -  data width
 * @param dataH - Integer - data height
 * @param nrOfGen - Integer - how many generations to iterate (only if animateMillis == 0)
 * @param animateMillis - Integer - refresh every x milliseconds; if 0 -> do not animate;
 */
function initGameOfLife(startPattern, dataW, dataH, nrOfGen, animateMillis) {
	if (timer) {
        clearTimeout(timer);
        timer = 0;
    }
	
	if (dataH <= 0 || dataW <= 0 || nrOfGen <= 0 || animateMillis < 0) {
		return;
	}
	
	dataWidth = dataW;
	dataHeight = dataH;
	oldCellData = new Array(dataW * dataH);
	newCellData = new Array(dataW * dataH);

	if (startPattern == "random")
		initCellData(initRandom);
	else if (startPattern == "sierpinski-carpet")
		initCellData(initSierpinskiCarpet);
	else if (startPattern == "glider")
		initCellData(glider);
	
	if (animateMillis > 0) {
		anim();
	} else {
		for (var s = 0; s < nrOfGen; s++) {
			oldCellData = newCellData.slice(0);
			evolve(golHood, golProcessNeighbors, dataW, dataH, oldCellData, newCellData);
		}
		drawRGBA(newCellData, dataW, dataH, translatePixel, 0, 0);
	}
}

function initCellData(func) {
	for (var x = 0; x < dataWidth; x++) {
		for (var y = 0; y < dataHeight; y++) {
			newCellData[x + y * dataWidth] = func(x, y);
		}
	}
}

function initRandom(x, y) {
	return randInt(0, 100);
}	

//pairs x,y
var golHood = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];
var k1 = 3;
var k2 = 2;
var g = 20;

function golProcessNeighbors(neighbors, currentValue) {
	var sum = 0;
	var infected = 0
	var ill = 0;
	
	for (var i = 0; i < neighbors.length; i++) {
		sum += neighbors[i];
		if (neighbors[1] == 255)
			ill++;
		else if (neighbors[i] != 1 && neighbors[i] != 0) 
			infected++;
	}
	
	
	sum += currentValue;
	
	if (currentValue == 0) {
		return Math.abs(infected/k1 + ill/k2);
	} else if (currentValue == 255) {
		return 0;
	} else {
		return Math.min(Math.abs(sum/infected) + g, 255);
	}
	
}

function anim() {
	drawRGBA(newCellData, dataWidth, dataHeight, translatePixel, 0, 0);
	timer = setTimeout(anim, 1000);
	oldCellData = newCellData.slice(0);
	evolve(golHood, golProcessNeighbors, dataWidth, dataHeight, oldCellData, newCellData);
}

function translatePixel(x, y, data) {
	var r = Math.round(data) % 255;
	var g = Math.round(data) % 255;
	var b = Math.round(data) % 255;
	return [r, g, b, 255];
}
