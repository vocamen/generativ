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
	var r = Math.random() * 256;
	if (r < 20)
		return 1;
	return 0;
}	

function initSierpinskiCarpet(x, y) {
	while (x > 0 || y > 0) {// when either of these reaches zero the pixel is determined to be on the edge at that square level and must be filled
		if (x % 3 == 1 && y % 3 == 1) // checks if the pixel is in the center for the current square level
			return 0;
		x = Math.floor(x/3); // x and y are decremented to check the next larger square level
		y = Math.floor(y/3);
	}
	return 1; // if all possible square levels are checked and the pixel is not determined to be open it must be filled
}

function glider(x, y) {
	if ( x == 1 && y == 5)
		return 1;
	if ( x == 1 && y == 6)
		return 1;
	if ( x == 2 && y == 5)
		return 1;
	if ( x == 2 && y == 6)
		return 1;
	if ( x == 11 && y == 5)
		return 1;
	if ( x == 11 && y == 6)
		return 1;
	if ( x == 11 && y == 7)
		return 1;
	if ( x == 12 && y == 4)
		return 1;
	if ( x == 12 && y == 8)
		return 1;
	if ( x == 13 && y == 3)
		return 1;
	if ( x == 14 && y == 3)
		return 1;
	if ( x == 13 && y == 9)
		return 1;
	if ( x == 14 && y == 9)
		return 1;
	if ( x == 15 && y == 6)
		return 1;
	if ( x == 16 && y == 4)
		return 1;
	if ( x == 16 && y == 8)
		return 1;
	if ( x == 17 && y == 5)
		return 1;
	if ( x == 17 && y == 6)
		return 1;
	if ( x == 17 && y == 5)
		return 1;
	if ( x == 17 && y == 6)
		return 1;
	if ( x == 17 && y == 7)
		return 1;
	if ( x == 18 && y == 6)
		return 1;
	if ( x == 21 && y == 3)
		return 1;
	if ( x == 21 && y == 4)
		return 1;
	if ( x == 21 && y == 5)
		return 1;
	if ( x == 22 && y == 3)
		return 1;
	if ( x == 22 && y == 4)
		return 1;
	if ( x == 22 && y == 5)
		return 1;
	if ( x == 23 && y == 2)
		return 1;
	if ( x == 23 && y == 6)
		return 1;
	if ( x == 25 && y == 1)
		return 1;
	if ( x == 25 && y == 2)
		return 1;
	if ( x == 25 && y == 6)
		return 1;
	if ( x == 25 && y == 7)
		return 1;
	if ( x == 35 && y == 3)
		return 1;
	if ( x == 35 && y == 4)
		return 1;
	if ( x == 36 && y == 3)
		return 1;
	if ( x == 36 && y == 4)
		return 1;
	
	return 0;
}

//pairs x,y
var golHood = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];

function golProcessNeighbors(neighbors, currentValue) {
	var sum = 0;
	for (var i = 0; i < neighbors.length; i++) {
		sum += neighbors[i];
	}
	
	if (currentValue == 1) {
		if (sum == 2 || sum == 3)
			return 1;
		else
			return 0;
	} else {
		if (sum == 3)
			return 1;
		else
			return 0;
	}
}

function anim() {
	drawRGBA(newCellData, dataWidth, dataHeight, translatePixel, 0, 0);
	timer = setTimeout(anim, 1000);
	oldCellData = newCellData.slice(0);
	evolve(golHood, golProcessNeighbors, dataWidth, dataHeight, oldCellData, newCellData);
}

function translatePixel(x, y, data) {
	if (data == 1)
		return [0, 0, 0, 255];
	return [255, 255, 255, 255];
}
