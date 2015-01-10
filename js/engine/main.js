/**
 * 
 */

// constants
var FOV = 75, NEAR_PLANE = 0.1, FAR_PLANE = 1000;

var scene, camera, controls, renderer, composer, container;
var glitch = false;
var skyBox;
var ship, shipControls;
var clock = new THREE.Clock(false);
var shipStartPosition = -9600;
var track;
var tubeMesh;
var tube; 
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();
var scale = 1;
var targetRotation = 0;
var gameRenderWidth, gameRenderHeight;

var parent, cameraShip;

var target;

var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
});

var SHIP_SPEED = 100;
var SPEED_MODIFIER = 40;
var ship_traveled = 0;
var physical_track = 
	{
		length: 0,
		checkpoints: []
};

var isPause = true;
var currentChord = null;
var currentCheckpointIndex = 0;
var currentCheckpoint = null;

var currentSectionId = 0;
var allCheckpointValues = [];

// SCREEN COMMANDS
document.body.addEventListener("keydown", function( event ) {
	switch (event.keyCode) {
	    case 32: isPause = !isPause; 
	    		 if(!isPause) {
	    			 clock.start();
	    			 requestAnimationFrame( animate );
	    			 resumeChord(currentChord);
	    		 }
	    		 else {
	    			 clock.stop();
	    			 pauseChord(currentChord);
	    		 }
	    		 break;
		case 70: THREEx.FullScreen.request(); break;
		case 71: glitch = !glitch; setupShaders(); break;
	}
}, false);

function audioSetUp() {

	// REGISTER CHORDS
	for(var i=0; i<audio_track.preload.length; i++)
		registerChord(audio_track.preload[i]);

	// CALCULATE PHYSICAL TRACK DISTANCE
	physical_track.length = parseFloat(audio_track.info.trackLength)  * SHIP_SPEED * SPEED_MODIFIER;
	
	// CREATE A LIST OF ALL CHORDS
	var trackPercent = 0;
	for(var i=0; i<audio_track.sections.length; i++) {
		allCheckpointValues.push([]);
		for(var k=0; k<audio_track.sections[i].iterations; k++) {
			for(var j=0; j<audio_track.sections[i].chords.length; j++) {
				var temp_chord = audio_track.sections[i].chords[j];
				chord_sequence.push(temp_chord);
				if(temp_chord.checkpoint) {
					
					var startP = (trackPercent + parseFloat(temp_chord.checkpoint_offset_time)) * SHIP_SPEED * SPEED_MODIFIER;
					if(startP >= tube.parameters.path.getLength())
						startP -= tube.parameters.path.getLength();
					startP /= tube.parameters.path.getLength();
					startP = tube.parameters.path.getPointAt(startP);
	
					var endP = (trackPercent + parseFloat(temp_chord.checkpoint_offset_time) + parseFloat(temp_chord.checkpoint_duration_time)) * SHIP_SPEED * SPEED_MODIFIER;		
					if(endP >= tube.parameters.path.getLength())
						endP -= tube.parameters.path.getLength();
					endP /= tube.parameters.path.getLength();
					endP = tube.parameters.path.getPointAt(endP);
					
					physical_track.checkpoints.push({ sectionId: i, start: startP, end: endP, value: temp_chord.name });
					
					if(k == 0) {
						if(allCheckpointValues[i].indexOf(temp_chord.name) == -1) 
							allCheckpointValues[i].push({ value: temp_chord.name, orientation: null});				
					}
				}
				
				trackPercent += parseFloat(temp_chord.time_duration);
				
			}
		}
	}
};

// initialization
function initGame(screenWidth, screenHeight, generatedTrack) {
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

	//add shipTEMP camera
	parent = new THREE.Object3D();
	parent.position.set(0,0,shipStartPosition);
	scene.add( parent );
	
	cameraShip = new THREE.PerspectiveCamera( 75, gameRenderWidth / gameRenderHeight, 0.01, 1000000 );

	target = new Target();

	// SKYBOX
	//createSkySphere();
	createSkyBox("img/skybox/red/red_", ".jpg");
	
	// ADD TRACK
	createTrack();
	
	// SET UP AUDIO
	audio_track = generatedTrack;
	audioSetUp();
	add_n_chekpoints(0, 3);
	currentCheckpoint = physical_track.checkpoints[0];
	generateChekpointValues();
	
	// SPACESHIP
	createSpaceShip();
	
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( gameRenderWidth, gameRenderHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	
	setupShaders();

	window.addEventListener( 'resize', onWindowResize, false );


}

function setupShaders() {

	// POSTPROCESSING
	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, cameraShip ) );

	//composer.addPass(new THREE.BloomPass( 2.0 ));
	if (glitch) composer.addPass(new THREE.GlitchPass( ));

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
		ship.position.set(0,0,shipStartPosition);
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

function onWindowResize() {
	
	cameraShip.aspect = gameRenderWidth / gameRenderHeight;
	cameraShip.updateProjectionMatrix();

	renderer.setSize( gameRenderWidth, gameRenderHeight );

	render();

}

function generateChekpointValues() {
	var randomValues = [];
	for(var i=0; i < allCheckpointValues[currentSectionId].length; i++) {
		var rand = Math.floor((Math.random() * 100) + 1);
		while(randomValues.indexOf(rand) > -1)
			rand = Math.floor((Math.random() * 100) + 1);
		
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
	console.log(allCheckpointValues[currentSectionId]);
}

function add_n_chekpoints(start, n) {
	for(var i = start; i < start + n && i < physical_track.checkpoints.length; i++) {
		addCheckpoint(physical_track.checkpoints[i].start, physical_track.checkpoints[i].end);
	}
}

var currentDurration = 0;
var pos = 0;

function animate() {
	if(!isPause) {
		var delta = clock.getDelta();
		shipControls.update(delta);
		//camera.updateCamera();
		
		// Play current chord
		if(currentDurration <= 0) {
			if(pos < chord_sequence.length) {
				currentChord = chord_sequence[pos].name;
				playChord(currentChord, chord_sequence[pos].time_duration);
				currentDurration = chord_sequence[pos].time_duration;
				pos++; // DO WE WANT TO LOOP
				
			}
		}
		else {
			currentDurration -= delta;
		}

		render(delta);
	}
	
	requestAnimationFrame( animate );
}

function checkPointDistance(point1, point2) {
	return Math.sqrt( Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2) + Math.pow((point2.z - point1.z), 2) );
}

var colorIndex = 48;
var currentPick = 0;
var pick;
var orientation = null;

// render loop 
function render(delta_t) {
	
	var delta_s = SHIP_SPEED * delta_t * SPEED_MODIFIER;
	ship_traveled += delta_s;
	if(ship_traveled > tube.parameters.path.getLength())
		ship_traveled = 0;

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
	}
	
	// check if we are at current checkpoint end
	if(checkPointDistance(pos, currentCheckpoint.end) <= 50) {
		
		// get the correct answer
		var correctOrientation;		
		for(var i = 0; i < allCheckpointValues[currentSectionId].length; i++) {
			if(allCheckpointValues[currentSectionId][i].value == currentCheckpoint.value) {
				correctOrientation = allCheckpointValues[currentSectionId][i].orientation;
				break;
			}
		}
		
		// check user answer
		if(correctOrientation == orientation)
			console.log("Brava!");
		else
			console.log("Ajjja papi!");
		
		add_n_chekpoints( (checkpointMeshes.length / 2) , 1);
		
		currentCheckpointIndex++;
		if(currentCheckpointIndex < physical_track.checkpoints.length)
			currentCheckpoint = physical_track.checkpoints[currentCheckpointIndex];
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
	
	cameraShip.translateY(300);
	cameraShip.translateZ(800);

	ship.translateX(shipControls.x_offset);
	ship.translateY(shipControls.y_offset);
	
	composer.render( scene, cameraShip );

}