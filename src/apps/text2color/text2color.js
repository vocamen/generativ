var imageData;
var width;
var height;
var c;
var pattern;
var text

// source http://nbickford.wordpress.com/2013/05/19/hilberthilbert/

function createImageData(canvasId, inputText) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");
	
	element.width = $(element).width();
	element.height = $(element).height();

	width = element.clientWidth;
	height = element.clientHeight;
	
	imageData = c.createImageData(1000, 1000);
	c.putImageData(imageData, 0, 0);
	
	text = inputText;
	pattern = new Array(text.length);

	anim();
}

function transform() {
	for (var i = 0; i < text.length; i++) {
		pattern[i] = text.charCodeAt(i);
	}
}


function anim() {
	transform();
	draw(imageData);
	c.putImageData(imageData, 0, 0);
}

function draw(imageData) {
	var stepH = 15;
	var stepW = 15;
	
	for (var y = 0; y < height/stepH; y++) {
		for (var x = 0; x < width/stepW; x++) {
			var index = x + y * width;
			
			if (index > pattern.length)
				break;
			
			var rgb = hsvToRgb(((pattern[index] * pattern[index] * 13) % 255) * 360/255, 1, 1);
			
			var r = Math.round(rgb[0]);//parseInt(pattern[index]);
			var g = Math.round(rgb[1]);//parseInt(pattern[index]) * Math.random();
			var b = Math.round(rgb[2]);//parseInt(pattern[index]) * Math.random();
			
			for (var x2 = 0; x2 < stepW; x2++) {
				for (var y2 = 0; y2 < stepH; y2++) {
					setPixel(imageData, x * stepW + x2, y * stepH + y2, r, g, b, 255);
				}
			}
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

function hsvToRgb(h, s, v) {  
    var c = v * s;  
    var h1 = h / 60;  
    var x = c * (1 - Math.abs((h1 % 2) - 1));  
    var m = v - c;  
    var rgb = [0, 0, 0];  
      
    if (typeof h == 'undefined') rgb = [0, 0, 0];  
    else if (h1 < 1) rgb = [c, x, 0];  
    else if (h1 < 2) rgb = [x, c, 0];  
    else if (h1 < 3) rgb = [0, c, x];  
    else if (h1 < 4) rgb = [0, x, c];  
    else if (h1 < 5) rgb = [x, 0, c];  
    else if (h1 <= 6) rgb = [c, 0, x];  
      
    return [255 * (rgb[0] + m), 255 * (rgb[1] + m), 255 * (rgb[2] + m)];  
  }   