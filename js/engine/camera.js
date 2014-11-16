Camera = function(options)
{
	this.options = options;

	this.updateCamera = function()
	{
		this.camera.position.set(
			this.options.target.position.x, 
			this.options.target.position.y + this.options.position.y, 
			this.options.target.position.z + this.options.position.z
		);

		this.camera.up = this.options.up;
		this.camera.lookAt(new THREE.Vector3(
			this.options.target.position.x, 
			this.options.target.position.y, 
			this.options.target.position.z)
		);
	}

	this.camera = new THREE.PerspectiveCamera(
		this.options.fov, 
		this.options.aspect_ratio, 
		this.options.near_plane, 
		this.options.far_plane
	);

	this.updateCamera();
}