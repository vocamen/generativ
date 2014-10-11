var imageData;
var width;
var height;
var c;
var oldCellData;
var newCellData;
var timer;
var minPixelVal = 0;
var maxPixelVal = 0;
var avgPixelVal = 0;

function loadCanvas(imagePath) {
	
    var oc=document.getElementById("originalCanvas");
    var ctx=oc.getContext("2d");
    var img=new Image();
    img.onload = function(){
    	  oc.width = img.width;
    	  oc.height = img.height;
          ctx.drawImage(img,0,0, img.width, img.height);
          
          var originalImgData = ctx.getImageData(0, 0, img.width, img.height);
      		var originalPixels = originalImgData.data;
      		
      		oldCellData = new Array(img.width * img.height);
      		newCellData = new Array(img.width * img.height);
      	
      	for (var x = 0; x < img.width; x++) {
      		for (var y = 0; y < img.height; y++) {
      			
      			var i = (x + y * img.width) * 4;
      			
      			var r = originalPixels[i];
      		    var g = originalPixels[i+1];
      		    var b = originalPixels[i+2];
      		    var a = originalPixels[i+3];
      			
      		    var tmpPv = rgbToInt(r, g, b)

      		    if (x === 0 && y === 0) {
      				minPixelVal = tmpPv;
      				maxPixelVal = tmpPv;
      			}
      		    
      		    if (tmpPv < minPixelVal) minPixelVal = tmpPv;
      		    if (tmpPv > maxPixelVal) maxPixelVal = tmpPv;
      		    
      			newCellData[x + y * img.width] = tmpPv;
      		}
      	}
    };
    img.crossOrigin = 'anonymous';
    img.src=imagePath;
}

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");
	
	element.width = $(element).width();
	element.height = $(element).height();

	width = element.clientWidth;
	height = element.clientHeight;

	avgPixelVal = (minPixelVal + maxPixelVal)/2;
	
	imageData = c.createImageData(width, height);
	
	anim();
	
	c.putImageData(imageData, 0, 0);
}

function rgbToInt(r, g, b) {
	return (r << 16) | (g << 8) | (b);
}

function setStartPattern(spattern) {
	if (timer) {
        clearTimeout(timer);
        timer = 0;
    }
	
	console.log(spattern);
	
	if (spattern == "random")
		initCellData(initRandom);
	else if (spattern == "sierpinski-carpet")
		initCellData(initSierpinskiCarpet);
	else if (spattern == "glider")
		initCellData(glider);
	
	anim();
}

function initCellData(func) {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			newCellData[x + y * width] = func(x, y);
		}
	}
}

function initRandom(x, y) {
	r = Math.random() * 256;

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

function translateData(dat) {
	if (dat <= avgPixelVal)
		return 0;
	return 1;
}

function getRandNb(nbs, alive, me) {
	var al = [];
	var dead = [];
	
	for (var i = 0; i < nbs.length; i++) {
		if (translateData(nbs[i]) === 1)
			al.push(nbs[i]);
		else
			dead.push(nbs[i]);
	}
	
	if (alive && al.length > 0)
		return al[randInt(0, al.length - 1)];
	
	if (!alive) {
		if (dead.length > 0)
			return dead[randInt(0, dead.length - 1)];
		else
			return minPixelVal + maxPixelVal - me;//minPixelVal;//TODO //al[randInt(0, al.length-1)];
	} 
}

function randInt(mi, ma) {
	return mi + Math.round(Math.random() * ma);
}

function nextGen() {
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var index = x + y * width;
		
			/*
			 *     0|1|2
			 *     3| |4
			 *     5|6|7
			 */
			
			var nrOfNeighbors = 0;
			var nn = [];
			
			if (x > 0) {
				if (y > 0) {
					nrOfNeighbors += translateData(oldCellData[x - 1 + (y - 1) * width]);
					nn.push(oldCellData[x - 1 + (y - 1) * width]);
				}
					
				nrOfNeighbors += translateData(oldCellData[x - 1 + y * width]);
				nn.push(oldCellData[x - 1 + y * width]);
				
				if (y < height - 1) {
					nrOfNeighbors += translateData(oldCellData[x - 1 + (y + 1) * width]);
					nn.push(oldCellData[x - 1 + (y + 1) * width]);
				}
			}
			
			if (x < width - 1) {
				if (y > 0) {
					nrOfNeighbors += translateData(oldCellData[x + 1 + (y - 1) * width]);
					nn.push(oldCellData[x + 1 + (y - 1) * width]);
				}
				
				nrOfNeighbors += translateData(oldCellData[x + 1 + y * width]);
				nn.push(oldCellData[x + 1 + y * width]);

				if (y < height - 1) {
					nrOfNeighbors += translateData(oldCellData[x + 1 + (y + 1) * width]);
					nn.push(oldCellData[x + 1 + (y + 1) * width]);
				}
			}
			
			if (y > 0) {
				nrOfNeighbors += translateData(oldCellData[x + (y - 1) * width]);
				nn.push(oldCellData[x + (y - 1) * width]);
			}
			
			if (y < height - 1) {
				nrOfNeighbors += translateData(oldCellData[x + (y + 1) * width]);
				nn.push(oldCellData[x + (y + 1) * width]);
			}
			
			if (translateData(oldCellData[index]) == 1) {
				if (nrOfNeighbors == 2 || nrOfNeighbors == 3)
					newCellData[index] = getRandNb(nn, true, oldCellData[index]);
				else 
					newCellData[index] = getRandNb(nn, false, oldCellData[index]);
			} else {
				if (nrOfNeighbors == 3)
					newCellData[index] = getRandNb(nn, true, oldCellData[index]);
			}
			
		}
	}
}

function anim() {
	draw(imageData);
	timer = setTimeout(anim, 10);
	oldCellData = newCellData.slice(0);
	nextGen();
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