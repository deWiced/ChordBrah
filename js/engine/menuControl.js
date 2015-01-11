charset="UTF-8";

var SCREEN_WIDTH;
var SCREEN_HEIGTH;

function init_screen() {
	//SCREEN_WIDTH = 800;
	//SCREEN_HEIGHT = 600;
	
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	$("#wrapper").width(SCREEN_WIDTH);
	$("#wrapper").height(SCREEN_HEIGHT);
	
	$("#widthInput").val(SCREEN_WIDTH);
	$("#heightInput").val(SCREEN_HEIGHT);
}

var ChordBrah = angular.module("ChordBrah", []);

ChordBrah.controller("menuController", function($rootScope, $scope) {
	$scope.activeView = "menuView";
	
	$rootScope.$on("changeView", function(event, view) {$scope.activeView = view;});
	
	$scope.setEditor = function() {
		$rootScope.$broadcast("changeView", "editorView");
	};	
	
	$scope.setOptions = function() {
		$rootScope.$broadcast("changeView", "optionsView");
	};
	
	$scope.setSongSelect = function() {
		$rootScope.$broadcast("changeView", "songSelectView");
	}
});

ChordBrah.controller("songSelectController", function($rootScope, $scope) {
	$scope.songs = [];
	
	$scope.setFiles = function(element) {
		for(var i = 0; i < element.files.length; i++) {
			$scope.$apply(function() {
				$scope.songs.push(element.files[i].name.split("_")[1]);
			});
		}
		console.log($scope.songs);
	};
	
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	};
	
});

ChordBrah.controller("optionsController", function($rootScope, $scope) {
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	};
	
	$scope.fullscreen = false;
	
	$scope.applyOptions = function() {
		SCREEN_WIDTH = $("#widthInput").val();
		SCREEN_HEIGHT = $("#heightInput").val();
		
		$("#wrapper").animate({
			width: SCREEN_WIDTH,
			height : SCREEN_HEIGHT
		}, 300);
	};
	
	$scope.toggleFullscreen = function() {
		$scope.fullscreen = !$scope.fullscreen;
		if($scope.fullscreen) {
			$("#widthInput").val(window.innerWidth);
			$("#heightInput").val(window.innerHeight);
		}
		else {
			$("#widthInput").val(SCREEN_WIDTH);
			$("#heightInput").val(SCREEN_HEIGHT);
		}
	};
});

ChordBrah.controller("editorController", function($rootScope, $scope, $compile) {
	
	$scope.generatedTrack;
	$scope.sectionId = 0;
	$scope.chordIds = [];
	
	$scope.root_insert_HTML = "";
	for(var key in ROOT_NOTES)
		$scope.root_insert_HTML += '<option value="'+key+'">'+key+'</option>';
	
	$scope.type_insert_HTML = "";
	for(var key in CHORD_TYPES)
		$scope.type_insert_HTML += '<option value="'+key+'">'+key+'</option>';
	
	$scope.duration_insert_HTML = "";
	for(var i=0; i < CHORD_DURATION.length; i++)				
		$scope.duration_insert_HTML += '<option value="'+CHORD_DURATION[i]+'">'+CHORD_DURATION[i]+'</option>';
	
	$scope.multiplier_insert_HTML = "";
	for(var i=0; i < CHORD_MULTIPLIERS.length; i++)			
		$scope.multiplier_insert_HTML += '<option value="'+CHORD_MULTIPLIERS[i]+'">'+CHORD_MULTIPLIERS[i]+'</option>';
	
	for(var i=0.1; i <=4.1; i+=0.1)
		$scope.checkpoint_duration_HTML += '<option value="'+i.toFixed(1)+'">'+i.toFixed(1)+'</option>';
	
	$scope.addChord = function(sectionId) {
		// insert root label and selector
		var insertChordHTML = '<section id="chordSection_'+sectionId+'_'+$scope.chordIds[sectionId]+'"><label>Root note: </label><select id="root_'+sectionId+'_'+$scope.chordIds[sectionId]+'">';
		insertChordHTML += $scope.root_insert_HTML;

		// insert type label and selector
		insertChordHTML += '</select><label>Chord type: </label><select id="type_'+sectionId+'_'+$scope.chordIds[sectionId]+'">';
		insertChordHTML += $scope.type_insert_HTML;

		// insert duration label, multiplier and selector
		insertChordHTML += '</select><label>Chord duration: </label>';
		insertChordHTML += '<select id="multiplier_'+sectionId+'_'+$scope.chordIds[sectionId]+'">' + $scope.multiplier_insert_HTML + '</select>';
		insertChordHTML += '<select id="duration_'+sectionId+'_'+$scope.chordIds[sectionId]+'">' + $scope.duration_insert_HTML + '</select>';

		// insert checkpoint label and selector
		insertChordHTML += '<label>Checkpoint: </label><select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'"><option value="false">false</option><option value="true">true</option></select>';
		
		// insert checkpoint offset multiplier, offset duration and checkpoint duration
		insertChordHTML += '<label>Offset: </label>';
		insertChordHTML += '<select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'_offset_multiplier"><option value="0">0</option>' + $scope.multiplier_insert_HTML + '</select>';
		insertChordHTML += '<select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'_offset">' + $scope.duration_insert_HTML + '</select>';
		insertChordHTML += '<label>Duration: </label>';
		insertChordHTML += '<select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'_duration_multiplier">' + $scope.multiplier_insert_HTML + '</select>';
		insertChordHTML += '<select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'_duration">' + $scope.duration_insert_HTML + '</select></section>';
		
		$("#addChordBtn_"+sectionId).before(insertChordHTML);
		$scope.chordIds[sectionId]++;
	};

	$scope.removeChord = function(sectionId) {
		var id = $scope.chordIds[sectionId] - 1;
		if($scope.chordIds[sectionId] > 0) {
			$("#chordSection_"+sectionId+"_"+id).remove();
			$scope.chordIds[sectionId]--;
		}
	};
	
	$scope.addSection = function() {

		$scope.chordIds.push(0);			
		var insertSectionHTML = 
			'<fieldset id="section_'+$scope.sectionId+'"><legend>Section '+ $scope.sectionId + '</legend><br>'+
			'<label>Section name: </label><input type="text" id="sectionName_'+$scope.sectionId+'">'+
			'<label>Number of iterations: </label><input type="text" id="sectionIterations_'+$scope.sectionId+'">'+
			'<hr style="border: none; border-top: 2px rgba(255, 255, 255, 0.4) solid; height: 2px;"><br>'+
			'<button id="addChordBtn_'+$scope.sectionId+'" ng-click="addChord('+$scope.sectionId+')" class="addChordBtn">Add chord</button>'+
			'<button id="removeChord_'+$scope.sectionId+'" ng-click="removeChord('+$scope.sectionId+')" class="removeChordBtn">Remove last chord</button>'+
			'</fieldset><br class="break_'+$scope.sectionId+'"><br class="break_'+$scope.sectionId+'">';
		
		var compiledElement = $compile(insertSectionHTML)($scope);
		$("#sectionBtn").before(compiledElement);
		$scope.sectionId++;
	};

	$scope.removeSection = function() {
		if($scope.sectionId > 0) {
			var id = $scope.sectionId - 1;
			$("#section_"+id).fadeOut(300, function(){
				$(".break_"+id).remove();
				$(this).remove();
				$scope.sectionId--;
				$scope.chordIds.pop();
			});		
		}
	};

	$scope.generateTrack = function() {

		var wholeNoteDuration = (240 / $("#tempoInput").val()).toFixed(1);
		var preload = [];
		var sections = [];		
		var noteDurations = 
			{
				"whole": wholeNoteDuration,
				"half": (wholeNoteDuration / 2).toFixed(1),
				"quarter": (wholeNoteDuration / 4).toFixed(1),
			 	"eigth": (wholeNoteDuration / 8).toFixed(1),
			 	"sixteenth": (wholeNoteDuration / 16).toFixed(1)
			};	

		for(var i=0; i<$scope.sectionId; i++) {
			var chords=[];
			for(var j=0; j<$scope.chordIds[i]; j++) { 
				var name = $("#root_"+i+"_"+j).val() + "-" + $("#type_"+i+"_"+j).val();
				chords.push( 
					{
						name: name, // probably ne rabmo
						root: $("#root_"+i+"_"+j).val(),
						type: $("#type_"+i+"_"+j).val(),
						multiplier:  $("#multiplier_"+i+"_"+j).val(),
						duration: $("#duration_"+i+"_"+j).val(),
						time_duration: ($("#multiplier_"+i+"_"+j).val() * noteDurations[$("#duration_"+i+"_"+j).val()]).toFixed(1),
						checkpoint: $("#checkpoint_"+i+"_"+j).val(),
						checkpoint_offset_multiplier: $("#checkpoint_"+i+"_"+j+"_offset_multiplier").val(),
						checkpoint_offset_value: $("#checkpoint_"+i+"_"+j+"_offset").val(),
						checkpoint_offset_time: ($("#checkpoint_"+i+"_"+j+"_offset_multiplier").val() * noteDurations[$("#checkpoint_"+i+"_"+j+"_offset").val()]).toFixed(1),
						checkpoint_duration_multiplier: $("#checkpoint_"+i+"_"+j+"_duration_multiplier").val(),
						checkpoint_duration_value: $("#checkpoint_"+i+"_"+j+"_duration").val(),
						checkpoint_duration_time: ($("#checkpoint_"+i+"_"+j+"_duration_multiplier").val() * noteDurations[$("#checkpoint_"+i+"_"+j+"_duration").val()]).toFixed(1)
					});

				if($.inArray(name, preload) == -1)
					preload.push(name);
			}

			sections.push( {name: $("#sectionName_"+i).val(), iterations: $("#sectionIterations_"+i).val(), chords: chords} );			
		}
		
		$scope.generatedTrack = 
		{
			info:
				{
					name: $("#nameInput").val(),
					tempo: $("#tempoInput").val(),
				},
			preload: preload,
			noteDurations: noteDurations,
			sections: sections	
		};

	};

	$scope.downloadTrack = function() {
		var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($scope.generatedTrack));
		$("#saveTrackBtn").attr("href", "data:" + data);
		$("#saveTrackBtn").attr("download", "ChordBrah_"+$scope.generatedTrack.info.name+".json");
	};

	$scope.clearEditor = function() {
		var num = $scope.sectionId;
		for(var i=0; i<num; i++) {
			var id = $scope.sectionId - 1;
			$(".break_"+id).remove();
			$("#section_"+id).remove();
			$scope.sectionId--;			
		}

		$("#nameInput").val("");
		$("#tempoInput").val("");
	
		$scope.chordIds = [];
	};
	
	$scope.displayTrack = function(track) {
		// Track info
		$("#nameInput").val(track.info.name);
		$("#tempoInput").val(track.info.tempo);

		// Track sections
		for(var i=0; i<track.sections.length; i++) {
			
			// Create new section
			$scope.addSection();

			// Section info				
			$("#sectionName_"+i).val(track.sections[i].name);
			$("#sectionIterations_"+i).val(track.sections[i].iterations);
		
			// Create chords
			for(var j=0; j<track.sections[i].chords.length; j++) {

				// Create new chord
				$scope.addChord(i);
				// Do the selections
				$("#root_"+i+"_"+j).val(track.sections[i].chords[j].root);
				$("#type_"+i+"_"+j).val(track.sections[i].chords[j].type);
				$("#multiplier_"+i+"_"+j).val(track.sections[i].chords[j].multiplier);
				$("#duration_"+i+"_"+j).val(track.sections[i].chords[j].duration);
				$("#checkpoint_"+i+"_"+j).val(track.sections[i].chords[j].checkpoint);
				$("#checkpoint_"+i+"_"+j+"_offset_multiplier").val(track.sections[i].chords[j].checkpoint_offset_multiplier),
				$("#checkpoint_"+i+"_"+j+"_offset").val(track.sections[i].chords[j].checkpoint_offset_value),
				$("#checkpoint_"+i+"_"+j+"_duration_multiplier").val(track.sections[i].chords[j].checkpoint_duration_multiplier),
				$("#checkpoint_"+i+"_"+j+"_duration").val(track.sections[i].chords[j].checkpoint_duration_value)
				
			}
		}
		
		$scope.generatedTrack = track;
	};

	$scope.openTrack = function(evt){
		var files = evt.target.files;
        var file = files[0];           
        var reader = new FileReader();
        reader.onload = function() {
        	$scope.clearEditor();
        	$scope.displayTrack(jQuery.parseJSON(this.result));            
        };
        reader.readAsText(file);
	};
	
	$scope.saveTrack = function() {
		$scope.generateTrack();
		$scope.downloadTrack();
	};
	
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	};
	
	$scope.play = function() {
		// TODO client side validation
		$scope.generateTrack();
		initGame($("#wrapper").width(), $("#wrapper").height(), $scope.generatedTrack);
		$rootScope.$broadcast("changeView", "gameView");		
	};
	
	
	document.getElementById('openFileBtn').addEventListener('change', $scope.openTrack, false);

	$scope.clearEditor();
});

ChordBrah.controller("gameMenuController", function($rootScope, $scope) {
	$scope.exitToMenu = function() {
		// close GUI
		$("#gui").css("display", "none");
		
		// close game menu
		$("#gameMenu").css("display", "none");
		$("#startLabel").css("display", "block");
		$("#exitToMenuBtn").css("display", "none");
		$("#actionLabel").css("display", "none");
		$("#actionLabel").text("Paused");
		$("#scoreLabel").css("display", "none");
		$("#totalCheckpoints").css("display", "none");
		
		// do audio cleanup
		soundInstanceCleanup();
		
		// do scene cleanup
		clearScene();
		
		$("#container").empty();
		
		// change to main menu
		$rootScope.$broadcast("changeView", "menuView");	
	};
});

$(document).ready(function() {
	init_screen();
});

