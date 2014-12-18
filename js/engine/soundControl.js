
var chordDir = "audio_files/chord_base/";
var chordDatabase = {
		"C-major" : new Array(chordDir+"C4.wav", chordDir+"E3.wav", chordDir+"G3.wav"),
		"E-major" : new Array(chordDir+"E3.wav"),
		"G-major" : new Array(chordDir+"G3.wav"),
		};

function registerChord(chordName){
	var chord = chordDatabase[chordName];
	for(var i=0; i<chord.length; i++)
		createjs.Sound.registerSound(chord[i]);
}

function playChord(chordName, duration) {
	duration *= 1000;
	var chord = chordDatabase[chordName];
	for(var i=0; i<chord.length; i++) 
		createjs.Sound.play(chord[i], {startTime: 0, duration: duration});
		//createjs.Sound.play(chord[i], {interrupt:createjs.Sound.INTERRUPT_NONE, loop:0, volume:1.0});
}

function stopChord(chordName) {
	var chord = chordDatabase[chordName];
	for(var i=0; i<chord.length; i++)
		createjs.Sound.stop(chord[i]);
}