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

// Access to restricted URI denied
ChordBrah.service("predefinedTracks", function($http) {
	var trackArray = {content:null};
	
	this.getTracks = function() { 
		$http.get("tracks/").success(function(data) {
			console.log(data);
			trackArray = data;
		});
	
		return trackArray;
	};
});

ChordBrah.controller("menuController", function($rootScope, $scope) {
	$scope.activeView = "menuView";
	
	$rootScope.$on("changeView", function(event, view) {$scope.activeView = view;});
	
	$scope.setEditor = function() {
		$rootScope.$broadcast("changeView", "editorView");
	};	
	
	$scope.setOptions = function() {
		$rootScope.$broadcast("changeView", "optionsView");
	};

	$scope.setHelp = function() {
		$rootScope.$broadcast("changeView", "helpView");
	};

	$scope.setCredits = function() {
		$rootScope.$broadcast("changeView", "creditsView");
	};
	
	$scope.setSongSelect = function() {
		$rootScope.$broadcast("changeView", "songSelectView");
	}
});

ChordBrah.controller("songSelectController", function($rootScope, $scope, predefinedTracks) {
	//$scope.songs = predefinedTracks.getTracks();
	$scope.selected = null;
	$scope.learingMode = false;
	$scope.selectedIndex = null;
	
	$scope.songs = 
		[
		 	{"info":{"name":"Autumn Leaves - complete","tempo":"60"},"preload":["A2-m7 [w]","D2-7 [w]","G2-maj7 [w]","C2-maj7 [w]","F#2-m7b5","B1-7 [w]","E2-m","B1-7b9","G2-maj7 [t]","E2-m7 [w]","D#2-7 [w]","D2-m7 [w]","C#2-7 [w]","E1-m"],"noteDurations":{"whole":"4.0","half":"2.0","quarter":"1.0","eigth":"0.5","sixteenth":"0.3"},"sections":[{"name":"theme","iterations":"2","chords":[{"name":"A2-m7 [w]","root":"A2","type":"m7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"D2-7 [w]","root":"D2","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"G2-maj7 [w]","root":"G2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"C2-maj7 [w]","root":"C2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"F#2-m7b5","root":"F#2","type":"m7b5","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"B1-7 [w]","root":"B1","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"}]},{"name":"verse","iterations":"1","chords":[{"name":"F#2-m7b5","root":"F#2","type":"m7b5","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"B1-7b9","root":"B1","type":"7b9","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"A2-m7 [w]","root":"A2","type":"m7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"D2-7 [w]","root":"D2","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"G2-maj7 [w]","root":"G2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"G2-maj7 [t]","root":"G2","type":"maj7 [t]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"F#2-m7b5","root":"F#2","type":"m7b5","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"B1-7b9","root":"B1","type":"7b9","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m7 [w]","root":"E2","type":"m7 [w]","multiplier":"1","duration":"quarter","time_duration":"1.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"eigth","checkpoint_offset_time":"0.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"eigth","checkpoint_duration_time":"0.5"},{"name":"D#2-7 [w]","root":"D#2","type":"7 [w]","multiplier":"1","duration":"quarter","time_duration":"1.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"eigth","checkpoint_offset_time":"0.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"eigth","checkpoint_duration_time":"0.5"},{"name":"D2-m7 [w]","root":"D2","type":"m7 [w]","multiplier":"1","duration":"quarter","time_duration":"1.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"eigth","checkpoint_offset_time":"0.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"eigth","checkpoint_duration_time":"0.5"},{"name":"C#2-7 [w]","root":"C#2","type":"7 [w]","multiplier":"1","duration":"quarter","time_duration":"1.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"eigth","checkpoint_offset_time":"0.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"eigth","checkpoint_duration_time":"0.5"},{"name":"C2-maj7 [w]","root":"C2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"B1-7b9","root":"B1","type":"7b9","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"},{"name":"E1-m","root":"E1","type":"m","multiplier":"1","duration":"half","time_duration":"2.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.0","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.0"}]}]},
		 	{"info":{"name":"Autumn Leaves - B1","tempo":"55"},"preload":["B1-m7 [w]","B1-7 [w]","B1-maj7 [w]","B1-m7 [t]","B1-m"],"noteDurations":{"whole":"4.4","half":"2.2","quarter":"1.1","eigth":"0.6","sixteenth":"0.3"},"sections":[{"name":"theme","iterations":"4","chords":[{"name":"B1-m7 [w]","root":"B1","type":"m7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-7 [w]","root":"B1","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-maj7 [w]","root":"B1","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-maj7 [w]","root":"B1","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-m7 [t]","root":"B1","type":"m7 [t]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-7 [w]","root":"B1","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-m","root":"B1","type":"m","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-m","root":"B1","type":"m","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"}]}]},
		 	{"info":{"name":"Autumn Leaves - 3","tempo":"55"},"preload":["A2-m7 [w]","D2-7 [w]","G2-maj7 [w]","C2-maj7 [w]","F#2-m7 [t]","B1-7 [w]","E2-m"],"noteDurations":{"whole":"4.4","half":"2.2","quarter":"1.1","eigth":"0.6","sixteenth":"0.3"},"sections":[{"name":"theme","iterations":"4","chords":[{"name":"A2-m7 [w]","root":"A2","type":"m7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"D2-7 [w]","root":"D2","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"G2-maj7 [w]","root":"G2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"C2-maj7 [w]","root":"C2","type":"maj7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"F#2-m7 [t]","root":"F#2","type":"m7 [t]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"B1-7 [w]","root":"B1","type":"7 [w]","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"},{"name":"E2-m","root":"E2","type":"m","multiplier":"1","duration":"half","time_duration":"2.2","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"quarter","checkpoint_offset_time":"1.1","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"quarter","checkpoint_duration_time":"1.1"}]}]},
		 	{"info":{"name":"nefretiti","tempo":"80"},"preload":["G#2-maj7b5","C#2-sus4","G2-m7b5","C2-7b5","B1-maj9","A#1-m7b5","D#2-7b5"],"noteDurations":{"whole":"3.0","half":"1.5","quarter":"0.8","eigth":"0.4","sixteenth":"0.2"},"sections":[{"name":"theme","iterations":"4","chords":[{"name":"G#2-maj7b5","root":"G#2","type":"maj7b5","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"C#2-sus4","root":"C#2","type":"sus4","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"false","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"G2-m7b5","root":"G2","type":"m7b5","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"C2-7b5","root":"C2","type":"7b5","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"B1-maj9","root":"B1","type":"maj9","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"B1-maj9","root":"B1","type":"maj9","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"A#1-m7b5","root":"A#1","type":"m7b5","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"},{"name":"D#2-7b5","root":"D#2","type":"7b5","multiplier":"1","duration":"whole","time_duration":"3.0","checkpoint":"true","checkpoint_offset_multiplier":"1","checkpoint_offset_value":"half","checkpoint_offset_time":"1.5","checkpoint_duration_multiplier":"1","checkpoint_duration_value":"half","checkpoint_duration_time":"1.5"}]}]}
		 ];
	
	$scope.select = function(song) {
		$scope.selected = song;
	};
	
	$scope.isSelected = function(song) {
		return $scope.selected === song;
	};
	
	$scope.editSelected = function() {
		$rootScope.$broadcast("changedSelectedSong", $scope.selected);
		$rootScope.$broadcast("changeView", "editorView");
	};
	
	$scope.playSelected = function() {
		$rootScope.$broadcast("playSelectedSong",[$scope.learingMode, $scope.selected]);
	};
	
	/*$scope.songs = [];
	
	$scope.setFiles = function(element) {
		for(var i = 0; i < element.files.length; i++) {
			$scope.$apply(function() {
				$scope.songs.push(element.files[i].name.split("_")[1]);
			});
		}
		console.log($scope.songs);
	}; */
	
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

ChordBrah.controller("helpController", function($rootScope, $scope) {
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	};
	
	$scope.fullscreen = false;
	
});

ChordBrah.controller("creditsController", function($rootScope, $scope) {
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	};
	
	$scope.fullscreen = false;
	
});

ChordBrah.controller("editorController", function($rootScope, $scope, $compile) {
	
	$scope.generatedTrack;
	$scope.sectionId = 0;
	$scope.chordIds = [];
	$scope.sectionsCheckpointRestrictions = [];
	
	$scope.learingMode = false;
	
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
		$scope.sectionsCheckpointRestrictions = [];
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
		initGame($("#wrapper").width(), $("#wrapper").height(), $scope.generatedTrack, $scope.learingMode);
		$rootScope.$broadcast("changeView", "gameView");		
	};
	
	
	document.getElementById('openFileBtn').addEventListener('change', $scope.openTrack, false);

	$scope.clearEditor();
	
	$scope.$on("changedSelectedSong", function(event, song) {
		$scope.clearEditor();
		$scope.displayTrack(song);
	});
	
	$scope.$on("playSelectedSong", function(event, params) {
		$scope.clearEditor();
		$scope.learingMode = params[0];
		$scope.displayTrack(params[1]);
		$scope.play();
	});
});

ChordBrah.controller("gameMenuController", function($rootScope, $scope) {
	$scope.exitToMenu = function() {
		// remove help label
		$("#helpLabel").css("display", "none");
		
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