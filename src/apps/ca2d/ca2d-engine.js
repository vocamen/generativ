function evolve(neighborhood, processNeighbors, dataW, dataH, oldCellData, newCellData) {
	for (var x = 0; x < dataW; x++) {
		for (var y = 0; y < dataH; y++) {
			var index = x + y * dataW;
			var neighbors = new Array(neighborhood.length / 2);
			var nIndex = 0;
			
			for (var i = 0; i < neighborhood.length; i+=2) {
				var nx = neighborhood[i];
				var ny = neighborhood[i+1];
				
				if (y + ny < 0 || y + ny >= dataH) {
					neighbors[nIndex] = 0;
				} else if (x + nx < 0 || x + nx > dataW) {
					neighbors[nIndex] = 0;
				} else {
					neighbors[nIndex] = oldCellData[x + nx + (y + ny) * dataW];
				}
				nIndex++;
			}
			
			newCellData[index] = processNeighbors(neighbors, oldCellData[index]);
		}
	}
}