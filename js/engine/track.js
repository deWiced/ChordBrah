
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
	
	var extrudeSettings = {
		steps			: 400,
		bevelEnabled	: false,
		extrudePath		: randomSpline
	};
	
	
	//tube = new THREE.TubeGeometry(randomSpline, 100, 100, 3, false); 
	tube = new THREE.TubeGeometry(randomSpline, 150, 500, 8, false);
	addGeometry(tube, 0xffffff);
	//setScale(1.2);
}

var coloredMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.7, wireframe: false, side: THREE.DoubleSide, color: 0x00FFFF, vertexColors: THREE.VertexColors });
var invisibleMaterail = new THREE.MeshBasicMaterial({ visible: false });
var materials = [];


function addGeometry( geometry, color ) {

	for(var i=0; i<geometry.faces.length; i++)
		materials.push(invisibleMaterail);
	
	tubeMesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
	
	for(var i=0; i<tubeMesh.geometry.faces.length; i++)
		tubeMesh.geometry.faces[i].materialIndex = i;
	
	scene.add(tubeMesh);
	
	// add wireframe
	var edges = new THREE.WireframeHelper(tubeMesh, color);
	edges.material.linewidth = 0.1;
	scene.add(edges);

}



function setScale( scale) {

	tubeMesh.scale.set( scale, scale, scale );

}

function addCheckpoint(startP, endP) {
	console.log(startP, endP);
	// add start
	var checkpoint_geometry = new THREE.PlaneGeometry(2000, 1000);
	var checkpoint_material = new THREE.MeshBasicMaterial({color: 0x00CC00, transparent: true, opacity: 0.3 });
	checkpoint_material.side = THREE.DoubleSide;
	var checkpoint_mesh = new THREE.Mesh(checkpoint_geometry, checkpoint_material);
	checkpoint_mesh.position.set(startP.x, startP.y , startP.z);
	checkpoint_mesh.rotation.x = Math.PI / 2;
	scene.add(checkpoint_mesh);
	
	// add end
	var checkpoint_geometry_end = new THREE.PlaneGeometry(2000, 1000);
	var checkpoint_material_end = new THREE.MeshBasicMaterial({color: 0xFF0066, transparent: true, opacity: 0.3 });
	checkpoint_material_end.side = THREE.DoubleSide;
	var checkpoint_mesh_end = new THREE.Mesh(checkpoint_geometry_end, checkpoint_material_end);
	checkpoint_mesh_end.position.set(endP.x, endP.y , endP.z);
	checkpoint_mesh_end.rotation.x = Math.PI / 2;
	
	scene.add(checkpoint_mesh_end);

}

var dirtyIndexes = [];

function markTrack() {
	
	var indexOffsets;
	switch(orientation) {
	case "up": 
		indexOffsets = [6, 7, 8, 9];
		break;
	case "right":
		indexOffsets = [2, 3, 4, 5];
		break;
	case "down":
		indexOffsets = [0, 1 , 14, 15];
		break;
	case "left":
		indexOffsets = [10, 11, 12, 13];
		break;
	}
	
	for(var i=0; i < indexOffsets.length; i++) {
		materials[colorIndex + indexOffsets[i]] = coloredMaterial;
		materials[colorIndex + indexOffsets[i] + 16] = coloredMaterial;
		
		dirtyIndexes.push(colorIndex + indexOffsets[i]);
		dirtyIndexes.push(colorIndex + indexOffsets[i] + 16);
	}
	
}

function clearMark() {
	for(var i = dirtyIndexes.length -1 ; i >= 0; i--) {
		materials[dirtyIndexes[i]] = invisibleMaterail;
		dirtyIndexes.pop();
	}
}