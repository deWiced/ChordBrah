
GrannyKnotModf = THREE.Curve.create( function(){},

	 function(t) {
	    t = 2 * Math.PI * t;

	    var x = -150 * Math.cos(3*t) + 90 * Math.sin(2*t) - 150 * Math.cos(4 * t);
	    var y = 80 * Math.cos(5 * t) - 100 * Math.cos(4 * t) + 120 * Math.sin(3 * t);
	    var z = 130 * Math.cos(2 * t) - 80 * Math.sin(3 * t);
	    return new THREE.Vector3(x, y, z).multiplyScalar(85);
	}
);

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
	
	var grannyModf = new GrannyKnotModf();
	
	// tube = new THREE.TubeGeometry(grannyModf, 150, 500, 8, false);
	tube = new THREE.TubeGeometry(grannyModf, 230, 500, 8, false);
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

var checkpointMeshes = [];

function addCheckpoint(startP, endP) {
	// add start
	var checkpoint_geometry = new THREE.PlaneBufferGeometry(2000, 1000);
	var checkpoint_material = new THREE.MeshBasicMaterial({color: 0x00CC00, transparent: true, opacity: 0.3 });
	checkpoint_material.side = THREE.DoubleSide;
	var checkpoint_mesh = new THREE.Mesh(checkpoint_geometry, checkpoint_material);
	var point = tube.parameters.path.getPointAt(startP);
	
	checkpoint_mesh.position.set(point.x, point.y, point.z);
	rotateCheckpoint(startP, checkpoint_mesh);
	
	scene.add(checkpoint_mesh);
	checkpointMeshes.push(checkpoint_mesh);
	
	// add end
	var checkpoint_geometry_end = new THREE.PlaneBufferGeometry(2000, 1000);
	var checkpoint_material_end = new THREE.MeshBasicMaterial({color: 0xFF0066, transparent: true, opacity: 0.3 });
	checkpoint_material_end.side = THREE.DoubleSide;
	var checkpoint_mesh_end = new THREE.Mesh(checkpoint_geometry_end, checkpoint_material_end);
	point = tube.parameters.path.getPointAt(endP);
	
	checkpoint_mesh_end.position.set(point.x, point.y, point.z);
	rotateCheckpoint(endP, checkpoint_mesh_end);
	
	scene.add(checkpoint_mesh_end);
	checkpointMeshes.push(checkpoint_mesh_end);
}

function rotateCheckpoint(posP, mesh) {
	// interpolation
	var segments_temp = tube.tangents.length;
	var pickt_temp = posP * segments_temp ;
	var pick_temp  = Math.floor( pickt_temp  );
	var pickNext_temp = ( pick_temp  + 1 ) % segments_temp ;
	
	var binormal_temp = new THREE.Vector3(), normal_temp = new THREE.Vector3();
	binormal_temp.subVectors( tube.binormals[ pickNext_temp ], tube.binormals[ pick_temp ] );
	binormal_temp.multiplyScalar( pickt_temp - pick_temp ).add( tube.binormals[ pick_temp ] );

	var dir_temp = tube.parameters.path.getTangentAt( posP );
	normal_temp.copy( binormal_temp ).cross( dir_temp );

	var target_temp = new Target();
	target_temp.update(mesh.position, normal_temp);
	mesh.position.copy( target_temp.position );
	
	var lookAt_temp = tube.parameters.path.getPointAt( ( posP + 30 / tube.parameters.path.getLength() ) % 1 ).multiplyScalar( scale );
	lookAt_temp.copy(mesh.position).sub( dir_temp );
	
	mesh.matrix.lookAt(mesh.position, lookAt_temp, target_temp.normal);
	mesh.rotation.setFromRotationMatrix( mesh.matrix, mesh.rotation.order );
}

function removeCheckpoint() {
	var temp = checkpointMeshes.splice(0, 2);
	scene.remove(temp[0]);
	scene.remove(temp[1]);
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