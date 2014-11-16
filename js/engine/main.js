/**
 * 
 */

// constants
var FOV = 75, NEAR_PLANE = 0.1, FAR_PLANE = 1000;

var scene, camera, controls, renderer, container
var skyBox;
var ship, shipControls;
var clock = new THREE.Clock();
var shipStartPosition = -9000

// initialization
function init() {

	// SCENE
	scene = new THREE.Scene();
	
	// LIGHTS
	var ambient = new THREE.AmbientLight( 0xffffff );
	scene.add( ambient );

	/*
	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0, 1 ).normalize();
	scene.add( directionalLight );*/
	
	var hemisphereLight = new THREE.HemisphereLight( 0xEEE0E5, 0x862A51, 2.0);
	scene.add( hemisphereLight )
	
	// SKYBOX
	//createSkySphere();
	createSkyBox("img/skybox/red/red_", ".jpg");
	
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
	var skyGeometry = new THREE.CubeGeometry( 20000, 20000, 20000 );
	
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
		
		camera = new Camera({
			fov: 75,
			aspect_ratio: window.innerWidth / window.innerHeight,
			near_plane: 0.1,
			far_plane: 100000,
			position: new THREE.Vector3(0, 200, -500),
			up: new THREE.Vector3(0, 1, 0),
			dir: new THREE.Vector3(0, -1, 1),
			target: ship
		});
		
		// SHIP CONTROLS
		shipControls = new ObjectControls(ship);
		shipControls.movementSpeed = 1000;
		//shipControls.autoForward = true;
		
		animate(); 
	});
}

function onWindowResize() {

	camera.camera.aspect = window.innerWidth / window.innerHeight;
	camera.camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function animate() {
	var delta = clock.getDelta();
	shipControls.update(delta);
	camera.updateCamera();
	requestAnimationFrame( animate );

	render();
}

// render loop 
function render() {
	renderer.render( scene, camera.camera );
}

