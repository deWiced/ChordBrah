/**
 * 
 */

// constants
var FOV = 75, NEAR_PLANE = 0.1, FAR_PLANE = 1000;

var scene, camera, controls, renderer, container;
var skyBox;
var ship, shipControls;
var clock = new THREE.Clock();
var shipStartPosition = -9000;
var track;
var tubeMesh;
var tube; 
var binormal = new THREE.Vector3();
var normal = new THREE.Vector3();
var scale = 1;
var targetRotation = 0;

var parent, cameraShip;

// initialization
function init() {

	// SOUND
	addSound("audio_files/", "Rats.wav");	
	
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
	
	cameraShip = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 100000 );
	
	// SKYBOX
	//createSkySphere();
	createSkyBox("img/skybox/red/red_", ".jpg");
	
	// ADD TRACK
	createTrack();
	
	// SPACESHIP
	createSpaceShip();
	
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );
}

// create and add sky sphere
function createSkySphere() {
	var geometry = new THREE.SphereGeometry(10000, 60, 40);
	var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('img/skybox/background.jpg') });

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
		
	/*	camera = new Camera({
			fov: 75,
			aspect_ratio: window.innerWidth / window.innerHeight,
			near_plane: 0.1,
			far_plane: 100000,
			position: new THREE.Vector3(0, 200, -500),
			up: new THREE.Vector3(0, 1, 0),
			dir: new THREE.Vector3(0, -1, 1),
			target: ship
		});*/
		
		// SHIP CONTROLS
		shipControls = new ObjectControls(ship);
		shipControls.movementSpeed = 1000;
		//shipControls.autoForward = true;
		
		animate(); 
	});
}

function onWindowResize() {

	//camera.camera.aspect = window.innerWidth / window.innerHeight;
	//camera.camera.updateProjectionMatrix();
	
	cameraShip.aspect = window.innerWidth / window.innerHeight;
	cameraShip.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function animate() {
	/*var delta = clock.getDelta();
	shipControls.update(delta);
	camera.updateCamera();*/
	requestAnimationFrame( animate );

	render();
}

// render loop 
function render() {
	var time = Date.now();
	var looptime = 20 * 1000;
	var t = ( time % looptime ) / looptime;

	var pos = tube.parameters.path.getPointAt( t );
	
	// interpolation
	var segments = tube.tangents.length;
	var pickt = t * segments;
	var pick = Math.floor( pickt );
	var pickNext = ( pick + 1 ) % segments;

	binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
	binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );

	var dir = tube.parameters.path.getTangentAt( t );

	var offset = 50;

	normal.copy( binormal ).cross( dir );

	// We move on a offset on its binormal -> ta offset je zato da nisi notr v tubu -> premaknemno se gor za 15 v smeri normale
	pos.add( normal.clone().multiplyScalar( offset ) );
	

	ship.position.copy( pos );
	cameraShip.position.copy(pos);
	
	// Camera Orientation 1 - default look at
	// splineCamera.lookAt( lookAt );

	// Using arclength for stablization in look ahead.
	var lookAt = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 ).multiplyScalar( scale );
	var lookAt2 = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 ).multiplyScalar( scale );
	// Camera Orientation 2 - up orientation via normal
	lookAt.copy(pos ).sub( dir );
	lookAt2.copy(pos).add(dir);
	//normal.multiplyScalar(-1);
	ship.matrix.lookAt(ship.position, lookAt, normal);
	cameraShip.matrix.lookAt(cameraShip.position, lookAt2, normal);
	ship.rotation.setFromRotationMatrix( ship.matrix, ship.rotation.order );
	cameraShip.rotation.setFromRotationMatrix( cameraShip.matrix, cameraShip.rotation.order );
	
	cameraShip.translateY(40);
	cameraShip.translateZ(-80)
	renderer.render( scene, cameraShip );
}

