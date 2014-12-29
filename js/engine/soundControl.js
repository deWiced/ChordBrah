
// Setup root notes
var ROOT_NOTES = {};
var midi_start = 12;

//Put in notes from C0 to B5
for(var i=0; i<6; i++) {
	var midi_value = i*midi_start + midi_start;
	
	ROOT_NOTES["C" + i]  = midi_value + 0;
	ROOT_NOTES["C#" + i] = midi_value + 1;
	ROOT_NOTES["D" + i]  = midi_value + 2;
	ROOT_NOTES["D#" + i] = midi_value + 3;
	ROOT_NOTES["E" + i]  = midi_value + 4;
	ROOT_NOTES["F" + i]  = midi_value + 5;
	ROOT_NOTES["F#" + i] = midi_value + 6;
	ROOT_NOTES["G" + i]  = midi_value + 7;
	ROOT_NOTES["G#" + i] = midi_value + 8;
	ROOT_NOTES["A" + i]  = midi_value + 9;
	ROOT_NOTES["A#" + i] = midi_value + 10;
	ROOT_NOTES["B" + i]  = midi_value + 11;
}

//Put in the last C
ROOT_NOTES["C6"] = 84;

// Setup chord types
var CHORD_TYPES = 
	{
		"maj" : [0, 4, 7],
		"min" : [0, 3, 7],
		"maj7 [t]" : [0, 4, 7, 11], 
		"maj7 [w]" : [0, 7, 11, 16], 
		"min7 [t]" : [0, 3, 7, 10], 
		"min7 [w]" : [0, 7, 10, 15],
		"7 [t]" : [0, 4, 7, 10], 
		"7 [w]" : [0, 10, 16, 19], 
		"m7b5" : [0, 3, 6, 10], 
		"7b9" : [0, 4, 6, 9]
	};


var CHORD_DURATION = ["whole", "half", "quater", "eigth", "sixteenth"];

var CHORD_MULTIPLIERS = [1,2,3,4,5,6,7,8,9,10];

// Directory of note audio files
var note_dir = "audio_files/chord_base/";
var note_type = ".ogg";

var registered_chords = {};

function registerChord(chordName){
	
	var root = chordName.split("-")[0];
	var chord = CHORD_TYPES[chordName.split("-")[1]];
	var notes = [];
	
	for(var i=0; i<chord.length; i++) {
		var index = ROOT_NOTES[root] + chord[i];
		var file = note_dir + index + note_type;
		createjs.Sound.registerSound(file);
		notes.push(file);
	}
	
	registered_chords[chordName] = notes;
}

var chord_sequence = [];

function playChord(chordName, duration) {
	duration *= 1000;
	var chord = registered_chords[chordName];
	for(var i=0; i<chord.length; i++) 
		createjs.Sound.play(chord[i], {startTime: 0, duration: duration});
		//createjs.Sound.play(chord[i], {interrupt:createjs.Sound.INTERRUPT_NONE, loop:0, volume:1.0});
}

function stopChord(chordName) {
	var chord = registered_chords[chordName];
	for(var i=0; i<chord.length; i++)
		createjs.Sound.stop(chord[i]);
}