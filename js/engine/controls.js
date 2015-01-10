
ObjectControls = function ( object, domElement ) {

	var movement = Object.freeze({ IDLE: 0, FORWARD: 1, REWIND: 2 });

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.enabled = true;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = true;
	this.verticalMax = Math.PI;

	this.constrainHorizontal = true;
	this.horizontalMax = Math.PI;

	this.autoSpeedFactor = 0.0;

	this.moveForward = movement.IDLE;
	this.moveBackward = movement.IDLE;
	this.moveLeft = movement.IDLE;
	this.moveRight = movement.IDLE;

	this.x_offset = 0;
	this.y_offset = 0;
	
	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}

	//

	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	this.onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = movement.FORWARD; orientation = "up"; colorGUIselection(); break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = movement.FORWARD; orientation = "left"; colorGUIselection(); break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = movement.FORWARD; orientation = "down"; colorGUIselection(); break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = movement.FORWARD; orientation = "right"; colorGUIselection(); break;

			//case 82: /*R*/ this.moveUp = true; break;
			//case 70: /*F*/ this.moveDown = true; break;

		}

	};

	this.onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ this.moveForward = movement.REWIND; orientation = null; clearGUIselection(); break;

			case 37: /*left*/
			case 65: /*A*/ this.moveLeft = movement.REWIND; orientation = null; clearGUIselection(); break;

			case 40: /*down*/
			case 83: /*S*/ this.moveBackward = movement.REWIND; orientation = null; clearGUIselection(); break;

			case 39: /*right*/
			case 68: /*D*/ this.moveRight = movement.REWIND; orientation = null; clearGUIselection(); break;

		}

	};

	this.update = function( delta ) {

		if ( this.enabled === false ) return;

		if ( this.heightSpeed ) {

			var y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax );
			var heightDelta = y - this.heightMin;

			this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		// ADVANCE FORWARD!
		if ( this.moveForward == movement.FORWARD && this.moveBackward == movement.IDLE ) { //( this.autoForward && this.moveBackward != movement.FORWARD ) ) {
			this.y_offset = THREE.Math.clamp(this.y_offset + actualMoveSpeed, 0, this.verticalMax);
		}
		if ( this.moveBackward == movement.FORWARD && this.moveForward == movement.IDLE ) {
			this.y_offset = THREE.Math.clamp(this.y_offset - actualMoveSpeed, -this.verticalMax, 0);
		}
		if ( this.moveLeft == movement.FORWARD && this.moveRight == movement.IDLE ) {
			this.x_offset = THREE.Math.clamp(this.x_offset + actualMoveSpeed, 0, this.horizontalMax);
		}
		if ( this.moveRight == movement.FORWARD && this.moveLeft == movement.IDLE ) {
			this.x_offset = THREE.Math.clamp(this.x_offset - actualMoveSpeed, -this.horizontalMax, 0);
		}

		// REWIND!
		if ( this.moveForward == movement.REWIND ) { //( this.autoForward && this.moveBackward != movement.FORWARD ) ) {
			this.y_offset = THREE.Math.clamp(this.y_offset - actualMoveSpeed, 0, this.verticalMax);
			this.moveForward = this.y_offset == 0 ? movement.IDLE : movement.REWIND;
		}
		if ( this.moveBackward == movement.REWIND ) {
			this.y_offset = THREE.Math.clamp(this.y_offset + actualMoveSpeed, -this.verticalMax, 0);
			this.moveBackward = this.y_offset == 0 ? movement.IDLE : movement.REWIND;
		}
		if ( this.moveLeft == movement.REWIND ) {
			this.x_offset = THREE.Math.clamp(this.x_offset - actualMoveSpeed, 0, this.horizontalMax);
			this.moveLeft = this.x_offset == 0 ? movement.IDLE : movement.REWIND;
		}
		if ( this.moveRight == movement.REWIND ) {
			this.x_offset = THREE.Math.clamp(this.x_offset + actualMoveSpeed, -this.horizontalMax, 0);
			this.moveRight = this.x_offset == 0 ? movement.IDLE : movement.REWIND;
		}

	};


	this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	window.addEventListener( 'keydown', bind( this, this.onKeyDown ), false );
	window.addEventListener( 'keyup', bind( this, this.onKeyUp ), false );

	function bind( scope, fn ) {

		return function () {

			fn.apply( scope, arguments );

		};

	};

	this.handleResize();

};
