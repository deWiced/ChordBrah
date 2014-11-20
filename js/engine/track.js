

function createTrack(){

	var randomPoints = [
	                    new THREE.Vector3(0,0,shipStartPosition),
	                    new THREE.Vector3(-2000,0,-8000),
	                    new THREE.Vector3(1000,2000,-7000),
	                    new THREE.Vector3(2000,3000,-4000),
	                    new THREE.Vector3(0,-1000,-1000),
	                    new THREE.Vector3(2000,1500,1200),
	                    new THREE.Vector3(2000,3000,3000),
	                    new THREE.Vector3(400,0,4500),
	                    new THREE.Vector3(400,-2000,4500),
	                    new THREE.Vector3(400,-4000,4500),
	                    new THREE.Vector3(400,-20000,4500),
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