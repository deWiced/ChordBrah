/**
 * 
 */

// constants
var FOV = 75, NEAR_PLANE = 0.1, FAR_PLANE = 1000;

var scene, camera,controls, renderer, container
var skyBox;

// initialization
function init() {
	camera = new THREE.PerspectiveCamera( FOV, window.innerWidth / window.innerHeight, 0.1, 20000 );
	camera.position.z = 500;
	
	// CONTROLS
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );
	
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
	createSkySphere();
	
	// SPACESHIP
	createSpaceShip();
	
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );
	
	window.addEventListener( 'resize', onWindowResize, false );

	render();
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

//create and add space ship
function createSpaceShip() {
	var loader = new THREE.OBJMTLLoader();
	loader.load( 'models/FeisarShip/Feisar_Ship.obj', 'models/FeisarShip/Feisar_Ship.mtl', function ( object ) {
		scene.add( object );
	});
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	render();

}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
}

// render loop 
function render() {
	renderer.render( scene, camera );
}

