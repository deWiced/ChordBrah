Target = function() {

	this.normal = new THREE.Vector3();
	this.location = new THREE.Vector3();
	
	this.update = function( position, normal )
	{
		this.position = position;
		this.normal = normal;
	}
}