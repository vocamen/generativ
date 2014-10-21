var imageData;
var width;
var height;
var c;
var t;

/*
 * 
 * "REQ = 9*6-y/7*4-y/5+Math.sin(Math.sin(y-(Math.sin(Math.cos(6)-4)+x))-7/0)*neg(neg(x-((3)-Math.cos(5-3*neg(0)/4)*6+y))/8)
"GEQ = x/neg(3)-Math.sin(4)*1-neg(x)*(6)*9/6-Math.sin(Math.cos(x))-6*0
"BEQ = 1-y*10/Math.cos((4))-10-7-10-1/6+4*y+y*3-Math.sin(Math.sin(9*x)+1+neg(3/2-Math.sin(6))-0)



"REQ = x+6*y+x+y*3*x/(9/8)-x-(Math.cos(Math.sin(y*2))+Math.cos(1*Math.sin(y/y*8-9)*4)/7)
"GEQ = (Math.sin(2*x))*2+10*9/4*y/7+(x*x-y)*2-(y)*0+((x)+x)
"BEQ = 8-y*3/Math.sin(y)-y-Math.sin(1*3)+Math.sin(x)-x+6+2-7*y+neg(9)


"REQ = 9-(10)+y/2/6*6*9+3/7-((2+neg(x)-y-Math.cos(1)+6)-1)+Math.cos(6)
"GEQ = x-Math.cos(neg(neg(Math.sin(x*x))))-7-2+x+y*Math.sin(6)-(Math.sin((neg(x)-y)/3*x*x))
"BEQ = x-7-y-1-x/y+y-Math.sin(3)/neg(Math.sin(7*6))*4/4+7*10-7+10*Math.cos(3)

"REQ = (0*y-y)*x+9*x*6*3*4*Math.exp(Math.sin(6/Math.abs(3))+Math.cos(2*9*Math.tan(7*7)+Math.exp(6-x))-3-y)
"GEQ = (3)/1/0-3+0+6+0/Math.cos(7-Math.sqrt(y))*3+y-x-2-1/1+Math.log(10)
"BEQ = 3*7+y+(5+x/x-9)*3*7+2+y*(4+x)/2/6-4

"REQ = Math.sin(x)-(4)/2-6*x/y*10-5+Math.abs(x)*3/3-y
"GEQ = y*5*y-Math.exp(Math.cos((Math.exp(Math.abs((Math.log(Math.sin(6/3)/Math.sin(Math.sin(9)+x/y)+Math.log(1-Math.sqrt(Math.sin(Math.log(1-10))/(9)))-0)-x*5-(4)-6-1)*Math.sin(Math.log(4)*6)/Math.sqrt(9+1-x*x*Math.cos(x))*Math.exp(Math.sin(x)-1+8+y-9)))-Math.sin(x-8))))
"BEQ = (y+y-5*y+8)/10/Math.cos(9)-Math.sqrt(6*1)-x-x*5-y+Math.abs(y*x*8+Math.abs(3-0*y))

r = 0+y*3-6+9-5*exp(10-y-neg(cos(tan(5)+7)))*log(7)-0-3+x*y
g = 3+7+sin(x)*8-x*y+log(7)*4*8-cos(sin(1/exp(x)*5+y*sqrt(x))/cos(1)/9)
b = 5/exp(5*7+x)-y*exp(abs(x-4))/y+2-8*10*6*y/5+x-8+0

r = log(x*sin((2-y*9*sqrt(4))+x*2/tan(9)))-7*8-1*2-5/x
g = 3/x+2+1*sqrt(neg(6+9-x)-6)*6*x+6-tan(9)-1-abs(4*8)
b = 7+sin(10)/10+y-2*1*exp(8)/cos(5)-2-x*sqrt(x-1)/log(3)/1

r = 3+x*x-x/2*x
g = x*y-log(x)-x+8+sqrt(9)*1*x-3-exp(2-3)+x*sin(sqrt(9)-4)+(9*4-5/1+sin(0))
b = x+7+10-4+6-exp(x-exp(y)*cos(x+cos(8*3-6-9*exp(2)+6-x))+sqrt(7))

r = sin(1*8*x)*x*y*x*3-1*9/(0-8)-exp(0-y*3)
g = abs(x)*y+x/y*6*x*y-y*7-8*2-y-3/8*9/x/3/x/neg(y/2*x)-cos(cos(6-y-tan(1-8)-y/(5)-x))-10-log(sin(5)*6-(sqrt(y-7)))*6/sqrt(4)+1+3-x*2
b = 1*6/3*1-8/log(8-2)

r = x/x+y*x-5+sin(x*3)/6-9*x*7+2+7-4-exp(1/3)*3-y-y*x*x-0+y+4*10/7-x*x-7/x/x-9/sin(4*abs(1)*1)-abs(sqrt(2)-10)
g = 2/exp(y)*3-neg(0*5)*(4*x)-8-2-(5)+7/3-abs(8)/2+2*x*sin(9*4*5-(cos(7))/exp(7)*5-y-y)
b = sqrt(log(6))/x*y+6-y+2-sin(x)*7-sqrt(cos(7-sqrt(4))+y)-1*sqrt((3*2-7))*6*9+x-8*tan(sqrt(x/(8))-5*5-sin(9-2))*3-(log(cos(y)))*2+2-x*4*7-exp(x)/7-7

r = 10-x+neg(abs(6)/tan(1))+y*9*neg(8+0*x)*7
g = x-y-6+1/cos(9)-1*x-exp(3/3)-1+x*2-2+abs(y*x*y)*1+y*cos(y)-tan(cos(9/0*7))-x+1*6/7/7
b = sqrt(5)*x*5*3-y*y*cos(x*6)+7/7/y 


r = 3.06/y*x*6.06-log(3.65/x-1.58)/1.65*9.78/exp(2)*cos(0.65-x)/92/4.80-sqrt(14)/1.21*x
g = (y*x*pow(4.36,2.16)-y)/1.21*4.81-x
b = exp(sin(0.50-2.61+pow(7.68,53)))/5.14
"
 */

function createImageData(canvasId) {
	var element = document.getElementById(canvasId);
	c = element.getContext("2d");

	element.width = $(canvas).width();
	element.height = $(canvas).height();
	
	width = element.width;
	height = element.height;

	imageData = c.createImageData(width, height);
	c.putImageData(imageData, 0, 0);
	
	t = 0;
}

function drawRgbEq(req, beq, geq) {
	for (var w = 0; w < width; w++) {
		for (var h = 0; h < height; h++) {
		    
			var x = w;// - width/2;
			var y = h;// - height/2;
			
			r = Math.round(evalRandEq(x, y, req)) % 255;
		    g = Math.round(evalRandEq(x, y, geq)) % 255;
		    b = Math.round(evalRandEq(x, y, beq)) % 255;
		    
		    setPixel(imageData, x, y, r, g, b, 255);
		}
	}
	
	c.putImageData(imageData, 0, 0);
}

function animRgbEq(timeout) {
	drawRgbEq();
	setTimeout(anim, timeout);
	t++;
}

function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}

///
function evalRandEq(x, y, expr) {
	return eval(expr);
}