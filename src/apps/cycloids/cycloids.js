/*
 * Supershapes / Superformula / super ellipse
 *  x = pow(pow(abs(cos(m*t/4)/a),n2)+pow(abs(sin(m*t/4)/b),n3),neg(1)/n1) * cos(t)
	y = pow(pow(abs(cos(m*t/4)/a),n2)+pow(abs(sin(m*t/4)/b),n3),neg(1)/n1) * sin(t)
 * 
 */


var width;
var height;
var context;

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	context = element.getContext("2d");

	element.width = $(document).width();
	element.height = $(document).height();
	
	width = element.width;
	height = element.height;
}

function drawParamEq(xeq, yeq, minVal, maxVal, step, color) {
	 var bigint = parseInt(color.substring(1), 16);
	 var r = (bigint >> 16) & 255;
	 var g = (bigint >> 8) & 255;
	 var b = bigint & 255;
	
	 var type = "superformula";//"hypotrochoid";//"epitrochoid";//"hypocycloid"; //"epicycloid";//"harmonograph";
	 var scale = 10;
	 
	 context.clearRect(0, 0, width, height);
	 context.save();
	 context.fillStyle = "#ffffff";
	 context.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
	 context.fillRect(0, 0, width, height);
	 context.translate(width / 2, height / 2);
	 context.beginPath();
	 
	 var A1 = 100, f1 = 2, p1 = 1/16, d1 = 0.02;
		var A2 = 100, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
		var A3 = 100, f3 = 2, p3 = 13 / 15, d3 = 0.02;
		var A4 = 100, f4 = 2, p4 = 1, d4 = 0.02;
		

      A1 = 100, f1 = randInt(1, 10), p1 = 1/randInt(1, 10), d1 = 0.02;
      A2 = 100, f2 = randInt(1, 10), p2 = randInt(1, 10) / randInt(1, 33), d2 = 0.0315;
      A3 = 100, f3 = randInt(1, 10), p3 = randInt(1, 10) / randInt(1, 33), d3 = 0.02;
      A4 = 100, f4 = randInt(1, 10), p4 = 1, d4 = 0.02;
      
      var rmax = randInt(1, 100);
      var rmin = randInt(1, 100);
      var d = randInt(1, 100);
      
      
      var m =  randInt(1, 20), n1 = randInt(1, 20), n2 = randInt(1, 20), n3 = randInt(1, 20), a = 1, b = 1;
	 
	for (var t = 0; t < 100; t+=0.01) {
		
		var x = 0;
		var y = 0;
		
		if (type == "harmonograph") {
			var retVals = harmonograph(A1, A2, A3, A4, f1, f2, f3, f4, p1, p2, p3, p4, d1, d2, d3, d4, t)
			x = retVals[0];
			y = retVals[1];
		} else if (type == "epicycloid") {
			var retVals = epicycloid(rmax, rmin, t)
			x = retVals[0];
			y = retVals[1];
			if (rmax > 500) {
				x =  x / 10;
				y = y / 10;
			}
		} else if (type == "hypocycloid") {
			var retVals = hypocycloid(rmax, rmin, t)
			x = retVals[0];
			y = retVals[1];
			if (rmax > 500) {
				x =  x / 10;
				y = y / 10;
			}
		} else if (type == "epitrochoid") {
			var retVals = epitrochoid(rmax, rmin, d, t)
			x = retVals[0];
			y = retVals[1];
			if (rmax > 500) {
				x =  x / 10;
				y = y / 10;
			}
		}  else if (type == "hypotrochoid") {
			var retVals = hypotrochoid(rmax, rmin, d, t)
			x = retVals[0];
			y = retVals[1];
			if (rmax > 500) {
				x =  x / 10;
				y = y / 10;
			}
		}  else if (type == "superformula") {
			var retVals = superformula(m, n1, n2, n3, a, b, t)
			x = 40 * retVals[0];
			y = 40 * retVals[1];
			/*if (rmax > 500) {
				x =  x / 10;
				y = y / 10;
			}*/
		}
		
		context.lineTo(x, y);
		
	}
	context.stroke();
	context.restore();
}


function epicycloid(rmax, rmin, t) {
	var xt = (rmax + rmin) * Math.cos(t) - rmin * Math.cos((rmax + rmin)/rmin * t);
	var yt = (rmax + rmin) * Math.sin(t) - rmin * Math.sin((rmax + rmin)/rmin * t);
	return [xt, yt];
}

function hypocycloid(rmax, rmin, t) {
	var xt = (rmax - rmin) * Math.cos(t) + rmin * Math.cos((rmax - rmin)/rmin * t);
	var yt = (rmax - rmin) * Math.sin(t) - rmin * Math.sin((rmax - rmin)/rmin * t);
	return [xt, yt];
}

function epitrochoid(rmax, rmin, d, t) {
	var xt = (rmax + rmin) * Math.cos(t) - d * Math.cos((rmax + rmin)/rmin * t);
	var yt = (rmax + rmin) * Math.sin(t) - d * Math.sin((rmax + rmin)/rmin * t);
	return [xt, yt];
}

function hypotrochoid(rmax, rmin, d, t) {
	var xt = (rmax - rmin) * Math.cos(t) + d * Math.cos((rmax - rmin)/rmin * t);
	var yt = (rmax - rmin) * Math.sin(t) - d * Math.sin((rmax - rmin)/rmin * t);
	return [xt, yt];
}

function harmonograph(A1, A2, A3, A4, f1, f2, f3, f4, p1, p2, p3, p4, d1, d2, d3, d4, t) {
	var xt = A1 * Math.sin(f1 * t + p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + p2) * Math.exp(-d2 * t)
	var yt = A3 * Math.sin(f3 * t + p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + p4) * Math.exp(-d4 * t)
	return [xt, yt];
}

function superformula(m, n1, n2, n3, a, b, t) {
	var xt = Math.pow(Math.pow(Math.abs(Math.cos(m * t / 4) / a), n2) + Math.pow(Math.abs(Math.sin(m * t / 4) / b), n3), -1 / n1) * Math.cos(t);
	var yt = Math.pow(Math.pow(Math.abs(Math.cos(m * t / 4) / a), n2) + Math.pow(Math.abs(Math.sin(m * t / 4) / b), n3), -1 / n1) * Math.sin(t);
	return [xt, yt];
}