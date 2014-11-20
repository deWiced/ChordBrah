

function createTrack(){

	var randomPoints = [
		// down
	    new THREE.Vector3(0,0,shipStartPosition),
	    new THREE.Vector3(300,1000,-500),
	    new THREE.Vector3(400,-2000,4500),
	    new THREE.Vector3(400,-5000,4500),
	    new THREE.Vector3(4000,-10000,4500),
	    new THREE.Vector3(4000,-15000,8500),
	    new THREE.Vector3(400,-20000,8500),
	    new THREE.Vector3(700,-30000,7500),
	    // back up
	    new THREE.Vector3(10000,-30000,4500),
	    new THREE.Vector3(10000,-29000,1000),
	    new THREE.Vector3(8000,-20000,1000),
	    new THREE.Vector3(3000,-18000,500),
	    new THREE.Vector3(3000,-14000,-300),
	    new THREE.Vector3(1000,-10000,-3000),
	    new THREE.Vector3(1000,-5000,-4000),
	    new THREE.Vector3(-5000,-3000, -15000),
	    //new THREE.Vector3(-5000,1000, -7000),
	    /*new THREE.Vector3(-500,3000, -7000),
	    new THREE.Vector3(-700,3000,-10000),
	    new THREE.Vector3(-1000,1000,-11000),
	    new THREE.Vector3(-300,500,500),*/
	    //new THREE.Vector3(0,0,shipStartPosition),
	
	];
		
	var randomSpline =  new THREE.SplineCurve3( randomPoints );
	
	//
	
	var extrudeSettings = {
		steps			: 400,
		bevelEnabled	: false,
		extrudePath		: randomSpline
	};
	
	
	//tube = new THREE.TubeGeometry(randomSpline, 100, 100, 3, false); 
	tube = new THREE.TubeGeometry(randomSpline, 100, 500, 8, false);
	//tube = 
	addGeometry(tube, 0xffffff);
	//setScale(1.2);
	//
}

function addGeometry( geometry, color ) {

	// 3d shape

	tubeMesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [
		/*new THREE.MeshLambertMaterial({
			color: color
		}),*/
		new THREE.MeshBasicMaterial({
			color: color,
			opacity: 0.3,
			wireframe: true,
			transparent: true
	})]);

	scene.add( tubeMesh );

}

function setScale( scale) {

	tubeMesh.scale.set( scale, scale, scale );

}