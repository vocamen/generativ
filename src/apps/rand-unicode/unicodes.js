
var limits = [[8208, 8231],
		 [8240, 8286],
		 [8352, 8377],
		 [8704, 8959],
		 [9472, 9599],
		 [9600, 9631],
		 [9632, 9727],
		 [9728, 9983],
		 [9985, 10175],
		 [8592, 8703]];

function recreate(maxLength) {
	
	var len = parseInt(maxLength);
	
	if (len === undefined || len < 1) {
		len = 100;
	}

	var inpText = $("#input").val();
	var genText = "";
	
	for (var i = 0; i < maxLength; i++) {
		genText += inpText.substr(randInt(0, inpText.length - 1),1);
	}
	
	$("#output").css("color", $("#color").val());
	$("#output").css("background-color", $("#bgcolor").val());
	$("#output").text(genText);
}

function initDefaultInput() {
	var tmptext = "";
	
	for (var i = 0; i < limits.length; i++) {
		for (var j = limits[i][0]; j <= limits[i][1]; j++) {
			tmptext += String.fromCharCode(j);	
		}
	}
	$("#input").val(tmptext);
}