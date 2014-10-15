
function evolve(cellData, dataWidth, dataHeight, startX, startY, width, height, dirStr, nrOfNeighbors, nextCellFunc) {
	
	var halfNeighbors = Math.floor(parseInt(nrOfNeighbors) / 2);
	var start1, end1, start2, end2, gStep;
	
	if (dirStr === "NS") {
		start1 = startY;
		end1 = startY + height;
		start2 = startX;
		end2 = startX + width;
		gStep = 1
	} else if (dirStr === "SN") {
		start1 = startY + height - 1;
		end1 = startY;
		start2 = startX;
		end2 = startX + width;
		gStep = -1;
	} else if (dirStr === "WE") {
		start1 = startX;
		end1 = startX + width;
		start2 = startY;
		end2 =  startY + height;
		gStep = 1;
	} else if (dirStr === "EW") {
		start1 = startX + width - 1;
		end1 = startX;
		start2 = startY;
		end2 = startY + height;
		gStep = -1;
	} else {
		return;
	}
	
	//TODO absolute index
	
	
//	for (var i1 = start1 + gStep; (gStep > 0 ? i1 < end1 : i1 >= end1); i1+=gStep) {
//		for (var i2 = start2; i2 < end2; i2++) {
//			var index = i2 + i1 * end2;
//			
//			var neighbors = [];
//			for (var ri = 0; ri < nrOfNeighbors; ri++) {
//				neighbors[ri] = getCellData(index - gStep * end2 - (ri - halfNeighbors), width, height, cellData);
//			}
//			
//			cellData[index] = getNextCell(neighbors);
//		}
//	}
	
	for (var i1 = start1 + gStep; (gStep > 0 ? i1 < end1 : i1 >= end1); i1+=gStep) {
		for (var i2 = start2; i2 < end2; i2++) {
			var index = 0;
			
			if (dirStr === "NS" || dirStr === "SN") {
				index = i2 + i1 * dataWidth;
			} else if (dirStr === "WE" || dirStr === "EW") {
				index = i1 + i2 * dataWidth;
			}
			
			var neighbors = [];
			for (var ri = 0; ri < nrOfNeighbors; ri++) {
//				if (i2 - ri < start2 || i2 + ri > end2) {
//					neighbors[ri] = 0;
//				} else {
					if (dirStr === "NS" || dirStr === "SN") {
						neighbors[ri] = cellData[index - gStep * dataWidth - (ri - halfNeighbors)];
					} else if (dirStr === "WE" || dirStr === "EW") {
						neighbors[ri] = cellData[index + (ri - halfNeighbors) * dataWidth - gStep];
					}
//				}
			}
			cellData[index] = getNextCell(neighbors);
		}
	}
	
}
