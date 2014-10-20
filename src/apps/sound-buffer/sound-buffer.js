var audio = new Audio(); // create the HTML5 audio element
var audio2 = new Audio(); // create the HTML5 audio element

var wave = new RIFFWAVE(); // create an empty wave file
var sndBuffer = [];
var timer;

function createSoundBuffer() {
	var i = 0;
	while (i<44100) { 
		sndBuffer[i++] = 128+Math.round(127*Math.sin(i/10)); // left speaker
		sndBuffer[i++] = 128+Math.round(127*Math.sin(i/200)); // right speaker
	}
}

function cPlay() {
	timer = setInterval(cPlay, 1000);
	createSoundBuffer();
	wave.Make(sndBuffer); // make the wave file
	audio.src = wave.dataURI; // set audio source
	audio.load();
	audio.play();
}

//function cPlay2() {
//	createSoundBuffer();
//	wave.Make(sndBuffer); // make the wave file
//	audio2.src = wave.dataURI; // set audio source
//	audio2.load();
//	audio2.pla
////	timer = setInterval(cPlay, 1000);
//}

function genSound(expr) {
	if (timer) {
        clearTimeout(timer);
        timer = 0;
    }
	
	wave.header.sampleRate = 44100; // set sample rate to 44KHz
	wave.header.numChannels = 2; // two channels (stereo)
	
	cPlay();
	
	//audio.play();
}