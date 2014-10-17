var imageData;
var context;
var canvas;

function createImageData(canvasId, canvasWidth, canvasHeight) {
	canvas = document.getElementById(canvasId);
	context = canvas.getContext("2d");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	imageData = context.createImageData(canvasWidth, canvasHeight);
	context.putImageData(imageData, 0, 0);
}

///**
// * 
// * @param data - Array - data to be plotted
// * @param startX - Integer
// * @param startY - Integer
// * @param endX - Integer
// * @param endY - Integer - (startx, starty, endx, endy) - define an area inside @data
// * @param dataW - Integer - @data width
// * @param dataH - Integer - @data height
// * @param translatePixel - Function (x, y, data) - returns an integer representing the rgba/rgb value of the current point
// */
//function draw(data, startX, startY, endX, endY, dataW, dataH, translatePixel) {
//	for (var x = startX; x < startX + endX; x++) {
//		for (var y = startY; y < startY + endY; y++) {
//			var index = x + y * dataW;
//
//			var pVal = translatePixel(x, y, data[index]);
//			var rgba = intToRgba(pVal);
//			
//			setPixel(imageData, x, y, rgba[0], rgba[1], rgba[2], rgba[3]);
//		}
//	}
//	
//	context.putImageData(imageData, 0, 0);
//}

/**
 * 
 * @param data - Array - data to be plotted
 * @param dataW - Integer - @data width
 * @param dataH - Integer - @data height
 * @param translatePixel - Function (x, y, data) - returns an array representing the rgba/rgb value of the current point
 * @param canvasX - Integer 
 * @param canvasY - Integer - where to start drawing on canvas
 */
function drawRGBA(data, dataW, dataH, translatePixel, canvasX, canvasY) {
	var maxW = dataW;
	var maxH = dataH;
	
 	if (dataW > canvas.width) {
 		maxW = canvas.width;
 	}
 	
 	if (dataH > canvas.height) {
 		maxH = canvas.height;
 	}
		
	for (var x = 0; x < maxW; x++) {
		for (var y = 0; y < maxH; y++) {
			var index = x + y * dataW;
			var rgba = translatePixel(x, y, data[index]);
			setPixel(imageData, x, y, rgba[0], rgba[1], rgba[2], rgba[3]);
		}
	}
	
	context.putImageData(imageData, canvasX, canvasY);
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}