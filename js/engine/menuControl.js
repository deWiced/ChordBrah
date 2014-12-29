charset="UTF-8";

var ChordBrah = angular.module("ChordBrah", []);

ChordBrah.controller("menuController", function($rootScope, $scope) {
	$scope.activeView = "menuView";
	
	$rootScope.$on("changeView", function(event, view) {$scope.activeView = view;});
	$scope.setEditor = function() {
		$rootScope.$broadcast("changeView", "editorView");
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

		// insert checpoint label and selector
		insertChordHTML += '<label>Checkpoint: </label><select id="checkpoint_'+sectionId+'_'+$scope.chordIds[sectionId]+'"><option value="true">true</option><option value="false">false</option></select></section>';
			
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
			});		
		}
	};

	$scope.generateTrack = function() {

		var wholeNoteDuration = 240 / $("#tempoInput").val();
		var preload = [];
		var sections = [];		
		var noteDurations = 
			{
				"whole": wholeNoteDuration,
				"half": wholeNoteDuration / 2,
				"quater": wholeNoteDuration / 4,
			 	"eigth": wholeNoteDuration / 8,
			 	"sixteenth": wholeNoteDuration / 16
			};	

		var sections = [];
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
						time_duration: $("#multiplier_"+i+"_"+j).val() * noteDurations[$("#duration_"+i+"_"+j).val()],
						checkpoint: $("#checkpoint_"+i+"_"+j).val()
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
					timeSigniature: $("#timeSigniatureInput").val(),
					numBars: $("#lengthInput").val(),
					length: wholeNoteDuration * $("#lengthInput").val()
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
		$("#timeSigniatureInput").val("");
		$("#lengthInput").val("");
		
		$scope.chordIds = [];
	}
	
	$scope.displayTrack = function(track) {
		// Track info
		$("#nameInput").val(track.info.name);
		$("#tempoInput").val(track.info.tempo);
		$("#timeSigniatureInput").val(track.info.timeSigniature);
		$("#lengthInput").val(track.info.numBars);

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
        }
        reader.readAsText(file)
	};
	
	$scope.saveTrack = function() {
		$scope.generateTrack();
		$scope.downloadTrack();
	};
	
	$scope.toMenu = function() {
		$rootScope.$broadcast("changeView", "menuView");
	}
	
	$scope.play = function() {
		// TODO client side validation
		$scope.generateTrack();
		initGame($("#wrapper").width(), $("#wrapper").height(), $scope.generatedTrack);
		$rootScope.$broadcast("changeView", "gameView");		
	}
	
	
	document.getElementById('openFileBtn').addEventListener('change', $scope.openTrack, false);

	$scope.clearEditor();
});