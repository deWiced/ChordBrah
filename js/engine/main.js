
// constants
var FOV = 75, NEAR_PLANE = 0.1, FAR_PLANE = 1000;

var scene, camera, controls, renderer, composer, container;
var glitch;
var skyBox;
var ship, shipControls;
var clock;
var shipStartPosition, shipStartProcent, pos;
var track;
var tubeMesh;
var tube; 
var binormal;
var normal;
var scale;
var targetRotation;
var gameRenderWidth, gameRenderHeight;
var parent, cameraShip;
var target;
var SHIP_SPEED, SPEED_MODIFIER, ship_traveled;
var physical_track;
var isPause;
var currentChord, currentDurration;
var currentCheckpointIndex, currentCheckpoint, checkpointAddingIndex, currentSectionId, allCheckpointValues;
var startAudio;
var drawCt;
var colorIndex;
var currentPick, pick;
var orientation, lastOrientation;

var dirtyIndexes;
var coloredMaterial, invisibleMaterail, materials;
var checkpointPoints, cl;
var checkpoint_shape, checkpoint_geometry, checkpointMeshes;

var registered_chords, chord_instances, chord_sequence;

function initGameValues() {
	// MAIN VALUES
	glitch = false;
	glitchCt = 0;
	clock = new THREE.Clock(false);
	shipStartProcent = 0.9;
	pos = 0;
	binormal = new THREE.Vector3();
	normal = new THREE.Vector3();
	scale = 1;
	targetRotation = 0;
	SHIP_SPEED = 100;
	SPEED_MODIFIER = 70;
	ship_traveled = 0;
	physical_track = {checkpoints: [] };
	isPause = false;
	currentChord = null;
	currentDurration = 0;
	currentCheckpointIndex = 0;
	currentCheckpoint = null;
	checkpointAddingIndex = 0;
	currentSectionId = 0;
	allCheckpointValues = [];
	startAudio = false;
	drawCt = 0;
	colorIndex = 48;
	currentPick = 0;
	orientation = null;
	lastOrientation = null; 
	
	// TRACK VALUES
	dirtyIndexes = [];
	coloredMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.7, wireframe: false, side: THREE.DoubleSide, color: 0x00FFFF, vertexColors: THREE.VertexColors });
	invisibleMaterail = new THREE.MeshBasicMaterial({ visible: false });
	materials = [];
	checkpointPoints = [];
	cl = 600;
	checkpointPoints.push( new THREE.Vector2 (0, -cl));
	checkpointPoints.push( new THREE.Vector2 (3*cl/4, -3*cl/4));
	checkpointPoints.push( new THREE.Vector2 (cl, 0 ));
	checkpointPoints.push( new THREE.Vector2 (3*cl/4, 3*cl/4));
	checkpointPoints.push( new THREE.Vector2 (0, cl));
	checkpointPoints.push( new THREE.Vector2 (-3*cl/4, 3*cl/4));
	checkpointPoints.push( new THREE.Vector2 (-cl, 0));
	checkpointPoints.push( new THREE.Vector2 (-3*cl/4, -3*cl/4));
	checkpoint_shape = new THREE.Shape(checkpointPoints);
	checkpoint_geometry = new THREE.ShapeGeometry(checkpoint_shape);
	checkpointMeshes = [];
	
	// SOUND VALUES
	registered_chords = {};
	chord_instances = {};
	chord_sequence = [];
}

//initialization
function initGame(screenWidth, screenHeight, generatedTrack) {
	initGameValues();
	clock.start();
	
	// SET UP SCREEN SIZE
	gameRenderWidth = screenWidth;
	gameRenderHeight = screenHeight;
	
	// SCENE
	scene = new THREE.Scene();
	
	// LIGHTS
	var hemisphereLight = new THREE.HemisphereLight(0x404040, 0xFF3300 );
	scene.add(hemisphereLight);
	
	var sun = new THREE.DirectionalLight( 0xffff7f, 3.0);
	sun.position.set(100000/2, 100000/2, 100000/2);
	scene.add( sun );

	// SKYBOX
	//createSkySphere();
	createSkyBox("img/skybox/red/red_", ".jpg");
	
	// ADD TRACK
	createTrack();
	shipStartPosition = tube.parameters.path.getPointAt(shipStartProcent);
	
	//add shipTEMP camera
	parent = new THREE.Object3D();
	parent.position.set(shipStartPosition.x , shipStartPosition.y, shipStartPosition.z);
	scene.add( parent );
	
	cameraShip = new THREE.PerspectiveCamera( 75, gameRenderWidth / gameRenderHeight, 0.01, 1000000 );

	target = new Target();
	
	// SET UP AUDIO
	audio_track = generatedTrack;
	audioSetUp();
	
	// ADD FIRST 3 CHECKPOINTS
	add_n_chekpoints(0, 3);
	currentCheckpoint = physical_track.checkpoints[0];
	
	// GENERATE AND DIPSLAY CHECKPOINT VALUES
	generateChekpointValues();
	setGUIvalues();
	
	// SPACESHIP
	createSpaceShip();
	
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( gameRenderWidth, gameRenderHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	
	setupShaders();

	window.addEventListener( 'resize', onWindowResize, false );
}

function generateChekpointValues() {
	var randomValues = [];
	for(var i=0; i < allCheckpointValues[currentSectionId].length; i++) {
		var rand = Math.floor((Math.random() * 30) + 1);
		while(randomValues.indexOf(rand) > -1)
			rand = Math.floor((Math.random() * 30) + 1);
		
		randomValues.push({ind: i, val: rand});
	}
	
	randomValues.sort(function(a, b){return a.val-b.val});

	for(var i=0; i < randomValues.length; i++) {
		switch(i) {
			case 0: allCheckpointValues[currentSectionId][randomValues[i].ind].orientation = "right"; break;
			case 1: allCheckpointValues[currentSectionId][randomValues[i].ind].orientation = "left"; break;
			case 2: allCheckpointValues[currentSectionId][randomValues[i].ind].orientation = "up"; break;
			case 3: allCheckpointValues[currentSectionId][randomValues[i].ind].orientation = "down"; break;
		}
	}
}

function add_n_chekpoints(start, n) {
	for(var i = start; i < start + n && i < physical_track.checkpoints.length; i++) {
		addCheckpoint(physical_track.checkpoints[i].startProcent, physical_track.checkpoints[i].endProcent);
		checkpointAddingIndex++;
	}
}

function audioSetUp() {
	// REGISTER CHORDS
	for(var i=0; i<audio_track.preload.length; i++)
		registerChord(audio_track.preload[i]);

	// CREATE A LIST OF ALL CHORDS
	var trackPercent = 0;
	for(var i=0; i<audio_track.sections.length; i++) {
		allCheckpointValues.push([]);
		for(var k=0; k<audio_track.sections[i].iterations; k++) {
			for(var j=0; j<audio_track.sections[i].chords.length; j++) {
				var temp_chord = audio_track.sections[i].chords[j];
				chord_sequence.push(temp_chord);
				if(temp_chord.checkpoint == "true") {
					
					var startProcent = (trackPercent + parseFloat(temp_chord.checkpoint_offset_time)) * SHIP_SPEED * SPEED_MODIFIER;
					if(startProcent >= tube.parameters.path.getLength())
						startProcent -= tube.parameters.path.getLength();
					startProcent /= tube.parameters.path.getLength();
	
					var endProcent = (trackPercent + parseFloat(temp_chord.checkpoint_offset_time) + parseFloat(temp_chord.checkpoint_duration_time)) * SHIP_SPEED * SPEED_MODIFIER;		
					if(endProcent >= tube.parameters.path.getLength())
						endProcent -= tube.parameters.path.getLength();
					endProcent /= tube.parameters.path.getLength();
					
					physical_track.checkpoints.push({ sectionId: i, startProcent: startProcent, endProcent: endProcent,  value: temp_chord.type });
					
					if(k == 0) {
						var found = false;
						var type_temp = temp_chord.type.split(" ");
						for(var x = 0; x < allCheckpointValues[i].length; x++) {
							if(allCheckpointValues[i][x].value == type_temp[0]) {
								found = true;
								break;
							}
						}
						
						if(!found)
							allCheckpointValues[i].push({name: temp_chord.name, value: type_temp[0], orientation: null});								
					}					
				}
				
				trackPercent += parseFloat(temp_chord.time_duration);
				
			}
		}
	}
};

function setupShaders() {

	// POSTPROCESSING
	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, cameraShip ) );

	//if (bloom) composer.addPass(new THREE.BloomPass( bloomIntens ));
	if (glitch) composer.addPass(new THREE.GlitchPass());

	var effectVignette = new THREE.ShaderPass( THREE.VignetteShader );
	effectVignette.uniforms[ "offset" ].value = 0.95;
	effectVignette.uniforms[ "darkness" ].value = 1.2;
	effectVignette.renderToScreen = true;
	composer.addPass(effectVignette);

	var effect = new THREE.ShaderPass( THREE.DotScreenShader );
	effect.uniforms[ 'scale' ].value = 4;
	//composer.addPass( effect );

	var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
	effect.uniforms[ 'amount' ].value = 0.0015;
	//effect.renderToScreen = true;
	//composer.addPass( effect );

}

// create and add sky sphere
function createSkySphere() {
	var geometry = new THREE.SphereGeometry(100000, 60, 40);
	var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/skybox/blue.jpg') });

	skyBox = new THREE.Mesh(geometry, material);
	skyBox.scale.set(-1, 1, 1);
	//skyBox.rotation.order = 'XZY';
	//skyBox.renderDepth = 100;
	scene.add(skyBox);
}

// create and add sky box
function createSkyBox(urlPrefix, type) {
	var directions = ["right", "left", "top", "bottom", "front", "back"];
	var skyGeometry = new THREE.BoxGeometry( 100000, 100000, 100000 );
	
	var materialArray = [];
	for (var i = 0; i < 6; i++)
		materialArray.push( new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture( urlPrefix + directions[i] + type ),
		side: THREE.BackSide
	})); 
	
	var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox ); 
}

//create and add space ship
function createSpaceShip() {
	var loader = new THREE.OBJMTLLoader();
	loader.load( 'models/FeisarShip/Feisar_Ship.obj', 'models/FeisarShip/Feisar_Ship.mtl', function ( object ) {

		//scene.add( object );
		ship = new THREE.Object3D();
		scene.add(ship);
		ship.add(object);
		ship.position.set(shipStartPosition.x , shipStartPosition.y, shipStartPosition.z);
		ship.vecForward = new THREE.Vector3(0,0,1);
		
		// SHIP CONTROLS
		shipControls = new ObjectControls(ship);
		shipControls.movementSpeed = 1800;
		shipControls.verticalMax = 300;
		shipControls.horizontalMax = 500;
		//shipControls.autoForward = true;
		
		animate(); 
	});
}

// SCREEN COMMANDS
document.body.addEventListener("keydown", function( event ) {
	switch (event.keyCode) {
	    case 32: isPause = !isPause; 
    			 toggleGameMenu();
	    		 if(!isPause) {
	    			 if(drawCt == 1) {
	    				 $("#startLabel").css("display", "none");
	    				 $("#exitToMenuBtn").css("display", "block");
	    			 }
	    			 clock.start();
	    			 requestAnimationFrame( animate );
	    			 resumeChord(currentChord);
	    		 }
	    		 else {
	    			 clock.stop();
	    			 pauseChord(currentChord);
	    		 }
	    		 break;
		//case 70: THREEx.FullScreen.request(); break;
		//case 71: glitch = !glitch; setupShaders(); break;
	}
}, false);

function toggleGameMenu() {
	if(isPause)
		$("#gameMenu").css("display", "block");
	else
		$("#gameMenu").css("display", "none");
}

function displayGUI() {
	$("#gui").css("display", "block");
}

function clearGUIvalues() {
	$("#gui_up").text("");
	$("#gui_right").text("");
	$("#gui_down").text("");
	$("#gui_left").text("");
}

function setGUIvalues(up, right, down, left) {
	for(var i=0; i < allCheckpointValues[currentSectionId].length; i++) {
		var checkP = allCheckpointValues[currentSectionId][i];
		$("#gui_" + checkP.orientation).text(String(checkP.value));
	}
}

function colorGUIselection() {
	if(lastOrientation == orientation)
		return;
	
	$("#gui_" + orientation).css("color", "red");
	lastOrientation = orientation;
}

function clearGUIselection() {
	$("#gui_up").css("color", "white");
	$("#gui_right").css("color", "white");
	$("#gui_down").css("color", "white");
	$("#gui_left").css("color", "white");
	lastOrientation = null;
}

function onWindowResize() {
	
	cameraShip.aspect = gameRenderWidth / gameRenderHeight;
	cameraShip.updateProjectionMatrix();

	renderer.setSize( gameRenderWidth, gameRenderHeight );

	render();
}

function animate() {
	if(!isPause) {
		var delta = clock.getDelta();
		shipControls.update(delta);
		//camera.updateCamera();
		
		if(startAudio) {
			// Play current chord
			if(currentDurration <= 0) {
				if(pos < chord_sequence.length) {
					currentChord = chord_sequence[pos].name;
					playChord(currentChord, chord_sequence[pos].time_duration);
					currentDurration = chord_sequence[pos].time_duration;
					pos++; 
					
				}
			}
			else {
				currentDurration -= delta;
			}
		}

		render(delta);
	}
	
	requestAnimationFrame( animate );
}

// render loop 
function render(delta_t) {
	
	var delta_s = SHIP_SPEED * delta_t * SPEED_MODIFIER;
	ship_traveled += delta_s;
	
	if(drawCt == 0) {
		isPause = true;
		displayGUI();
		$("#gameMenu").css("display", "block");
		ship_traveled =  shipStartProcent * tube.parameters.path.getLength();
	}
	
	if(ship_traveled > tube.parameters.path.getLength()) {
		ship_traveled = 0;
		colorIndex = 16;
		startAudio = true;
	}
	
	var t = ship_traveled / tube.parameters.path.getLength();
	var pos = tube.parameters.path.getPointAt(t);

	// interpolation
	var segments = tube.tangents.length;
	var pickt = t * segments;
	pick = Math.floor( pickt );
	var pickNext = ( pick + 1 ) % segments;
	
	// color track
	if(pick != currentPick) {

		if(orientation != null)
			markTrack(orientation);
		else
			clearMark();
		
		colorIndex += 16;
		if(colorIndex == materials.length) {
			colorIndex = 0; // treba spedenat

		}
		
		currentPick = pick;
		
		if(glitch)
			glitchCt++;
		
		if(glitchCt == 4) {
			glitch = false;
			glitchCt = 0;
			setupShaders();
		}	
	}
	
	// check if we are at current checkpoint end
	if(startAudio && currentCheckpoint != null && t - currentCheckpoint.endProcent >= 0 && t - currentCheckpoint.endProcent <= 0.1) {
		// get the correct answer
		var correctOrientation;		
		var value_temp = currentCheckpoint.value.split(" "); 
		for(var i = 0; i < allCheckpointValues[currentSectionId].length; i++) {
			if(allCheckpointValues[currentSectionId][i].value == value_temp[0]) {
				correctOrientation = allCheckpointValues[currentSectionId][i].orientation;
				break;
			}
		}		

		// check user answer
		if(correctOrientation == orientation) {
			// smth
		}
		else {
			glitch = true;
			setupShaders();
		}
		
		// add new checkpoint
		add_n_chekpoints( checkpointAddingIndex , 1);
		
		// remove last checkpoint
		if(checkpointMeshes.length > 0) {
			removeCheckpoint();
		}
		
		currentCheckpointIndex++;
		if(currentCheckpointIndex < physical_track.checkpoints.length) {
			currentCheckpoint = physical_track.checkpoints[currentCheckpointIndex];
			if(currentSectionId < currentCheckpoint.sectionId) {
				currentSectionId++;
				clearGUIvalues();
				generateChekpointValues();
				setGUIvalues();
			}
		}
		else {
			currentCheckpoint = null;
			currentCheckpointIndex = -1;
		}
		
	}
	
	binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
	binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );

	var dir = tube.parameters.path.getTangentAt( t );

	//var offset = 50;

	normal.copy( binormal ).cross( dir );

	target.update(pos, normal);
	// We move on a offset on its binormal -> ta offset je zato da nisi notr v tubu -> premaknemno se gor za 15 v smeri normale
	//pos.add( normal.clone().multiplyScalar( offset ) );
	
	ship.position.copy( target.position );
	cameraShip.position.copy(target.position);
	
	// Camera Orientation 1 - default look at
	// splineCamera.lookAt( lookAt );

	// Using arclength for stablization in look ahead.
	var lookAt = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 ).multiplyScalar( scale );
	var lookAt2 = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 ).multiplyScalar( scale );
	// Camera Orientation 2 - up orientation via normal
	lookAt.copy(pos ).sub( dir );
	lookAt2.copy(pos).add(dir);
	//normal.multiplyScalar(-1);
	//normal.applyAxisAngle(lookAt2,30);
	
	ship.matrix.lookAt(ship.position, lookAt, target.normal);
	ship.rotation.setFromRotationMatrix( ship.matrix, ship.rotation.order );
		
	cameraShip.matrix.lookAt(cameraShip.position, lookAt2, target.normal);
	cameraShip.rotation.setFromRotationMatrix( cameraShip.matrix, cameraShip.rotation.order );
	
	cameraShip.translateY(180); //300
	cameraShip.translateZ(620); //800

	ship.translateX(shipControls.x_offset);
	ship.translateY(shipControls.y_offset);
	
	composer.render( scene, cameraShip );

	drawCt++;
}