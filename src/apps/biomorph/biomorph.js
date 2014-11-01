var model = {nrOfGenes : 9,
			 size : 100,
			 genome : [],
			 lines : []};

var line = {x1 : 0, y1 : 0, x2 : 0, y2 : 0};

function initModel() {
	model.size = Math.min(width, height) / 4;
	model.genome[1] = model.genome[2] = model.genome[3] = model.genome[4] = model.genome[5] = 1;
	model.genome[6] = model.genome[7] = -1;
	model.genome[8] = 7;
}

function drawModel() {
	var l = [];

	var ox = 0, oy = 0;
	var br = [];
	var bs = [];
	var lx = [];
	var ly = [];
	var stp = 1, nux = 0, nuy = 0, mag;

	br[1] = 1;
	bs[1] = 0;

	lx[1] = ox;
	ly[1] = oy;

	var mi = 0;
	
	while (true) {
		mi ++;
		
		//model.lines = l;
		
		while (br[stp] == 0)
			if (--stp == 0) {
				model.lines = l;
				return;
			}

		mag = model.size / (stp + 8);

		switch (br[stp]) {
		case 1:
			nux = 0;
			nuy = -model.genome[1] * mag;
			break;
		case 2:
			nux = model.genome[2] * mag;
			nuy = -model.genome[3] * mag;
			break;
		case 3:
			nux = model.genome[4] * mag;
			nuy = 0;
			break;
		case 4:
			nux = model.genome[5] * mag;
			nuy = -model.genome[6] * mag;
			break;
		case 5:
			nux = 0;
			nuy = -model.genome[7] * mag;
			break;
		case 6:
			nux = -model.genome[5] * mag;
			nuy = -model.genome[6] * mag;
			break;
		case 7:
			nux = -model.genome[4] * mag;
			nuy = 0;
			break;
		case 8:
			nux = -model.genome[2] * mag;
			nuy = -model.genome[3] * mag;
			break;

		default:
			//		throw "BUG";
			console.print("BUG " + br[stp]);
			break;
		}

		// Next branch.

		br[stp + 1] = br[stp] + 1;
		bs[stp + 1] = br[stp] - 1;
		if (br[stp + 1] >= 9)
			br[stp + 1] = 1;
		if (bs[stp + 1] == 0)
			bs[stp + 1] = 8;

		lx[stp + 1] = lx[stp] + nux;
		ly[stp + 1] = ly[stp] + nuy;

		l.push({x1 : lx[stp], y1 : ly[stp], x2 : lx[stp + 1], y2 : ly[stp + 1]});

		br[stp] = bs[stp];
		bs[stp] = 0;
		if (++stp >= model.genome[8])
			br[stp] = bs[stp] = 0;
	}
}

function perturbModel() {
	var hi = 5;
	var lo = -hi;
	var n1 = model.nrOfGenes - 1;
	var knobSpeed = [];
	
	for (var i = 0; i < model.nrOfGenes; ++i) {
		// Select a speed of -2, -1, 1, or 2.
		knobSpeed[i] = Math.round(Math.random() * 2) + 1;
		if (Math.random() < 0.5)
			knobSpeed[i] = -knobSpeed[i];
	}
	
	// Randomly select a knob and try moving it in the same
	// direction and at the same speed as before.
	var idx = Math.round(Math.random() * model.nrOfGenes);
	var willBe = model.genome[idx] + knobSpeed[idx];

	var loc = (idx == 8) ? 5 : lo;
	var hic = (idx == 8) ? 9 : hi;

	if (willBe < loc) // Hit the low end, so bounce up.
		model.genome[idx] += (knobSpeed[idx] = Math.round(Math.random() * 2) + 1);
	else if (willBe > hic) // Hit the high end, so bounce down.
		model.genome[idx] += (knobSpeed[idx] = Math.round(Math.random() * 2) - 2);
	else
		// Common case: haven't reached either end.
		model.genome[idx] = willBe;
}
	
function step() {
	drawModel();
	perturbModel();
}

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

function paint() {
	context.clearRect(0, 0, width, height);
	 context.save();
	 context.fillStyle = "#ffffff";
	 context.strokeStyle = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
	 context.fillRect(0, 0, width, height);
	 context.translate(width / 2, height / 2);
	 context.beginPath();
	 
	 var lines = model.lines;
	 for (var i = 0; i < lines.length; i++) {
		 context.moveTo(lines[i].x1, lines[i].y1);
		 context.lineTo(lines[i].x2, lines[i].y2);
	}
	 
	context.stroke();
	context.restore();
}