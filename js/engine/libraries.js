/***********************************************************************************************
			THREE JS 			
************************************************************************************************/

// File:src/Three.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

var THREE = { REVISION: '69' };

// browserify support

if ( typeof module === 'object' ) {

	module.exports = THREE;

}

// polyfills

if ( Math.sign === undefined ) {

	Math.sign = function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : 0;

	};

}

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent.button

THREE.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };

// GL STATE CONSTANTS

THREE.CullFaceNone = 0;
THREE.CullFaceBack = 1;
THREE.CullFaceFront = 2;
THREE.CullFaceFrontBack = 3;

THREE.FrontFaceDirectionCW = 0;
THREE.FrontFaceDirectionCCW = 1;

// SHADOWING TYPES

THREE.BasicShadowMap = 0;
THREE.PCFShadowMap = 1;
THREE.PCFSoftShadowMap = 2;

// MATERIAL CONSTANTS

// side

THREE.FrontSide = 0;
THREE.BackSide = 1;
THREE.DoubleSide = 2;

// shading

THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;

// colors

THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;

// blending modes

THREE.NoBlending = 0;
THREE.NormalBlending = 1;
THREE.AdditiveBlending = 2;
THREE.SubtractiveBlending = 3;
THREE.MultiplyBlending = 4;
THREE.CustomBlending = 5;

// custom blending equations
// (numbers start from 100 not to clash with other
//  mappings to OpenGL constants defined in Texture.js)

THREE.AddEquation = 100;
THREE.SubtractEquation = 101;
THREE.ReverseSubtractEquation = 102;
THREE.MinEquation = 103;
THREE.MaxEquation = 104;

// custom blending destination factors

THREE.ZeroFactor = 200;
THREE.OneFactor = 201;
THREE.SrcColorFactor = 202;
THREE.OneMinusSrcColorFactor = 203;
THREE.SrcAlphaFactor = 204;
THREE.OneMinusSrcAlphaFactor = 205;
THREE.DstAlphaFactor = 206;
THREE.OneMinusDstAlphaFactor = 207;

// custom blending source factors

//THREE.ZeroFactor = 200;
//THREE.OneFactor = 201;
//THREE.SrcAlphaFactor = 204;
//THREE.OneMinusSrcAlphaFactor = 205;
//THREE.DstAlphaFactor = 206;
//THREE.OneMinusDstAlphaFactor = 207;
THREE.DstColorFactor = 208;
THREE.OneMinusDstColorFactor = 209;
THREE.SrcAlphaSaturateFactor = 210;


// TEXTURE CONSTANTS

THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.AddOperation = 2;

// Mapping modes

THREE.UVMapping = function () {};

THREE.CubeReflectionMapping = function () {};
THREE.CubeRefractionMapping = function () {};

THREE.SphericalReflectionMapping = function () {};
THREE.SphericalRefractionMapping = function () {};

// Wrapping modes

THREE.RepeatWrapping = 1000;
THREE.ClampToEdgeWrapping = 1001;
THREE.MirroredRepeatWrapping = 1002;

// Filters

THREE.NearestFilter = 1003;
THREE.NearestMipMapNearestFilter = 1004;
THREE.NearestMipMapLinearFilter = 1005;
THREE.LinearFilter = 1006;
THREE.LinearMipMapNearestFilter = 1007;
THREE.LinearMipMapLinearFilter = 1008;

// Data types

THREE.UnsignedByteType = 1009;
THREE.ByteType = 1010;
THREE.ShortType = 1011;
THREE.UnsignedShortType = 1012;
THREE.IntType = 1013;
THREE.UnsignedIntType = 1014;
THREE.FloatType = 1015;

// Pixel types

//THREE.UnsignedByteType = 1009;
THREE.UnsignedShort4444Type = 1016;
THREE.UnsignedShort5551Type = 1017;
THREE.UnsignedShort565Type = 1018;

// Pixel formats

THREE.AlphaFormat = 1019;
THREE.RGBFormat = 1020;
THREE.RGBAFormat = 1021;
THREE.LuminanceFormat = 1022;
THREE.LuminanceAlphaFormat = 1023;

// DDS / ST3C Compressed texture formats

THREE.RGB_S3TC_DXT1_Format = 2001;
THREE.RGBA_S3TC_DXT1_Format = 2002;
THREE.RGBA_S3TC_DXT3_Format = 2003;
THREE.RGBA_S3TC_DXT5_Format = 2004;


// PVRTC compressed texture formats

THREE.RGB_PVRTC_4BPPV1_Format = 2100;
THREE.RGB_PVRTC_2BPPV1_Format = 2101;
THREE.RGBA_PVRTC_4BPPV1_Format = 2102;
THREE.RGBA_PVRTC_2BPPV1_Format = 2103;


// File:src/math/Color.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Color = function ( color ) {

	if ( arguments.length === 3 ) {

		return this.setRGB( arguments[ 0 ], arguments[ 1 ], arguments[ 2 ] );

	}

	return this.set( color )

};

THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,

	set: function ( value ) {

		if ( value instanceof THREE.Color ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	},

	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	setHSL: function ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			var hue2rgb = function ( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			};

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	},

	setStyle: function ( style ) {

		// rgb(255,0,0)

		if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {

			var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

			return this;

		}

		// rgb(100%,0%,0%)

		if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {

			var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

			return this;

		}

		// #ff0000

		if ( /^\#([0-9a-f]{6})$/i.test( style ) ) {

			var color = /^\#([0-9a-f]{6})$/i.exec( style );

			this.setHex( parseInt( color[ 1 ], 16 ) );

			return this;

		}

		// #f00

		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );

			return this;

		}

		// red

		if ( /^(\w+)$/i.test( style ) ) {

			this.setHex( THREE.ColorKeywords[ style ] );

			return this;

		}


	},

	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	},

	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	},

	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	getHSL: function ( optionalTarget ) {

		// h,s,l ranges are in 0.0 - 1.0

		var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

		var r = this.r, g = this.g, b = this.b;

		var max = Math.max( r, g, b );
		var min = Math.min( r, g, b );

		var hue, saturation;
		var lightness = ( min + max ) / 2.0;

		if ( min === max ) {

			hue = 0;
			saturation = 0;

		} else {

			var delta = max - min;

			saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

			switch ( max ) {

				case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
				case g: hue = ( b - r ) / delta + 2; break;
				case b: hue = ( r - g ) / delta + 4; break;

			}

			hue /= 6;

		}

		hsl.h = hue;
		hsl.s = saturation;
		hsl.l = lightness;

		return hsl;

	},

	getStyle: function () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},

	offsetHSL: function ( h, s, l ) {

		var hsl = this.getHSL();

		hsl.h += h; hsl.s += s; hsl.l += l;

		this.setHSL( hsl.h, hsl.s, hsl.l );

		return this;

	},

	add: function ( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	},

	addColors: function ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	},

	addScalar: function ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	},

	multiply: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	},

	lerp: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	equals: function ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	},

	fromArray: function ( array ) {

		this.r = array[ 0 ];
		this.g = array[ 1 ];
		this.b = array[ 2 ];

		return this;

	},

	toArray: function () {

		return [ this.r, this.g, this.b ];

	},

	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};

THREE.ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

// File:src/math/Quaternion.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Quaternion = function ( x, y, z, w ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	_x: 0,_y: 0, _z: 0, _w: 0,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get w () {

		return this._w;

	},

	set w ( value ) {

		this._w = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, w ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._w = w;

		this.onChangeCallback();

		return this;

	},

	copy: function ( quaternion ) {

		this._x = quaternion.x;
		this._y = quaternion.y;
		this._z = quaternion.z;
		this._w = quaternion.w;

		this.onChangeCallback();

		return this;

	},

	setFromEuler: function ( euler, update ) {

		if ( euler instanceof THREE.Euler === false ) {

			throw new Error( 'THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );
		}

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( euler._x / 2 );
		var c2 = Math.cos( euler._y / 2 );
		var c3 = Math.cos( euler._z / 2 );
		var s1 = Math.sin( euler._x / 2 );
		var s2 = Math.sin( euler._y / 2 );
		var s3 = Math.sin( euler._z / 2 );

		if ( euler.order === 'XYZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'YXZ' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'ZXY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'ZYX' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( euler.order === 'YZX' ) {

			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( euler.order === 'XZY' ) {

			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		var halfAngle = angle / 2, s = Math.sin( halfAngle );

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos( halfAngle );

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;

		}

		this.onChangeCallback();

		return this;

	},

	setFromUnitVectors: function () {

		// http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final

		// assumes direction vectors vFrom and vTo are normalized

		var v1, r;

		var EPS = 0.000001;

		return function ( vFrom, vTo ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			r = vFrom.dot( vTo ) + 1;

			if ( r < EPS ) {

				r = 0;

				if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {

					v1.set( - vFrom.y, vFrom.x, 0 );

				} else {

					v1.set( 0, - vFrom.z, vFrom.y );

				}

			} else {

				v1.crossVectors( vFrom, vTo );

			}

			this._x = v1.x;
			this._y = v1.y;
			this._z = v1.z;
			this._w = r;

			this.normalize();

			return this;

		}

	}(),

	inverse: function () {

		this.conjugate().normalize();

		return this;

	},

	conjugate: function () {

		this._x *= - 1;
		this._y *= - 1;
		this._z *= - 1;

		this.onChangeCallback();

		return this;

	},

	dot: function ( v ) {

		return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;

	},

	lengthSq: function () {

		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;

	},

	length: function () {

		return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );

	},

	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;

		} else {

			l = 1 / l;

			this._x = this._x * l;
			this._y = this._y * l;
			this._z = this._z * l;
			this._w = this._w * l;

		}

		this.onChangeCallback();

		return this;

	},

	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	},

	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
		var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this.onChangeCallback();

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
		return vector.applyQuaternion( this );

	},

	slerp: function ( qb, t ) {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		var x = this._x, y = this._y, z = this._z, w = this._w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

		if ( cosHalfTheta < 0 ) {

			this._w = - qb._w;
			this._x = - qb._x;
			this._y = - qb._y;
			this._z = - qb._z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this._w = w;
			this._x = x;
			this._y = y;
			this._z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this._w = 0.5 * ( w + this._w );
			this._x = 0.5 * ( x + this._x );
			this._y = 0.5 * ( y + this._y );
			this._z = 0.5 * ( z + this._z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this._w = ( w * ratioA + this._w * ratioB );
		this._x = ( x * ratioA + this._x * ratioB );
		this._y = ( y * ratioA + this._y * ratioB );
		this._z = ( z * ratioA + this._z * ratioB );

		this.onChangeCallback();

		return this;

	},

	equals: function ( quaternion ) {

		return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this._x = array[ offset ];
		this._y = array[ offset + 1 ];
		this._z = array[ offset + 2 ];
		this._w = array[ offset + 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._w;

		return array;

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Quaternion( this._x, this._y, this._z, this._w );

	}

};

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	return qm.copy( qa ).slerp( qb, t );

}

// File:src/math/Vector2.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	constructor: THREE.Vector2,

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	},

	multiply: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		return this;
	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector2();
				max = new THREE.Vector2();

			}

			min.set( minVal, minVal );
			max.set( maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	}

};

// File:src/math/Vector3.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	},

	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	},

	multiplyVectors: function ( a, b ) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	},

	applyEuler: function () {

		var quaternion;

		return function ( euler ) {

			if ( euler instanceof THREE.Euler === false ) {

				console.error( 'THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order.' );

			}

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromEuler( euler ) );

			return this;

		};

	}(),

	applyAxisAngle: function () {

		var quaternion;

		return function ( axis, angle ) {

			if ( quaternion === undefined ) quaternion = new THREE.Quaternion();

			this.applyQuaternion( quaternion.setFromAxisAngle( axis, angle ) );

			return this;

		};

	}(),

	applyMatrix3: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	},

	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

		return this;

	},

	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;
		var d = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] ); // perspective divide

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ] ) * d;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ] ) * d;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * d;

		return this;

	},

	applyQuaternion: function ( q ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	},

	project: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.projectionMatrix, matrix.getInverse( camera.matrixWorld ) );
			return this.applyProjection( matrix );

		};

	}(),

	unproject: function () {

		var matrix;

		return function ( camera ) {

			if ( matrix === undefined ) matrix = new THREE.Matrix4();

			matrix.multiplyMatrices( camera.matrixWorld, matrix.getInverse( camera.projectionMatrix ) );
			return this.applyProjection( matrix );

		};

	}(),

	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x, y = this.y, z = this.z;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		this.normalize();

		return this;

	},

	divide: function ( v ) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;

		}

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		return this;

	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector3();
				max = new THREE.Vector3();

			}

			min.set( minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

	floor: function () {

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	},

	ceil: function () {

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	},

	round: function () {

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	},

	roundToZero: function () {

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	},

	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var x = this.x, y = this.y, z = this.z;

		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;

		return this;

	},

	crossVectors: function ( a, b ) {

		var ax = a.x, ay = a.y, az = a.z;
		var bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	},

	projectOnVector: function () {

		var v1, dot;

		return function ( vector ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( vector ).normalize();

			dot = this.dot( v1 );

			return this.copy( v1 ).multiplyScalar( dot );

		};

	}(),

	projectOnPlane: function () {

		var v1;

		return function ( planeNormal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		}

	}(),

	reflect: function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1;

		return function ( normal ) {

			if ( v1 === undefined ) v1 = new THREE.Vector3();

			return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

		}

	}(),

	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, - 1, 1 ) );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	},

	setEulerFromRotationMatrix: function ( m, order ) {

		console.error( 'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.' );

	},

	setEulerFromQuaternion: function ( q, order ) {

		console.error( 'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.' );

	},

	getPositionFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().' );

		return this.setFromMatrixPosition( m );

	},

	getScaleFromMatrix: function ( m ) {

		console.warn( 'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().' );

		return this.setFromMatrixScale( m );
	},

	getColumnFromMatrix: function ( index, matrix ) {

		console.warn( 'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().' );

		return this.setFromMatrixColumn( index, matrix );

	},

	setFromMatrixPosition: function ( m ) {

		this.x = m.elements[ 12 ];
		this.y = m.elements[ 13 ];
		this.z = m.elements[ 14 ];

		return this;

	},

	setFromMatrixScale: function ( m ) {

		var sx = this.set( m.elements[ 0 ], m.elements[ 1 ], m.elements[  2 ] ).length();
		var sy = this.set( m.elements[ 4 ], m.elements[ 5 ], m.elements[  6 ] ).length();
		var sz = this.set( m.elements[ 8 ], m.elements[ 9 ], m.elements[ 10 ] ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	setFromMatrixColumn: function ( index, matrix ) {

		var offset = index * 4;

		var me = matrix.elements;

		this.x = me[ offset ];
		this.y = me[ offset + 1 ];
		this.z = me[ offset + 2 ];

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	}

};

// File:src/math/Vector4.js

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Vector4.prototype = {

	constructor: THREE.Vector4,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	setX: function ( x ) {

		this.x = x;

		return this;

	},

	setY: function ( y ) {

		this.y = y;

		return this;

	},

	setZ: function ( z ) {

		this.z = z;

		return this;

	},

	setW: function ( w ) {

		this.w = w;

		return this;

	},

	setComponent: function ( index, value ) {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			case 3: this.w = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	getComponent: function ( index ) {

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw new Error( 'index is out of range: ' + index );

		}

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = ( v.w !== undefined ) ? v.w : 1;

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;
		this.w += s;

		return this;

	},

	addVectors: function ( a, b ) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	subVectors: function ( a, b ) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;

		return this;

	},

	multiplyScalar: function ( scalar ) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		this.w *= scalar;

		return this;

	},

	applyMatrix4: function ( m ) {

		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] * w;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] * w;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] * w;
		this.w = e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] * w;

		return this;

	},

	divideScalar: function ( scalar ) {

		if ( scalar !== 0 ) {

			var invScalar = 1 / scalar;

			this.x *= invScalar;
			this.y *= invScalar;
			this.z *= invScalar;
			this.w *= invScalar;

		} else {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		}

		return this;

	},

	setAxisAngleFromQuaternion: function ( q ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm

		// q is assumed to be normalized

		this.w = 2 * Math.acos( q.w );

		var s = Math.sqrt( 1 - q.w * q.w );

		if ( s < 0.0001 ) {

			 this.x = 1;
			 this.y = 0;
			 this.z = 0;

		} else {

			 this.x = q.x / s;
			 this.y = q.y / s;
			 this.z = q.z / s;

		}

		return this;

	},

	setAxisAngleFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var angle, x, y, z,		// variables for result
			epsilon = 0.01,		// margin to allow for rounding errors
			epsilon2 = 0.1,		// margin to distinguish between 0 and 180 degrees

			te = m.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		if ( ( Math.abs( m12 - m21 ) < epsilon )
		   && ( Math.abs( m13 - m31 ) < epsilon )
		   && ( Math.abs( m23 - m32 ) < epsilon ) ) {

			// singularity found
			// first check for identity matrix which must have +1 for all terms
			// in leading diagonal and zero in other terms

			if ( ( Math.abs( m12 + m21 ) < epsilon2 )
			   && ( Math.abs( m13 + m31 ) < epsilon2 )
			   && ( Math.abs( m23 + m32 ) < epsilon2 )
			   && ( Math.abs( m11 + m22 + m33 - 3 ) < epsilon2 ) ) {

				// this singularity is identity matrix so angle = 0

				this.set( 1, 0, 0, 0 );

				return this; // zero angle, arbitrary axis

			}

			// otherwise this singularity is angle = 180

			angle = Math.PI;

			var xx = ( m11 + 1 ) / 2;
			var yy = ( m22 + 1 ) / 2;
			var zz = ( m33 + 1 ) / 2;
			var xy = ( m12 + m21 ) / 4;
			var xz = ( m13 + m31 ) / 4;
			var yz = ( m23 + m32 ) / 4;

			if ( ( xx > yy ) && ( xx > zz ) ) { // m11 is the largest diagonal term

				if ( xx < epsilon ) {

					x = 0;
					y = 0.707106781;
					z = 0.707106781;

				} else {

					x = Math.sqrt( xx );
					y = xy / x;
					z = xz / x;

				}

			} else if ( yy > zz ) { // m22 is the largest diagonal term

				if ( yy < epsilon ) {

					x = 0.707106781;
					y = 0;
					z = 0.707106781;

				} else {

					y = Math.sqrt( yy );
					x = xy / y;
					z = yz / y;

				}

			} else { // m33 is the largest diagonal term so base result on this

				if ( zz < epsilon ) {

					x = 0.707106781;
					y = 0.707106781;
					z = 0;

				} else {

					z = Math.sqrt( zz );
					x = xz / z;
					y = yz / z;

				}

			}

			this.set( x, y, z, angle );

			return this; // return 180 deg rotation

		}

		// as we have reached here there are no singularities so we can handle normally

		var s = Math.sqrt( ( m32 - m23 ) * ( m32 - m23 )
						  + ( m13 - m31 ) * ( m13 - m31 )
						  + ( m21 - m12 ) * ( m21 - m12 ) ); // used to normalize

		if ( Math.abs( s ) < 0.001 ) s = 1;

		// prevent divide by zero, should not happen if matrix is orthogonal and should be
		// caught by singularity test above, but I've left it in just in case

		this.x = ( m32 - m23 ) / s;
		this.y = ( m13 - m31 ) / s;
		this.z = ( m21 - m12 ) / s;
		this.w = Math.acos( ( m11 + m22 + m33 - 1 ) / 2 );

		return this;

	},

	min: function ( v ) {

		if ( this.x > v.x ) {

			this.x = v.x;

		}

		if ( this.y > v.y ) {

			this.y = v.y;

		}

		if ( this.z > v.z ) {

			this.z = v.z;

		}

		if ( this.w > v.w ) {

			this.w = v.w;

		}

		return this;

	},

	max: function ( v ) {

		if ( this.x < v.x ) {

			this.x = v.x;

		}

		if ( this.y < v.y ) {

			this.y = v.y;

		}

		if ( this.z < v.z ) {

			this.z = v.z;

		}

		if ( this.w < v.w ) {

			this.w = v.w;

		}

		return this;

	},

	clamp: function ( min, max ) {

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( this.x < min.x ) {

			this.x = min.x;

		} else if ( this.x > max.x ) {

			this.x = max.x;

		}

		if ( this.y < min.y ) {

			this.y = min.y;

		} else if ( this.y > max.y ) {

			this.y = max.y;

		}

		if ( this.z < min.z ) {

			this.z = min.z;

		} else if ( this.z > max.z ) {

			this.z = max.z;

		}

		if ( this.w < min.w ) {

			this.w = min.w;

		} else if ( this.w > max.w ) {

			this.w = max.w;

		}

		return this;

	},

	clampScalar: ( function () {

		var min, max;

		return function ( minVal, maxVal ) {

			if ( min === undefined ) {

				min = new THREE.Vector4();
				max = new THREE.Vector4();

			}

			min.set( minVal, minVal, minVal, minVal );
			max.set( maxVal, maxVal, maxVal, maxVal );

			return this.clamp( min, max );

		};

	} )(),

    floor: function () {

        this.x = Math.floor( this.x );
        this.y = Math.floor( this.y );
        this.z = Math.floor( this.z );
        this.w = Math.floor( this.w );

        return this;

    },

    ceil: function () {

        this.x = Math.ceil( this.x );
        this.y = Math.ceil( this.y );
        this.z = Math.ceil( this.z );
        this.w = Math.ceil( this.w );

        return this;

    },

    round: function () {

        this.x = Math.round( this.x );
        this.y = Math.round( this.y );
        this.z = Math.round( this.z );
        this.w = Math.round( this.w );

        return this;

    },

    roundToZero: function () {

        this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
        this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
        this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
        this.w = ( this.w < 0 ) ? Math.ceil( this.w ) : Math.floor( this.w );

        return this;

    },

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;
		this.w = - this.w;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	lengthManhattan: function () {

		return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z ) + Math.abs( this.w );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength ) {

			this.multiplyScalar( l / oldLength );

		}

		return this;

	},

	lerp: function ( v, alpha ) {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;
		this.w += ( v.w - this.w ) * alpha;

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	},

	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];
		this.w = array[ offset + 3 ];

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;
		array[ offset + 3 ] = this.w;

		return array;

	},

	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	}

};

// File:src/math/Euler.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Euler = function ( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || THREE.Euler.DefaultOrder;

};

THREE.Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

THREE.Euler.DefaultOrder = 'XYZ';

THREE.Euler.prototype = {

	constructor: THREE.Euler,

	_x: 0, _y: 0, _z: 0, _order: THREE.Euler.DefaultOrder,

	get x () {

		return this._x;

	},

	set x ( value ) {

		this._x = value;
		this.onChangeCallback();

	},

	get y () {

		return this._y;

	},

	set y ( value ) {

		this._y = value;
		this.onChangeCallback();

	},

	get z () {

		return this._z;

	},

	set z ( value ) {

		this._z = value;
		this.onChangeCallback();

	},

	get order () {

		return this._order;

	},

	set order ( value ) {

		this._order = value;
		this.onChangeCallback();

	},

	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this.onChangeCallback();

		return this;

	},

	copy: function ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this.onChangeCallback();

		return this;

	},

	setFromRotationMatrix: function ( m, order ) {

		var clamp = THREE.Math.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order )

		}

		this._order = order;

		this.onChangeCallback();

		return this;

	},

	setFromQuaternion: function ( q, order, update ) {

		var clamp = THREE.Math.clamp;

		// q is assumed to be normalized

		// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;

		order = order || this._order;

		if ( order === 'XYZ' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
			this._y = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ), - 1, 1 ) );
			this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order ===  'YXZ' ) {

			this._x = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ), - 1, 1 ) );
			this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
			this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ), - 1, 1 ) );
			this._y = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
			this._z = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZYX' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
			this._y = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ), - 1, 1 ) );
			this._z = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order === 'YZX' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
			this._y = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
			this._z = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ), - 1, 1 ) );

		} else if ( order === 'XZY' ) {

			this._x = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
			this._y = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
			this._z = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ), - 1, 1 ) );

		} else {

			console.warn( 'THREE.Euler: .setFromQuaternion() given unsupported order: ' + order )

		}

		this._order = order;

		if ( update !== false ) this.onChangeCallback();

		return this;

	},

	reorder: function () {

		// WARNING: this discards revolution information -bhouston

		var q = new THREE.Quaternion();

		return function ( newOrder ) {

			q.setFromEuler( this );
			this.setFromQuaternion( q, newOrder );

		};


	}(),

	equals: function ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	},

	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this.onChangeCallback();

		return this;

	},

	toArray: function () {

		return [ this._x, this._y, this._z, this._order ];

	},

	onChange: function ( callback ) {

		this.onChangeCallback = callback;

		return this;

	},

	onChangeCallback: function () {},

	clone: function () {

		return new THREE.Euler( this._x, this._y, this._z, this._order );

	}

};

// File:src/math/Line3.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Line3 = function ( start, end ) {

	this.start = ( start !== undefined ) ? start : new THREE.Vector3();
	this.end = ( end !== undefined ) ? end : new THREE.Vector3();

};

THREE.Line3.prototype = {

	constructor: THREE.Line3,

	set: function ( start, end ) {

		this.start.copy( start );
		this.end.copy( end );

		return this;

	},

	copy: function ( line ) {

		this.start.copy( line.start );
		this.end.copy( line.end );

		return this;

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.start, this.end ).multiplyScalar( 0.5 );

	},

	delta: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.end, this.start );

	},

	distanceSq: function () {

		return this.start.distanceToSquared( this.end );

	},

	distance: function () {

		return this.start.distanceTo( this.end );

	},

	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},

	closestPointToPointParameter: function () {

		var startP = new THREE.Vector3();
		var startEnd = new THREE.Vector3();

		return function ( point, clampToLine ) {

			startP.subVectors( point, this.start );
			startEnd.subVectors( this.end, this.start );

			var startEnd2 = startEnd.dot( startEnd );
			var startEnd_startP = startEnd.dot( startP );

			var t = startEnd_startP / startEnd2;

			if ( clampToLine ) {

				t = THREE.Math.clamp( t, 0, 1 );

			}

			return t;

		};

	}(),

	closestPointToPoint: function ( point, clampToLine, optionalTarget ) {

		var t = this.closestPointToPointParameter( point, clampToLine );

		var result = optionalTarget || new THREE.Vector3();

		return this.delta( result ).multiplyScalar( t ).add( this.start );

	},

	applyMatrix4: function ( matrix ) {

		this.start.applyMatrix4( matrix );
		this.end.applyMatrix4( matrix );

		return this;

	},

	equals: function ( line ) {

		return line.start.equals( this.start ) && line.end.equals( this.end );

	},

	clone: function () {

		return new THREE.Line3().copy( this );

	}

};

// File:src/math/Box2.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Box2 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector2( Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector2( - Infinity, - Infinity );

};

THREE.Box2.prototype = {

	constructor: THREE.Box2,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )

		}

		return this;

	},

	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector2();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );
			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = Infinity;
		this.max.x = this.max.y = - Infinity;

		return this;

	},

	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;
	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;
	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;
	},

	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ) {

			return false;

		}

		return true;

	},

	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
		     ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) ) {

			return true;

		}

		return false;

	},

	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector2();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);

	},

	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ) {

			return false;

		}

		return true;

	},

	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector2();
		return result.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector2();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},

	clone: function () {

		return new THREE.Box2().copy( this );

	}

};

// File:src/math/Box3.js

/**
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Box3 = function ( min, max ) {

	this.min = ( min !== undefined ) ? min : new THREE.Vector3( Infinity, Infinity, Infinity );
	this.max = ( max !== undefined ) ? max : new THREE.Vector3( - Infinity, - Infinity, - Infinity );

};

THREE.Box3.prototype = {

	constructor: THREE.Box3,

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] )

		}

		return this;

	},

	setFromCenterAndSize: function () {

		var v1 = new THREE.Vector3();

		return function ( center, size ) {

			var halfSize = v1.copy( size ).multiplyScalar( 0.5 );

			this.min.copy( center ).sub( halfSize );
			this.max.copy( center ).add( halfSize );

			return this;

		};

	}(),

	setFromObject: function () {

		// Computes the world-axis-aligned bounding box of an object (including its children),
		// accounting for both the object's, and childrens', world transforms

		var v1 = new THREE.Vector3();

		return function ( object ) {

			var scope = this;

			object.updateMatrixWorld( true );

			this.makeEmpty();

			object.traverse( function ( node ) {

				var geometry = node.geometry;

				if ( geometry !== undefined ) {

					if ( geometry instanceof THREE.Geometry ) {

						var vertices = geometry.vertices;

						for ( var i = 0, il = vertices.length; i < il; i ++ ) {

							v1.copy( vertices[ i ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					} else if ( geometry instanceof THREE.BufferGeometry && geometry.attributes[ 'position' ] !== undefined ) {

						var positions = geometry.attributes[ 'position' ].array;

						for ( var i = 0, il = positions.length; i < il; i += 3 ) {

							v1.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );

							v1.applyMatrix4( node.matrixWorld );

							scope.expandByPoint( v1 );

						}

					}

				}

			} );

			return this;

		};

	}(),

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	makeEmpty: function () {

		this.min.x = this.min.y = this.min.z = Infinity;
		this.max.x = this.max.y = this.max.z = - Infinity;

		return this;

	},

	empty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y ) || ( this.max.z < this.min.z );

	},

	center: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	size: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.subVectors( this.max, this.min );

	},

	expandByPoint: function ( point ) {

		this.min.min( point );
		this.max.max( point );

		return this;

	},

	expandByVector: function ( vector ) {

		this.min.sub( vector );
		this.max.add( vector );

		return this;

	},

	expandByScalar: function ( scalar ) {

		this.min.addScalar( - scalar );
		this.max.addScalar( scalar );

		return this;

	},

	containsPoint: function ( point ) {

		if ( point.x < this.min.x || point.x > this.max.x ||
		     point.y < this.min.y || point.y > this.max.y ||
		     point.z < this.min.z || point.z > this.max.z ) {

			return false;

		}

		return true;

	},

	containsBox: function ( box ) {

		if ( ( this.min.x <= box.min.x ) && ( box.max.x <= this.max.x ) &&
			 ( this.min.y <= box.min.y ) && ( box.max.y <= this.max.y ) &&
			 ( this.min.z <= box.min.z ) && ( box.max.z <= this.max.z ) ) {

			return true;

		}

		return false;

	},

	getParameter: function ( point, optionalTarget ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		var result = optionalTarget || new THREE.Vector3();

		return result.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y ),
			( point.z - this.min.z ) / ( this.max.z - this.min.z )
		);

	},

	isIntersectionBox: function ( box ) {

		// using 6 splitting planes to rule out intersections.

		if ( box.max.x < this.min.x || box.min.x > this.max.x ||
		     box.max.y < this.min.y || box.min.y > this.max.y ||
		     box.max.z < this.min.z || box.min.z > this.max.z ) {

			return false;

		}

		return true;

	},

	clampPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var clampedPoint = v1.copy( point ).clamp( this.min, this.max );
			return clampedPoint.sub( point ).length();

		};

	}(),

	getBoundingSphere: function () {

		var v1 = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Sphere();

			result.center = this.center();
			result.radius = this.size( v1 ).length() * 0.5;

			return result;

		};

	}(),

	intersect: function ( box ) {

		this.min.max( box.min );
		this.max.min( box.max );

		return this;

	},

	union: function ( box ) {

		this.min.min( box.min );
		this.max.max( box.max );

		return this;

	},

	applyMatrix4: function () {

		var points = [
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3(),
			new THREE.Vector3()
		];

		return function ( matrix ) {

			// NOTE: I am using a binary pattern to specify all 2^3 combinations below
			points[ 0 ].set( this.min.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 000
			points[ 1 ].set( this.min.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 001
			points[ 2 ].set( this.min.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 010
			points[ 3 ].set( this.min.x, this.max.y, this.max.z ).applyMatrix4( matrix ); // 011
			points[ 4 ].set( this.max.x, this.min.y, this.min.z ).applyMatrix4( matrix ); // 100
			points[ 5 ].set( this.max.x, this.min.y, this.max.z ).applyMatrix4( matrix ); // 101
			points[ 6 ].set( this.max.x, this.max.y, this.min.z ).applyMatrix4( matrix ); // 110
			points[ 7 ].set( this.max.x, this.max.y, this.max.z ).applyMatrix4( matrix );  // 111

			this.makeEmpty();
			this.setFromPoints( points );

			return this;

		};

	}(),

	translate: function ( offset ) {

		this.min.add( offset );
		this.max.add( offset );

		return this;

	},

	equals: function ( box ) {

		return box.min.equals( this.min ) && box.max.equals( this.max );

	},

	clone: function () {

		return new THREE.Box3().copy( this );

	}

};

// File:src/math/Matrix3.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Matrix3 = function () {

	this.elements = new Float32Array( [

		1, 0, 0,
		0, 1, 0,
		0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );

	}

};

THREE.Matrix3.prototype = {

	constructor: THREE.Matrix3,

	set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 3 ] = n12; te[ 6 ] = n13;
		te[ 1 ] = n21; te[ 4 ] = n22; te[ 7 ] = n23;
		te[ 2 ] = n31; te[ 5 ] = n32; te[ 8 ] = n33;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0,
			0, 1, 0,
			0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		var me = m.elements;

		this.set(

			me[ 0 ], me[ 3 ], me[ 6 ],
			me[ 1 ], me[ 4 ], me[ 7 ],
			me[ 2 ], me[ 5 ], me[ 8 ]

		);

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.' );
		return vector.applyMatrix3( this );

	},

	multiplyVector3Array: function ( a ) {

		console.warn( 'THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );

	},

	applyToVector3Array: function () {

		var v1 = new THREE.Vector3();

		return function ( array, offset, length ) {

			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

				v1.x = array[ j ];
				v1.y = array[ j + 1 ];
				v1.z = array[ j + 2 ];

				v1.applyMatrix3( this );

				array[ j ]     = v1.x;
				array[ j + 1 ] = v1.y;
				array[ j + 2 ] = v1.z;

			}

			return array;

		};

	}(),

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;

	},

	determinant: function () {

		var te = this.elements;

		var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;

	},

	getInverse: function ( matrix, throwOnInvertible ) {

		// input: THREE.Matrix4
		// ( based on http://code.google.com/p/webgl-mjs/ )

		var me = matrix.elements;
		var te = this.elements;

		te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
		te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
		te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
		te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
		te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
		te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
		te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
		te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
		te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

		var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

		// no inverse

		if ( det === 0 ) {

			var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;

		}

		this.multiplyScalar( 1.0 / det );

		return this;

	},

	transpose: function () {

		var tmp, m = this.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;

	},

	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];

		array[ offset + 3 ] = te[ 3 ];
		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];

		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];
		array[ offset + 8 ]  = te[ 8 ];

		return array;

	},

	getNormalMatrix: function ( m ) {

		// input: THREE.Matrix4

		this.getInverse( m ).transpose();

		return this;

	},

	transposeIntoArray: function ( r ) {

		var m = this.elements;

		r[ 0 ] = m[ 0 ];
		r[ 1 ] = m[ 3 ];
		r[ 2 ] = m[ 6 ];
		r[ 3 ] = m[ 1 ];
		r[ 4 ] = m[ 4 ];
		r[ 5 ] = m[ 7 ];
		r[ 6 ] = m[ 2 ];
		r[ 7 ] = m[ 5 ];
		r[ 8 ] = m[ 8 ];

		return this;

	},

	fromArray: function ( array ) {

		this.elements.set( array );

		return this;

	},

	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ],
			te[ 3 ], te[ 4 ], te[ 5 ],
			te[ 6 ], te[ 7 ], te[ 8 ]
		];

	},

	clone: function () {

		return new THREE.Matrix3().fromArray( this.elements );

	}

};

// File:src/math/Matrix4.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://exocortex.com
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Matrix4 = function () {

	this.elements = new Float32Array( [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	] );

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

	}

};

THREE.Matrix4.prototype = {

	constructor: THREE.Matrix4,

	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	},

	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	copy: function ( m ) {

		this.elements.set( m.elements );

		return this;

	},

	extractPosition: function ( m ) {

		console.warn( 'THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().' );
		return this.copyPosition( m );

	},

	copyPosition: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	},

	extractRotation: function () {

		var v1 = new THREE.Vector3();

		return function ( m ) {

			var te = this.elements;
			var me = m.elements;

			var scaleX = 1 / v1.set( me[ 0 ], me[ 1 ], me[ 2 ] ).length();
			var scaleY = 1 / v1.set( me[ 4 ], me[ 5 ], me[ 6 ] ).length();
			var scaleZ = 1 / v1.set( me[ 8 ], me[ 9 ], me[ 10 ] ).length();

			te[ 0 ] = me[ 0 ] * scaleX;
			te[ 1 ] = me[ 1 ] * scaleX;
			te[ 2 ] = me[ 2 ] * scaleX;

			te[ 4 ] = me[ 4 ] * scaleY;
			te[ 5 ] = me[ 5 ] * scaleY;
			te[ 6 ] = me[ 6 ] * scaleY;

			te[ 8 ] = me[ 8 ] * scaleZ;
			te[ 9 ] = me[ 9 ] * scaleZ;
			te[ 10 ] = me[ 10 ] * scaleZ;

			return this;

		};

	}(),

	makeRotationFromEuler: function ( euler ) {

		if ( euler instanceof THREE.Euler === false ) {

			console.error( 'THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

		}

		var te = this.elements;

		var x = euler.x, y = euler.y, z = euler.z;
		var a = Math.cos( x ), b = Math.sin( x );
		var c = Math.cos( y ), d = Math.sin( y );
		var e = Math.cos( z ), f = Math.sin( z );

		if ( euler.order === 'XYZ' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = - c * f;
			te[ 8 ] = d;

			te[ 1 ] = af + be * d;
			te[ 5 ] = ae - bf * d;
			te[ 9 ] = - b * c;

			te[ 2 ] = bf - ae * d;
			te[ 6 ] = be + af * d;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YXZ' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce + df * b;
			te[ 4 ] = de * b - cf;
			te[ 8 ] = a * d;

			te[ 1 ] = a * f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b;

			te[ 2 ] = cf * b - de;
			te[ 6 ] = df + ce * b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZXY' ) {

			var ce = c * e, cf = c * f, de = d * e, df = d * f;

			te[ 0 ] = ce - df * b;
			te[ 4 ] = - a * f;
			te[ 8 ] = de + cf * b;

			te[ 1 ] = cf + de * b;
			te[ 5 ] = a * e;
			te[ 9 ] = df - ce * b;

			te[ 2 ] = - a * d;
			te[ 6 ] = b;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'ZYX' ) {

			var ae = a * e, af = a * f, be = b * e, bf = b * f;

			te[ 0 ] = c * e;
			te[ 4 ] = be * d - af;
			te[ 8 ] = ae * d + bf;

			te[ 1 ] = c * f;
			te[ 5 ] = bf * d + ae;
			te[ 9 ] = af * d - be;

			te[ 2 ] = - d;
			te[ 6 ] = b * c;
			te[ 10 ] = a * c;

		} else if ( euler.order === 'YZX' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = bd - ac * f;
			te[ 8 ] = bc * f + ad;

			te[ 1 ] = f;
			te[ 5 ] = a * e;
			te[ 9 ] = - b * e;

			te[ 2 ] = - d * e;
			te[ 6 ] = ad * f + bc;
			te[ 10 ] = ac - bd * f;

		} else if ( euler.order === 'XZY' ) {

			var ac = a * c, ad = a * d, bc = b * c, bd = b * d;

			te[ 0 ] = c * e;
			te[ 4 ] = - f;
			te[ 8 ] = d * e;

			te[ 1 ] = ac * f + bd;
			te[ 5 ] = a * e;
			te[ 9 ] = ad * f - bc;

			te[ 2 ] = bc * f - ad;
			te[ 6 ] = b * e;
			te[ 10 ] = bd * f + ac;

		}

		// last column
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// bottom row
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	setRotationFromQuaternion: function ( q ) {

		console.warn( 'THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().' );

		return this.makeRotationFromQuaternion( q );

	},

	makeRotationFromQuaternion: function ( q ) {

		var te = this.elements;

		var x = q.x, y = q.y, z = q.z, w = q.w;
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		te[ 0 ] = 1 - ( yy + zz );
		te[ 4 ] = xy - wz;
		te[ 8 ] = xz + wy;

		te[ 1 ] = xy + wz;
		te[ 5 ] = 1 - ( xx + zz );
		te[ 9 ] = yz - wx;

		te[ 2 ] = xz - wy;
		te[ 6 ] = yz + wx;
		te[ 10 ] = 1 - ( xx + yy );

		// last column
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// bottom row
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	lookAt: function () {

		var x = new THREE.Vector3();
		var y = new THREE.Vector3();
		var z = new THREE.Vector3();

		return function ( eye, target, up ) {

			var te = this.elements;

			z.subVectors( eye, target ).normalize();

			if ( z.length() === 0 ) {

				z.z = 1;

			}

			x.crossVectors( up, z ).normalize();

			if ( x.length() === 0 ) {

				z.x += 0.0001;
				x.crossVectors( up, z ).normalize();

			}

			y.crossVectors( z, x );


			te[ 0 ] = x.x; te[ 4 ] = y.x; te[ 8 ] = z.x;
			te[ 1 ] = x.y; te[ 5 ] = y.y; te[ 9 ] = z.y;
			te[ 2 ] = x.z; te[ 6 ] = y.z; te[ 10 ] = z.z;

			return this;

		};

	}(),

	multiply: function ( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	},

	multiplyMatrices: function ( a, b ) {

		var ae = a.elements;
		var be = b.elements;
		var te = this.elements;

		var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
		var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
		var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
		var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

		var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
		var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
		var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
		var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

		te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

		return this;

	},

	multiplyToArray: function ( a, b, r ) {

		var te = this.elements;

		this.multiplyMatrices( a, b );

		r[ 0 ] = te[ 0 ]; r[ 1 ] = te[ 1 ]; r[ 2 ] = te[ 2 ]; r[ 3 ] = te[ 3 ];
		r[ 4 ] = te[ 4 ]; r[ 5 ] = te[ 5 ]; r[ 6 ] = te[ 6 ]; r[ 7 ] = te[ 7 ];
		r[ 8 ]  = te[ 8 ]; r[ 9 ]  = te[ 9 ]; r[ 10 ] = te[ 10 ]; r[ 11 ] = te[ 11 ];
		r[ 12 ] = te[ 12 ]; r[ 13 ] = te[ 13 ]; r[ 14 ] = te[ 14 ]; r[ 15 ] = te[ 15 ];

		return this;

	},

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.' );
		return vector.applyProjection( this );

	},

	multiplyVector4: function ( vector ) {

		console.warn( 'THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
		return vector.applyMatrix4( this );

	},

	multiplyVector3Array: function ( a ) {

		console.warn( 'THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.' );
		return this.applyToVector3Array( a );

	},

	applyToVector3Array: function () {

		var v1 = new THREE.Vector3();

		return function ( array, offset, length ) {

			if ( offset === undefined ) offset = 0;
			if ( length === undefined ) length = array.length;

			for ( var i = 0, j = offset, il; i < length; i += 3, j += 3 ) {

				v1.x = array[ j ];
				v1.y = array[ j + 1 ];
				v1.z = array[ j + 2 ];

				v1.applyMatrix4( this );

				array[ j ]     = v1.x;
				array[ j + 1 ] = v1.y;
				array[ j + 2 ] = v1.z;

			}

			return array;

		};

	}(),

	rotateAxis: function ( v ) {

		console.warn( 'THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.' );

		v.transformDirection( this );

	},

	crossVector: function ( vector ) {

		console.warn( 'THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.' );
		return vector.applyMatrix4( this );

	},

	determinant: function () {

		var te = this.elements;

		var n11 = te[ 0 ], n12 = te[ 4 ], n13 = te[ 8 ], n14 = te[ 12 ];
		var n21 = te[ 1 ], n22 = te[ 5 ], n23 = te[ 9 ], n24 = te[ 13 ];
		var n31 = te[ 2 ], n32 = te[ 6 ], n33 = te[ 10 ], n34 = te[ 14 ];
		var n41 = te[ 3 ], n42 = te[ 7 ], n43 = te[ 11 ], n44 = te[ 15 ];

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)

		);

	},

	transpose: function () {

		var te = this.elements;
		var tmp;

		tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
		tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
		tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

		tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
		tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
		tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

		return this;

	},

	flattenToArrayOffset: function ( array, offset ) {

		var te = this.elements;

		array[ offset     ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ]  = te[ 8 ];
		array[ offset + 9 ]  = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	},

	getPosition: function () {

		var v1 = new THREE.Vector3();

		return function () {

			console.warn( 'THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.' );

			var te = this.elements;
			return v1.set( te[ 12 ], te[ 13 ], te[ 14 ] );

		};

	}(),

	setPosition: function ( v ) {

		var te = this.elements;

		te[ 12 ] = v.x;
		te[ 13 ] = v.y;
		te[ 14 ] = v.z;

		return this;

	},

	getInverse: function ( m, throwOnInvertible ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements;
		var me = m.elements;

		var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[ 8 ], n14 = me[ 12 ];
		var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[ 9 ], n24 = me[ 13 ];
		var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
		var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];

		te[ 0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
		te[ 4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
		te[ 8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
		te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
		te[ 1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
		te[ 5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
		te[ 9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
		te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
		te[ 2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
		te[ 6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
		te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
		te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
		te[ 3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
		te[ 7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
		te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
		te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

		var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

		if ( det == 0 ) {

			var msg = "Matrix4.getInverse(): can't invert matrix, determinant is 0";

			if ( throwOnInvertible || false ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			this.identity();

			return this;
		}

		this.multiplyScalar( 1 / det );

		return this;

	},

	translate: function ( v ) {

		console.warn( 'THREE.Matrix4: .translate() has been removed.' );

	},

	rotateX: function ( angle ) {

		console.warn( 'THREE.Matrix4: .rotateX() has been removed.' );

	},

	rotateY: function ( angle ) {

		console.warn( 'THREE.Matrix4: .rotateY() has been removed.' );

	},

	rotateZ: function ( angle ) {

		console.warn( 'THREE.Matrix4: .rotateZ() has been removed.' );

	},

	rotateByAxis: function ( axis, angle ) {

		console.warn( 'THREE.Matrix4: .rotateByAxis() has been removed.' );

	},

	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	},

	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, Math.max( scaleYSq, scaleZSq ) ) );

	},

	makeTranslation: function ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	},

	makeRotationX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0,  0, 0,
			0, c, - s, 0,
			0, s,  c, 0,
			0, 0,  0, 1

		);

		return this;

	},

	makeRotationY: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			 c, 0, s, 0,
			 0, 1, 0, 0,
			- s, 0, c, 0,
			 0, 0, 0, 1

		);

		return this;

	},

	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s,  c, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1

		);

		return this;

	},

	makeRotationAxis: function ( axis, angle ) {

		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var c = Math.cos( angle );
		var s = Math.sin( angle );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(

			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1

		);

		 return this;

	},

	makeScale: function ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	},

	compose: function ( position, quaternion, scale ) {

		this.makeRotationFromQuaternion( quaternion );
		this.scale( scale );
		this.setPosition( position );

		return this;

	},

	decompose: function () {

		var vector = new THREE.Vector3();
		var matrix = new THREE.Matrix4();

		return function ( position, quaternion, scale ) {

			var te = this.elements;

			var sx = vector.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
			var sy = vector.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
			var sz = vector.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

			// if determine is negative, we need to invert one scale
			var det = this.determinant();
			if ( det < 0 ) {
				sx = - sx;
			}

			position.x = te[ 12 ];
			position.y = te[ 13 ];
			position.z = te[ 14 ];

			// scale the rotation part

			matrix.elements.set( this.elements ); // at this point matrix is incomplete so we can't use .copy()

			var invSX = 1 / sx;
			var invSY = 1 / sy;
			var invSZ = 1 / sz;

			matrix.elements[ 0 ] *= invSX;
			matrix.elements[ 1 ] *= invSX;
			matrix.elements[ 2 ] *= invSX;

			matrix.elements[ 4 ] *= invSY;
			matrix.elements[ 5 ] *= invSY;
			matrix.elements[ 6 ] *= invSY;

			matrix.elements[ 8 ] *= invSZ;
			matrix.elements[ 9 ] *= invSZ;
			matrix.elements[ 10 ] *= invSZ;

			quaternion.setFromRotationMatrix( matrix );

			scale.x = sx;
			scale.y = sy;
			scale.z = sz;

			return this;

		};

	}(),

	makeFrustum: function ( left, right, bottom, top, near, far ) {

		var te = this.elements;
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		te[ 0 ] = x;	te[ 4 ] = 0;	te[ 8 ] = a;	te[ 12 ] = 0;
		te[ 1 ] = 0;	te[ 5 ] = y;	te[ 9 ] = b;	te[ 13 ] = 0;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = c;	te[ 14 ] = d;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = - 1;	te[ 15 ] = 0;

		return this;

	},

	makePerspective: function ( fov, aspect, near, far ) {

		var ymax = near * Math.tan( THREE.Math.degToRad( fov * 0.5 ) );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum( xmin, xmax, ymin, ymax, near, far );

	},

	makeOrthographic: function ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		te[ 0 ] = 2 / w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 / h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 / p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	},

	fromArray: function ( array ) {

		this.elements.set( array );

		return this;

	},

	toArray: function () {

		var te = this.elements;

		return [
			te[ 0 ], te[ 1 ], te[ 2 ], te[ 3 ],
			te[ 4 ], te[ 5 ], te[ 6 ], te[ 7 ],
			te[ 8 ], te[ 9 ], te[ 10 ], te[ 11 ],
			te[ 12 ], te[ 13 ], te[ 14 ], te[ 15 ]
		];

	},

	clone: function () {

		return new THREE.Matrix4().fromArray( this.elements );

	}

};

// File:src/math/Ray.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Ray = function ( origin, direction ) {

	this.origin = ( origin !== undefined ) ? origin : new THREE.Vector3();
	this.direction = ( direction !== undefined ) ? direction : new THREE.Vector3();

};

THREE.Ray.prototype = {

	constructor: THREE.Ray,

	set: function ( origin, direction ) {

		this.origin.copy( origin );
		this.direction.copy( direction );

		return this;

	},

	copy: function ( ray ) {

		this.origin.copy( ray.origin );
		this.direction.copy( ray.direction );

		return this;

	},

	at: function ( t, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		return result.copy( this.direction ).multiplyScalar( t ).add( this.origin );

	},

	recast: function () {

		var v1 = new THREE.Vector3();

		return function ( t ) {

			this.origin.copy( this.at( t, v1 ) );

			return this;

		};

	}(),

	closestPointToPoint: function ( point, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		result.subVectors( point, this.origin );
		var directionDistance = result.dot( this.direction );

		if ( directionDistance < 0 ) {

			return result.copy( this.origin );

		}

		return result.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

	},

	distanceToPoint: function () {

		var v1 = new THREE.Vector3();

		return function ( point ) {

			var directionDistance = v1.subVectors( point, this.origin ).dot( this.direction );

			// point behind the ray

			if ( directionDistance < 0 ) {

				return this.origin.distanceTo( point );

			}

			v1.copy( this.direction ).multiplyScalar( directionDistance ).add( this.origin );

			return v1.distanceTo( point );

		};

	}(),

	distanceSqToSegment: function ( v0, v1, optionalPointOnRay, optionalPointOnSegment ) {

		// from http://www.geometrictools.com/LibMathematics/Distance/Wm5DistRay3Segment3.cpp
		// It returns the min distance between the ray and the segment
		// defined by v0 and v1
		// It can also set two optional targets :
		// - The closest point on the ray
		// - The closest point on the segment

		var segCenter = v0.clone().add( v1 ).multiplyScalar( 0.5 );
		var segDir = v1.clone().sub( v0 ).normalize();
		var segExtent = v0.distanceTo( v1 ) * 0.5;
		var diff = this.origin.clone().sub( segCenter );
		var a01 = - this.direction.dot( segDir );
		var b0 = diff.dot( this.direction );
		var b1 = - diff.dot( segDir );
		var c = diff.lengthSq();
		var det = Math.abs( 1 - a01 * a01 );
		var s0, s1, sqrDist, extDet;

		if ( det >= 0 ) {

			// The ray and segment are not parallel.

			s0 = a01 * b1 - b0;
			s1 = a01 * b0 - b1;
			extDet = segExtent * det;

			if ( s0 >= 0 ) {

				if ( s1 >= - extDet ) {

					if ( s1 <= extDet ) {

						// region 0
						// Minimum at interior points of ray and segment.

						var invDet = 1 / det;
						s0 *= invDet;
						s1 *= invDet;
						sqrDist = s0 * ( s0 + a01 * s1 + 2 * b0 ) + s1 * ( a01 * s0 + s1 + 2 * b1 ) + c;

					} else {

						// region 1

						s1 = segExtent;
						s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
						sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

					}

				} else {

					// region 5

					s1 = - segExtent;
					s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			} else {

				if ( s1 <= - extDet ) {

					// region 4

					s0 = Math.max( 0, - ( - a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? - segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				} else if ( s1 <= extDet ) {

					// region 3

					s0 = 0;
					s1 = Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = s1 * ( s1 + 2 * b1 ) + c;

				} else {

					// region 2

					s0 = Math.max( 0, - ( a01 * segExtent + b0 ) );
					s1 = ( s0 > 0 ) ? segExtent : Math.min( Math.max( - segExtent, - b1 ), segExtent );
					sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

				}

			}

		} else {

			// Ray and segment are parallel.

			s1 = ( a01 > 0 ) ? - segExtent : segExtent;
			s0 = Math.max( 0, - ( a01 * s1 + b0 ) );
			sqrDist = - s0 * s0 + s1 * ( s1 + 2 * b1 ) + c;

		}

		if ( optionalPointOnRay ) {

			optionalPointOnRay.copy( this.direction.clone().multiplyScalar( s0 ).add( this.origin ) );

		}

		if ( optionalPointOnSegment ) {

			optionalPointOnSegment.copy( segDir.clone().multiplyScalar( s1 ).add( segCenter ) );

		}

		return sqrDist;

	},

	isIntersectionSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) <= sphere.radius;

	},

	intersectSphere: function () {

		// from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/

		var v1 = new THREE.Vector3();

		return function ( sphere, optionalTarget ) {

			v1.subVectors( sphere.center, this.origin );

			var tca = v1.dot( this.direction );

			var d2 = v1.dot( v1 ) - tca * tca;

			var radius2 = sphere.radius * sphere.radius;

			if ( d2 > radius2 ) return null;

			var thc = Math.sqrt( radius2 - d2 );

			// t0 = first intersect point - entrance on front of sphere
			var t0 = tca - thc;

			// t1 = second intersect point - exit point on back of sphere
			var t1 = tca + thc;

			// test to see if both t0 and t1 are behind the ray - if so, return null
			if ( t0 < 0 && t1 < 0 ) return null;

			// test to see if t0 is behind the ray:
			// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
			// in order to always return an intersect point that is in front of the ray.
			if ( t0 < 0 ) return this.at( t1, optionalTarget );

			// else t0 is in front of the ray, so return the first collision point scaled by t0 
			return this.at( t0, optionalTarget );

		}

	}(),

	isIntersectionPlane: function ( plane ) {

		// check if the ray lies on the plane first

		var distToPoint = plane.distanceToPoint( this.origin );

		if ( distToPoint === 0 ) {

			return true;

		}

		var denominator = plane.normal.dot( this.direction );

		if ( denominator * distToPoint < 0 ) {

			return true;

		}

		// ray origin is behind the plane (and is pointing behind it)

		return false;

	},

	distanceToPlane: function ( plane ) {

		var denominator = plane.normal.dot( this.direction );
		if ( denominator == 0 ) {

			// line is coplanar, return origin
			if ( plane.distanceToPoint( this.origin ) == 0 ) {

				return 0;

			}

			// Null is preferable to undefined since undefined means.... it is undefined

			return null;

		}

		var t = - ( this.origin.dot( plane.normal ) + plane.constant ) / denominator;

		// Return if the ray never intersects the plane

		return t >= 0 ? t :  null;

	},

	intersectPlane: function ( plane, optionalTarget ) {

		var t = this.distanceToPlane( plane );

		if ( t === null ) {

			return null;
		}

		return this.at( t, optionalTarget );

	},

	isIntersectionBox: function () {

		var v = new THREE.Vector3();

		return function ( box ) {

			return this.intersectBox( box, v ) !== null;

		};

	}(),

	intersectBox: function ( box , optionalTarget ) {

		// http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/

		var tmin,tmax,tymin,tymax,tzmin,tzmax;

		var invdirx = 1 / this.direction.x,
			invdiry = 1 / this.direction.y,
			invdirz = 1 / this.direction.z;

		var origin = this.origin;

		if ( invdirx >= 0 ) {

			tmin = ( box.min.x - origin.x ) * invdirx;
			tmax = ( box.max.x - origin.x ) * invdirx;

		} else {

			tmin = ( box.max.x - origin.x ) * invdirx;
			tmax = ( box.min.x - origin.x ) * invdirx;
		}

		if ( invdiry >= 0 ) {

			tymin = ( box.min.y - origin.y ) * invdiry;
			tymax = ( box.max.y - origin.y ) * invdiry;

		} else {

			tymin = ( box.max.y - origin.y ) * invdiry;
			tymax = ( box.min.y - origin.y ) * invdiry;
		}

		if ( ( tmin > tymax ) || ( tymin > tmax ) ) return null;

		// These lines also handle the case where tmin or tmax is NaN
		// (result of 0 * Infinity). x !== x returns true if x is NaN

		if ( tymin > tmin || tmin !== tmin ) tmin = tymin;

		if ( tymax < tmax || tmax !== tmax ) tmax = tymax;

		if ( invdirz >= 0 ) {

			tzmin = ( box.min.z - origin.z ) * invdirz;
			tzmax = ( box.max.z - origin.z ) * invdirz;

		} else {

			tzmin = ( box.max.z - origin.z ) * invdirz;
			tzmax = ( box.min.z - origin.z ) * invdirz;
		}

		if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) return null;

		if ( tzmin > tmin || tmin !== tmin ) tmin = tzmin;

		if ( tzmax < tmax || tmax !== tmax ) tmax = tzmax;

		//return point closest to the ray (positive side)

		if ( tmax < 0 ) return null;

		return this.at( tmin >= 0 ? tmin : tmax, optionalTarget );

	},

	intersectTriangle: function () {

		// Compute the offset origin, edges, and normal.
		var diff = new THREE.Vector3();
		var edge1 = new THREE.Vector3();
		var edge2 = new THREE.Vector3();
		var normal = new THREE.Vector3();

		return function ( a, b, c, backfaceCulling, optionalTarget ) {

			// from http://www.geometrictools.com/LibMathematics/Intersection/Wm5IntrRay3Triangle3.cpp

			edge1.subVectors( b, a );
			edge2.subVectors( c, a );
			normal.crossVectors( edge1, edge2 );

			// Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
			// E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
			//   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
			//   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
			//   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
			var DdN = this.direction.dot( normal );
			var sign;

			if ( DdN > 0 ) {

				if ( backfaceCulling ) return null;
				sign = 1;

			} else if ( DdN < 0 ) {

				sign = - 1;
				DdN = - DdN;

			} else {

				return null;

			}

			diff.subVectors( this.origin, a );
			var DdQxE2 = sign * this.direction.dot( edge2.crossVectors( diff, edge2 ) );

			// b1 < 0, no intersection
			if ( DdQxE2 < 0 ) {

				return null;

			}

			var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );

			// b2 < 0, no intersection
			if ( DdE1xQ < 0 ) {

				return null;

			}

			// b1+b2 > 1, no intersection
			if ( DdQxE2 + DdE1xQ > DdN ) {

				return null;

			}

			// Line intersects triangle, check if ray does.
			var QdN = - sign * diff.dot( normal );

			// t < 0, no intersection
			if ( QdN < 0 ) {

				return null;

			}

			// Ray intersects triangle.
			return this.at( QdN / DdN, optionalTarget );

		};

	}(),

	applyMatrix4: function ( matrix4 ) {

		this.direction.add( this.origin ).applyMatrix4( matrix4 );
		this.origin.applyMatrix4( matrix4 );
		this.direction.sub( this.origin );
		this.direction.normalize();

		return this;
	},

	equals: function ( ray ) {

		return ray.origin.equals( this.origin ) && ray.direction.equals( this.direction );

	},

	clone: function () {

		return new THREE.Ray().copy( this );

	}

};

// File:src/math/Sphere.js

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Sphere = function ( center, radius ) {

	this.center = ( center !== undefined ) ? center : new THREE.Vector3();
	this.radius = ( radius !== undefined ) ? radius : 0;

};

THREE.Sphere.prototype = {

	constructor: THREE.Sphere,

	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;
	},

	setFromPoints: function () {

		var box = new THREE.Box3();

		return function ( points, optionalCenter )  {

			var center = this.center;

			if ( optionalCenter !== undefined ) {

				center.copy( optionalCenter );

			} else {

				box.setFromPoints( points ).center( center );

			}

			var maxRadiusSq = 0;

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

			}

			this.radius = Math.sqrt( maxRadiusSq );

			return this;

 		};

	}(),

	copy: function ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	},

	empty: function () {

		return ( this.radius <= 0 );

	},

	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	},

	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	},

	intersectsSphere: function ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	},

	clampPoint: function ( point, optionalTarget ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		var result = optionalTarget || new THREE.Vector3();
		result.copy( point );

		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			result.sub( this.center ).normalize();
			result.multiplyScalar( this.radius ).add( this.center );

		}

		return result;

	},

	getBoundingBox: function ( optionalTarget ) {

		var box = optionalTarget || new THREE.Box3();

		box.set( this.center, this.center );
		box.expandByScalar( this.radius );

		return box;

	},

	applyMatrix4: function ( matrix ) {

		this.center.applyMatrix4( matrix );
		this.radius = this.radius * matrix.getMaxScaleOnAxis();

		return this;

	},

	translate: function ( offset ) {

		this.center.add( offset );

		return this;

	},

	equals: function ( sphere ) {

		return sphere.center.equals( this.center ) && ( sphere.radius === this.radius );

	},

	clone: function () {

		return new THREE.Sphere().copy( this );

	}

};

// File:src/math/Frustum.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author bhouston / http://exocortex.com
 */

THREE.Frustum = function ( p0, p1, p2, p3, p4, p5 ) {

	this.planes = [

		( p0 !== undefined ) ? p0 : new THREE.Plane(),
		( p1 !== undefined ) ? p1 : new THREE.Plane(),
		( p2 !== undefined ) ? p2 : new THREE.Plane(),
		( p3 !== undefined ) ? p3 : new THREE.Plane(),
		( p4 !== undefined ) ? p4 : new THREE.Plane(),
		( p5 !== undefined ) ? p5 : new THREE.Plane()

	];

};

THREE.Frustum.prototype = {

	constructor: THREE.Frustum,

	set: function ( p0, p1, p2, p3, p4, p5 ) {

		var planes = this.planes;

		planes[ 0 ].copy( p0 );
		planes[ 1 ].copy( p1 );
		planes[ 2 ].copy( p2 );
		planes[ 3 ].copy( p3 );
		planes[ 4 ].copy( p4 );
		planes[ 5 ].copy( p5 );

		return this;

	},

	copy: function ( frustum ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			planes[ i ].copy( frustum.planes[ i ] );

		}

		return this;

	},

	setFromMatrix: function ( m ) {

		var planes = this.planes;
		var me = m.elements;
		var me0 = me[ 0 ], me1 = me[ 1 ], me2 = me[ 2 ], me3 = me[ 3 ];
		var me4 = me[ 4 ], me5 = me[ 5 ], me6 = me[ 6 ], me7 = me[ 7 ];
		var me8 = me[ 8 ], me9 = me[ 9 ], me10 = me[ 10 ], me11 = me[ 11 ];
		var me12 = me[ 12 ], me13 = me[ 13 ], me14 = me[ 14 ], me15 = me[ 15 ];

		planes[ 0 ].setComponents( me3 - me0, me7 - me4, me11 - me8, me15 - me12 ).normalize();
		planes[ 1 ].setComponents( me3 + me0, me7 + me4, me11 + me8, me15 + me12 ).normalize();
		planes[ 2 ].setComponents( me3 + me1, me7 + me5, me11 + me9, me15 + me13 ).normalize();
		planes[ 3 ].setComponents( me3 - me1, me7 - me5, me11 - me9, me15 - me13 ).normalize();
		planes[ 4 ].setComponents( me3 - me2, me7 - me6, me11 - me10, me15 - me14 ).normalize();
		planes[ 5 ].setComponents( me3 + me2, me7 + me6, me11 + me10, me15 + me14 ).normalize();

		return this;

	},

	intersectsObject: function () {

		var sphere = new THREE.Sphere();

		return function ( object ) {

			var geometry = object.geometry;

			if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

			sphere.copy( geometry.boundingSphere );
			sphere.applyMatrix4( object.matrixWorld );

			return this.intersectsSphere( sphere );

		};

	}(),

	intersectsSphere: function ( sphere ) {

		var planes = this.planes;
		var center = sphere.center;
		var negRadius = - sphere.radius;

		for ( var i = 0; i < 6; i ++ ) {

			var distance = planes[ i ].distanceToPoint( center );

			if ( distance < negRadius ) {

				return false;

			}

		}

		return true;

	},

	intersectsBox: function () {

		var p1 = new THREE.Vector3(),
			p2 = new THREE.Vector3();

		return function ( box ) {

			var planes = this.planes;

			for ( var i = 0; i < 6 ; i ++ ) {

				var plane = planes[ i ];

				p1.x = plane.normal.x > 0 ? box.min.x : box.max.x;
				p2.x = plane.normal.x > 0 ? box.max.x : box.min.x;
				p1.y = plane.normal.y > 0 ? box.min.y : box.max.y;
				p2.y = plane.normal.y > 0 ? box.max.y : box.min.y;
				p1.z = plane.normal.z > 0 ? box.min.z : box.max.z;
				p2.z = plane.normal.z > 0 ? box.max.z : box.min.z;

				var d1 = plane.distanceToPoint( p1 );
				var d2 = plane.distanceToPoint( p2 );

				// if both outside plane, no intersection

				if ( d1 < 0 && d2 < 0 ) {

					return false;

				}
			}

			return true;
		};

	}(),


	containsPoint: function ( point ) {

		var planes = this.planes;

		for ( var i = 0; i < 6; i ++ ) {

			if ( planes[ i ].distanceToPoint( point ) < 0 ) {

				return false;

			}

		}

		return true;

	},

	clone: function () {

		return new THREE.Frustum().copy( this );

	}

};

// File:src/math/Plane.js

/**
 * @author bhouston / http://exocortex.com
 */

THREE.Plane = function ( normal, constant ) {

	this.normal = ( normal !== undefined ) ? normal : new THREE.Vector3( 1, 0, 0 );
	this.constant = ( constant !== undefined ) ? constant : 0;

};

THREE.Plane.prototype = {

	constructor: THREE.Plane,

	set: function ( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	},

	setComponents: function ( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	},

	setFromNormalAndCoplanarPoint: function ( normal, point ) {

		this.normal.copy( normal );
		this.constant = - point.dot( this.normal );	// must be this.normal, not normal, as this.normal is normalized

		return this;

	},

	setFromCoplanarPoints: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();

		return function ( a, b, c ) {

			var normal = v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

			// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?

			this.setFromNormalAndCoplanarPoint( normal, a );

			return this;

		};

	}(),


	copy: function ( plane ) {

		this.normal.copy( plane.normal );
		this.constant = plane.constant;

		return this;

	},

	normalize: function () {

		// Note: will lead to a divide by zero if the plane is invalid.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	},

	negate: function () {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	},

	distanceToPoint: function ( point ) {

		return this.normal.dot( point ) + this.constant;

	},

	distanceToSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	},

	projectPoint: function ( point, optionalTarget ) {

		return this.orthoPoint( point, optionalTarget ).sub( point ).negate();

	},

	orthoPoint: function ( point, optionalTarget ) {

		var perpendicularMagnitude = this.distanceToPoint( point );

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( perpendicularMagnitude );

	},

	isIntersectionLine: function ( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	},

	intersectLine: function () {

		var v1 = new THREE.Vector3();

		return function ( line, optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			var direction = line.delta( v1 );

			var denominator = this.normal.dot( direction );

			if ( denominator == 0 ) {

				// line is coplanar, return origin
				if ( this.distanceToPoint( line.start ) == 0 ) {

					return result.copy( line.start );

				}

				// Unsure if this is the correct method to handle this case.
				return undefined;

			}

			var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

			if ( t < 0 || t > 1 ) {

				return undefined;

			}

			return result.copy( direction ).multiplyScalar( t ).add( line.start );

		};

	}(),


	coplanarPoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.copy( this.normal ).multiplyScalar( - this.constant );

	},

	applyMatrix4: function () {

		var v1 = new THREE.Vector3();
		var v2 = new THREE.Vector3();
		var m1 = new THREE.Matrix3();

		return function ( matrix, optionalNormalMatrix ) {

			// compute new normal based on theory here:
			// http://www.songho.ca/opengl/gl_normaltransform.html
			var normalMatrix = optionalNormalMatrix || m1.getNormalMatrix( matrix );
			var newNormal = v1.copy( this.normal ).applyMatrix3( normalMatrix );

			var newCoplanarPoint = this.coplanarPoint( v2 );
			newCoplanarPoint.applyMatrix4( matrix );

			this.setFromNormalAndCoplanarPoint( newNormal, newCoplanarPoint );

			return this;

		};

	}(),

	translate: function ( offset ) {

		this.constant = this.constant - offset.dot( this.normal );

		return this;

	},

	equals: function ( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant == this.constant );

	},

	clone: function () {

		return new THREE.Plane().copy( this );

	}

};

// File:src/math/Math.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Math = {

	generateUUID: function () {

		// http://www.broofa.com/Tools/Math.uuid.htm

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
		var uuid = new Array( 36 );
		var rnd = 0, r;

		return function () {

			for ( var i = 0; i < 36; i ++ ) {

				if ( i == 8 || i == 13 || i == 18 || i == 23 ) {

					uuid[ i ] = '-';

				} else if ( i == 14 ) {

					uuid[ i ] = '4';

				} else {

					if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
					r = rnd & 0xf;
					rnd = rnd >> 4;
					uuid[ i ] = chars[ ( i == 19 ) ? ( r & 0x3 ) | 0x8 : r ];

				}
			}

			return uuid.join( '' );

		};

	}(),

	// Clamp value to range <a, b>

	clamp: function ( x, a, b ) {

		return ( x < a ) ? a : ( ( x > b ) ? b : x );

	},

	// Clamp value to range <a, inf)

	clampBottom: function ( x, a ) {

		return x < a ? a : x;

	},

	// Linear mapping from range <a1, a2> to range <b1, b2>

	mapLinear: function ( x, a1, a2, b1, b2 ) {

		return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

	},

	// http://en.wikipedia.org/wiki/Smoothstep

	smoothstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * ( 3 - 2 * x );

	},

	smootherstep: function ( x, min, max ) {

		if ( x <= min ) return 0;
		if ( x >= max ) return 1;

		x = ( x - min ) / ( max - min );

		return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

	},

	// Random float from <0, 1> with 16 bits of randomness
	// (standard Math.random() creates repetitive patterns when applied over larger space)

	random16: function () {

		return ( 65280 * Math.random() + 255 * Math.random() ) / 65535;

	},

	// Random integer from <low, high> interval

	randInt: function ( low, high ) {

		return low + Math.floor( Math.random() * ( high - low + 1 ) );

	},

	// Random float from <low, high> interval

	randFloat: function ( low, high ) {

		return low + Math.random() * ( high - low );

	},

	// Random float from <-range/2, range/2> interval

	randFloatSpread: function ( range ) {

		return range * ( 0.5 - Math.random() );

	},

	degToRad: function () {

		var degreeToRadiansFactor = Math.PI / 180;

		return function ( degrees ) {

			return degrees * degreeToRadiansFactor;

		};

	}(),

	radToDeg: function () {

		var radianToDegreesFactor = 180 / Math.PI;

		return function ( radians ) {

			return radians * radianToDegreesFactor;

		};

	}(),

	isPowerOfTwo: function ( value ) {

		return ( value & ( value - 1 ) ) === 0 && value !== 0;

	}

};

// File:src/math/Spline.js

/**
 * Spline from Tween.js, slightly optimized (and trashed)
 * http://sole.github.com/tween.js/examples/05_spline.html
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Spline = function ( points ) {

	this.points = points;

	var c = [], v3 = { x: 0, y: 0, z: 0 },
	point, intPoint, weight, w2, w3,
	pa, pb, pc, pd;

	this.initFromArray = function ( a ) {

		this.points = [];

		for ( var i = 0; i < a.length; i ++ ) {

			this.points[ i ] = { x: a[ i ][ 0 ], y: a[ i ][ 1 ], z: a[ i ][ 2 ] };

		}

	};

	this.getPoint = function ( k ) {

		point = ( this.points.length - 1 ) * k;
		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint  > this.points.length - 2 ? this.points.length - 1 : intPoint + 1;
		c[ 3 ] = intPoint  > this.points.length - 3 ? this.points.length - 1 : intPoint + 2;

		pa = this.points[ c[ 0 ] ];
		pb = this.points[ c[ 1 ] ];
		pc = this.points[ c[ 2 ] ];
		pd = this.points[ c[ 3 ] ];

		w2 = weight * weight;
		w3 = weight * w2;

		v3.x = interpolate( pa.x, pb.x, pc.x, pd.x, weight, w2, w3 );
		v3.y = interpolate( pa.y, pb.y, pc.y, pd.y, weight, w2, w3 );
		v3.z = interpolate( pa.z, pb.z, pc.z, pd.z, weight, w2, w3 );

		return v3;

	};

	this.getControlPointsArray = function () {

		var i, p, l = this.points.length,
			coords = [];

		for ( i = 0; i < l; i ++ ) {

			p = this.points[ i ];
			coords[ i ] = [ p.x, p.y, p.z ];

		}

		return coords;

	};

	// approximate length by summing linear segments

	this.getLength = function ( nSubDivisions ) {

		var i, index, nSamples, position,
			point = 0, intPoint = 0, oldIntPoint = 0,
			oldPosition = new THREE.Vector3(),
			tmpVec = new THREE.Vector3(),
			chunkLengths = [],
			totalLength = 0;

		// first point has 0 length

		chunkLengths[ 0 ] = 0;

		if ( ! nSubDivisions ) nSubDivisions = 100;

		nSamples = this.points.length * nSubDivisions;

		oldPosition.copy( this.points[ 0 ] );

		for ( i = 1; i < nSamples; i ++ ) {

			index = i / nSamples;

			position = this.getPoint( index );
			tmpVec.copy( position );

			totalLength += tmpVec.distanceTo( oldPosition );

			oldPosition.copy( position );

			point = ( this.points.length - 1 ) * index;
			intPoint = Math.floor( point );

			if ( intPoint != oldIntPoint ) {

				chunkLengths[ intPoint ] = totalLength;
				oldIntPoint = intPoint;

			}

		}

		// last point ends with total length

		chunkLengths[ chunkLengths.length ] = totalLength;

		return { chunks: chunkLengths, total: totalLength };

	};

	this.reparametrizeByArcLength = function ( samplingCoef ) {

		var i, j,
			index, indexCurrent, indexNext,
			linearDistance, realDistance,
			sampling, position,
			newpoints = [],
			tmpVec = new THREE.Vector3(),
			sl = this.getLength();

		newpoints.push( tmpVec.copy( this.points[ 0 ] ).clone() );

		for ( i = 1; i < this.points.length; i ++ ) {

			//tmpVec.copy( this.points[ i - 1 ] );
			//linearDistance = tmpVec.distanceTo( this.points[ i ] );

			realDistance = sl.chunks[ i ] - sl.chunks[ i - 1 ];

			sampling = Math.ceil( samplingCoef * realDistance / sl.total );

			indexCurrent = ( i - 1 ) / ( this.points.length - 1 );
			indexNext = i / ( this.points.length - 1 );

			for ( j = 1; j < sampling - 1; j ++ ) {

				index = indexCurrent + j * ( 1 / sampling ) * ( indexNext - indexCurrent );

				position = this.getPoint( index );
				newpoints.push( tmpVec.copy( position ).clone() );

			}

			newpoints.push( tmpVec.copy( this.points[ i ] ).clone() );

		}

		this.points = newpoints;

	};

	// Catmull-Rom

	function interpolate( p0, p1, p2, p3, t, t2, t3 ) {

		var v0 = ( p2 - p0 ) * 0.5,
			v1 = ( p3 - p1 ) * 0.5;

		return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	};

};

// File:src/math/Triangle.js

/**
 * @author bhouston / http://exocortex.com
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Triangle = function ( a, b, c ) {

	this.a = ( a !== undefined ) ? a : new THREE.Vector3();
	this.b = ( b !== undefined ) ? b : new THREE.Vector3();
	this.c = ( c !== undefined ) ? c : new THREE.Vector3();

};

THREE.Triangle.normal = function () {

	var v0 = new THREE.Vector3();

	return function ( a, b, c, optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		result.subVectors( c, b );
		v0.subVectors( a, b );
		result.cross( v0 );

		var resultLengthSq = result.lengthSq();
		if ( resultLengthSq > 0 ) {

			return result.multiplyScalar( 1 / Math.sqrt( resultLengthSq ) );

		}

		return result.set( 0, 0, 0 );

	};

}();

// static/instance method to calculate barycoordinates
// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
THREE.Triangle.barycoordFromPoint = function () {

	var v0 = new THREE.Vector3();
	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( point, a, b, c, optionalTarget ) {

		v0.subVectors( c, a );
		v1.subVectors( b, a );
		v2.subVectors( point, a );

		var dot00 = v0.dot( v0 );
		var dot01 = v0.dot( v1 );
		var dot02 = v0.dot( v2 );
		var dot11 = v1.dot( v1 );
		var dot12 = v1.dot( v2 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		var result = optionalTarget || new THREE.Vector3();

		// colinear or singular triangle
		if ( denom == 0 ) {
			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return result.set( - 2, - 1, - 1 );
		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycoordinates must always sum to 1
		return result.set( 1 - u - v, v, u );

	};

}();

THREE.Triangle.containsPoint = function () {

	var v1 = new THREE.Vector3();

	return function ( point, a, b, c ) {

		var result = THREE.Triangle.barycoordFromPoint( point, a, b, c, v1 );

		return ( result.x >= 0 ) && ( result.y >= 0 ) && ( ( result.x + result.y ) <= 1 );

	};

}();

THREE.Triangle.prototype = {

	constructor: THREE.Triangle,

	set: function ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	},

	setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	},

	copy: function ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	},

	area: function () {

		var v0 = new THREE.Vector3();
		var v1 = new THREE.Vector3();

		return function () {

			v0.subVectors( this.c, this.b );
			v1.subVectors( this.a, this.b );

			return v0.cross( v1 ).length() * 0.5;

		};

	}(),

	midpoint: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();
		return result.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	},

	normal: function ( optionalTarget ) {

		return THREE.Triangle.normal( this.a, this.b, this.c, optionalTarget );

	},

	plane: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Plane();

		return result.setFromCoplanarPoints( this.a, this.b, this.c );

	},

	barycoordFromPoint: function ( point, optionalTarget ) {

		return THREE.Triangle.barycoordFromPoint( point, this.a, this.b, this.c, optionalTarget );

	},

	containsPoint: function ( point ) {

		return THREE.Triangle.containsPoint( point, this.a, this.b, this.c );

	},

	equals: function ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	},

	clone: function () {

		return new THREE.Triangle().copy( this );

	}

};

// File:src/core/Clock.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Clock = function ( autoStart ) {

	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;

	this.startTime = 0;
	this.oldTime = 0;
	this.elapsedTime = 0;

	this.running = false;

};

THREE.Clock.prototype = {

	constructor: THREE.Clock,

	start: function () {

		this.startTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();

		this.oldTime = this.startTime;
		this.running = true;
	},

	stop: function () {

		this.getElapsedTime();
		this.running = false;

	},

	getElapsedTime: function () {

		this.getDelta();
		return this.elapsedTime;

	},

	getDelta: function () {

		var diff = 0;

		if ( this.autoStart && ! this.running ) {

			this.start();

		}

		if ( this.running ) {

			var newTime = self.performance !== undefined && self.performance.now !== undefined
					 ? self.performance.now()
					 : Date.now();

			diff = 0.001 * ( newTime - this.oldTime );
			this.oldTime = newTime;

			this.elapsedTime += diff;

		}

		return diff;

	}

};

// File:src/core/EventDispatcher.js

/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

THREE.EventDispatcher = function () {}

THREE.EventDispatcher.prototype = {

	constructor: THREE.EventDispatcher,

	apply: function ( object ) {

		object.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
		object.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
		object.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
		object.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent;

	},

	addEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) this._listeners = {};

		var listeners = this._listeners;

		if ( listeners[ type ] === undefined ) {

			listeners[ type ] = [];

		}

		if ( listeners[ type ].indexOf( listener ) === - 1 ) {

			listeners[ type ].push( listener );

		}

	},

	hasEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return false;

		var listeners = this._listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	},

	removeEventListener: function ( type, listener ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	},

	dispatchEvent: function ( event ) {

		if ( this._listeners === undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];

		if ( listenerArray !== undefined ) {

			event.target = this;

			var array = [];
			var length = listenerArray.length;

			for ( var i = 0; i < length; i ++ ) {

				array[ i ] = listenerArray[ i ];

			}

			for ( var i = 0; i < length; i ++ ) {

				array[ i ].call( this, event );

			}

		}

	}

};

// File:src/core/Raycaster.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://exocortex.com/
 * @author stephomi / http://stephaneginier.com/
 */

( function ( THREE ) {

	THREE.Raycaster = function ( origin, direction, near, far ) {

		this.ray = new THREE.Ray( origin, direction );
		// direction is assumed to be normalized (for accurate distance calculations)

		this.near = near || 0;
		this.far = far || Infinity;

		this.params = {
			Sprite: {},
			Mesh: {},
			PointCloud: { threshold: 1 },
			LOD: {},
			Line: {}
		};

	};

	var descSort = function ( a, b ) {

		return a.distance - b.distance;

	};

	var intersectObject = function ( object, raycaster, intersects, recursive ) {

		object.raycast( raycaster, intersects );

		if ( recursive === true ) {

			var children = object.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				intersectObject( children[ i ], raycaster, intersects, true );

			}

		}

	};

	//

	THREE.Raycaster.prototype = {

		constructor: THREE.Raycaster,

		precision: 0.0001,
		linePrecision: 1,

		set: function ( origin, direction ) {

			this.ray.set( origin, direction );
			// direction is assumed to be normalized (for accurate distance calculations)

		},

		intersectObject: function ( object, recursive ) {

			var intersects = [];

			intersectObject( object, this, intersects, recursive );

			intersects.sort( descSort );

			return intersects;

		},

		intersectObjects: function ( objects, recursive ) {

			var intersects = [];

			if ( objects instanceof Array === false ) {

				console.log( 'THREE.Raycaster.intersectObjects: objects is not an Array.' );
				return intersects;

			}

			for ( var i = 0, l = objects.length; i < l; i ++ ) {

				intersectObject( objects[ i ], this, intersects, recursive );

			}

			intersects.sort( descSort );

			return intersects;

		}

	};

}( THREE ) );

// File:src/core/Object3D.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.Object3D = function () {

	Object.defineProperty( this, 'id', { value: THREE.Object3DIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';
	this.type = 'Object3D';

	this.parent = undefined;
	this.children = [];

	this.up = THREE.Object3D.DefaultUp.clone();

	var scope = this;

	var position = new THREE.Vector3();
	var rotation = new THREE.Euler();
	var quaternion = new THREE.Quaternion();
	var scale = new THREE.Vector3( 1, 1, 1 );

	var onRotationChange = function () {
		quaternion.setFromEuler( rotation, false );
	};

	var onQuaternionChange = function () {
		rotation.setFromQuaternion( quaternion, undefined, false );
	};

	rotation.onChange( onRotationChange );
	quaternion.onChange( onQuaternionChange );

	Object.defineProperties( this, {
		position: {
			enumerable: true,
			value: position
		},
		rotation: {
			enumerable: true,
			value: rotation
		},
		quaternion: {
			enumerable: true,
			value: quaternion
		},
		scale: {
			enumerable: true,
			value: scale
		},
	} );

	this.renderDepth = null;

	this.rotationAutoUpdate = true;

	this.matrix = new THREE.Matrix4();
	this.matrixWorld = new THREE.Matrix4();

	this.matrixAutoUpdate = true;
	this.matrixWorldNeedsUpdate = false;

	this.visible = true;

	this.castShadow = false;
	this.receiveShadow = false;

	this.frustumCulled = true;

	this.userData = {};

};

THREE.Object3D.DefaultUp = new THREE.Vector3( 0, 1, 0 );

THREE.Object3D.prototype = {

	constructor: THREE.Object3D,

	get eulerOrder () {

		console.warn( 'THREE.Object3D: .eulerOrder has been moved to .rotation.order.' );

		return this.rotation.order;

	},

	set eulerOrder ( value ) {

		console.warn( 'THREE.Object3D: .eulerOrder has been moved to .rotation.order.' );

		this.rotation.order = value;

	},

	get useQuaternion () {

		console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

	},

	set useQuaternion ( value ) {

		console.warn( 'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.' );

	},

	applyMatrix: function ( matrix ) {

		this.matrix.multiplyMatrices( matrix, this.matrix );

		this.matrix.decompose( this.position, this.quaternion, this.scale );

	},

	setRotationFromAxisAngle: function ( axis, angle ) {

		// assumes axis is normalized

		this.quaternion.setFromAxisAngle( axis, angle );

	},

	setRotationFromEuler: function ( euler ) {

		this.quaternion.setFromEuler( euler, true );

	},

	setRotationFromMatrix: function ( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	},

	setRotationFromQuaternion: function ( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	},

	rotateOnAxis: function () {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		var q1 = new THREE.Quaternion();

		return function ( axis, angle ) {

			q1.setFromAxisAngle( axis, angle );

			this.quaternion.multiply( q1 );

			return this;

		}

	}(),

	rotateX: function () {

		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),

	rotateY: function () {

		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),

	rotateZ: function () {

		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( angle ) {

			return this.rotateOnAxis( v1, angle );

		};

	}(),

	translateOnAxis: function () {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		var v1 = new THREE.Vector3();

		return function ( axis, distance ) {

			v1.copy( axis ).applyQuaternion( this.quaternion );

			this.position.add( v1.multiplyScalar( distance ) );

			return this;

		}

	}(),

	translate: function ( distance, axis ) {

		console.warn( 'THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.' );
		return this.translateOnAxis( axis, distance );

	},

	translateX: function () {

		var v1 = new THREE.Vector3( 1, 0, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),

	translateY: function () {

		var v1 = new THREE.Vector3( 0, 1, 0 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),

	translateZ: function () {

		var v1 = new THREE.Vector3( 0, 0, 1 );

		return function ( distance ) {

			return this.translateOnAxis( v1, distance );

		};

	}(),

	localToWorld: function ( vector ) {

		return vector.applyMatrix4( this.matrixWorld );

	},

	worldToLocal: function () {

		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			return vector.applyMatrix4( m1.getInverse( this.matrixWorld ) );

		};

	}(),

	lookAt: function () {

		// This routine does not support objects with rotated and/or translated parent(s)

		var m1 = new THREE.Matrix4();

		return function ( vector ) {

			m1.lookAt( vector, this.position, this.up );

			this.quaternion.setFromRotationMatrix( m1 );

		};

	}(),

	add: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		};

		if ( object === this ) {

			console.error( "THREE.Object3D.add:", object, "can't be added as a child of itself." );
			return this;

		}

		if ( object instanceof THREE.Object3D ) {

			if ( object.parent !== undefined ) {

				object.parent.remove( object );

			}

			object.parent = this;
			object.dispatchEvent( { type: 'added' } );

			this.children.push( object );

		} else {

			console.error( "THREE.Object3D.add:", object, "is not an instance of THREE.Object3D." );

		}

		return this;

	},

	remove: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i++ ) {

				this.remove( arguments[ i ] );

			}

		};

		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = undefined;

			object.dispatchEvent( { type: 'removed' } );

			this.children.splice( index, 1 );

		}

	},

	getChildByName: function ( name, recursive ) {

		console.warn( 'THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().' );
		return this.getObjectByName( name, recursive );

	},

	getObjectById: function ( id, recursive ) {

		if ( this.id === id ) return this;

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];
			var object = child.getObjectById( id, recursive );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},

	getObjectByName: function ( name, recursive ) {

		if ( this.name === name ) return this;

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];
			var object = child.getObjectByName( name, recursive );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},

	getWorldPosition: function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		this.updateMatrixWorld( true );

		return result.setFromMatrixPosition( this.matrixWorld );

	},

	getWorldQuaternion: function () {

		var position = new THREE.Vector3();
		var scale = new THREE.Vector3();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Quaternion();

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( position, result, scale );

			return result;

		}

	}(),

	getWorldRotation: function () {

		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Euler();

			this.getWorldQuaternion( quaternion );

			return result.setFromQuaternion( quaternion, this.rotation.order, false );

		}

	}(),

	getWorldScale: function () {

		var position = new THREE.Vector3();
		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			this.updateMatrixWorld( true );

			this.matrixWorld.decompose( position, quaternion, result );

			return result;

		}

	}(),

	getWorldDirection: function () {

		var quaternion = new THREE.Quaternion();

		return function ( optionalTarget ) {

			var result = optionalTarget || new THREE.Vector3();

			this.getWorldQuaternion( quaternion );

			return result.set( 0, 0, 1 ).applyQuaternion( quaternion );

		}

	}(),

	raycast: function () {},

	traverse: function ( callback ) {

		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverse( callback );

		}

	},

	traverseVisible: function ( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].traverseVisible( callback );

		}

	},

	updateMatrix: function () {

		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	},

	updateMatrixWorld: function ( force ) {

		if ( this.matrixAutoUpdate === true ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate === true || force === true ) {

			if ( this.parent === undefined ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	},

	toJSON: function () {

		var output = {
			metadata: {
				version: 4.3,
				type: 'Object',
				generator: 'ObjectExporter'
			}
		};

		//

		var geometries = {};

		var parseGeometry = function ( geometry ) {

			if ( output.geometries === undefined ) {

				output.geometries = [];

			}

			if ( geometries[ geometry.uuid ] === undefined ) {

				var json = geometry.toJSON();

				delete json.metadata;

				geometries[ geometry.uuid ] = json;

				output.geometries.push( json );

			}

			return geometry.uuid;

		};

		//

		var materials = {};

		var parseMaterial = function ( material ) {

			if ( output.materials === undefined ) {

				output.materials = [];

			}

			if ( materials[ material.uuid ] === undefined ) {

				var json = material.toJSON();

				delete json.metadata;

				materials[ material.uuid ] = json;

				output.materials.push( json );

			}

			return material.uuid;

		};

		//

		var parseObject = function ( object ) {

			var data = {};

			data.uuid = object.uuid;
			data.type = object.type;

			if ( object.name !== '' ) data.name = object.name;
			if ( JSON.stringify( object.userData ) !== '{}' ) data.userData = object.userData;
			if ( object.visible !== true ) data.visible = object.visible;

			if ( object instanceof THREE.PerspectiveCamera ) {

				data.fov = object.fov;
				data.aspect = object.aspect;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.OrthographicCamera ) {

				data.left = object.left;
				data.right = object.right;
				data.top = object.top;
				data.bottom = object.bottom;
				data.near = object.near;
				data.far = object.far;

			} else if ( object instanceof THREE.AmbientLight ) {

				data.color = object.color.getHex();

			} else if ( object instanceof THREE.DirectionalLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;

			} else if ( object instanceof THREE.PointLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;

			} else if ( object instanceof THREE.SpotLight ) {

				data.color = object.color.getHex();
				data.intensity = object.intensity;
				data.distance = object.distance;
				data.angle = object.angle;
				data.exponent = object.exponent;

			} else if ( object instanceof THREE.HemisphereLight ) {

				data.color = object.color.getHex();
				data.groundColor = object.groundColor.getHex();

			} else if ( object instanceof THREE.Mesh ) {

				data.geometry = parseGeometry( object.geometry );
				data.material = parseMaterial( object.material );

			} else if ( object instanceof THREE.Line ) {

				data.geometry = parseGeometry( object.geometry );
				data.material = parseMaterial( object.material );

			} else if ( object instanceof THREE.Sprite ) {

				data.material = parseMaterial( object.material );

			}

			data.matrix = object.matrix.toArray();

			if ( object.children.length > 0 ) {

				data.children = [];

				for ( var i = 0; i < object.children.length; i ++ ) {

					data.children.push( parseObject( object.children[ i ] ) );

				}

			}

			return data;

		}

		output.object = parseObject( this );

		return output;

	},

	clone: function ( object, recursive ) {

		if ( object === undefined ) object = new THREE.Object3D();
		if ( recursive === undefined ) recursive = true;

		object.name = this.name;

		object.up.copy( this.up );

		object.position.copy( this.position );
		object.quaternion.copy( this.quaternion );
		object.scale.copy( this.scale );

		object.renderDepth = this.renderDepth;

		object.rotationAutoUpdate = this.rotationAutoUpdate;

		object.matrix.copy( this.matrix );
		object.matrixWorld.copy( this.matrixWorld );

		object.matrixAutoUpdate = this.matrixAutoUpdate;
		object.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate;

		object.visible = this.visible;

		object.castShadow = this.castShadow;
		object.receiveShadow = this.receiveShadow;

		object.frustumCulled = this.frustumCulled;

		object.userData = JSON.parse( JSON.stringify( this.userData ) );

		if ( recursive === true ) {

			for ( var i = 0; i < this.children.length; i ++ ) {

				var child = this.children[ i ];
				object.add( child.clone() );

			}

		}

		return object;

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Object3D.prototype );

THREE.Object3DIdCount = 0;

// File:src/core/Projector.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Projector = function () {

	console.warn( 'THREE.Projector has been moved to /examples/renderers/Projector.js.' );

	this.projectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .projectVector() is now vector.project().' );
		vector.project( camera );

	};

	this.unprojectVector = function ( vector, camera ) {

		console.warn( 'THREE.Projector: .unprojectVector() is now vector.unproject().' );
		vector.unproject( camera );

	};

	this.pickingRay = function ( vector, camera ) {

		console.error( 'THREE.Projector: .pickingRay() has been removed.' );

	};

};

// File:src/core/Face3.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Face3 = function ( a, b, c, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals = normal instanceof Array ? normal : [];

	this.color = color instanceof THREE.Color ? color : new THREE.Color();
	this.vertexColors = color instanceof Array ? color : [];

	this.vertexTangents = [];

	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

};

THREE.Face3.prototype = {

	constructor: THREE.Face3,

	clone: function () {

		var face = new THREE.Face3( this.a, this.b, this.c );

		face.normal.copy( this.normal );
		face.color.copy( this.color );

		face.materialIndex = this.materialIndex;

		for ( var i = 0, il = this.vertexNormals.length; i < il; i ++ ) {

			face.vertexNormals[ i ] = this.vertexNormals[ i ].clone();

		}

		for ( var i = 0, il = this.vertexColors.length; i < il; i ++ ) {

			face.vertexColors[ i ] = this.vertexColors[ i ].clone();

		}

		for ( var i = 0, il = this.vertexTangents.length; i < il; i ++ ) {

			face.vertexTangents[ i ] = this.vertexTangents[ i ].clone();

		}

		return face;

	}

};

// File:src/core/Face4.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Face4 = function ( a, b, c, d, normal, color, materialIndex ) {

	console.warn( 'THREE.Face4 has been removed. A THREE.Face3 will be created instead.' )
	return new THREE.Face3( a, b, c, normal, color, materialIndex );

};

// File:src/core/BufferAttribute.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BufferAttribute = function ( array, itemSize ) {

	this.array = array;
	this.itemSize = itemSize;

	this.needsUpdate = false;

};

THREE.BufferAttribute.prototype = {

	constructor: THREE.BufferAttribute,

	get length () {

		return this.array.length;

	},

	copyAt: function ( index1, attribute, index2 ) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for ( var i = 0, l = this.itemSize; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

	},

	set: function ( value ) {

		this.array.set( value );

		return this;

	},

	setX: function ( index, x ) {

		this.array[ index * this.itemSize ] = x;

		return this;

	},

	setY: function ( index, y ) {

		this.array[ index * this.itemSize + 1 ] = y;

		return this;

	},

	setZ: function ( index, z ) {

		this.array[ index * this.itemSize + 2 ] = z;

		return this;

	},

	setXY: function ( index, x, y ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;

		return this;

	},

	setXYZ: function ( index, x, y, z ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;

		return this;

	},

	setXYZW: function ( index, x, y, z, w ) {

		index *= this.itemSize;

		this.array[ index     ] = x;
		this.array[ index + 1 ] = y;
		this.array[ index + 2 ] = z;
		this.array[ index + 3 ] = w;

		return this;

	},

	clone: function () {

		return new THREE.BufferAttribute( new this.array.constructor( this.array ), this.itemSize );

	}

};

//

THREE.Int8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint8ClampedAttribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );


};

THREE.Int16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint16Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Int32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Uint32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float32Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

THREE.Float64Attribute = function ( data, itemSize ) {

	console.warn( 'THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead.' );
	return new THREE.BufferAttribute( data, itemSize );

};

// File:src/core/BufferGeometry.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BufferGeometry = function () {

	Object.defineProperty( this, 'id', { value: THREE.GeometryIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';
	this.type = 'BufferGeometry';

	this.attributes = {};
	this.attributesKeys = [];

	this.drawcalls = [];
	this.offsets = this.drawcalls; // backwards compatibility

	this.boundingBox = null;
	this.boundingSphere = null;

};

THREE.BufferGeometry.prototype = {

	constructor: THREE.BufferGeometry,

	addAttribute: function ( name, attribute ) {

		if ( attribute instanceof THREE.BufferAttribute === false ) {

			console.warn( 'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).' );

			this.attributes[ name ] = { array: arguments[ 1 ], itemSize: arguments[ 2 ] };

			return;

		}

		this.attributes[ name ] = attribute;
		this.attributesKeys = Object.keys( this.attributes );

	},

	getAttribute: function ( name ) {

		return this.attributes[ name ];

	},

	addDrawCall: function ( start, count, indexOffset ) {

		this.drawcalls.push( {

			start: start,
			count: count,
			index: indexOffset !== undefined ? indexOffset : 0

		} );

	},

	applyMatrix: function ( matrix ) {

		var position = this.attributes.position;

		if ( position !== undefined ) {

			matrix.applyToVector3Array( position.array );
			position.needsUpdate = true;

		}

		var normal = this.attributes.normal;

		if ( normal !== undefined ) {

			var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

			normalMatrix.applyToVector3Array( normal.array );
			normal.needsUpdate = true;

		}

	},

	center: function () {

		// TODO

	},

	fromGeometry: function ( geometry, settings ) {

		settings = settings || { 'vertexColors': THREE.NoColors };

		var vertices = geometry.vertices;
		var faces = geometry.faces;
		var faceVertexUvs = geometry.faceVertexUvs;
		var vertexColors = settings.vertexColors;
		var hasFaceVertexUv = faceVertexUvs[ 0 ].length > 0;
		var hasFaceVertexNormals = faces[ 0 ].vertexNormals.length == 3;

		var positions = new Float32Array( faces.length * 3 * 3 );
		this.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

		var normals = new Float32Array( faces.length * 3 * 3 );
		this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

		if ( vertexColors !== THREE.NoColors ) {

			var colors = new Float32Array( faces.length * 3 * 3 );
			this.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

		}

		if ( hasFaceVertexUv === true ) {

			var uvs = new Float32Array( faces.length * 3 * 2 );
			this.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

		}

		for ( var i = 0, i2 = 0, i3 = 0; i < faces.length; i ++, i2 += 6, i3 += 9 ) {

			var face = faces[ i ];

			var a = vertices[ face.a ];
			var b = vertices[ face.b ];
			var c = vertices[ face.c ];

			positions[ i3     ] = a.x;
			positions[ i3 + 1 ] = a.y;
			positions[ i3 + 2 ] = a.z;

			positions[ i3 + 3 ] = b.x;
			positions[ i3 + 4 ] = b.y;
			positions[ i3 + 5 ] = b.z;

			positions[ i3 + 6 ] = c.x;
			positions[ i3 + 7 ] = c.y;
			positions[ i3 + 8 ] = c.z;

			if ( hasFaceVertexNormals === true ) {

				var na = face.vertexNormals[ 0 ];
				var nb = face.vertexNormals[ 1 ];
				var nc = face.vertexNormals[ 2 ];

				normals[ i3     ] = na.x;
				normals[ i3 + 1 ] = na.y;
				normals[ i3 + 2 ] = na.z;

				normals[ i3 + 3 ] = nb.x;
				normals[ i3 + 4 ] = nb.y;
				normals[ i3 + 5 ] = nb.z;

				normals[ i3 + 6 ] = nc.x;
				normals[ i3 + 7 ] = nc.y;
				normals[ i3 + 8 ] = nc.z;

			} else {

				var n = face.normal;

				normals[ i3     ] = n.x;
				normals[ i3 + 1 ] = n.y;
				normals[ i3 + 2 ] = n.z;

				normals[ i3 + 3 ] = n.x;
				normals[ i3 + 4 ] = n.y;
				normals[ i3 + 5 ] = n.z;

				normals[ i3 + 6 ] = n.x;
				normals[ i3 + 7 ] = n.y;
				normals[ i3 + 8 ] = n.z;

			}

			if ( vertexColors === THREE.FaceColors ) {

				var fc = face.color;

				colors[ i3     ] = fc.r;
				colors[ i3 + 1 ] = fc.g;
				colors[ i3 + 2 ] = fc.b;

				colors[ i3 + 3 ] = fc.r;
				colors[ i3 + 4 ] = fc.g;
				colors[ i3 + 5 ] = fc.b;

				colors[ i3 + 6 ] = fc.r;
				colors[ i3 + 7 ] = fc.g;
				colors[ i3 + 8 ] = fc.b;

			} else if ( vertexColors === THREE.VertexColors ) {

				var vca = face.vertexColors[ 0 ];
				var vcb = face.vertexColors[ 1 ];
				var vcc = face.vertexColors[ 2 ];

				colors[ i3     ] = vca.r;
				colors[ i3 + 1 ] = vca.g;
				colors[ i3 + 2 ] = vca.b;

				colors[ i3 + 3 ] = vcb.r;
				colors[ i3 + 4 ] = vcb.g;
				colors[ i3 + 5 ] = vcb.b;

				colors[ i3 + 6 ] = vcc.r;
				colors[ i3 + 7 ] = vcc.g;
				colors[ i3 + 8 ] = vcc.b;

			}

			if ( hasFaceVertexUv === true ) {

				var uva = faceVertexUvs[ 0 ][ i ][ 0 ];
				var uvb = faceVertexUvs[ 0 ][ i ][ 1 ];
				var uvc = faceVertexUvs[ 0 ][ i ][ 2 ];

				uvs[ i2     ] = uva.x;
				uvs[ i2 + 1 ] = uva.y;

				uvs[ i2 + 2 ] = uvb.x;
				uvs[ i2 + 3 ] = uvb.y;

				uvs[ i2 + 4 ] = uvc.x;
				uvs[ i2 + 5 ] = uvc.y;

			}

		}

		this.computeBoundingSphere()

		return this;

	},

	computeBoundingBox: function () {

		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingBox === null ) {

				this.boundingBox = new THREE.Box3();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				var bb = this.boundingBox;
				bb.makeEmpty();

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					bb.expandByPoint( vector );

				}

			}

			if ( positions === undefined || positions.length === 0 ) {

				this.boundingBox.min.set( 0, 0, 0 );
				this.boundingBox.max.set( 0, 0, 0 );

			}

			if ( isNaN( this.boundingBox.min.x ) || isNaN( this.boundingBox.min.y ) || isNaN( this.boundingBox.min.z ) ) {

				console.error( 'THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.' );

			}

		}

	}(),

	computeBoundingSphere: function () {

		var box = new THREE.Box3();
		var vector = new THREE.Vector3();

		return function () {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new THREE.Sphere();

			}

			var positions = this.attributes.position.array;

			if ( positions ) {

				box.makeEmpty();

				var center = this.boundingSphere.center;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					box.expandByPoint( vector );

				}

				box.center( center );

				// hoping to find a boundingSphere with a radius smaller than the
				// boundingSphere of the boundingBox:  sqrt(3) smaller in the best case

				var maxRadiusSq = 0;

				for ( var i = 0, il = positions.length; i < il; i += 3 ) {

					vector.set( positions[ i ], positions[ i + 1 ], positions[ i + 2 ] );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.' );

				}

			}

		}

	}(),

	computeFaceNormals: function () {

		// backwards compatibility

	},

	computeVertexNormals: function () {

		var attributes = this.attributes;

		if ( attributes.position ) {

			var positions = attributes.position.array;

			if ( attributes.normal === undefined ) {

				this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( positions.length ), 3 ) );

			} else {

				// reset existing normals to zero

				var normals = attributes.normal.array;

				for ( var i = 0, il = normals.length; i < il; i ++ ) {

					normals[ i ] = 0;

				}

			}

			var normals = attributes.normal.array;

			var vA, vB, vC,

			pA = new THREE.Vector3(),
			pB = new THREE.Vector3(),
			pC = new THREE.Vector3(),

			cb = new THREE.Vector3(),
			ab = new THREE.Vector3();

			// indexed elements

			if ( attributes.index ) {

				var indices = attributes.index.array;

				var offsets = ( this.offsets.length > 0 ? this.offsets : [ { start: 0, count: indices.length, index: 0 } ] );

				for ( var j = 0, jl = offsets.length; j < jl; ++ j ) {

					var start = offsets[ j ].start;
					var count = offsets[ j ].count;
					var index = offsets[ j ].index;

					for ( var i = start, il = start + count; i < il; i += 3 ) {

						vA = ( index + indices[ i     ] ) * 3;
						vB = ( index + indices[ i + 1 ] ) * 3;
						vC = ( index + indices[ i + 2 ] ) * 3;

						pA.fromArray( positions, vA );
						pB.fromArray( positions, vB );
						pC.fromArray( positions, vC );

						cb.subVectors( pC, pB );
						ab.subVectors( pA, pB );
						cb.cross( ab );

						normals[ vA     ] += cb.x;
						normals[ vA + 1 ] += cb.y;
						normals[ vA + 2 ] += cb.z;

						normals[ vB     ] += cb.x;
						normals[ vB + 1 ] += cb.y;
						normals[ vB + 2 ] += cb.z;

						normals[ vC     ] += cb.x;
						normals[ vC + 1 ] += cb.y;
						normals[ vC + 2 ] += cb.z;

					}

				}

			} else {

				// non-indexed elements (unconnected triangle soup)

				for ( var i = 0, il = positions.length; i < il; i += 9 ) {

					pA.fromArray( positions, i );
					pB.fromArray( positions, i + 3 );
					pC.fromArray( positions, i + 6 );

					cb.subVectors( pC, pB );
					ab.subVectors( pA, pB );
					cb.cross( ab );

					normals[ i     ] = cb.x;
					normals[ i + 1 ] = cb.y;
					normals[ i + 2 ] = cb.z;

					normals[ i + 3 ] = cb.x;
					normals[ i + 4 ] = cb.y;
					normals[ i + 5 ] = cb.z;

					normals[ i + 6 ] = cb.x;
					normals[ i + 7 ] = cb.y;
					normals[ i + 8 ] = cb.z;

				}

			}

			this.normalizeNormals();

			attributes.normal.needsUpdate = true;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// (per vertex tangents)

		if ( this.attributes.index === undefined ||
			 this.attributes.position === undefined ||
			 this.attributes.normal === undefined ||
			 this.attributes.uv === undefined ) {

			console.warn( 'Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()' );
			return;

		}

		var indices = this.attributes.index.array;
		var positions = this.attributes.position.array;
		var normals = this.attributes.normal.array;
		var uvs = this.attributes.uv.array;

		var nVertices = positions.length / 3;

		if ( this.attributes.tangent === undefined ) {

			this.addAttribute( 'tangent', new THREE.BufferAttribute( new Float32Array( 4 * nVertices ), 4 ) );

		}

		var tangents = this.attributes.tangent.array;

		var tan1 = [], tan2 = [];

		for ( var k = 0; k < nVertices; k ++ ) {

			tan1[ k ] = new THREE.Vector3();
			tan2[ k ] = new THREE.Vector3();

		}

		var vA = new THREE.Vector3(),
			vB = new THREE.Vector3(),
			vC = new THREE.Vector3(),

			uvA = new THREE.Vector2(),
			uvB = new THREE.Vector2(),
			uvC = new THREE.Vector2(),

			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r;

		var sdir = new THREE.Vector3(), tdir = new THREE.Vector3();

		function handleTriangle( a, b, c ) {

			vA.fromArray( positions, a * 3 );
			vB.fromArray( positions, b * 3 );
			vC.fromArray( positions, c * 3 );

			uvA.fromArray( uvs, a * 2 );
			uvB.fromArray( uvs, b * 2 );
			uvC.fromArray( uvs, c * 2 );

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;

			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;

			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.x - uvA.x;
			s2 = uvC.x - uvA.x;

			t1 = uvB.y - uvA.y;
			t2 = uvC.y - uvA.y;

			r = 1.0 / ( s1 * t2 - s2 * t1 );

			sdir.set(
				( t2 * x1 - t1 * x2 ) * r,
				( t2 * y1 - t1 * y2 ) * r,
				( t2 * z1 - t1 * z2 ) * r
			);

			tdir.set(
				( s1 * x2 - s2 * x1 ) * r,
				( s1 * y2 - s2 * y1 ) * r,
				( s1 * z2 - s2 * z1 ) * r
			);

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		var i, il;
		var j, jl;
		var iA, iB, iC;

		if ( this.drawcalls.length === 0 ) {

			this.addDrawCall( 0, indices.length, 0 );

		}

		var drawcalls = this.drawcalls;

		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleTriangle( iA, iB, iC );

			}

		}

		var tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();
		var n = new THREE.Vector3(), n2 = new THREE.Vector3();
		var w, t, test;

		function handleVertex( v ) {

			n.fromArray( normals, v * 3 );
			n2.copy( n );

			t = tan1[ v ];

			// Gram-Schmidt orthogonalize

			tmp.copy( t );
			tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

			// Calculate handedness

			tmp2.crossVectors( n2, t );
			test = tmp2.dot( tan2[ v ] );
			w = ( test < 0.0 ) ? - 1.0 : 1.0;

			tangents[ v * 4     ] = tmp.x;
			tangents[ v * 4 + 1 ] = tmp.y;
			tangents[ v * 4 + 2 ] = tmp.z;
			tangents[ v * 4 + 3 ] = w;

		}

		for ( j = 0, jl = drawcalls.length; j < jl; ++ j ) {

			var start = drawcalls[ j ].start;
			var count = drawcalls[ j ].count;
			var index = drawcalls[ j ].index;

			for ( i = start, il = start + count; i < il; i += 3 ) {

				iA = index + indices[ i ];
				iB = index + indices[ i + 1 ];
				iC = index + indices[ i + 2 ];

				handleVertex( iA );
				handleVertex( iB );
				handleVertex( iC );

			}

		}

	},

	/*
		computeOffsets
		Compute the draw offset for large models by chunking the index buffer into chunks of 65k addressable vertices.
		This method will effectively rewrite the index buffer and remap all attributes to match the new indices.
		WARNING: This method will also expand the vertex count to prevent sprawled triangles across draw offsets.
		indexBufferSize - Defaults to 65535, but allows for larger or smaller chunks.
	*/
	computeOffsets: function ( indexBufferSize ) {

		var size = indexBufferSize;
		if ( indexBufferSize === undefined )
			size = 65535; //WebGL limits type of index buffer values to 16-bit.

		var s = Date.now();

		var indices = this.attributes.index.array;
		var vertices = this.attributes.position.array;

		var verticesCount = ( vertices.length / 3 );
		var facesCount = ( indices.length / 3 );

		/*
		console.log("Computing buffers in offsets of "+size+" -> indices:"+indices.length+" vertices:"+vertices.length);
		console.log("Faces to process: "+(indices.length/3));
		console.log("Reordering "+verticesCount+" vertices.");
		*/

		var sortedIndices = new Uint16Array( indices.length ); //16-bit buffers
		var indexPtr = 0;
		var vertexPtr = 0;

		var offsets = [ { start:0, count:0, index:0 } ];
		var offset = offsets[ 0 ];

		var duplicatedVertices = 0;
		var newVerticeMaps = 0;
		var faceVertices = new Int32Array( 6 );
		var vertexMap = new Int32Array( vertices.length );
		var revVertexMap = new Int32Array( vertices.length );
		for ( var j = 0; j < vertices.length; j ++ ) { vertexMap[ j ] = - 1; revVertexMap[ j ] = - 1; }

		/*
			Traverse every face and reorder vertices in the proper offsets of 65k.
			We can have more than 65k entries in the index buffer per offset, but only reference 65k values.
		*/
		for ( var findex = 0; findex < facesCount; findex ++ ) {
			newVerticeMaps = 0;

			for ( var vo = 0; vo < 3; vo ++ ) {
				var vid = indices[ findex * 3 + vo ];
				if ( vertexMap[ vid ] == - 1 ) {
					//Unmapped vertice
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					newVerticeMaps ++;
				} else if ( vertexMap[ vid ] < offset.index ) {
					//Reused vertices from previous block (duplicate)
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = - 1;
					duplicatedVertices ++;
				} else {
					//Reused vertice in the current block
					faceVertices[ vo * 2 ] = vid;
					faceVertices[ vo * 2 + 1 ] = vertexMap[ vid ];
				}
			}

			var faceMax = vertexPtr + newVerticeMaps;
			if ( faceMax > ( offset.index + size ) ) {
				var new_offset = { start:indexPtr, count:0, index:vertexPtr };
				offsets.push( new_offset );
				offset = new_offset;

				//Re-evaluate reused vertices in light of new offset.
				for ( var v = 0; v < 6; v += 2 ) {
					var new_vid = faceVertices[ v + 1 ];
					if ( new_vid > - 1 && new_vid < offset.index )
						faceVertices[ v + 1 ] = - 1;
				}
			}

			//Reindex the face.
			for ( var v = 0; v < 6; v += 2 ) {
				var vid = faceVertices[ v ];
				var new_vid = faceVertices[ v + 1 ];

				if ( new_vid === - 1 )
					new_vid = vertexPtr ++;

				vertexMap[ vid ] = new_vid;
				revVertexMap[ new_vid ] = vid;
				sortedIndices[ indexPtr ++ ] = new_vid - offset.index; //XXX overflows at 16bit
				offset.count ++;
			}
		}

		/* Move all attribute values to map to the new computed indices , also expand the vertice stack to match our new vertexPtr. */
		this.reorderBuffers( sortedIndices, revVertexMap, vertexPtr );
		this.offsets = offsets;

		/*
		var orderTime = Date.now();
		console.log("Reorder time: "+(orderTime-s)+"ms");
		console.log("Duplicated "+duplicatedVertices+" vertices.");
		console.log("Compute Buffers time: "+(Date.now()-s)+"ms");
		console.log("Draw offsets: "+offsets.length);
		*/

		return offsets;
	},

	merge: function () {

		console.log( 'BufferGeometry.merge(): TODO' );

	},

	normalizeNormals: function () {

		var normals = this.attributes.normal.array;

		var x, y, z, n;

		for ( var i = 0, il = normals.length; i < il; i += 3 ) {

			x = normals[ i ];
			y = normals[ i + 1 ];
			z = normals[ i + 2 ];

			n = 1.0 / Math.sqrt( x * x + y * y + z * z );

			normals[ i     ] *= n;
			normals[ i + 1 ] *= n;
			normals[ i + 2 ] *= n;

		}

	},

	/*
		reoderBuffers:
		Reorder attributes based on a new indexBuffer and indexMap.
		indexBuffer - Uint16Array of the new ordered indices.
		indexMap - Int32Array where the position is the new vertex ID and the value the old vertex ID for each vertex.
		vertexCount - Amount of total vertices considered in this reordering (in case you want to grow the vertice stack).
	*/
	reorderBuffers: function ( indexBuffer, indexMap, vertexCount ) {

		/* Create a copy of all attributes for reordering. */
		var sortedAttributes = {};
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			var sourceArray = this.attributes[ attr ].array;
			sortedAttributes[ attr ] = new sourceArray.constructor( this.attributes[ attr ].itemSize * vertexCount );
		}

		/* Move attribute positions based on the new index map */
		for ( var new_vid = 0; new_vid < vertexCount; new_vid ++ ) {
			var vid = indexMap[ new_vid ];
			for ( var attr in this.attributes ) {
				if ( attr == 'index' )
					continue;
				var attrArray = this.attributes[ attr ].array;
				var attrSize = this.attributes[ attr ].itemSize;
				var sortedAttr = sortedAttributes[ attr ];
				for ( var k = 0; k < attrSize; k ++ )
					sortedAttr[ new_vid * attrSize + k ] = attrArray[ vid * attrSize + k ];
			}
		}

		/* Carry the new sorted buffers locally */
		this.attributes[ 'index' ].array = indexBuffer;
		for ( var attr in this.attributes ) {
			if ( attr == 'index' )
				continue;
			this.attributes[ attr ].array = sortedAttributes[ attr ];
			this.attributes[ attr ].numItems = this.attributes[ attr ].itemSize * vertexCount;
		}
	},

	toJSON: function () {

		var output = {
			metadata: {
				version: 4.0,
				type: 'BufferGeometry',
				generator: 'BufferGeometryExporter'
			},
			uuid: this.uuid,
			type: this.type,
			data: {
				attributes: {}
			}
		};

		var attributes = this.attributes;
		var offsets = this.offsets;
		var boundingSphere = this.boundingSphere;

		for ( var key in attributes ) {

			var attribute = attributes[ key ];

			var array = [], typeArray = attribute.array;

			for ( var i = 0, l = typeArray.length; i < l; i ++ ) {

				array[ i ] = typeArray[ i ];

			}

			output.data.attributes[ key ] = {
				itemSize: attribute.itemSize,
				type: attribute.array.constructor.name,
				array: array
			}

		}

		if ( offsets.length > 0 ) {

			output.data.offsets = JSON.parse( JSON.stringify( offsets ) );

		}

		if ( boundingSphere !== null ) {

			output.data.boundingSphere = {
				center: boundingSphere.center.toArray(),
				radius: boundingSphere.radius
			}

		}

		return output;

	},

	clone: function () {

		var geometry = new THREE.BufferGeometry();

		for ( var attr in this.attributes ) {

			var sourceAttr = this.attributes[ attr ];
			geometry.addAttribute( attr, sourceAttr.clone() );

		}

		for ( var i = 0, il = this.offsets.length; i < il; i ++ ) {

			var offset = this.offsets[ i ];

			geometry.offsets.push( {

				start: offset.start,
				index: offset.index,
				count: offset.count

			} );

		}

		return geometry;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.BufferGeometry.prototype );

// File:src/core/Geometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://exocortex.com
 */

THREE.Geometry = function () {

	Object.defineProperty( this, 'id', { value: THREE.GeometryIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';
	this.type = 'Geometry';

	this.vertices = [];
	this.colors = [];  // one-to-one vertex colors, used in Points and Line

	this.faces = [];

	this.faceVertexUvs = [ [] ];

	this.morphTargets = [];
	this.morphColors = [];
	this.morphNormals = [];

	this.skinWeights = [];
	this.skinIndices = [];

	this.lineDistances = [];

	this.boundingBox = null;
	this.boundingSphere = null;

	this.hasTangents = false;

	this.dynamic = true; // the intermediate typed arrays will be deleted when set to false

	// update flags

	this.verticesNeedUpdate = false;
	this.elementsNeedUpdate = false;
	this.uvsNeedUpdate = false;
	this.normalsNeedUpdate = false;
	this.tangentsNeedUpdate = false;
	this.colorsNeedUpdate = false;
	this.lineDistancesNeedUpdate = false;

	this.groupsNeedUpdate = false;

};

THREE.Geometry.prototype = {

	constructor: THREE.Geometry,

	applyMatrix: function ( matrix ) {

		var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

			var vertex = this.vertices[ i ];
			vertex.applyMatrix4( matrix );

		}

		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

			var face = this.faces[ i ];
			face.normal.applyMatrix3( normalMatrix ).normalize();

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

			}

		}

		if ( this.boundingBox instanceof THREE.Box3 ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere instanceof THREE.Sphere ) {

			this.computeBoundingSphere();

		}

	},

	fromBufferGeometry: function ( geometry ) {

		var scope = this;

		var attributes = geometry.attributes;

		var vertices = attributes.position.array;
		var indices = attributes.index !== undefined ? attributes.index.array : undefined;
		var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
		var colors = attributes.color !== undefined ? attributes.color.array : undefined;
		var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;

		var tempNormals = [];
		var tempUVs = [];

		for ( var i = 0, j = 0; i < vertices.length; i += 3, j += 2 ) {

			scope.vertices.push( new THREE.Vector3( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] ) );

			if ( normals !== undefined ) {

				tempNormals.push( new THREE.Vector3( normals[ i ], normals[ i + 1 ], normals[ i + 2 ] ) );

			}

			if ( colors !== undefined ) {

				scope.colors.push( new THREE.Color( colors[ i ], colors[ i + 1 ], colors[ i + 2 ] ) );

			}

			if ( uvs !== undefined ) {

				tempUVs.push( new THREE.Vector2( uvs[ j ], uvs[ j + 1 ] ) );

			}

		}

		var addFace = function ( a, b, c ) {

			var vertexNormals = normals !== undefined ? [ tempNormals[ a ].clone(), tempNormals[ b ].clone(), tempNormals[ c ].clone() ] : [];
			var vertexColors = colors !== undefined ? [ scope.colors[ a ].clone(), scope.colors[ b ].clone(), scope.colors[ c ].clone() ] : [];

			scope.faces.push( new THREE.Face3( a, b, c, vertexNormals, vertexColors ) );
			scope.faceVertexUvs[ 0 ].push( [ tempUVs[ a ], tempUVs[ b ], tempUVs[ c ] ] );

		};

		if ( indices !== undefined ) {

			for ( var i = 0; i < indices.length; i += 3 ) {

				addFace( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

			}

		} else {

			for ( var i = 0; i < vertices.length / 3; i += 3 ) {

				addFace( i, i + 1, i + 2 );

			}

		}
		
		this.computeFaceNormals();

		if ( geometry.boundingBox !== null ) {

			this.boundingBox = geometry.boundingBox.clone();

		}

		if ( geometry.boundingSphere !== null ) {

			this.boundingSphere = geometry.boundingSphere.clone();

		}

		return this;

	},

	center: function () {

		this.computeBoundingBox();

		var offset = new THREE.Vector3();

		offset.addVectors( this.boundingBox.min, this.boundingBox.max );
		offset.multiplyScalar( - 0.5 );

		this.applyMatrix( new THREE.Matrix4().makeTranslation( offset.x, offset.y, offset.z ) );
		this.computeBoundingBox();

		return offset;

	},

	computeFaceNormals: function () {

		var cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

			var face = this.faces[ f ];

			var vA = this.vertices[ face.a ];
			var vB = this.vertices[ face.b ];
			var vC = this.vertices[ face.c ];

			cb.subVectors( vC, vB );
			ab.subVectors( vA, vB );
			cb.cross( ab );

			cb.normalize();

			face.normal.copy( cb );

		}

	},

	computeVertexNormals: function ( areaWeighted ) {

		var v, vl, f, fl, face, vertices;

		vertices = new Array( this.vertices.length );

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ] = new THREE.Vector3();

		}

		if ( areaWeighted ) {

			// vertex normals weighted by triangle areas
			// http://www.iquilezles.org/www/articles/normals/normals.htm

			var vA, vB, vC, vD;
			var cb = new THREE.Vector3(), ab = new THREE.Vector3(),
				db = new THREE.Vector3(), dc = new THREE.Vector3(), bc = new THREE.Vector3();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vA = this.vertices[ face.a ];
				vB = this.vertices[ face.b ];
				vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				vertices[ face.a ].add( cb );
				vertices[ face.b ].add( cb );
				vertices[ face.c ].add( cb );

			}

		} else {

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vertices[ face.a ].add( face.normal );
				vertices[ face.b ].add( face.normal );
				vertices[ face.c ].add( face.normal );

			}

		}

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.vertexNormals[ 0 ] = vertices[ face.a ].clone();
			face.vertexNormals[ 1 ] = vertices[ face.b ].clone();
			face.vertexNormals[ 2 ] = vertices[ face.c ].clone();

		}

	},

	computeMorphNormals: function () {

		var i, il, f, fl, face;

		// save original normals
		// - create temp variables on first access
		//   otherwise just copy (for faster repeated calls)

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph

		var tmpGeo = new THREE.Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					faceNormal = new THREE.Vector3();
					vertexNormals = { a: new THREE.Vector3(), b: new THREE.Vector3(), c: new THREE.Vector3() };

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals

			var faceNormal, vertexNormals;

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );

			}

		}

		// restore original normals

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},

	computeTangents: function () {

		// based on http://www.terathon.com/code/tangent.html
		// tangents go to vertices

		var f, fl, v, vl, i, il, vertexIndex,
			face, uv, vA, vB, vC, uvA, uvB, uvC,
			x1, x2, y1, y2, z1, z2,
			s1, s2, t1, t2, r, t, test,
			tan1 = [], tan2 = [],
			sdir = new THREE.Vector3(), tdir = new THREE.Vector3(),
			tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(),
			n = new THREE.Vector3(), w;

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			tan1[ v ] = new THREE.Vector3();
			tan2[ v ] = new THREE.Vector3();

		}

		function handleTriangle( context, a, b, c, ua, ub, uc ) {

			vA = context.vertices[ a ];
			vB = context.vertices[ b ];
			vC = context.vertices[ c ];

			uvA = uv[ ua ];
			uvB = uv[ ub ];
			uvC = uv[ uc ];

			x1 = vB.x - vA.x;
			x2 = vC.x - vA.x;
			y1 = vB.y - vA.y;
			y2 = vC.y - vA.y;
			z1 = vB.z - vA.z;
			z2 = vC.z - vA.z;

			s1 = uvB.x - uvA.x;
			s2 = uvC.x - uvA.x;
			t1 = uvB.y - uvA.y;
			t2 = uvC.y - uvA.y;

			r = 1.0 / ( s1 * t2 - s2 * t1 );
			sdir.set( ( t2 * x1 - t1 * x2 ) * r,
					  ( t2 * y1 - t1 * y2 ) * r,
					  ( t2 * z1 - t1 * z2 ) * r );
			tdir.set( ( s1 * x2 - s2 * x1 ) * r,
					  ( s1 * y2 - s2 * y1 ) * r,
					  ( s1 * z2 - s2 * z1 ) * r );

			tan1[ a ].add( sdir );
			tan1[ b ].add( sdir );
			tan1[ c ].add( sdir );

			tan2[ a ].add( tdir );
			tan2[ b ].add( tdir );
			tan2[ c ].add( tdir );

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];
			uv = this.faceVertexUvs[ 0 ][ f ]; // use UV layer 0 for tangents

			handleTriangle( this, face.a, face.b, face.c, 0, 1, 2 );

		}

		var faceIndex = [ 'a', 'b', 'c', 'd' ];

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			for ( i = 0; i < Math.min( face.vertexNormals.length, 3 ); i ++ ) {

				n.copy( face.vertexNormals[ i ] );

				vertexIndex = face[ faceIndex[ i ] ];

				t = tan1[ vertexIndex ];

				// Gram-Schmidt orthogonalize

				tmp.copy( t );
				tmp.sub( n.multiplyScalar( n.dot( t ) ) ).normalize();

				// Calculate handedness

				tmp2.crossVectors( face.vertexNormals[ i ], t );
				test = tmp2.dot( tan2[ vertexIndex ] );
				w = ( test < 0.0 ) ? - 1.0 : 1.0;

				face.vertexTangents[ i ] = new THREE.Vector4( tmp.x, tmp.y, tmp.z, w );

			}

		}

		this.hasTangents = true;

	},

	computeLineDistances: function () {

		var d = 0;
		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			if ( i > 0 ) {

				d += vertices[ i ].distanceTo( vertices[ i - 1 ] );

			}

			this.lineDistances[ i ] = d;

		}

	},

	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new THREE.Box3();

		}

		this.boundingBox.setFromPoints( this.vertices );

	},

	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new THREE.Sphere();

		}

		this.boundingSphere.setFromPoints( this.vertices );

	},

	merge: function ( geometry, matrix, materialIndexOffset ) {

		if ( geometry instanceof THREE.Geometry === false ) {

			console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
			return;

		}

		var normalMatrix,
		vertexOffset = this.vertices.length,
		vertices1 = this.vertices,
		vertices2 = geometry.vertices,
		faces1 = this.faces,
		faces2 = geometry.faces,
		uvs1 = this.faceVertexUvs[ 0 ],
		uvs2 = geometry.faceVertexUvs[ 0 ];

		if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

		if ( matrix !== undefined ) {

			normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

		}

		// vertices

		for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

			var vertex = vertices2[ i ];

			var vertexCopy = vertex.clone();

			if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

			vertices1.push( vertexCopy );

		}

		// faces

		for ( i = 0, il = faces2.length; i < il; i ++ ) {

			var face = faces2[ i ], faceCopy, normal, color,
			faceVertexNormals = face.vertexNormals,
			faceVertexColors = face.vertexColors;

			faceCopy = new THREE.Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
			faceCopy.normal.copy( face.normal );

			if ( normalMatrix !== undefined ) {

				faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

			}

			for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

				normal = faceVertexNormals[ j ].clone();

				if ( normalMatrix !== undefined ) {

					normal.applyMatrix3( normalMatrix ).normalize();

				}

				faceCopy.vertexNormals.push( normal );

			}

			faceCopy.color.copy( face.color );

			for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

				color = faceVertexColors[ j ];
				faceCopy.vertexColors.push( color.clone() );

			}

			faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

			faces1.push( faceCopy );

		}

		// uvs

		for ( i = 0, il = uvs2.length; i < il; i ++ ) {

			var uv = uvs2[ i ], uvCopy = [];

			if ( uv === undefined ) {

				continue;

			}

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			uvs1.push( uvCopy );

		}

	},

	/*
	 * Checks for duplicate vertices with hashmap.
	 * Duplicated vertices are removed
	 * and faces' vertices are updated.
	 */

	mergeVertices: function () {

		var verticesMap = {}; // Hashmap for looking up vertice by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		var precisionPoints = 4; // number of decimal points, eg. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints );
		var i,il, face;
		var indices, k, j, jl, u;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ];
			key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

			if ( verticesMap[ key ] === undefined ) {

				verticesMap[ key ] = i;
				unique.push( this.vertices[ i ] );
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		};


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.
		var faceIndicesToRemove = [];

		for ( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			face.a = changes[ face.a ];
			face.b = changes[ face.b ];
			face.c = changes[ face.c ];

			indices = [ face.a, face.b, face.c ];

			var dupIndex = - 1;

			// if any duplicate vertices are found in a Face3
			// we have to remove the face as nothing can be saved
			for ( var n = 0; n < 3; n ++ ) {
				if ( indices[ n ] == indices[ ( n + 1 ) % 3 ] ) {

					dupIndex = n;
					faceIndicesToRemove.push( i );
					break;

				}
			}

		}

		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {
			var idx = faceIndicesToRemove[ i ];

			this.faces.splice( idx, 1 );

			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

				this.faceVertexUvs[ j ].splice( idx, 1 );

			}

		}

		// Use unique set of vertices

		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;

	},

	toJSON: function () {

		var output = {
			metadata: {
				version: 4.0,
				type: 'BufferGeometry',
				generator: 'BufferGeometryExporter'
			},
			uuid: this.uuid,
			type: this.type
		};

		if ( this.name !== "" ) output.name = this.name;

		if ( this.parameters !== undefined ) {

			var parameters = this.parameters;

			for ( var key in parameters ) {

				if ( parameters[ key ] !== undefined ) output[ key ] = parameters[ key ];

			}

			return output;

		}

		var vertices = [];

		for ( var i = 0; i < this.vertices.length; i ++ ) {

			var vertex = this.vertices[ i ];
			vertices.push( vertex.x, vertex.y, vertex.z );

		}

		var faces = [];
		var normals = [];
		var normalsHash = {};
		var colors = [];
		var colorsHash = {};
		var uvs = [];
		var uvsHash = {};

		for ( var i = 0; i < this.faces.length; i ++ ) {

			var face = this.faces[ i ];

			var hasMaterial = false; // face.materialIndex !== undefined;
			var hasFaceUv = false; // deprecated
			var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i ] !== undefined;
			var hasFaceNormal = face.normal.length() > 0;
			var hasFaceVertexNormal = face.vertexNormals.length > 0;
			var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
			var hasFaceVertexColor = face.vertexColors.length > 0;

			var faceType = 0;

			faceType = setBit( faceType, 0, 0 );
			faceType = setBit( faceType, 1, hasMaterial );
			faceType = setBit( faceType, 2, hasFaceUv );
			faceType = setBit( faceType, 3, hasFaceVertexUv );
			faceType = setBit( faceType, 4, hasFaceNormal );
			faceType = setBit( faceType, 5, hasFaceVertexNormal );
			faceType = setBit( faceType, 6, hasFaceColor );
			faceType = setBit( faceType, 7, hasFaceVertexColor );

			faces.push( faceType );
			faces.push( face.a, face.b, face.c );


			/*
			if ( hasMaterial ) {

				faces.push( face.materialIndex );

			}
			*/

			if ( hasFaceVertexUv ) {

				var faceVertexUvs = this.faceVertexUvs[ 0 ][ i ];

				faces.push(
					getUvIndex( faceVertexUvs[ 0 ] ),
					getUvIndex( faceVertexUvs[ 1 ] ),
					getUvIndex( faceVertexUvs[ 2 ] )
				);

			}

			if ( hasFaceNormal ) {

				faces.push( getNormalIndex( face.normal ) );

			}

			if ( hasFaceVertexNormal ) {

				var vertexNormals = face.vertexNormals;

				faces.push(
					getNormalIndex( vertexNormals[ 0 ] ),
					getNormalIndex( vertexNormals[ 1 ] ),
					getNormalIndex( vertexNormals[ 2 ] )
				);

			}

			if ( hasFaceColor ) {

				faces.push( getColorIndex( face.color ) );

			}

			if ( hasFaceVertexColor ) {

				var vertexColors = face.vertexColors;

				faces.push(
					getColorIndex( vertexColors[ 0 ] ),
					getColorIndex( vertexColors[ 1 ] ),
					getColorIndex( vertexColors[ 2 ] )
				);

			}

		}

		function setBit( value, position, enabled ) {

			return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position) );

		}

		function getNormalIndex( normal ) {

			var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

			if ( normalsHash[ hash ] !== undefined ) {

				return normalsHash[ hash ];

			}

			normalsHash[ hash ] = normals.length / 3;
			normals.push( normal.x, normal.y, normal.z );

			return normalsHash[ hash ];

		}

		function getColorIndex( color ) {

			var hash = color.r.toString() + color.g.toString() + color.b.toString();

			if ( colorsHash[ hash ] !== undefined ) {

				return colorsHash[ hash ];

			}

			colorsHash[ hash ] = colors.length;
			colors.push( color.getHex() );

			return colorsHash[ hash ];

		}

		function getUvIndex( uv ) {

			var hash = uv.x.toString() + uv.y.toString();

			if ( uvsHash[ hash ] !== undefined ) {

				return uvsHash[ hash ];

			}

			uvsHash[ hash ] = uvs.length / 2;
			uvs.push( uv.x, uv.y );

			return uvsHash[ hash ];

		}

		output.data = {};

		output.data.vertices = vertices;
		output.data.normals = normals;
		if ( colors.length > 0 ) output.data.colors = colors;
		if ( uvs.length > 0 ) output.data.uvs = [ uvs ]; // temporal backward compatibility
		output.data.faces = faces;

		//

		return output;

	},

	clone: function () {

		var geometry = new THREE.Geometry();

		var vertices = this.vertices;

		for ( var i = 0, il = vertices.length; i < il; i ++ ) {

			geometry.vertices.push( vertices[ i ].clone() );

		}

		var faces = this.faces;

		for ( var i = 0, il = faces.length; i < il; i ++ ) {

			geometry.faces.push( faces[ i ].clone() );

		}

		var uvs = this.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvs.length; i < il; i ++ ) {

			var uv = uvs[ i ], uvCopy = [];

			for ( var j = 0, jl = uv.length; j < jl; j ++ ) {

				uvCopy.push( new THREE.Vector2( uv[ j ].x, uv[ j ].y ) );

			}

			geometry.faceVertexUvs[ 0 ].push( uvCopy );

		}

		return geometry;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Geometry.prototype );

THREE.GeometryIdCount = 0;

// File:src/cameras/Camera.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.Camera = function () {

	THREE.Object3D.call( this );

	this.type = 'Camera';

	this.matrixWorldInverse = new THREE.Matrix4();
	this.projectionMatrix = new THREE.Matrix4();

};

THREE.Camera.prototype = Object.create( THREE.Object3D.prototype );

THREE.Camera.prototype.getWorldDirection = function () {

	var quaternion = new THREE.Quaternion();

	return function ( optionalTarget ) {

		var result = optionalTarget || new THREE.Vector3();

		this.getWorldQuaternion( quaternion );

		return result.set( 0, 0, - 1 ).applyQuaternion( quaternion );

	}

}();

THREE.Camera.prototype.lookAt = function () {

	// This routine does not support cameras with rotated and/or translated parent(s)

	var m1 = new THREE.Matrix4();

	return function ( vector ) {

		m1.lookAt( this.position, vector, this.up );

		this.quaternion.setFromRotationMatrix( m1 );

	};

}();

THREE.Camera.prototype.clone = function ( camera ) {

	if ( camera === undefined ) camera = new THREE.Camera();

	THREE.Object3D.prototype.clone.call( this, camera );

	camera.matrixWorldInverse.copy( this.matrixWorldInverse );
	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;
};

// File:src/cameras/CubeCamera.js

/**
 * Camera for rendering cube maps
 *	- renders scene into axis-aligned cube
 *
 * @author alteredq / http://alteredqualia.com/
 */

THREE.CubeCamera = function ( near, far, cubeResolution ) {

	THREE.Object3D.call( this );

	this.type = 'CubeCamera';

	var fov = 90, aspect = 1;

	var cameraPX = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPX.up.set( 0, - 1, 0 );
	cameraPX.lookAt( new THREE.Vector3( 1, 0, 0 ) );
	this.add( cameraPX );

	var cameraNX = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNX.up.set( 0, - 1, 0 );
	cameraNX.lookAt( new THREE.Vector3( - 1, 0, 0 ) );
	this.add( cameraNX );

	var cameraPY = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPY.up.set( 0, 0, 1 );
	cameraPY.lookAt( new THREE.Vector3( 0, 1, 0 ) );
	this.add( cameraPY );

	var cameraNY = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNY.up.set( 0, 0, - 1 );
	cameraNY.lookAt( new THREE.Vector3( 0, - 1, 0 ) );
	this.add( cameraNY );

	var cameraPZ = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraPZ.up.set( 0, - 1, 0 );
	cameraPZ.lookAt( new THREE.Vector3( 0, 0, 1 ) );
	this.add( cameraPZ );

	var cameraNZ = new THREE.PerspectiveCamera( fov, aspect, near, far );
	cameraNZ.up.set( 0, - 1, 0 );
	cameraNZ.lookAt( new THREE.Vector3( 0, 0, - 1 ) );
	this.add( cameraNZ );

	this.renderTarget = new THREE.WebGLRenderTargetCube( cubeResolution, cubeResolution, { format: THREE.RGBFormat, magFilter: THREE.LinearFilter, minFilter: THREE.LinearFilter } );

	this.updateCubeMap = function ( renderer, scene ) {

		var renderTarget = this.renderTarget;
		var generateMipmaps = renderTarget.generateMipmaps;

		renderTarget.generateMipmaps = false;

		renderTarget.activeCubeFace = 0;
		renderer.render( scene, cameraPX, renderTarget );

		renderTarget.activeCubeFace = 1;
		renderer.render( scene, cameraNX, renderTarget );

		renderTarget.activeCubeFace = 2;
		renderer.render( scene, cameraPY, renderTarget );

		renderTarget.activeCubeFace = 3;
		renderer.render( scene, cameraNY, renderTarget );

		renderTarget.activeCubeFace = 4;
		renderer.render( scene, cameraPZ, renderTarget );

		renderTarget.generateMipmaps = generateMipmaps;

		renderTarget.activeCubeFace = 5;
		renderer.render( scene, cameraNZ, renderTarget );

	};

};

THREE.CubeCamera.prototype = Object.create( THREE.Object3D.prototype );

// File:src/cameras/OrthographicCamera.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.OrthographicCamera = function ( left, right, top, bottom, near, far ) {

	THREE.Camera.call( this );

	this.type = 'OrthographicCamera';

	this.zoom = 1;

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.near = ( near !== undefined ) ? near : 0.1;
	this.far = ( far !== undefined ) ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.OrthographicCamera.prototype = Object.create( THREE.Camera.prototype );

THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {

	var dx = ( this.right - this.left ) / ( 2 * this.zoom );
	var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
	var cx = ( this.right + this.left ) / 2;
	var cy = ( this.top + this.bottom ) / 2;

	this.projectionMatrix.makeOrthographic( cx - dx, cx + dx, cy + dy, cy - dy, this.near, this.far );

};

THREE.OrthographicCamera.prototype.clone = function () {

	var camera = new THREE.OrthographicCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.zoom = this.zoom;

	camera.left = this.left;
	camera.right = this.right;
	camera.top = this.top;
	camera.bottom = this.bottom;

	camera.near = this.near;
	camera.far = this.far;

	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;
};

// File:src/cameras/PerspectiveCamera.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author greggman / http://games.greggman.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */

THREE.PerspectiveCamera = function ( fov, aspect, near, far ) {

	THREE.Camera.call( this );

	this.type = 'PerspectiveCamera';

	this.zoom = 1;

	this.fov = fov !== undefined ? fov : 50;
	this.aspect = aspect !== undefined ? aspect : 1;
	this.near = near !== undefined ? near : 0.1;
	this.far = far !== undefined ? far : 2000;

	this.updateProjectionMatrix();

};

THREE.PerspectiveCamera.prototype = Object.create( THREE.Camera.prototype );


/**
 * Uses Focal Length (in mm) to estimate and set FOV
 * 35mm (fullframe) camera is used if frame size is not specified;
 * Formula based on http://www.bobatkins.com/photography/technical/field_of_view.html
 */

THREE.PerspectiveCamera.prototype.setLens = function ( focalLength, frameHeight ) {

	if ( frameHeight === undefined ) frameHeight = 24;

	this.fov = 2 * THREE.Math.radToDeg( Math.atan( frameHeight / ( focalLength * 2 ) ) );
	this.updateProjectionMatrix();

}


/**
 * Sets an offset in a larger frustum. This is useful for multi-window or
 * multi-monitor/multi-machine setups.
 *
 * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
 * the monitors are in grid like this
 *
 *   +---+---+---+
 *   | A | B | C |
 *   +---+---+---+
 *   | D | E | F |
 *   +---+---+---+
 *
 * then for each monitor you would call it like this
 *
 *   var w = 1920;
 *   var h = 1080;
 *   var fullWidth = w * 3;
 *   var fullHeight = h * 2;
 *
 *   --A--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
 *   --B--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
 *   --C--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
 *   --D--
 *   camera.setOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
 *   --E--
 *   camera.setOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
 *   --F--
 *   camera.setOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
 *
 *   Note there is no reason monitors have to be the same size or in a grid.
 */

THREE.PerspectiveCamera.prototype.setViewOffset = function ( fullWidth, fullHeight, x, y, width, height ) {

	this.fullWidth = fullWidth;
	this.fullHeight = fullHeight;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.updateProjectionMatrix();

};


THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {

	var fov = THREE.Math.radToDeg( 2 * Math.atan( Math.tan( THREE.Math.degToRad( this.fov ) * 0.5 ) / this.zoom ) );

	if ( this.fullWidth ) {

		var aspect = this.fullWidth / this.fullHeight;
		var top = Math.tan( THREE.Math.degToRad( fov * 0.5 ) ) * this.near;
		var bottom = - top;
		var left = aspect * bottom;
		var right = aspect * top;
		var width = Math.abs( right - left );
		var height = Math.abs( top - bottom );

		this.projectionMatrix.makeFrustum(
			left + this.x * width / this.fullWidth,
			left + ( this.x + this.width ) * width / this.fullWidth,
			top - ( this.y + this.height ) * height / this.fullHeight,
			top - this.y * height / this.fullHeight,
			this.near,
			this.far
		);

	} else {

		this.projectionMatrix.makePerspective( fov, this.aspect, this.near, this.far );

	}

};

THREE.PerspectiveCamera.prototype.clone = function () {

	var camera = new THREE.PerspectiveCamera();

	THREE.Camera.prototype.clone.call( this, camera );

	camera.zoom = this.zoom;

	camera.fov = this.fov;
	camera.aspect = this.aspect;
	camera.near = this.near;
	camera.far = this.far;

	camera.projectionMatrix.copy( this.projectionMatrix );

	return camera;

};

// File:src/lights/Light.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Light = function ( color ) {

	THREE.Object3D.call( this );

	this.type = 'Light';
	
	this.color = new THREE.Color( color );

};

THREE.Light.prototype = Object.create( THREE.Object3D.prototype );

THREE.Light.prototype.clone = function ( light ) {

	if ( light === undefined ) light = new THREE.Light();

	THREE.Object3D.prototype.clone.call( this, light );

	light.color.copy( this.color );

	return light;

};

// File:src/lights/AmbientLight.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AmbientLight = function ( color ) {

	THREE.Light.call( this, color );

	this.type = 'AmbientLight';

};

THREE.AmbientLight.prototype = Object.create( THREE.Light.prototype );

THREE.AmbientLight.prototype.clone = function () {

	var light = new THREE.AmbientLight();

	THREE.Light.prototype.clone.call( this, light );

	return light;

};

// File:src/lights/AreaLight.js

/**
 * @author MPanknin / http://www.redplant.de/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.AreaLight = function ( color, intensity ) {

	THREE.Light.call( this, color );

	this.type = 'AreaLight';

	this.normal = new THREE.Vector3( 0, - 1, 0 );
	this.right = new THREE.Vector3( 1, 0, 0 );

	this.intensity = ( intensity !== undefined ) ? intensity : 1;

	this.width = 1.0;
	this.height = 1.0;

	this.constantAttenuation = 1.5;
	this.linearAttenuation = 0.5;
	this.quadraticAttenuation = 0.1;

};

THREE.AreaLight.prototype = Object.create( THREE.Light.prototype );


// File:src/lights/DirectionalLight.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DirectionalLight = function ( color, intensity ) {

	THREE.Light.call( this, color );

	this.type = 'DirectionalLight';

	this.position.set( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;

	this.shadowCameraLeft = - 500;
	this.shadowCameraRight = 500;
	this.shadowCameraTop = 500;
	this.shadowCameraBottom = - 500;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowCascade = false;

	this.shadowCascadeOffset = new THREE.Vector3( 0, 0, - 1000 );
	this.shadowCascadeCount = 2;

	this.shadowCascadeBias = [ 0, 0, 0 ];
	this.shadowCascadeWidth = [ 512, 512, 512 ];
	this.shadowCascadeHeight = [ 512, 512, 512 ];

	this.shadowCascadeNearZ = [ - 1.000, 0.990, 0.998 ];
	this.shadowCascadeFarZ  = [  0.990, 0.998, 1.000 ];

	this.shadowCascadeArray = [];

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.DirectionalLight.prototype = Object.create( THREE.Light.prototype );

THREE.DirectionalLight.prototype.clone = function () {

	var light = new THREE.DirectionalLight();

	THREE.Light.prototype.clone.call( this, light );

	light.target = this.target.clone();

	light.intensity = this.intensity;

	light.castShadow = this.castShadow;
	light.onlyShadow = this.onlyShadow;

	//

	light.shadowCameraNear = this.shadowCameraNear;
	light.shadowCameraFar = this.shadowCameraFar;

	light.shadowCameraLeft = this.shadowCameraLeft;
	light.shadowCameraRight = this.shadowCameraRight;
	light.shadowCameraTop = this.shadowCameraTop;
	light.shadowCameraBottom = this.shadowCameraBottom;

	light.shadowCameraVisible = this.shadowCameraVisible;

	light.shadowBias = this.shadowBias;
	light.shadowDarkness = this.shadowDarkness;

	light.shadowMapWidth = this.shadowMapWidth;
	light.shadowMapHeight = this.shadowMapHeight;

	//

	light.shadowCascade = this.shadowCascade;

	light.shadowCascadeOffset.copy( this.shadowCascadeOffset );
	light.shadowCascadeCount = this.shadowCascadeCount;

	light.shadowCascadeBias = this.shadowCascadeBias.slice( 0 );
	light.shadowCascadeWidth = this.shadowCascadeWidth.slice( 0 );
	light.shadowCascadeHeight = this.shadowCascadeHeight.slice( 0 );

	light.shadowCascadeNearZ = this.shadowCascadeNearZ.slice( 0 );
	light.shadowCascadeFarZ  = this.shadowCascadeFarZ.slice( 0 );

	return light;

};

// File:src/lights/HemisphereLight.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.HemisphereLight = function ( skyColor, groundColor, intensity ) {

	THREE.Light.call( this, skyColor );

	this.type = 'HemisphereLight';

	this.position.set( 0, 100, 0 );

	this.groundColor = new THREE.Color( groundColor );
	this.intensity = ( intensity !== undefined ) ? intensity : 1;

};

THREE.HemisphereLight.prototype = Object.create( THREE.Light.prototype );

THREE.HemisphereLight.prototype.clone = function () {

	var light = new THREE.HemisphereLight();

	THREE.Light.prototype.clone.call( this, light );

	light.groundColor.copy( this.groundColor );
	light.intensity = this.intensity;

	return light;

};

// File:src/lights/PointLight.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointLight = function ( color, intensity, distance ) {

	THREE.Light.call( this, color );

	this.type = 'PointLight';

	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;

};

THREE.PointLight.prototype = Object.create( THREE.Light.prototype );

THREE.PointLight.prototype.clone = function () {

	var light = new THREE.PointLight();

	THREE.Light.prototype.clone.call( this, light );

	light.intensity = this.intensity;
	light.distance = this.distance;

	return light;

};

// File:src/lights/SpotLight.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpotLight = function ( color, intensity, distance, angle, exponent ) {

	THREE.Light.call( this, color );

	this.type = 'SpotLight';

	this.position.set( 0, 1, 0 );
	this.target = new THREE.Object3D();

	this.intensity = ( intensity !== undefined ) ? intensity : 1;
	this.distance = ( distance !== undefined ) ? distance : 0;
	this.angle = ( angle !== undefined ) ? angle : Math.PI / 3;
	this.exponent = ( exponent !== undefined ) ? exponent : 10;

	this.castShadow = false;
	this.onlyShadow = false;

	//

	this.shadowCameraNear = 50;
	this.shadowCameraFar = 5000;
	this.shadowCameraFov = 50;

	this.shadowCameraVisible = false;

	this.shadowBias = 0;
	this.shadowDarkness = 0.5;

	this.shadowMapWidth = 512;
	this.shadowMapHeight = 512;

	//

	this.shadowMap = null;
	this.shadowMapSize = null;
	this.shadowCamera = null;
	this.shadowMatrix = null;

};

THREE.SpotLight.prototype = Object.create( THREE.Light.prototype );

THREE.SpotLight.prototype.clone = function () {

	var light = new THREE.SpotLight();

	THREE.Light.prototype.clone.call( this, light );

	light.target = this.target.clone();

	light.intensity = this.intensity;
	light.distance = this.distance;
	light.angle = this.angle;
	light.exponent = this.exponent;

	light.castShadow = this.castShadow;
	light.onlyShadow = this.onlyShadow;

	//

	light.shadowCameraNear = this.shadowCameraNear;
	light.shadowCameraFar = this.shadowCameraFar;
	light.shadowCameraFov = this.shadowCameraFov;

	light.shadowCameraVisible = this.shadowCameraVisible;

	light.shadowBias = this.shadowBias;
	light.shadowDarkness = this.shadowDarkness;

	light.shadowMapWidth = this.shadowMapWidth;
	light.shadowMapHeight = this.shadowMapHeight;

	return light;

};

// File:src/loaders/Cache.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Cache = function () {

	this.files = {};

};

THREE.Cache.prototype = {

	constructor: THREE.Cache,

	add: function ( key, file ) {

		// console.log( 'THREE.Cache', 'Adding key:', key );

		this.files[ key ] = file;

	},

	get: function ( key ) {

		// console.log( 'THREE.Cache', 'Checking key:', key );

		return this.files[ key ];

	},

	remove: function ( key ) {

		delete this.files[ key ];

	},

	clear: function () {

		this.files = {}

	}

};

// File:src/loaders/Loader.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Loader = function ( showStatus ) {

	this.showStatus = showStatus;
	this.statusDomElement = showStatus ? THREE.Loader.prototype.addStatusElement() : null;

	this.imageLoader = new THREE.ImageLoader();

	this.onLoadStart = function () {};
	this.onLoadProgress = function () {};
	this.onLoadComplete = function () {};

};

THREE.Loader.prototype = {

	constructor: THREE.Loader,

	crossOrigin: undefined,

	addStatusElement: function () {

		var e = document.createElement( 'div' );

		e.style.position = 'absolute';
		e.style.right = '0px';
		e.style.top = '0px';
		e.style.fontSize = '0.8em';
		e.style.textAlign = 'left';
		e.style.background = 'rgba(0,0,0,0.25)';
		e.style.color = '#fff';
		e.style.width = '120px';
		e.style.padding = '0.5em 0.5em 0.5em 0.5em';
		e.style.zIndex = 1000;

		e.innerHTML = 'Loading ...';

		return e;

	},

	updateProgress: function ( progress ) {

		var message = 'Loaded ';

		if ( progress.total ) {

			message += ( 100 * progress.loaded / progress.total ).toFixed( 0 ) + '%';


		} else {

			message += ( progress.loaded / 1024 ).toFixed( 2 ) + ' KB';

		}

		this.statusDomElement.innerHTML = message;

	},

	extractUrlBase: function ( url ) {

		var parts = url.split( '/' );

		if ( parts.length === 1 ) return './';

		parts.pop();

		return parts.join( '/' ) + '/';

	},

	initMaterials: function ( materials, texturePath ) {

		var array = [];

		for ( var i = 0; i < materials.length; ++ i ) {

			array[ i ] = this.createMaterial( materials[ i ], texturePath );

		}

		return array;

	},

	needsTangents: function ( materials ) {

		for ( var i = 0, il = materials.length; i < il; i ++ ) {

			var m = materials[ i ];

			if ( m instanceof THREE.ShaderMaterial ) return true;

		}

		return false;

	},

	createMaterial: function ( m, texturePath ) {

		var scope = this;

		function nearest_pow2( n ) {

			var l = Math.log( n ) / Math.LN2;
			return Math.pow( 2, Math.round(  l ) );

		}

		function create_texture( where, name, sourceFile, repeat, offset, wrap, anisotropy ) {

			var fullPath = texturePath + sourceFile;

			var texture;

			var loader = THREE.Loader.Handlers.get( fullPath );

			if ( loader !== null ) {

				texture = loader.load( fullPath );

			} else {

				texture = new THREE.Texture();

				loader = scope.imageLoader;
				loader.crossOrigin = scope.crossOrigin;
				loader.load( fullPath, function ( image ) {

					if ( THREE.Math.isPowerOfTwo( image.width ) === false ||
						 THREE.Math.isPowerOfTwo( image.height ) === false ) {

						var width = nearest_pow2( image.width );
						var height = nearest_pow2( image.height );

						var canvas = document.createElement( 'canvas' );
						canvas.width = width;
						canvas.height = height;

						var context = canvas.getContext( '2d' );
						context.drawImage( image, 0, 0, width, height );

						texture.image = canvas;

					} else {

						texture.image = image;

					}

					texture.needsUpdate = true;

				} );

			}

			texture.sourceFile = sourceFile;

			if ( repeat ) {

				texture.repeat.set( repeat[ 0 ], repeat[ 1 ] );

				if ( repeat[ 0 ] !== 1 ) texture.wrapS = THREE.RepeatWrapping;
				if ( repeat[ 1 ] !== 1 ) texture.wrapT = THREE.RepeatWrapping;

			}

			if ( offset ) {

				texture.offset.set( offset[ 0 ], offset[ 1 ] );

			}

			if ( wrap ) {

				var wrapMap = {
					'repeat': THREE.RepeatWrapping,
					'mirror': THREE.MirroredRepeatWrapping
				}

				if ( wrapMap[ wrap[ 0 ] ] !== undefined ) texture.wrapS = wrapMap[ wrap[ 0 ] ];
				if ( wrapMap[ wrap[ 1 ] ] !== undefined ) texture.wrapT = wrapMap[ wrap[ 1 ] ];

			}

			if ( anisotropy ) {

				texture.anisotropy = anisotropy;

			}

			where[ name ] = texture;

		}

		function rgb2hex( rgb ) {

			return ( rgb[ 0 ] * 255 << 16 ) + ( rgb[ 1 ] * 255 << 8 ) + rgb[ 2 ] * 255;

		}

		// defaults

		var mtype = 'MeshLambertMaterial';
		var mpars = { color: 0xeeeeee, opacity: 1.0, map: null, lightMap: null, normalMap: null, bumpMap: null, wireframe: false };

		// parameters from model file

		if ( m.shading ) {

			var shading = m.shading.toLowerCase();

			if ( shading === 'phong' ) mtype = 'MeshPhongMaterial';
			else if ( shading === 'basic' ) mtype = 'MeshBasicMaterial';

		}

		if ( m.blending !== undefined && THREE[ m.blending ] !== undefined ) {

			mpars.blending = THREE[ m.blending ];

		}

		if ( m.transparent !== undefined || m.opacity < 1.0 ) {

			mpars.transparent = m.transparent;

		}

		if ( m.depthTest !== undefined ) {

			mpars.depthTest = m.depthTest;

		}

		if ( m.depthWrite !== undefined ) {

			mpars.depthWrite = m.depthWrite;

		}

		if ( m.visible !== undefined ) {

			mpars.visible = m.visible;

		}

		if ( m.flipSided !== undefined ) {

			mpars.side = THREE.BackSide;

		}

		if ( m.doubleSided !== undefined ) {

			mpars.side = THREE.DoubleSide;

		}

		if ( m.wireframe !== undefined ) {

			mpars.wireframe = m.wireframe;

		}

		if ( m.vertexColors !== undefined ) {

			if ( m.vertexColors === 'face' ) {

				mpars.vertexColors = THREE.FaceColors;

			} else if ( m.vertexColors ) {

				mpars.vertexColors = THREE.VertexColors;

			}

		}

		// colors

		if ( m.colorDiffuse ) {

			mpars.color = rgb2hex( m.colorDiffuse );

		} else if ( m.DbgColor ) {

			mpars.color = m.DbgColor;

		}

		if ( m.colorSpecular ) {

			mpars.specular = rgb2hex( m.colorSpecular );

		}

		if ( m.colorAmbient ) {

			mpars.ambient = rgb2hex( m.colorAmbient );

		}

		if ( m.colorEmissive ) {

			mpars.emissive = rgb2hex( m.colorEmissive );

		}

		// modifiers

		if ( m.transparency ) {

			mpars.opacity = m.transparency;

		}

		if ( m.specularCoef ) {

			mpars.shininess = m.specularCoef;

		}

		// textures

		if ( m.mapDiffuse && texturePath ) {

			create_texture( mpars, 'map', m.mapDiffuse, m.mapDiffuseRepeat, m.mapDiffuseOffset, m.mapDiffuseWrap, m.mapDiffuseAnisotropy );

		}

		if ( m.mapLight && texturePath ) {

			create_texture( mpars, 'lightMap', m.mapLight, m.mapLightRepeat, m.mapLightOffset, m.mapLightWrap, m.mapLightAnisotropy );

		}

		if ( m.mapBump && texturePath ) {

			create_texture( mpars, 'bumpMap', m.mapBump, m.mapBumpRepeat, m.mapBumpOffset, m.mapBumpWrap, m.mapBumpAnisotropy );

		}

		if ( m.mapNormal && texturePath ) {

			create_texture( mpars, 'normalMap', m.mapNormal, m.mapNormalRepeat, m.mapNormalOffset, m.mapNormalWrap, m.mapNormalAnisotropy );

		}

		if ( m.mapSpecular && texturePath ) {

			create_texture( mpars, 'specularMap', m.mapSpecular, m.mapSpecularRepeat, m.mapSpecularOffset, m.mapSpecularWrap, m.mapSpecularAnisotropy );

		}

		if ( m.mapAlpha && texturePath ) {

			create_texture( mpars, 'alphaMap', m.mapAlpha, m.mapAlphaRepeat, m.mapAlphaOffset, m.mapAlphaWrap, m.mapAlphaAnisotropy );

		}

		//

		if ( m.mapBumpScale ) {

			mpars.bumpScale = m.mapBumpScale;

		}

		// special case for normal mapped material

		if ( m.mapNormal ) {

			var shader = THREE.ShaderLib[ 'normalmap' ];
			var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

			uniforms[ 'tNormal' ].value = mpars.normalMap;

			if ( m.mapNormalFactor ) {

				uniforms[ 'uNormalScale' ].value.set( m.mapNormalFactor, m.mapNormalFactor );

			}

			if ( mpars.map ) {

				uniforms[ 'tDiffuse' ].value = mpars.map;
				uniforms[ 'enableDiffuse' ].value = true;

			}

			if ( mpars.specularMap ) {

				uniforms[ 'tSpecular' ].value = mpars.specularMap;
				uniforms[ 'enableSpecular' ].value = true;

			}

			if ( mpars.lightMap ) {

				uniforms[ 'tAO' ].value = mpars.lightMap;
				uniforms[ 'enableAO' ].value = true;

			}

			// for the moment don't handle displacement texture

			uniforms[ 'diffuse' ].value.setHex( mpars.color );
			uniforms[ 'specular' ].value.setHex( mpars.specular );
			uniforms[ 'ambient' ].value.setHex( mpars.ambient );

			uniforms[ 'shininess' ].value = mpars.shininess;

			if ( mpars.opacity !== undefined ) {

				uniforms[ 'opacity' ].value = mpars.opacity;

			}

			var parameters = { fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms, lights: true, fog: true };
			var material = new THREE.ShaderMaterial( parameters );

			if ( mpars.transparent ) {

				material.transparent = true;

			}

		} else {

			var material = new THREE[ mtype ]( mpars );

		}

		if ( m.DbgName !== undefined ) material.name = m.DbgName;

		return material;

	}

};

THREE.Loader.Handlers = {

	handlers: [],

	add: function ( regex, loader ) {

		this.handlers.push( regex, loader );

	},

	get: function ( file ) {

		for ( var i = 0, l = this.handlers.length; i < l; i += 2 ) {

			var regex = this.handlers[ i ];
			var loader  = this.handlers[ i + 1 ];

			if ( regex.test( file ) ) {

				return loader;

			}

		}

		return null;

	}

};

// File:src/loaders/XHRLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.XHRLoader = function ( manager ) {

	this.cache = new THREE.Cache();
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.XHRLoader.prototype = {

	constructor: THREE.XHRLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var cached = scope.cache.get( url );

		if ( cached !== undefined ) {

			if ( onLoad ) onLoad( cached );
			return;

		}

		var request = new XMLHttpRequest();
		request.open( 'GET', url, true );

		request.addEventListener( 'load', function ( event ) {

			scope.cache.add( url, this.response );

			if ( onLoad ) onLoad( this.response );

			scope.manager.itemEnd( url );

		}, false );

		if ( onProgress !== undefined ) {

			request.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			request.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) request.crossOrigin = this.crossOrigin;
		if ( this.responseType !== undefined ) request.responseType = this.responseType;

		request.send( null );

		scope.manager.itemStart( url );

	},

	setResponseType: function ( value ) {

		this.responseType = value;

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

};

// File:src/loaders/ImageLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ImageLoader = function ( manager ) {

	this.cache = new THREE.Cache();
	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.ImageLoader.prototype = {

	constructor: THREE.ImageLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var cached = scope.cache.get( url );

		if ( cached !== undefined ) {

			onLoad( cached );
			return;

		}

		var image = document.createElement( 'img' );

		if ( onLoad !== undefined ) {

			image.addEventListener( 'load', function ( event ) {

				scope.cache.add( url, this );

				onLoad( this );
				scope.manager.itemEnd( url );

			}, false );

		}

		if ( onProgress !== undefined ) {

			image.addEventListener( 'progress', function ( event ) {

				onProgress( event );

			}, false );

		}

		if ( onError !== undefined ) {

			image.addEventListener( 'error', function ( event ) {

				onError( event );

			}, false );

		}

		if ( this.crossOrigin !== undefined ) image.crossOrigin = this.crossOrigin;

		image.src = url;

		scope.manager.itemStart( url );

		return image;

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

}

// File:src/loaders/JSONLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.JSONLoader = function ( showStatus ) {

	THREE.Loader.call( this, showStatus );

	this.withCredentials = false;

};

THREE.JSONLoader.prototype = Object.create( THREE.Loader.prototype );

THREE.JSONLoader.prototype.load = function ( url, callback, texturePath ) {

	var scope = this;

	// todo: unify load API to for easier SceneLoader use

	texturePath = texturePath && ( typeof texturePath === 'string' ) ? texturePath : this.extractUrlBase( url );

	this.onLoadStart();
	this.loadAjaxJSON( this, url, callback, texturePath );

};

THREE.JSONLoader.prototype.loadAjaxJSON = function ( context, url, callback, texturePath, callbackProgress ) {

	var xhr = new XMLHttpRequest();

	var length = 0;

	xhr.onreadystatechange = function () {

		if ( xhr.readyState === xhr.DONE ) {

			if ( xhr.status === 200 || xhr.status === 0 ) {

				if ( xhr.responseText ) {

					var json = JSON.parse( xhr.responseText );

					if ( json.metadata !== undefined && json.metadata.type === 'scene' ) {

						console.error( 'THREE.JSONLoader: "' + url + '" seems to be a Scene. Use THREE.SceneLoader instead.' );
						return;

					}

					var result = context.parse( json, texturePath );
					callback( result.geometry, result.materials );

				} else {

					console.error( 'THREE.JSONLoader: "' + url + '" seems to be unreachable or the file is empty.' );

				}

				// in context of more complex asset initialization
				// do not block on single failed file
				// maybe should go even one more level up

				context.onLoadComplete();

			} else {

				console.error( 'THREE.JSONLoader: Couldn\'t load "' + url + '" (' + xhr.status + ')' );

			}

		} else if ( xhr.readyState === xhr.LOADING ) {

			if ( callbackProgress ) {

				if ( length === 0 ) {

					length = xhr.getResponseHeader( 'Content-Length' );

				}

				callbackProgress( { total: length, loaded: xhr.responseText.length } );

			}

		} else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {

			if ( callbackProgress !== undefined ) {

				length = xhr.getResponseHeader( 'Content-Length' );

			}

		}

	};

	xhr.open( 'GET', url, true );
	xhr.withCredentials = this.withCredentials;
	xhr.send( null );

};

THREE.JSONLoader.prototype.parse = function ( json, texturePath ) {

	var scope = this,
	geometry = new THREE.Geometry(),
	scale = ( json.scale !== undefined ) ? 1.0 / json.scale : 1.0;

	parseModel( scale );

	parseSkin();
	parseMorphing( scale );

	geometry.computeFaceNormals();
	geometry.computeBoundingSphere();

	function parseModel( scale ) {

		function isBitSet( value, position ) {

			return value & ( 1 << position );

		}

		var i, j, fi,

		offset, zLength,

		colorIndex, normalIndex, uvIndex, materialIndex,

		type,
		isQuad,
		hasMaterial,
		hasFaceVertexUv,
		hasFaceNormal, hasFaceVertexNormal,
		hasFaceColor, hasFaceVertexColor,

		vertex, face, faceA, faceB, color, hex, normal,

		uvLayer, uv, u, v,

		faces = json.faces,
		vertices = json.vertices,
		normals = json.normals,
		colors = json.colors,

		nUvLayers = 0;

		if ( json.uvs !== undefined ) {

			// disregard empty arrays

			for ( i = 0; i < json.uvs.length; i ++ ) {

				if ( json.uvs[ i ].length ) nUvLayers ++;

			}

			for ( i = 0; i < nUvLayers; i ++ ) {

				geometry.faceVertexUvs[ i ] = [];

			}

		}

		offset = 0;
		zLength = vertices.length;

		while ( offset < zLength ) {

			vertex = new THREE.Vector3();

			vertex.x = vertices[ offset ++ ] * scale;
			vertex.y = vertices[ offset ++ ] * scale;
			vertex.z = vertices[ offset ++ ] * scale;

			geometry.vertices.push( vertex );

		}

		offset = 0;
		zLength = faces.length;

		while ( offset < zLength ) {

			type = faces[ offset ++ ];


			isQuad              = isBitSet( type, 0 );
			hasMaterial         = isBitSet( type, 1 );
			hasFaceVertexUv     = isBitSet( type, 3 );
			hasFaceNormal       = isBitSet( type, 4 );
			hasFaceVertexNormal = isBitSet( type, 5 );
			hasFaceColor	     = isBitSet( type, 6 );
			hasFaceVertexColor  = isBitSet( type, 7 );

			// console.log("type", type, "bits", isQuad, hasMaterial, hasFaceVertexUv, hasFaceNormal, hasFaceVertexNormal, hasFaceColor, hasFaceVertexColor);

			if ( isQuad ) {

				faceA = new THREE.Face3();
				faceA.a = faces[ offset ];
				faceA.b = faces[ offset + 1 ];
				faceA.c = faces[ offset + 3 ];

				faceB = new THREE.Face3();
				faceB.a = faces[ offset + 1 ];
				faceB.b = faces[ offset + 2 ];
				faceB.c = faces[ offset + 3 ];

				offset += 4;

				if ( hasMaterial ) {

					materialIndex = faces[ offset ++ ];
					faceA.materialIndex = materialIndex;
					faceB.materialIndex = materialIndex;

				}

				// to get face <=> uv index correspondence

				fi = geometry.faces.length;

				if ( hasFaceVertexUv ) {

					for ( i = 0; i < nUvLayers; i ++ ) {

						uvLayer = json.uvs[ i ];

						geometry.faceVertexUvs[ i ][ fi ] = [];
						geometry.faceVertexUvs[ i ][ fi + 1 ] = []

						for ( j = 0; j < 4; j ++ ) {

							uvIndex = faces[ offset ++ ];

							u = uvLayer[ uvIndex * 2 ];
							v = uvLayer[ uvIndex * 2 + 1 ];

							uv = new THREE.Vector2( u, v );

							if ( j !== 2 ) geometry.faceVertexUvs[ i ][ fi ].push( uv );
							if ( j !== 0 ) geometry.faceVertexUvs[ i ][ fi + 1 ].push( uv );

						}

					}

				}

				if ( hasFaceNormal ) {

					normalIndex = faces[ offset ++ ] * 3;

					faceA.normal.set(
						normals[ normalIndex ++ ],
						normals[ normalIndex ++ ],
						normals[ normalIndex ]
					);

					faceB.normal.copy( faceA.normal );

				}

				if ( hasFaceVertexNormal ) {

					for ( i = 0; i < 4; i ++ ) {

						normalIndex = faces[ offset ++ ] * 3;

						normal = new THREE.Vector3(
							normals[ normalIndex ++ ],
							normals[ normalIndex ++ ],
							normals[ normalIndex ]
						);


						if ( i !== 2 ) faceA.vertexNormals.push( normal );
						if ( i !== 0 ) faceB.vertexNormals.push( normal );

					}

				}


				if ( hasFaceColor ) {

					colorIndex = faces[ offset ++ ];
					hex = colors[ colorIndex ];

					faceA.color.setHex( hex );
					faceB.color.setHex( hex );

				}


				if ( hasFaceVertexColor ) {

					for ( i = 0; i < 4; i ++ ) {

						colorIndex = faces[ offset ++ ];
						hex = colors[ colorIndex ];

						if ( i !== 2 ) faceA.vertexColors.push( new THREE.Color( hex ) );
						if ( i !== 0 ) faceB.vertexColors.push( new THREE.Color( hex ) );

					}

				}

				geometry.faces.push( faceA );
				geometry.faces.push( faceB );

			} else {

				face = new THREE.Face3();
				face.a = faces[ offset ++ ];
				face.b = faces[ offset ++ ];
				face.c = faces[ offset ++ ];

				if ( hasMaterial ) {

					materialIndex = faces[ offset ++ ];
					face.materialIndex = materialIndex;

				}

				// to get face <=> uv index correspondence

				fi = geometry.faces.length;

				if ( hasFaceVertexUv ) {

					for ( i = 0; i < nUvLayers; i ++ ) {

						uvLayer = json.uvs[ i ];

						geometry.faceVertexUvs[ i ][ fi ] = [];

						for ( j = 0; j < 3; j ++ ) {

							uvIndex = faces[ offset ++ ];

							u = uvLayer[ uvIndex * 2 ];
							v = uvLayer[ uvIndex * 2 + 1 ];

							uv = new THREE.Vector2( u, v );

							geometry.faceVertexUvs[ i ][ fi ].push( uv );

						}

					}

				}

				if ( hasFaceNormal ) {

					normalIndex = faces[ offset ++ ] * 3;

					face.normal.set(
						normals[ normalIndex ++ ],
						normals[ normalIndex ++ ],
						normals[ normalIndex ]
					);

				}

				if ( hasFaceVertexNormal ) {

					for ( i = 0; i < 3; i ++ ) {

						normalIndex = faces[ offset ++ ] * 3;

						normal = new THREE.Vector3(
							normals[ normalIndex ++ ],
							normals[ normalIndex ++ ],
							normals[ normalIndex ]
						);

						face.vertexNormals.push( normal );

					}

				}


				if ( hasFaceColor ) {

					colorIndex = faces[ offset ++ ];
					face.color.setHex( colors[ colorIndex ] );

				}


				if ( hasFaceVertexColor ) {

					for ( i = 0; i < 3; i ++ ) {

						colorIndex = faces[ offset ++ ];
						face.vertexColors.push( new THREE.Color( colors[ colorIndex ] ) );

					}

				}

				geometry.faces.push( face );

			}

		}

	};

	function parseSkin() {
		var influencesPerVertex = ( json.influencesPerVertex !== undefined ) ? json.influencesPerVertex : 2;

		if ( json.skinWeights ) {

			for ( var i = 0, l = json.skinWeights.length; i < l; i += influencesPerVertex ) {

				var x =                               json.skinWeights[ i     ];
				var y = ( influencesPerVertex > 1 ) ? json.skinWeights[ i + 1 ] : 0;
				var z = ( influencesPerVertex > 2 ) ? json.skinWeights[ i + 2 ] : 0;
				var w = ( influencesPerVertex > 3 ) ? json.skinWeights[ i + 3 ] : 0;

				geometry.skinWeights.push( new THREE.Vector4( x, y, z, w ) );

			}

		}

		if ( json.skinIndices ) {

			for ( var i = 0, l = json.skinIndices.length; i < l; i += influencesPerVertex ) {

				var a =                               json.skinIndices[ i     ];
				var b = ( influencesPerVertex > 1 ) ? json.skinIndices[ i + 1 ] : 0;
				var c = ( influencesPerVertex > 2 ) ? json.skinIndices[ i + 2 ] : 0;
				var d = ( influencesPerVertex > 3 ) ? json.skinIndices[ i + 3 ] : 0;

				geometry.skinIndices.push( new THREE.Vector4( a, b, c, d ) );

			}

		}

		geometry.bones = json.bones;

		if ( geometry.bones && geometry.bones.length > 0 && ( geometry.skinWeights.length !== geometry.skinIndices.length || geometry.skinIndices.length !== geometry.vertices.length ) ) {

				console.warn( 'When skinning, number of vertices (' + geometry.vertices.length + '), skinIndices (' +
					geometry.skinIndices.length + '), and skinWeights (' + geometry.skinWeights.length + ') should match.' );

		}


		// could change this to json.animations[0] or remove completely

		geometry.animation = json.animation;
		geometry.animations = json.animations;

	};

	function parseMorphing( scale ) {

		if ( json.morphTargets !== undefined ) {

			var i, l, v, vl, dstVertices, srcVertices;

			for ( i = 0, l = json.morphTargets.length; i < l; i ++ ) {

				geometry.morphTargets[ i ] = {};
				geometry.morphTargets[ i ].name = json.morphTargets[ i ].name;
				geometry.morphTargets[ i ].vertices = [];

				dstVertices = geometry.morphTargets[ i ].vertices;
				srcVertices = json.morphTargets [ i ].vertices;

				for ( v = 0, vl = srcVertices.length; v < vl; v += 3 ) {

					var vertex = new THREE.Vector3();
					vertex.x = srcVertices[ v ] * scale;
					vertex.y = srcVertices[ v + 1 ] * scale;
					vertex.z = srcVertices[ v + 2 ] * scale;

					dstVertices.push( vertex );

				}

			}

		}

		if ( json.morphColors !== undefined ) {

			var i, l, c, cl, dstColors, srcColors, color;

			for ( i = 0, l = json.morphColors.length; i < l; i ++ ) {

				geometry.morphColors[ i ] = {};
				geometry.morphColors[ i ].name = json.morphColors[ i ].name;
				geometry.morphColors[ i ].colors = [];

				dstColors = geometry.morphColors[ i ].colors;
				srcColors = json.morphColors [ i ].colors;

				for ( c = 0, cl = srcColors.length; c < cl; c += 3 ) {

					color = new THREE.Color( 0xffaa00 );
					color.setRGB( srcColors[ c ], srcColors[ c + 1 ], srcColors[ c + 2 ] );
					dstColors.push( color );

				}

			}

		}

	};

	if ( json.materials === undefined || json.materials.length === 0 ) {

		return { geometry: geometry };

	} else {

		var materials = this.initMaterials( json.materials, texturePath );

		if ( this.needsTangents( materials ) ) {

			geometry.computeTangents();

		}

		return { geometry: geometry, materials: materials };

	}

};

// File:src/loaders/LoadingManager.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.LoadingManager = function ( onLoad, onProgress, onError ) {

	var scope = this;

	var loaded = 0, total = 0;

	this.onLoad = onLoad;
	this.onProgress = onProgress;
	this.onError = onError;

	this.itemStart = function ( url ) {

		total ++;

	};

	this.itemEnd = function ( url ) {

		loaded ++;

		if ( scope.onProgress !== undefined ) {

			scope.onProgress( url, loaded, total );

		}

		if ( loaded === total && scope.onLoad !== undefined ) {

			scope.onLoad();

		}

	};

};

THREE.DefaultLoadingManager = new THREE.LoadingManager();

// File:src/loaders/BufferGeometryLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BufferGeometryLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.BufferGeometryLoader.prototype = {

	constructor: THREE.BufferGeometryLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader();
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	parse: function ( json ) {

		var geometry = new THREE.BufferGeometry();

		var attributes = json.attributes;

		for ( var key in attributes ) {

			var attribute = attributes[ key ];
			var typedArray = new self[ attribute.type ]( attribute.array );

			geometry.addAttribute( key, new THREE.BufferAttribute( typedArray, attribute.itemSize ) );

		}

		var offsets = json.offsets;

		if ( offsets !== undefined ) {

			geometry.offsets = JSON.parse( JSON.stringify( offsets ) );

		}

		var boundingSphere = json.boundingSphere;

		if ( boundingSphere !== undefined ) {

			var center = new THREE.Vector3();

			if ( boundingSphere.center !== undefined ) {

				center.fromArray( boundingSphere.center );

			}

			geometry.boundingSphere = new THREE.Sphere( center, boundingSphere.radius );

		}

		return geometry;

	}

};

// File:src/loaders/MaterialLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.MaterialLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.MaterialLoader.prototype = {

	constructor: THREE.MaterialLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader();
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	parse: function ( json ) {

		var material = new THREE[ json.type ];

		if ( json.color !== undefined ) material.color.setHex( json.color );
		if ( json.ambient !== undefined ) material.ambient.setHex( json.ambient );
		if ( json.emissive !== undefined ) material.emissive.setHex( json.emissive );
		if ( json.specular !== undefined ) material.specular.setHex( json.specular );
		if ( json.shininess !== undefined ) material.shininess = json.shininess;
		if ( json.uniforms !== undefined ) material.uniforms = json.uniforms;
		if ( json.vertexShader !== undefined ) material.vertexShader = json.vertexShader;
		if ( json.fragmentShader !== undefined ) material.fragmentShader = json.fragmentShader;		
		if ( json.vertexColors !== undefined ) material.vertexColors = json.vertexColors;
		if ( json.shading !== undefined ) material.shading = json.shading;
		if ( json.blending !== undefined ) material.blending = json.blending;
		if ( json.side !== undefined ) material.side = json.side;
		if ( json.opacity !== undefined ) material.opacity = json.opacity;
		if ( json.transparent !== undefined ) material.transparent = json.transparent;
		if ( json.wireframe !== undefined ) material.wireframe = json.wireframe;

		if ( json.materials !== undefined ) {

			for ( var i = 0, l = json.materials.length; i < l; i ++ ) {

				material.materials.push( this.parse( json.materials[ i ] ) );

			}

		}

		return material;

	}

};

// File:src/loaders/ObjectLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.ObjectLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.ObjectLoader.prototype = {

	constructor: THREE.ObjectLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader( scope.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	},

	parse: function ( json ) {

		var geometries = this.parseGeometries( json.geometries );
		var materials = this.parseMaterials( json.materials );
		var object = this.parseObject( json.object, geometries, materials );

		return object;

	},

	parseGeometries: function ( json ) {

		var geometries = {};

		if ( json !== undefined ) {

			var geometryLoader = new THREE.JSONLoader();
			var bufferGeometryLoader = new THREE.BufferGeometryLoader();

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var geometry;
				var data = json[ i ];

				switch ( data.type ) {

					case 'PlaneGeometry':

						geometry = new THREE.PlaneGeometry(
							data.width,
							data.height,
							data.widthSegments,
							data.heightSegments
						);

						break;

					case 'BoxGeometry':
					case 'CubeGeometry': // backwards compatible

						geometry = new THREE.BoxGeometry(
							data.width,
							data.height,
							data.depth,
							data.widthSegments,
							data.heightSegments,
							data.depthSegments
						);

						break;

					case 'CircleGeometry':

						geometry = new THREE.CircleGeometry(
							data.radius,
							data.segments
						);

						break;

					case 'CylinderGeometry':

						geometry = new THREE.CylinderGeometry(
							data.radiusTop,
							data.radiusBottom,
							data.height,
							data.radialSegments,
							data.heightSegments,
							data.openEnded
						);

						break;

					case 'SphereGeometry':

						geometry = new THREE.SphereGeometry(
							data.radius,
							data.widthSegments,
							data.heightSegments,
							data.phiStart,
							data.phiLength,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'IcosahedronGeometry':

						geometry = new THREE.IcosahedronGeometry(
							data.radius,
							data.detail
						);

						break;

					case 'TorusGeometry':

						geometry = new THREE.TorusGeometry(
							data.radius,
							data.tube,
							data.radialSegments,
							data.tubularSegments,
							data.arc
						);

						break;

					case 'TorusKnotGeometry':

						geometry = new THREE.TorusKnotGeometry(
							data.radius,
							data.tube,
							data.radialSegments,
							data.tubularSegments,
							data.p,
							data.q,
							data.heightScale
						);

						break;

					case 'BufferGeometry':

						geometry = bufferGeometryLoader.parse( data.data );

						break;

					case 'Geometry':

						geometry = geometryLoader.parse( data.data ).geometry;

						break;

				}

				geometry.uuid = data.uuid;

				if ( data.name !== undefined ) geometry.name = data.name;

				geometries[ data.uuid ] = geometry;

			}

		}

		return geometries;

	},

	parseMaterials: function ( json ) {

		var materials = {};

		if ( json !== undefined ) {

			var loader = new THREE.MaterialLoader();

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var data = json[ i ];
				var material = loader.parse( data );

				material.uuid = data.uuid;

				if ( data.name !== undefined ) material.name = data.name;

				materials[ data.uuid ] = material;

			}

		}

		return materials;

	},

	parseObject: function () {

		var matrix = new THREE.Matrix4();

		return function ( data, geometries, materials ) {

			var object;

			switch ( data.type ) {

				case 'Scene':

					object = new THREE.Scene();

					break;

				case 'PerspectiveCamera':

					object = new THREE.PerspectiveCamera( data.fov, data.aspect, data.near, data.far );

					break;

				case 'OrthographicCamera':

					object = new THREE.OrthographicCamera( data.left, data.right, data.top, data.bottom, data.near, data.far );

					break;

				case 'AmbientLight':

					object = new THREE.AmbientLight( data.color );

					break;

				case 'DirectionalLight':

					object = new THREE.DirectionalLight( data.color, data.intensity );

					break;

				case 'PointLight':

					object = new THREE.PointLight( data.color, data.intensity, data.distance );

					break;

				case 'SpotLight':

					object = new THREE.SpotLight( data.color, data.intensity, data.distance, data.angle, data.exponent );

					break;

				case 'HemisphereLight':

					object = new THREE.HemisphereLight( data.color, data.groundColor, data.intensity );

					break;

				case 'Mesh':

					var geometry = geometries[ data.geometry ];
					var material = materials[ data.material ];

					if ( geometry === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined geometry', data.geometry );

					}

					if ( material === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined material', data.material );

					}

					object = new THREE.Mesh( geometry, material );

					break;

				case 'Line':

					var geometry = geometries[ data.geometry ];
					var material = materials[ data.material ];

					if ( geometry === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined geometry', data.geometry );

					}

					if ( material === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined material', data.material );

					}

					object = new THREE.Line( geometry, material );

					break;

				case 'Sprite':

					var material = materials[ data.material ];

					if ( material === undefined ) {

						console.warn( 'THREE.ObjectLoader: Undefined material', data.material );

					}

					object = new THREE.Sprite( material );

					break;

				case 'Group':

					object = new THREE.Group();

					break;

				default:

					object = new THREE.Object3D();

			}

			object.uuid = data.uuid;

			if ( data.name !== undefined ) object.name = data.name;
			if ( data.matrix !== undefined ) {

				matrix.fromArray( data.matrix );
				matrix.decompose( object.position, object.quaternion, object.scale );

			} else {

				if ( data.position !== undefined ) object.position.fromArray( data.position );
				if ( data.rotation !== undefined ) object.rotation.fromArray( data.rotation );
				if ( data.scale !== undefined ) object.scale.fromArray( data.scale );

			}

			if ( data.visible !== undefined ) object.visible = data.visible;
			if ( data.userData !== undefined ) object.userData = data.userData;

			if ( data.children !== undefined ) {

				for ( var child in data.children ) {

					object.add( this.parseObject( data.children[ child ], geometries, materials ) );

				}

			}

			return object;

		}

	}()

};

// File:src/loaders/TextureLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.TextureLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.TextureLoader.prototype = {

	constructor: THREE.TextureLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.ImageLoader( scope.manager );
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( image ) {

			var texture = new THREE.Texture( image );
			texture.needsUpdate = true;

			if ( onLoad !== undefined ) {

				onLoad( texture );

			}

		}, onProgress, onError );

	},

	setCrossOrigin: function ( value ) {

		this.crossOrigin = value;

	}

};

// File:src/loaders/CompressedTextureLoader.js

/**
 * @author mrdoob / http://mrdoob.com/
 *
 * Abstract Base class to block based textures loader (dds, pvr, ...)
 */

THREE.CompressedTextureLoader = function () {

	// override in sub classes
	this._parser = null;

};


THREE.CompressedTextureLoader.prototype = {

	constructor: THREE.CompressedTextureLoader,

	load: function ( url, onLoad, onError ) {

		var scope = this;

		var images = [];

		var texture = new THREE.CompressedTexture();
		texture.image = images;

		var loader = new THREE.XHRLoader();
		loader.setResponseType( 'arraybuffer' );

		if ( url instanceof Array ) {

			var loaded = 0;

			var loadTexture = function ( i ) {

				loader.load( url[ i ], function ( buffer ) {

					var texDatas = scope._parser( buffer, true );

					images[ i ] = {
						width: texDatas.width,
						height: texDatas.height,
						format: texDatas.format,
						mipmaps: texDatas.mipmaps
					};

					loaded += 1;

					if ( loaded === 6 ) {

 						if (texDatas.mipmapCount == 1)
 							texture.minFilter = THREE.LinearFilter;

						texture.format = texDatas.format;
						texture.needsUpdate = true;

						if ( onLoad ) onLoad( texture );

					}

				} );

			};

			for ( var i = 0, il = url.length; i < il; ++ i ) {

				loadTexture( i );

			}

		} else {

			// compressed cubemap texture stored in a single DDS file

			loader.load( url, function ( buffer ) {

				var texDatas = scope._parser( buffer, true );

				if ( texDatas.isCubemap ) {

					var faces = texDatas.mipmaps.length / texDatas.mipmapCount;

					for ( var f = 0; f < faces; f ++ ) {

						images[ f ] = { mipmaps : [] };

						for ( var i = 0; i < texDatas.mipmapCount; i ++ ) {

							images[ f ].mipmaps.push( texDatas.mipmaps[ f * texDatas.mipmapCount + i ] );
							images[ f ].format = texDatas.format;
							images[ f ].width = texDatas.width;
							images[ f ].height = texDatas.height;

						}

					}

				} else {

					texture.image.width = texDatas.width;
					texture.image.height = texDatas.height;
					texture.mipmaps = texDatas.mipmaps;

				}

				if ( texDatas.mipmapCount === 1 ) {

					texture.minFilter = THREE.LinearFilter;

				}

				texture.format = texDatas.format;
				texture.needsUpdate = true;

				if ( onLoad ) onLoad( texture );

			} );

		}

		return texture;

	}

};

// File:src/materials/Material.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Material = function () {

	Object.defineProperty( this, 'id', { value: THREE.MaterialIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';
	this.type = 'Material';

	this.side = THREE.FrontSide;

	this.opacity = 1;
	this.transparent = false;

	this.blending = THREE.NormalBlending;

	this.blendSrc = THREE.SrcAlphaFactor;
	this.blendDst = THREE.OneMinusSrcAlphaFactor;
	this.blendEquation = THREE.AddEquation;

	this.depthTest = true;
	this.depthWrite = true;

	this.polygonOffset = false;
	this.polygonOffsetFactor = 0;
	this.polygonOffsetUnits = 0;

	this.alphaTest = 0;

	this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer

	this.visible = true;

	this.needsUpdate = true;

};

THREE.Material.prototype = {

	constructor: THREE.Material,

	setValues: function ( values ) {

		if ( values === undefined ) return;

		for ( var key in values ) {

			var newValue = values[ key ];

			if ( newValue === undefined ) {

				console.warn( "THREE.Material: '" + key + "' parameter is undefined." );
				continue;

			}

			if ( key in this ) {

				var currentValue = this[ key ];

				if ( currentValue instanceof THREE.Color ) {

					currentValue.set( newValue );

				} else if ( currentValue instanceof THREE.Vector3 && newValue instanceof THREE.Vector3 ) {

					currentValue.copy( newValue );

				} else if ( key == 'overdraw' ) {

					// ensure overdraw is backwards-compatable with legacy boolean type
					this[ key ] = Number( newValue );

				} else {

					this[ key ] = newValue;

				}

			}

		}

	},

	toJSON: function () {

		var output = {
			metadata: {
				version: 4.2,
				type: 'material',
				generator: 'MaterialExporter'
			},
			uuid: this.uuid,
			type: this.type
		};

		if ( this.name !== "" ) output.name = this.name;

		if ( this instanceof THREE.MeshBasicMaterial ) {

			output.color = this.color.getHex();
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshLambertMaterial ) {

			output.color = this.color.getHex();
			output.ambient = this.ambient.getHex();
			output.emissive = this.emissive.getHex();
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshPhongMaterial ) {

			output.color = this.color.getHex();
			output.ambient = this.ambient.getHex();
			output.emissive = this.emissive.getHex();
			output.specular = this.specular.getHex();
			output.shininess = this.shininess;
			if ( this.vertexColors !== THREE.NoColors ) output.vertexColors = this.vertexColors;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshNormalMaterial ) {

			if ( this.shading !== THREE.FlatShading ) output.shading = this.shading;
			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.MeshDepthMaterial ) {

			if ( this.blending !== THREE.NormalBlending ) output.blending = this.blending;
			if ( this.side !== THREE.FrontSide ) output.side = this.side;

		} else if ( this instanceof THREE.ShaderMaterial ) {

			output.uniforms = this.uniforms;
			output.vertexShader = this.vertexShader;
			output.fragmentShader = this.fragmentShader;

		} else if ( this instanceof THREE.SpriteMaterial ) {

			output.color = this.color.getHex();

		}

		if ( this.opacity < 1 ) output.opacity = this.opacity;
		if ( this.transparent !== false ) output.transparent = this.transparent;
		if ( this.wireframe !== false ) output.wireframe = this.wireframe;

		return output;

	},

	clone: function ( material ) {

		if ( material === undefined ) material = new THREE.Material();

		material.name = this.name;

		material.side = this.side;

		material.opacity = this.opacity;
		material.transparent = this.transparent;

		material.blending = this.blending;

		material.blendSrc = this.blendSrc;
		material.blendDst = this.blendDst;
		material.blendEquation = this.blendEquation;

		material.depthTest = this.depthTest;
		material.depthWrite = this.depthWrite;

		material.polygonOffset = this.polygonOffset;
		material.polygonOffsetFactor = this.polygonOffsetFactor;
		material.polygonOffsetUnits = this.polygonOffsetUnits;

		material.alphaTest = this.alphaTest;

		material.overdraw = this.overdraw;

		material.visible = this.visible;

		return material;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Material.prototype );

THREE.MaterialIdCount = 0;

// File:src/materials/LineBasicMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round",
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

THREE.LineBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'LineBasicMaterial';

	this.color = new THREE.Color( 0xffffff );

	this.linewidth = 1;
	this.linecap = 'round';
	this.linejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.fog = true;

	this.setValues( parameters );

};

THREE.LineBasicMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.LineBasicMaterial.prototype.clone = function () {

	var material = new THREE.LineBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;
	material.linecap = this.linecap;
	material.linejoin = this.linejoin;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};

// File:src/materials/LineDashedMaterial.js

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  linewidth: <float>,
 *
 *  scale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *
 *  vertexColors: <bool>
 *
 *  fog: <bool>
 * }
 */

THREE.LineDashedMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'LineDashedMaterial';

	this.color = new THREE.Color( 0xffffff );

	this.linewidth = 1;

	this.scale = 1;
	this.dashSize = 3;
	this.gapSize = 1;

	this.vertexColors = false;

	this.fog = true;

	this.setValues( parameters );

};

THREE.LineDashedMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.LineDashedMaterial.prototype.clone = function () {

	var material = new THREE.LineDashedMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.linewidth = this.linewidth;

	material.scale = this.scale;
	material.dashSize = this.dashSize;
	material.gapSize = this.gapSize;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};

// File:src/materials/MeshBasicMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *
 *  fog: <bool>
 * }
 */

THREE.MeshBasicMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'MeshBasicMaterial';

	this.color = new THREE.Color( 0xffffff ); // emissive

	this.map = null;

	this.lightMap = null;

	this.specularMap = null;

	this.alphaMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;

	this.setValues( parameters );

};

THREE.MeshBasicMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshBasicMaterial.prototype.clone = function () {

	var material = new THREE.MeshBasicMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.specularMap = this.specularMap;

	material.alphaMap = this.alphaMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;

	return material;

};

// File:src/materials/MeshLambertMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshLambertMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'MeshLambertMaterial';

	this.color = new THREE.Color( 0xffffff ); // diffuse
	this.ambient = new THREE.Color( 0xffffff );
	this.emissive = new THREE.Color( 0x000000 );

	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = null;

	this.lightMap = null;

	this.specularMap = null;

	this.alphaMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.setValues( parameters );

};

THREE.MeshLambertMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshLambertMaterial.prototype.clone = function () {

	var material = new THREE.MeshLambertMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.specularMap = this.specularMap;

	material.alphaMap = this.alphaMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};

// File:src/materials/MeshPhongMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  ambient: <hex>,
 *  emissive: <hex>,
 *  specular: <hex>,
 *  shininess: <float>,
 *  opacity: <float>,
 *
 *  map: new THREE.Texture( <Image> ),
 *
 *  lightMap: new THREE.Texture( <Image> ),
 *
 *  bumpMap: new THREE.Texture( <Image> ),
 *  bumpScale: <float>,
 *
 *  normalMap: new THREE.Texture( <Image> ),
 *  normalScale: <Vector2>,
 *
 *  specularMap: new THREE.Texture( <Image> ),
 *
 *  alphaMap: new THREE.Texture( <Image> ),
 *
 *  envMap: new THREE.TextureCube( [posx, negx, posy, negy, posz, negz] ),
 *  combine: THREE.Multiply,
 *  reflectivity: <float>,
 *  refractionRatio: <float>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.MeshPhongMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'MeshPhongMaterial';

	this.color = new THREE.Color( 0xffffff ); // diffuse
	this.ambient = new THREE.Color( 0xffffff );
	this.emissive = new THREE.Color( 0x000000 );
	this.specular = new THREE.Color( 0x111111 );
	this.shininess = 30;

	this.metal = false;

	this.wrapAround = false;
	this.wrapRGB = new THREE.Vector3( 1, 1, 1 );

	this.map = null;

	this.lightMap = null;

	this.bumpMap = null;
	this.bumpScale = 1;

	this.normalMap = null;
	this.normalScale = new THREE.Vector2( 1, 1 );

	this.specularMap = null;

	this.alphaMap = null;

	this.envMap = null;
	this.combine = THREE.MultiplyOperation;
	this.reflectivity = 1;
	this.refractionRatio = 0.98;

	this.fog = true;

	this.shading = THREE.SmoothShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;
	this.wireframeLinecap = 'round';
	this.wireframeLinejoin = 'round';

	this.vertexColors = THREE.NoColors;

	this.skinning = false;
	this.morphTargets = false;
	this.morphNormals = false;

	this.setValues( parameters );

};

THREE.MeshPhongMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshPhongMaterial.prototype.clone = function () {

	var material = new THREE.MeshPhongMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.ambient.copy( this.ambient );
	material.emissive.copy( this.emissive );
	material.specular.copy( this.specular );
	material.shininess = this.shininess;

	material.metal = this.metal;

	material.wrapAround = this.wrapAround;
	material.wrapRGB.copy( this.wrapRGB );

	material.map = this.map;

	material.lightMap = this.lightMap;

	material.bumpMap = this.bumpMap;
	material.bumpScale = this.bumpScale;

	material.normalMap = this.normalMap;
	material.normalScale.copy( this.normalScale );

	material.specularMap = this.specularMap;

	material.alphaMap = this.alphaMap;

	material.envMap = this.envMap;
	material.combine = this.combine;
	material.reflectivity = this.reflectivity;
	material.refractionRatio = this.refractionRatio;

	material.fog = this.fog;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;
	material.wireframeLinecap = this.wireframeLinecap;
	material.wireframeLinejoin = this.wireframeLinejoin;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;
	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};

// File:src/materials/MeshDepthMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

THREE.MeshDepthMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'MeshDepthMaterial';

	this.morphTargets = false;
	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.setValues( parameters );

};

THREE.MeshDepthMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshDepthMaterial.prototype.clone = function () {

	var material = new THREE.MeshDepthMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};

// File:src/materials/MeshNormalMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 *
 * parameters = {
 *  opacity: <float>,
 *
 *  shading: THREE.FlatShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>
 * }
 */

THREE.MeshNormalMaterial = function ( parameters ) {

	THREE.Material.call( this, parameters );

	this.type = 'MeshNormalMaterial';

	this.shading = THREE.FlatShading;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.morphTargets = false;

	this.setValues( parameters );

};

THREE.MeshNormalMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.MeshNormalMaterial.prototype.clone = function () {

	var material = new THREE.MeshNormalMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	return material;

};

// File:src/materials/MeshFaceMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.MeshFaceMaterial = function ( materials ) {

	this.uuid = THREE.Math.generateUUID();

	this.type = 'MeshFaceMaterial';
	
	this.materials = materials instanceof Array ? materials : [];

};

THREE.MeshFaceMaterial.prototype = {

	constructor: THREE.MeshFaceMaterial,

	toJSON: function () {

		var output = {
			metadata: {
				version: 4.2,
				type: 'material',
				generator: 'MaterialExporter'
			},
			uuid: this.uuid,
			type: this.type,
			materials: []
		};

		for ( var i = 0, l = this.materials.length; i < l; i ++ ) {

			output.materials.push( this.materials[ i ].toJSON() );

		}

		return output;

	},

	clone: function () {

		var material = new THREE.MeshFaceMaterial();

		for ( var i = 0; i < this.materials.length; i ++ ) {

			material.materials.push( this.materials[ i ].clone() );

		}

		return material;

	}

};

// File:src/materials/PointCloudMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  size: <float>,
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  vertexColors: <bool>,
 *
 *  fog: <bool>
 * }
 */

THREE.PointCloudMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'PointCloudMaterial';

	this.color = new THREE.Color( 0xffffff );

	this.map = null;

	this.size = 1;
	this.sizeAttenuation = true;

	this.vertexColors = THREE.NoColors;

	this.fog = true;

	this.setValues( parameters );

};

THREE.PointCloudMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.PointCloudMaterial.prototype.clone = function () {

	var material = new THREE.PointCloudMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );

	material.map = this.map;

	material.size = this.size;
	material.sizeAttenuation = this.sizeAttenuation;

	material.vertexColors = this.vertexColors;

	material.fog = this.fog;

	return material;

};

// backwards compatibility

THREE.ParticleBasicMaterial = function ( parameters ) {

	console.warn( 'THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial.' );
	return new THREE.PointCloudMaterial( parameters );

};

THREE.ParticleSystemMaterial = function ( parameters ) {

	console.warn( 'THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial.' );
	return new THREE.PointCloudMaterial( parameters );

};

// File:src/materials/ShaderMaterial.js

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  defines: { "label" : "value" },
 *  uniforms: { "parameter1": { type: "f", value: 1.0 }, "parameter2": { type: "i" value2: 2 } },
 *
 *  fragmentShader: <string>,
 *  vertexShader: <string>,
 *
 *  shading: THREE.SmoothShading,
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *  wireframe: <boolean>,
 *  wireframeLinewidth: <float>,
 *
 *  lights: <bool>,
 *
 *  vertexColors: THREE.NoColors / THREE.VertexColors / THREE.FaceColors,
 *
 *  skinning: <bool>,
 *  morphTargets: <bool>,
 *  morphNormals: <bool>,
 *
 *	fog: <bool>
 * }
 */

THREE.ShaderMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'ShaderMaterial';

	this.defines = {};
	this.uniforms = {};
	this.attributes = null;

	this.vertexShader = 'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}';
	this.fragmentShader = 'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}';

	this.shading = THREE.SmoothShading;

	this.linewidth = 1;

	this.wireframe = false;
	this.wireframeLinewidth = 1;

	this.fog = false; // set to use scene fog

	this.lights = false; // set to use scene lights

	this.vertexColors = THREE.NoColors; // set to use "color" attribute stream

	this.skinning = false; // set to use skinning attribute streams

	this.morphTargets = false; // set to use morph targets
	this.morphNormals = false; // set to use morph normals

	// When rendered geometry doesn't include these attributes but the material does,
	// use these default values in WebGL. This avoids errors when buffer data is missing.
	this.defaultAttributeValues = {
		'color': [ 1, 1, 1 ],
		'uv': [ 0, 0 ],
		'uv2': [ 0, 0 ]
	};

	this.index0AttributeName = undefined;

	this.setValues( parameters );

};

THREE.ShaderMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.ShaderMaterial.prototype.clone = function () {

	var material = new THREE.ShaderMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.fragmentShader = this.fragmentShader;
	material.vertexShader = this.vertexShader;

	material.uniforms = THREE.UniformsUtils.clone( this.uniforms );

	material.attributes = this.attributes;
	material.defines = this.defines;

	material.shading = this.shading;

	material.wireframe = this.wireframe;
	material.wireframeLinewidth = this.wireframeLinewidth;

	material.fog = this.fog;

	material.lights = this.lights;

	material.vertexColors = this.vertexColors;

	material.skinning = this.skinning;

	material.morphTargets = this.morphTargets;
	material.morphNormals = this.morphNormals;

	return material;

};

// File:src/materials/RawShaderMaterial.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RawShaderMaterial = function ( parameters ) {

	THREE.ShaderMaterial.call( this, parameters );

	this.type = 'RawShaderMaterial';

};

THREE.RawShaderMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );

THREE.RawShaderMaterial.prototype.clone = function () {

	var material = new THREE.RawShaderMaterial();

	THREE.ShaderMaterial.prototype.clone.call( this, material );

	return material;

};

// File:src/materials/SpriteMaterial.js

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *  map: new THREE.Texture( <Image> ),
 *
 *  blending: THREE.NormalBlending,
 *  depthTest: <bool>,
 *  depthWrite: <bool>,
 *
 *	uvOffset: new THREE.Vector2(),
 *	uvScale: new THREE.Vector2(),
 *
 *  fog: <bool>
 * }
 */

THREE.SpriteMaterial = function ( parameters ) {

	THREE.Material.call( this );

	this.type = 'SpriteMaterial';

	this.color = new THREE.Color( 0xffffff );
	this.map = null;

	this.rotation = 0;

	this.fog = false;

	// set parameters

	this.setValues( parameters );

};

THREE.SpriteMaterial.prototype = Object.create( THREE.Material.prototype );

THREE.SpriteMaterial.prototype.clone = function () {

	var material = new THREE.SpriteMaterial();

	THREE.Material.prototype.clone.call( this, material );

	material.color.copy( this.color );
	material.map = this.map;

	material.rotation = this.rotation;

	material.fog = this.fog;

	return material;

};

// File:src/textures/Texture.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	Object.defineProperty( this, 'id', { value: THREE.TextureIdCount ++ } );

	this.uuid = THREE.Math.generateUUID();

	this.name = '';

	this.image = image !== undefined ? image : THREE.Texture.DEFAULT_IMAGE;
	this.mipmaps = [];

	this.mapping = mapping !== undefined ? mapping : THREE.Texture.DEFAULT_MAPPING;

	this.wrapS = wrapS !== undefined ? wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = magFilter !== undefined ? magFilter : THREE.LinearFilter;
	this.minFilter = minFilter !== undefined ? minFilter : THREE.LinearMipMapLinearFilter;

	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;

	this.format = format !== undefined ? format : THREE.RGBAFormat;
	this.type = type !== undefined ? type : THREE.UnsignedByteType;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.generateMipmaps = true;
	this.premultiplyAlpha = false;
	this.flipY = true;
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

	this._needsUpdate = false;
	this.onUpdate = null;

};

THREE.Texture.DEFAULT_IMAGE = undefined;
THREE.Texture.DEFAULT_MAPPING = new THREE.UVMapping();

THREE.Texture.prototype = {

	constructor: THREE.Texture,

	get needsUpdate () {

		return this._needsUpdate;

	},

	set needsUpdate ( value ) {

		if ( value === true ) this.update();

		this._needsUpdate = value;

	},

	clone: function ( texture ) {

		if ( texture === undefined ) texture = new THREE.Texture();

		texture.image = this.image;
		texture.mipmaps = this.mipmaps.slice( 0 );

		texture.mapping = this.mapping;

		texture.wrapS = this.wrapS;
		texture.wrapT = this.wrapT;

		texture.magFilter = this.magFilter;
		texture.minFilter = this.minFilter;

		texture.anisotropy = this.anisotropy;

		texture.format = this.format;
		texture.type = this.type;

		texture.offset.copy( this.offset );
		texture.repeat.copy( this.repeat );

		texture.generateMipmaps = this.generateMipmaps;
		texture.premultiplyAlpha = this.premultiplyAlpha;
		texture.flipY = this.flipY;
		texture.unpackAlignment = this.unpackAlignment;

		return texture;

	},

	update: function () {

		this.dispatchEvent( { type: 'update' } );

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.Texture.prototype );

THREE.TextureIdCount = 0;

// File:src/textures/CubeTexture.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CubeTexture = function ( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	THREE.Texture.call( this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.images = images;

};

THREE.CubeTexture.prototype = Object.create( THREE.Texture.prototype );

THREE.CubeTexture.clone = function ( texture ) {

	if ( texture === undefined ) texture = new THREE.CubeTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	texture.images = this.images;

	return texture;

};

// File:src/textures/CompressedTexture.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.CompressedTexture = function ( mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.image = { width: width, height: height };
	this.mipmaps = mipmaps;

	// no flipping for cube textures
	// (also flipping doesn't work for compressed textures )

	this.flipY = false;

	// can't generate mipmaps for compressed textures
	// mips must be embedded in DDS files

	this.generateMipmaps = false;

};

THREE.CompressedTexture.prototype = Object.create( THREE.Texture.prototype );

THREE.CompressedTexture.prototype.clone = function () {

	var texture = new THREE.CompressedTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	return texture;

};

// File:src/textures/DataTexture.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.DataTexture = function ( data, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy ) {

	THREE.Texture.call( this, null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.image = { data: data, width: width, height: height };

};

THREE.DataTexture.prototype = Object.create( THREE.Texture.prototype );

THREE.DataTexture.prototype.clone = function () {

	var texture = new THREE.DataTexture();

	THREE.Texture.prototype.clone.call( this, texture );

	return texture;

};

// File:src/textures/VideoTexture.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.VideoTexture = function ( video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy ) {

	THREE.Texture.call( this, video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy );

	this.generateMipmaps = false;

	var scope = this;

	var update = function () {

		requestAnimationFrame( update );

		if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

			scope.needsUpdate = true;

		}

	};

	update();

};

THREE.VideoTexture.prototype = Object.create( THREE.Texture.prototype );

// File:src/objects/Group.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Group = function () {

	THREE.Object3D.call( this );

	this.type = 'Group';

};

THREE.Group.prototype = Object.create( THREE.Object3D.prototype );

// File:src/objects/PointCloud.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.PointCloud = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.type = 'PointCloud';

	this.geometry = geometry !== undefined ? geometry : new THREE.Geometry();
	this.material = material !== undefined ? material : new THREE.PointCloudMaterial( { color: Math.random() * 0xffffff } );

	this.sortParticles = false;

};

THREE.PointCloud.prototype = Object.create( THREE.Object3D.prototype );

THREE.PointCloud.prototype.raycast = ( function () {

	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();

	return function ( raycaster, intersects ) {

		var object = this;
		var geometry = object.geometry;
		var threshold = raycaster.params.PointCloud.threshold;

		inverseMatrix.getInverse( this.matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

		if ( geometry.boundingBox !== null ) {

			if ( ray.isIntersectionBox( geometry.boundingBox ) === false ) {

				return;

			}

		}

		var localThreshold = threshold / ( ( this.scale.x + this.scale.y + this.scale.z ) / 3 );
		var position = new THREE.Vector3();

		var testPoint = function ( point, index ) {

			var rayPointDistance = ray.distanceToPoint( point );

			if ( rayPointDistance < localThreshold ) {

				var intersectPoint = ray.closestPointToPoint( point );
				intersectPoint.applyMatrix4( object.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( intersectPoint );

				intersects.push( {

					distance: distance,
					distanceToRay: rayPointDistance,
					point: intersectPoint.clone(),
					index: index,
					face: null,
					object: object

				} );

			}

		};

		if ( geometry instanceof THREE.BufferGeometry ) {

			var attributes = geometry.attributes;
			var positions = attributes.position.array;

			if ( attributes.index !== undefined ) {

				var indices = attributes.index.array;
				var offsets = geometry.offsets;

				if ( offsets.length === 0 ) {

					var offset = {
						start: 0,
						count: indices.length,
						index: 0
					};

					offsets = [ offset ];

				}

				for ( var oi = 0, ol = offsets.length; oi < ol; ++oi ) {

					var start = offsets[ oi ].start;
					var count = offsets[ oi ].count;
					var index = offsets[ oi ].index;

					for ( var i = start, il = start + count; i < il; i ++ ) {

						var a = index + indices[ i ];

						position.fromArray( positions, a * 3 );

						testPoint( position, a );

					}

				}

			} else {

				var pointCount = positions.length / 3;

				for ( var i = 0; i < pointCount; i ++ ) {

					position.set(
						positions[ 3 * i ],
						positions[ 3 * i + 1 ],
						positions[ 3 * i + 2 ]
					);

					testPoint( position, i );

				}

			}

		} else {

			var vertices = this.geometry.vertices;

			for ( var i = 0; i < vertices.length; i ++ ) {

				testPoint( vertices[ i ], i );

			}

		}

	};

}() );

THREE.PointCloud.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.PointCloud( this.geometry, this.material );

	object.sortParticles = this.sortParticles;

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};

// Backwards compatibility

THREE.ParticleSystem = function ( geometry, material ) {

	console.warn( 'THREE.ParticleSystem has been renamed to THREE.PointCloud.' );
	return new THREE.PointCloud( geometry, material );

};

// File:src/objects/Line.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Line = function ( geometry, material, mode ) {

	THREE.Object3D.call( this );

	this.type = 'Line';

	this.geometry = geometry !== undefined ? geometry : new THREE.Geometry();
	this.material = material !== undefined ? material : new THREE.LineBasicMaterial( { color: Math.random() * 0xffffff } );

	this.mode = ( mode !== undefined ) ? mode : THREE.LineStrip;

};

THREE.LineStrip = 0;
THREE.LinePieces = 1;

THREE.Line.prototype = Object.create( THREE.Object3D.prototype );

THREE.Line.prototype.raycast = ( function () {

	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();
	var sphere = new THREE.Sphere();

	return function ( raycaster, intersects ) {

		var precision = raycaster.linePrecision;
		var precisionSq = precision * precision;

		var geometry = this.geometry;

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		// Checking boundingSphere distance to ray

		sphere.copy( geometry.boundingSphere );
		sphere.applyMatrix4( this.matrixWorld );

		if ( raycaster.ray.isIntersectionSphere( sphere ) === false ) {

			return;

		}

		inverseMatrix.getInverse( this.matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

		/* if ( geometry instanceof THREE.BufferGeometry ) {

		} else */ if ( geometry instanceof THREE.Geometry ) {

			var vertices = geometry.vertices;
			var nbVertices = vertices.length;
			var interSegment = new THREE.Vector3();
			var interRay = new THREE.Vector3();
			var step = this.mode === THREE.LineStrip ? 1 : 2;

			for ( var i = 0; i < nbVertices - 1; i = i + step ) {

				var distSq = ray.distanceSqToSegment( vertices[ i ], vertices[ i + 1 ], interRay, interSegment );

				if ( distSq > precisionSq ) continue;

				var distance = ray.origin.distanceTo( interRay );

				if ( distance < raycaster.near || distance > raycaster.far ) continue;

				intersects.push( {

					distance: distance,
					// What do we want? intersection point on the ray or on the segment??
					// point: raycaster.ray.at( distance ),
					point: interSegment.clone().applyMatrix4( this.matrixWorld ),
					face: null,
					faceIndex: null,
					object: this

				} );

			}

		}

	};

}() );

THREE.Line.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Line( this.geometry, this.material, this.mode );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};

// File:src/objects/Mesh.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author jonobr1 / http://jonobr1.com/
 */

THREE.Mesh = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.type = 'Mesh';
	
	this.geometry = geometry !== undefined ? geometry : new THREE.Geometry();
	this.material = material !== undefined ? material : new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );

	this.updateMorphTargets();

};

THREE.Mesh.prototype = Object.create( THREE.Object3D.prototype );

THREE.Mesh.prototype.updateMorphTargets = function () {

	if ( this.geometry.morphTargets !== undefined && this.geometry.morphTargets.length > 0 ) {

		this.morphTargetBase = - 1;
		this.morphTargetForcedOrder = [];
		this.morphTargetInfluences = [];
		this.morphTargetDictionary = {};

		for ( var m = 0, ml = this.geometry.morphTargets.length; m < ml; m ++ ) {

			this.morphTargetInfluences.push( 0 );
			this.morphTargetDictionary[ this.geometry.morphTargets[ m ].name ] = m;

		}

	}

};

THREE.Mesh.prototype.getMorphTargetIndexByName = function ( name ) {

	if ( this.morphTargetDictionary[ name ] !== undefined ) {

		return this.morphTargetDictionary[ name ];

	}

	console.log( 'THREE.Mesh.getMorphTargetIndexByName: morph target ' + name + ' does not exist. Returning 0.' );

	return 0;

};


THREE.Mesh.prototype.raycast = ( function () {

	var inverseMatrix = new THREE.Matrix4();
	var ray = new THREE.Ray();
	var sphere = new THREE.Sphere();

	var vA = new THREE.Vector3();
	var vB = new THREE.Vector3();
	var vC = new THREE.Vector3();

	return function ( raycaster, intersects ) {

		var geometry = this.geometry;

		// Checking boundingSphere distance to ray

		if ( geometry.boundingSphere === null ) geometry.computeBoundingSphere();

		sphere.copy( geometry.boundingSphere );
		sphere.applyMatrix4( this.matrixWorld );

		if ( raycaster.ray.isIntersectionSphere( sphere ) === false ) {

			return;

		}

		// Check boundingBox before continuing

		inverseMatrix.getInverse( this.matrixWorld );
		ray.copy( raycaster.ray ).applyMatrix4( inverseMatrix );

		if ( geometry.boundingBox !== null ) {

			if ( ray.isIntersectionBox( geometry.boundingBox ) === false )  {

				return;

			}

		}

		if ( geometry instanceof THREE.BufferGeometry ) {

			var material = this.material;

			if ( material === undefined ) return;

			var attributes = geometry.attributes;

			var a, b, c;
			var precision = raycaster.precision;

			if ( attributes.index !== undefined ) {

				var indices = attributes.index.array;
				var positions = attributes.position.array;
				var offsets = geometry.offsets;

				if ( offsets.length === 0 ) {

					offsets = [ { start: 0, count: indices.length, index: 0 } ];

				}

				for ( var oi = 0, ol = offsets.length; oi < ol; ++oi ) {

					var start = offsets[ oi ].start;
					var count = offsets[ oi ].count;
					var index = offsets[ oi ].index;

					for ( var i = start, il = start + count; i < il; i += 3 ) {

						a = index + indices[ i ];
						b = index + indices[ i + 1 ];
						c = index + indices[ i + 2 ];

						vA.fromArray( positions, a * 3 );
						vB.fromArray( positions, b * 3 );
						vC.fromArray( positions, c * 3 );

						if ( material.side === THREE.BackSide ) {

							var intersectionPoint = ray.intersectTriangle( vC, vB, vA, true );

						} else {

							var intersectionPoint = ray.intersectTriangle( vA, vB, vC, material.side !== THREE.DoubleSide );

						}

						if ( intersectionPoint === null ) continue;

						intersectionPoint.applyMatrix4( this.matrixWorld );

						var distance = raycaster.ray.origin.distanceTo( intersectionPoint );

						if ( distance < precision || distance < raycaster.near || distance > raycaster.far ) continue;

						intersects.push( {

							distance: distance,
							point: intersectionPoint,
							face: new THREE.Face3( a, b, c, THREE.Triangle.normal( vA, vB, vC ) ),
							faceIndex: null,
							object: this

						} );

					}

				}

			} else {

				var positions = attributes.position.array;

				for ( var i = 0, j = 0, il = positions.length; i < il; i += 3, j += 9 ) {

					a = i;
					b = i + 1;
					c = i + 2;

					vA.fromArray( positions, j );
					vB.fromArray( positions, j + 3 );
					vC.fromArray( positions, j + 6 );

					if ( material.side === THREE.BackSide ) {

						var intersectionPoint = ray.intersectTriangle( vC, vB, vA, true );

					} else {

						var intersectionPoint = ray.intersectTriangle( vA, vB, vC, material.side !== THREE.DoubleSide );

					}

					if ( intersectionPoint === null ) continue;

					intersectionPoint.applyMatrix4( this.matrixWorld );

					var distance = raycaster.ray.origin.distanceTo( intersectionPoint );

					if ( distance < precision || distance < raycaster.near || distance > raycaster.far ) continue;

					intersects.push( {

						distance: distance,
						point: intersectionPoint,
						face: new THREE.Face3( a, b, c, THREE.Triangle.normal( vA, vB, vC ) ),
						faceIndex: null,
						object: this

					} );

				}

			}

		} else if ( geometry instanceof THREE.Geometry ) {

			var isFaceMaterial = this.material instanceof THREE.MeshFaceMaterial;
			var objectMaterials = isFaceMaterial === true ? this.material.materials : null;

			var a, b, c, d;
			var precision = raycaster.precision;

			var vertices = geometry.vertices;

			for ( var f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

				var face = geometry.faces[ f ];

				var material = isFaceMaterial === true ? objectMaterials[ face.materialIndex ] : this.material;

				if ( material === undefined ) continue;

				a = vertices[ face.a ];
				b = vertices[ face.b ];
				c = vertices[ face.c ];

				if ( material.morphTargets === true ) {

					var morphTargets = geometry.morphTargets;
					var morphInfluences = this.morphTargetInfluences;

					vA.set( 0, 0, 0 );
					vB.set( 0, 0, 0 );
					vC.set( 0, 0, 0 );

					for ( var t = 0, tl = morphTargets.length; t < tl; t ++ ) {

						var influence = morphInfluences[ t ];

						if ( influence === 0 ) continue;

						var targets = morphTargets[ t ].vertices;

						vA.x += ( targets[ face.a ].x - a.x ) * influence;
						vA.y += ( targets[ face.a ].y - a.y ) * influence;
						vA.z += ( targets[ face.a ].z - a.z ) * influence;

						vB.x += ( targets[ face.b ].x - b.x ) * influence;
						vB.y += ( targets[ face.b ].y - b.y ) * influence;
						vB.z += ( targets[ face.b ].z - b.z ) * influence;

						vC.x += ( targets[ face.c ].x - c.x ) * influence;
						vC.y += ( targets[ face.c ].y - c.y ) * influence;
						vC.z += ( targets[ face.c ].z - c.z ) * influence;

					}

					vA.add( a );
					vB.add( b );
					vC.add( c );

					a = vA;
					b = vB;
					c = vC;

				}

				if ( material.side === THREE.BackSide ) {

					var intersectionPoint = ray.intersectTriangle( c, b, a, true );

				} else {

					var intersectionPoint = ray.intersectTriangle( a, b, c, material.side !== THREE.DoubleSide );

				}

				if ( intersectionPoint === null ) continue;

				intersectionPoint.applyMatrix4( this.matrixWorld );

				var distance = raycaster.ray.origin.distanceTo( intersectionPoint );

				if ( distance < precision || distance < raycaster.near || distance > raycaster.far ) continue;

				intersects.push( {

					distance: distance,
					point: intersectionPoint,
					face: face,
					faceIndex: f,
					object: this

				} );

			}

		}

	};

}() );

THREE.Mesh.prototype.clone = function ( object, recursive ) {

	if ( object === undefined ) object = new THREE.Mesh( this.geometry, this.material );

	THREE.Object3D.prototype.clone.call( this, object, recursive );

	return object;

};

// File:src/objects/Bone.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */

THREE.Bone = function ( belongsToSkin ) {

	THREE.Object3D.call( this );

	this.skin = belongsToSkin;

};

THREE.Bone.prototype = Object.create( THREE.Object3D.prototype );


// File:src/objects/Skeleton.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author michael guerrero / http://realitymeltdown.com
 * @author ikerr / http://verold.com
 */

THREE.Skeleton = function ( bones, boneInverses, useVertexTexture ) {

	this.useVertexTexture = useVertexTexture !== undefined ? useVertexTexture : true;

	this.identityMatrix = new THREE.Matrix4();

	// copy the bone array

	bones = bones || [];

	this.bones = bones.slice( 0 );

	// create a bone texture or an array of floats

	if ( this.useVertexTexture ) {

		// layout (1 matrix = 4 pixels)
		//      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
		//  with  8x8  pixel texture max   16 bones  (8 * 8  / 4)
		//       16x16 pixel texture max   64 bones (16 * 16 / 4)
		//       32x32 pixel texture max  256 bones (32 * 32 / 4)
		//       64x64 pixel texture max 1024 bones (64 * 64 / 4)

		var size;

		if ( this.bones.length > 256 )
			size = 64;
		else if ( this.bones.length > 64 )
			size = 32;
		else if ( this.bones.length > 16 )
			size = 16;
		else
			size = 8;

		this.boneTextureWidth = size;
		this.boneTextureHeight = size;

		this.boneMatrices = new Float32Array( this.boneTextureWidth * this.boneTextureHeight * 4 ); // 4 floats per RGBA pixel
		this.boneTexture = new THREE.DataTexture( this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType );
		this.boneTexture.minFilter = THREE.NearestFilter;
		this.boneTexture.magFilter = THREE.NearestFilter;
		this.boneTexture.generateMipmaps = false;
		this.boneTexture.flipY = false;

	} else {

		this.boneMatrices = new Float32Array( 16 * this.bones.length );

	}

	// use the supplied bone inverses or calculate the inverses

	if ( boneInverses === undefined ) {

		this.calculateInverses();

	} else {

		if ( this.bones.length === boneInverses.length ) {

			this.boneInverses = boneInverses.slice( 0 );

		} else {

			console.warn( 'THREE.Skeleton bonInverses is the wrong length.' );

			this.boneInverses = [];

			for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

				this.boneInverses.push( new THREE.Matrix4() );

			}

		}

	}

};

THREE.Skeleton.prototype.calculateInverses = function () {

	this.boneInverses = [];

	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		var inverse = new THREE.Matrix4();

		if ( this.bones[ b ] ) {

			inverse.getInverse( this.bones[ b ].matrixWorld );

		}

		this.boneInverses.push( inverse );

	}

};

THREE.Skeleton.prototype.pose = function () {

	var bone;

	// recover the bind-time world matrices

	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		bone = this.bones[ b ];

		if ( bone ) {

			bone.matrixWorld.getInverse( this.boneInverses[ b ] );

		}

	}

	// compute the local matrices, positions, rotations and scales

	for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

		bone = this.bones[ b ];

		if ( bone ) {

			if ( bone.parent ) {

				bone.matrix.getInverse( bone.parent.matrixWorld );
				bone.matrix.multiply( bone.matrixWorld );

			} else {

				bone.matrix.copy( bone.matrixWorld );

			}

			bone.matrix.decompose( bone.position, bone.quaternion, bone.scale );

		}

	}

};

THREE.Skeleton.prototype.update = ( function () {

	var offsetMatrix = new THREE.Matrix4();
	
	return function () {

		// flatten bone matrices to array

		for ( var b = 0, bl = this.bones.length; b < bl; b ++ ) {

			// compute the offset between the current and the original transform

			var matrix = this.bones[ b ] ? this.bones[ b ].matrixWorld : this.identityMatrix;

			offsetMatrix.multiplyMatrices( matrix, this.boneInverses[ b ] );
			offsetMatrix.flattenToArrayOffset( this.boneMatrices, b * 16 );

		}

		if ( this.useVertexTexture ) {

			this.boneTexture.needsUpdate = true;

		}
		
	};

} )();


// File:src/objects/SkinnedMesh.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author ikerr / http://verold.com
 */

THREE.SkinnedMesh = function ( geometry, material, useVertexTexture ) {

	THREE.Mesh.call( this, geometry, material );

	this.type = 'SkinnedMesh';

	this.bindMode = "attached";
	this.bindMatrix = new THREE.Matrix4();
	this.bindMatrixInverse = new THREE.Matrix4();

	// init bones

	// TODO: remove bone creation as there is no reason (other than
	// convenience) for THREE.SkinnedMesh to do this.

	var bones = [];

	if ( this.geometry && this.geometry.bones !== undefined ) {

		var bone, gbone, p, q, s;

		for ( var b = 0, bl = this.geometry.bones.length; b < bl; ++b ) {

			gbone = this.geometry.bones[ b ];

			p = gbone.pos;
			q = gbone.rotq;
			s = gbone.scl;

			bone = new THREE.Bone( this );
			bones.push( bone );

			bone.name = gbone.name;
			bone.position.set( p[ 0 ], p[ 1 ], p[ 2 ] );
			bone.quaternion.set( q[ 0 ], q[ 1 ], q[ 2 ], q[ 3 ] );

			if ( s !== undefined ) {

				bone.scale.set( s[ 0 ], s[ 1 ], s[ 2 ] );

			} else {

				bone.scale.set( 1, 1, 1 );

			}

		}

		for ( var b = 0, bl = this.geometry.bones.length; b < bl; ++b ) {

			gbone = this.geometry.bones[ b ];

			if ( gbone.parent !== - 1 ) {

				bones[ gbone.parent ].add( bones[ b ] );

			} else {

				this.add( bones[ b ] );

			}

		}

	}

	this.normalizeSkinWeights();

	this.updateMatrixWorld( true );
	this.bind( new THREE.Skeleton( bones, undefined, useVertexTexture ) );

};


THREE.SkinnedMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.SkinnedMesh.prototype.bind = function( skeleton, bindMatrix ) {

	this.skeleton = skeleton;

	if ( bindMatrix === undefined ) {

		this.updateMatrixWorld( true );

		bindMatrix = this.matrixWorld;

	}

	this.bindMatrix.copy( bindMatrix );
	this.bindMatrixInverse.getInverse( bindMatrix );

};

THREE.SkinnedMesh.prototype.pose = function () {

	this.skeleton.pose();

};

THREE.SkinnedMesh.prototype.normalizeSkinWeights = function () {

	if ( this.geometry instanceof THREE.Geometry ) {

		for ( var i = 0; i < this.geometry.skinIndices.length; i ++ ) {

			var sw = this.geometry.skinWeights[ i ];

			var scale = 1.0 / sw.lengthManhattan();

			if ( scale !== Infinity ) {

				sw.multiplyScalar( scale );

			} else {

				sw.set( 1 ); // this will be normalized by the shader anyway

			}

		}

	} else {

		// skinning weights assumed to be normalized for THREE.BufferGeometry

	}

};

THREE.SkinnedMesh.prototype.updateMatrixWorld = function( force ) {

	THREE.Mesh.prototype.updateMatrixWorld.call( this, true );

	if ( this.bindMode === "attached" ) {

		this.bindMatrixInverse.getInverse( this.matrixWorld );

	} else if ( this.bindMode === "detached" ) {

		this.bindMatrixInverse.getInverse( this.bindMatrix );

	} else {

		console.warn( 'THREE.SkinnedMesh unreckognized bindMode: ' + this.bindMode );

	}

};

THREE.SkinnedMesh.prototype.clone = function( object ) {

	if ( object === undefined ) {

		object = new THREE.SkinnedMesh( this.geometry, this.material, this.useVertexTexture );

	}

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};


// File:src/objects/MorphAnimMesh.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MorphAnimMesh = function ( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	this.type = 'MorphAnimMesh';

	// API

	this.duration = 1000; // milliseconds
	this.mirroredLoop = false;
	this.time = 0;

	// internals

	this.lastKeyframe = 0;
	this.currentKeyframe = 0;

	this.direction = 1;
	this.directionBackwards = false;

	this.setFrameRange( 0, this.geometry.morphTargets.length - 1 );

};

THREE.MorphAnimMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.MorphAnimMesh.prototype.setFrameRange = function ( start, end ) {

	this.startKeyframe = start;
	this.endKeyframe = end;

	this.length = this.endKeyframe - this.startKeyframe + 1;

};

THREE.MorphAnimMesh.prototype.setDirectionForward = function () {

	this.direction = 1;
	this.directionBackwards = false;

};

THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {

	this.direction = - 1;
	this.directionBackwards = true;

};

THREE.MorphAnimMesh.prototype.parseAnimations = function () {

	var geometry = this.geometry;

	if ( ! geometry.animations ) geometry.animations = {};

	var firstAnimation, animations = geometry.animations;

	var pattern = /([a-z]+)_?(\d+)/;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {

		var morph = geometry.morphTargets[ i ];
		var parts = morph.name.match( pattern );

		if ( parts && parts.length > 1 ) {

			var label = parts[ 1 ];
			var num = parts[ 2 ];

			if ( ! animations[ label ] ) animations[ label ] = { start: Infinity, end: - Infinity };

			var animation = animations[ label ];

			if ( i < animation.start ) animation.start = i;
			if ( i > animation.end ) animation.end = i;

			if ( ! firstAnimation ) firstAnimation = label;

		}

	}

	geometry.firstAnimation = firstAnimation;

};

THREE.MorphAnimMesh.prototype.setAnimationLabel = function ( label, start, end ) {

	if ( ! this.geometry.animations ) this.geometry.animations = {};

	this.geometry.animations[ label ] = { start: start, end: end };

};

THREE.MorphAnimMesh.prototype.playAnimation = function ( label, fps ) {

	var animation = this.geometry.animations[ label ];

	if ( animation ) {

		this.setFrameRange( animation.start, animation.end );
		this.duration = 1000 * ( ( animation.end - animation.start ) / fps );
		this.time = 0;

	} else {

		console.warn( 'animation[' + label + '] undefined' );

	}

};

THREE.MorphAnimMesh.prototype.updateAnimation = function ( delta ) {

	var frameTime = this.duration / this.length;

	this.time += this.direction * delta;

	if ( this.mirroredLoop ) {

		if ( this.time > this.duration || this.time < 0 ) {

			this.direction *= - 1;

			if ( this.time > this.duration ) {

				this.time = this.duration;
				this.directionBackwards = true;

			}

			if ( this.time < 0 ) {

				this.time = 0;
				this.directionBackwards = false;

			}

		}

	} else {

		this.time = this.time % this.duration;

		if ( this.time < 0 ) this.time += this.duration;

	}

	var keyframe = this.startKeyframe + THREE.Math.clamp( Math.floor( this.time / frameTime ), 0, this.length - 1 );

	if ( keyframe !== this.currentKeyframe ) {

		this.morphTargetInfluences[ this.lastKeyframe ] = 0;
		this.morphTargetInfluences[ this.currentKeyframe ] = 1;

		this.morphTargetInfluences[ keyframe ] = 0;

		this.lastKeyframe = this.currentKeyframe;
		this.currentKeyframe = keyframe;

	}

	var mix = ( this.time % frameTime ) / frameTime;

	if ( this.directionBackwards ) {

		mix = 1 - mix;

	}

	this.morphTargetInfluences[ this.currentKeyframe ] = mix;
	this.morphTargetInfluences[ this.lastKeyframe ] = 1 - mix;

};

THREE.MorphAnimMesh.prototype.interpolateTargets = function ( a, b, t ) {

	var influences = this.morphTargetInfluences;

	for ( var i = 0, l = influences.length; i < l; i ++ ) {

		influences[ i ] = 0;

	}

	if ( a > -1 ) influences[ a ] = 1 - t;
	if ( b > -1 ) influences[ b ] = t;

};

THREE.MorphAnimMesh.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.MorphAnimMesh( this.geometry, this.material );

	object.duration = this.duration;
	object.mirroredLoop = this.mirroredLoop;
	object.time = this.time;

	object.lastKeyframe = this.lastKeyframe;
	object.currentKeyframe = this.currentKeyframe;

	object.direction = this.direction;
	object.directionBackwards = this.directionBackwards;

	THREE.Mesh.prototype.clone.call( this, object );

	return object;

};

// File:src/objects/LOD.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.LOD = function () {

	THREE.Object3D.call( this );

	this.objects = [];

};


THREE.LOD.prototype = Object.create( THREE.Object3D.prototype );

THREE.LOD.prototype.addLevel = function ( object, distance ) {

	if ( distance === undefined ) distance = 0;

	distance = Math.abs( distance );

	for ( var l = 0; l < this.objects.length; l ++ ) {

		if ( distance < this.objects[ l ].distance ) {

			break;

		}

	}

	this.objects.splice( l, 0, { distance: distance, object: object } );
	this.add( object );

};

THREE.LOD.prototype.getObjectForDistance = function ( distance ) {

	for ( var i = 1, l = this.objects.length; i < l; i ++ ) {

		if ( distance < this.objects[ i ].distance ) {

			break;

		}

	}

	return this.objects[ i - 1 ].object;

};

THREE.LOD.prototype.raycast = ( function () {

	var matrixPosition = new THREE.Vector3();

	return function ( raycaster, intersects ) {

		matrixPosition.setFromMatrixPosition( this.matrixWorld );

		var distance = raycaster.ray.origin.distanceTo( matrixPosition );

		this.getObjectForDistance( distance ).raycast( raycaster, intersects );

	};

}() );

THREE.LOD.prototype.update = function () {

	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();

	return function ( camera ) {

		if ( this.objects.length > 1 ) {

			v1.setFromMatrixPosition( camera.matrixWorld );
			v2.setFromMatrixPosition( this.matrixWorld );

			var distance = v1.distanceTo( v2 );

			this.objects[ 0 ].object.visible = true;

			for ( var i = 1, l = this.objects.length; i < l; i ++ ) {

				if ( distance >= this.objects[ i ].distance ) {

					this.objects[ i - 1 ].object.visible = false;
					this.objects[ i     ].object.visible = true;

				} else {

					break;

				}

			}

			for ( ; i < l; i ++ ) {

				this.objects[ i ].object.visible = false;

			}

		}

	};

}();

THREE.LOD.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.LOD();

	THREE.Object3D.prototype.clone.call( this, object );

	for ( var i = 0, l = this.objects.length; i < l; i ++ ) {
		var x = this.objects[ i ].object.clone();
		x.visible = i === 0;
		object.addLevel( x, this.objects[ i ].distance );
	}

	return object;

};

// File:src/objects/Sprite.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Sprite = ( function () {

	var indices = new Uint16Array( [ 0, 1, 2,  0, 2, 3 ] );
	var vertices = new Float32Array( [ - 0.5, - 0.5, 0,   0.5, - 0.5, 0,   0.5, 0.5, 0,   - 0.5, 0.5, 0 ] );
	var uvs = new Float32Array( [ 0, 0,   1, 0,   1, 1,   0, 1 ] );

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

	return function ( material ) {

		THREE.Object3D.call( this );

		this.type = 'Sprite';

		this.geometry = geometry;
		this.material = ( material !== undefined ) ? material : new THREE.SpriteMaterial();

	};

} )();

THREE.Sprite.prototype = Object.create( THREE.Object3D.prototype );

THREE.Sprite.prototype.raycast = ( function () {

	var matrixPosition = new THREE.Vector3();

	return function ( raycaster, intersects ) {

		matrixPosition.setFromMatrixPosition( this.matrixWorld );

		var distance = raycaster.ray.distanceToPoint( matrixPosition );

		if ( distance > this.scale.x ) {

			return;

		}

		intersects.push( {

			distance: distance,
			point: this.position,
			face: null,
			object: this

		} );

	};

}() );

THREE.Sprite.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Sprite( this.material );

	THREE.Object3D.prototype.clone.call( this, object );

	return object;

};

// Backwards compatibility

THREE.Particle = THREE.Sprite;

// File:src/objects/LensFlare.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlare = function ( texture, size, distance, blending, color ) {

	THREE.Object3D.call( this );

	this.lensFlares = [];

	this.positionScreen = new THREE.Vector3();
	this.customUpdateCallback = undefined;

	if( texture !== undefined ) {

		this.add( texture, size, distance, blending, color );

	}

};

THREE.LensFlare.prototype = Object.create( THREE.Object3D.prototype );


/*
 * Add: adds another flare
 */

THREE.LensFlare.prototype.add = function ( texture, size, distance, blending, color, opacity ) {

	if ( size === undefined ) size = - 1;
	if ( distance === undefined ) distance = 0;
	if ( opacity === undefined ) opacity = 1;
	if ( color === undefined ) color = new THREE.Color( 0xffffff );
	if ( blending === undefined ) blending = THREE.NormalBlending;

	distance = Math.min( distance, Math.max( 0, distance ) );

	this.lensFlares.push( {
		texture: texture, 			// THREE.Texture
		size: size, 				// size in pixels (-1 = use texture.width)
		distance: distance, 		// distance (0-1) from light source (0=at light source)
		x: 0, y: 0, z: 0,			// screen position (-1 => 1) z = 0 is ontop z = 1 is back
		scale: 1, 					// scale
		rotation: 1, 				// rotation
		opacity: opacity,			// opacity
		color: color,				// color
		blending: blending			// blending
	} );

};

/*
 * Update lens flares update positions on all flares based on the screen position
 * Set myLensFlare.customUpdateCallback to alter the flares in your project specific way.
 */

THREE.LensFlare.prototype.updateLensFlares = function () {

	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = - this.positionScreen.x * 2;
	var vecY = - this.positionScreen.y * 2;

	for( f = 0; f < fl; f ++ ) {

		flare = this.lensFlares[ f ];

		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;

		flare.wantedRotation = flare.x * Math.PI * 0.25;
		flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;

	}

};


// File:src/scenes/Scene.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Scene = function () {

	THREE.Object3D.call( this );

	this.type = 'Scene';

	this.fog = null;
	this.overrideMaterial = null;

	this.autoUpdate = true; // checked by the renderer

};

THREE.Scene.prototype = Object.create( THREE.Object3D.prototype );

THREE.Scene.prototype.clone = function ( object ) {

	if ( object === undefined ) object = new THREE.Scene();

	THREE.Object3D.prototype.clone.call( this, object );

	if ( this.fog !== null ) object.fog = this.fog.clone();
	if ( this.overrideMaterial !== null ) object.overrideMaterial = this.overrideMaterial.clone();

	object.autoUpdate = this.autoUpdate;
	object.matrixAutoUpdate = this.matrixAutoUpdate;

	return object;

};

// File:src/scenes/Fog.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Fog = function ( color, near, far ) {

	this.name = '';

	this.color = new THREE.Color( color );

	this.near = ( near !== undefined ) ? near : 1;
	this.far = ( far !== undefined ) ? far : 1000;

};

THREE.Fog.prototype.clone = function () {

	return new THREE.Fog( this.color.getHex(), this.near, this.far );

};

// File:src/scenes/FogExp2.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.FogExp2 = function ( color, density ) {

	this.name = '';

	this.color = new THREE.Color( color );
	this.density = ( density !== undefined ) ? density : 0.00025;

};

THREE.FogExp2.prototype.clone = function () {

	return new THREE.FogExp2( this.color.getHex(), this.density );

};

// File:src/renderers/shaders/ShaderChunk.js

THREE.ShaderChunk = {};

// File:src/renderers/shaders/ShaderChunk/alphatest_fragment.glsl

THREE.ShaderChunk[ 'alphatest_fragment'] = "#ifdef ALPHATEST\n\n	if ( gl_FragColor.a < ALPHATEST ) discard;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/lights_lambert_vertex.glsl

THREE.ShaderChunk[ 'lights_lambert_vertex'] = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n	vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n	vec3 dirVector = normalize( lDirection.xyz );\n\n	float dotProduct = dot( transformedNormal, dirVector );\n	vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n	#ifdef DOUBLE_SIDED\n\n		vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n		#ifdef WRAP_AROUND\n\n			vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n		#endif\n\n	#endif\n\n	#ifdef WRAP_AROUND\n\n		vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n		directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n		#ifdef DOUBLE_SIDED\n\n			directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n		#endif\n\n	#endif\n\n	vLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n	#ifdef DOUBLE_SIDED\n\n		vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n	#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n		float dotProduct = dot( transformedNormal, lVector );\n\n		vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n		#ifdef DOUBLE_SIDED\n\n			vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n			#ifdef WRAP_AROUND\n\n				vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n			#endif\n\n		#endif\n\n		#ifdef WRAP_AROUND\n\n			vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n			pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n			#ifdef DOUBLE_SIDED\n\n				pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n			#endif\n\n		#endif\n\n		vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n\n		#endif\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n			float lDistance = 1.0;\n			if ( spotLightDistance[ i ] > 0.0 )\n				lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n			lVector = normalize( lVector );\n\n			float dotProduct = dot( transformedNormal, lVector );\n			vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n			#ifdef DOUBLE_SIDED\n\n				vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n				#ifdef WRAP_AROUND\n\n					vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n				#endif\n\n			#endif\n\n			#ifdef WRAP_AROUND\n\n				vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n				spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n				#ifdef DOUBLE_SIDED\n\n					spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n				#endif\n\n			#endif\n\n			vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n\n			#ifdef DOUBLE_SIDED\n\n				vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n\n			#endif\n\n		}\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n\n		float dotProduct = dot( transformedNormal, lVector );\n\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n		float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n		vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		#ifdef DOUBLE_SIDED\n\n			vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n		#endif\n\n	}\n\n#endif\n\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n\n#ifdef DOUBLE_SIDED\n\n	vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/map_particle_pars_fragment.glsl

THREE.ShaderChunk[ 'map_particle_pars_fragment'] = "#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/default_vertex.glsl

THREE.ShaderChunk[ 'default_vertex'] = "vec4 mvPosition;\n\n#ifdef USE_SKINNING\n\n	mvPosition = modelViewMatrix * skinned;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\n\n	mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\n\n	mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;";

// File:src/renderers/shaders/ShaderChunk/map_pars_fragment.glsl

THREE.ShaderChunk[ 'map_pars_fragment'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n	uniform sampler2D map;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/skinnormal_vertex.glsl

THREE.ShaderChunk[ 'skinnormal_vertex'] = "#ifdef USE_SKINNING\n\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n	#ifdef USE_MORPHNORMALS\n\n	vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n	#else\n\n	vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n	#endif\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_vertex.glsl

THREE.ShaderChunk[ 'logdepthbuf_pars_vertex'] = "#ifdef USE_LOGDEPTHBUF\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		varying float vFragDepth;\n\n	#endif\n\n	uniform float logDepthBufFC;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lightmap_pars_vertex.glsl

THREE.ShaderChunk[ 'lightmap_pars_vertex'] = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lights_phong_fragment.glsl

THREE.ShaderChunk[ 'lights_phong_fragment'] = "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef DOUBLE_SIDED\n\n	normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n#endif\n\n#ifdef USE_NORMALMAP\n\n	normal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	vec3 pointDiffuse = vec3( 0.0 );\n	vec3 pointSpecular = vec3( 0.0 );\n\n	for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( pointLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n\n				// diffuse\n\n		float dotProduct = dot( normal, lVector );\n\n		#ifdef WRAP_AROUND\n\n			float pointDiffuseWeightFull = max( dotProduct, 0.0 );\n			float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float pointDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		pointDiffuse += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\n\n				// specular\n\n		vec3 pointHalfVector = normalize( lVector + viewPosition );\n		float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n		float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n		pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n\n	}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	vec3 spotDiffuse = vec3( 0.0 );\n	vec3 spotSpecular = vec3( 0.0 );\n\n	for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n		vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n		vec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n		float lDistance = 1.0;\n		if ( spotLightDistance[ i ] > 0.0 )\n			lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\n\n		lVector = normalize( lVector );\n\n		float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n		if ( spotEffect > spotLightAngleCos[ i ] ) {\n\n			spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n					// diffuse\n\n			float dotProduct = dot( normal, lVector );\n\n			#ifdef WRAP_AROUND\n\n				float spotDiffuseWeightFull = max( dotProduct, 0.0 );\n				float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n				vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n			#else\n\n				float spotDiffuseWeight = max( dotProduct, 0.0 );\n\n			#endif\n\n			spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\n\n					// specular\n\n			vec3 spotHalfVector = normalize( lVector + viewPosition );\n			float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n			float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n			float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n			spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n\n		}\n\n	}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n	vec3 dirDiffuse = vec3( 0.0 );\n	vec3 dirSpecular = vec3( 0.0 );\n\n	for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\n		vec3 dirVector = normalize( lDirection.xyz );\n\n				// diffuse\n\n		float dotProduct = dot( normal, dirVector );\n\n		#ifdef WRAP_AROUND\n\n			float dirDiffuseWeightFull = max( dotProduct, 0.0 );\n			float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n			vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n		#else\n\n			float dirDiffuseWeight = max( dotProduct, 0.0 );\n\n		#endif\n\n		dirDiffuse += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\n\n		// specular\n\n		vec3 dirHalfVector = normalize( dirVector + viewPosition );\n		float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n		float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n		/*\n		// fresnel term from skin shader\n		const float F0 = 0.128;\n\n		float base = 1.0 - dot( viewPosition, dirHalfVector );\n		float exponential = pow( base, 5.0 );\n\n		float fresnel = exponential + F0 * ( 1.0 - exponential );\n		*/\n\n		/*\n		// fresnel term from fresnel shader\n		const float mFresnelBias = 0.08;\n		const float mFresnelScale = 0.3;\n		const float mFresnelPower = 5.0;\n\n		float fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n		*/\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		// 		dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n		vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n		dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n	}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	vec3 hemiDiffuse = vec3( 0.0 );\n	vec3 hemiSpecular = vec3( 0.0 );\n\n	for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n		vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\n		vec3 lVector = normalize( lDirection.xyz );\n\n		// diffuse\n\n		float dotProduct = dot( normal, lVector );\n		float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n		vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n		hemiDiffuse += diffuse * hemiColor;\n\n		// specular (sky light)\n\n		vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n		float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n		float hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n		// specular (ground light)\n\n		vec3 lVectorGround = -lVector;\n\n		vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n		float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n		float hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n		float dotProductGround = dot( normal, lVectorGround );\n\n		float specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n		vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n		vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n		hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n	}\n\n#endif\n\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n\n#if MAX_DIR_LIGHTS > 0\n\n	totalDiffuse += dirDiffuse;\n	totalSpecular += dirSpecular;\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	totalDiffuse += hemiDiffuse;\n	totalSpecular += hemiSpecular;\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	totalDiffuse += pointDiffuse;\n	totalSpecular += pointSpecular;\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	totalDiffuse += spotDiffuse;\n	totalSpecular += spotSpecular;\n\n#endif\n\n#ifdef METAL\n\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n\n#else\n\n	gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/fog_pars_fragment.glsl

THREE.ShaderChunk[ 'fog_pars_fragment'] = "#ifdef USE_FOG\n\n	uniform vec3 fogColor;\n\n	#ifdef FOG_EXP2\n\n		uniform float fogDensity;\n\n	#else\n\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/morphnormal_vertex.glsl

THREE.ShaderChunk[ 'morphnormal_vertex'] = "#ifdef USE_MORPHNORMALS\n\n	vec3 morphedNormal = vec3( 0.0 );\n\n	morphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n	morphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n	morphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n	morphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n	morphedNormal += normal;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/envmap_pars_fragment.glsl

THREE.ShaderChunk[ 'envmap_pars_fragment'] = "#ifdef USE_ENVMAP\n\n	uniform float reflectivity;\n	uniform samplerCube envMap;\n	uniform float flipEnvMap;\n	uniform int combine;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		uniform bool useRefract;\n		uniform float refractionRatio;\n\n	#else\n\n		varying vec3 vReflect;\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/logdepthbuf_fragment.glsl

THREE.ShaderChunk[ 'logdepthbuf_fragment'] = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n	gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/normalmap_pars_fragment.glsl

THREE.ShaderChunk[ 'normalmap_pars_fragment'] = "#ifdef USE_NORMALMAP\n\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n\n			// Per-Pixel Tangent Space Normal Mapping\n			// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( vUv.st );\n		vec2 st1 = dFdy( vUv.st );\n\n		vec3 S = normalize( q0 * st1.t - q1 * st0.t );\n		vec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n		vec3 N = normalize( surf_norm );\n\n		vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n		mapN.xy = normalScale * mapN.xy;\n		mat3 tsn = mat3( S, T, N );\n		return normalize( tsn * mapN );\n\n	}\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/lights_phong_pars_vertex.glsl

THREE.ShaderChunk[ 'lights_phong_pars_vertex'] = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/lightmap_pars_fragment.glsl

THREE.ShaderChunk[ 'lightmap_pars_fragment'] = "#ifdef USE_LIGHTMAP\n\n	varying vec2 vUv2;\n	uniform sampler2D lightMap;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/shadowmap_vertex.glsl

THREE.ShaderChunk[ 'shadowmap_vertex'] = "#ifdef USE_SHADOWMAP\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n	}\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lights_phong_vertex.glsl

THREE.ShaderChunk[ 'lights_phong_vertex'] = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	vWorldPosition = worldPosition.xyz;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/map_fragment.glsl

THREE.ShaderChunk[ 'map_fragment'] = "#ifdef USE_MAP\n\n	vec4 texelColor = texture2D( map, vUv );\n\n	#ifdef GAMMA_INPUT\n\n		texelColor.xyz *= texelColor.xyz;\n\n	#endif\n\n	gl_FragColor = gl_FragColor * texelColor;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lightmap_vertex.glsl

THREE.ShaderChunk[ 'lightmap_vertex'] = "#ifdef USE_LIGHTMAP\n\n	vUv2 = uv2;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/map_particle_fragment.glsl

THREE.ShaderChunk[ 'map_particle_fragment'] = "#ifdef USE_MAP\n\n	gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/color_pars_fragment.glsl

THREE.ShaderChunk[ 'color_pars_fragment'] = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/color_vertex.glsl

THREE.ShaderChunk[ 'color_vertex'] = "#ifdef USE_COLOR\n\n	#ifdef GAMMA_INPUT\n\n		vColor = color * color;\n\n	#else\n\n		vColor = color;\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/skinning_vertex.glsl

THREE.ShaderChunk[ 'skinning_vertex'] = "#ifdef USE_SKINNING\n\n	#ifdef USE_MORPHTARGETS\n\n	vec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n	#else\n\n	vec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n	#endif\n\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	skinned  = bindMatrixInverse * skinned;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/envmap_pars_vertex.glsl

THREE.ShaderChunk[ 'envmap_pars_vertex'] = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	varying vec3 vReflect;\n\n	uniform float refractionRatio;\n	uniform bool useRefract;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/linear_to_gamma_fragment.glsl

THREE.ShaderChunk[ 'linear_to_gamma_fragment'] = "#ifdef GAMMA_OUTPUT\n\n	gl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/color_pars_vertex.glsl

THREE.ShaderChunk[ 'color_pars_vertex'] = "#ifdef USE_COLOR\n\n	varying vec3 vColor;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lights_lambert_pars_vertex.glsl

THREE.ShaderChunk[ 'lights_lambert_pars_vertex'] = "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\n\nuniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/map_pars_vertex.glsl

THREE.ShaderChunk[ 'map_pars_vertex'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	varying vec2 vUv;\n	uniform vec4 offsetRepeat;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/envmap_fragment.glsl

THREE.ShaderChunk[ 'envmap_fragment'] = "#ifdef USE_ENVMAP\n\n	vec3 reflectVec;\n\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n		// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\n		// Transforming Normal Vectors with the Inverse Transformation\n\n		vec3 worldNormal = normalize( vec3( vec4( normal, 0.0 ) * viewMatrix ) );\n\n		if ( useRefract ) {\n\n			reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n		} else { \n\n			reflectVec = reflect( cameraToVertex, worldNormal );\n\n		}\n\n	#else\n\n		reflectVec = vReflect;\n\n	#endif\n\n	#ifdef DOUBLE_SIDED\n\n		float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n		vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#else\n\n		vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n	#endif\n\n	#ifdef GAMMA_INPUT\n\n		cubeColor.xyz *= cubeColor.xyz;\n\n	#endif\n\n	if ( combine == 1 ) {\n\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n\n	} else if ( combine == 2 ) {\n\n		gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n\n	} else {\n\n		gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n\n	}\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/specularmap_pars_fragment.glsl

THREE.ShaderChunk[ 'specularmap_pars_fragment'] = "#ifdef USE_SPECULARMAP\n\n	uniform sampler2D specularMap;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/logdepthbuf_vertex.glsl

THREE.ShaderChunk[ 'logdepthbuf_vertex'] = "#ifdef USE_LOGDEPTHBUF\n\n	gl_Position.z = log2(max(1e-6, gl_Position.w + 1.0)) * logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		vFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n		gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/morphtarget_pars_vertex.glsl

THREE.ShaderChunk[ 'morphtarget_pars_vertex'] = "#ifdef USE_MORPHTARGETS\n\n	#ifndef USE_MORPHNORMALS\n\n	uniform float morphTargetInfluences[ 8 ];\n\n	#else\n\n	uniform float morphTargetInfluences[ 4 ];\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/specularmap_fragment.glsl

THREE.ShaderChunk[ 'specularmap_fragment'] = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n	vec4 texelSpecular = texture2D( specularMap, vUv );\n	specularStrength = texelSpecular.r;\n\n#else\n\n	specularStrength = 1.0;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/fog_fragment.glsl

THREE.ShaderChunk[ 'fog_fragment'] = "#ifdef USE_FOG\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		float depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n	#else\n\n		float depth = gl_FragCoord.z / gl_FragCoord.w;\n\n	#endif\n\n	#ifdef FOG_EXP2\n\n		const float LOG2 = 1.442695;\n		float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\n		fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n\n	#else\n\n		float fogFactor = smoothstep( fogNear, fogFar, depth );\n\n	#endif\n	\n	gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/bumpmap_pars_fragment.glsl

THREE.ShaderChunk[ 'bumpmap_pars_fragment'] = "#ifdef USE_BUMPMAP\n\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n\n			// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n			//	http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n			// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n	vec2 dHdxy_fwd() {\n\n		vec2 dSTdx = dFdx( vUv );\n		vec2 dSTdy = dFdy( vUv );\n\n		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n		return vec2( dBx, dBy );\n\n	}\n\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n		vec3 vSigmaX = dFdx( surf_pos );\n		vec3 vSigmaY = dFdy( surf_pos );\n		vec3 vN = surf_norm;		// normalized\n\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n\n		float fDet = dot( vSigmaX, R1 );\n\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n\n	}\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/defaultnormal_vertex.glsl

THREE.ShaderChunk[ 'defaultnormal_vertex'] = "vec3 objectNormal;\n\n#ifdef USE_SKINNING\n\n	objectNormal = skinnedNormal.xyz;\n\n#endif\n\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\n\n	objectNormal = morphedNormal;\n\n#endif\n\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\n\n	objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n	objectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;";

// File:src/renderers/shaders/ShaderChunk/lights_phong_pars_fragment.glsl

THREE.ShaderChunk[ 'lights_phong_pars_fragment'] = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\n	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n	varying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n	uniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;";

// File:src/renderers/shaders/ShaderChunk/skinbase_vertex.glsl

THREE.ShaderChunk[ 'skinbase_vertex'] = "#ifdef USE_SKINNING\n\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/map_vertex.glsl

THREE.ShaderChunk[ 'map_vertex'] = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n	vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/lightmap_fragment.glsl

THREE.ShaderChunk[ 'lightmap_fragment'] = "#ifdef USE_LIGHTMAP\n\n	gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/shadowmap_pars_vertex.glsl

THREE.ShaderChunk[ 'shadowmap_pars_vertex'] = "#ifdef USE_SHADOWMAP\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n	uniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/color_fragment.glsl

THREE.ShaderChunk[ 'color_fragment'] = "#ifdef USE_COLOR\n\n	gl_FragColor = gl_FragColor * vec4( vColor, 1.0 );\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/morphtarget_vertex.glsl

THREE.ShaderChunk[ 'morphtarget_vertex'] = "#ifdef USE_MORPHTARGETS\n\n	vec3 morphed = vec3( 0.0 );\n	morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n	morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n	morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n	morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n	#ifndef USE_MORPHNORMALS\n\n	morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n	morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n	morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n	morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n	#endif\n\n	morphed += position;\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/envmap_vertex.glsl

THREE.ShaderChunk[ 'envmap_vertex'] = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n	vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\n	worldNormal = normalize( worldNormal );\n\n	vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n	if ( useRefract ) {\n\n		vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n	} else {\n\n		vReflect = reflect( cameraToVertex, worldNormal );\n\n	}\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/shadowmap_fragment.glsl

THREE.ShaderChunk[ 'shadowmap_fragment'] = "#ifdef USE_SHADOWMAP\n\n	#ifdef SHADOWMAP_DEBUG\n\n		vec3 frustumColors[3];\n		frustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n		frustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n		frustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n	#endif\n\n	#ifdef SHADOWMAP_CASCADE\n\n		int inFrustumCount = 0;\n\n	#endif\n\n	float fDepth;\n	vec3 shadowColor = vec3( 1.0 );\n\n	for( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n		vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n				// if ( something && something ) breaks ATI OpenGL shader compiler\n				// if ( all( something, something ) ) using this instead\n\n		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n		bool inFrustum = all( inFrustumVec );\n\n				// don't shadow pixels outside of light frustum\n				// use just first frustum (for cascades)\n				// don't shadow pixels behind far plane of light frustum\n\n		#ifdef SHADOWMAP_CASCADE\n\n			inFrustumCount += int( inFrustum );\n			bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n		#else\n\n			bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n		#endif\n\n		bool frustumTest = all( frustumTestVec );\n\n		if ( frustumTest ) {\n\n			shadowCoord.z += shadowBias[ i ];\n\n			#if defined( SHADOWMAP_TYPE_PCF )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n		/*\n						// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n						// must enroll loop manually\n\n				for ( float y = -1.25; y <= 1.25; y += 1.25 )\n					for ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n						vec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n								// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n								//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n						float fDepth = unpackDepth( rgbaDepth );\n\n						if ( fDepth < shadowCoord.z )\n							shadow += 1.0;\n\n				}\n\n				shadow /= 9.0;\n\n		*/\n\n				const float shadowDelta = 1.0 / 9.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.25 * xPixelOffset;\n				float dy0 = -1.25 * yPixelOffset;\n				float dx1 = 1.25 * xPixelOffset;\n				float dy1 = 1.25 * yPixelOffset;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n				if ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n						// Percentage-close filtering\n						// (9 pixel kernel)\n						// http://fabiensanglard.net/shadowmappingPCF/\n\n				float shadow = 0.0;\n\n				float xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n				float yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n				float dx0 = -1.0 * xPixelOffset;\n				float dy0 = -1.0 * yPixelOffset;\n				float dx1 = 1.0 * xPixelOffset;\n				float dy1 = 1.0 * yPixelOffset;\n\n				mat3 shadowKernel;\n				mat3 depthKernel;\n\n				depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n				depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n				depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n				depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n				depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n				depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n				depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n				depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n				depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n				vec3 shadowZ = vec3( shadowCoord.z );\n				shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n				shadowKernel[0] *= vec3(0.25);\n\n				shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n				shadowKernel[1] *= vec3(0.25);\n\n				shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n				shadowKernel[2] *= vec3(0.25);\n\n				vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n				shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n				shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n				vec4 shadowValues;\n				shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n				shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n				shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n				shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n				shadow = dot( shadowValues, vec4( 1.0 ) );\n\n				shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n			#else\n\n				vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n				float fDepth = unpackDepth( rgbaDepth );\n\n				if ( fDepth < shadowCoord.z )\n\n		// spot with multiple shadows is darker\n\n					shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n		// spot with multiple shadows has the same color as single shadow spot\n\n		// 					shadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n			#endif\n\n		}\n\n\n		#ifdef SHADOWMAP_DEBUG\n\n			#ifdef SHADOWMAP_CASCADE\n\n				if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n\n			#else\n\n				if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n\n			#endif\n\n		#endif\n\n	}\n\n	#ifdef GAMMA_OUTPUT\n\n		shadowColor *= shadowColor;\n\n	#endif\n\n	gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/worldpos_vertex.glsl

THREE.ShaderChunk[ 'worldpos_vertex'] = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n	#ifdef USE_SKINNING\n\n		vec4 worldPosition = modelMatrix * skinned;\n\n	#endif\n\n	#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n		vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n	#endif\n\n	#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\n\n		vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/shadowmap_pars_fragment.glsl

THREE.ShaderChunk[ 'shadowmap_pars_fragment'] = "#ifdef USE_SHADOWMAP\n\n	uniform sampler2D shadowMap[ MAX_SHADOWS ];\n	uniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n	uniform float shadowDarkness[ MAX_SHADOWS ];\n	uniform float shadowBias[ MAX_SHADOWS ];\n\n	varying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n	float unpackDepth( const in vec4 rgba_depth ) {\n\n		const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n		float depth = dot( rgba_depth, bit_shift );\n		return depth;\n\n	}\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/skinning_pars_vertex.glsl

THREE.ShaderChunk[ 'skinning_pars_vertex'] = "#ifdef USE_SKINNING\n\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n\n	#ifdef BONE_TEXTURE\n\n		uniform sampler2D boneTexture;\n		uniform int boneTextureWidth;\n		uniform int boneTextureHeight;\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			float j = i * 4.0;\n			float x = mod( j, float( boneTextureWidth ) );\n			float y = floor( j / float( boneTextureWidth ) );\n\n			float dx = 1.0 / float( boneTextureWidth );\n			float dy = 1.0 / float( boneTextureHeight );\n\n			y = dy * ( y + 0.5 );\n\n			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n			mat4 bone = mat4( v1, v2, v3, v4 );\n\n			return bone;\n\n		}\n\n	#else\n\n		uniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n		mat4 getBoneMatrix( const in float i ) {\n\n			mat4 bone = boneGlobalMatrices[ int(i) ];\n			return bone;\n\n		}\n\n	#endif\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/logdepthbuf_pars_fragment.glsl

THREE.ShaderChunk[ 'logdepthbuf_pars_fragment'] = "#ifdef USE_LOGDEPTHBUF\n\n	uniform float logDepthBufFC;\n\n	#ifdef USE_LOGDEPTHBUF_EXT\n\n		#extension GL_EXT_frag_depth : enable\n		varying float vFragDepth;\n\n	#endif\n\n#endif";

// File:src/renderers/shaders/ShaderChunk/alphamap_fragment.glsl

THREE.ShaderChunk[ 'alphamap_fragment'] = "#ifdef USE_ALPHAMAP\n\n	gl_FragColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n";

// File:src/renderers/shaders/ShaderChunk/alphamap_pars_fragment.glsl

THREE.ShaderChunk[ 'alphamap_pars_fragment'] = "#ifdef USE_ALPHAMAP\n\n	uniform sampler2D alphaMap;\n\n#endif\n";

// File:src/renderers/shaders/UniformsUtils.js

/**
 * Uniform Utilities
 */

THREE.UniformsUtils = {

	merge: function ( uniforms ) {

		var merged = {};

		for ( var u = 0; u < uniforms.length; u ++ ) {

			var tmp = this.clone( uniforms[ u ] );

			for ( var p in tmp ) {

				merged[ p ] = tmp[ p ];

			}

		}

		return merged;

	},

	clone: function ( uniforms_src ) {

		var uniforms_dst = {};

		for ( var u in uniforms_src ) {

			uniforms_dst[ u ] = {};

			for ( var p in uniforms_src[ u ] ) {

				var parameter_src = uniforms_src[ u ][ p ];

				if ( parameter_src instanceof THREE.Color ||
					 parameter_src instanceof THREE.Vector2 ||
					 parameter_src instanceof THREE.Vector3 ||
					 parameter_src instanceof THREE.Vector4 ||
					 parameter_src instanceof THREE.Matrix4 ||
					 parameter_src instanceof THREE.Texture ) {

					uniforms_dst[ u ][ p ] = parameter_src.clone();

				} else if ( parameter_src instanceof Array ) {

					uniforms_dst[ u ][ p ] = parameter_src.slice();

				} else {

					uniforms_dst[ u ][ p ] = parameter_src;

				}

			}

		}

		return uniforms_dst;

	}

};

// File:src/renderers/shaders/UniformsLib.js

/**
 * Uniforms library for shared webgl shaders
 */

THREE.UniformsLib = {

	common: {

		"diffuse" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },

		"map" : { type: "t", value: null },
		"offsetRepeat" : { type: "v4", value: new THREE.Vector4( 0, 0, 1, 1 ) },

		"lightMap" : { type: "t", value: null },
		"specularMap" : { type: "t", value: null },
		"alphaMap" : { type: "t", value: null },

		"envMap" : { type: "t", value: null },
		"flipEnvMap" : { type: "f", value: - 1 },
		"useRefract" : { type: "i", value: 0 },
		"reflectivity" : { type: "f", value: 1.0 },
		"refractionRatio" : { type: "f", value: 0.98 },
		"combine" : { type: "i", value: 0 },

		"morphTargetInfluences" : { type: "f", value: 0 }

	},

	bump: {

		"bumpMap" : { type: "t", value: null },
		"bumpScale" : { type: "f", value: 1 }

	},

	normalmap: {

		"normalMap" : { type: "t", value: null },
		"normalScale" : { type: "v2", value: new THREE.Vector2( 1, 1 ) }
	},

	fog : {

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	lights: {

		"ambientLightColor" : { type: "fv", value: [] },

		"directionalLightDirection" : { type: "fv", value: [] },
		"directionalLightColor" : { type: "fv", value: [] },

		"hemisphereLightDirection" : { type: "fv", value: [] },
		"hemisphereLightSkyColor" : { type: "fv", value: [] },
		"hemisphereLightGroundColor" : { type: "fv", value: [] },

		"pointLightColor" : { type: "fv", value: [] },
		"pointLightPosition" : { type: "fv", value: [] },
		"pointLightDistance" : { type: "fv1", value: [] },

		"spotLightColor" : { type: "fv", value: [] },
		"spotLightPosition" : { type: "fv", value: [] },
		"spotLightDirection" : { type: "fv", value: [] },
		"spotLightDistance" : { type: "fv1", value: [] },
		"spotLightAngleCos" : { type: "fv1", value: [] },
		"spotLightExponent" : { type: "fv1", value: [] }

	},

	particle: {

		"psColor" : { type: "c", value: new THREE.Color( 0xeeeeee ) },
		"opacity" : { type: "f", value: 1.0 },
		"size" : { type: "f", value: 1.0 },
		"scale" : { type: "f", value: 1.0 },
		"map" : { type: "t", value: null },

		"fogDensity" : { type: "f", value: 0.00025 },
		"fogNear" : { type: "f", value: 1 },
		"fogFar" : { type: "f", value: 2000 },
		"fogColor" : { type: "c", value: new THREE.Color( 0xffffff ) }

	},

	shadowmap: {

		"shadowMap": { type: "tv", value: [] },
		"shadowMapSize": { type: "v2v", value: [] },

		"shadowBias" : { type: "fv1", value: [] },
		"shadowDarkness": { type: "fv1", value: [] },

		"shadowMatrix" : { type: "m4v", value: [] }

	}

};

// File:src/renderers/shaders/ShaderLib.js

/**
 * Webgl Shader Library for three.js
 *
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 */


THREE.ShaderLib = {

	'basic': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],

			"	#ifdef USE_ENVMAP",

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

			"	#endif",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "alphamap_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( diffuse, opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphamap_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],
				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'lambert': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"#define LAMBERT",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

			"	varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "lights_lambert_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",

			"varying vec3 vLightFront;",

			"#ifdef DOUBLE_SIDED",

			"	varying vec3 vLightBack;",

			"#endif",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "alphamap_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( vec3( 1.0 ), opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphamap_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],

			"	#ifdef DOUBLE_SIDED",

					//"float isFront = float( gl_FrontFacing );",
					//"gl_FragColor.xyz *= isFront * vLightFront + ( 1.0 - isFront ) * vLightBack;",

			"		if ( gl_FrontFacing )",
			"			gl_FragColor.xyz *= vLightFront;",
			"		else",
			"			gl_FragColor.xyz *= vLightBack;",

			"	#else",

			"		gl_FragColor.xyz *= vLightFront;",

			"	#endif",

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'phong': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "bump" ],
			THREE.UniformsLib[ "normalmap" ],
			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{
				"ambient"  : { type: "c", value: new THREE.Color( 0xffffff ) },
				"emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
				"specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
				"shininess": { type: "f", value: 30 },
				"wrapRGB"  : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }
			}

		] ),

		vertexShader: [

			"#define PHONG",

			"varying vec3 vViewPosition;",
			"varying vec3 vNormal;",

			THREE.ShaderChunk[ "map_pars_vertex" ],
			THREE.ShaderChunk[ "lightmap_pars_vertex" ],
			THREE.ShaderChunk[ "envmap_pars_vertex" ],
			THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "map_vertex" ],
				THREE.ShaderChunk[ "lightmap_vertex" ],
				THREE.ShaderChunk[ "color_vertex" ],

				THREE.ShaderChunk[ "morphnormal_vertex" ],
				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],
				THREE.ShaderChunk[ "defaultnormal_vertex" ],

			"	vNormal = normalize( transformedNormal );",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"	vViewPosition = -mvPosition.xyz;",

				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "envmap_vertex" ],
				THREE.ShaderChunk[ "lights_phong_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"#define PHONG",

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform vec3 ambient;",
			"uniform vec3 emissive;",
			"uniform vec3 specular;",
			"uniform float shininess;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_pars_fragment" ],
			THREE.ShaderChunk[ "alphamap_pars_fragment" ],
			THREE.ShaderChunk[ "lightmap_pars_fragment" ],
			THREE.ShaderChunk[ "envmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "lights_phong_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "bumpmap_pars_fragment" ],
			THREE.ShaderChunk[ "normalmap_pars_fragment" ],
			THREE.ShaderChunk[ "specularmap_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( vec3( 1.0 ), opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
				THREE.ShaderChunk[ "map_fragment" ],
				THREE.ShaderChunk[ "alphamap_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "specularmap_fragment" ],

				THREE.ShaderChunk[ "lights_phong_fragment" ],

				THREE.ShaderChunk[ "lightmap_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "envmap_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],

				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],

				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'particle_basic': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "particle" ],
			THREE.UniformsLib[ "shadowmap" ]

		] ),

		vertexShader: [

			"uniform float size;",
			"uniform float scale;",

			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "color_vertex" ],

			"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

			"	#ifdef USE_SIZEATTENUATION",
			"		gl_PointSize = size * ( scale / length( mvPosition.xyz ) );",
			"	#else",
			"		gl_PointSize = size;",
			"	#endif",

			"	gl_Position = projectionMatrix * mvPosition;",

				THREE.ShaderChunk[ "logdepthbuf_vertex" ],
				THREE.ShaderChunk[ "worldpos_vertex" ],
				THREE.ShaderChunk[ "shadowmap_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 psColor;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "map_particle_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( psColor, opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
				THREE.ShaderChunk[ "map_particle_fragment" ],
				THREE.ShaderChunk[ "alphatest_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "shadowmap_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'dashed': {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "common" ],
			THREE.UniformsLib[ "fog" ],

			{
				"scale"    : { type: "f", value: 1 },
				"dashSize" : { type: "f", value: 1 },
				"totalSize": { type: "f", value: 2 }
			}

		] ),

		vertexShader: [

			"uniform float scale;",
			"attribute float lineDistance;",

			"varying float vLineDistance;",

			THREE.ShaderChunk[ "color_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "color_vertex" ],

			"	vLineDistance = scale * lineDistance;",

			"	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
			"	gl_Position = projectionMatrix * mvPosition;",

				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform vec3 diffuse;",
			"uniform float opacity;",

			"uniform float dashSize;",
			"uniform float totalSize;",

			"varying float vLineDistance;",

			THREE.ShaderChunk[ "color_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	if ( mod( vLineDistance, totalSize ) > dashSize ) {",

			"		discard;",

			"	}",

			"	gl_FragColor = vec4( diffuse, opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],
				THREE.ShaderChunk[ "color_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n")

	},

	'depth': {

		uniforms: {

			"mNear": { type: "f", value: 1.0 },
			"mFar" : { type: "f", value: 2000.0 },
			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float mNear;",
			"uniform float mFar;",
			"uniform float opacity;",

			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"	#ifdef USE_LOGDEPTHBUF_EXT",

			"		float depth = gl_FragDepthEXT / gl_FragCoord.w;",

			"	#else",

			"		float depth = gl_FragCoord.z / gl_FragCoord.w;",

			"	#endif",

			"	float color = 1.0 - smoothstep( mNear, mFar, depth );",
			"	gl_FragColor = vec4( vec3( color ), opacity );",

			"}"

		].join("\n")

	},

	'normal': {

		uniforms: {

			"opacity" : { type: "f", value: 1.0 }

		},

		vertexShader: [

			"varying vec3 vNormal;",

			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

			"	vNormal = normalize( normalMatrix * normal );",

				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform float opacity;",
			"varying vec3 vNormal;",

			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"}"

		].join("\n")

	},

	/* -------------------------------------------------------------------------
	//	Normal map shader
	//		- Blinn-Phong
	//		- normal + diffuse + specular + AO + displacement + reflection + shadow maps
	//		- point and directional lights (use with "lights: true" material option)
	 ------------------------------------------------------------------------- */

	'normalmap' : {

		uniforms: THREE.UniformsUtils.merge( [

			THREE.UniformsLib[ "fog" ],
			THREE.UniformsLib[ "lights" ],
			THREE.UniformsLib[ "shadowmap" ],

			{

			"enableAO"          : { type: "i", value: 0 },
			"enableDiffuse"     : { type: "i", value: 0 },
			"enableSpecular"    : { type: "i", value: 0 },
			"enableReflection"  : { type: "i", value: 0 },
			"enableDisplacement": { type: "i", value: 0 },

			"tDisplacement": { type: "t", value: null }, // must go first as this is vertex texture
			"tDiffuse"     : { type: "t", value: null },
			"tCube"        : { type: "t", value: null },
			"tNormal"      : { type: "t", value: null },
			"tSpecular"    : { type: "t", value: null },
			"tAO"          : { type: "t", value: null },

			"uNormalScale": { type: "v2", value: new THREE.Vector2( 1, 1 ) },

			"uDisplacementBias": { type: "f", value: 0.0 },
			"uDisplacementScale": { type: "f", value: 1.0 },

			"diffuse": { type: "c", value: new THREE.Color( 0xffffff ) },
			"specular": { type: "c", value: new THREE.Color( 0x111111 ) },
			"ambient": { type: "c", value: new THREE.Color( 0xffffff ) },
			"shininess": { type: "f", value: 30 },
			"opacity": { type: "f", value: 1 },

			"useRefract": { type: "i", value: 0 },
			"refractionRatio": { type: "f", value: 0.98 },
			"reflectivity": { type: "f", value: 0.5 },

			"uOffset" : { type: "v2", value: new THREE.Vector2( 0, 0 ) },
			"uRepeat" : { type: "v2", value: new THREE.Vector2( 1, 1 ) },

			"wrapRGB" : { type: "v3", value: new THREE.Vector3( 1, 1, 1 ) }

			}

		] ),

		fragmentShader: [

			"uniform vec3 ambient;",
			"uniform vec3 diffuse;",
			"uniform vec3 specular;",
			"uniform float shininess;",
			"uniform float opacity;",

			"uniform bool enableDiffuse;",
			"uniform bool enableSpecular;",
			"uniform bool enableAO;",
			"uniform bool enableReflection;",

			"uniform sampler2D tDiffuse;",
			"uniform sampler2D tNormal;",
			"uniform sampler2D tSpecular;",
			"uniform sampler2D tAO;",

			"uniform samplerCube tCube;",

			"uniform vec2 uNormalScale;",

			"uniform bool useRefract;",
			"uniform float refractionRatio;",
			"uniform float reflectivity;",

			"varying vec3 vTangent;",
			"varying vec3 vBinormal;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",

			"uniform vec3 ambientLightColor;",

			"#if MAX_DIR_LIGHTS > 0",

			"	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];",
			"	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];",

			"#endif",

			"#if MAX_HEMI_LIGHTS > 0",

			"	uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];",
			"	uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];",
			"	uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];",

			"#endif",

			"#if MAX_POINT_LIGHTS > 0",

			"	uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];",
			"	uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];",
			"	uniform float pointLightDistance[ MAX_POINT_LIGHTS ];",

			"#endif",

			"#if MAX_SPOT_LIGHTS > 0",

			"	uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];",
			"	uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];",
			"	uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];",
			"	uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];",
			"	uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];",
			"	uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];",

			"#endif",

			"#ifdef WRAP_AROUND",

			"	uniform vec3 wrapRGB;",

			"#endif",

			"varying vec3 vWorldPosition;",
			"varying vec3 vViewPosition;",

			THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
			THREE.ShaderChunk[ "fog_pars_fragment" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",
				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"	gl_FragColor = vec4( vec3( 1.0 ), opacity );",

			"	vec3 specularTex = vec3( 1.0 );",

			"	vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;",
			"	normalTex.xy *= uNormalScale;",
			"	normalTex = normalize( normalTex );",

			"	if( enableDiffuse ) {",

			"		#ifdef GAMMA_INPUT",

			"			vec4 texelColor = texture2D( tDiffuse, vUv );",
			"			texelColor.xyz *= texelColor.xyz;",

			"			gl_FragColor = gl_FragColor * texelColor;",

			"		#else",

			"			gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );",

			"		#endif",

			"	}",

			"	if( enableAO ) {",

			"		#ifdef GAMMA_INPUT",

			"			vec4 aoColor = texture2D( tAO, vUv );",
			"			aoColor.xyz *= aoColor.xyz;",

			"			gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;",

			"		#else",

			"			gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;",

			"		#endif",

			"	}",
			
			THREE.ShaderChunk[ "alphatest_fragment" ],

			"	if( enableSpecular )",
			"		specularTex = texture2D( tSpecular, vUv ).xyz;",

			"	mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );",
			"	vec3 finalNormal = tsb * normalTex;",

			"	#ifdef FLIP_SIDED",

			"		finalNormal = -finalNormal;",

			"	#endif",

			"	vec3 normal = normalize( finalNormal );",
			"	vec3 viewPosition = normalize( vViewPosition );",

				// point lights

			"	#if MAX_POINT_LIGHTS > 0",

			"		vec3 pointDiffuse = vec3( 0.0 );",
			"		vec3 pointSpecular = vec3( 0.0 );",

			"		for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {",

			"			vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );",
			"			vec3 pointVector = lPosition.xyz + vViewPosition.xyz;",

			"			float pointDistance = 1.0;",
			"			if ( pointLightDistance[ i ] > 0.0 )",
			"				pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );",

			"			pointVector = normalize( pointVector );",

						// diffuse

			"			#ifdef WRAP_AROUND",

			"				float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );",
			"				float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );",

			"				vec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );",

			"			#else",

			"				float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );",

			"			#endif",

			"			pointDiffuse += pointDistance * pointLightColor[ i ] * diffuse * pointDiffuseWeight;",

						// specular

			"			vec3 pointHalfVector = normalize( pointVector + viewPosition );",
			"			float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );",
			"			float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, shininess ), 0.0 );",

			"			float specularNormalization = ( shininess + 2.0 ) / 8.0;",

			"			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( pointVector, pointHalfVector ), 0.0 ), 5.0 );",
			"			pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;",

			"		}",

			"	#endif",

				// spot lights

			"	#if MAX_SPOT_LIGHTS > 0",

			"		vec3 spotDiffuse = vec3( 0.0 );",
			"		vec3 spotSpecular = vec3( 0.0 );",

			"		for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {",

			"			vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );",
			"			vec3 spotVector = lPosition.xyz + vViewPosition.xyz;",

			"			float spotDistance = 1.0;",
			"			if ( spotLightDistance[ i ] > 0.0 )",
			"				spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );",

			"			spotVector = normalize( spotVector );",

			"			float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );",

			"			if ( spotEffect > spotLightAngleCos[ i ] ) {",

			"				spotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );",

							// diffuse

			"				#ifdef WRAP_AROUND",

			"					float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );",
			"					float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );",

			"					vec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );",

			"				#else",

			"					float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );",

			"				#endif",

			"				spotDiffuse += spotDistance * spotLightColor[ i ] * diffuse * spotDiffuseWeight * spotEffect;",

							// specular

			"				vec3 spotHalfVector = normalize( spotVector + viewPosition );",
			"				float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );",
			"				float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, shininess ), 0.0 );",

			"				float specularNormalization = ( shininess + 2.0 ) / 8.0;",

			"				vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( spotVector, spotHalfVector ), 0.0 ), 5.0 );",
			"				spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;",

			"			}",

			"		}",

			"	#endif",

				// directional lights

			"	#if MAX_DIR_LIGHTS > 0",

			"		vec3 dirDiffuse = vec3( 0.0 );",
			"		vec3 dirSpecular = vec3( 0.0 );",

			"		for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {",

			"			vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );",
			"			vec3 dirVector = normalize( lDirection.xyz );",

						// diffuse

			"			#ifdef WRAP_AROUND",

			"				float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );",
			"				float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );",

			"				vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );",

			"			#else",

			"				float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );",

			"			#endif",

			"			dirDiffuse += directionalLightColor[ i ] * diffuse * dirDiffuseWeight;",

						// specular

			"			vec3 dirHalfVector = normalize( dirVector + viewPosition );",
			"			float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );",
			"			float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, shininess ), 0.0 );",

			"			float specularNormalization = ( shininess + 2.0 ) / 8.0;",

			"			vec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );",
			"			dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;",

			"		}",

			"	#endif",

				// hemisphere lights

			"	#if MAX_HEMI_LIGHTS > 0",

			"		vec3 hemiDiffuse = vec3( 0.0 );",
			"		vec3 hemiSpecular = vec3( 0.0 );" ,

			"		for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {",

			"			vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );",
			"			vec3 lVector = normalize( lDirection.xyz );",

						// diffuse

			"			float dotProduct = dot( normal, lVector );",
			"			float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;",

			"			vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );",

			"			hemiDiffuse += diffuse * hemiColor;",

						// specular (sky light)


			"			vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );",
			"			float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;",
			"			float hemiSpecularWeightSky = specularTex.r * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );",

						// specular (ground light)

			"			vec3 lVectorGround = -lVector;",

			"			vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );",
			"			float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;",
			"			float hemiSpecularWeightGround = specularTex.r * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );",

			"			float dotProductGround = dot( normal, lVectorGround );",

			"			float specularNormalization = ( shininess + 2.0 ) / 8.0;",

			"			vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );",
			"			vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );",
			"			hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );",

			"		}",

			"	#endif",

				// all lights contribution summation

			"	vec3 totalDiffuse = vec3( 0.0 );",
			"	vec3 totalSpecular = vec3( 0.0 );",

			"	#if MAX_DIR_LIGHTS > 0",

			"		totalDiffuse += dirDiffuse;",
			"		totalSpecular += dirSpecular;",

			"	#endif",

			"	#if MAX_HEMI_LIGHTS > 0",

			"		totalDiffuse += hemiDiffuse;",
			"		totalSpecular += hemiSpecular;",

			"	#endif",

			"	#if MAX_POINT_LIGHTS > 0",

			"		totalDiffuse += pointDiffuse;",
			"		totalSpecular += pointSpecular;",

			"	#endif",

			"	#if MAX_SPOT_LIGHTS > 0",

			"		totalDiffuse += spotDiffuse;",
			"		totalSpecular += spotSpecular;",

			"	#endif",

			"	#ifdef METAL",

			"		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient + totalSpecular );",

			"	#else",

			"		gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * ambient ) + totalSpecular;",

			"	#endif",

			"	if ( enableReflection ) {",

			"		vec3 vReflect;",
			"		vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );",

			"		if ( useRefract ) {",

			"			vReflect = refract( cameraToVertex, normal, refractionRatio );",

			"		} else {",

			"			vReflect = reflect( cameraToVertex, normal );",

			"		}",

			"		vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",

			"		#ifdef GAMMA_INPUT",

			"			cubeColor.xyz *= cubeColor.xyz;",

			"		#endif",

			"		gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * reflectivity );",

			"	}",

				THREE.ShaderChunk[ "shadowmap_fragment" ],
				THREE.ShaderChunk[ "linear_to_gamma_fragment" ],
				THREE.ShaderChunk[ "fog_fragment" ],

			"}"

		].join("\n"),

		vertexShader: [

			"attribute vec4 tangent;",

			"uniform vec2 uOffset;",
			"uniform vec2 uRepeat;",

			"uniform bool enableDisplacement;",

			"#ifdef VERTEX_TEXTURES",

			"	uniform sampler2D tDisplacement;",
			"	uniform float uDisplacementScale;",
			"	uniform float uDisplacementBias;",

			"#endif",

			"varying vec3 vTangent;",
			"varying vec3 vBinormal;",
			"varying vec3 vNormal;",
			"varying vec2 vUv;",

			"varying vec3 vWorldPosition;",
			"varying vec3 vViewPosition;",

			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "skinnormal_vertex" ],

				// normal, tangent and binormal vectors

			"	#ifdef USE_SKINNING",

			"		vNormal = normalize( normalMatrix * skinnedNormal.xyz );",

			"		vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );",
			"		vTangent = normalize( normalMatrix * skinnedTangent.xyz );",

			"	#else",

			"		vNormal = normalize( normalMatrix * normal );",
			"		vTangent = normalize( normalMatrix * tangent.xyz );",

			"	#endif",

			"	vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );",

			"	vUv = uv * uRepeat + uOffset;",

				// displacement mapping

			"	vec3 displacedPosition;",

			"	#ifdef VERTEX_TEXTURES",

			"		if ( enableDisplacement ) {",

			"			vec3 dv = texture2D( tDisplacement, uv ).xyz;",
			"			float df = uDisplacementScale * dv.x + uDisplacementBias;",
			"			displacedPosition = position + normalize( normal ) * df;",

			"		} else {",

			"			#ifdef USE_SKINNING",

			"				vec4 skinVertex = bindMatrix * vec4( position, 1.0 );",

			"				vec4 skinned = vec4( 0.0 );",
			"				skinned += boneMatX * skinVertex * skinWeight.x;",
			"				skinned += boneMatY * skinVertex * skinWeight.y;",
			"				skinned += boneMatZ * skinVertex * skinWeight.z;",
			"				skinned += boneMatW * skinVertex * skinWeight.w;",
			"				skinned  = bindMatrixInverse * skinned;",

			"				displacedPosition = skinned.xyz;",

			"			#else",

			"				displacedPosition = position;",

			"			#endif",

			"		}",

			"	#else",

			"		#ifdef USE_SKINNING",

			"			vec4 skinVertex = bindMatrix * vec4( position, 1.0 );",

			"			vec4 skinned = vec4( 0.0 );",
			"			skinned += boneMatX * skinVertex * skinWeight.x;",
			"			skinned += boneMatY * skinVertex * skinWeight.y;",
			"			skinned += boneMatZ * skinVertex * skinWeight.z;",
			"			skinned += boneMatW * skinVertex * skinWeight.w;",
			"			skinned  = bindMatrixInverse * skinned;",

			"			displacedPosition = skinned.xyz;",

			"		#else",

			"			displacedPosition = position;",

			"		#endif",

			"	#endif",

				//

			"	vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );",
			"	vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );",

			"	gl_Position = projectionMatrix * mvPosition;",

				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

				//

			"	vWorldPosition = worldPosition.xyz;",
			"	vViewPosition = -mvPosition.xyz;",

				// shadows

			"	#ifdef USE_SHADOWMAP",

			"		for( int i = 0; i < MAX_SHADOWS; i ++ ) {",

			"			vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;",

			"		}",

			"	#endif",

			"}"

		].join("\n")

	},

	/* -------------------------------------------------------------------------
	//	Cube map shader
	 ------------------------------------------------------------------------- */

	'cube': {

		uniforms: { "tCube": { type: "t", value: null },
					"tFlip": { type: "f", value: - 1 } },

		vertexShader: [

			"varying vec3 vWorldPosition;",

			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

			"	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
			"	vWorldPosition = worldPosition.xyz;",

			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			"uniform samplerCube tCube;",
			"uniform float tFlip;",

			"varying vec3 vWorldPosition;",

			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"void main() {",

			"	gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"}"

		].join("\n")

	},

	/* Depth encoding into RGBA texture
	 *
	 * based on SpiderGL shadow map example
	 * http://spidergl.org/example.php?id=6
	 *
	 * originally from
	 * http://www.gamedev.net/topic/442138-packing-a-float-into-a-a8r8g8b8-texture-shader/page__whichpage__1%25EF%25BF%25BD
	 *
	 * see also
	 * http://aras-p.info/blog/2009/07/30/encoding-floats-to-rgba-the-final/
	 */

	'depthRGBA': {

		uniforms: {},

		vertexShader: [

			THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
			THREE.ShaderChunk[ "skinning_pars_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

			"void main() {",

				THREE.ShaderChunk[ "skinbase_vertex" ],
				THREE.ShaderChunk[ "morphtarget_vertex" ],
				THREE.ShaderChunk[ "skinning_vertex" ],
				THREE.ShaderChunk[ "default_vertex" ],
				THREE.ShaderChunk[ "logdepthbuf_vertex" ],

			"}"

		].join("\n"),

		fragmentShader: [

			THREE.ShaderChunk[ "logdepthbuf_pars_fragment" ],

			"vec4 pack_depth( const in float depth ) {",

			"	const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
			"	const vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
			"	vec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", // "	vec4 res = fract( depth * bit_shift );",
			"	res -= res.xxyz * bit_mask;",
			"	return res;",

			"}",

			"void main() {",

				THREE.ShaderChunk[ "logdepthbuf_fragment" ],

			"	#ifdef USE_LOGDEPTHBUF_EXT",

			"		gl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );",

			"	#else",

			"		gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

			"	#endif",

				//"gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z / gl_FragCoord.w );",
				//"float z = ( ( gl_FragCoord.z / gl_FragCoord.w ) - 3.0 ) / ( 4000.0 - 3.0 );",
				//"gl_FragData[ 0 ] = pack_depth( z );",
				//"gl_FragData[ 0 ] = vec4( z, z, z, 1.0 );",

			"}"

		].join("\n")

	}

};

// File:src/renderers/WebGLRenderer.js

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

THREE.WebGLRenderer = function ( parameters ) {

	console.log( 'THREE.WebGLRenderer', THREE.REVISION );

	parameters = parameters || {};

	var _canvas = parameters.canvas !== undefined ? parameters.canvas : document.createElement( 'canvas' ),
	_context = parameters.context !== undefined ? parameters.context : null,

	_precision = parameters.precision !== undefined ? parameters.precision : 'highp',

	_alpha = parameters.alpha !== undefined ? parameters.alpha : false,
	_depth = parameters.depth !== undefined ? parameters.depth : true,
	_stencil = parameters.stencil !== undefined ? parameters.stencil : true,
	_antialias = parameters.antialias !== undefined ? parameters.antialias : false,
	_premultipliedAlpha = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true,
	_preserveDrawingBuffer = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false,
	_logarithmicDepthBuffer = parameters.logarithmicDepthBuffer !== undefined ? parameters.logarithmicDepthBuffer : false,

	_clearColor = new THREE.Color( 0x000000 ),
	_clearAlpha = 0;

	var lights = [];

	var _webglObjects = {};
	var _webglObjectsImmediate = [];

	var opaqueObjects = [];
	var transparentObjects = [];

	var sprites = [];
	var lensFlares = [];

	// public properties

	this.domElement = _canvas;
	this.context = null;
	this.devicePixelRatio = parameters.devicePixelRatio !== undefined
				 ? parameters.devicePixelRatio
				 : self.devicePixelRatio !== undefined
					 ? self.devicePixelRatio
					 : 1;

	// clearing

	this.autoClear = true;
	this.autoClearColor = true;
	this.autoClearDepth = true;
	this.autoClearStencil = true;

	// scene graph

	this.sortObjects = true;

	// physically based shading

	this.gammaInput = false;
	this.gammaOutput = false;

	// shadow map

	this.shadowMapEnabled = false;
	this.shadowMapType = THREE.PCFShadowMap;
	this.shadowMapCullFace = THREE.CullFaceFront;
	this.shadowMapDebug = false;
	this.shadowMapCascade = false;

	// morphs

	this.maxMorphTargets = 8;
	this.maxMorphNormals = 4;

	// flags

	this.autoScaleCubemaps = true;

	// info

	this.info = {

		memory: {

			programs: 0,
			geometries: 0,
			textures: 0

		},

		render: {

			calls: 0,
			vertices: 0,
			faces: 0,
			points: 0

		}

	};

	// internal properties

	var _this = this,

	_programs = [],

	// internal state cache

	_currentProgram = null,
	_currentFramebuffer = null,
	_currentMaterialId = - 1,
	_currentGeometryGroupHash = - 1,
	_currentCamera = null,

	_usedTextureUnits = 0,

	// GL state cache

	_oldDoubleSided = - 1,
	_oldFlipSided = - 1,

	_oldBlending = - 1,

	_oldBlendEquation = - 1,
	_oldBlendSrc = - 1,
	_oldBlendDst = - 1,

	_oldDepthTest = - 1,
	_oldDepthWrite = - 1,

	_oldPolygonOffset = null,
	_oldPolygonOffsetFactor = null,
	_oldPolygonOffsetUnits = null,

	_oldLineWidth = null,

	_viewportX = 0,
	_viewportY = 0,
	_viewportWidth = _canvas.width,
	_viewportHeight = _canvas.height,
	_currentWidth = 0,
	_currentHeight = 0,

	_newAttributes = new Uint8Array( 16 ),
	_enabledAttributes = new Uint8Array( 16 ),

	// frustum

	_frustum = new THREE.Frustum(),

	 // camera matrices cache

	_projScreenMatrix = new THREE.Matrix4(),
	_projScreenMatrixPS = new THREE.Matrix4(),

	_vector3 = new THREE.Vector3(),

	// light arrays cache

	_direction = new THREE.Vector3(),

	_lightsNeedUpdate = true,

	_lights = {

		ambient: [ 0, 0, 0 ],
		directional: { length: 0, colors:[], positions: [] },
		point: { length: 0, colors: [], positions: [], distances: [] },
		spot: { length: 0, colors: [], positions: [], distances: [], directions: [], anglesCos: [], exponents: [] },
		hemi: { length: 0, skyColors: [], groundColors: [], positions: [] }

	};

	// initialize

	var _gl;

	try {

		var attributes = {
			alpha: _alpha,
			depth: _depth,
			stencil: _stencil,
			antialias: _antialias,
			premultipliedAlpha: _premultipliedAlpha,
			preserveDrawingBuffer: _preserveDrawingBuffer
		};

		_gl = _context || _canvas.getContext( 'webgl', attributes ) || _canvas.getContext( 'experimental-webgl', attributes );

		if ( _gl === null ) {

			if ( _canvas.getContext( 'webgl') !== null ) {

				throw 'Error creating WebGL context with your selected attributes.';

			} else {

				throw 'Error creating WebGL context.';

			}

		}

	} catch ( error ) {

		console.error( error );

	}

	if ( _gl.getShaderPrecisionFormat === undefined ) {

		_gl.getShaderPrecisionFormat = function () {

			return {
				'rangeMin': 1,
				'rangeMax': 1,
				'precision': 1
			};

		}

	}

	var extensions = new THREE.WebGLExtensions( _gl );

	extensions.get( 'OES_texture_float' );
	extensions.get( 'OES_texture_float_linear' );
	extensions.get( 'OES_standard_derivatives' );

	if ( _logarithmicDepthBuffer ) {

		extensions.get( 'EXT_frag_depth' );

	}

	//

	function setDefaultGLState() {

		_gl.clearColor( 0, 0, 0, 1 );
		_gl.clearDepth( 1 );
		_gl.clearStencil( 0 );

		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthFunc( _gl.LEQUAL );

		_gl.frontFace( _gl.CCW );
		_gl.cullFace( _gl.BACK );
		_gl.enable( _gl.CULL_FACE );

		_gl.enable( _gl.BLEND );
		_gl.blendEquation( _gl.FUNC_ADD );
		_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );

		_gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	}

	setDefaultGLState();

	this.context = _gl;

	// GPU capabilities

	var _maxTextures = _gl.getParameter( _gl.MAX_TEXTURE_IMAGE_UNITS );
	var _maxVertexTextures = _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS );
	var _maxTextureSize = _gl.getParameter( _gl.MAX_TEXTURE_SIZE );
	var _maxCubemapSize = _gl.getParameter( _gl.MAX_CUBE_MAP_TEXTURE_SIZE );

	var _supportsVertexTextures = _maxVertexTextures > 0;
	var _supportsBoneTextures = _supportsVertexTextures && extensions.get( 'OES_texture_float' );

	//

	var _vertexShaderPrecisionHighpFloat = _gl.getShaderPrecisionFormat( _gl.VERTEX_SHADER, _gl.HIGH_FLOAT );
	var _vertexShaderPrecisionMediumpFloat = _gl.getShaderPrecisionFormat( _gl.VERTEX_SHADER, _gl.MEDIUM_FLOAT );
	var _vertexShaderPrecisionLowpFloat = _gl.getShaderPrecisionFormat( _gl.VERTEX_SHADER, _gl.LOW_FLOAT );

	var _fragmentShaderPrecisionHighpFloat = _gl.getShaderPrecisionFormat( _gl.FRAGMENT_SHADER, _gl.HIGH_FLOAT );
	var _fragmentShaderPrecisionMediumpFloat = _gl.getShaderPrecisionFormat( _gl.FRAGMENT_SHADER, _gl.MEDIUM_FLOAT );
	var _fragmentShaderPrecisionLowpFloat = _gl.getShaderPrecisionFormat( _gl.FRAGMENT_SHADER, _gl.LOW_FLOAT );

	var getCompressedTextureFormats = ( function () {

		var array;

		return function () {

			if ( array !== undefined ) {

				return array;

			}

			array = [];

			if ( extensions.get( 'WEBGL_compressed_texture_pvrtc' ) || extensions.get( 'WEBGL_compressed_texture_s3tc' ) ) {

				var formats = _gl.getParameter( _gl.COMPRESSED_TEXTURE_FORMATS );

				for ( var i = 0; i < formats.length; i ++ ){

					array.push( formats[ i ] );

				}

			}
			
			return array;

		};

	} )();

	// clamp precision to maximum available

	var highpAvailable = _vertexShaderPrecisionHighpFloat.precision > 0 && _fragmentShaderPrecisionHighpFloat.precision > 0;
	var mediumpAvailable = _vertexShaderPrecisionMediumpFloat.precision > 0 && _fragmentShaderPrecisionMediumpFloat.precision > 0;

	if ( _precision === 'highp' && ! highpAvailable ) {

		if ( mediumpAvailable ) {

			_precision = 'mediump';
			console.warn( 'THREE.WebGLRenderer: highp not supported, using mediump.' );

		} else {

			_precision = 'lowp';
			console.warn( 'THREE.WebGLRenderer: highp and mediump not supported, using lowp.' );

		}

	}

	if ( _precision === 'mediump' && ! mediumpAvailable ) {

		_precision = 'lowp';
		console.warn( 'THREE.WebGLRenderer: mediump not supported, using lowp.' );

	}

	// Plugins

	var shadowMapPlugin = new THREE.ShadowMapPlugin( this, lights, _webglObjects, _webglObjectsImmediate );

	var spritePlugin = new THREE.SpritePlugin( this, sprites );
	var lensFlarePlugin = new THREE.LensFlarePlugin( this, lensFlares );

	// API

	this.getContext = function () {

		return _gl;

	};

	this.supportsVertexTextures = function () {

		return _supportsVertexTextures;

	};

	this.supportsFloatTextures = function () {

		return extensions.get( 'OES_texture_float' );

	};

	this.supportsStandardDerivatives = function () {

		return extensions.get( 'OES_standard_derivatives' );

	};

	this.supportsCompressedTextureS3TC = function () {

		return extensions.get( 'WEBGL_compressed_texture_s3tc' );

	};

	this.supportsCompressedTexturePVRTC = function () {

		return extensions.get( 'WEBGL_compressed_texture_pvrtc' );

	};

	this.supportsBlendMinMax = function () {

		return extensions.get( 'EXT_blend_minmax' );

	};

	this.getMaxAnisotropy = ( function () {

		var value;

		return function () {

			if ( value !== undefined ) {

				return value;

			}

			var extension = extensions.get( 'EXT_texture_filter_anisotropic' );

			value = extension !== null ? _gl.getParameter( extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT ) : 0;

			return value;

		}

	} )();

	this.getPrecision = function () {

		return _precision;

	};

	this.setSize = function ( width, height, updateStyle ) {

		_canvas.width = width * this.devicePixelRatio;
		_canvas.height = height * this.devicePixelRatio;

		if ( updateStyle !== false ) {

			_canvas.style.width = width + 'px';
			_canvas.style.height = height + 'px';

		}

		this.setViewport( 0, 0, width, height );

	};

	this.setViewport = function ( x, y, width, height ) {

		_viewportX = x * this.devicePixelRatio;
		_viewportY = y * this.devicePixelRatio;

		_viewportWidth = width * this.devicePixelRatio;
		_viewportHeight = height * this.devicePixelRatio;

		_gl.viewport( _viewportX, _viewportY, _viewportWidth, _viewportHeight );

	};

	this.setScissor = function ( x, y, width, height ) {

		_gl.scissor(
			x * this.devicePixelRatio,
			y * this.devicePixelRatio,
			width * this.devicePixelRatio,
			height * this.devicePixelRatio
		);

	};

	this.enableScissorTest = function ( enable ) {

		enable ? _gl.enable( _gl.SCISSOR_TEST ) : _gl.disable( _gl.SCISSOR_TEST );

	};

	// Clearing

	this.setClearColor = function ( color, alpha ) {

		_clearColor.set( color );
		_clearAlpha = alpha !== undefined ? alpha : 1;

		_gl.clearColor( _clearColor.r, _clearColor.g, _clearColor.b, _clearAlpha );

	};

	this.setClearColorHex = function ( hex, alpha ) {

		console.warn( 'THREE.WebGLRenderer: .setClearColorHex() is being removed. Use .setClearColor() instead.' );
		this.setClearColor( hex, alpha );

	};

	this.getClearColor = function () {

		return _clearColor;

	};

	this.getClearAlpha = function () {

		return _clearAlpha;

	};

	this.clear = function ( color, depth, stencil ) {

		var bits = 0;

		if ( color === undefined || color ) bits |= _gl.COLOR_BUFFER_BIT;
		if ( depth === undefined || depth ) bits |= _gl.DEPTH_BUFFER_BIT;
		if ( stencil === undefined || stencil ) bits |= _gl.STENCIL_BUFFER_BIT;

		_gl.clear( bits );

	};

	this.clearColor = function () {

		_gl.clear( _gl.COLOR_BUFFER_BIT );

	};

	this.clearDepth = function () {

		_gl.clear( _gl.DEPTH_BUFFER_BIT );

	};

	this.clearStencil = function () {

		_gl.clear( _gl.STENCIL_BUFFER_BIT );

	};

	this.clearTarget = function ( renderTarget, color, depth, stencil ) {

		this.setRenderTarget( renderTarget );
		this.clear( color, depth, stencil );

	};

	// Reset

	this.resetGLState = function () {

		_currentProgram = null;
		_currentCamera = null;

		_oldBlending = - 1;
		_oldDepthTest = - 1;
		_oldDepthWrite = - 1;
		_oldDoubleSided = - 1;
		_oldFlipSided = - 1;
		_currentGeometryGroupHash = - 1;
		_currentMaterialId = - 1;

		_lightsNeedUpdate = true;

	};

	// Buffer allocation

	function createParticleBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createLineBuffers ( geometry ) {

		geometry.__webglVertexBuffer = _gl.createBuffer();
		geometry.__webglColorBuffer = _gl.createBuffer();
		geometry.__webglLineDistanceBuffer = _gl.createBuffer();

		_this.info.memory.geometries ++;

	};

	function createMeshBuffers ( geometryGroup ) {

		geometryGroup.__webglVertexBuffer = _gl.createBuffer();
		geometryGroup.__webglNormalBuffer = _gl.createBuffer();
		geometryGroup.__webglTangentBuffer = _gl.createBuffer();
		geometryGroup.__webglColorBuffer = _gl.createBuffer();
		geometryGroup.__webglUVBuffer = _gl.createBuffer();
		geometryGroup.__webglUV2Buffer = _gl.createBuffer();

		geometryGroup.__webglSkinIndicesBuffer = _gl.createBuffer();
		geometryGroup.__webglSkinWeightsBuffer = _gl.createBuffer();

		geometryGroup.__webglFaceBuffer = _gl.createBuffer();
		geometryGroup.__webglLineBuffer = _gl.createBuffer();

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__webglMorphTargetsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__webglMorphTargetsBuffers.push( _gl.createBuffer() );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__webglMorphNormalsBuffers = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__webglMorphNormalsBuffers.push( _gl.createBuffer() );

			}

		}

		_this.info.memory.geometries ++;

	};

	// Events

	var onObjectRemoved = function ( event ) {

		var object = event.target;

		object.traverse( function ( child ) {

			child.removeEventListener( 'remove', onObjectRemoved );

			removeObject( child );

		} );

	};

	var onGeometryDispose = function ( event ) {

		var geometry = event.target;

		geometry.removeEventListener( 'dispose', onGeometryDispose );

		deallocateGeometry( geometry );

	};

	var onTextureDispose = function ( event ) {

		var texture = event.target;

		texture.removeEventListener( 'dispose', onTextureDispose );

		deallocateTexture( texture );

		_this.info.memory.textures --;


	};

	var onRenderTargetDispose = function ( event ) {

		var renderTarget = event.target;

		renderTarget.removeEventListener( 'dispose', onRenderTargetDispose );

		deallocateRenderTarget( renderTarget );

		_this.info.memory.textures --;

	};

	var onMaterialDispose = function ( event ) {

		var material = event.target;

		material.removeEventListener( 'dispose', onMaterialDispose );

		deallocateMaterial( material );

	};

	// Buffer deallocation

	var deleteBuffers = function ( geometry ) {
	
		var buffers = [
			'__webglVertexBuffer',
			'__webglNormalBuffer',
			'__webglTangentBuffer',
			'__webglColorBuffer',
			'__webglUVBuffer',
			'__webglUV2Buffer',
			
			'__webglSkinIndicesBuffer',
			'__webglSkinWeightsBuffer',
			
			'__webglFaceBuffer',
			'__webglLineBuffer',
			
			'__webglLineDistanceBuffer'
		];

		for ( var i = 0, l = buffers.length; i < l; i ++ ) {

			var name = buffers[ i ];

			if ( geometry[ name ] !== undefined ) {

				_gl.deleteBuffer( geometry[ name ] );

				delete geometry[ name ];

			}

		}

		// custom attributes

		if ( geometry.__webglCustomAttributesList !== undefined ) {

			for ( var name in geometry.__webglCustomAttributesList ) {

				_gl.deleteBuffer( geometry.__webglCustomAttributesList[ name ].buffer );

			}

			delete geometry.__webglCustomAttributesList;

		}

		_this.info.memory.geometries --;

	};

	var deallocateGeometry = function ( geometry ) {

		delete geometry.__webglInit;

		if ( geometry instanceof THREE.BufferGeometry ) {

			for ( var name in geometry.attributes ) {
			
				var attribute = geometry.attributes[ name ];

				if ( attribute.buffer !== undefined ) {

					_gl.deleteBuffer( attribute.buffer );

					delete attribute.buffer;

				}

			}

			_this.info.memory.geometries --;

		} else {

			var geometryGroupsList = geometryGroups[ geometry.id ];

			if ( geometryGroupsList !== undefined ) {

				for ( var i = 0,l = geometryGroupsList.length; i < l; i ++ ) {

					var geometryGroup = geometryGroupsList[ i ];

					if ( geometryGroup.numMorphTargets !== undefined ) {

						for ( var m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

							_gl.deleteBuffer( geometryGroup.__webglMorphTargetsBuffers[ m ] );

						}

						delete geometryGroup.__webglMorphTargetsBuffers;

					}

					if ( geometryGroup.numMorphNormals !== undefined ) {

						for ( var m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

							_gl.deleteBuffer( geometryGroup.__webglMorphNormalsBuffers[ m ] );

						}

						delete geometryGroup.__webglMorphNormalsBuffers;

					}

					deleteBuffers( geometryGroup );

				}

				delete geometryGroups[ geometry.id ];

			} else {

				deleteBuffers( geometry );

			}

		}

		// TOFIX: Workaround for deleted geometry being currently bound

		_currentGeometryGroupHash = - 1;

	};

	var deallocateTexture = function ( texture ) {

		if ( texture.image && texture.image.__webglTextureCube ) {

			// cube texture

			_gl.deleteTexture( texture.image.__webglTextureCube );

			delete texture.image.__webglTextureCube;

		} else {

			// 2D texture

			if ( texture.__webglInit === undefined ) return;

			_gl.deleteTexture( texture.__webglTexture );

			delete texture.__webglTexture;
			delete texture.__webglInit;

		}

	};

	var deallocateRenderTarget = function ( renderTarget ) {

		if ( ! renderTarget || renderTarget.__webglTexture === undefined ) return;

		_gl.deleteTexture( renderTarget.__webglTexture );

		delete renderTarget.__webglTexture;

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			for ( var i = 0; i < 6; i ++ ) {

				_gl.deleteFramebuffer( renderTarget.__webglFramebuffer[ i ] );
				_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer[ i ] );

			}

		} else {

			_gl.deleteFramebuffer( renderTarget.__webglFramebuffer );
			_gl.deleteRenderbuffer( renderTarget.__webglRenderbuffer );

		}

		delete renderTarget.__webglFramebuffer;
		delete renderTarget.__webglRenderbuffer;

	};

	var deallocateMaterial = function ( material ) {

		var program = material.program.program;

		if ( program === undefined ) return;

		material.program = undefined;

		// only deallocate GL program if this was the last use of shared program
		// assumed there is only single copy of any program in the _programs list
		// (that's how it's constructed)

		var i, il, programInfo;
		var deleteProgram = false;

		for ( i = 0, il = _programs.length; i < il; i ++ ) {

			programInfo = _programs[ i ];

			if ( programInfo.program === program ) {

				programInfo.usedTimes --;

				if ( programInfo.usedTimes === 0 ) {

					deleteProgram = true;

				}

				break;

			}

		}

		if ( deleteProgram === true ) {

			// avoid using array.splice, this is costlier than creating new array from scratch

			var newPrograms = [];

			for ( i = 0, il = _programs.length; i < il; i ++ ) {

				programInfo = _programs[ i ];

				if ( programInfo.program !== program ) {

					newPrograms.push( programInfo );

				}

			}

			_programs = newPrograms;

			_gl.deleteProgram( program );

			_this.info.memory.programs --;

		}

	};

	// Buffer initialization

	function initCustomAttributes ( object ) {

		var geometry = object.geometry;
		var material = object.material;

		var nvertices = geometry.vertices.length;

		if ( material.attributes ) {

			if ( geometry.__webglCustomAttributesList === undefined ) {

				geometry.__webglCustomAttributesList = [];

			}

			for ( var name in material.attributes ) {

				var attribute = material.attributes[ name ];

				if ( ! attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;   // "f" and "i"

					if ( attribute.type === 'v2' ) size = 2;
					else if ( attribute.type === 'v3' ) size = 3;
					else if ( attribute.type === 'v4' ) size = 4;
					else if ( attribute.type === 'c'  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = name;

					attribute.needsUpdate = true;

				}

				geometry.__webglCustomAttributesList.push( attribute );

			}

		}

	};

	function initParticleBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );

		geometry.__sortArray = [];

		geometry.__webglParticleCount = nvertices;

		initCustomAttributes( object );

	};

	function initLineBuffers ( geometry, object ) {

		var nvertices = geometry.vertices.length;

		geometry.__vertexArray = new Float32Array( nvertices * 3 );
		geometry.__colorArray = new Float32Array( nvertices * 3 );
		geometry.__lineDistanceArray = new Float32Array( nvertices * 1 );

		geometry.__webglLineCount = nvertices;

		initCustomAttributes( object );

	};

	function initMeshBuffers ( geometryGroup, object ) {

		var geometry = object.geometry,
			faces3 = geometryGroup.faces3,

			nvertices = faces3.length * 3,
			ntris     = faces3.length * 1,
			nlines    = faces3.length * 3,

			material = getBufferMaterial( object, geometryGroup );

		geometryGroup.__vertexArray = new Float32Array( nvertices * 3 );
		geometryGroup.__normalArray = new Float32Array( nvertices * 3 );
		geometryGroup.__colorArray = new Float32Array( nvertices * 3 );
		geometryGroup.__uvArray = new Float32Array( nvertices * 2 );

		if ( geometry.faceVertexUvs.length > 1 ) {

			geometryGroup.__uv2Array = new Float32Array( nvertices * 2 );

		}

		if ( geometry.hasTangents ) {

			geometryGroup.__tangentArray = new Float32Array( nvertices * 4 );

		}

		if ( object.geometry.skinWeights.length && object.geometry.skinIndices.length ) {

			geometryGroup.__skinIndexArray = new Float32Array( nvertices * 4 );
			geometryGroup.__skinWeightArray = new Float32Array( nvertices * 4 );

		}

		var UintArray = extensions.get( 'OES_element_index_uint' ) !== null && ntris > 21845 ? Uint32Array : Uint16Array; // 65535 / 3

		geometryGroup.__typeArray = UintArray;
		geometryGroup.__faceArray = new UintArray( ntris * 3 );
		geometryGroup.__lineArray = new UintArray( nlines * 2 );

		var m, ml;

		if ( geometryGroup.numMorphTargets ) {

			geometryGroup.__morphTargetsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphTargets; m < ml; m ++ ) {

				geometryGroup.__morphTargetsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		if ( geometryGroup.numMorphNormals ) {

			geometryGroup.__morphNormalsArrays = [];

			for ( m = 0, ml = geometryGroup.numMorphNormals; m < ml; m ++ ) {

				geometryGroup.__morphNormalsArrays.push( new Float32Array( nvertices * 3 ) );

			}

		}

		geometryGroup.__webglFaceCount = ntris * 3;
		geometryGroup.__webglLineCount = nlines * 2;


		// custom attributes

		if ( material.attributes ) {

			if ( geometryGroup.__webglCustomAttributesList === undefined ) {

				geometryGroup.__webglCustomAttributesList = [];

			}

			for ( var name in material.attributes ) {

				// Do a shallow copy of the attribute object so different geometryGroup chunks use different
				// attribute buffers which are correctly indexed in the setMeshBuffers function

				var originalAttribute = material.attributes[ name ];

				var attribute = {};

				for ( var property in originalAttribute ) {

					attribute[ property ] = originalAttribute[ property ];

				}

				if ( ! attribute.__webglInitialized || attribute.createUniqueBuffers ) {

					attribute.__webglInitialized = true;

					var size = 1;   // "f" and "i"

					if ( attribute.type === 'v2' ) size = 2;
					else if ( attribute.type === 'v3' ) size = 3;
					else if ( attribute.type === 'v4' ) size = 4;
					else if ( attribute.type === 'c'  ) size = 3;

					attribute.size = size;

					attribute.array = new Float32Array( nvertices * size );

					attribute.buffer = _gl.createBuffer();
					attribute.buffer.belongsToAttribute = name;

					originalAttribute.needsUpdate = true;
					attribute.__original = originalAttribute;

				}

				geometryGroup.__webglCustomAttributesList.push( attribute );

			}

		}

		geometryGroup.__inittedArrays = true;

	};

	function getBufferMaterial( object, geometryGroup ) {

		return object.material instanceof THREE.MeshFaceMaterial
			 ? object.material.materials[ geometryGroup.materialIndex ]
			 : object.material;

	};

	function materialNeedsSmoothNormals ( material ) {

		return material && material.shading !== undefined && material.shading === THREE.SmoothShading;

	};

	// Buffer setting

	function setParticleBuffers ( geometry, hint, object ) {

		var v, c, vertex, offset, index, color,

		vertices = geometry.vertices,
		vl = vertices.length,

		colors = geometry.colors,
		cl = colors.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,

		sortArray = geometry.__sortArray,

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyElements = geometry.elementsNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,

		customAttributes = geometry.__webglCustomAttributesList,
		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( object.sortParticles ) {

			_projScreenMatrixPS.copy( _projScreenMatrix );
			_projScreenMatrixPS.multiply( object.matrixWorld );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ];

				_vector3.copy( vertex );
				_vector3.applyProjection( _projScreenMatrixPS );

				sortArray[ v ] = [ _vector3.z, v ];

			}

			sortArray.sort( numericalSort );

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ sortArray[ v ][ 1 ] ];

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			for ( c = 0; c < cl; c ++ ) {

				offset = c * 3;

				color = colors[ sortArray[ c ][ 1 ] ];

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( ! ( customAttribute.boundTo === undefined || customAttribute.boundTo === 'vertices' ) ) continue;

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							customAttribute.array[ ca ] = customAttribute.value[ index ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ]   = value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === 'c' ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ]     = value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								index = sortArray[ ca ][ 1 ];

								value = customAttribute.value[ index ];

								customAttribute.array[ offset ]   = value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							index = sortArray[ ca ][ 1 ];

							value = customAttribute.value[ index ];

							customAttribute.array[ offset ]      = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

				}

			}

		} else {

			if ( dirtyVertices ) {

				for ( v = 0; v < vl; v ++ ) {

					vertex = vertices[ v ];

					offset = v * 3;

					vertexArray[ offset ]     = vertex.x;
					vertexArray[ offset + 1 ] = vertex.y;
					vertexArray[ offset + 2 ] = vertex.z;

				}

			}

			if ( dirtyColors ) {

				for ( c = 0; c < cl; c ++ ) {

					color = colors[ c ];

					offset = c * 3;

					colorArray[ offset ]     = color.r;
					colorArray[ offset + 1 ] = color.g;
					colorArray[ offset + 2 ] = color.b;

				}

			}

			if ( customAttributes ) {

				for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

					customAttribute = customAttributes[ i ];

					if ( customAttribute.needsUpdate &&
						 ( customAttribute.boundTo === undefined ||
							 customAttribute.boundTo === 'vertices' ) ) {

						cal = customAttribute.value.length;

						offset = 0;

						if ( customAttribute.size === 1 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								customAttribute.array[ ca ] = customAttribute.value[ ca ];

							}

						} else if ( customAttribute.size === 2 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]   = value.x;
								customAttribute.array[ offset + 1 ] = value.y;

								offset += 2;

							}

						} else if ( customAttribute.size === 3 ) {

							if ( customAttribute.type === 'c' ) {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ]   = value.r;
									customAttribute.array[ offset + 1 ] = value.g;
									customAttribute.array[ offset + 2 ] = value.b;

									offset += 3;

								}

							} else {

								for ( ca = 0; ca < cal; ca ++ ) {

									value = customAttribute.value[ ca ];

									customAttribute.array[ offset ]   = value.x;
									customAttribute.array[ offset + 1 ] = value.y;
									customAttribute.array[ offset + 2 ] = value.z;

									offset += 3;

								}

							}

						} else if ( customAttribute.size === 4 ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]      = value.x;
								customAttribute.array[ offset + 1  ] = value.y;
								customAttribute.array[ offset + 2  ] = value.z;
								customAttribute.array[ offset + 3  ] = value.w;

								offset += 4;

							}

						}

					}

				}

			}

		}

		if ( dirtyVertices || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors || object.sortParticles ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate || object.sortParticles ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}

	}

	function setLineBuffers ( geometry, hint ) {

		var v, c, d, vertex, offset, color,

		vertices = geometry.vertices,
		colors = geometry.colors,
		lineDistances = geometry.lineDistances,

		vl = vertices.length,
		cl = colors.length,
		dl = lineDistances.length,

		vertexArray = geometry.__vertexArray,
		colorArray = geometry.__colorArray,
		lineDistanceArray = geometry.__lineDistanceArray,

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,
		dirtyLineDistances = geometry.lineDistancesNeedUpdate,

		customAttributes = geometry.__webglCustomAttributesList,

		i, il,
		a, ca, cal, value,
		customAttribute;

		if ( dirtyVertices ) {

			for ( v = 0; v < vl; v ++ ) {

				vertex = vertices[ v ];

				offset = v * 3;

				vertexArray[ offset ]     = vertex.x;
				vertexArray[ offset + 1 ] = vertex.y;
				vertexArray[ offset + 2 ] = vertex.z;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyColors ) {

			for ( c = 0; c < cl; c ++ ) {

				color = colors[ c ];

				offset = c * 3;

				colorArray[ offset ]     = color.r;
				colorArray[ offset + 1 ] = color.g;
				colorArray[ offset + 2 ] = color.b;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

		}

		if ( dirtyLineDistances ) {

			for ( d = 0; d < dl; d ++ ) {

				lineDistanceArray[ d ] = lineDistances[ d ];

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometry.__webglLineDistanceBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, lineDistanceArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( customAttribute.needsUpdate &&
					 ( customAttribute.boundTo === undefined ||
						 customAttribute.boundTo === 'vertices' ) ) {

					offset = 0;

					cal = customAttribute.value.length;

					if ( customAttribute.size === 1 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							customAttribute.array[ ca ] = customAttribute.value[ ca ];

						}

					} else if ( customAttribute.size === 2 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ]   = value.x;
							customAttribute.array[ offset + 1 ] = value.y;

							offset += 2;

						}

					} else if ( customAttribute.size === 3 ) {

						if ( customAttribute.type === 'c' ) {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]   = value.r;
								customAttribute.array[ offset + 1 ] = value.g;
								customAttribute.array[ offset + 2 ] = value.b;

								offset += 3;

							}

						} else {

							for ( ca = 0; ca < cal; ca ++ ) {

								value = customAttribute.value[ ca ];

								customAttribute.array[ offset ]   = value.x;
								customAttribute.array[ offset + 1 ] = value.y;
								customAttribute.array[ offset + 2 ] = value.z;

								offset += 3;

							}

						}

					} else if ( customAttribute.size === 4 ) {

						for ( ca = 0; ca < cal; ca ++ ) {

							value = customAttribute.value[ ca ];

							customAttribute.array[ offset ]    = value.x;
							customAttribute.array[ offset + 1  ] = value.y;
							customAttribute.array[ offset + 2  ] = value.z;
							customAttribute.array[ offset + 3  ] = value.w;

							offset += 4;

						}

					}

					_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
					_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

				}

			}

		}

	}

	function setMeshBuffers( geometryGroup, object, hint, dispose, material ) {

		if ( ! geometryGroup.__inittedArrays ) {

			return;

		}

		var needsSmoothNormals = materialNeedsSmoothNormals( material );

		var f, fl, fi, face,
		vertexNormals, faceNormal, normal,
		vertexColors, faceColor,
		vertexTangents,
		uv, uv2, v1, v2, v3, v4, t1, t2, t3, t4, n1, n2, n3, n4,
		c1, c2, c3,
		sw1, sw2, sw3, sw4,
		si1, si2, si3, si4,
		sa1, sa2, sa3, sa4,
		sb1, sb2, sb3, sb4,
		m, ml, i, il,
		vn, uvi, uv2i,
		vk, vkl, vka,
		nka, chf, faceVertexNormals,
		a,

		vertexIndex = 0,

		offset = 0,
		offset_uv = 0,
		offset_uv2 = 0,
		offset_face = 0,
		offset_normal = 0,
		offset_tangent = 0,
		offset_line = 0,
		offset_color = 0,
		offset_skin = 0,
		offset_morphTarget = 0,
		offset_custom = 0,
		offset_customSrc = 0,

		value,

		vertexArray = geometryGroup.__vertexArray,
		uvArray = geometryGroup.__uvArray,
		uv2Array = geometryGroup.__uv2Array,
		normalArray = geometryGroup.__normalArray,
		tangentArray = geometryGroup.__tangentArray,
		colorArray = geometryGroup.__colorArray,

		skinIndexArray = geometryGroup.__skinIndexArray,
		skinWeightArray = geometryGroup.__skinWeightArray,

		morphTargetsArrays = geometryGroup.__morphTargetsArrays,
		morphNormalsArrays = geometryGroup.__morphNormalsArrays,

		customAttributes = geometryGroup.__webglCustomAttributesList,
		customAttribute,

		faceArray = geometryGroup.__faceArray,
		lineArray = geometryGroup.__lineArray,

		geometry = object.geometry, // this is shared for all chunks

		dirtyVertices = geometry.verticesNeedUpdate,
		dirtyElements = geometry.elementsNeedUpdate,
		dirtyUvs = geometry.uvsNeedUpdate,
		dirtyNormals = geometry.normalsNeedUpdate,
		dirtyTangents = geometry.tangentsNeedUpdate,
		dirtyColors = geometry.colorsNeedUpdate,
		dirtyMorphTargets = geometry.morphTargetsNeedUpdate,

		vertices = geometry.vertices,
		chunk_faces3 = geometryGroup.faces3,
		obj_faces = geometry.faces,

		obj_uvs  = geometry.faceVertexUvs[ 0 ],
		obj_uvs2 = geometry.faceVertexUvs[ 1 ],

		obj_colors = geometry.colors,

		obj_skinIndices = geometry.skinIndices,
		obj_skinWeights = geometry.skinWeights,

		morphTargets = geometry.morphTargets,
		morphNormals = geometry.morphNormals;

		if ( dirtyVertices ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				v1 = vertices[ face.a ];
				v2 = vertices[ face.b ];
				v3 = vertices[ face.c ];

				vertexArray[ offset ]     = v1.x;
				vertexArray[ offset + 1 ] = v1.y;
				vertexArray[ offset + 2 ] = v1.z;

				vertexArray[ offset + 3 ] = v2.x;
				vertexArray[ offset + 4 ] = v2.y;
				vertexArray[ offset + 5 ] = v2.z;

				vertexArray[ offset + 6 ] = v3.x;
				vertexArray[ offset + 7 ] = v3.y;
				vertexArray[ offset + 8 ] = v3.z;

				offset += 9;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, vertexArray, hint );

		}

		if ( dirtyMorphTargets ) {

			for ( vk = 0, vkl = morphTargets.length; vk < vkl; vk ++ ) {

				offset_morphTarget = 0;

				for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

					chf = chunk_faces3[ f ];
					face = obj_faces[ chf ];

					// morph positions

					v1 = morphTargets[ vk ].vertices[ face.a ];
					v2 = morphTargets[ vk ].vertices[ face.b ];
					v3 = morphTargets[ vk ].vertices[ face.c ];

					vka = morphTargetsArrays[ vk ];

					vka[ offset_morphTarget ]     = v1.x;
					vka[ offset_morphTarget + 1 ] = v1.y;
					vka[ offset_morphTarget + 2 ] = v1.z;

					vka[ offset_morphTarget + 3 ] = v2.x;
					vka[ offset_morphTarget + 4 ] = v2.y;
					vka[ offset_morphTarget + 5 ] = v2.z;

					vka[ offset_morphTarget + 6 ] = v3.x;
					vka[ offset_morphTarget + 7 ] = v3.y;
					vka[ offset_morphTarget + 8 ] = v3.z;

					// morph normals

					if ( material.morphNormals ) {

						if ( needsSmoothNormals ) {

							faceVertexNormals = morphNormals[ vk ].vertexNormals[ chf ];

							n1 = faceVertexNormals.a;
							n2 = faceVertexNormals.b;
							n3 = faceVertexNormals.c;

						} else {

							n1 = morphNormals[ vk ].faceNormals[ chf ];
							n2 = n1;
							n3 = n1;

						}

						nka = morphNormalsArrays[ vk ];

						nka[ offset_morphTarget ]     = n1.x;
						nka[ offset_morphTarget + 1 ] = n1.y;
						nka[ offset_morphTarget + 2 ] = n1.z;

						nka[ offset_morphTarget + 3 ] = n2.x;
						nka[ offset_morphTarget + 4 ] = n2.y;
						nka[ offset_morphTarget + 5 ] = n2.z;

						nka[ offset_morphTarget + 6 ] = n3.x;
						nka[ offset_morphTarget + 7 ] = n3.y;
						nka[ offset_morphTarget + 8 ] = n3.z;

					}

					//

					offset_morphTarget += 9;

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ vk ] );
				_gl.bufferData( _gl.ARRAY_BUFFER, morphTargetsArrays[ vk ], hint );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ vk ] );
					_gl.bufferData( _gl.ARRAY_BUFFER, morphNormalsArrays[ vk ], hint );

				}

			}

		}

		if ( obj_skinWeights.length ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				// weights

				sw1 = obj_skinWeights[ face.a ];
				sw2 = obj_skinWeights[ face.b ];
				sw3 = obj_skinWeights[ face.c ];

				skinWeightArray[ offset_skin ]     = sw1.x;
				skinWeightArray[ offset_skin + 1 ] = sw1.y;
				skinWeightArray[ offset_skin + 2 ] = sw1.z;
				skinWeightArray[ offset_skin + 3 ] = sw1.w;

				skinWeightArray[ offset_skin + 4 ] = sw2.x;
				skinWeightArray[ offset_skin + 5 ] = sw2.y;
				skinWeightArray[ offset_skin + 6 ] = sw2.z;
				skinWeightArray[ offset_skin + 7 ] = sw2.w;

				skinWeightArray[ offset_skin + 8 ]  = sw3.x;
				skinWeightArray[ offset_skin + 9 ]  = sw3.y;
				skinWeightArray[ offset_skin + 10 ] = sw3.z;
				skinWeightArray[ offset_skin + 11 ] = sw3.w;

				// indices

				si1 = obj_skinIndices[ face.a ];
				si2 = obj_skinIndices[ face.b ];
				si3 = obj_skinIndices[ face.c ];

				skinIndexArray[ offset_skin ]     = si1.x;
				skinIndexArray[ offset_skin + 1 ] = si1.y;
				skinIndexArray[ offset_skin + 2 ] = si1.z;
				skinIndexArray[ offset_skin + 3 ] = si1.w;

				skinIndexArray[ offset_skin + 4 ] = si2.x;
				skinIndexArray[ offset_skin + 5 ] = si2.y;
				skinIndexArray[ offset_skin + 6 ] = si2.z;
				skinIndexArray[ offset_skin + 7 ] = si2.w;

				skinIndexArray[ offset_skin + 8 ]  = si3.x;
				skinIndexArray[ offset_skin + 9 ]  = si3.y;
				skinIndexArray[ offset_skin + 10 ] = si3.z;
				skinIndexArray[ offset_skin + 11 ] = si3.w;

				offset_skin += 12;

			}

			if ( offset_skin > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinIndexArray, hint );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, skinWeightArray, hint );

			}

		}

		if ( dirtyColors ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				vertexColors = face.vertexColors;
				faceColor = face.color;

				if ( vertexColors.length === 3 && material.vertexColors === THREE.VertexColors ) {

					c1 = vertexColors[ 0 ];
					c2 = vertexColors[ 1 ];
					c3 = vertexColors[ 2 ];

				} else {

					c1 = faceColor;
					c2 = faceColor;
					c3 = faceColor;

				}

				colorArray[ offset_color ]     = c1.r;
				colorArray[ offset_color + 1 ] = c1.g;
				colorArray[ offset_color + 2 ] = c1.b;

				colorArray[ offset_color + 3 ] = c2.r;
				colorArray[ offset_color + 4 ] = c2.g;
				colorArray[ offset_color + 5 ] = c2.b;

				colorArray[ offset_color + 6 ] = c3.r;
				colorArray[ offset_color + 7 ] = c3.g;
				colorArray[ offset_color + 8 ] = c3.b;

				offset_color += 9;

			}

			if ( offset_color > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, colorArray, hint );

			}

		}

		if ( dirtyTangents && geometry.hasTangents ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				vertexTangents = face.vertexTangents;

				t1 = vertexTangents[ 0 ];
				t2 = vertexTangents[ 1 ];
				t3 = vertexTangents[ 2 ];

				tangentArray[ offset_tangent ]     = t1.x;
				tangentArray[ offset_tangent + 1 ] = t1.y;
				tangentArray[ offset_tangent + 2 ] = t1.z;
				tangentArray[ offset_tangent + 3 ] = t1.w;

				tangentArray[ offset_tangent + 4 ] = t2.x;
				tangentArray[ offset_tangent + 5 ] = t2.y;
				tangentArray[ offset_tangent + 6 ] = t2.z;
				tangentArray[ offset_tangent + 7 ] = t2.w;

				tangentArray[ offset_tangent + 8 ]  = t3.x;
				tangentArray[ offset_tangent + 9 ]  = t3.y;
				tangentArray[ offset_tangent + 10 ] = t3.z;
				tangentArray[ offset_tangent + 11 ] = t3.w;

				offset_tangent += 12;

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, tangentArray, hint );

		}

		if ( dirtyNormals ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				face = obj_faces[ chunk_faces3[ f ] ];

				vertexNormals = face.vertexNormals;
				faceNormal = face.normal;

				if ( vertexNormals.length === 3 && needsSmoothNormals ) {

					for ( i = 0; i < 3; i ++ ) {

						vn = vertexNormals[ i ];

						normalArray[ offset_normal ]     = vn.x;
						normalArray[ offset_normal + 1 ] = vn.y;
						normalArray[ offset_normal + 2 ] = vn.z;

						offset_normal += 3;

					}

				} else {

					for ( i = 0; i < 3; i ++ ) {

						normalArray[ offset_normal ]     = faceNormal.x;
						normalArray[ offset_normal + 1 ] = faceNormal.y;
						normalArray[ offset_normal + 2 ] = faceNormal.z;

						offset_normal += 3;

					}

				}

			}

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, normalArray, hint );

		}

		if ( dirtyUvs && obj_uvs ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				uv = obj_uvs[ fi ];

				if ( uv === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uvi = uv[ i ];

					uvArray[ offset_uv ]     = uvi.x;
					uvArray[ offset_uv + 1 ] = uvi.y;

					offset_uv += 2;

				}

			}

			if ( offset_uv > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uvArray, hint );

			}

		}

		if ( dirtyUvs && obj_uvs2 ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				fi = chunk_faces3[ f ];

				uv2 = obj_uvs2[ fi ];

				if ( uv2 === undefined ) continue;

				for ( i = 0; i < 3; i ++ ) {

					uv2i = uv2[ i ];

					uv2Array[ offset_uv2 ]     = uv2i.x;
					uv2Array[ offset_uv2 + 1 ] = uv2i.y;

					offset_uv2 += 2;

				}

			}

			if ( offset_uv2 > 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, uv2Array, hint );

			}

		}

		if ( dirtyElements ) {

			for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

				faceArray[ offset_face ]   = vertexIndex;
				faceArray[ offset_face + 1 ] = vertexIndex + 1;
				faceArray[ offset_face + 2 ] = vertexIndex + 2;

				offset_face += 3;

				lineArray[ offset_line ]     = vertexIndex;
				lineArray[ offset_line + 1 ] = vertexIndex + 1;

				lineArray[ offset_line + 2 ] = vertexIndex;
				lineArray[ offset_line + 3 ] = vertexIndex + 2;

				lineArray[ offset_line + 4 ] = vertexIndex + 1;
				lineArray[ offset_line + 5 ] = vertexIndex + 2;

				offset_line += 6;

				vertexIndex += 3;

			}

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, faceArray, hint );

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
			_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, lineArray, hint );

		}

		if ( customAttributes ) {

			for ( i = 0, il = customAttributes.length; i < il; i ++ ) {

				customAttribute = customAttributes[ i ];

				if ( ! customAttribute.__original.needsUpdate ) continue;

				offset_custom = 0;
				offset_customSrc = 0;

				if ( customAttribute.size === 1 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === 'vertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ] ];

							customAttribute.array[ offset_custom ]     = customAttribute.value[ face.a ];
							customAttribute.array[ offset_custom + 1 ] = customAttribute.value[ face.b ];
							customAttribute.array[ offset_custom + 2 ] = customAttribute.value[ face.c ];

							offset_custom += 3;

						}

					} else if ( customAttribute.boundTo === 'faces' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							customAttribute.array[ offset_custom ]     = value;
							customAttribute.array[ offset_custom + 1 ] = value;
							customAttribute.array[ offset_custom + 2 ] = value;

							offset_custom += 3;

						}

					}

				} else if ( customAttribute.size === 2 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === 'vertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ]     = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

					} else if ( customAttribute.boundTo === 'faces' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ]     = v1.x;
							customAttribute.array[ offset_custom + 1 ] = v1.y;

							customAttribute.array[ offset_custom + 2 ] = v2.x;
							customAttribute.array[ offset_custom + 3 ] = v2.y;

							customAttribute.array[ offset_custom + 4 ] = v3.x;
							customAttribute.array[ offset_custom + 5 ] = v3.y;

							offset_custom += 6;

						}

					}

				} else if ( customAttribute.size === 3 ) {

					var pp;

					if ( customAttribute.type === 'c' ) {

						pp = [ 'r', 'g', 'b' ];

					} else {

						pp = [ 'x', 'y', 'z' ];

					}

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === 'vertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom ]     = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

					} else if ( customAttribute.boundTo === 'faces' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom ]     = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

					} else if ( customAttribute.boundTo === 'faceVertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];

							customAttribute.array[ offset_custom ]     = v1[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 1 ] = v1[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 2 ] = v1[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 3 ] = v2[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 4 ] = v2[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 5 ] = v2[ pp[ 2 ] ];

							customAttribute.array[ offset_custom + 6 ] = v3[ pp[ 0 ] ];
							customAttribute.array[ offset_custom + 7 ] = v3[ pp[ 1 ] ];
							customAttribute.array[ offset_custom + 8 ] = v3[ pp[ 2 ] ];

							offset_custom += 9;

						}

					}

				} else if ( customAttribute.size === 4 ) {

					if ( customAttribute.boundTo === undefined || customAttribute.boundTo === 'vertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							face = obj_faces[ chunk_faces3[ f ] ];

							v1 = customAttribute.value[ face.a ];
							v2 = customAttribute.value[ face.b ];
							v3 = customAttribute.value[ face.c ];

							customAttribute.array[ offset_custom  ]   = v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

					} else if ( customAttribute.boundTo === 'faces' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value;
							v2 = value;
							v3 = value;

							customAttribute.array[ offset_custom  ]   = v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

					} else if ( customAttribute.boundTo === 'faceVertices' ) {

						for ( f = 0, fl = chunk_faces3.length; f < fl; f ++ ) {

							value = customAttribute.value[ chunk_faces3[ f ] ];

							v1 = value[ 0 ];
							v2 = value[ 1 ];
							v3 = value[ 2 ];

							customAttribute.array[ offset_custom  ]   = v1.x;
							customAttribute.array[ offset_custom + 1  ] = v1.y;
							customAttribute.array[ offset_custom + 2  ] = v1.z;
							customAttribute.array[ offset_custom + 3  ] = v1.w;

							customAttribute.array[ offset_custom + 4  ] = v2.x;
							customAttribute.array[ offset_custom + 5  ] = v2.y;
							customAttribute.array[ offset_custom + 6  ] = v2.z;
							customAttribute.array[ offset_custom + 7  ] = v2.w;

							customAttribute.array[ offset_custom + 8  ] = v3.x;
							customAttribute.array[ offset_custom + 9  ] = v3.y;
							customAttribute.array[ offset_custom + 10 ] = v3.z;
							customAttribute.array[ offset_custom + 11 ] = v3.w;

							offset_custom += 12;

						}

					}

				}

				_gl.bindBuffer( _gl.ARRAY_BUFFER, customAttribute.buffer );
				_gl.bufferData( _gl.ARRAY_BUFFER, customAttribute.array, hint );

			}

		}

		if ( dispose ) {

			delete geometryGroup.__inittedArrays;
			delete geometryGroup.__colorArray;
			delete geometryGroup.__normalArray;
			delete geometryGroup.__tangentArray;
			delete geometryGroup.__uvArray;
			delete geometryGroup.__uv2Array;
			delete geometryGroup.__faceArray;
			delete geometryGroup.__vertexArray;
			delete geometryGroup.__lineArray;
			delete geometryGroup.__skinIndexArray;
			delete geometryGroup.__skinWeightArray;

		}

	};

	function setDirectBuffers( geometry ) {

		var attributes = geometry.attributes;
		var attributesKeys = geometry.attributesKeys;

		for ( var i = 0, l = attributesKeys.length; i < l; i ++ ) {

			var key = attributesKeys[ i ];
			var attribute = attributes[ key ];

			if ( attribute.buffer === undefined ) {

				attribute.buffer = _gl.createBuffer();
				attribute.needsUpdate = true;

			}

			if ( attribute.needsUpdate === true ) {

				var bufferType = ( key === 'index' ) ? _gl.ELEMENT_ARRAY_BUFFER : _gl.ARRAY_BUFFER;

				_gl.bindBuffer( bufferType, attribute.buffer );
				_gl.bufferData( bufferType, attribute.array, _gl.STATIC_DRAW );

				attribute.needsUpdate = false;

			}

		}

	}

	// Buffer rendering

	this.renderBufferImmediate = function ( object, program, material ) {

		initAttributes();

		if ( object.hasPositions && ! object.__webglVertexBuffer ) object.__webglVertexBuffer = _gl.createBuffer();
		if ( object.hasNormals && ! object.__webglNormalBuffer ) object.__webglNormalBuffer = _gl.createBuffer();
		if ( object.hasUvs && ! object.__webglUvBuffer ) object.__webglUvBuffer = _gl.createBuffer();
		if ( object.hasColors && ! object.__webglColorBuffer ) object.__webglColorBuffer = _gl.createBuffer();

		if ( object.hasPositions ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglVertexBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.positionArray, _gl.DYNAMIC_DRAW );
			enableAttribute( program.attributes.position );
			_gl.vertexAttribPointer( program.attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasNormals ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglNormalBuffer );

			if ( material.shading === THREE.FlatShading ) {

				var nx, ny, nz,
					nax, nbx, ncx, nay, nby, ncy, naz, nbz, ncz,
					normalArray,
					i, il = object.count * 3;

				for ( i = 0; i < il; i += 9 ) {

					normalArray = object.normalArray;

					nax  = normalArray[ i ];
					nay  = normalArray[ i + 1 ];
					naz  = normalArray[ i + 2 ];

					nbx  = normalArray[ i + 3 ];
					nby  = normalArray[ i + 4 ];
					nbz  = normalArray[ i + 5 ];

					ncx  = normalArray[ i + 6 ];
					ncy  = normalArray[ i + 7 ];
					ncz  = normalArray[ i + 8 ];

					nx = ( nax + nbx + ncx ) / 3;
					ny = ( nay + nby + ncy ) / 3;
					nz = ( naz + nbz + ncz ) / 3;

					normalArray[ i ]   = nx;
					normalArray[ i + 1 ] = ny;
					normalArray[ i + 2 ] = nz;

					normalArray[ i + 3 ] = nx;
					normalArray[ i + 4 ] = ny;
					normalArray[ i + 5 ] = nz;

					normalArray[ i + 6 ] = nx;
					normalArray[ i + 7 ] = ny;
					normalArray[ i + 8 ] = nz;

				}

			}

			_gl.bufferData( _gl.ARRAY_BUFFER, object.normalArray, _gl.DYNAMIC_DRAW );
			enableAttribute( program.attributes.normal );
			_gl.vertexAttribPointer( program.attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasUvs && material.map ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglUvBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.uvArray, _gl.DYNAMIC_DRAW );
			enableAttribute( program.attributes.uv );
			_gl.vertexAttribPointer( program.attributes.uv, 2, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.hasColors && material.vertexColors !== THREE.NoColors ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, object.__webglColorBuffer );
			_gl.bufferData( _gl.ARRAY_BUFFER, object.colorArray, _gl.DYNAMIC_DRAW );
			enableAttribute( program.attributes.color );
			_gl.vertexAttribPointer( program.attributes.color, 3, _gl.FLOAT, false, 0, 0 );

		}

		disableUnusedAttributes();

		_gl.drawArrays( _gl.TRIANGLES, 0, object.count );

		object.count = 0;

	};

	function setupVertexAttributes( material, program, geometry, startIndex ) {

		var geometryAttributes = geometry.attributes;

		var programAttributes = program.attributes;
		var programAttributesKeys = program.attributesKeys;

		for ( var i = 0, l = programAttributesKeys.length; i < l; i ++ ) {

			var key = programAttributesKeys[ i ];
			var programAttribute = programAttributes[ key ];

			if ( programAttribute >= 0 ) {

				var geometryAttribute = geometryAttributes[ key ];

				if ( geometryAttribute !== undefined ) {

					var size = geometryAttribute.itemSize;

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryAttribute.buffer );

					enableAttribute( programAttribute );

					_gl.vertexAttribPointer( programAttribute, size, _gl.FLOAT, false, 0, startIndex * size * 4 ); // 4 bytes per Float32

				} else if ( material.defaultAttributeValues !== undefined ) {

					if ( material.defaultAttributeValues[ key ].length === 2 ) {

						_gl.vertexAttrib2fv( programAttribute, material.defaultAttributeValues[ key ] );

					} else if ( material.defaultAttributeValues[ key ].length === 3 ) {

						_gl.vertexAttrib3fv( programAttribute, material.defaultAttributeValues[ key ] );

					}

				}

			}

		}

		disableUnusedAttributes();

	}

	this.renderBufferDirect = function ( camera, lights, fog, material, geometry, object ) {

		if ( material.visible === false ) return;

		var program = setProgram( camera, lights, fog, material, object );

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryHash = ( geometry.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryHash;
			updateBuffers = true;

		}

		if ( updateBuffers ) {

			initAttributes();

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			var mode = material.wireframe === true ? _gl.LINES : _gl.TRIANGLES;

			var index = geometry.attributes.index;

			if ( index ) {

				// indexed triangles

				var type, size;

				if ( index.array instanceof Uint32Array && extensions.get( 'OES_element_index_uint' ) ) {

					type = _gl.UNSIGNED_INT;
					size = 4;

				} else {

					type = _gl.UNSIGNED_SHORT;
					size = 2;

				}

				var offsets = geometry.offsets;

				if ( offsets.length === 0 ) {

					if ( updateBuffers ) {

						setupVertexAttributes( material, program, geometry, 0 );
						_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );

					}

					_gl.drawElements( mode, index.array.length, type, 0 );

					_this.info.render.calls ++;
					_this.info.render.vertices += index.array.length; // not really true, here vertices can be shared
					_this.info.render.faces += index.array.length / 3;

				} else {

					// if there is more than 1 chunk
					// must set attribute pointers to use new offsets for each chunk
					// even if geometry and materials didn't change

					updateBuffers = true;

					for ( var i = 0, il = offsets.length; i < il; i ++ ) {

						var startIndex = offsets[ i ].index;

						if ( updateBuffers ) {

							setupVertexAttributes( material, program, geometry, startIndex );
							_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );

						}

						// render indexed triangles

						_gl.drawElements( mode, offsets[ i ].count, type, offsets[ i ].start * size );

						_this.info.render.calls ++;
						_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared
						_this.info.render.faces += offsets[ i ].count / 3;

					}

				}

			} else {

				// non-indexed triangles

				if ( updateBuffers ) {

					setupVertexAttributes( material, program, geometry, 0 );

				}

				var position = geometry.attributes[ 'position' ];

				// render non-indexed triangles

				_gl.drawArrays( mode, 0, position.array.length / 3 );

				_this.info.render.calls ++;
				_this.info.render.vertices += position.array.length / 3;
				_this.info.render.faces += position.array.length / 9;

			}

		} else if ( object instanceof THREE.PointCloud ) {

			// render particles

			if ( updateBuffers ) {

				setupVertexAttributes( material, program, geometry, 0 );

			}

			var position = geometry.attributes.position;

			// render particles

			_gl.drawArrays( _gl.POINTS, 0, position.array.length / 3 );

			_this.info.render.calls ++;
			_this.info.render.points += position.array.length / 3;

		} else if ( object instanceof THREE.Line ) {

			var mode = ( object.mode === THREE.LineStrip ) ? _gl.LINE_STRIP : _gl.LINES;

			setLineWidth( material.linewidth );

			var index = geometry.attributes.index;

			if ( index ) {

				// indexed lines

				var type, size;

				if ( index.array instanceof Uint32Array ) {

					type = _gl.UNSIGNED_INT;
					size = 4;

				} else {

					type = _gl.UNSIGNED_SHORT;
					size = 2;

				}

				var offsets = geometry.offsets;

				if ( offsets.length === 0 ) {

					if ( updateBuffers ) {

						setupVertexAttributes( material, program, geometry, 0 );
						_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );

					}

					_gl.drawElements( mode, index.array.length, type, 0 ); // 2 bytes per Uint16Array

					_this.info.render.calls ++;
					_this.info.render.vertices += index.array.length; // not really true, here vertices can be shared

				} else {

					// if there is more than 1 chunk
					// must set attribute pointers to use new offsets for each chunk
					// even if geometry and materials didn't change

					if ( offsets.length > 1 ) updateBuffers = true;

					for ( var i = 0, il = offsets.length; i < il; i ++ ) {

						var startIndex = offsets[ i ].index;

						if ( updateBuffers ) {

							setupVertexAttributes( material, program, geometry, startIndex );
							_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, index.buffer );

						}

						// render indexed lines

						_gl.drawElements( mode, offsets[ i ].count, type, offsets[ i ].start * size ); // 2 bytes per Uint16Array

						_this.info.render.calls ++;
						_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared

					}

				}

			} else {

				// non-indexed lines

				if ( updateBuffers ) {

					setupVertexAttributes( material, program, geometry, 0 );

				}

				var position = geometry.attributes.position;

				_gl.drawArrays( mode, 0, position.array.length / 3 );

				_this.info.render.calls ++;
				_this.info.render.points += position.array.length / 3;

			}

		}

	};

	this.renderBuffer = function ( camera, lights, fog, material, geometryGroup, object ) {

		if ( material.visible === false ) return;

		var program = setProgram( camera, lights, fog, material, object );

		var attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryGroupHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryGroupHash;
			updateBuffers = true;

		}

		if ( updateBuffers ) {

			initAttributes();

		}

		// vertices

		if ( ! material.morphTargets && attributes.position >= 0 ) {

			if ( updateBuffers ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
				enableAttribute( attributes.position );
				_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

			}

		} else {

			if ( object.morphTargetBase ) {

				setupMorphTargets( material, geometryGroup, object );

			}

		}


		if ( updateBuffers ) {

			// custom attributes

			// Use the per-geometryGroup custom attribute arrays which are setup in initMeshBuffers

			if ( geometryGroup.__webglCustomAttributesList ) {

				for ( var i = 0, il = geometryGroup.__webglCustomAttributesList.length; i < il; i ++ ) {

					var attribute = geometryGroup.__webglCustomAttributesList[ i ];

					if ( attributes[ attribute.buffer.belongsToAttribute ] >= 0 ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, attribute.buffer );
						enableAttribute( attributes[ attribute.buffer.belongsToAttribute ] );
						_gl.vertexAttribPointer( attributes[ attribute.buffer.belongsToAttribute ], attribute.size, _gl.FLOAT, false, 0, 0 );

					}

				}

			}


			// colors

			if ( attributes.color >= 0 ) {

				if ( object.geometry.colors.length > 0 || object.geometry.faces.length > 0 ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglColorBuffer );
					enableAttribute( attributes.color );
					_gl.vertexAttribPointer( attributes.color, 3, _gl.FLOAT, false, 0, 0 );

				} else if ( material.defaultAttributeValues !== undefined ) {


					_gl.vertexAttrib3fv( attributes.color, material.defaultAttributeValues.color );

				}

			}

			// normals

			if ( attributes.normal >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglNormalBuffer );
				enableAttribute( attributes.normal );
				_gl.vertexAttribPointer( attributes.normal, 3, _gl.FLOAT, false, 0, 0 );

			}

			// tangents

			if ( attributes.tangent >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglTangentBuffer );
				enableAttribute( attributes.tangent );
				_gl.vertexAttribPointer( attributes.tangent, 4, _gl.FLOAT, false, 0, 0 );

			}

			// uvs

			if ( attributes.uv >= 0 ) {

				if ( object.geometry.faceVertexUvs[ 0 ] ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUVBuffer );
					enableAttribute( attributes.uv );
					_gl.vertexAttribPointer( attributes.uv, 2, _gl.FLOAT, false, 0, 0 );

				} else if ( material.defaultAttributeValues !== undefined ) {


					_gl.vertexAttrib2fv( attributes.uv, material.defaultAttributeValues.uv );

				}

			}

			if ( attributes.uv2 >= 0 ) {

				if ( object.geometry.faceVertexUvs[ 1 ] ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglUV2Buffer );
					enableAttribute( attributes.uv2 );
					_gl.vertexAttribPointer( attributes.uv2, 2, _gl.FLOAT, false, 0, 0 );

				} else if ( material.defaultAttributeValues !== undefined ) {


					_gl.vertexAttrib2fv( attributes.uv2, material.defaultAttributeValues.uv2 );

				}

			}

			if ( material.skinning &&
				 attributes.skinIndex >= 0 && attributes.skinWeight >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinIndicesBuffer );
				enableAttribute( attributes.skinIndex );
				_gl.vertexAttribPointer( attributes.skinIndex, 4, _gl.FLOAT, false, 0, 0 );

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglSkinWeightsBuffer );
				enableAttribute( attributes.skinWeight );
				_gl.vertexAttribPointer( attributes.skinWeight, 4, _gl.FLOAT, false, 0, 0 );

			}

			// line distances

			if ( attributes.lineDistance >= 0 ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglLineDistanceBuffer );
				enableAttribute( attributes.lineDistance );
				_gl.vertexAttribPointer( attributes.lineDistance, 1, _gl.FLOAT, false, 0, 0 );

			}

		}

		disableUnusedAttributes();

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			var type = geometryGroup.__typeArray === Uint32Array ? _gl.UNSIGNED_INT : _gl.UNSIGNED_SHORT;

			// wireframe

			if ( material.wireframe ) {

				setLineWidth( material.wireframeLinewidth );
				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglLineBuffer );
				_gl.drawElements( _gl.LINES, geometryGroup.__webglLineCount, type, 0 );

			// triangles

			} else {

				if ( updateBuffers ) _gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.__webglFaceBuffer );
				_gl.drawElements( _gl.TRIANGLES, geometryGroup.__webglFaceCount, type, 0 );

			}

			_this.info.render.calls ++;
			_this.info.render.vertices += geometryGroup.__webglFaceCount;
			_this.info.render.faces += geometryGroup.__webglFaceCount / 3;

		// render lines

		} else if ( object instanceof THREE.Line ) {

			var mode = ( object.mode === THREE.LineStrip ) ? _gl.LINE_STRIP : _gl.LINES;

			setLineWidth( material.linewidth );

			_gl.drawArrays( mode, 0, geometryGroup.__webglLineCount );

			_this.info.render.calls ++;

		// render particles

		} else if ( object instanceof THREE.PointCloud ) {

			_gl.drawArrays( _gl.POINTS, 0, geometryGroup.__webglParticleCount );

			_this.info.render.calls ++;
			_this.info.render.points += geometryGroup.__webglParticleCount;

		}

	};

	function initAttributes() {

		for ( var i = 0, l = _newAttributes.length; i < l; i ++ ) {

			_newAttributes[ i ] = 0;

		}

	}

	function enableAttribute( attribute ) {

		_newAttributes[ attribute ] = 1;

		if ( _enabledAttributes[ attribute ] === 0 ) {

			_gl.enableVertexAttribArray( attribute );
			_enabledAttributes[ attribute ] = 1;

		}

	}

	function disableUnusedAttributes() {

		for ( var i = 0, l = _enabledAttributes.length; i < l; i ++ ) {

			if ( _enabledAttributes[ i ] !== _newAttributes[ i ] ) {

				_gl.disableVertexAttribArray( i );
				_enabledAttributes[ i ] = 0;

			}

		}

	}

	function setupMorphTargets ( material, geometryGroup, object ) {

		// set base

		var attributes = material.program.attributes;

		if ( object.morphTargetBase !== - 1 && attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );
			enableAttribute( attributes.position );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		} else if ( attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			enableAttribute( attributes.position );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.morphTargetForcedOrder.length ) {

			// set forced order

			var m = 0;
			var order = object.morphTargetForcedOrder;
			var influences = object.morphTargetInfluences;

			while ( m < material.numSupportedMorphTargets && m < order.length ) {

				if ( attributes[ 'morphTarget' + m ] >= 0 ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );
					enableAttribute( attributes[ 'morphTarget' + m ] );
					_gl.vertexAttribPointer( attributes[ 'morphTarget' + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				if ( attributes[ 'morphNormal' + m ] >= 0 && material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );
					enableAttribute( attributes[ 'morphNormal' + m ] );
					_gl.vertexAttribPointer( attributes[ 'morphNormal' + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];

				m ++;
			}

		} else {

			// find the most influencing

			var influence, activeInfluenceIndices = [];
			var influences = object.morphTargetInfluences;
			var i, il = influences.length;

			for ( i = 0; i < il; i ++ ) {

				influence = influences[ i ];

				if ( influence > 0 ) {

					activeInfluenceIndices.push( [ influence, i ] );

				}

			}

			if ( activeInfluenceIndices.length > material.numSupportedMorphTargets ) {

				activeInfluenceIndices.sort( numericalSort );
				activeInfluenceIndices.length = material.numSupportedMorphTargets;

			} else if ( activeInfluenceIndices.length > material.numSupportedMorphNormals ) {

				activeInfluenceIndices.sort( numericalSort );

			} else if ( activeInfluenceIndices.length === 0 ) {

				activeInfluenceIndices.push( [ 0, 0 ] );

			};

			var influenceIndex, m = 0;

			while ( m < material.numSupportedMorphTargets ) {

				if ( activeInfluenceIndices[ m ] ) {

					influenceIndex = activeInfluenceIndices[ m ][ 1 ];

					if ( attributes[ 'morphTarget' + m ] >= 0 ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ influenceIndex ] );
						enableAttribute( attributes[ 'morphTarget' + m ] );
						_gl.vertexAttribPointer( attributes[ 'morphTarget' + m ], 3, _gl.FLOAT, false, 0, 0 );

					}

					if ( attributes[ 'morphNormal' + m ] >= 0 && material.morphNormals ) {

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ influenceIndex ] );
						enableAttribute( attributes[ 'morphNormal' + m ] );
						_gl.vertexAttribPointer( attributes[ 'morphNormal' + m ], 3, _gl.FLOAT, false, 0, 0 );


					}

					object.__webglMorphTargetInfluences[ m ] = influences[ influenceIndex ];

				} else {

					/*
					_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

					if ( material.morphNormals ) {

						_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

					}
					*/

					object.__webglMorphTargetInfluences[ m ] = 0;

				}

				m ++;

			}

		}

		// load updated influences uniform

		if ( material.program.uniforms.morphTargetInfluences !== null ) {

			_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );

		}

	}

	// Sorting

	function painterSortStable ( a, b ) {

		if ( a.material.id !== b.material.id ) {

			return b.material.id - a.material.id;

		} else if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return a.id - b.id;

		}

	}

	function reversePainterSortStable ( a, b ) {

		if ( a.z !== b.z ) {

			return a.z - b.z;

		} else {

			return a.id - b.id;

		}

	}

	function numericalSort ( a, b ) {

		return b[ 0 ] - a[ 0 ];

	}

	// Rendering

	this.render = function ( scene, camera, renderTarget, forceClear ) {

		if ( camera instanceof THREE.Camera === false ) {

			console.error( 'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.' );
			return;

		}

		var fog = scene.fog;

		// reset caching for this frame

		_currentGeometryGroupHash = - 1;
		_currentMaterialId = - 1;
		_currentCamera = null;
		_lightsNeedUpdate = true;

		// update scene graph

		if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

		// update camera matrices and frustum

		if ( camera.parent === undefined ) camera.updateMatrixWorld();

		// update Skeleton objects

		scene.traverse( function ( object ) {

			if ( object instanceof THREE.SkinnedMesh ) {

				object.skeleton.update();

			}

		} );

		camera.matrixWorldInverse.getInverse( camera.matrixWorld );

		_projScreenMatrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
		_frustum.setFromMatrix( _projScreenMatrix );

		lights.length = 0;
		opaqueObjects.length = 0;
		transparentObjects.length = 0;

		sprites.length = 0;
		lensFlares.length = 0;

		projectObject( scene, scene );

		if ( _this.sortObjects === true ) {

			opaqueObjects.sort( painterSortStable );
			transparentObjects.sort( reversePainterSortStable );

		}

		// custom render plugins (pre pass)

		shadowMapPlugin.render( scene, camera );

		//

		_this.info.render.calls = 0;
		_this.info.render.vertices = 0;
		_this.info.render.faces = 0;
		_this.info.render.points = 0;

		this.setRenderTarget( renderTarget );

		if ( this.autoClear || forceClear ) {

			this.clear( this.autoClearColor, this.autoClearDepth, this.autoClearStencil );

		}

		// set matrices for immediate objects

		for ( var i = 0, il = _webglObjectsImmediate.length; i < il; i ++ ) {

			var webglObject = _webglObjectsImmediate[ i ];
			var object = webglObject.object;

			if ( object.visible ) {

				setupMatrices( object, camera );

				unrollImmediateBufferMaterial( webglObject );

			}

		}

		if ( scene.overrideMaterial ) {

			var material = scene.overrideMaterial;

			this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
			this.setDepthTest( material.depthTest );
			this.setDepthWrite( material.depthWrite );
			setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

			renderObjects( opaqueObjects, camera, lights, fog, true, material );
			renderObjects( transparentObjects, camera, lights, fog, true, material );
			renderObjectsImmediate( _webglObjectsImmediate, '', camera, lights, fog, false, material );

		} else {

			var material = null;

			// opaque pass (front-to-back order)

			this.setBlending( THREE.NoBlending );

			renderObjects( opaqueObjects, camera, lights, fog, false, material );
			renderObjectsImmediate( _webglObjectsImmediate, 'opaque', camera, lights, fog, false, material );

			// transparent pass (back-to-front order)

			renderObjects( transparentObjects, camera, lights, fog, true, material );
			renderObjectsImmediate( _webglObjectsImmediate, 'transparent', camera, lights, fog, true, material );

		}

		// custom render plugins (post pass)

		spritePlugin.render( scene, camera );
		lensFlarePlugin.render( scene, camera, _currentWidth, _currentHeight );

		// Generate mipmap if we're using any kind of mipmap filtering

		if ( renderTarget && renderTarget.generateMipmaps && renderTarget.minFilter !== THREE.NearestFilter && renderTarget.minFilter !== THREE.LinearFilter ) {

			updateRenderTargetMipmap( renderTarget );

		}

		// Ensure depth buffer writing is enabled so it can be cleared on next render

		this.setDepthTest( true );
		this.setDepthWrite( true );

		// _gl.finish();

	};

	function projectObject( scene, object ) {

		if ( object.visible === false ) return;

		if ( object instanceof THREE.Scene || object instanceof THREE.Group ) {

			// skip

		} else {

			initObject( object, scene );

			if ( object instanceof THREE.Light ) {

				lights.push( object );

			} else if ( object instanceof THREE.Sprite ) {

				sprites.push( object );

			} else if ( object instanceof THREE.LensFlare ) {

				lensFlares.push( object );

			} else {

				var webglObjects = _webglObjects[ object.id ];

				if ( webglObjects && ( object.frustumCulled === false || _frustum.intersectsObject( object ) === true ) ) {

					updateObject( object, scene );

					for ( var i = 0, l = webglObjects.length; i < l; i ++ ) {

						var webglObject = webglObjects[i];

						unrollBufferMaterial( webglObject );

						webglObject.render = true;

						if ( _this.sortObjects === true ) {

							if ( object.renderDepth !== null ) {

								webglObject.z = object.renderDepth;

							} else {

								_vector3.setFromMatrixPosition( object.matrixWorld );
								_vector3.applyProjection( _projScreenMatrix );

								webglObject.z = _vector3.z;

							}

						}

					}

				}

			}

		}

		for ( var i = 0, l = object.children.length; i < l; i ++ ) {

			projectObject( scene, object.children[ i ] );

		}

	}

	function renderObjects( renderList, camera, lights, fog, useBlending, overrideMaterial ) {

		var material;

		for ( var i = renderList.length - 1; i !== - 1; i -- ) {

			var webglObject = renderList[ i ];

			var object = webglObject.object;
			var buffer = webglObject.buffer;

			setupMatrices( object, camera );

			if ( overrideMaterial ) {

				material = overrideMaterial;

			} else {

				material = webglObject.material;

				if ( ! material ) continue;

				if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

				_this.setDepthTest( material.depthTest );
				_this.setDepthWrite( material.depthWrite );
				setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

			}

			_this.setMaterialFaces( material );

			if ( buffer instanceof THREE.BufferGeometry ) {

				_this.renderBufferDirect( camera, lights, fog, material, buffer, object );

			} else {

				_this.renderBuffer( camera, lights, fog, material, buffer, object );

			}

		}

	}

	function renderObjectsImmediate ( renderList, materialType, camera, lights, fog, useBlending, overrideMaterial ) {

		var material;

		for ( var i = 0, il = renderList.length; i < il; i ++ ) {

			var webglObject = renderList[ i ];
			var object = webglObject.object;

			if ( object.visible ) {

				if ( overrideMaterial ) {

					material = overrideMaterial;

				} else {

					material = webglObject[ materialType ];

					if ( ! material ) continue;

					if ( useBlending ) _this.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );

					_this.setDepthTest( material.depthTest );
					_this.setDepthWrite( material.depthWrite );
					setPolygonOffset( material.polygonOffset, material.polygonOffsetFactor, material.polygonOffsetUnits );

				}

				_this.renderImmediateObject( camera, lights, fog, material, object );

			}

		}

	}

	this.renderImmediateObject = function ( camera, lights, fog, material, object ) {

		var program = setProgram( camera, lights, fog, material, object );

		_currentGeometryGroupHash = - 1;

		_this.setMaterialFaces( material );

		if ( object.immediateRenderCallback ) {

			object.immediateRenderCallback( program, _gl, _frustum );

		} else {

			object.render( function ( object ) { _this.renderBufferImmediate( object, program, material ); } );

		}

	};

	function unrollImmediateBufferMaterial ( globject ) {

		var object = globject.object,
			material = object.material;

		if ( material.transparent ) {

			globject.transparent = material;
			globject.opaque = null;

		} else {

			globject.opaque = material;
			globject.transparent = null;

		}

	}

	function unrollBufferMaterial ( globject ) {

		var object = globject.object;
		var buffer = globject.buffer;

		var geometry = object.geometry;
		var material = object.material;

		if ( material instanceof THREE.MeshFaceMaterial ) {

			var materialIndex = geometry instanceof THREE.BufferGeometry ? 0 : buffer.materialIndex;

			material = material.materials[ materialIndex ];

			globject.material = material;

			if ( material.transparent ) {

				transparentObjects.push( globject );

			} else {

				opaqueObjects.push( globject );

			}

		} else if ( material ) {

			globject.material = material;

			if ( material.transparent ) {

				transparentObjects.push( globject );

			} else {

				opaqueObjects.push( globject );

			}

		}

	}

	function initObject( object, scene ) {

		if ( object.__webglInit === undefined ) {

			object.__webglInit = true;
			object._modelViewMatrix = new THREE.Matrix4();
			object._normalMatrix = new THREE.Matrix3();

			object.addEventListener( 'removed', onObjectRemoved );

		}

		var geometry = object.geometry;

		if ( geometry === undefined ) {

			// ImmediateRenderObject

		} else if ( geometry.__webglInit === undefined ) {

			geometry.__webglInit = true;
			geometry.addEventListener( 'dispose', onGeometryDispose );

			if ( geometry instanceof THREE.BufferGeometry ) {

				//

			} else if ( object instanceof THREE.Mesh ) {

				initGeometryGroups( scene, object, geometry );

			} else if ( object instanceof THREE.Line ) {

				if ( geometry.__webglVertexBuffer === undefined ) {

					createLineBuffers( geometry );
					initLineBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;
					geometry.lineDistancesNeedUpdate = true;

				}

			} else if ( object instanceof THREE.PointCloud ) {

				if ( geometry.__webglVertexBuffer === undefined ) {

					createParticleBuffers( geometry );
					initParticleBuffers( geometry, object );

					geometry.verticesNeedUpdate = true;
					geometry.colorsNeedUpdate = true;

				}

			}

		}

		if ( object.__webglActive === undefined) {

			object.__webglActive = true;

			if ( object instanceof THREE.Mesh ) {

				if ( geometry instanceof THREE.BufferGeometry ) {

					addBuffer( _webglObjects, geometry, object );

				} else if ( geometry instanceof THREE.Geometry ) {

					var geometryGroupsList = geometryGroups[ geometry.id ];

					for ( var i = 0,l = geometryGroupsList.length; i < l; i ++ ) {

						addBuffer( _webglObjects, geometryGroupsList[ i ], object );

					}

				}

			} else if ( object instanceof THREE.Line || object instanceof THREE.PointCloud ) {

				addBuffer( _webglObjects, geometry, object );

			} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

				addBufferImmediate( _webglObjectsImmediate, object );

			}

		}

	}

	// Geometry splitting

	var geometryGroups = {};
	var geometryGroupCounter = 0;

	function makeGroups( geometry, usesFaceMaterial ) {

		var maxVerticesInGroup = extensions.get( 'OES_element_index_uint' ) ? 4294967296 : 65535;

		var groupHash, hash_map = {};

		var numMorphTargets = geometry.morphTargets.length;
		var numMorphNormals = geometry.morphNormals.length;

		var group;
		var groups = {};
		var groupsList = [];

		for ( var f = 0, fl = geometry.faces.length; f < fl; f ++ ) {

			var face = geometry.faces[ f ];
			var materialIndex = usesFaceMaterial ? face.materialIndex : 0;

			if ( ! ( materialIndex in hash_map ) ) {

				hash_map[ materialIndex ] = { hash: materialIndex, counter: 0 };

			}

			groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

			if ( ! ( groupHash in groups ) ) {

				group = {
					id: geometryGroupCounter ++,
					faces3: [],
					materialIndex: materialIndex,
					vertices: 0,
					numMorphTargets: numMorphTargets,
					numMorphNormals: numMorphNormals
				};
				
				groups[ groupHash ] = group;
				groupsList.push( group );

			}

			if ( groups[ groupHash ].vertices + 3 > maxVerticesInGroup ) {

				hash_map[ materialIndex ].counter += 1;
				groupHash = hash_map[ materialIndex ].hash + '_' + hash_map[ materialIndex ].counter;

				if ( ! ( groupHash in groups ) ) {

					group = {
						id: geometryGroupCounter ++,
						faces3: [],
						materialIndex: materialIndex,
						vertices: 0,
						numMorphTargets: numMorphTargets,
						numMorphNormals: numMorphNormals
					};
					
					groups[ groupHash ] = group;
					groupsList.push( group );

				}

			}

			groups[ groupHash ].faces3.push( f );
			groups[ groupHash ].vertices += 3;

		}

		return groupsList;

	}

	function initGeometryGroups( scene, object, geometry ) {

		var material = object.material, addBuffers = false;

		if ( geometryGroups[ geometry.id ] === undefined || geometry.groupsNeedUpdate === true ) {

			delete _webglObjects[ object.id ];

			geometryGroups[ geometry.id ] = makeGroups( geometry, material instanceof THREE.MeshFaceMaterial );

			geometry.groupsNeedUpdate = false;

		}

		var geometryGroupsList = geometryGroups[ geometry.id ];

		// create separate VBOs per geometry chunk

		for ( var i = 0, il = geometryGroupsList.length; i < il; i ++ ) {

			var geometryGroup = geometryGroupsList[ i ];

			// initialise VBO on the first access

			if ( geometryGroup.__webglVertexBuffer === undefined ) {

				createMeshBuffers( geometryGroup );
				initMeshBuffers( geometryGroup, object );

				geometry.verticesNeedUpdate = true;
				geometry.morphTargetsNeedUpdate = true;
				geometry.elementsNeedUpdate = true;
				geometry.uvsNeedUpdate = true;
				geometry.normalsNeedUpdate = true;
				geometry.tangentsNeedUpdate = true;
				geometry.colorsNeedUpdate = true;

				addBuffers = true;

			} else {

				addBuffers = false;

			}

			if ( addBuffers || object.__webglActive === undefined ) {

				addBuffer( _webglObjects, geometryGroup, object );

			}

		}

		object.__webglActive = true;

	}

	function addBuffer( objlist, buffer, object ) {

		var id = object.id;
		objlist[id] = objlist[id] || [];
		objlist[id].push(
			{
				id: id,
				buffer: buffer,
				object: object,
				material: null,
				z: 0
			}
		);

	};

	function addBufferImmediate( objlist, object ) {

		objlist.push(
			{
				id: null,
				object: object,
				opaque: null,
				transparent: null,
				z: 0
			}
		);

	};

	// Objects updates

	function updateObject( object, scene ) {

		var geometry = object.geometry, customAttributesDirty, material;

		if ( geometry instanceof THREE.BufferGeometry ) {

			setDirectBuffers( geometry );

		} else if ( object instanceof THREE.Mesh ) {

			// check all geometry groups

			if ( geometry.groupsNeedUpdate === true ) {

				initGeometryGroups( scene, object, geometry );

			}

			var geometryGroupsList = geometryGroups[ geometry.id ];

			for ( var i = 0, il = geometryGroupsList.length; i < il; i ++ ) {

				var geometryGroup = geometryGroupsList[ i ];

				material = getBufferMaterial( object, geometryGroup );

				if ( geometry.groupsNeedUpdate === true ) {

					initMeshBuffers( geometryGroup, object );

				}

				customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

				if ( geometry.verticesNeedUpdate || geometry.morphTargetsNeedUpdate || geometry.elementsNeedUpdate ||
					 geometry.uvsNeedUpdate || geometry.normalsNeedUpdate ||
					 geometry.colorsNeedUpdate || geometry.tangentsNeedUpdate || customAttributesDirty ) {

					setMeshBuffers( geometryGroup, object, _gl.DYNAMIC_DRAW, ! geometry.dynamic, material );

				}

			}

			geometry.verticesNeedUpdate = false;
			geometry.morphTargetsNeedUpdate = false;
			geometry.elementsNeedUpdate = false;
			geometry.uvsNeedUpdate = false;
			geometry.normalsNeedUpdate = false;
			geometry.colorsNeedUpdate = false;
			geometry.tangentsNeedUpdate = false;

			material.attributes && clearCustomAttributes( material );

		} else if ( object instanceof THREE.Line ) {

			material = getBufferMaterial( object, geometry );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || geometry.lineDistancesNeedUpdate || customAttributesDirty ) {

				setLineBuffers( geometry, _gl.DYNAMIC_DRAW );

			}

			geometry.verticesNeedUpdate = false;
			geometry.colorsNeedUpdate = false;
			geometry.lineDistancesNeedUpdate = false;

			material.attributes && clearCustomAttributes( material );


		} else if ( object instanceof THREE.PointCloud ) {

			material = getBufferMaterial( object, geometry );

			customAttributesDirty = material.attributes && areCustomAttributesDirty( material );

			if ( geometry.verticesNeedUpdate || geometry.colorsNeedUpdate || object.sortParticles || customAttributesDirty ) {

				setParticleBuffers( geometry, _gl.DYNAMIC_DRAW, object );

			}

			geometry.verticesNeedUpdate = false;
			geometry.colorsNeedUpdate = false;

			material.attributes && clearCustomAttributes( material );

		}

	}

	// Objects updates - custom attributes check

	function areCustomAttributesDirty( material ) {

		for ( var name in material.attributes ) {

			if ( material.attributes[ name ].needsUpdate ) return true;

		}

		return false;

	}

	function clearCustomAttributes( material ) {

		for ( var name in material.attributes ) {

			material.attributes[ name ].needsUpdate = false;

		}

	}

	// Objects removal

	function removeObject( object ) {

		if ( object instanceof THREE.Mesh  ||
			 object instanceof THREE.PointCloud ||
			 object instanceof THREE.Line ) {

			delete _webglObjects[ object.id ];

		} else if ( object instanceof THREE.ImmediateRenderObject || object.immediateRenderCallback ) {

			removeInstances( _webglObjectsImmediate, object );

		}

		delete object.__webglInit;
		delete object._modelViewMatrix;
		delete object._normalMatrix;

		delete object.__webglActive;

	}

	function removeInstances( objlist, object ) {

		for ( var o = objlist.length - 1; o >= 0; o -- ) {

			if ( objlist[ o ].object === object ) {

				objlist.splice( o, 1 );

			}

		}

	}

	// Materials

	function initMaterial( material, lights, fog, object ) {

		material.addEventListener( 'dispose', onMaterialDispose );

		var shaderID;

		if ( material instanceof THREE.MeshDepthMaterial ) {

			shaderID = 'depth';

		} else if ( material instanceof THREE.MeshNormalMaterial ) {

			shaderID = 'normal';

		} else if ( material instanceof THREE.MeshBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.MeshLambertMaterial ) {

			shaderID = 'lambert';

		} else if ( material instanceof THREE.MeshPhongMaterial ) {

			shaderID = 'phong';

		} else if ( material instanceof THREE.LineBasicMaterial ) {

			shaderID = 'basic';

		} else if ( material instanceof THREE.LineDashedMaterial ) {

			shaderID = 'dashed';

		} else if ( material instanceof THREE.PointCloudMaterial ) {

			shaderID = 'particle_basic';

		}

		if ( shaderID ) {

			var shader = THREE.ShaderLib[ shaderID ];

			material.__webglShader = {
				uniforms: THREE.UniformsUtils.clone( shader.uniforms ),
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader
			}

		} else {

			material.__webglShader = {
				uniforms: material.uniforms,
				vertexShader: material.vertexShader,
				fragmentShader: material.fragmentShader
			}

		}

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)

		var maxLightCount = allocateLights( lights );
		var maxShadows = allocateShadows( lights );
		var maxBones = allocateBones( object );

		var parameters = {

			precision: _precision,
			supportsVertexTextures: _supportsVertexTextures,

			map: !! material.map,
			envMap: !! material.envMap,
			lightMap: !! material.lightMap,
			bumpMap: !! material.bumpMap,
			normalMap: !! material.normalMap,
			specularMap: !! material.specularMap,
			alphaMap: !! material.alphaMap,

			vertexColors: material.vertexColors,

			fog: fog,
			useFog: material.fog,
			fogExp: fog instanceof THREE.FogExp2,

			sizeAttenuation: material.sizeAttenuation,
			logarithmicDepthBuffer: _logarithmicDepthBuffer,

			skinning: material.skinning,
			maxBones: maxBones,
			useVertexTexture: _supportsBoneTextures && object && object.skeleton && object.skeleton.useVertexTexture,

			morphTargets: material.morphTargets,
			morphNormals: material.morphNormals,
			maxMorphTargets: _this.maxMorphTargets,
			maxMorphNormals: _this.maxMorphNormals,

			maxDirLights: maxLightCount.directional,
			maxPointLights: maxLightCount.point,
			maxSpotLights: maxLightCount.spot,
			maxHemiLights: maxLightCount.hemi,

			maxShadows: maxShadows,
			shadowMapEnabled: _this.shadowMapEnabled && object.receiveShadow && maxShadows > 0,
			shadowMapType: _this.shadowMapType,
			shadowMapDebug: _this.shadowMapDebug,
			shadowMapCascade: _this.shadowMapCascade,

			alphaTest: material.alphaTest,
			metal: material.metal,
			wrapAround: material.wrapAround,
			doubleSided: material.side === THREE.DoubleSide,
			flipSided: material.side === THREE.BackSide

		};

		// Generate code

		var chunks = [];

		if ( shaderID ) {

			chunks.push( shaderID );

		} else {

			chunks.push( material.fragmentShader );
			chunks.push( material.vertexShader );

		}

		if ( material.defines !== undefined ) {

			for ( var name in material.defines ) {

				chunks.push( name );
				chunks.push( material.defines[ name ] );

			}

		}

		for ( var name in parameters ) {

			chunks.push( name );
			chunks.push( parameters[ name ] );

		}

		var code = chunks.join();

		var program;

		// Check if code has been already compiled

		for ( var p = 0, pl = _programs.length; p < pl; p ++ ) {

			var programInfo = _programs[ p ];

			if ( programInfo.code === code ) {

				program = programInfo;
				program.usedTimes ++;

				break;

			}

		}

		if ( program === undefined ) {

			program = new THREE.WebGLProgram( _this, code, material, parameters );
			_programs.push( program );

			_this.info.memory.programs = _programs.length;

		}

		material.program = program;

		var attributes = program.attributes;

		if ( material.morphTargets ) {

			material.numSupportedMorphTargets = 0;

			var id, base = 'morphTarget';

			for ( var i = 0; i < _this.maxMorphTargets; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					material.numSupportedMorphTargets ++;

				}

			}

		}

		if ( material.morphNormals ) {

			material.numSupportedMorphNormals = 0;

			var id, base = 'morphNormal';

			for ( i = 0; i < _this.maxMorphNormals; i ++ ) {

				id = base + i;

				if ( attributes[ id ] >= 0 ) {

					material.numSupportedMorphNormals ++;

				}

			}

		}

		material.uniformsList = [];

		for ( var u in material.__webglShader.uniforms ) {

			var location = material.program.uniforms[ u ];

			if ( location ) {
				material.uniformsList.push( [ material.__webglShader.uniforms[ u ], location ] );
			}

		}

	}

	function setProgram( camera, lights, fog, material, object ) {

		_usedTextureUnits = 0;

		if ( material.needsUpdate ) {

			if ( material.program ) deallocateMaterial( material );

			initMaterial( material, lights, fog, object );
			material.needsUpdate = false;

		}

		if ( material.morphTargets ) {

			if ( ! object.__webglMorphTargetInfluences ) {

				object.__webglMorphTargetInfluences = new Float32Array( _this.maxMorphTargets );

			}

		}

		var refreshProgram = false;
		var refreshMaterial = false;
		var refreshLights = false;

		var program = material.program,
			p_uniforms = program.uniforms,
			m_uniforms = material.__webglShader.uniforms;

		if ( program.id !== _currentProgram ) {

			_gl.useProgram( program.program );
			_currentProgram = program.id;

			refreshProgram = true;
			refreshMaterial = true;
			refreshLights = true;

		}

		if ( material.id !== _currentMaterialId ) {

			if ( _currentMaterialId === -1 ) refreshLights = true;
			_currentMaterialId = material.id;

			refreshMaterial = true;

		}

		if ( refreshProgram || camera !== _currentCamera ) {

			_gl.uniformMatrix4fv( p_uniforms.projectionMatrix, false, camera.projectionMatrix.elements );

			if ( _logarithmicDepthBuffer ) {

				_gl.uniform1f( p_uniforms.logDepthBufFC, 2.0 / ( Math.log( camera.far + 1.0 ) / Math.LN2 ) );

			}


			if ( camera !== _currentCamera ) _currentCamera = camera;

			// load material specific uniforms
			// (shader material also gets them for the sake of genericity)

			if ( material instanceof THREE.ShaderMaterial ||
				 material instanceof THREE.MeshPhongMaterial ||
				 material.envMap ) {

				if ( p_uniforms.cameraPosition !== null ) {

					_vector3.setFromMatrixPosition( camera.matrixWorld );
					_gl.uniform3f( p_uniforms.cameraPosition, _vector3.x, _vector3.y, _vector3.z );

				}

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.ShaderMaterial ||
				 material.skinning ) {

				if ( p_uniforms.viewMatrix !== null ) {

					_gl.uniformMatrix4fv( p_uniforms.viewMatrix, false, camera.matrixWorldInverse.elements );

				}

			}

		}

		// skinning uniforms must be set even if material didn't change
		// auto-setting of texture unit for bone texture must go before other textures
		// not sure why, but otherwise weird things happen

		if ( material.skinning ) {

			if ( object.bindMatrix && p_uniforms.bindMatrix !== null ) {

				_gl.uniformMatrix4fv( p_uniforms.bindMatrix, false, object.bindMatrix.elements );

			}

			if ( object.bindMatrixInverse && p_uniforms.bindMatrixInverse !== null ) {

				_gl.uniformMatrix4fv( p_uniforms.bindMatrixInverse, false, object.bindMatrixInverse.elements );

			}

			if ( _supportsBoneTextures && object.skeleton && object.skeleton.useVertexTexture ) {

				if ( p_uniforms.boneTexture !== null ) {

					var textureUnit = getTextureUnit();

					_gl.uniform1i( p_uniforms.boneTexture, textureUnit );
					_this.setTexture( object.skeleton.boneTexture, textureUnit );

				}

				if ( p_uniforms.boneTextureWidth !== null ) {

					_gl.uniform1i( p_uniforms.boneTextureWidth, object.skeleton.boneTextureWidth );

				}

				if ( p_uniforms.boneTextureHeight !== null ) {

					_gl.uniform1i( p_uniforms.boneTextureHeight, object.skeleton.boneTextureHeight );

				}

			} else if ( object.skeleton && object.skeleton.boneMatrices ) {

				if ( p_uniforms.boneGlobalMatrices !== null ) {

					_gl.uniformMatrix4fv( p_uniforms.boneGlobalMatrices, false, object.skeleton.boneMatrices );

				}

			}

		}

		if ( refreshMaterial ) {

			// refresh uniforms common to several materials

			if ( fog && material.fog ) {

				refreshUniformsFog( m_uniforms, fog );

			}

			if ( material instanceof THREE.MeshPhongMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material.lights ) {

				if ( _lightsNeedUpdate ) {

					refreshLights = true;
					setupLights( lights );
					_lightsNeedUpdate = false;
				}

				if ( refreshLights ) {
					refreshUniformsLights( m_uniforms, _lights );
					markUniformsLightsNeedsUpdate( m_uniforms, true );
				} else {
					markUniformsLightsNeedsUpdate( m_uniforms, false );
				}

			}

			if ( material instanceof THREE.MeshBasicMaterial ||
				 material instanceof THREE.MeshLambertMaterial ||
				 material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsCommon( m_uniforms, material );

			}

			// refresh single material specific uniforms

			if ( material instanceof THREE.LineBasicMaterial ) {

				refreshUniformsLine( m_uniforms, material );

			} else if ( material instanceof THREE.LineDashedMaterial ) {

				refreshUniformsLine( m_uniforms, material );
				refreshUniformsDash( m_uniforms, material );

			} else if ( material instanceof THREE.PointCloudMaterial ) {

				refreshUniformsParticle( m_uniforms, material );

			} else if ( material instanceof THREE.MeshPhongMaterial ) {

				refreshUniformsPhong( m_uniforms, material );

			} else if ( material instanceof THREE.MeshLambertMaterial ) {

				refreshUniformsLambert( m_uniforms, material );

			} else if ( material instanceof THREE.MeshDepthMaterial ) {

				m_uniforms.mNear.value = camera.near;
				m_uniforms.mFar.value = camera.far;
				m_uniforms.opacity.value = material.opacity;

			} else if ( material instanceof THREE.MeshNormalMaterial ) {

				m_uniforms.opacity.value = material.opacity;

			}

			if ( object.receiveShadow && ! material._shadowPass ) {

				refreshUniformsShadow( m_uniforms, lights );

			}

			// load common uniforms

			loadUniformsGeneric( material.uniformsList );

		}

		loadUniformsMatrices( p_uniforms, object );

		if ( p_uniforms.modelMatrix !== null ) {

			_gl.uniformMatrix4fv( p_uniforms.modelMatrix, false, object.matrixWorld.elements );

		}

		return program;

	}

	// Uniforms (refresh uniforms objects)

	function refreshUniformsCommon ( uniforms, material ) {

		uniforms.opacity.value = material.opacity;

		if ( _this.gammaInput ) {

			uniforms.diffuse.value.copyGammaToLinear( material.color );

		} else {

			uniforms.diffuse.value = material.color;

		}

		uniforms.map.value = material.map;
		uniforms.lightMap.value = material.lightMap;
		uniforms.specularMap.value = material.specularMap;
		uniforms.alphaMap.value = material.alphaMap;

		if ( material.bumpMap ) {

			uniforms.bumpMap.value = material.bumpMap;
			uniforms.bumpScale.value = material.bumpScale;

		}

		if ( material.normalMap ) {

			uniforms.normalMap.value = material.normalMap;
			uniforms.normalScale.value.copy( material.normalScale );

		}

		// uv repeat and offset setting priorities
		//  1. color map
		//  2. specular map
		//  3. normal map
		//  4. bump map
		//  5. alpha map

		var uvScaleMap;

		if ( material.map ) {

			uvScaleMap = material.map;

		} else if ( material.specularMap ) {

			uvScaleMap = material.specularMap;

		} else if ( material.normalMap ) {

			uvScaleMap = material.normalMap;

		} else if ( material.bumpMap ) {

			uvScaleMap = material.bumpMap;

		} else if ( material.alphaMap ) {

			uvScaleMap = material.alphaMap;

		}

		if ( uvScaleMap !== undefined ) {

			var offset = uvScaleMap.offset;
			var repeat = uvScaleMap.repeat;

			uniforms.offsetRepeat.value.set( offset.x, offset.y, repeat.x, repeat.y );

		}

		uniforms.envMap.value = material.envMap;
		uniforms.flipEnvMap.value = ( material.envMap instanceof THREE.WebGLRenderTargetCube ) ? 1 : - 1;

		if ( _this.gammaInput ) {

			//uniforms.reflectivity.value = material.reflectivity * material.reflectivity;
			uniforms.reflectivity.value = material.reflectivity;

		} else {

			uniforms.reflectivity.value = material.reflectivity;

		}

		uniforms.refractionRatio.value = material.refractionRatio;
		uniforms.combine.value = material.combine;
		uniforms.useRefract.value = material.envMap && material.envMap.mapping instanceof THREE.CubeRefractionMapping;

	}

	function refreshUniformsLine ( uniforms, material ) {

		uniforms.diffuse.value = material.color;
		uniforms.opacity.value = material.opacity;

	}

	function refreshUniformsDash ( uniforms, material ) {

		uniforms.dashSize.value = material.dashSize;
		uniforms.totalSize.value = material.dashSize + material.gapSize;
		uniforms.scale.value = material.scale;

	}

	function refreshUniformsParticle ( uniforms, material ) {

		uniforms.psColor.value = material.color;
		uniforms.opacity.value = material.opacity;
		uniforms.size.value = material.size;
		uniforms.scale.value = _canvas.height / 2.0; // TODO: Cache this.

		uniforms.map.value = material.map;

	}

	function refreshUniformsFog ( uniforms, fog ) {

		uniforms.fogColor.value = fog.color;

		if ( fog instanceof THREE.Fog ) {

			uniforms.fogNear.value = fog.near;
			uniforms.fogFar.value = fog.far;

		} else if ( fog instanceof THREE.FogExp2 ) {

			uniforms.fogDensity.value = fog.density;

		}

	}

	function refreshUniformsPhong ( uniforms, material ) {

		uniforms.shininess.value = material.shininess;

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );
			uniforms.specular.value.copyGammaToLinear( material.specular );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;
			uniforms.specular.value = material.specular;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	}

	function refreshUniformsLambert ( uniforms, material ) {

		if ( _this.gammaInput ) {

			uniforms.ambient.value.copyGammaToLinear( material.ambient );
			uniforms.emissive.value.copyGammaToLinear( material.emissive );

		} else {

			uniforms.ambient.value = material.ambient;
			uniforms.emissive.value = material.emissive;

		}

		if ( material.wrapAround ) {

			uniforms.wrapRGB.value.copy( material.wrapRGB );

		}

	}

	function refreshUniformsLights ( uniforms, lights ) {

		uniforms.ambientLightColor.value = lights.ambient;

		uniforms.directionalLightColor.value = lights.directional.colors;
		uniforms.directionalLightDirection.value = lights.directional.positions;

		uniforms.pointLightColor.value = lights.point.colors;
		uniforms.pointLightPosition.value = lights.point.positions;
		uniforms.pointLightDistance.value = lights.point.distances;

		uniforms.spotLightColor.value = lights.spot.colors;
		uniforms.spotLightPosition.value = lights.spot.positions;
		uniforms.spotLightDistance.value = lights.spot.distances;
		uniforms.spotLightDirection.value = lights.spot.directions;
		uniforms.spotLightAngleCos.value = lights.spot.anglesCos;
		uniforms.spotLightExponent.value = lights.spot.exponents;

		uniforms.hemisphereLightSkyColor.value = lights.hemi.skyColors;
		uniforms.hemisphereLightGroundColor.value = lights.hemi.groundColors;
		uniforms.hemisphereLightDirection.value = lights.hemi.positions;

	}

	// If uniforms are marked as clean, they don't need to be loaded to the GPU.

	function markUniformsLightsNeedsUpdate ( uniforms, boolean ) {

		uniforms.ambientLightColor.needsUpdate = boolean;

		uniforms.directionalLightColor.needsUpdate = boolean;
		uniforms.directionalLightDirection.needsUpdate = boolean;

		uniforms.pointLightColor.needsUpdate = boolean;
		uniforms.pointLightPosition.needsUpdate = boolean;
		uniforms.pointLightDistance.needsUpdate = boolean;

		uniforms.spotLightColor.needsUpdate = boolean;
		uniforms.spotLightPosition.needsUpdate = boolean;
		uniforms.spotLightDistance.needsUpdate = boolean;
		uniforms.spotLightDirection.needsUpdate = boolean;
		uniforms.spotLightAngleCos.needsUpdate = boolean;
		uniforms.spotLightExponent.needsUpdate = boolean;

		uniforms.hemisphereLightSkyColor.needsUpdate = boolean;
		uniforms.hemisphereLightGroundColor.needsUpdate = boolean;
		uniforms.hemisphereLightDirection.needsUpdate = boolean;

	}

	function refreshUniformsShadow ( uniforms, lights ) {

		if ( uniforms.shadowMatrix ) {

			var j = 0;

			for ( var i = 0, il = lights.length; i < il; i ++ ) {

				var light = lights[ i ];

				if ( ! light.castShadow ) continue;

				if ( light instanceof THREE.SpotLight || ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) ) {

					uniforms.shadowMap.value[ j ] = light.shadowMap;
					uniforms.shadowMapSize.value[ j ] = light.shadowMapSize;

					uniforms.shadowMatrix.value[ j ] = light.shadowMatrix;

					uniforms.shadowDarkness.value[ j ] = light.shadowDarkness;
					uniforms.shadowBias.value[ j ] = light.shadowBias;

					j ++;

				}

			}

		}

	}

	// Uniforms (load to GPU)

	function loadUniformsMatrices ( uniforms, object ) {

		_gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, object._modelViewMatrix.elements );

		if ( uniforms.normalMatrix ) {

			_gl.uniformMatrix3fv( uniforms.normalMatrix, false, object._normalMatrix.elements );

		}

	}

	function getTextureUnit() {

		var textureUnit = _usedTextureUnits;

		if ( textureUnit >= _maxTextures ) {

			console.warn( 'WebGLRenderer: trying to use ' + textureUnit + ' texture units while this GPU supports only ' + _maxTextures );

		}

		_usedTextureUnits += 1;

		return textureUnit;

	}

	function loadUniformsGeneric ( uniforms ) {

		var texture, textureUnit, offset;

		for ( var j = 0, jl = uniforms.length; j < jl; j ++ ) {

			var uniform = uniforms[ j ][ 0 ];

			// needsUpdate property is not added to all uniforms.
			if ( uniform.needsUpdate === false ) continue;

			var type = uniform.type;
			var value = uniform.value;
			var location = uniforms[ j ][ 1 ];

			switch ( type ) {

				case '1i':
					_gl.uniform1i( location, value );
					break;

				case '1f':
					_gl.uniform1f( location, value );
					break;

				case '2f':
					_gl.uniform2f( location, value[ 0 ], value[ 1 ] );
					break;

				case '3f':
					_gl.uniform3f( location, value[ 0 ], value[ 1 ], value[ 2 ] );
					break;

				case '4f':
					_gl.uniform4f( location, value[ 0 ], value[ 1 ], value[ 2 ], value[ 3 ] );
					break;

				case '1iv':
					_gl.uniform1iv( location, value );
					break;

				case '3iv':
					_gl.uniform3iv( location, value );
					break;

				case '1fv':
					_gl.uniform1fv( location, value );
					break;

				case '2fv':
					_gl.uniform2fv( location, value );
					break;

				case '3fv':
					_gl.uniform3fv( location, value );
					break;

				case '4fv':
					_gl.uniform4fv( location, value );
					break;

				case 'Matrix3fv':
					_gl.uniformMatrix3fv( location, false, value );
					break;

				case 'Matrix4fv':
					_gl.uniformMatrix4fv( location, false, value );
					break;

				//

				case 'i':

					// single integer
					_gl.uniform1i( location, value );

					break;

				case 'f':

					// single float
					_gl.uniform1f( location, value );

					break;

				case 'v2':

					// single THREE.Vector2
					_gl.uniform2f( location, value.x, value.y );

					break;

				case 'v3':

					// single THREE.Vector3
					_gl.uniform3f( location, value.x, value.y, value.z );

					break;

				case 'v4':

					// single THREE.Vector4
					_gl.uniform4f( location, value.x, value.y, value.z, value.w );

					break;

				case 'c':

					// single THREE.Color
					_gl.uniform3f( location, value.r, value.g, value.b );

					break;

				case 'iv1':

					// flat array of integers (JS or typed array)
					_gl.uniform1iv( location, value );

					break;

				case 'iv':

					// flat array of integers with 3 x N size (JS or typed array)
					_gl.uniform3iv( location, value );

					break;

				case 'fv1':

					// flat array of floats (JS or typed array)
					_gl.uniform1fv( location, value );

					break;

				case 'fv':

					// flat array of floats with 3 x N size (JS or typed array)
					_gl.uniform3fv( location, value );

					break;

				case 'v2v':

					// array of THREE.Vector2

					if ( uniform._array === undefined ) {

						uniform._array = new Float32Array( 2 * value.length );

					}

					for ( var i = 0, il = value.length; i < il; i ++ ) {

						offset = i * 2;

						uniform._array[ offset ]   = value[ i ].x;
						uniform._array[ offset + 1 ] = value[ i ].y;

					}

					_gl.uniform2fv( location, uniform._array );

					break;

				case 'v3v':

					// array of THREE.Vector3

					if ( uniform._array === undefined ) {

						uniform._array = new Float32Array( 3 * value.length );

					}

					for ( var i = 0, il = value.length; i < il; i ++ ) {

						offset = i * 3;

						uniform._array[ offset ]   = value[ i ].x;
						uniform._array[ offset + 1 ] = value[ i ].y;
						uniform._array[ offset + 2 ] = value[ i ].z;

					}

					_gl.uniform3fv( location, uniform._array );

					break;

				case 'v4v':

					// array of THREE.Vector4

					if ( uniform._array === undefined ) {

						uniform._array = new Float32Array( 4 * value.length );

					}

					for ( var i = 0, il = value.length; i < il; i ++ ) {

						offset = i * 4;

						uniform._array[ offset ]   = value[ i ].x;
						uniform._array[ offset + 1 ] = value[ i ].y;
						uniform._array[ offset + 2 ] = value[ i ].z;
						uniform._array[ offset + 3 ] = value[ i ].w;

					}

					_gl.uniform4fv( location, uniform._array );

					break;

				case 'm3':

					// single THREE.Matrix3
					_gl.uniformMatrix3fv( location, false, value.elements );

					break;

				case 'm3v':

					// array of THREE.Matrix3

					if ( uniform._array === undefined ) {

						uniform._array = new Float32Array( 9 * value.length );

					}

					for ( var i = 0, il = value.length; i < il; i ++ ) {

						value[ i ].flattenToArrayOffset( uniform._array, i * 9 );

					}

					_gl.uniformMatrix3fv( location, false, uniform._array );

					break;

				case 'm4':

					// single THREE.Matrix4
					_gl.uniformMatrix4fv( location, false, value.elements );

					break;

				case 'm4v':

					// array of THREE.Matrix4

					if ( uniform._array === undefined ) {

						uniform._array = new Float32Array( 16 * value.length );

					}

					for ( var i = 0, il = value.length; i < il; i ++ ) {

						value[ i ].flattenToArrayOffset( uniform._array, i * 16 );

					}

					_gl.uniformMatrix4fv( location, false, uniform._array );

					break;

				case 't':

					// single THREE.Texture (2d or cube)

					texture = value;
					textureUnit = getTextureUnit();

					_gl.uniform1i( location, textureUnit );

					if ( ! texture ) continue;

					if ( texture instanceof THREE.CubeTexture ||
					   ( texture.image instanceof Array && texture.image.length === 6 ) ) { // CompressedTexture can have Array in image :/

						setCubeTexture( texture, textureUnit );

					} else if ( texture instanceof THREE.WebGLRenderTargetCube ) {

						setCubeTextureDynamic( texture, textureUnit );

					} else {

						_this.setTexture( texture, textureUnit );

					}

					break;

				case 'tv':

					// array of THREE.Texture (2d)

					if ( uniform._array === undefined ) {

						uniform._array = [];

					}

					for ( var i = 0, il = uniform.value.length; i < il; i ++ ) {

						uniform._array[ i ] = getTextureUnit();

					}

					_gl.uniform1iv( location, uniform._array );

					for ( var i = 0, il = uniform.value.length; i < il; i ++ ) {

						texture = uniform.value[ i ];
						textureUnit = uniform._array[ i ];

						if ( ! texture ) continue;

						_this.setTexture( texture, textureUnit );

					}

					break;

				default:

					console.warn( 'THREE.WebGLRenderer: Unknown uniform type: ' + type );

			}

		}

	}

	function setupMatrices ( object, camera ) {

		object._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, object.matrixWorld );
		object._normalMatrix.getNormalMatrix( object._modelViewMatrix );

	}

	//

	function setColorGamma( array, offset, color, intensitySq ) {

		array[ offset ]     = color.r * color.r * intensitySq;
		array[ offset + 1 ] = color.g * color.g * intensitySq;
		array[ offset + 2 ] = color.b * color.b * intensitySq;

	}

	function setColorLinear( array, offset, color, intensity ) {

		array[ offset ]     = color.r * intensity;
		array[ offset + 1 ] = color.g * intensity;
		array[ offset + 2 ] = color.b * intensity;

	}

	function setupLights ( lights ) {

		var l, ll, light, n,
		r = 0, g = 0, b = 0,
		color, skyColor, groundColor,
		intensity,  intensitySq,
		position,
		distance,

		zlights = _lights,

		dirColors = zlights.directional.colors,
		dirPositions = zlights.directional.positions,

		pointColors = zlights.point.colors,
		pointPositions = zlights.point.positions,
		pointDistances = zlights.point.distances,

		spotColors = zlights.spot.colors,
		spotPositions = zlights.spot.positions,
		spotDistances = zlights.spot.distances,
		spotDirections = zlights.spot.directions,
		spotAnglesCos = zlights.spot.anglesCos,
		spotExponents = zlights.spot.exponents,

		hemiSkyColors = zlights.hemi.skyColors,
		hemiGroundColors = zlights.hemi.groundColors,
		hemiPositions = zlights.hemi.positions,

		dirLength = 0,
		pointLength = 0,
		spotLength = 0,
		hemiLength = 0,

		dirCount = 0,
		pointCount = 0,
		spotCount = 0,
		hemiCount = 0,

		dirOffset = 0,
		pointOffset = 0,
		spotOffset = 0,
		hemiOffset = 0;

		for ( l = 0, ll = lights.length; l < ll; l ++ ) {

			light = lights[ l ];

			if ( light.onlyShadow ) continue;

			color = light.color;
			intensity = light.intensity;
			distance = light.distance;

			if ( light instanceof THREE.AmbientLight ) {

				if ( ! light.visible ) continue;

				if ( _this.gammaInput ) {

					r += color.r * color.r;
					g += color.g * color.g;
					b += color.b * color.b;

				} else {

					r += color.r;
					g += color.g;
					b += color.b;

				}

			} else if ( light instanceof THREE.DirectionalLight ) {

				dirCount += 1;

				if ( ! light.visible ) continue;

				_direction.setFromMatrixPosition( light.matrixWorld );
				_vector3.setFromMatrixPosition( light.target.matrixWorld );
				_direction.sub( _vector3 );
				_direction.normalize();

				dirOffset = dirLength * 3;

				dirPositions[ dirOffset ]     = _direction.x;
				dirPositions[ dirOffset + 1 ] = _direction.y;
				dirPositions[ dirOffset + 2 ] = _direction.z;

				if ( _this.gammaInput ) {

					setColorGamma( dirColors, dirOffset, color, intensity * intensity );

				} else {

					setColorLinear( dirColors, dirOffset, color, intensity );

				}

				dirLength += 1;

			} else if ( light instanceof THREE.PointLight ) {

				pointCount += 1;

				if ( ! light.visible ) continue;

				pointOffset = pointLength * 3;

				if ( _this.gammaInput ) {

					setColorGamma( pointColors, pointOffset, color, intensity * intensity );

				} else {

					setColorLinear( pointColors, pointOffset, color, intensity );

				}

				_vector3.setFromMatrixPosition( light.matrixWorld );

				pointPositions[ pointOffset ]     = _vector3.x;
				pointPositions[ pointOffset + 1 ] = _vector3.y;
				pointPositions[ pointOffset + 2 ] = _vector3.z;

				pointDistances[ pointLength ] = distance;

				pointLength += 1;

			} else if ( light instanceof THREE.SpotLight ) {

				spotCount += 1;

				if ( ! light.visible ) continue;

				spotOffset = spotLength * 3;

				if ( _this.gammaInput ) {

					setColorGamma( spotColors, spotOffset, color, intensity * intensity );

				} else {

					setColorLinear( spotColors, spotOffset, color, intensity );

				}

				_direction.setFromMatrixPosition( light.matrixWorld );

				spotPositions[ spotOffset ]     = _direction.x;
				spotPositions[ spotOffset + 1 ] = _direction.y;
				spotPositions[ spotOffset + 2 ] = _direction.z;

				spotDistances[ spotLength ] = distance;

				_vector3.setFromMatrixPosition( light.target.matrixWorld );
				_direction.sub( _vector3 );
				_direction.normalize();

				spotDirections[ spotOffset ]     = _direction.x;
				spotDirections[ spotOffset + 1 ] = _direction.y;
				spotDirections[ spotOffset + 2 ] = _direction.z;

				spotAnglesCos[ spotLength ] = Math.cos( light.angle );
				spotExponents[ spotLength ] = light.exponent;

				spotLength += 1;

			} else if ( light instanceof THREE.HemisphereLight ) {

				hemiCount += 1;

				if ( ! light.visible ) continue;

				_direction.setFromMatrixPosition( light.matrixWorld );
				_direction.normalize();

				hemiOffset = hemiLength * 3;

				hemiPositions[ hemiOffset ]     = _direction.x;
				hemiPositions[ hemiOffset + 1 ] = _direction.y;
				hemiPositions[ hemiOffset + 2 ] = _direction.z;

				skyColor = light.color;
				groundColor = light.groundColor;

				if ( _this.gammaInput ) {

					intensitySq = intensity * intensity;

					setColorGamma( hemiSkyColors, hemiOffset, skyColor, intensitySq );
					setColorGamma( hemiGroundColors, hemiOffset, groundColor, intensitySq );

				} else {

					setColorLinear( hemiSkyColors, hemiOffset, skyColor, intensity );
					setColorLinear( hemiGroundColors, hemiOffset, groundColor, intensity );

				}

				hemiLength += 1;

			}

		}

		// null eventual remains from removed lights
		// (this is to avoid if in shader)

		for ( l = dirLength * 3, ll = Math.max( dirColors.length, dirCount * 3 ); l < ll; l ++ ) dirColors[ l ] = 0.0;
		for ( l = pointLength * 3, ll = Math.max( pointColors.length, pointCount * 3 ); l < ll; l ++ ) pointColors[ l ] = 0.0;
		for ( l = spotLength * 3, ll = Math.max( spotColors.length, spotCount * 3 ); l < ll; l ++ ) spotColors[ l ] = 0.0;
		for ( l = hemiLength * 3, ll = Math.max( hemiSkyColors.length, hemiCount * 3 ); l < ll; l ++ ) hemiSkyColors[ l ] = 0.0;
		for ( l = hemiLength * 3, ll = Math.max( hemiGroundColors.length, hemiCount * 3 ); l < ll; l ++ ) hemiGroundColors[ l ] = 0.0;

		zlights.directional.length = dirLength;
		zlights.point.length = pointLength;
		zlights.spot.length = spotLength;
		zlights.hemi.length = hemiLength;

		zlights.ambient[ 0 ] = r;
		zlights.ambient[ 1 ] = g;
		zlights.ambient[ 2 ] = b;

	}

	// GL state setting

	this.setFaceCulling = function ( cullFace, frontFaceDirection ) {

		if ( cullFace === THREE.CullFaceNone ) {

			_gl.disable( _gl.CULL_FACE );

		} else {

			if ( frontFaceDirection === THREE.FrontFaceDirectionCW ) {

				_gl.frontFace( _gl.CW );

			} else {

				_gl.frontFace( _gl.CCW );

			}

			if ( cullFace === THREE.CullFaceBack ) {

				_gl.cullFace( _gl.BACK );

			} else if ( cullFace === THREE.CullFaceFront ) {

				_gl.cullFace( _gl.FRONT );

			} else {

				_gl.cullFace( _gl.FRONT_AND_BACK );

			}

			_gl.enable( _gl.CULL_FACE );

		}

	};

	this.setMaterialFaces = function ( material ) {

		var doubleSided = material.side === THREE.DoubleSide;
		var flipSided = material.side === THREE.BackSide;

		if ( _oldDoubleSided !== doubleSided ) {

			if ( doubleSided ) {

				_gl.disable( _gl.CULL_FACE );

			} else {

				_gl.enable( _gl.CULL_FACE );

			}

			_oldDoubleSided = doubleSided;

		}

		if ( _oldFlipSided !== flipSided ) {

			if ( flipSided ) {

				_gl.frontFace( _gl.CW );

			} else {

				_gl.frontFace( _gl.CCW );

			}

			_oldFlipSided = flipSided;

		}

	};

	this.setDepthTest = function ( depthTest ) {

		if ( _oldDepthTest !== depthTest ) {

			if ( depthTest ) {

				_gl.enable( _gl.DEPTH_TEST );

			} else {

				_gl.disable( _gl.DEPTH_TEST );

			}

			_oldDepthTest = depthTest;

		}

	};

	this.setDepthWrite = function ( depthWrite ) {

		if ( _oldDepthWrite !== depthWrite ) {

			_gl.depthMask( depthWrite );
			_oldDepthWrite = depthWrite;

		}

	};

	function setLineWidth ( width ) {

		if ( width !== _oldLineWidth ) {

			_gl.lineWidth( width );

			_oldLineWidth = width;

		}

	}

	function setPolygonOffset ( polygonoffset, factor, units ) {

		if ( _oldPolygonOffset !== polygonoffset ) {

			if ( polygonoffset ) {

				_gl.enable( _gl.POLYGON_OFFSET_FILL );

			} else {

				_gl.disable( _gl.POLYGON_OFFSET_FILL );

			}

			_oldPolygonOffset = polygonoffset;

		}

		if ( polygonoffset && ( _oldPolygonOffsetFactor !== factor || _oldPolygonOffsetUnits !== units ) ) {

			_gl.polygonOffset( factor, units );

			_oldPolygonOffsetFactor = factor;
			_oldPolygonOffsetUnits = units;

		}

	}

	this.setBlending = function ( blending, blendEquation, blendSrc, blendDst ) {

		if ( blending !== _oldBlending ) {

			if ( blending === THREE.NoBlending ) {

				_gl.disable( _gl.BLEND );

			} else if ( blending === THREE.AdditiveBlending ) {

				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE );

			} else if ( blending === THREE.SubtractiveBlending ) {

				// TODO: Find blendFuncSeparate() combination
				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.ZERO, _gl.ONE_MINUS_SRC_COLOR );

			} else if ( blending === THREE.MultiplyBlending ) {

				// TODO: Find blendFuncSeparate() combination
				_gl.enable( _gl.BLEND );
				_gl.blendEquation( _gl.FUNC_ADD );
				_gl.blendFunc( _gl.ZERO, _gl.SRC_COLOR );

			} else if ( blending === THREE.CustomBlending ) {

				_gl.enable( _gl.BLEND );

			} else {

				_gl.enable( _gl.BLEND );
				_gl.blendEquationSeparate( _gl.FUNC_ADD, _gl.FUNC_ADD );
				_gl.blendFuncSeparate( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );

			}

			_oldBlending = blending;

		}

		if ( blending === THREE.CustomBlending ) {

			if ( blendEquation !== _oldBlendEquation ) {

				_gl.blendEquation( paramThreeToGL( blendEquation ) );

				_oldBlendEquation = blendEquation;

			}

			if ( blendSrc !== _oldBlendSrc || blendDst !== _oldBlendDst ) {

				_gl.blendFunc( paramThreeToGL( blendSrc ), paramThreeToGL( blendDst ) );

				_oldBlendSrc = blendSrc;
				_oldBlendDst = blendDst;

			}

		} else {

			_oldBlendEquation = null;
			_oldBlendSrc = null;
			_oldBlendDst = null;

		}

	};

	// Textures

	function setTextureParameters ( textureType, texture, isImagePowerOfTwo ) {

		var extension;

		if ( isImagePowerOfTwo ) {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, paramThreeToGL( texture.wrapS ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, paramThreeToGL( texture.wrapT ) );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, paramThreeToGL( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, paramThreeToGL( texture.minFilter ) );

		} else {

			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE );
			_gl.texParameteri( textureType, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE );

			_gl.texParameteri( textureType, _gl.TEXTURE_MAG_FILTER, filterFallback( texture.magFilter ) );
			_gl.texParameteri( textureType, _gl.TEXTURE_MIN_FILTER, filterFallback( texture.minFilter ) );

		}

		extension = extensions.get( 'EXT_texture_filter_anisotropic' );

		if ( extension && texture.type !== THREE.FloatType ) {

			if ( texture.anisotropy > 1 || texture.__oldAnisotropy ) {

				_gl.texParameterf( textureType, extension.TEXTURE_MAX_ANISOTROPY_EXT, Math.min( texture.anisotropy, _this.getMaxAnisotropy() ) );
				texture.__oldAnisotropy = texture.anisotropy;

			}

		}

	}

	this.uploadTexture = function ( texture ) {

		if ( texture.__webglInit === undefined ) {

			texture.__webglInit = true;

			texture.addEventListener( 'dispose', onTextureDispose );

			texture.__webglTexture = _gl.createTexture();

			_this.info.memory.textures ++;

		}

		_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

		_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );
		_gl.pixelStorei( _gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultiplyAlpha );
		_gl.pixelStorei( _gl.UNPACK_ALIGNMENT, texture.unpackAlignment );

		texture.image = clampToMaxSize( texture.image, _maxTextureSize );

		var image = texture.image,
		isImagePowerOfTwo = THREE.Math.isPowerOfTwo( image.width ) && THREE.Math.isPowerOfTwo( image.height ),
		glFormat = paramThreeToGL( texture.format ),
		glType = paramThreeToGL( texture.type );

		setTextureParameters( _gl.TEXTURE_2D, texture, isImagePowerOfTwo );

		var mipmap, mipmaps = texture.mipmaps;

		if ( texture instanceof THREE.DataTexture ) {

			// use manually created mipmaps if available
			// if there are no manual mipmaps
			// set 0 level mipmap and then use GL to generate other mipmap levels

			if ( mipmaps.length > 0 && isImagePowerOfTwo ) {

				for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];
					_gl.texImage2D( _gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

				}

				texture.generateMipmaps = false;

			} else {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, image.width, image.height, 0, glFormat, glType, image.data );

			}

		} else if ( texture instanceof THREE.CompressedTexture ) {

			for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

				mipmap = mipmaps[ i ];

				if ( texture.format !== THREE.RGBAFormat && texture.format !== THREE.RGBFormat ) {

					if ( getCompressedTextureFormats().indexOf( glFormat ) > -1 ) {

						_gl.compressedTexImage2D( _gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );

					} else {

						console.warn( "Attempt to load unsupported compressed texture format" );

					}

				} else {

					_gl.texImage2D( _gl.TEXTURE_2D, i, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

				}

			}

		} else { // regular Texture (image, video, canvas)

			// use manually created mipmaps if available
			// if there are no manual mipmaps
			// set 0 level mipmap and then use GL to generate other mipmap levels

			if ( mipmaps.length > 0 && isImagePowerOfTwo ) {

				for ( var i = 0, il = mipmaps.length; i < il; i ++ ) {

					mipmap = mipmaps[ i ];
					_gl.texImage2D( _gl.TEXTURE_2D, i, glFormat, glFormat, glType, mipmap );

				}

				texture.generateMipmaps = false;

			} else {

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, glFormat, glType, texture.image );

			}

		}

		if ( texture.generateMipmaps && isImagePowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

		texture.needsUpdate = false;

		if ( texture.onUpdate ) texture.onUpdate();

	};

	this.setTexture = function ( texture, slot ) {

		_gl.activeTexture( _gl.TEXTURE0 + slot );

		if ( texture.needsUpdate ) {

			_this.uploadTexture( texture );

		} else {

			_gl.bindTexture( _gl.TEXTURE_2D, texture.__webglTexture );

		}

	};

	function clampToMaxSize ( image, maxSize ) {

		if ( image.width > maxSize || image.height > maxSize ) {

			// Warning: Scaling through the canvas will only work with images that use
			// premultiplied alpha.

			var scale = maxSize / Math.max( image.width, image.height );

			var canvas = document.createElement( 'canvas' );
			canvas.width = Math.floor( image.width * scale );
			canvas.height = Math.floor( image.height * scale );

			var context = canvas.getContext( '2d' );
			context.drawImage( image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height );

			console.log( 'THREE.WebGLRenderer:', image, 'is too big (' + image.width + 'x' + image.height + '). Resized to ' + canvas.width + 'x' + canvas.height + '.' );

			return canvas;

		}

		return image;

	}

	function setCubeTexture ( texture, slot ) {

		if ( texture.image.length === 6 ) {

			if ( texture.needsUpdate ) {

				if ( ! texture.image.__webglTextureCube ) {

					texture.addEventListener( 'dispose', onTextureDispose );

					texture.image.__webglTextureCube = _gl.createTexture();

					_this.info.memory.textures ++;

				}

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

				_gl.pixelStorei( _gl.UNPACK_FLIP_Y_WEBGL, texture.flipY );

				var isCompressed = texture instanceof THREE.CompressedTexture;
				var isDataTexture = texture.image[ 0 ] instanceof THREE.DataTexture;

				var cubeImage = [];

				for ( var i = 0; i < 6; i ++ ) {

					if ( _this.autoScaleCubemaps && ! isCompressed && ! isDataTexture ) {

						cubeImage[ i ] = clampToMaxSize( texture.image[ i ], _maxCubemapSize );

					} else {

						cubeImage[ i ] = isDataTexture ? texture.image[ i ].image : texture.image[ i ];

					}

				}

				var image = cubeImage[ 0 ],
				isImagePowerOfTwo = THREE.Math.isPowerOfTwo( image.width ) && THREE.Math.isPowerOfTwo( image.height ),
				glFormat = paramThreeToGL( texture.format ),
				glType = paramThreeToGL( texture.type );

				setTextureParameters( _gl.TEXTURE_CUBE_MAP, texture, isImagePowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					if ( ! isCompressed ) {

						if ( isDataTexture ) {

							_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, cubeImage[ i ].width, cubeImage[ i ].height, 0, glFormat, glType, cubeImage[ i ].data );

						} else {

							_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, glFormat, glType, cubeImage[ i ] );

						}

					} else {

						var mipmap, mipmaps = cubeImage[ i ].mipmaps;

						for ( var j = 0, jl = mipmaps.length; j < jl; j ++ ) {

							mipmap = mipmaps[ j ];

							if ( texture.format !== THREE.RGBAFormat && texture.format !== THREE.RGBFormat ) {

								if ( getCompressedTextureFormats().indexOf( glFormat ) > -1 ) {

									_gl.compressedTexImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, mipmap.data );

								} else {

									console.warn( "Attempt to load unsupported compressed texture format" );

								}

							} else {

								_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, j, glFormat, mipmap.width, mipmap.height, 0, glFormat, glType, mipmap.data );

							}

						}

					}

				}

				if ( texture.generateMipmaps && isImagePowerOfTwo ) {

					_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

				}

				texture.needsUpdate = false;

				if ( texture.onUpdate ) texture.onUpdate();

			} else {

				_gl.activeTexture( _gl.TEXTURE0 + slot );
				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.image.__webglTextureCube );

			}

		}

	}

	function setCubeTextureDynamic ( texture, slot ) {

		_gl.activeTexture( _gl.TEXTURE0 + slot );
		_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, texture.__webglTexture );

	}

	// Render targets

	function setupFrameBuffer ( framebuffer, renderTarget, textureTarget ) {

		_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
		_gl.framebufferTexture2D( _gl.FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, textureTarget, renderTarget.__webglTexture, 0 );

	}

	function setupRenderBuffer ( renderbuffer, renderTarget  ) {

		_gl.bindRenderbuffer( _gl.RENDERBUFFER, renderbuffer );

		if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_COMPONENT16, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		/* For some reason this is not working. Defaulting to RGBA4.
		} else if ( ! renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.STENCIL_INDEX8, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );
		*/
		} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.DEPTH_STENCIL, renderTarget.width, renderTarget.height );
			_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderbuffer );

		} else {

			_gl.renderbufferStorage( _gl.RENDERBUFFER, _gl.RGBA4, renderTarget.width, renderTarget.height );

		}

	}

	this.setRenderTarget = function ( renderTarget ) {

		var isCube = ( renderTarget instanceof THREE.WebGLRenderTargetCube );

		if ( renderTarget && renderTarget.__webglFramebuffer === undefined ) {

			if ( renderTarget.depthBuffer === undefined ) renderTarget.depthBuffer = true;
			if ( renderTarget.stencilBuffer === undefined ) renderTarget.stencilBuffer = true;

			renderTarget.addEventListener( 'dispose', onRenderTargetDispose );

			renderTarget.__webglTexture = _gl.createTexture();

			_this.info.memory.textures ++;

			// Setup texture, create render and frame buffers

			var isTargetPowerOfTwo = THREE.Math.isPowerOfTwo( renderTarget.width ) && THREE.Math.isPowerOfTwo( renderTarget.height ),
				glFormat = paramThreeToGL( renderTarget.format ),
				glType = paramThreeToGL( renderTarget.type );

			if ( isCube ) {

				renderTarget.__webglFramebuffer = [];
				renderTarget.__webglRenderbuffer = [];

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_CUBE_MAP, renderTarget, isTargetPowerOfTwo );

				for ( var i = 0; i < 6; i ++ ) {

					renderTarget.__webglFramebuffer[ i ] = _gl.createFramebuffer();
					renderTarget.__webglRenderbuffer[ i ] = _gl.createRenderbuffer();

					_gl.texImage2D( _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

					setupFrameBuffer( renderTarget.__webglFramebuffer[ i ], renderTarget, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i );
					setupRenderBuffer( renderTarget.__webglRenderbuffer[ i ], renderTarget );

				}

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );

			} else {

				renderTarget.__webglFramebuffer = _gl.createFramebuffer();

				if ( renderTarget.shareDepthFrom ) {

					renderTarget.__webglRenderbuffer = renderTarget.shareDepthFrom.__webglRenderbuffer;

				} else {

					renderTarget.__webglRenderbuffer = _gl.createRenderbuffer();

				}

				_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
				setTextureParameters( _gl.TEXTURE_2D, renderTarget, isTargetPowerOfTwo );

				_gl.texImage2D( _gl.TEXTURE_2D, 0, glFormat, renderTarget.width, renderTarget.height, 0, glFormat, glType, null );

				setupFrameBuffer( renderTarget.__webglFramebuffer, renderTarget, _gl.TEXTURE_2D );

				if ( renderTarget.shareDepthFrom ) {

					if ( renderTarget.depthBuffer && ! renderTarget.stencilBuffer ) {

						_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_ATTACHMENT, _gl.RENDERBUFFER, renderTarget.__webglRenderbuffer );

					} else if ( renderTarget.depthBuffer && renderTarget.stencilBuffer ) {

						_gl.framebufferRenderbuffer( _gl.FRAMEBUFFER, _gl.DEPTH_STENCIL_ATTACHMENT, _gl.RENDERBUFFER, renderTarget.__webglRenderbuffer );

					}

				} else {

					setupRenderBuffer( renderTarget.__webglRenderbuffer, renderTarget );

				}

				if ( isTargetPowerOfTwo ) _gl.generateMipmap( _gl.TEXTURE_2D );

			}

			// Release everything

			if ( isCube ) {

				_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

			} else {

				_gl.bindTexture( _gl.TEXTURE_2D, null );

			}

			_gl.bindRenderbuffer( _gl.RENDERBUFFER, null );
			_gl.bindFramebuffer( _gl.FRAMEBUFFER, null );

		}

		var framebuffer, width, height, vx, vy;

		if ( renderTarget ) {

			if ( isCube ) {

				framebuffer = renderTarget.__webglFramebuffer[ renderTarget.activeCubeFace ];

			} else {

				framebuffer = renderTarget.__webglFramebuffer;

			}

			width = renderTarget.width;
			height = renderTarget.height;

			vx = 0;
			vy = 0;

		} else {

			framebuffer = null;

			width = _viewportWidth;
			height = _viewportHeight;

			vx = _viewportX;
			vy = _viewportY;

		}

		if ( framebuffer !== _currentFramebuffer ) {

			_gl.bindFramebuffer( _gl.FRAMEBUFFER, framebuffer );
			_gl.viewport( vx, vy, width, height );

			_currentFramebuffer = framebuffer;

		}

		_currentWidth = width;
		_currentHeight = height;

	};

	function updateRenderTargetMipmap ( renderTarget ) {

		if ( renderTarget instanceof THREE.WebGLRenderTargetCube ) {

			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_CUBE_MAP );
			_gl.bindTexture( _gl.TEXTURE_CUBE_MAP, null );

		} else {

			_gl.bindTexture( _gl.TEXTURE_2D, renderTarget.__webglTexture );
			_gl.generateMipmap( _gl.TEXTURE_2D );
			_gl.bindTexture( _gl.TEXTURE_2D, null );

		}

	}

	// Fallback filters for non-power-of-2 textures

	function filterFallback ( f ) {

		if ( f === THREE.NearestFilter || f === THREE.NearestMipMapNearestFilter || f === THREE.NearestMipMapLinearFilter ) {

			return _gl.NEAREST;

		}

		return _gl.LINEAR;

	}

	// Map three.js constants to WebGL constants

	function paramThreeToGL ( p ) {

		var extension;

		if ( p === THREE.RepeatWrapping ) return _gl.REPEAT;
		if ( p === THREE.ClampToEdgeWrapping ) return _gl.CLAMP_TO_EDGE;
		if ( p === THREE.MirroredRepeatWrapping ) return _gl.MIRRORED_REPEAT;

		if ( p === THREE.NearestFilter ) return _gl.NEAREST;
		if ( p === THREE.NearestMipMapNearestFilter ) return _gl.NEAREST_MIPMAP_NEAREST;
		if ( p === THREE.NearestMipMapLinearFilter ) return _gl.NEAREST_MIPMAP_LINEAR;

		if ( p === THREE.LinearFilter ) return _gl.LINEAR;
		if ( p === THREE.LinearMipMapNearestFilter ) return _gl.LINEAR_MIPMAP_NEAREST;
		if ( p === THREE.LinearMipMapLinearFilter ) return _gl.LINEAR_MIPMAP_LINEAR;

		if ( p === THREE.UnsignedByteType ) return _gl.UNSIGNED_BYTE;
		if ( p === THREE.UnsignedShort4444Type ) return _gl.UNSIGNED_SHORT_4_4_4_4;
		if ( p === THREE.UnsignedShort5551Type ) return _gl.UNSIGNED_SHORT_5_5_5_1;
		if ( p === THREE.UnsignedShort565Type ) return _gl.UNSIGNED_SHORT_5_6_5;

		if ( p === THREE.ByteType ) return _gl.BYTE;
		if ( p === THREE.ShortType ) return _gl.SHORT;
		if ( p === THREE.UnsignedShortType ) return _gl.UNSIGNED_SHORT;
		if ( p === THREE.IntType ) return _gl.INT;
		if ( p === THREE.UnsignedIntType ) return _gl.UNSIGNED_INT;
		if ( p === THREE.FloatType ) return _gl.FLOAT;

		if ( p === THREE.AlphaFormat ) return _gl.ALPHA;
		if ( p === THREE.RGBFormat ) return _gl.RGB;
		if ( p === THREE.RGBAFormat ) return _gl.RGBA;
		if ( p === THREE.LuminanceFormat ) return _gl.LUMINANCE;
		if ( p === THREE.LuminanceAlphaFormat ) return _gl.LUMINANCE_ALPHA;

		if ( p === THREE.AddEquation ) return _gl.FUNC_ADD;
		if ( p === THREE.SubtractEquation ) return _gl.FUNC_SUBTRACT;
		if ( p === THREE.ReverseSubtractEquation ) return _gl.FUNC_REVERSE_SUBTRACT;

		if ( p === THREE.ZeroFactor ) return _gl.ZERO;
		if ( p === THREE.OneFactor ) return _gl.ONE;
		if ( p === THREE.SrcColorFactor ) return _gl.SRC_COLOR;
		if ( p === THREE.OneMinusSrcColorFactor ) return _gl.ONE_MINUS_SRC_COLOR;
		if ( p === THREE.SrcAlphaFactor ) return _gl.SRC_ALPHA;
		if ( p === THREE.OneMinusSrcAlphaFactor ) return _gl.ONE_MINUS_SRC_ALPHA;
		if ( p === THREE.DstAlphaFactor ) return _gl.DST_ALPHA;
		if ( p === THREE.OneMinusDstAlphaFactor ) return _gl.ONE_MINUS_DST_ALPHA;

		if ( p === THREE.DstColorFactor ) return _gl.DST_COLOR;
		if ( p === THREE.OneMinusDstColorFactor ) return _gl.ONE_MINUS_DST_COLOR;
		if ( p === THREE.SrcAlphaSaturateFactor ) return _gl.SRC_ALPHA_SATURATE;

		extension = extensions.get( 'WEBGL_compressed_texture_s3tc' );

		if ( extension !== null ) {

			if ( p === THREE.RGB_S3TC_DXT1_Format ) return extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
			if ( p === THREE.RGBA_S3TC_DXT1_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT1_EXT;
			if ( p === THREE.RGBA_S3TC_DXT3_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT3_EXT;
			if ( p === THREE.RGBA_S3TC_DXT5_Format ) return extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;

		}

		extension = extensions.get( 'WEBGL_compressed_texture_pvrtc' );

		if ( extension !== null ) {

			if ( p === THREE.RGB_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
			if ( p === THREE.RGB_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
			if ( p === THREE.RGBA_PVRTC_4BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
			if ( p === THREE.RGBA_PVRTC_2BPPV1_Format ) return extension.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

		}

		extension = extensions.get( 'EXT_blend_minmax' );

		if ( extension !== null ) {

			if ( p === THREE.MinEquation ) return extension.MIN_EXT;
			if ( p === THREE.MaxEquation ) return extension.MAX_EXT;

		}

		return 0;

	}

	// Allocations

	function allocateBones ( object ) {

		if ( _supportsBoneTextures && object && object.skeleton && object.skeleton.useVertexTexture ) {

			return 1024;

		} else {

			// default for when object is not specified
			// ( for example when prebuilding shader
			//   to be used with multiple objects )
			//
			//  - leave some extra space for other uniforms
			//  - limit here is ANGLE's 254 max uniform vectors
			//    (up to 54 should be safe)

			var nVertexUniforms = _gl.getParameter( _gl.MAX_VERTEX_UNIFORM_VECTORS );
			var nVertexMatrices = Math.floor( ( nVertexUniforms - 20 ) / 4 );

			var maxBones = nVertexMatrices;

			if ( object !== undefined && object instanceof THREE.SkinnedMesh ) {

				maxBones = Math.min( object.skeleton.bones.length, maxBones );

				if ( maxBones < object.skeleton.bones.length ) {

					console.warn( 'WebGLRenderer: too many bones - ' + object.skeleton.bones.length + ', this GPU supports just ' + maxBones + ' (try OpenGL instead of ANGLE)' );

				}

			}

			return maxBones;

		}

	}

	function allocateLights( lights ) {

		var dirLights = 0;
		var pointLights = 0;
		var spotLights = 0;
		var hemiLights = 0;

		for ( var l = 0, ll = lights.length; l < ll; l ++ ) {

			var light = lights[ l ];

			if ( light.onlyShadow || light.visible === false ) continue;

			if ( light instanceof THREE.DirectionalLight ) dirLights ++;
			if ( light instanceof THREE.PointLight ) pointLights ++;
			if ( light instanceof THREE.SpotLight ) spotLights ++;
			if ( light instanceof THREE.HemisphereLight ) hemiLights ++;

		}

		return { 'directional': dirLights, 'point': pointLights, 'spot': spotLights, 'hemi': hemiLights };

	}

	function allocateShadows( lights ) {

		var maxShadows = 0;

		for ( var l = 0, ll = lights.length; l < ll; l ++ ) {

			var light = lights[ l ];

			if ( ! light.castShadow ) continue;

			if ( light instanceof THREE.SpotLight ) maxShadows ++;
			if ( light instanceof THREE.DirectionalLight && ! light.shadowCascade ) maxShadows ++;

		}

		return maxShadows;

	}

	// DEPRECATED
	
	this.initMaterial = function () {

		console.warn( 'THREE.WebGLRenderer: .initMaterial() has been removed.' );

	};

	this.addPrePlugin = function () {

		console.warn( 'THREE.WebGLRenderer: .addPrePlugin() has been removed.' );

	};

	this.addPostPlugin = function () {

		console.warn( 'THREE.WebGLRenderer: .addPostPlugin() has been removed.' );

	};

	this.updateShadowMap = function () {

		console.warn( 'THREE.WebGLRenderer: .updateShadowMap() has been removed.' );

	};

};

// File:src/renderers/WebGLRenderTarget.js

/**
 * @author szimek / https://github.com/szimek/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.WebGLRenderTarget = function ( width, height, options ) {

	this.width = width;
	this.height = height;

	options = options || {};

	this.wrapS = options.wrapS !== undefined ? options.wrapS : THREE.ClampToEdgeWrapping;
	this.wrapT = options.wrapT !== undefined ? options.wrapT : THREE.ClampToEdgeWrapping;

	this.magFilter = options.magFilter !== undefined ? options.magFilter : THREE.LinearFilter;
	this.minFilter = options.minFilter !== undefined ? options.minFilter : THREE.LinearMipMapLinearFilter;

	this.anisotropy = options.anisotropy !== undefined ? options.anisotropy : 1;

	this.offset = new THREE.Vector2( 0, 0 );
	this.repeat = new THREE.Vector2( 1, 1 );

	this.format = options.format !== undefined ? options.format : THREE.RGBAFormat;
	this.type = options.type !== undefined ? options.type : THREE.UnsignedByteType;

	this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
	this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : true;

	this.generateMipmaps = true;

	this.shareDepthFrom = null;

};

THREE.WebGLRenderTarget.prototype = {

	constructor: THREE.WebGLRenderTarget,

	setSize: function ( width, height ) {

		this.width = width;
		this.height = height;

	},

	clone: function () {

		var tmp = new THREE.WebGLRenderTarget( this.width, this.height );

		tmp.wrapS = this.wrapS;
		tmp.wrapT = this.wrapT;

		tmp.magFilter = this.magFilter;
		tmp.minFilter = this.minFilter;

		tmp.anisotropy = this.anisotropy;

		tmp.offset.copy( this.offset );
		tmp.repeat.copy( this.repeat );

		tmp.format = this.format;
		tmp.type = this.type;

		tmp.depthBuffer = this.depthBuffer;
		tmp.stencilBuffer = this.stencilBuffer;

		tmp.generateMipmaps = this.generateMipmaps;

		tmp.shareDepthFrom = this.shareDepthFrom;

		return tmp;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

};

THREE.EventDispatcher.prototype.apply( THREE.WebGLRenderTarget.prototype );

// File:src/renderers/WebGLRenderTargetCube.js

/**
 * @author alteredq / http://alteredqualia.com
 */

THREE.WebGLRenderTargetCube = function ( width, height, options ) {

	THREE.WebGLRenderTarget.call( this, width, height, options );

	this.activeCubeFace = 0; // PX 0, NX 1, PY 2, NY 3, PZ 4, NZ 5

};

THREE.WebGLRenderTargetCube.prototype = Object.create( THREE.WebGLRenderTarget.prototype );

// File:src/renderers/webgl/WebGLExtensions.js

THREE.WebGLExtensions = function ( gl ) {

	var extensions = {};

	this.get = function ( name ) {

		if ( extensions[ name ] !== undefined ) {

			return extensions[ name ];

		}

		var extension;

		switch ( name ) {
		
			case 'OES_texture_float':
				extension = gl.getExtension( 'OES_texture_float' );
				break;

			case 'OES_texture_float_linear':
				extension = gl.getExtension( 'OES_texture_float_linear' );
				break;

			case 'OES_standard_derivatives':
				extension = gl.getExtension( 'OES_standard_derivatives' );
				break;

			case 'EXT_texture_filter_anisotropic':
				extension = gl.getExtension( 'EXT_texture_filter_anisotropic' ) || gl.getExtension( 'MOZ_EXT_texture_filter_anisotropic' ) || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
				break;

			case 'WEBGL_compressed_texture_s3tc':
				extension = gl.getExtension( 'WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'MOZ_WEBGL_compressed_texture_s3tc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_s3tc' );
				break;

			case 'WEBGL_compressed_texture_pvrtc':
				extension = gl.getExtension( 'WEBGL_compressed_texture_pvrtc' ) || gl.getExtension( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
				break;

			case 'OES_element_index_uint':
				extension = gl.getExtension( 'OES_element_index_uint' );
				break;

			case 'EXT_blend_minmax':
				extension = gl.getExtension( 'EXT_blend_minmax' );
				break;

			case 'EXT_frag_depth':
				extension = gl.getExtension( 'EXT_frag_depth' );
				break;

		}

		if ( extension === null ) {

			console.log( 'THREE.WebGLRenderer: ' + name + ' extension not supported.' );

		}

		extensions[ name ] = extension;

		return extension;

	};

};

// File:src/renderers/webgl/WebGLProgram.js

THREE.WebGLProgram = ( function () {

	var programIdCount = 0;

	var generateDefines = function ( defines ) {

		var value, chunk, chunks = [];

		for ( var d in defines ) {

			value = defines[ d ];
			if ( value === false ) continue;

			chunk = "#define " + d + " " + value;
			chunks.push( chunk );

		}

		return chunks.join( "\n" );

	};

	var cacheUniformLocations = function ( gl, program, identifiers ) {

		var uniforms = {};

		for ( var i = 0, l = identifiers.length; i < l; i ++ ) {

			var id = identifiers[ i ];
			uniforms[ id ] = gl.getUniformLocation( program, id );

		}

		return uniforms;

	};

	var cacheAttributeLocations = function ( gl, program, identifiers ) {

		var attributes = {};

		for ( var i = 0, l = identifiers.length; i < l; i ++ ) {

			var id = identifiers[ i ];
			attributes[ id ] = gl.getAttribLocation( program, id );

		}

		return attributes;

	};

	return function ( renderer, code, material, parameters ) {

		var _this = renderer;
		var _gl = _this.context;

		var defines = material.defines;
		var uniforms = material.__webglShader.uniforms;
		var attributes = material.attributes;

		var vertexShader = material.__webglShader.vertexShader;
		var fragmentShader = material.__webglShader.fragmentShader;

		var index0AttributeName = material.index0AttributeName;

		if ( index0AttributeName === undefined && parameters.morphTargets === true ) {

			// programs with morphTargets displace position out of attribute 0

			index0AttributeName = 'position';

		}

		var shadowMapTypeDefine = "SHADOWMAP_TYPE_BASIC";

		if ( parameters.shadowMapType === THREE.PCFShadowMap ) {

			shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF";

		} else if ( parameters.shadowMapType === THREE.PCFSoftShadowMap ) {

			shadowMapTypeDefine = "SHADOWMAP_TYPE_PCF_SOFT";

		}

		// console.log( "building new program " );

		//

		var customDefines = generateDefines( defines );

		//

		var program = _gl.createProgram();

		var prefix_vertex, prefix_fragment;

		if ( material instanceof THREE.RawShaderMaterial ) {

			prefix_vertex = '';
			prefix_fragment = '';

		} else {

			prefix_vertex = [

				"precision " + parameters.precision + " float;",
				"precision " + parameters.precision + " int;",

				customDefines,

				parameters.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "",

				_this.gammaInput ? "#define GAMMA_INPUT" : "",
				_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",

				"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
				"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,
				"#define MAX_SPOT_LIGHTS " + parameters.maxSpotLights,
				"#define MAX_HEMI_LIGHTS " + parameters.maxHemiLights,

				"#define MAX_SHADOWS " + parameters.maxShadows,

				"#define MAX_BONES " + parameters.maxBones,

				parameters.map ? "#define USE_MAP" : "",
				parameters.envMap ? "#define USE_ENVMAP" : "",
				parameters.lightMap ? "#define USE_LIGHTMAP" : "",
				parameters.bumpMap ? "#define USE_BUMPMAP" : "",
				parameters.normalMap ? "#define USE_NORMALMAP" : "",
				parameters.specularMap ? "#define USE_SPECULARMAP" : "",
				parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
				parameters.vertexColors ? "#define USE_COLOR" : "",

				parameters.skinning ? "#define USE_SKINNING" : "",
				parameters.useVertexTexture ? "#define BONE_TEXTURE" : "",

				parameters.morphTargets ? "#define USE_MORPHTARGETS" : "",
				parameters.morphNormals ? "#define USE_MORPHNORMALS" : "",
				parameters.wrapAround ? "#define WRAP_AROUND" : "",
				parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
				parameters.flipSided ? "#define FLIP_SIDED" : "",

				parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
				parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
				parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
				parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

				parameters.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",

				parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
				//_this._glExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",


				"uniform mat4 modelMatrix;",
				"uniform mat4 modelViewMatrix;",
				"uniform mat4 projectionMatrix;",
				"uniform mat4 viewMatrix;",
				"uniform mat3 normalMatrix;",
				"uniform vec3 cameraPosition;",

				"attribute vec3 position;",
				"attribute vec3 normal;",
				"attribute vec2 uv;",
				"attribute vec2 uv2;",

				"#ifdef USE_COLOR",

				"	attribute vec3 color;",

				"#endif",

				"#ifdef USE_MORPHTARGETS",

				"	attribute vec3 morphTarget0;",
				"	attribute vec3 morphTarget1;",
				"	attribute vec3 morphTarget2;",
				"	attribute vec3 morphTarget3;",

				"	#ifdef USE_MORPHNORMALS",

				"		attribute vec3 morphNormal0;",
				"		attribute vec3 morphNormal1;",
				"		attribute vec3 morphNormal2;",
				"		attribute vec3 morphNormal3;",

				"	#else",

				"		attribute vec3 morphTarget4;",
				"		attribute vec3 morphTarget5;",
				"		attribute vec3 morphTarget6;",
				"		attribute vec3 morphTarget7;",

				"	#endif",

				"#endif",

				"#ifdef USE_SKINNING",

				"	attribute vec4 skinIndex;",
				"	attribute vec4 skinWeight;",

				"#endif",

				""

			].join( '\n' );

			prefix_fragment = [

				"precision " + parameters.precision + " float;",
				"precision " + parameters.precision + " int;",

				( parameters.bumpMap || parameters.normalMap ) ? "#extension GL_OES_standard_derivatives : enable" : "",

				customDefines,

				"#define MAX_DIR_LIGHTS " + parameters.maxDirLights,
				"#define MAX_POINT_LIGHTS " + parameters.maxPointLights,
				"#define MAX_SPOT_LIGHTS " + parameters.maxSpotLights,
				"#define MAX_HEMI_LIGHTS " + parameters.maxHemiLights,

				"#define MAX_SHADOWS " + parameters.maxShadows,

				parameters.alphaTest ? "#define ALPHATEST " + parameters.alphaTest: "",

				_this.gammaInput ? "#define GAMMA_INPUT" : "",
				_this.gammaOutput ? "#define GAMMA_OUTPUT" : "",

				( parameters.useFog && parameters.fog ) ? "#define USE_FOG" : "",
				( parameters.useFog && parameters.fogExp ) ? "#define FOG_EXP2" : "",

				parameters.map ? "#define USE_MAP" : "",
				parameters.envMap ? "#define USE_ENVMAP" : "",
				parameters.lightMap ? "#define USE_LIGHTMAP" : "",
				parameters.bumpMap ? "#define USE_BUMPMAP" : "",
				parameters.normalMap ? "#define USE_NORMALMAP" : "",
				parameters.specularMap ? "#define USE_SPECULARMAP" : "",
				parameters.alphaMap ? "#define USE_ALPHAMAP" : "",
				parameters.vertexColors ? "#define USE_COLOR" : "",

				parameters.metal ? "#define METAL" : "",
				parameters.wrapAround ? "#define WRAP_AROUND" : "",
				parameters.doubleSided ? "#define DOUBLE_SIDED" : "",
				parameters.flipSided ? "#define FLIP_SIDED" : "",

				parameters.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
				parameters.shadowMapEnabled ? "#define " + shadowMapTypeDefine : "",
				parameters.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "",
				parameters.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "",

				parameters.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
				//_this._glExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",

				"uniform mat4 viewMatrix;",
				"uniform vec3 cameraPosition;",
				""

			].join( '\n' );

		}

		var glVertexShader = new THREE.WebGLShader( _gl, _gl.VERTEX_SHADER, prefix_vertex + vertexShader );
		var glFragmentShader = new THREE.WebGLShader( _gl, _gl.FRAGMENT_SHADER, prefix_fragment + fragmentShader );

		_gl.attachShader( program, glVertexShader );
		_gl.attachShader( program, glFragmentShader );

		if ( index0AttributeName !== undefined ) {

			// Force a particular attribute to index 0.
			// because potentially expensive emulation is done by browser if attribute 0 is disabled.
			// And, color, for example is often automatically bound to index 0 so disabling it

			_gl.bindAttribLocation( program, 0, index0AttributeName );

		}

		_gl.linkProgram( program );

		if ( _gl.getProgramParameter( program, _gl.LINK_STATUS ) === false ) {

			console.error( 'THREE.WebGLProgram: Could not initialise shader.' );
			console.error( 'gl.VALIDATE_STATUS', _gl.getProgramParameter( program, _gl.VALIDATE_STATUS ) );
			console.error( 'gl.getError()', _gl.getError() );

		}

		if ( _gl.getProgramInfoLog( program ) !== '' ) {

			console.warn( 'THREE.WebGLProgram: gl.getProgramInfoLog()', _gl.getProgramInfoLog( program ) );

		}

		// clean up

		_gl.deleteShader( glVertexShader );
		_gl.deleteShader( glFragmentShader );

		// cache uniform locations

		var identifiers = [

			'viewMatrix', 'modelViewMatrix', 'projectionMatrix', 'normalMatrix', 'modelMatrix', 'cameraPosition', 'morphTargetInfluences', 'bindMatrix', 'bindMatrixInverse'

		];

		if ( parameters.useVertexTexture ) {

			identifiers.push( 'boneTexture' );
			identifiers.push( 'boneTextureWidth' );
			identifiers.push( 'boneTextureHeight' );

		} else {

			identifiers.push( 'boneGlobalMatrices' );

		}

		if ( parameters.logarithmicDepthBuffer ) {

			identifiers.push('logDepthBufFC');

		}


		for ( var u in uniforms ) {

			identifiers.push( u );

		}

		this.uniforms = cacheUniformLocations( _gl, program, identifiers );

		// cache attributes locations

		identifiers = [

			"position", "normal", "uv", "uv2", "tangent", "color",
			"skinIndex", "skinWeight", "lineDistance"

		];

		for ( var i = 0; i < parameters.maxMorphTargets; i ++ ) {

			identifiers.push( "morphTarget" + i );

		}

		for ( var i = 0; i < parameters.maxMorphNormals; i ++ ) {

			identifiers.push( "morphNormal" + i );

		}

		for ( var a in attributes ) {

			identifiers.push( a );

		}

		this.attributes = cacheAttributeLocations( _gl, program, identifiers );
		this.attributesKeys = Object.keys( this.attributes );

		//

		this.id = programIdCount ++;
		this.code = code;
		this.usedTimes = 1;
		this.program = program;
		this.vertexShader = glVertexShader;
		this.fragmentShader = glFragmentShader;

		return this;

	};

} )();

// File:src/renderers/webgl/WebGLShader.js

THREE.WebGLShader = ( function () {

	var addLineNumbers = function ( string ) {

		var lines = string.split( '\n' );

		for ( var i = 0; i < lines.length; i ++ ) {

			lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];

		}

		return lines.join( '\n' );

	};

	return function ( gl, type, string ) {

		var shader = gl.createShader( type ); 

		gl.shaderSource( shader, string );
		gl.compileShader( shader );

		if ( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) === false ) {

			console.error( 'THREE.WebGLShader: Shader couldn\'t compile.' );

		}

		if ( gl.getShaderInfoLog( shader ) !== '' ) {

			console.warn( 'THREE.WebGLShader: gl.getShaderInfoLog()', gl.getShaderInfoLog( shader ) );
			console.warn( addLineNumbers( string ) );

		}

		// --enable-privileged-webgl-extension
		// console.log( type, gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

		return shader;

	};

} )();

// File:src/renderers/webgl/plugins/LensFlarePlugin.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.LensFlarePlugin = function ( renderer, flares ) {

	var gl = renderer.context;

	var vertexBuffer, elementBuffer;
	var program, attributes, uniforms;
	var hasVertexTexture;

	var tempTexture, occlusionTexture;

	var init = function () {

		var vertices = new Float32Array( [
			-1, -1,  0, 0,
			 1, -1,  1, 0,
			 1,  1,  1, 1,
			-1,  1,  0, 1
		] );

		var faces = new Uint16Array( [
			0, 1, 2,
			0, 2, 3
		] );

		// buffers

		vertexBuffer     = gl.createBuffer();
		elementBuffer    = gl.createBuffer();

		gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, elementBuffer );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW );

		// textures

		tempTexture      = gl.createTexture();
		occlusionTexture = gl.createTexture();

		gl.bindTexture( gl.TEXTURE_2D, tempTexture );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, 16, 16, 0, gl.RGB, gl.UNSIGNED_BYTE, null );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );

		gl.bindTexture( gl.TEXTURE_2D, occlusionTexture );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 16, 16, 0, gl.RGBA, gl.UNSIGNED_BYTE, null );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );

		hasVertexTexture = gl.getParameter( gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ) > 0;

		var shader;

		if ( hasVertexTexture ) {

			shader = {

				vertexShader: [

					"uniform lowp int renderType;",

					"uniform vec3 screenPosition;",
					"uniform vec2 scale;",
					"uniform float rotation;",

					"uniform sampler2D occlusionMap;",

					"attribute vec2 position;",
					"attribute vec2 uv;",

					"varying vec2 vUV;",
					"varying float vVisibility;",

					"void main() {",

						"vUV = uv;",

						"vec2 pos = position;",

						"if( renderType == 2 ) {",

							"vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );",
							"visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );",

							"vVisibility =        visibility.r / 9.0;",
							"vVisibility *= 1.0 - visibility.g / 9.0;",
							"vVisibility *=       visibility.b / 9.0;",
							"vVisibility *= 1.0 - visibility.a / 9.0;",

							"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
							"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

						"}",

						"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

					"}"

				].join( "\n" ),

				fragmentShader: [

					"uniform lowp int renderType;",

					"uniform sampler2D map;",
					"uniform float opacity;",
					"uniform vec3 color;",

					"varying vec2 vUV;",
					"varying float vVisibility;",

					"void main() {",

						// pink square

						"if( renderType == 0 ) {",

							"gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );",

						// restore

						"} else if( renderType == 1 ) {",

							"gl_FragColor = texture2D( map, vUV );",

						// flare

						"} else {",

							"vec4 texture = texture2D( map, vUV );",
							"texture.a *= opacity * vVisibility;",
							"gl_FragColor = texture;",
							"gl_FragColor.rgb *= color;",

						"}",

					"}"

				].join( "\n" )

			};

		} else {

			shader = {

				vertexShader: [

					"uniform lowp int renderType;",

					"uniform vec3 screenPosition;",
					"uniform vec2 scale;",
					"uniform float rotation;",

					"attribute vec2 position;",
					"attribute vec2 uv;",

					"varying vec2 vUV;",

					"void main() {",

						"vUV = uv;",

						"vec2 pos = position;",

						"if( renderType == 2 ) {",

							"pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;",
							"pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;",

						"}",

						"gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );",

					"}"

				].join( "\n" ),

				fragmentShader: [

					"precision mediump float;",

					"uniform lowp int renderType;",

					"uniform sampler2D map;",
					"uniform sampler2D occlusionMap;",
					"uniform float opacity;",
					"uniform vec3 color;",

					"varying vec2 vUV;",

					"void main() {",

						// pink square

						"if( renderType == 0 ) {",

							"gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );",

						// restore

						"} else if( renderType == 1 ) {",

							"gl_FragColor = texture2D( map, vUV );",

						// flare

						"} else {",

							"float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;",
							"visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;",
							"visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;",
							"visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;",
							"visibility = ( 1.0 - visibility / 4.0 );",

							"vec4 texture = texture2D( map, vUV );",
							"texture.a *= opacity * visibility;",
							"gl_FragColor = texture;",
							"gl_FragColor.rgb *= color;",

						"}",

					"}"

				].join( "\n" )

			};

		}

		program = createProgram( shader );

		attributes = {
			vertex: gl.getAttribLocation ( program, "position" ),
			uv:     gl.getAttribLocation ( program, "uv" )
		}

		uniforms = {
			renderType:     gl.getUniformLocation( program, "renderType" ),
			map:            gl.getUniformLocation( program, "map" ),
			occlusionMap:   gl.getUniformLocation( program, "occlusionMap" ),
			opacity:        gl.getUniformLocation( program, "opacity" ),
			color:          gl.getUniformLocation( program, "color" ),
			scale:          gl.getUniformLocation( program, "scale" ),
			rotation:       gl.getUniformLocation( program, "rotation" ),
			screenPosition: gl.getUniformLocation( program, "screenPosition" )
		};

	};

	/*
	 * Render lens flares
	 * Method: renders 16x16 0xff00ff-colored points scattered over the light source area,
	 *         reads these back and calculates occlusion.
	 */

	this.render = function ( scene, camera, viewportWidth, viewportHeight ) {

		if ( flares.length === 0 ) return;

		var tempPosition = new THREE.Vector3();

		var invAspect = viewportHeight / viewportWidth,
			halfViewportWidth = viewportWidth * 0.5,
			halfViewportHeight = viewportHeight * 0.5;

		var size = 16 / viewportHeight,
			scale = new THREE.Vector2( size * invAspect, size );

		var screenPosition = new THREE.Vector3( 1, 1, 0 ),
			screenPositionPixels = new THREE.Vector2( 1, 1 );

		if ( program === undefined ) {

			init();

		}

		gl.useProgram( program );

		gl.enableVertexAttribArray( attributes.vertex );
		gl.enableVertexAttribArray( attributes.uv );

		// loop through all lens flares to update their occlusion and positions
		// setup gl and common used attribs/unforms

		gl.uniform1i( uniforms.occlusionMap, 0 );
		gl.uniform1i( uniforms.map, 1 );

		gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
		gl.vertexAttribPointer( attributes.vertex, 2, gl.FLOAT, false, 2 * 8, 0 );
		gl.vertexAttribPointer( attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8 );

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, elementBuffer );

		gl.disable( gl.CULL_FACE );
		gl.depthMask( false );

		for ( var i = 0, l = flares.length; i < l; i ++ ) {

			size = 16 / viewportHeight;
			scale.set( size * invAspect, size );

			// calc object screen position

			var flare = flares[ i ];
			
			tempPosition.set( flare.matrixWorld.elements[12], flare.matrixWorld.elements[13], flare.matrixWorld.elements[14] );

			tempPosition.applyMatrix4( camera.matrixWorldInverse );
			tempPosition.applyProjection( camera.projectionMatrix );

			// setup arrays for gl programs

			screenPosition.copy( tempPosition )

			screenPositionPixels.x = screenPosition.x * halfViewportWidth + halfViewportWidth;
			screenPositionPixels.y = screenPosition.y * halfViewportHeight + halfViewportHeight;

			// screen cull

			if ( hasVertexTexture || (
				screenPositionPixels.x > 0 &&
				screenPositionPixels.x < viewportWidth &&
				screenPositionPixels.y > 0 &&
				screenPositionPixels.y < viewportHeight ) ) {

				// save current RGB to temp texture

				gl.activeTexture( gl.TEXTURE1 );
				gl.bindTexture( gl.TEXTURE_2D, tempTexture );
				gl.copyTexImage2D( gl.TEXTURE_2D, 0, gl.RGB, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// render pink quad

				gl.uniform1i( uniforms.renderType, 0 );
				gl.uniform2f( uniforms.scale, scale.x, scale.y );
				gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );

				gl.disable( gl.BLEND );
				gl.enable( gl.DEPTH_TEST );

				gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );


				// copy result to occlusionMap

				gl.activeTexture( gl.TEXTURE0 );
				gl.bindTexture( gl.TEXTURE_2D, occlusionTexture );
				gl.copyTexImage2D( gl.TEXTURE_2D, 0, gl.RGBA, screenPositionPixels.x - 8, screenPositionPixels.y - 8, 16, 16, 0 );


				// restore graphics

				gl.uniform1i( uniforms.renderType, 1 );
				gl.disable( gl.DEPTH_TEST );

				gl.activeTexture( gl.TEXTURE1 );
				gl.bindTexture( gl.TEXTURE_2D, tempTexture );
				gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );


				// update object positions

				flare.positionScreen.copy( screenPosition )

				if ( flare.customUpdateCallback ) {

					flare.customUpdateCallback( flare );

				} else {

					flare.updateLensFlares();

				}

				// render flares

				gl.uniform1i( uniforms.renderType, 2 );
				gl.enable( gl.BLEND );

				for ( var j = 0, jl = flare.lensFlares.length; j < jl; j ++ ) {

					var sprite = flare.lensFlares[ j ];

					if ( sprite.opacity > 0.001 && sprite.scale > 0.001 ) {

						screenPosition.x = sprite.x;
						screenPosition.y = sprite.y;
						screenPosition.z = sprite.z;

						size = sprite.size * sprite.scale / viewportHeight;

						scale.x = size * invAspect;
						scale.y = size;

						gl.uniform3f( uniforms.screenPosition, screenPosition.x, screenPosition.y, screenPosition.z );
						gl.uniform2f( uniforms.scale, scale.x, scale.y );
						gl.uniform1f( uniforms.rotation, sprite.rotation );

						gl.uniform1f( uniforms.opacity, sprite.opacity );
						gl.uniform3f( uniforms.color, sprite.color.r, sprite.color.g, sprite.color.b );

						renderer.setBlending( sprite.blending, sprite.blendEquation, sprite.blendSrc, sprite.blendDst );
						renderer.setTexture( sprite.texture, 1 );

						gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );

					}

				}

			}

		}

		// restore gl

		gl.enable( gl.CULL_FACE );
		gl.enable( gl.DEPTH_TEST );
		gl.depthMask( true );

		renderer.resetGLState();

	};

	function createProgram ( shader ) {

		var program = gl.createProgram();

		var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
		var vertexShader = gl.createShader( gl.VERTEX_SHADER );

		var prefix = "precision " + renderer.getPrecision() + " float;\n";

		gl.shaderSource( fragmentShader, prefix + shader.fragmentShader );
		gl.shaderSource( vertexShader, prefix + shader.vertexShader );

		gl.compileShader( fragmentShader );
		gl.compileShader( vertexShader );

		gl.attachShader( program, fragmentShader );
		gl.attachShader( program, vertexShader );

		gl.linkProgram( program );

		return program;

	}

};

// File:src/renderers/webgl/plugins/ShadowMapPlugin.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ShadowMapPlugin = function ( _renderer, _lights, _webglObjects, _webglObjectsImmediate ) {

	var _gl = _renderer.context;

	var _depthMaterial, _depthMaterialMorph, _depthMaterialSkin, _depthMaterialMorphSkin,

	_frustum = new THREE.Frustum(),
	_projScreenMatrix = new THREE.Matrix4(),

	_min = new THREE.Vector3(),
	_max = new THREE.Vector3(),

	_matrixPosition = new THREE.Vector3(),
	
	_renderList = [];

	// init

	var depthShader = THREE.ShaderLib[ "depthRGBA" ];
	var depthUniforms = THREE.UniformsUtils.clone( depthShader.uniforms );

	_depthMaterial = new THREE.ShaderMaterial( {
		uniforms: depthUniforms,
		vertexShader: depthShader.vertexShader,
		fragmentShader: depthShader.fragmentShader
	 } );

	_depthMaterialMorph = new THREE.ShaderMaterial( {
		uniforms: depthUniforms,
		vertexShader: depthShader.vertexShader,
		fragmentShader: depthShader.fragmentShader,
		morphTargets: true
	} );

	_depthMaterialSkin = new THREE.ShaderMaterial( {
		uniforms: depthUniforms,
		vertexShader: depthShader.vertexShader,
		fragmentShader: depthShader.fragmentShader,
		skinning: true
	} );

	_depthMaterialMorphSkin = new THREE.ShaderMaterial( {
		uniforms: depthUniforms,
		vertexShader: depthShader.vertexShader,
		fragmentShader: depthShader.fragmentShader,
		morphTargets: true,
		skinning: true
	} );

	_depthMaterial._shadowPass = true;
	_depthMaterialMorph._shadowPass = true;
	_depthMaterialSkin._shadowPass = true;
	_depthMaterialMorphSkin._shadowPass = true;

	this.render = function ( scene, camera ) {

		if ( _renderer.shadowMapEnabled === false ) return;

		var i, il, j, jl, n,

		shadowMap, shadowMatrix, shadowCamera,
		program, buffer, material,
		webglObject, object, light,

		lights = [],
		k = 0,

		fog = null;

		// set GL state for depth map

		_gl.clearColor( 1, 1, 1, 1 );
		_gl.disable( _gl.BLEND );

		_gl.enable( _gl.CULL_FACE );
		_gl.frontFace( _gl.CCW );

		if ( _renderer.shadowMapCullFace === THREE.CullFaceFront ) {

			_gl.cullFace( _gl.FRONT );

		} else {

			_gl.cullFace( _gl.BACK );

		}

		_renderer.setDepthTest( true );

		// preprocess lights
		// 	- skip lights that are not casting shadows
		//	- create virtual lights for cascaded shadow maps

		for ( i = 0, il = _lights.length; i < il; i ++ ) {

			light = _lights[ i ];

			if ( ! light.castShadow ) continue;

			if ( ( light instanceof THREE.DirectionalLight ) && light.shadowCascade ) {

				for ( n = 0; n < light.shadowCascadeCount; n ++ ) {

					var virtualLight;

					if ( ! light.shadowCascadeArray[ n ] ) {

						virtualLight = createVirtualLight( light, n );
						virtualLight.originalCamera = camera;

						var gyro = new THREE.Gyroscope();
						gyro.position.copy( light.shadowCascadeOffset );

						gyro.add( virtualLight );
						gyro.add( virtualLight.target );

						camera.add( gyro );

						light.shadowCascadeArray[ n ] = virtualLight;

						console.log( "Created virtualLight", virtualLight );

					} else {

						virtualLight = light.shadowCascadeArray[ n ];

					}

					updateVirtualLight( light, n );

					lights[ k ] = virtualLight;
					k ++;

				}

			} else {

				lights[ k ] = light;
				k ++;

			}

		}

		// render depth map

		for ( i = 0, il = lights.length; i < il; i ++ ) {

			light = lights[ i ];

			if ( ! light.shadowMap ) {

				var shadowFilter = THREE.LinearFilter;

				if ( _renderer.shadowMapType === THREE.PCFSoftShadowMap ) {

					shadowFilter = THREE.NearestFilter;

				}

				var pars = { minFilter: shadowFilter, magFilter: shadowFilter, format: THREE.RGBAFormat };

				light.shadowMap = new THREE.WebGLRenderTarget( light.shadowMapWidth, light.shadowMapHeight, pars );
				light.shadowMapSize = new THREE.Vector2( light.shadowMapWidth, light.shadowMapHeight );

				light.shadowMatrix = new THREE.Matrix4();

			}

			if ( ! light.shadowCamera ) {

				if ( light instanceof THREE.SpotLight ) {

					light.shadowCamera = new THREE.PerspectiveCamera( light.shadowCameraFov, light.shadowMapWidth / light.shadowMapHeight, light.shadowCameraNear, light.shadowCameraFar );

				} else if ( light instanceof THREE.DirectionalLight ) {

					light.shadowCamera = new THREE.OrthographicCamera( light.shadowCameraLeft, light.shadowCameraRight, light.shadowCameraTop, light.shadowCameraBottom, light.shadowCameraNear, light.shadowCameraFar );

				} else {

					console.error( "Unsupported light type for shadow" );
					continue;

				}

				scene.add( light.shadowCamera );

				if ( scene.autoUpdate === true ) scene.updateMatrixWorld();

			}

			if ( light.shadowCameraVisible && ! light.cameraHelper ) {

				light.cameraHelper = new THREE.CameraHelper( light.shadowCamera );
				scene.add( light.cameraHelper );

			}

			if ( light.isVirtual && virtualLight.originalCamera == camera ) {

				updateShadowCamera( camera, light );

			}

			shadowMap = light.shadowMap;
			shadowMatrix = light.shadowMatrix;
			shadowCamera = light.shadowCamera;

			//

			shadowCamera.position.setFromMatrixPosition( light.matrixWorld );
			_matrixPosition.setFromMatrixPosition( light.target.matrixWorld );
			shadowCamera.lookAt( _matrixPosition );
			shadowCamera.updateMatrixWorld();

			shadowCamera.matrixWorldInverse.getInverse( shadowCamera.matrixWorld );

			//

			if ( light.cameraHelper ) light.cameraHelper.visible = light.shadowCameraVisible;
			if ( light.shadowCameraVisible ) light.cameraHelper.update();

			// compute shadow matrix

			shadowMatrix.set(
				0.5, 0.0, 0.0, 0.5,
				0.0, 0.5, 0.0, 0.5,
				0.0, 0.0, 0.5, 0.5,
				0.0, 0.0, 0.0, 1.0
			);

			shadowMatrix.multiply( shadowCamera.projectionMatrix );
			shadowMatrix.multiply( shadowCamera.matrixWorldInverse );

			// update camera matrices and frustum

			_projScreenMatrix.multiplyMatrices( shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse );
			_frustum.setFromMatrix( _projScreenMatrix );

			// render shadow map

			_renderer.setRenderTarget( shadowMap );
			_renderer.clear();

			// set object matrices & frustum culling

			_renderList.length = 0;

			projectObject( scene, scene, shadowCamera );


			// render regular objects

			var objectMaterial, useMorphing, useSkinning;

			for ( j = 0, jl = _renderList.length; j < jl; j ++ ) {

				webglObject = _renderList[ j ];

				object = webglObject.object;
				buffer = webglObject.buffer;

				// culling is overriden globally for all objects
				// while rendering depth map

				// need to deal with MeshFaceMaterial somehow
				// in that case just use the first of material.materials for now
				// (proper solution would require to break objects by materials
				//  similarly to regular rendering and then set corresponding
				//  depth materials per each chunk instead of just once per object)

				objectMaterial = getObjectMaterial( object );

				useMorphing = object.geometry.morphTargets !== undefined && object.geometry.morphTargets.length > 0 && objectMaterial.morphTargets;
				useSkinning = object instanceof THREE.SkinnedMesh && objectMaterial.skinning;

				if ( object.customDepthMaterial ) {

					material = object.customDepthMaterial;

				} else if ( useSkinning ) {

					material = useMorphing ? _depthMaterialMorphSkin : _depthMaterialSkin;

				} else if ( useMorphing ) {

					material = _depthMaterialMorph;

				} else {

					material = _depthMaterial;

				}

				_renderer.setMaterialFaces( objectMaterial );

				if ( buffer instanceof THREE.BufferGeometry ) {

					_renderer.renderBufferDirect( shadowCamera, _lights, fog, material, buffer, object );

				} else {

					_renderer.renderBuffer( shadowCamera, _lights, fog, material, buffer, object );

				}

			}

			// set matrices and render immediate objects

			for ( j = 0, jl = _webglObjectsImmediate.length; j < jl; j ++ ) {

				webglObject = _webglObjectsImmediate[ j ];
				object = webglObject.object;

				if ( object.visible && object.castShadow ) {

					object._modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );

					_renderer.renderImmediateObject( shadowCamera, _lights, fog, _depthMaterial, object );

				}

			}

		}

		// restore GL state

		var clearColor = _renderer.getClearColor(),
		clearAlpha = _renderer.getClearAlpha();

		_gl.clearColor( clearColor.r, clearColor.g, clearColor.b, clearAlpha );
		_gl.enable( _gl.BLEND );

		if ( _renderer.shadowMapCullFace === THREE.CullFaceFront ) {

			_gl.cullFace( _gl.BACK );

		}

		_renderer.resetGLState();

	};

	function projectObject( scene, object, shadowCamera ){

		if ( object.visible ) {

			var webglObjects = _webglObjects[ object.id ];

			if ( webglObjects && object.castShadow && (object.frustumCulled === false || _frustum.intersectsObject( object ) === true) ) {

				for ( var i = 0, l = webglObjects.length; i < l; i ++ ) {

					var webglObject = webglObjects[ i ];

					object._modelViewMatrix.multiplyMatrices( shadowCamera.matrixWorldInverse, object.matrixWorld );
					_renderList.push( webglObject );

				}

			}

			for ( var i = 0, l = object.children.length; i < l; i ++ ) {

				projectObject( scene, object.children[ i ], shadowCamera );

			}

		}

	}

	function createVirtualLight( light, cascade ) {

		var virtualLight = new THREE.DirectionalLight();

		virtualLight.isVirtual = true;

		virtualLight.onlyShadow = true;
		virtualLight.castShadow = true;

		virtualLight.shadowCameraNear = light.shadowCameraNear;
		virtualLight.shadowCameraFar = light.shadowCameraFar;

		virtualLight.shadowCameraLeft = light.shadowCameraLeft;
		virtualLight.shadowCameraRight = light.shadowCameraRight;
		virtualLight.shadowCameraBottom = light.shadowCameraBottom;
		virtualLight.shadowCameraTop = light.shadowCameraTop;

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;

		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];
		virtualLight.shadowMapWidth = light.shadowCascadeWidth[ cascade ];
		virtualLight.shadowMapHeight = light.shadowCascadeHeight[ cascade ];

		virtualLight.pointsWorld = [];
		virtualLight.pointsFrustum = [];

		var pointsWorld = virtualLight.pointsWorld,
			pointsFrustum = virtualLight.pointsFrustum;

		for ( var i = 0; i < 8; i ++ ) {

			pointsWorld[ i ] = new THREE.Vector3();
			pointsFrustum[ i ] = new THREE.Vector3();

		}

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		pointsFrustum[ 0 ].set( - 1, - 1, nearZ );
		pointsFrustum[ 1 ].set(  1, - 1, nearZ );
		pointsFrustum[ 2 ].set( - 1,  1, nearZ );
		pointsFrustum[ 3 ].set(  1,  1, nearZ );

		pointsFrustum[ 4 ].set( - 1, - 1, farZ );
		pointsFrustum[ 5 ].set(  1, - 1, farZ );
		pointsFrustum[ 6 ].set( - 1,  1, farZ );
		pointsFrustum[ 7 ].set(  1,  1, farZ );

		return virtualLight;

	}

	// Synchronize virtual light with the original light

	function updateVirtualLight( light, cascade ) {

		var virtualLight = light.shadowCascadeArray[ cascade ];

		virtualLight.position.copy( light.position );
		virtualLight.target.position.copy( light.target.position );
		virtualLight.lookAt( virtualLight.target );

		virtualLight.shadowCameraVisible = light.shadowCameraVisible;
		virtualLight.shadowDarkness = light.shadowDarkness;

		virtualLight.shadowBias = light.shadowCascadeBias[ cascade ];

		var nearZ = light.shadowCascadeNearZ[ cascade ];
		var farZ = light.shadowCascadeFarZ[ cascade ];

		var pointsFrustum = virtualLight.pointsFrustum;

		pointsFrustum[ 0 ].z = nearZ;
		pointsFrustum[ 1 ].z = nearZ;
		pointsFrustum[ 2 ].z = nearZ;
		pointsFrustum[ 3 ].z = nearZ;

		pointsFrustum[ 4 ].z = farZ;
		pointsFrustum[ 5 ].z = farZ;
		pointsFrustum[ 6 ].z = farZ;
		pointsFrustum[ 7 ].z = farZ;

	}

	// Fit shadow camera's ortho frustum to camera frustum

	function updateShadowCamera( camera, light ) {

		var shadowCamera = light.shadowCamera,
			pointsFrustum = light.pointsFrustum,
			pointsWorld = light.pointsWorld;

		_min.set( Infinity, Infinity, Infinity );
		_max.set( - Infinity, - Infinity, - Infinity );

		for ( var i = 0; i < 8; i ++ ) {

			var p = pointsWorld[ i ];

			p.copy( pointsFrustum[ i ] );
			p.unproject( camera );

			p.applyMatrix4( shadowCamera.matrixWorldInverse );

			if ( p.x < _min.x ) _min.x = p.x;
			if ( p.x > _max.x ) _max.x = p.x;

			if ( p.y < _min.y ) _min.y = p.y;
			if ( p.y > _max.y ) _max.y = p.y;

			if ( p.z < _min.z ) _min.z = p.z;
			if ( p.z > _max.z ) _max.z = p.z;

		}

		shadowCamera.left = _min.x;
		shadowCamera.right = _max.x;
		shadowCamera.top = _max.y;
		shadowCamera.bottom = _min.y;

		// can't really fit near/far
		//shadowCamera.near = _min.z;
		//shadowCamera.far = _max.z;

		shadowCamera.updateProjectionMatrix();

	}

	// For the moment just ignore objects that have multiple materials with different animation methods
	// Only the first material will be taken into account for deciding which depth material to use for shadow maps

	function getObjectMaterial( object ) {

		return object.material instanceof THREE.MeshFaceMaterial
			? object.material.materials[ 0 ]
			: object.material;

	};

};

// File:src/renderers/webgl/plugins/SpritePlugin.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SpritePlugin = function ( renderer, sprites ) {

	var gl = renderer.context;

	var vertexBuffer, elementBuffer;
	var program, attributes, uniforms;

	var texture;
	
	var init = function () {

		var vertices = new Float32Array( [
			- 0.5, - 0.5,  0, 0,
			  0.5, - 0.5,  1, 0,
			  0.5,   0.5,  1, 1,
			- 0.5,   0.5,  0, 1
		] );

		var faces = new Uint16Array( [
			0, 1, 2,
			0, 2, 3
		] );

		vertexBuffer  = gl.createBuffer();
		elementBuffer = gl.createBuffer();

		gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, elementBuffer );
		gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, faces, gl.STATIC_DRAW );

		program = createProgram();

		attributes = {
			position:			gl.getAttribLocation ( program, 'position' ),
			uv:					gl.getAttribLocation ( program, 'uv' )
		};

		uniforms = {
			uvOffset:			gl.getUniformLocation( program, 'uvOffset' ),
			uvScale:			gl.getUniformLocation( program, 'uvScale' ),

			rotation:			gl.getUniformLocation( program, 'rotation' ),
			scale:				gl.getUniformLocation( program, 'scale' ),

			color:				gl.getUniformLocation( program, 'color' ),
			map:				gl.getUniformLocation( program, 'map' ),
			opacity:			gl.getUniformLocation( program, 'opacity' ),

			modelViewMatrix: 	gl.getUniformLocation( program, 'modelViewMatrix' ),
			projectionMatrix:	gl.getUniformLocation( program, 'projectionMatrix' ),

			fogType:			gl.getUniformLocation( program, 'fogType' ),
			fogDensity:			gl.getUniformLocation( program, 'fogDensity' ),
			fogNear:			gl.getUniformLocation( program, 'fogNear' ),
			fogFar:				gl.getUniformLocation( program, 'fogFar' ),
			fogColor:			gl.getUniformLocation( program, 'fogColor' ),

			alphaTest:			gl.getUniformLocation( program, 'alphaTest' )
		};

		var canvas = document.createElement( 'canvas' );
		canvas.width = 8;
		canvas.height = 8;

		var context = canvas.getContext( '2d' );
		context.fillStyle = 'white';
		context.fillRect( 0, 0, 8, 8 );

		texture = new THREE.Texture( canvas );
		texture.needsUpdate = true;

	};

	this.render = function ( scene, camera ) {

		if ( sprites.length === 0 ) return;

		// setup gl

		if ( program === undefined ) {

			init();

		}

		gl.useProgram( program );

		gl.enableVertexAttribArray( attributes.position );
		gl.enableVertexAttribArray( attributes.uv );

		gl.disable( gl.CULL_FACE );
		gl.enable( gl.BLEND );

		gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
		gl.vertexAttribPointer( attributes.position, 2, gl.FLOAT, false, 2 * 8, 0 );
		gl.vertexAttribPointer( attributes.uv, 2, gl.FLOAT, false, 2 * 8, 8 );

		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, elementBuffer );

		gl.uniformMatrix4fv( uniforms.projectionMatrix, false, camera.projectionMatrix.elements );

		gl.activeTexture( gl.TEXTURE0 );
		gl.uniform1i( uniforms.map, 0 );

		var oldFogType = 0;
		var sceneFogType = 0;
		var fog = scene.fog;

		if ( fog ) {

			gl.uniform3f( uniforms.fogColor, fog.color.r, fog.color.g, fog.color.b );

			if ( fog instanceof THREE.Fog ) {

				gl.uniform1f( uniforms.fogNear, fog.near );
				gl.uniform1f( uniforms.fogFar, fog.far );

				gl.uniform1i( uniforms.fogType, 1 );
				oldFogType = 1;
				sceneFogType = 1;

			} else if ( fog instanceof THREE.FogExp2 ) {

				gl.uniform1f( uniforms.fogDensity, fog.density );

				gl.uniform1i( uniforms.fogType, 2 );
				oldFogType = 2;
				sceneFogType = 2;

			}

		} else {

			gl.uniform1i( uniforms.fogType, 0 );
			oldFogType = 0;
			sceneFogType = 0;

		}


		// update positions and sort

		for ( var i = 0, l = sprites.length; i < l; i ++ ) {

			var sprite = sprites[ i ];

			sprite._modelViewMatrix.multiplyMatrices( camera.matrixWorldInverse, sprite.matrixWorld );

			if ( sprite.renderDepth === null ) {

				sprite.z = - sprite._modelViewMatrix.elements[ 14 ];

			} else {

				sprite.z = sprite.renderDepth;

			}

		}

		sprites.sort( painterSortStable );

		// render all sprites

		var scale = [];

		for ( var i = 0, l = sprites.length; i < l; i ++ ) {

			var sprite = sprites[ i ];
			var material = sprite.material;

			gl.uniform1f( uniforms.alphaTest, material.alphaTest );
			gl.uniformMatrix4fv( uniforms.modelViewMatrix, false, sprite._modelViewMatrix.elements );

			scale[ 0 ] = sprite.scale.x;
			scale[ 1 ] = sprite.scale.y;

			var fogType = 0;

			if ( scene.fog && material.fog ) {

				fogType = sceneFogType;

			}

			if ( oldFogType !== fogType ) {

				gl.uniform1i( uniforms.fogType, fogType );
				oldFogType = fogType;

			}

			if ( material.map !== null ) {

				gl.uniform2f( uniforms.uvOffset, material.map.offset.x, material.map.offset.y );
				gl.uniform2f( uniforms.uvScale, material.map.repeat.x, material.map.repeat.y );

			} else {

				gl.uniform2f( uniforms.uvOffset, 0, 0 );
				gl.uniform2f( uniforms.uvScale, 1, 1 );

			}

			gl.uniform1f( uniforms.opacity, material.opacity );
			gl.uniform3f( uniforms.color, material.color.r, material.color.g, material.color.b );

			gl.uniform1f( uniforms.rotation, material.rotation );
			gl.uniform2fv( uniforms.scale, scale );

			renderer.setBlending( material.blending, material.blendEquation, material.blendSrc, material.blendDst );
			renderer.setDepthTest( material.depthTest );
			renderer.setDepthWrite( material.depthWrite );

			if ( material.map && material.map.image && material.map.image.width ) {

				renderer.setTexture( material.map, 0 );

			} else {

				renderer.setTexture( texture, 0 );

			}

			gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );

		}

		// restore gl

		gl.enable( gl.CULL_FACE );
		
		renderer.resetGLState();

	};

	function createProgram () {

		var program = gl.createProgram();

		var vertexShader = gl.createShader( gl.VERTEX_SHADER );
		var fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );

		gl.shaderSource( vertexShader, [

			'precision ' + renderer.getPrecision() + ' float;',

			'uniform mat4 modelViewMatrix;',
			'uniform mat4 projectionMatrix;',
			'uniform float rotation;',
			'uniform vec2 scale;',
			'uniform vec2 uvOffset;',
			'uniform vec2 uvScale;',

			'attribute vec2 position;',
			'attribute vec2 uv;',

			'varying vec2 vUV;',

			'void main() {',

				'vUV = uvOffset + uv * uvScale;',

				'vec2 alignedPosition = position * scale;',

				'vec2 rotatedPosition;',
				'rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;',
				'rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;',

				'vec4 finalPosition;',

				'finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );',
				'finalPosition.xy += rotatedPosition;',
				'finalPosition = projectionMatrix * finalPosition;',

				'gl_Position = finalPosition;',

			'}'

		].join( '\n' ) );

		gl.shaderSource( fragmentShader, [

			'precision ' + renderer.getPrecision() + ' float;',

			'uniform vec3 color;',
			'uniform sampler2D map;',
			'uniform float opacity;',

			'uniform int fogType;',
			'uniform vec3 fogColor;',
			'uniform float fogDensity;',
			'uniform float fogNear;',
			'uniform float fogFar;',
			'uniform float alphaTest;',

			'varying vec2 vUV;',

			'void main() {',

				'vec4 texture = texture2D( map, vUV );',

				'if ( texture.a < alphaTest ) discard;',

				'gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );',

				'if ( fogType > 0 ) {',

					'float depth = gl_FragCoord.z / gl_FragCoord.w;',
					'float fogFactor = 0.0;',

					'if ( fogType == 1 ) {',

						'fogFactor = smoothstep( fogNear, fogFar, depth );',

					'} else {',

						'const float LOG2 = 1.442695;',
						'float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );',
						'fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );',

					'}',

					'gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );',

				'}',

			'}'

		].join( '\n' ) );

		gl.compileShader( vertexShader );
		gl.compileShader( fragmentShader );

		gl.attachShader( program, vertexShader );
		gl.attachShader( program, fragmentShader );

		gl.linkProgram( program );

		return program;

	};

	function painterSortStable ( a, b ) {

		if ( a.z !== b.z ) {

			return b.z - a.z;

		} else {

			return b.id - a.id;

		}

	};

};

// File:src/extras/GeometryUtils.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.GeometryUtils = {

	merge: function ( geometry1, geometry2, materialIndexOffset ) {

		console.warn( 'THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.' );

		var matrix;

		if ( geometry2 instanceof THREE.Mesh ) {

			geometry2.matrixAutoUpdate && geometry2.updateMatrix();

			matrix = geometry2.matrix;
			geometry2 = geometry2.geometry;

		}

		geometry1.merge( geometry2, matrix, materialIndexOffset );

	},

	center: function ( geometry ) {

		console.warn( 'THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.' );
		return geometry.center();

	}

};

// File:src/extras/ImageUtils.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author Daosheng Mu / https://github.com/DaoshengMu/
 */

THREE.ImageUtils = {

	crossOrigin: undefined,

	loadTexture: function ( url, mapping, onLoad, onError ) {

		var loader = new THREE.ImageLoader();
		loader.crossOrigin = this.crossOrigin;

		var texture = new THREE.Texture( undefined, mapping );

		loader.load( url, function ( image ) {

			texture.image = image;
			texture.needsUpdate = true;

			if ( onLoad ) onLoad( texture );

		}, undefined, function ( event ) {

			if ( onError ) onError( event );

		} );

		texture.sourceFile = url;

		return texture;

	},

	loadTextureCube: function ( array, mapping, onLoad, onError ) {

		var images = [];

		var loader = new THREE.ImageLoader();
		loader.crossOrigin = this.crossOrigin;

		var texture = new THREE.CubeTexture( images, mapping );

		// no flipping needed for cube textures

		texture.flipY = false;

		var loaded = 0;

		var loadTexture = function ( i ) {

			loader.load( array[ i ], function ( image ) {

				texture.images[ i ] = image;

				loaded += 1;

				if ( loaded === 6 ) {

					texture.needsUpdate = true;

					if ( onLoad ) onLoad( texture );

				}

			} );

		}

		for ( var i = 0, il = array.length; i < il; ++ i ) {

			loadTexture( i );

		}

		return texture;

	},

	loadCompressedTexture: function () {

		console.error( 'THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.' )

	},

	loadCompressedTextureCube: function () {

		console.error( 'THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.' )

	},

	getNormalMap: function ( image, depth ) {

		// Adapted from http://www.paulbrunt.co.uk/lab/heightnormal/

		var cross = function ( a, b ) {

			return [ a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ], a[ 2 ] * b[ 0 ] - a[ 0 ] * b[ 2 ], a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] ];

		}

		var subtract = function ( a, b ) {

			return [ a[ 0 ] - b[ 0 ], a[ 1 ] - b[ 1 ], a[ 2 ] - b[ 2 ] ];

		}

		var normalize = function ( a ) {

			var l = Math.sqrt( a[ 0 ] * a[ 0 ] + a[ 1 ] * a[ 1 ] + a[ 2 ] * a[ 2 ] );
			return [ a[ 0 ] / l, a[ 1 ] / l, a[ 2 ] / l ];

		}

		depth = depth | 1;

		var width = image.width;
		var height = image.height;

		var canvas = document.createElement( 'canvas' );
		canvas.width = width;
		canvas.height = height;

		var context = canvas.getContext( '2d' );
		context.drawImage( image, 0, 0 );

		var data = context.getImageData( 0, 0, width, height ).data;
		var imageData = context.createImageData( width, height );
		var output = imageData.data;

		for ( var x = 0; x < width; x ++ ) {

			for ( var y = 0; y < height; y ++ ) {

				var ly = y - 1 < 0 ? 0 : y - 1;
				var uy = y + 1 > height - 1 ? height - 1 : y + 1;
				var lx = x - 1 < 0 ? 0 : x - 1;
				var ux = x + 1 > width - 1 ? width - 1 : x + 1;

				var points = [];
				var origin = [ 0, 0, data[ ( y * width + x ) * 4 ] / 255 * depth ];
				points.push( [ - 1, 0, data[ ( y * width + lx ) * 4 ] / 255 * depth ] );
				points.push( [ - 1, - 1, data[ ( ly * width + lx ) * 4 ] / 255 * depth ] );
				points.push( [ 0, - 1, data[ ( ly * width + x ) * 4 ] / 255 * depth ] );
				points.push( [  1, - 1, data[ ( ly * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 1, 0, data[ ( y * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 1, 1, data[ ( uy * width + ux ) * 4 ] / 255 * depth ] );
				points.push( [ 0, 1, data[ ( uy * width + x ) * 4 ] / 255 * depth ] );
				points.push( [ - 1, 1, data[ ( uy * width + lx ) * 4 ] / 255 * depth ] );

				var normals = [];
				var num_points = points.length;

				for ( var i = 0; i < num_points; i ++ ) {

					var v1 = points[ i ];
					var v2 = points[ ( i + 1 ) % num_points ];
					v1 = subtract( v1, origin );
					v2 = subtract( v2, origin );
					normals.push( normalize( cross( v1, v2 ) ) );

				}

				var normal = [ 0, 0, 0 ];

				for ( var i = 0; i < normals.length; i ++ ) {

					normal[ 0 ] += normals[ i ][ 0 ];
					normal[ 1 ] += normals[ i ][ 1 ];
					normal[ 2 ] += normals[ i ][ 2 ];

				}

				normal[ 0 ] /= normals.length;
				normal[ 1 ] /= normals.length;
				normal[ 2 ] /= normals.length;

				var idx = ( y * width + x ) * 4;

				output[ idx ] = ( ( normal[ 0 ] + 1.0 ) / 2.0 * 255 ) | 0;
				output[ idx + 1 ] = ( ( normal[ 1 ] + 1.0 ) / 2.0 * 255 ) | 0;
				output[ idx + 2 ] = ( normal[ 2 ] * 255 ) | 0;
				output[ idx + 3 ] = 255;

			}

		}

		context.putImageData( imageData, 0, 0 );

		return canvas;

	},

	generateDataTexture: function ( width, height, color ) {

		var size = width * height;
		var data = new Uint8Array( 3 * size );

		var r = Math.floor( color.r * 255 );
		var g = Math.floor( color.g * 255 );
		var b = Math.floor( color.b * 255 );

		for ( var i = 0; i < size; i ++ ) {

			data[ i * 3 ] 	   = r;
			data[ i * 3 + 1 ] = g;
			data[ i * 3 + 2 ] = b;

		}

		var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
		texture.needsUpdate = true;

		return texture;

	}

};

// File:src/extras/SceneUtils.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new THREE.Object3D();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new THREE.Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach: function ( child, parent, scene ) {

		child.applyMatrix( parent.matrixWorld );
		parent.remove( child );
		scene.add( child );

	},

	attach: function ( child, scene, parent ) {

		var matrixWorldInverse = new THREE.Matrix4();
		matrixWorldInverse.getInverse( parent.matrixWorld );
		child.applyMatrix( matrixWorldInverse );

		scene.remove( child );
		parent.add( child );

	}

};

// File:src/extras/FontUtils.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For Text operations in three.js (See TextGeometry)
 *
 * It uses techniques used in:
 *
 * 	typeface.js and canvastext
 * 		For converting fonts and rendering with javascript
 *		http://typeface.neocracy.org
 *
 *	Triangulation ported from AS3
 *		Simple Polygon Triangulation
 *		http://actionsnippet.com/?p=1462
 *
 * 	A Method to triangulate shapes with holes
 *		http://www.sakri.net/blog/2009/06/12/an-approach-to-triangulating-polygons-with-holes/
 *
 */

THREE.FontUtils = {

	faces: {},

	// Just for now. face[weight][style]

	face: 'helvetiker',
	weight: 'normal',
	style: 'normal',
	size: 150,
	divisions: 10,

	getFace: function () {

		try {

			return this.faces[ this.face ][ this.weight ][ this.style ];

		} catch (e) {

			throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."

		};

	},

	loadFace: function ( data ) {

		var family = data.familyName.toLowerCase();

		var ThreeFont = this;

		ThreeFont.faces[ family ] = ThreeFont.faces[ family ] || {};

		ThreeFont.faces[ family ][ data.cssFontWeight ] = ThreeFont.faces[ family ][ data.cssFontWeight ] || {};
		ThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;

		var face = ThreeFont.faces[ family ][ data.cssFontWeight ][ data.cssFontStyle ] = data;

		return data;

	},

	drawText: function ( text ) {

		var characterPts = [], allPts = [];

		// RenderText

		var i, p,
			face = this.getFace(),
			scale = this.size / face.resolution,
			offset = 0,
			chars = String( text ).split( '' ),
			length = chars.length;

		var fontPaths = [];

		for ( i = 0; i < length; i ++ ) {

			var path = new THREE.Path();

			var ret = this.extractGlyphPoints( chars[ i ], face, scale, offset, path );
			offset += ret.offset;

			fontPaths.push( ret.path );

		}

		// get the width

		var width = offset / 2;
		//
		// for ( p = 0; p < allPts.length; p++ ) {
		//
		// 	allPts[ p ].x -= width;
		//
		// }

		//var extract = this.extractPoints( allPts, characterPts );
		//extract.contour = allPts;

		//extract.paths = fontPaths;
		//extract.offset = width;

		return { paths: fontPaths, offset: width };

	},




	extractGlyphPoints: function ( c, face, scale, offset, path ) {

		var pts = [];

		var i, i2, divisions,
			outline, action, length,
			scaleX, scaleY,
			x, y, cpx, cpy, cpx0, cpy0, cpx1, cpy1, cpx2, cpy2,
			laste,
			glyph = face.glyphs[ c ] || face.glyphs[ '?' ];

		if ( ! glyph ) return;

		if ( glyph.o ) {

			outline = glyph._cachedOutline || ( glyph._cachedOutline = glyph.o.split( ' ' ) );
			length = outline.length;

			scaleX = scale;
			scaleY = scale;

			for ( i = 0; i < length; ) {

				action = outline[ i ++ ];

				//console.log( action );

				switch ( action ) {

				case 'm':

					// Move To

					x = outline[ i ++ ] * scaleX + offset;
					y = outline[ i ++ ] * scaleY;

					path.moveTo( x, y );
					break;

				case 'l':

					// Line To

					x = outline[ i ++ ] * scaleX + offset;
					y = outline[ i ++ ] * scaleY;
					path.lineTo( x,y );
					break;

				case 'q':

					// QuadraticCurveTo

					cpx  = outline[ i ++ ] * scaleX + offset;
					cpy  = outline[ i ++ ] * scaleY;
					cpx1 = outline[ i ++ ] * scaleX + offset;
					cpy1 = outline[ i ++ ] * scaleY;

					path.quadraticCurveTo( cpx1, cpy1, cpx, cpy );

					laste = pts[ pts.length - 1 ];

					if ( laste ) {

						cpx0 = laste.x;
						cpy0 = laste.y;

						for ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {

							var t = i2 / divisions;
							var tx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );
							var ty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );
					  }

				  }

				  break;

				case 'b':

					// Cubic Bezier Curve

					cpx  = outline[ i ++ ] *  scaleX + offset;
					cpy  = outline[ i ++ ] *  scaleY;
					cpx1 = outline[ i ++ ] *  scaleX + offset;
					cpy1 = outline[ i ++ ] *  scaleY;
					cpx2 = outline[ i ++ ] *  scaleX + offset;
					cpy2 = outline[ i ++ ] *  scaleY;

					path.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );

					laste = pts[ pts.length - 1 ];

					if ( laste ) {

						cpx0 = laste.x;
						cpy0 = laste.y;

						for ( i2 = 1, divisions = this.divisions; i2 <= divisions; i2 ++ ) {

							var t = i2 / divisions;
							var tx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );
							var ty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );

						}

					}

					break;

				}

			}
		}



		return { offset: glyph.ha * scale, path:path };
	}

};


THREE.FontUtils.generateShapes = function ( text, parameters ) {

	// Parameters 

	parameters = parameters || {};

	var size = parameters.size !== undefined ? parameters.size : 100;
	var curveSegments = parameters.curveSegments !== undefined ? parameters.curveSegments : 4;

	var font = parameters.font !== undefined ? parameters.font : 'helvetiker';
	var weight = parameters.weight !== undefined ? parameters.weight : 'normal';
	var style = parameters.style !== undefined ? parameters.style : 'normal';

	THREE.FontUtils.size = size;
	THREE.FontUtils.divisions = curveSegments;

	THREE.FontUtils.face = font;
	THREE.FontUtils.weight = weight;
	THREE.FontUtils.style = style;

	// Get a Font data json object

	var data = THREE.FontUtils.drawText( text );

	var paths = data.paths;
	var shapes = [];

	for ( var p = 0, pl = paths.length; p < pl; p ++ ) {

		Array.prototype.push.apply( shapes, paths[ p ].toShapes() );

	}

	return shapes;

};


/**
 * This code is a quick port of code written in C++ which was submitted to
 * flipcode.com by John W. Ratcliff  // July 22, 2000
 * See original code and more information here:
 * http://www.flipcode.com/archives/Efficient_Polygon_Triangulation.shtml
 *
 * ported to actionscript by Zevan Rosser
 * www.actionsnippet.com
 *
 * ported to javascript by Joshua Koo
 * http://www.lab4games.net/zz85/blog
 *
 */


( function ( namespace ) {

	var EPSILON = 0.0000000001;

	// takes in an contour array and returns

	var process = function ( contour, indices ) {

		var n = contour.length;

		if ( n < 3 ) return null;

		var result = [],
			verts = [],
			vertIndices = [];

		/* we want a counter-clockwise polygon in verts */

		var u, v, w;

		if ( area( contour ) > 0.0 ) {

			for ( v = 0; v < n; v ++ ) verts[ v ] = v;

		} else {

			for ( v = 0; v < n; v ++ ) verts[ v ] = ( n - 1 ) - v;

		}

		var nv = n;

		/*  remove nv - 2 vertices, creating 1 triangle every time */

		var count = 2 * nv;   /* error detection */

		for ( v = nv - 1; nv > 2; ) {

			/* if we loop, it is probably a non-simple polygon */

			if ( ( count -- ) <= 0 ) {

				//** Triangulate: ERROR - probable bad polygon!

				//throw ( "Warning, unable to triangulate polygon!" );
				//return null;
				// Sometimes warning is fine, especially polygons are triangulated in reverse.
				console.log( 'Warning, unable to triangulate polygon!' );

				if ( indices ) return vertIndices;
				return result;

			}

			/* three consecutive vertices in current polygon, <u,v,w> */

			u = v; 	 	if ( nv <= u ) u = 0;     /* previous */
			v = u + 1;  if ( nv <= v ) v = 0;     /* new v    */
			w = v + 1;  if ( nv <= w ) w = 0;     /* next     */

			if ( snip( contour, u, v, w, nv, verts ) ) {

				var a, b, c, s, t;

				/* true names of the vertices */

				a = verts[ u ];
				b = verts[ v ];
				c = verts[ w ];

				/* output Triangle */

				result.push( [ contour[ a ],
					contour[ b ],
					contour[ c ] ] );


				vertIndices.push( [ verts[ u ], verts[ v ], verts[ w ] ] );

				/* remove v from the remaining polygon */

				for ( s = v, t = v + 1; t < nv; s++, t++ ) {

					verts[ s ] = verts[ t ];

				}

				nv --;

				/* reset error detection counter */

				count = 2 * nv;

			}

		}

		if ( indices ) return vertIndices;
		return result;

	};

	// calculate area of the contour polygon

	var area = function ( contour ) {

		var n = contour.length;
		var a = 0.0;

		for ( var p = n - 1, q = 0; q < n; p = q ++ ) {

			a += contour[ p ].x * contour[ q ].y - contour[ q ].x * contour[ p ].y;

		}

		return a * 0.5;

	};

	var snip = function ( contour, u, v, w, n, verts ) {

		var p;
		var ax, ay, bx, by;
		var cx, cy, px, py;

		ax = contour[ verts[ u ] ].x;
		ay = contour[ verts[ u ] ].y;

		bx = contour[ verts[ v ] ].x;
		by = contour[ verts[ v ] ].y;

		cx = contour[ verts[ w ] ].x;
		cy = contour[ verts[ w ] ].y;

		if ( EPSILON > ( ( ( bx - ax ) * ( cy - ay ) ) - ( ( by - ay ) * ( cx - ax ) ) ) ) return false;

		var aX, aY, bX, bY, cX, cY;
		var apx, apy, bpx, bpy, cpx, cpy;
		var cCROSSap, bCROSScp, aCROSSbp;

		aX = cx - bx;  aY = cy - by;
		bX = ax - cx;  bY = ay - cy;
		cX = bx - ax;  cY = by - ay;

		for ( p = 0; p < n; p ++ ) {

			px = contour[ verts[ p ] ].x
			py = contour[ verts[ p ] ].y

			if ( ( ( px === ax ) && ( py === ay ) ) ||
				 ( ( px === bx ) && ( py === by ) ) ||
				 ( ( px === cx ) && ( py === cy ) ) )	continue;

			apx = px - ax;  apy = py - ay;
			bpx = px - bx;  bpy = py - by;
			cpx = px - cx;  cpy = py - cy;

			// see if p is inside triangle abc

			aCROSSbp = aX * bpy - aY * bpx;
			cCROSSap = cX * apy - cY * apx;
			bCROSScp = bX * cpy - bY * cpx;

			if ( ( aCROSSbp >= - EPSILON ) && ( bCROSScp >= - EPSILON ) && ( cCROSSap >= - EPSILON ) ) return false;

		}

		return true;

	};


	namespace.Triangulate = process;
	namespace.Triangulate.area = area;

	return namespace;

} )( THREE.FontUtils );

// To use the typeface.js face files, hook up the API
self._typeface_js = { faces: THREE.FontUtils.faces, loadFace: THREE.FontUtils.loadFace };
THREE.typeface_js = self._typeface_js;

// File:src/extras/audio/Audio.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Audio = function ( listener ) {

	THREE.Object3D.call( this );

	this.type = 'Audio';

	this.context = listener.context;
	this.source = this.context.createBufferSource();

	this.gain = this.context.createGain();
	this.gain.connect( this.context.destination );

	this.panner = this.context.createPanner();
	this.panner.connect( this.gain );

};

THREE.Audio.prototype = Object.create( THREE.Object3D.prototype );

THREE.Audio.prototype.load = function ( file ) {

	var scope = this;

	var request = new XMLHttpRequest();
	request.open( 'GET', file, true );
	request.responseType = 'arraybuffer';
	request.onload = function ( e ) {

		scope.context.decodeAudioData( this.response, function ( buffer ) {

			scope.source.buffer = buffer;
			scope.source.connect( scope.panner );
			scope.source.start( 0 );

		} );

	};
	request.send();

	return this;

};

THREE.Audio.prototype.setLoop = function ( value ) {

	this.source.loop = value;

};

THREE.Audio.prototype.setRefDistance = function ( value ) {

	this.panner.refDistance = value;

};

THREE.Audio.prototype.setRolloffFactor = function ( value ) {

	this.panner.rolloffFactor = value;

};

THREE.Audio.prototype.updateMatrixWorld = ( function () {

	var position = new THREE.Vector3();

	return function ( force ) {

		THREE.Object3D.prototype.updateMatrixWorld.call( this, force );

		position.setFromMatrixPosition( this.matrixWorld );

		this.panner.setPosition( position.x, position.y, position.z );

	};

} )();

// File:src/extras/audio/AudioListener.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AudioListener = function () {

	THREE.Object3D.call( this );

	this.type = 'AudioListener';

	this.context = new ( window.AudioContext || window.webkitAudioContext )();

};

THREE.AudioListener.prototype = Object.create( THREE.Object3D.prototype );

THREE.AudioListener.prototype.updateMatrixWorld = ( function () {

	var position = new THREE.Vector3();
	var quaternion = new THREE.Quaternion();
	var scale = new THREE.Vector3();

	var orientation = new THREE.Vector3();
	var velocity = new THREE.Vector3();

	var positionPrev = new THREE.Vector3();

	return function ( force ) {

		THREE.Object3D.prototype.updateMatrixWorld.call( this, force );

		var listener = this.context.listener;

		this.matrixWorld.decompose( position, quaternion, scale );

		orientation.set( 0, 0, -1 ).applyQuaternion( quaternion );
		velocity.subVectors( position, positionPrev );

		listener.setPosition( position.x, position.y, position.z );
		listener.setOrientation( orientation.x, orientation.y, orientation.z, this.up.x, this.up.y, this.up.z );
		listener.setVelocity( velocity.x, velocity.y, velocity.z );

		positionPrev.copy( position );

	};

} )();

// File:src/extras/core/Curve.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Extensible curve object
 *
 * Some common of Curve methods
 * .getPoint(t), getTangent(t)
 * .getPointAt(u), getTagentAt(u)
 * .getPoints(), .getSpacedPoints()
 * .getLength()
 * .updateArcLengths()
 *
 * This following classes subclasses THREE.Curve:
 *
 * -- 2d classes --
 * THREE.LineCurve
 * THREE.QuadraticBezierCurve
 * THREE.CubicBezierCurve
 * THREE.SplineCurve
 * THREE.ArcCurve
 * THREE.EllipseCurve
 *
 * -- 3d classes --
 * THREE.LineCurve3
 * THREE.QuadraticBezierCurve3
 * THREE.CubicBezierCurve3
 * THREE.SplineCurve3
 * THREE.ClosedSplineCurve3
 *
 * A series of curves can be represented as a THREE.CurvePath
 *
 **/

/**************************************************************
 *	Abstract Curve base class
 **************************************************************/

THREE.Curve = function () {

};

// Virtual base class method to overwrite and implement in subclasses
//	- t [0 .. 1]

THREE.Curve.prototype.getPoint = function ( t ) {

	console.log( "Warning, getPoint() not implemented!" );
	return null;

};

// Get point at relative position in curve according to arc length
// - u [0 .. 1]

THREE.Curve.prototype.getPointAt = function ( u ) {

	var t = this.getUtoTmapping( u );
	return this.getPoint( t );

};

// Get sequence of points using getPoint( t )

THREE.Curve.prototype.getPoints = function ( divisions ) {

	if ( ! divisions ) divisions = 5;

	var d, pts = [];

	for ( d = 0; d <= divisions; d ++ ) {

		pts.push( this.getPoint( d / divisions ) );

	}

	return pts;

};

// Get sequence of points using getPointAt( u )

THREE.Curve.prototype.getSpacedPoints = function ( divisions ) {

	if ( ! divisions ) divisions = 5;

	var d, pts = [];

	for ( d = 0; d <= divisions; d ++ ) {

		pts.push( this.getPointAt( d / divisions ) );

	}

	return pts;

};

// Get total curve arc length

THREE.Curve.prototype.getLength = function () {

	var lengths = this.getLengths();
	return lengths[ lengths.length - 1 ];

};

// Get list of cumulative segment lengths

THREE.Curve.prototype.getLengths = function ( divisions ) {

	if ( ! divisions ) divisions = (this.__arcLengthDivisions) ? (this.__arcLengthDivisions): 200;

	if ( this.cacheArcLengths
		&& ( this.cacheArcLengths.length == divisions + 1 )
		&& ! this.needsUpdate) {

		//console.log( "cached", this.cacheArcLengths );
		return this.cacheArcLengths;

	}

	this.needsUpdate = false;

	var cache = [];
	var current, last = this.getPoint( 0 );
	var p, sum = 0;

	cache.push( 0 );

	for ( p = 1; p <= divisions; p ++ ) {

		current = this.getPoint ( p / divisions );
		sum += current.distanceTo( last );
		cache.push( sum );
		last = current;

	}

	this.cacheArcLengths = cache;

	return cache; // { sums: cache, sum:sum }; Sum is in the last element.

};


THREE.Curve.prototype.updateArcLengths = function() {
	this.needsUpdate = true;
	this.getLengths();
};

// Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equi distance

THREE.Curve.prototype.getUtoTmapping = function ( u, distance ) {

	var arcLengths = this.getLengths();

	var i = 0, il = arcLengths.length;

	var targetArcLength; // The targeted u distance value to get

	if ( distance ) {

		targetArcLength = distance;

	} else {

		targetArcLength = u * arcLengths[ il - 1 ];

	}

	//var time = Date.now();

	// binary search for the index with largest value smaller than target u distance

	var low = 0, high = il - 1, comparison;

	while ( low <= high ) {

		i = Math.floor( low + ( high - low ) / 2 ); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

		comparison = arcLengths[ i ] - targetArcLength;

		if ( comparison < 0 ) {

			low = i + 1;
			continue;

		} else if ( comparison > 0 ) {

			high = i - 1;
			continue;

		} else {

			high = i;
			break;

			// DONE

		}

	}

	i = high;

	//console.log('b' , i, low, high, Date.now()- time);

	if ( arcLengths[ i ] == targetArcLength ) {

		var t = i / ( il - 1 );
		return t;

	}

	// we could get finer grain at lengths, or use simple interpolatation between two points

	var lengthBefore = arcLengths[ i ];
    var lengthAfter = arcLengths[ i + 1 ];

    var segmentLength = lengthAfter - lengthBefore;

    // determine where we are between the 'before' and 'after' points

    var segmentFraction = ( targetArcLength - lengthBefore ) / segmentLength;

    // add that fractional amount to t

    var t = ( i + segmentFraction ) / ( il -1 );

	return t;

};

// Returns a unit vector tangent at t
// In case any sub curve does not implement its tangent derivation,
// 2 points a small delta apart will be used to find its gradient
// which seems to give a reasonable approximation

THREE.Curve.prototype.getTangent = function( t ) {

	var delta = 0.0001;
	var t1 = t - delta;
	var t2 = t + delta;

	// Capping in case of danger

	if ( t1 < 0 ) t1 = 0;
	if ( t2 > 1 ) t2 = 1;

	var pt1 = this.getPoint( t1 );
	var pt2 = this.getPoint( t2 );

	var vec = pt2.clone().sub(pt1);
	return vec.normalize();

};


THREE.Curve.prototype.getTangentAt = function ( u ) {

	var t = this.getUtoTmapping( u );
	return this.getTangent( t );

};





/**************************************************************
 *	Utils
 **************************************************************/

THREE.Curve.Utils = {

	tangentQuadraticBezier: function ( t, p0, p1, p2 ) {

		return 2 * ( 1 - t ) * ( p1 - p0 ) + 2 * t * ( p2 - p1 );

	},

	// Puay Bing, thanks for helping with this derivative!

	tangentCubicBezier: function (t, p0, p1, p2, p3 ) {

		return - 3 * p0 * (1 - t) * (1 - t)  +
			3 * p1 * (1 - t) * (1-t) - 6 *t *p1 * (1-t) +
			6 * t *  p2 * (1-t) - 3 * t * t * p2 +
			3 * t * t * p3;

	},

	tangentSpline: function ( t, p0, p1, p2, p3 ) {

		// To check if my formulas are correct

		var h00 = 6 * t * t - 6 * t; 	// derived from 2t^3 − 3t^2 + 1
		var h10 = 3 * t * t - 4 * t + 1; // t^3 − 2t^2 + t
		var h01 = - 6 * t * t + 6 * t; 	// − 2t3 + 3t2
		var h11 = 3 * t * t - 2 * t;	// t3 − t2

		return h00 + h10 + h01 + h11;

	},

	// Catmull-Rom

	interpolate: function( p0, p1, p2, p3, t ) {

		var v0 = ( p2 - p0 ) * 0.5;
		var v1 = ( p3 - p1 ) * 0.5;
		var t2 = t * t;
		var t3 = t * t2;
		return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	}

};


// TODO: Transformation for Curves?

/**************************************************************
 *	3D Curves
 **************************************************************/

// A Factory method for creating new curve subclasses

THREE.Curve.create = function ( constructor, getPointFunc ) {

	constructor.prototype = Object.create( THREE.Curve.prototype );
	constructor.prototype.getPoint = getPointFunc;

	return constructor;

};

// File:src/extras/core/CurvePath.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 **/

/**************************************************************
 *	Curved Path - a curve path is simply a array of connected
 *  curves, but retains the api of a curve
 **************************************************************/

THREE.CurvePath = function () {

	this.curves = [];
	this.bends = [];
	
	this.autoClose = false; // Automatically closes the path
};

THREE.CurvePath.prototype = Object.create( THREE.Curve.prototype );

THREE.CurvePath.prototype.add = function ( curve ) {

	this.curves.push( curve );

};

THREE.CurvePath.prototype.checkConnection = function() {
	// TODO
	// If the ending of curve is not connected to the starting
	// or the next curve, then, this is not a real path
};

THREE.CurvePath.prototype.closePath = function() {
	// TODO Test
	// and verify for vector3 (needs to implement equals)
	// Add a line curve if start and end of lines are not connected
	var startPoint = this.curves[0].getPoint(0);
	var endPoint = this.curves[this.curves.length-1].getPoint(1);
	
	if (! startPoint.equals(endPoint)) {
		this.curves.push( new THREE.LineCurve(endPoint, startPoint) );
	}
	
};

// To get accurate point with reference to
// entire path distance at time t,
// following has to be done:

// 1. Length of each sub path have to be known
// 2. Locate and identify type of curve
// 3. Get t for the curve
// 4. Return curve.getPointAt(t')

THREE.CurvePath.prototype.getPoint = function( t ) {

	var d = t * this.getLength();
	var curveLengths = this.getCurveLengths();
	var i = 0, diff, curve;

	// To think about boundaries points.

	while ( i < curveLengths.length ) {

		if ( curveLengths[ i ] >= d ) {

			diff = curveLengths[ i ] - d;
			curve = this.curves[ i ];

			var u = 1 - diff / curve.getLength();

			return curve.getPointAt( u );

			break;
		}

		i ++;

	}

	return null;

	// loop where sum != 0, sum > d , sum+1 <d

};

/*
THREE.CurvePath.prototype.getTangent = function( t ) {
};*/


// We cannot use the default THREE.Curve getPoint() with getLength() because in
// THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
// getPoint() depends on getLength

THREE.CurvePath.prototype.getLength = function() {

	var lens = this.getCurveLengths();
	return lens[ lens.length - 1 ];

};

// Compute lengths and cache them
// We cannot overwrite getLengths() because UtoT mapping uses it.

THREE.CurvePath.prototype.getCurveLengths = function() {

	// We use cache values if curves and cache array are same length

	if ( this.cacheLengths && this.cacheLengths.length == this.curves.length ) {

		return this.cacheLengths;

	};

	// Get length of subsurve
	// Push sums into cached array

	var lengths = [], sums = 0;
	var i, il = this.curves.length;

	for ( i = 0; i < il; i ++ ) {

		sums += this.curves[ i ].getLength();
		lengths.push( sums );

	}

	this.cacheLengths = lengths;

	return lengths;

};



// Returns min and max coordinates

THREE.CurvePath.prototype.getBoundingBox = function () {

	var points = this.getPoints();

	var maxX, maxY, maxZ;
	var minX, minY, minZ;

	maxX = maxY = Number.NEGATIVE_INFINITY;
	minX = minY = Number.POSITIVE_INFINITY;

	var p, i, il, sum;

	var v3 = points[0] instanceof THREE.Vector3;

	sum = v3 ? new THREE.Vector3() : new THREE.Vector2();

	for ( i = 0, il = points.length; i < il; i ++ ) {

		p = points[ i ];

		if ( p.x > maxX ) maxX = p.x;
		else if ( p.x < minX ) minX = p.x;

		if ( p.y > maxY ) maxY = p.y;
		else if ( p.y < minY ) minY = p.y;

		if ( v3 ) {

			if ( p.z > maxZ ) maxZ = p.z;
			else if ( p.z < minZ ) minZ = p.z;

		}

		sum.add( p );

	}

	var ret = {

		minX: minX,
		minY: minY,
		maxX: maxX,
		maxY: maxY

	};

	if ( v3 ) {

		ret.maxZ = maxZ;
		ret.minZ = minZ;

	}

	return ret;

};

/**************************************************************
 *	Create Geometries Helpers
 **************************************************************/

/// Generate geometry from path points (for Line or Points objects)

THREE.CurvePath.prototype.createPointsGeometry = function( divisions ) {

	var pts = this.getPoints( divisions, true );
	return this.createGeometry( pts );

};

// Generate geometry from equidistance sampling along the path

THREE.CurvePath.prototype.createSpacedPointsGeometry = function( divisions ) {

	var pts = this.getSpacedPoints( divisions, true );
	return this.createGeometry( pts );

};

THREE.CurvePath.prototype.createGeometry = function( points ) {

	var geometry = new THREE.Geometry();

	for ( var i = 0; i < points.length; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( points[ i ].x, points[ i ].y, points[ i ].z || 0) );

	}

	return geometry;

};


/**************************************************************
 *	Bend / Wrap Helper Methods
 **************************************************************/

// Wrap path / Bend modifiers?

THREE.CurvePath.prototype.addWrapPath = function ( bendpath ) {

	this.bends.push( bendpath );

};

THREE.CurvePath.prototype.getTransformedPoints = function( segments, bends ) {

	var oldPts = this.getPoints( segments ); // getPoints getSpacedPoints
	var i, il;

	if ( ! bends ) {

		bends = this.bends;

	}

	for ( i = 0, il = bends.length; i < il; i ++ ) {

		oldPts = this.getWrapPoints( oldPts, bends[ i ] );

	}

	return oldPts;

};

THREE.CurvePath.prototype.getTransformedSpacedPoints = function( segments, bends ) {

	var oldPts = this.getSpacedPoints( segments );

	var i, il;

	if ( ! bends ) {

		bends = this.bends;

	}

	for ( i = 0, il = bends.length; i < il; i ++ ) {

		oldPts = this.getWrapPoints( oldPts, bends[ i ] );

	}

	return oldPts;

};

// This returns getPoints() bend/wrapped around the contour of a path.
// Read http://www.planetclegg.com/projects/WarpingTextToSplines.html

THREE.CurvePath.prototype.getWrapPoints = function ( oldPts, path ) {

	var bounds = this.getBoundingBox();

	var i, il, p, oldX, oldY, xNorm;

	for ( i = 0, il = oldPts.length; i < il; i ++ ) {

		p = oldPts[ i ];

		oldX = p.x;
		oldY = p.y;

		xNorm = oldX / bounds.maxX;

		// If using actual distance, for length > path, requires line extrusions
		//xNorm = path.getUtoTmapping(xNorm, oldX); // 3 styles. 1) wrap stretched. 2) wrap stretch by arc length 3) warp by actual distance

		xNorm = path.getUtoTmapping( xNorm, oldX );

		// check for out of bounds?

		var pathPt = path.getPoint( xNorm );
		var normal = path.getTangent( xNorm );
		normal.set( - normal.y, normal.x ).multiplyScalar( oldY );

		p.x = pathPt.x + normal.x;
		p.y = pathPt.y + normal.y;

	}

	return oldPts;

};


// File:src/extras/core/Gyroscope.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Gyroscope = function () {

	THREE.Object3D.call( this );

};

THREE.Gyroscope.prototype = Object.create( THREE.Object3D.prototype );

THREE.Gyroscope.prototype.updateMatrixWorld = ( function () {

	var translationObject = new THREE.Vector3();
	var quaternionObject = new THREE.Quaternion();
	var scaleObject = new THREE.Vector3();

	var translationWorld = new THREE.Vector3();
	var quaternionWorld = new THREE.Quaternion();
	var scaleWorld = new THREE.Vector3();

	return function ( force ) {

		this.matrixAutoUpdate && this.updateMatrix();

		// update matrixWorld

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent ) {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				this.matrixWorld.decompose( translationWorld, quaternionWorld, scaleWorld );
				this.matrix.decompose( translationObject, quaternionObject, scaleObject );

				this.matrixWorld.compose( translationWorld, quaternionObject, scaleWorld );


			} else {

				this.matrixWorld.copy( this.matrix );

			}


			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	};
	
}() );

// File:src/extras/core/Path.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Creates free form 2d path using series of points, lines or curves.
 *
 **/

THREE.Path = function ( points ) {

	THREE.CurvePath.call(this);

	this.actions = [];

	if ( points ) {

		this.fromPoints( points );

	}

};

THREE.Path.prototype = Object.create( THREE.CurvePath.prototype );

THREE.PathActions = {

	MOVE_TO: 'moveTo',
	LINE_TO: 'lineTo',
	QUADRATIC_CURVE_TO: 'quadraticCurveTo', // Bezier quadratic curve
	BEZIER_CURVE_TO: 'bezierCurveTo', 		// Bezier cubic curve
	CSPLINE_THRU: 'splineThru',				// Catmull-rom spline
	ARC: 'arc',								// Circle
	ELLIPSE: 'ellipse'
};

// TODO Clean up PATH API

// Create path using straight lines to connect all points
// - vectors: array of Vector2

THREE.Path.prototype.fromPoints = function ( vectors ) {

	this.moveTo( vectors[ 0 ].x, vectors[ 0 ].y );

	for ( var v = 1, vlen = vectors.length; v < vlen; v ++ ) {

		this.lineTo( vectors[ v ].x, vectors[ v ].y );

	};

};

// startPath() endPath()?

THREE.Path.prototype.moveTo = function ( x, y ) {

	var args = Array.prototype.slice.call( arguments );
	this.actions.push( { action: THREE.PathActions.MOVE_TO, args: args } );

};

THREE.Path.prototype.lineTo = function ( x, y ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.LineCurve( new THREE.Vector2( x0, y0 ), new THREE.Vector2( x, y ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.LINE_TO, args: args } );

};

THREE.Path.prototype.quadraticCurveTo = function( aCPx, aCPy, aX, aY ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.QuadraticBezierCurve( new THREE.Vector2( x0, y0 ),
												new THREE.Vector2( aCPx, aCPy ),
												new THREE.Vector2( aX, aY ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.QUADRATIC_CURVE_TO, args: args } );

};

THREE.Path.prototype.bezierCurveTo = function( aCP1x, aCP1y,
											   aCP2x, aCP2y,
											   aX, aY ) {

	var args = Array.prototype.slice.call( arguments );

	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	var curve = new THREE.CubicBezierCurve( new THREE.Vector2( x0, y0 ),
											new THREE.Vector2( aCP1x, aCP1y ),
											new THREE.Vector2( aCP2x, aCP2y ),
											new THREE.Vector2( aX, aY ) );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.BEZIER_CURVE_TO, args: args } );

};

THREE.Path.prototype.splineThru = function( pts /*Array of Vector*/ ) {

	var args = Array.prototype.slice.call( arguments );
	var lastargs = this.actions[ this.actions.length - 1 ].args;

	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];
//---
	var npts = [ new THREE.Vector2( x0, y0 ) ];
	Array.prototype.push.apply( npts, pts );

	var curve = new THREE.SplineCurve( npts );
	this.curves.push( curve );

	this.actions.push( { action: THREE.PathActions.CSPLINE_THRU, args: args } );

};

// FUTURE: Change the API or follow canvas API?

THREE.Path.prototype.arc = function ( aX, aY, aRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var lastargs = this.actions[ this.actions.length - 1].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	this.absarc(aX + x0, aY + y0, aRadius,
		aStartAngle, aEndAngle, aClockwise );

 };

 THREE.Path.prototype.absarc = function ( aX, aY, aRadius,
									  aStartAngle, aEndAngle, aClockwise ) {
	this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise);
 };

THREE.Path.prototype.ellipse = function ( aX, aY, xRadius, yRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var lastargs = this.actions[ this.actions.length - 1].args;
	var x0 = lastargs[ lastargs.length - 2 ];
	var y0 = lastargs[ lastargs.length - 1 ];

	this.absellipse(aX + x0, aY + y0, xRadius, yRadius,
		aStartAngle, aEndAngle, aClockwise );

 };


THREE.Path.prototype.absellipse = function ( aX, aY, xRadius, yRadius,
									  aStartAngle, aEndAngle, aClockwise ) {

	var args = Array.prototype.slice.call( arguments );
	var curve = new THREE.EllipseCurve( aX, aY, xRadius, yRadius,
									aStartAngle, aEndAngle, aClockwise );
	this.curves.push( curve );

	var lastPoint = curve.getPoint(1);
	args.push(lastPoint.x);
	args.push(lastPoint.y);

	this.actions.push( { action: THREE.PathActions.ELLIPSE, args: args } );

 };

THREE.Path.prototype.getSpacedPoints = function ( divisions, closedPath ) {

	if ( ! divisions ) divisions = 40;

	var points = [];

	for ( var i = 0; i < divisions; i ++ ) {

		points.push( this.getPoint( i / divisions ) );

		//if( !this.getPoint( i / divisions ) ) throw "DIE";

	}

	// if ( closedPath ) {
	//
	// 	points.push( points[ 0 ] );
	//
	// }

	return points;

};

/* Return an array of vectors based on contour of the path */

THREE.Path.prototype.getPoints = function( divisions, closedPath ) {

	if (this.useSpacedPoints) {
		console.log('tata');
		return this.getSpacedPoints( divisions, closedPath );
	}

	divisions = divisions || 12;

	var points = [];

	var i, il, item, action, args;
	var cpx, cpy, cpx2, cpy2, cpx1, cpy1, cpx0, cpy0,
		laste, j,
		t, tx, ty;

	for ( i = 0, il = this.actions.length; i < il; i ++ ) {

		item = this.actions[ i ];

		action = item.action;
		args = item.args;

		switch( action ) {

		case THREE.PathActions.MOVE_TO:

			points.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );

			break;

		case THREE.PathActions.LINE_TO:

			points.push( new THREE.Vector2( args[ 0 ], args[ 1 ] ) );

			break;

		case THREE.PathActions.QUADRATIC_CURVE_TO:

			cpx  = args[ 2 ];
			cpy  = args[ 3 ];

			cpx1 = args[ 0 ];
			cpy1 = args[ 1 ];

			if ( points.length > 0 ) {

				laste = points[ points.length - 1 ];

				cpx0 = laste.x;
				cpy0 = laste.y;

			} else {

				laste = this.actions[ i - 1 ].args;

				cpx0 = laste[ laste.length - 2 ];
				cpy0 = laste[ laste.length - 1 ];

			}

			for ( j = 1; j <= divisions; j ++ ) {

				t = j / divisions;

				tx = THREE.Shape.Utils.b2( t, cpx0, cpx1, cpx );
				ty = THREE.Shape.Utils.b2( t, cpy0, cpy1, cpy );

				points.push( new THREE.Vector2( tx, ty ) );

			}

			break;

		case THREE.PathActions.BEZIER_CURVE_TO:

			cpx  = args[ 4 ];
			cpy  = args[ 5 ];

			cpx1 = args[ 0 ];
			cpy1 = args[ 1 ];

			cpx2 = args[ 2 ];
			cpy2 = args[ 3 ];

			if ( points.length > 0 ) {

				laste = points[ points.length - 1 ];

				cpx0 = laste.x;
				cpy0 = laste.y;

			} else {

				laste = this.actions[ i - 1 ].args;

				cpx0 = laste[ laste.length - 2 ];
				cpy0 = laste[ laste.length - 1 ];

			}


			for ( j = 1; j <= divisions; j ++ ) {

				t = j / divisions;

				tx = THREE.Shape.Utils.b3( t, cpx0, cpx1, cpx2, cpx );
				ty = THREE.Shape.Utils.b3( t, cpy0, cpy1, cpy2, cpy );

				points.push( new THREE.Vector2( tx, ty ) );

			}

			break;

		case THREE.PathActions.CSPLINE_THRU:

			laste = this.actions[ i - 1 ].args;

			var last = new THREE.Vector2( laste[ laste.length - 2 ], laste[ laste.length - 1 ] );
			var spts = [ last ];

			var n = divisions * args[ 0 ].length;

			spts = spts.concat( args[ 0 ] );

			var spline = new THREE.SplineCurve( spts );

			for ( j = 1; j <= n; j ++ ) {

				points.push( spline.getPointAt( j / n ) ) ;

			}

			break;

		case THREE.PathActions.ARC:

			var aX = args[ 0 ], aY = args[ 1 ],
				aRadius = args[ 2 ],
				aStartAngle = args[ 3 ], aEndAngle = args[ 4 ],
				aClockwise = !! args[ 5 ];

			var deltaAngle = aEndAngle - aStartAngle;
			var angle;
			var tdivisions = divisions * 2;

			for ( j = 1; j <= tdivisions; j ++ ) {

				t = j / tdivisions;

				if ( ! aClockwise ) {

					t = 1 - t;

				}

				angle = aStartAngle + t * deltaAngle;

				tx = aX + aRadius * Math.cos( angle );
				ty = aY + aRadius * Math.sin( angle );

				//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);

				points.push( new THREE.Vector2( tx, ty ) );

			}

			//console.log(points);

		  break;
		  
		case THREE.PathActions.ELLIPSE:

			var aX = args[ 0 ], aY = args[ 1 ],
				xRadius = args[ 2 ],
				yRadius = args[ 3 ],
				aStartAngle = args[ 4 ], aEndAngle = args[ 5 ],
				aClockwise = !! args[ 6 ];


			var deltaAngle = aEndAngle - aStartAngle;
			var angle;
			var tdivisions = divisions * 2;

			for ( j = 1; j <= tdivisions; j ++ ) {

				t = j / tdivisions;

				if ( ! aClockwise ) {

					t = 1 - t;

				}

				angle = aStartAngle + t * deltaAngle;

				tx = aX + xRadius * Math.cos( angle );
				ty = aY + yRadius * Math.sin( angle );

				//console.log('t', t, 'angle', angle, 'tx', tx, 'ty', ty);

				points.push( new THREE.Vector2( tx, ty ) );

			}

			//console.log(points);

		  break;

		} // end switch

	}



	// Normalize to remove the closing point by default.
	var lastPoint = points[ points.length - 1];
	var EPSILON = 0.0000000001;
	if ( Math.abs(lastPoint.x - points[ 0 ].x) < EPSILON &&
			 Math.abs(lastPoint.y - points[ 0 ].y) < EPSILON)
		points.splice( points.length - 1, 1);
	if ( closedPath ) {

		points.push( points[ 0 ] );

	}

	return points;

};

//
// Breaks path into shapes
//
//	Assumptions (if parameter isCCW==true the opposite holds):
//	- solid shapes are defined clockwise (CW)
//	- holes are defined counterclockwise (CCW)
//
//	If parameter noHoles==true:
//  - all subPaths are regarded as solid shapes
//  - definition order CW/CCW has no relevance
//

THREE.Path.prototype.toShapes = function( isCCW, noHoles ) {

	function extractSubpaths( inActions ) {

		var i, il, item, action, args;

		var subPaths = [], lastPath = new THREE.Path();

		for ( i = 0, il = inActions.length; i < il; i ++ ) {

			item = inActions[ i ];

			args = item.args;
			action = item.action;

			if ( action == THREE.PathActions.MOVE_TO ) {

				if ( lastPath.actions.length != 0 ) {

					subPaths.push( lastPath );
					lastPath = new THREE.Path();

				}

			}

			lastPath[ action ].apply( lastPath, args );

		}

		if ( lastPath.actions.length != 0 ) {

			subPaths.push( lastPath );

		}

		// console.log(subPaths);

		return	subPaths;
	}

	function toShapesNoHoles( inSubpaths ) {

		var shapes = [];

		for ( var i = 0, il = inSubpaths.length; i < il; i ++ ) {

			var tmpPath = inSubpaths[ i ];

			var tmpShape = new THREE.Shape();
			tmpShape.actions = tmpPath.actions;
			tmpShape.curves = tmpPath.curves;

			shapes.push( tmpShape );
		}

		//console.log("shape", shapes);

		return shapes;
	};

	function isPointInsidePolygon( inPt, inPolygon ) {
		var EPSILON = 0.0000000001;

		var polyLen = inPolygon.length;

		// inPt on polygon contour => immediate success    or
		// toggling of inside/outside at every single! intersection point of an edge
		//  with the horizontal line through inPt, left of inPt
		//  not counting lowerY endpoints of edges and whole edges on that line
		var inside = false;
		for( var p = polyLen - 1, q = 0; q < polyLen; p = q ++ ) {
			var edgeLowPt  = inPolygon[ p ];
			var edgeHighPt = inPolygon[ q ];

			var edgeDx = edgeHighPt.x - edgeLowPt.x;
			var edgeDy = edgeHighPt.y - edgeLowPt.y;

			if ( Math.abs(edgeDy) > EPSILON ) {			// not parallel
				if ( edgeDy < 0 ) {
					edgeLowPt  = inPolygon[ q ]; edgeDx = - edgeDx;
					edgeHighPt = inPolygon[ p ]; edgeDy = - edgeDy;
				}
				if ( ( inPt.y < edgeLowPt.y ) || ( inPt.y > edgeHighPt.y ) ) 		continue;

				if ( inPt.y == edgeLowPt.y ) {
					if ( inPt.x == edgeLowPt.x )		return	true;		// inPt is on contour ?
					// continue;				// no intersection or edgeLowPt => doesn't count !!!
				} else {
					var perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);
					if ( perpEdge == 0 )				return	true;		// inPt is on contour ?
					if ( perpEdge < 0 ) 				continue;
					inside = ! inside;		// true intersection left of inPt
				}
			} else {		// parallel or colinear
				if ( inPt.y != edgeLowPt.y ) 		continue;			// parallel
				// egde lies on the same horizontal line as inPt
				if ( ( ( edgeHighPt.x <= inPt.x ) && ( inPt.x <= edgeLowPt.x ) ) ||
					 ( ( edgeLowPt.x <= inPt.x ) && ( inPt.x <= edgeHighPt.x ) ) )		return	true;	// inPt: Point on contour !
				// continue;
			}
		}

		return	inside;
	}


	var subPaths = extractSubpaths( this.actions );
	if ( subPaths.length == 0 ) return [];

	if ( noHoles === true )	return	toShapesNoHoles( subPaths );


	var solid, tmpPath, tmpShape, shapes = [];

	if ( subPaths.length == 1) {

		tmpPath = subPaths[0];
		tmpShape = new THREE.Shape();
		tmpShape.actions = tmpPath.actions;
		tmpShape.curves = tmpPath.curves;
		shapes.push( tmpShape );
		return shapes;

	}

	var holesFirst = ! THREE.Shape.Utils.isClockWise( subPaths[ 0 ].getPoints() );
	holesFirst = isCCW ? ! holesFirst : holesFirst;

	// console.log("Holes first", holesFirst);
	
	var betterShapeHoles = [];
	var newShapes = [];
	var newShapeHoles = [];
	var mainIdx = 0;
	var tmpPoints;

	newShapes[mainIdx] = undefined;
	newShapeHoles[mainIdx] = [];

	var i, il;

	for ( i = 0, il = subPaths.length; i < il; i ++ ) {

		tmpPath = subPaths[ i ];
		tmpPoints = tmpPath.getPoints();
		solid = THREE.Shape.Utils.isClockWise( tmpPoints );
		solid = isCCW ? ! solid : solid;

		if ( solid ) {

			if ( (! holesFirst ) && ( newShapes[mainIdx] ) )	mainIdx ++;

			newShapes[mainIdx] = { s: new THREE.Shape(), p: tmpPoints };
			newShapes[mainIdx].s.actions = tmpPath.actions;
			newShapes[mainIdx].s.curves = tmpPath.curves;
			
			if ( holesFirst )	mainIdx ++;
			newShapeHoles[mainIdx] = [];

			//console.log('cw', i);

		} else {

			newShapeHoles[mainIdx].push( { h: tmpPath, p: tmpPoints[0] } );

			//console.log('ccw', i);

		}

	}

	// only Holes? -> probably all Shapes with wrong orientation
	if ( ! newShapes[0] )	return	toShapesNoHoles( subPaths );


	if ( newShapes.length > 1 ) {
		var ambigious = false;
		var toChange = [];

		for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx ++ ) {
			betterShapeHoles[sIdx] = [];
		}
		for (var sIdx = 0, sLen = newShapes.length; sIdx < sLen; sIdx ++ ) {
			var sh = newShapes[sIdx];
			var sho = newShapeHoles[sIdx];
			for (var hIdx = 0; hIdx < sho.length; hIdx ++ ) {
				var ho = sho[hIdx];
				var hole_unassigned = true;
				for (var s2Idx = 0; s2Idx < newShapes.length; s2Idx ++ ) {
					if ( isPointInsidePolygon( ho.p, newShapes[s2Idx].p ) ) {
						if ( sIdx != s2Idx )		toChange.push( { froms: sIdx, tos: s2Idx, hole: hIdx } );
						if ( hole_unassigned ) {
							hole_unassigned = false;
							betterShapeHoles[s2Idx].push( ho );
						} else {
							ambigious = true;
						}
					}
				}
				if ( hole_unassigned ) { betterShapeHoles[sIdx].push( ho ); }
			}
		}
		// console.log("ambigious: ", ambigious);
		if ( toChange.length > 0 ) {
			// console.log("to change: ", toChange);
			if (! ambigious)	newShapeHoles = betterShapeHoles;
		}
	}

	var tmpHoles, j, jl;
	for ( i = 0, il = newShapes.length; i < il; i ++ ) {
		tmpShape = newShapes[i].s;
		shapes.push( tmpShape );
		tmpHoles = newShapeHoles[i];
		for ( j = 0, jl = tmpHoles.length; j < jl; j ++ ) {
			tmpShape.holes.push( tmpHoles[j].h );
		}
	}

	//console.log("shape", shapes);

	return shapes;

};

// File:src/extras/core/Shape.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * Defines a 2d shape plane using paths.
 **/

// STEP 1 Create a path.
// STEP 2 Turn path into shape.
// STEP 3 ExtrudeGeometry takes in Shape/Shapes
// STEP 3a - Extract points from each shape, turn to vertices
// STEP 3b - Triangulate each shape, add faces.

THREE.Shape = function () {

	THREE.Path.apply( this, arguments );
	this.holes = [];

};

THREE.Shape.prototype = Object.create( THREE.Path.prototype );

// Convenience method to return ExtrudeGeometry

THREE.Shape.prototype.extrude = function ( options ) {

	var extruded = new THREE.ExtrudeGeometry( this, options );
	return extruded;

};

// Convenience method to return ShapeGeometry

THREE.Shape.prototype.makeGeometry = function ( options ) {

	var geometry = new THREE.ShapeGeometry( this, options );
	return geometry;

};

// Get points of holes

THREE.Shape.prototype.getPointsHoles = function ( divisions ) {

	var i, il = this.holes.length, holesPts = [];

	for ( i = 0; i < il; i ++ ) {

		holesPts[ i ] = this.holes[ i ].getTransformedPoints( divisions, this.bends );

	}

	return holesPts;

};

// Get points of holes (spaced by regular distance)

THREE.Shape.prototype.getSpacedPointsHoles = function ( divisions ) {

	var i, il = this.holes.length, holesPts = [];

	for ( i = 0; i < il; i ++ ) {

		holesPts[ i ] = this.holes[ i ].getTransformedSpacedPoints( divisions, this.bends );

	}

	return holesPts;

};


// Get points of shape and holes (keypoints based on segments parameter)

THREE.Shape.prototype.extractAllPoints = function ( divisions ) {

	return {

		shape: this.getTransformedPoints( divisions ),
		holes: this.getPointsHoles( divisions )

	};

};

THREE.Shape.prototype.extractPoints = function ( divisions ) {

	if (this.useSpacedPoints) {
		return this.extractAllSpacedPoints(divisions);
	}

	return this.extractAllPoints(divisions);

};

//
// THREE.Shape.prototype.extractAllPointsWithBend = function ( divisions, bend ) {
//
// 	return {
//
// 		shape: this.transform( bend, divisions ),
// 		holes: this.getPointsHoles( divisions, bend )
//
// 	};
//
// };

// Get points of shape and holes (spaced by regular distance)

THREE.Shape.prototype.extractAllSpacedPoints = function ( divisions ) {

	return {

		shape: this.getTransformedSpacedPoints( divisions ),
		holes: this.getSpacedPointsHoles( divisions )

	};

};

/**************************************************************
 *	Utils
 **************************************************************/

THREE.Shape.Utils = {

	triangulateShape: function ( contour, holes ) {

		function point_in_segment_2D_colin( inSegPt1, inSegPt2, inOtherPt ) {
			// inOtherPt needs to be colinear to the inSegment
			if ( inSegPt1.x != inSegPt2.x ) {
				if ( inSegPt1.x < inSegPt2.x ) {
					return	( ( inSegPt1.x <= inOtherPt.x ) && ( inOtherPt.x <= inSegPt2.x ) );
				} else {
					return	( ( inSegPt2.x <= inOtherPt.x ) && ( inOtherPt.x <= inSegPt1.x ) );
				}
			} else {
				if ( inSegPt1.y < inSegPt2.y ) {
					return	( ( inSegPt1.y <= inOtherPt.y ) && ( inOtherPt.y <= inSegPt2.y ) );
				} else {
					return	( ( inSegPt2.y <= inOtherPt.y ) && ( inOtherPt.y <= inSegPt1.y ) );
				}
			}
		}

		function intersect_segments_2D( inSeg1Pt1, inSeg1Pt2, inSeg2Pt1, inSeg2Pt2, inExcludeAdjacentSegs ) {
			var EPSILON = 0.0000000001;

			var seg1dx = inSeg1Pt2.x - inSeg1Pt1.x,   seg1dy = inSeg1Pt2.y - inSeg1Pt1.y;
			var seg2dx = inSeg2Pt2.x - inSeg2Pt1.x,   seg2dy = inSeg2Pt2.y - inSeg2Pt1.y;

			var seg1seg2dx = inSeg1Pt1.x - inSeg2Pt1.x;
			var seg1seg2dy = inSeg1Pt1.y - inSeg2Pt1.y;

			var limit		= seg1dy * seg2dx - seg1dx * seg2dy;
			var perpSeg1	= seg1dy * seg1seg2dx - seg1dx * seg1seg2dy;

			if ( Math.abs(limit) > EPSILON ) {			// not parallel

				var perpSeg2;
				if ( limit > 0 ) {
					if ( ( perpSeg1 < 0 ) || ( perpSeg1 > limit ) ) 		return [];
					perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
					if ( ( perpSeg2 < 0 ) || ( perpSeg2 > limit ) ) 		return [];
				} else {
					if ( ( perpSeg1 > 0 ) || ( perpSeg1 < limit ) ) 		return [];
					perpSeg2 = seg2dy * seg1seg2dx - seg2dx * seg1seg2dy;
					if ( ( perpSeg2 > 0 ) || ( perpSeg2 < limit ) ) 		return [];
				}

				// i.e. to reduce rounding errors
				// intersection at endpoint of segment#1?
				if ( perpSeg2 == 0 ) {
					if ( ( inExcludeAdjacentSegs ) &&
						 ( ( perpSeg1 == 0 ) || ( perpSeg1 == limit ) ) )		return [];
					return  [ inSeg1Pt1 ];
				}
				if ( perpSeg2 == limit ) {
					if ( ( inExcludeAdjacentSegs ) &&
						 ( ( perpSeg1 == 0 ) || ( perpSeg1 == limit ) ) )		return [];
					return  [ inSeg1Pt2 ];
				}
				// intersection at endpoint of segment#2?
				if ( perpSeg1 == 0 )		return  [ inSeg2Pt1 ];
				if ( perpSeg1 == limit )	return  [ inSeg2Pt2 ];

				// return real intersection point
				var factorSeg1 = perpSeg2 / limit;
				return	[ { x: inSeg1Pt1.x + factorSeg1 * seg1dx,
							y: inSeg1Pt1.y + factorSeg1 * seg1dy } ];

			} else {		// parallel or colinear
				if ( ( perpSeg1 != 0 ) ||
					 ( seg2dy * seg1seg2dx != seg2dx * seg1seg2dy ) ) 			return [];

				// they are collinear or degenerate
				var seg1Pt = ( (seg1dx == 0) && (seg1dy == 0) );	// segment1 ist just a point?
				var seg2Pt = ( (seg2dx == 0) && (seg2dy == 0) );	// segment2 ist just a point?
				// both segments are points
				if ( seg1Pt && seg2Pt ) {
					if ( (inSeg1Pt1.x != inSeg2Pt1.x) ||
						 (inSeg1Pt1.y != inSeg2Pt1.y) )		return [];   	// they are distinct  points
					return  [ inSeg1Pt1 ];                 					// they are the same point
				}
				// segment#1  is a single point
				if ( seg1Pt ) {
					if (! point_in_segment_2D_colin( inSeg2Pt1, inSeg2Pt2, inSeg1Pt1 ) )		return [];		// but not in segment#2
					return  [ inSeg1Pt1 ];
				}
				// segment#2  is a single point
				if ( seg2Pt ) {
					if (! point_in_segment_2D_colin( inSeg1Pt1, inSeg1Pt2, inSeg2Pt1 ) )		return [];		// but not in segment#1
					return  [ inSeg2Pt1 ];
				}

				// they are collinear segments, which might overlap
				var seg1min, seg1max, seg1minVal, seg1maxVal;
				var seg2min, seg2max, seg2minVal, seg2maxVal;
				if (seg1dx != 0) {		// the segments are NOT on a vertical line
					if ( inSeg1Pt1.x < inSeg1Pt2.x ) {
						seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.x;
						seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.x;
					} else {
						seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.x;
						seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.x;
					}
					if ( inSeg2Pt1.x < inSeg2Pt2.x ) {
						seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.x;
						seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.x;
					} else {
						seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.x;
						seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.x;
					}
				} else {				// the segments are on a vertical line
					if ( inSeg1Pt1.y < inSeg1Pt2.y ) {
						seg1min = inSeg1Pt1; seg1minVal = inSeg1Pt1.y;
						seg1max = inSeg1Pt2; seg1maxVal = inSeg1Pt2.y;
					} else {
						seg1min = inSeg1Pt2; seg1minVal = inSeg1Pt2.y;
						seg1max = inSeg1Pt1; seg1maxVal = inSeg1Pt1.y;
					}
					if ( inSeg2Pt1.y < inSeg2Pt2.y ) {
						seg2min = inSeg2Pt1; seg2minVal = inSeg2Pt1.y;
						seg2max = inSeg2Pt2; seg2maxVal = inSeg2Pt2.y;
					} else {
						seg2min = inSeg2Pt2; seg2minVal = inSeg2Pt2.y;
						seg2max = inSeg2Pt1; seg2maxVal = inSeg2Pt1.y;
					}
				}
				if ( seg1minVal <= seg2minVal ) {
					if ( seg1maxVal <  seg2minVal )	return [];
					if ( seg1maxVal == seg2minVal )	{
						if ( inExcludeAdjacentSegs )		return [];
						return [ seg2min ];
					}
					if ( seg1maxVal <= seg2maxVal )	return [ seg2min, seg1max ];
					return	[ seg2min, seg2max ];
				} else {
					if ( seg1minVal >  seg2maxVal )	return [];
					if ( seg1minVal == seg2maxVal )	{
						if ( inExcludeAdjacentSegs )		return [];
						return [ seg1min ];
					}
					if ( seg1maxVal <= seg2maxVal )	return [ seg1min, seg1max ];
					return	[ seg1min, seg2max ];
				}
			}
		}

		function isPointInsideAngle( inVertex, inLegFromPt, inLegToPt, inOtherPt ) {
			// The order of legs is important

			var EPSILON = 0.0000000001;

			// translation of all points, so that Vertex is at (0,0)
			var legFromPtX	= inLegFromPt.x - inVertex.x,  legFromPtY	= inLegFromPt.y - inVertex.y;
			var legToPtX	= inLegToPt.x	- inVertex.x,  legToPtY		= inLegToPt.y	- inVertex.y;
			var otherPtX	= inOtherPt.x	- inVertex.x,  otherPtY		= inOtherPt.y	- inVertex.y;

			// main angle >0: < 180 deg.; 0: 180 deg.; <0: > 180 deg.
			var from2toAngle	= legFromPtX * legToPtY - legFromPtY * legToPtX;
			var from2otherAngle	= legFromPtX * otherPtY - legFromPtY * otherPtX;

			if ( Math.abs(from2toAngle) > EPSILON ) {			// angle != 180 deg.

				var other2toAngle		= otherPtX * legToPtY - otherPtY * legToPtX;
				// console.log( "from2to: " + from2toAngle + ", from2other: " + from2otherAngle + ", other2to: " + other2toAngle );

				if ( from2toAngle > 0 ) {				// main angle < 180 deg.
					return	( ( from2otherAngle >= 0 ) && ( other2toAngle >= 0 ) );
				} else {								// main angle > 180 deg.
					return	( ( from2otherAngle >= 0 ) || ( other2toAngle >= 0 ) );
				}
			} else {										// angle == 180 deg.
				// console.log( "from2to: 180 deg., from2other: " + from2otherAngle  );
				return	( from2otherAngle > 0 );
			}
		}


		function removeHoles( contour, holes ) {

			var shape = contour.concat(); // work on this shape
			var hole;

			function isCutLineInsideAngles( inShapeIdx, inHoleIdx ) {
				// Check if hole point lies within angle around shape point
				var lastShapeIdx = shape.length - 1;

				var prevShapeIdx = inShapeIdx - 1;
				if ( prevShapeIdx < 0 )			prevShapeIdx = lastShapeIdx;

				var nextShapeIdx = inShapeIdx + 1;
				if ( nextShapeIdx > lastShapeIdx )	nextShapeIdx = 0;

				var insideAngle = isPointInsideAngle( shape[inShapeIdx], shape[ prevShapeIdx ], shape[ nextShapeIdx ], hole[inHoleIdx] );
				if (! insideAngle ) {
					// console.log( "Vertex (Shape): " + inShapeIdx + ", Point: " + hole[inHoleIdx].x + "/" + hole[inHoleIdx].y );
					return	false;
				}

				// Check if shape point lies within angle around hole point
				var lastHoleIdx = hole.length - 1;

				var prevHoleIdx = inHoleIdx - 1;
				if ( prevHoleIdx < 0 )			prevHoleIdx = lastHoleIdx;

				var nextHoleIdx = inHoleIdx + 1;
				if ( nextHoleIdx > lastHoleIdx )	nextHoleIdx = 0;

				insideAngle = isPointInsideAngle( hole[inHoleIdx], hole[ prevHoleIdx ], hole[ nextHoleIdx ], shape[inShapeIdx] );
				if (! insideAngle ) {
					// console.log( "Vertex (Hole): " + inHoleIdx + ", Point: " + shape[inShapeIdx].x + "/" + shape[inShapeIdx].y );
					return	false;
				}

				return	true;
			}

			function intersectsShapeEdge( inShapePt, inHolePt ) {
				// checks for intersections with shape edges
				var sIdx, nextIdx, intersection;
				for ( sIdx = 0; sIdx < shape.length; sIdx ++ ) {
					nextIdx = sIdx+1; nextIdx %= shape.length;
					intersection = intersect_segments_2D( inShapePt, inHolePt, shape[sIdx], shape[nextIdx], true );
					if ( intersection.length > 0 )		return	true;
				}

				return	false;
			}

			var indepHoles = [];

			function intersectsHoleEdge( inShapePt, inHolePt ) {
				// checks for intersections with hole edges
				var ihIdx, chkHole,
					hIdx, nextIdx, intersection;
				for ( ihIdx = 0; ihIdx < indepHoles.length; ihIdx ++ ) {
					chkHole = holes[indepHoles[ihIdx]];
					for ( hIdx = 0; hIdx < chkHole.length; hIdx ++ ) {
						nextIdx = hIdx+1; nextIdx %= chkHole.length;
						intersection = intersect_segments_2D( inShapePt, inHolePt, chkHole[hIdx], chkHole[nextIdx], true );
						if ( intersection.length > 0 )		return	true;
					}
				}
				return	false;
			}

			var holeIndex, shapeIndex,
				shapePt, holePt,
				holeIdx, cutKey, failedCuts = [],
				tmpShape1, tmpShape2,
				tmpHole1, tmpHole2;

			for ( var h = 0, hl = holes.length; h < hl; h ++ ) {

				indepHoles.push( h );

			}

			var minShapeIndex = 0;
			var counter = indepHoles.length * 2;
			while ( indepHoles.length > 0 ) {
				counter --;
				if ( counter < 0 ) {
					console.log( "Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!" );
					break;
				}

				// search for shape-vertex and hole-vertex,
				// which can be connected without intersections
				for ( shapeIndex = minShapeIndex; shapeIndex < shape.length; shapeIndex ++ ) {

					shapePt = shape[ shapeIndex ];
					holeIndex	= - 1;

					// search for hole which can be reached without intersections
					for ( var h = 0; h < indepHoles.length; h ++ ) {
						holeIdx = indepHoles[h];

						// prevent multiple checks
						cutKey = shapePt.x + ":" + shapePt.y + ":" + holeIdx;
						if ( failedCuts[cutKey] !== undefined )			continue;

						hole = holes[holeIdx];
						for ( var h2 = 0; h2 < hole.length; h2 ++ ) {
							holePt = hole[ h2 ];
							if (! isCutLineInsideAngles( shapeIndex, h2 ) )		continue;
							if ( intersectsShapeEdge( shapePt, holePt ) )		continue;
							if ( intersectsHoleEdge( shapePt, holePt ) )		continue;

							holeIndex = h2;
							indepHoles.splice(h,1);

							tmpShape1 = shape.slice( 0, shapeIndex+1 );
							tmpShape2 = shape.slice( shapeIndex );
							tmpHole1 = hole.slice( holeIndex );
							tmpHole2 = hole.slice( 0, holeIndex+1 );

							shape = tmpShape1.concat( tmpHole1 ).concat( tmpHole2 ).concat( tmpShape2 );

							minShapeIndex = shapeIndex;

							// Debug only, to show the selected cuts
							// glob_CutLines.push( [ shapePt, holePt ] );

							break;
						}
						if ( holeIndex >= 0 )	break;		// hole-vertex found

						failedCuts[cutKey] = true;			// remember failure
					}
					if ( holeIndex >= 0 )	break;		// hole-vertex found
				}
			}

			return shape; 			/* shape with no holes */
		}


		var i, il, f, face,
			key, index,
			allPointsMap = {};

		// To maintain reference to old shape, one must match coordinates, or offset the indices from original arrays. It's probably easier to do the first.

		var allpoints = contour.concat();

		for ( var h = 0, hl = holes.length; h < hl; h ++ ) {

			Array.prototype.push.apply( allpoints, holes[h] );

		}

		//console.log( "allpoints",allpoints, allpoints.length );

		// prepare all points map

		for ( i = 0, il = allpoints.length; i < il; i ++ ) {

			key = allpoints[ i ].x + ":" + allpoints[ i ].y;

			if ( allPointsMap[ key ] !== undefined ) {

				console.log( "Duplicate point", key );

			}

			allPointsMap[ key ] = i;

		}

		// remove holes by cutting paths to holes and adding them to the shape
		var shapeWithoutHoles = removeHoles( contour, holes );

		var triangles = THREE.FontUtils.Triangulate( shapeWithoutHoles, false ); // True returns indices for points of spooled shape
		//console.log( "triangles",triangles, triangles.length );

		// check all face vertices against all points map

		for ( i = 0, il = triangles.length; i < il; i ++ ) {

			face = triangles[ i ];

			for ( f = 0; f < 3; f ++ ) {

				key = face[ f ].x + ":" + face[ f ].y;

				index = allPointsMap[ key ];

				if ( index !== undefined ) {

					face[ f ] = index;

				}

			}

		}

		return triangles.concat();

	},

	isClockWise: function ( pts ) {

		return THREE.FontUtils.Triangulate.area( pts ) < 0;

	},

	// Bezier Curves formulas obtained from
	// http://en.wikipedia.org/wiki/B%C3%A9zier_curve

	// Quad Bezier Functions

	b2p0: function ( t, p ) {

		var k = 1 - t;
		return k * k * p;

	},

	b2p1: function ( t, p ) {

		return 2 * ( 1 - t ) * t * p;

	},

	b2p2: function ( t, p ) {

		return t * t * p;

	},

	b2: function ( t, p0, p1, p2 ) {

		return this.b2p0( t, p0 ) + this.b2p1( t, p1 ) + this.b2p2( t, p2 );

	},

	// Cubic Bezier Functions

	b3p0: function ( t, p ) {

		var k = 1 - t;
		return k * k * k * p;

	},

	b3p1: function ( t, p ) {

		var k = 1 - t;
		return 3 * k * k * t * p;

	},

	b3p2: function ( t, p ) {

		var k = 1 - t;
		return 3 * k * t * t * p;

	},

	b3p3: function ( t, p ) {

		return t * t * t * p;

	},

	b3: function ( t, p0, p1, p2, p3 ) {

		return this.b3p0( t, p0 ) + this.b3p1( t, p1 ) + this.b3p2( t, p2 ) +  this.b3p3( t, p3 );

	}

};


// File:src/extras/curves/LineCurve.js

/**************************************************************
 *	Line
 **************************************************************/

THREE.LineCurve = function ( v1, v2 ) {

	this.v1 = v1;
	this.v2 = v2;

};

THREE.LineCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.LineCurve.prototype.getPoint = function ( t ) {

	var point = this.v2.clone().sub(this.v1);
	point.multiplyScalar( t ).add( this.v1 );

	return point;

};

// Line curve is linear, so we can overwrite default getPointAt

THREE.LineCurve.prototype.getPointAt = function ( u ) {

	return this.getPoint( u );

};

THREE.LineCurve.prototype.getTangent = function( t ) {

	var tangent = this.v2.clone().sub(this.v1);

	return tangent.normalize();

};

// File:src/extras/curves/QuadraticBezierCurve.js

/**************************************************************
 *	Quadratic Bezier curve
 **************************************************************/


THREE.QuadraticBezierCurve = function ( v0, v1, v2 ) {

	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;

};

THREE.QuadraticBezierCurve.prototype = Object.create( THREE.Curve.prototype );


THREE.QuadraticBezierCurve.prototype.getPoint = function ( t ) {

	var vector = new THREE.Vector2();

	vector.x = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );
	vector.y = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );

	return vector;

};


THREE.QuadraticBezierCurve.prototype.getTangent = function( t ) {

	var vector = new THREE.Vector2();

	vector.x = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.x, this.v1.x, this.v2.x );
	vector.y = THREE.Curve.Utils.tangentQuadraticBezier( t, this.v0.y, this.v1.y, this.v2.y );

	// returns unit vector

	return vector.normalize();

};

// File:src/extras/curves/CubicBezierCurve.js

/**************************************************************
 *	Cubic Bezier curve
 **************************************************************/

THREE.CubicBezierCurve = function ( v0, v1, v2, v3 ) {

	this.v0 = v0;
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;

};

THREE.CubicBezierCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.CubicBezierCurve.prototype.getPoint = function ( t ) {

	var tx, ty;

	tx = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
	ty = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );

	return new THREE.Vector2( tx, ty );

};

THREE.CubicBezierCurve.prototype.getTangent = function( t ) {

	var tx, ty;

	tx = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
	ty = THREE.Curve.Utils.tangentCubicBezier( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );

	var tangent = new THREE.Vector2( tx, ty );
	tangent.normalize();

	return tangent;

};

// File:src/extras/curves/SplineCurve.js

/**************************************************************
 *	Spline curve
 **************************************************************/

THREE.SplineCurve = function ( points /* array of Vector2 */ ) {

	this.points = ( points == undefined ) ? [] : points;

};

THREE.SplineCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.SplineCurve.prototype.getPoint = function ( t ) {

	var points = this.points;
	var point = ( points.length - 1 ) * t;

	var intPoint = Math.floor( point );
	var weight = point - intPoint;

	var point0 = points[ intPoint == 0 ? intPoint : intPoint - 1 ]
	var point1 = points[ intPoint ]
	var point2 = points[ intPoint > points.length - 2 ? points.length -1 : intPoint + 1 ]
	var point3 = points[ intPoint > points.length - 3 ? points.length -1 : intPoint + 2 ]

	var vector = new THREE.Vector2();

	vector.x = THREE.Curve.Utils.interpolate( point0.x, point1.x, point2.x, point3.x, weight );
	vector.y = THREE.Curve.Utils.interpolate( point0.y, point1.y, point2.y, point3.y, weight );

	return vector;

};

// File:src/extras/curves/EllipseCurve.js

/**************************************************************
 *	Ellipse curve
 **************************************************************/

THREE.EllipseCurve = function ( aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise ) {

	this.aX = aX;
	this.aY = aY;

	this.xRadius = xRadius;
	this.yRadius = yRadius;

	this.aStartAngle = aStartAngle;
	this.aEndAngle = aEndAngle;

	this.aClockwise = aClockwise;

};

THREE.EllipseCurve.prototype = Object.create( THREE.Curve.prototype );

THREE.EllipseCurve.prototype.getPoint = function ( t ) {

	var deltaAngle = this.aEndAngle - this.aStartAngle;

	if ( deltaAngle < 0 ) deltaAngle += Math.PI * 2;
	if ( deltaAngle > Math.PI * 2 ) deltaAngle -= Math.PI * 2;

	var angle;

	if ( this.aClockwise === true ) {

		angle = this.aEndAngle + ( 1 - t ) * ( Math.PI * 2 - deltaAngle );

	} else {

		angle = this.aStartAngle + t * deltaAngle;

	}
	
	var vector = new THREE.Vector2();

	vector.x = this.aX + this.xRadius * Math.cos( angle );
	vector.y = this.aY + this.yRadius * Math.sin( angle );

	return vector;

};

// File:src/extras/curves/ArcCurve.js

/**************************************************************
 *	Arc curve
 **************************************************************/

THREE.ArcCurve = function ( aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise ) {

	THREE.EllipseCurve.call( this, aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise );
};

THREE.ArcCurve.prototype = Object.create( THREE.EllipseCurve.prototype );

// File:src/extras/curves/LineCurve3.js

/**************************************************************
 *	Line3D
 **************************************************************/

THREE.LineCurve3 = THREE.Curve.create(

	function ( v1, v2 ) {

		this.v1 = v1;
		this.v2 = v2;

	},

	function ( t ) {

		var vector = new THREE.Vector3();

		vector.subVectors( this.v2, this.v1 ); // diff
		vector.multiplyScalar( t );
		vector.add( this.v1 );

		return vector;

	}

);

// File:src/extras/curves/QuadraticBezierCurve3.js

/**************************************************************
 *	Quadratic Bezier 3D curve
 **************************************************************/

THREE.QuadraticBezierCurve3 = THREE.Curve.create(

	function ( v0, v1, v2 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;

	},

	function ( t ) {

		var vector = new THREE.Vector3();

		vector.x = THREE.Shape.Utils.b2( t, this.v0.x, this.v1.x, this.v2.x );
		vector.y = THREE.Shape.Utils.b2( t, this.v0.y, this.v1.y, this.v2.y );
		vector.z = THREE.Shape.Utils.b2( t, this.v0.z, this.v1.z, this.v2.z );

		return vector;

	}

);

// File:src/extras/curves/CubicBezierCurve3.js

/**************************************************************
 *	Cubic Bezier 3D curve
 **************************************************************/

THREE.CubicBezierCurve3 = THREE.Curve.create(

	function ( v0, v1, v2, v3 ) {

		this.v0 = v0;
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;

	},

	function ( t ) {

		var vector = new THREE.Vector3();

		vector.x = THREE.Shape.Utils.b3( t, this.v0.x, this.v1.x, this.v2.x, this.v3.x );
		vector.y = THREE.Shape.Utils.b3( t, this.v0.y, this.v1.y, this.v2.y, this.v3.y );
		vector.z = THREE.Shape.Utils.b3( t, this.v0.z, this.v1.z, this.v2.z, this.v3.z );

		return vector;

	}

);

// File:src/extras/curves/SplineCurve3.js

/**************************************************************
 *	Spline 3D curve
 **************************************************************/


THREE.SplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 1 ) * t;

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		var point0 = points[ intPoint == 0 ? intPoint : intPoint - 1 ];
		var point1 = points[ intPoint ];
		var point2 = points[ intPoint > points.length - 2 ? points.length - 1 : intPoint + 1 ];
		var point3 = points[ intPoint > points.length - 3 ? points.length - 1 : intPoint + 2 ];

		var vector = new THREE.Vector3();

		vector.x = THREE.Curve.Utils.interpolate( point0.x, point1.x, point2.x, point3.x, weight );
		vector.y = THREE.Curve.Utils.interpolate( point0.y, point1.y, point2.y, point3.y, weight );
		vector.z = THREE.Curve.Utils.interpolate( point0.z, point1.z, point2.z, point3.z, weight );

		return vector;

	}

);

// File:src/extras/curves/ClosedSplineCurve3.js

/**************************************************************
 *	Closed Spline 3D curve
 **************************************************************/


THREE.ClosedSplineCurve3 = THREE.Curve.create(

	function ( points /* array of Vector3 */) {

		this.points = ( points == undefined ) ? [] : points;

	},

	function ( t ) {

		var points = this.points;
		var point = ( points.length - 0 ) * t; // This needs to be from 0-length +1

		var intPoint = Math.floor( point );
		var weight = point - intPoint;

		intPoint += intPoint > 0 ? 0 : ( Math.floor( Math.abs( intPoint ) / points.length ) + 1 ) * points.length;

		var point0 = points[ ( intPoint - 1 ) % points.length ];
		var point1 = points[ ( intPoint     ) % points.length ];
		var point2 = points[ ( intPoint + 1 ) % points.length ];
		var point3 = points[ ( intPoint + 2 ) % points.length ];

		var vector = new THREE.Vector3();

		vector.x = THREE.Curve.Utils.interpolate( point0.x, point1.x, point2.x, point3.x, weight );
		vector.y = THREE.Curve.Utils.interpolate( point0.y, point1.y, point2.y, point3.y, weight );
		vector.z = THREE.Curve.Utils.interpolate( point0.z, point1.z, point2.z, point3.z, weight );

		return vector;

	}

);

// File:src/extras/animation/AnimationHandler.js

/**
 * @author mikael emtinger / http://gomo.se/
 */

THREE.AnimationHandler = {

	LINEAR: 0,
	CATMULLROM: 1,
	CATMULLROM_FORWARD: 2,

	//

	add: function () { console.warn( 'THREE.AnimationHandler.add() has been deprecated.' ); },
	get: function () { console.warn( 'THREE.AnimationHandler.get() has been deprecated.' ); },
	remove: function () { console.warn( 'THREE.AnimationHandler.remove() has been deprecated.' ); },

	//

	animations: [],

	init: function ( data ) {

		if ( data.initialized === true ) return;

		// loop through all keys

		for ( var h = 0; h < data.hierarchy.length; h ++ ) {

			for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

				// remove minus times

				if ( data.hierarchy[ h ].keys[ k ].time < 0 ) {

					 data.hierarchy[ h ].keys[ k ].time = 0;

				}

				// create quaternions

				if ( data.hierarchy[ h ].keys[ k ].rot !== undefined &&
				  ! ( data.hierarchy[ h ].keys[ k ].rot instanceof THREE.Quaternion ) ) {

					var quat = data.hierarchy[ h ].keys[ k ].rot;
					data.hierarchy[ h ].keys[ k ].rot = new THREE.Quaternion().fromArray( quat );

				}

			}

			// prepare morph target keys

			if ( data.hierarchy[ h ].keys.length && data.hierarchy[ h ].keys[ 0 ].morphTargets !== undefined ) {

				// get all used

				var usedMorphTargets = {};

				for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

					for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

						var morphTargetName = data.hierarchy[ h ].keys[ k ].morphTargets[ m ];
						usedMorphTargets[ morphTargetName ] = - 1;

					}

				}

				data.hierarchy[ h ].usedMorphTargets = usedMorphTargets;


				// set all used on all frames

				for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

					var influences = {};

					for ( var morphTargetName in usedMorphTargets ) {

						for ( var m = 0; m < data.hierarchy[ h ].keys[ k ].morphTargets.length; m ++ ) {

							if ( data.hierarchy[ h ].keys[ k ].morphTargets[ m ] === morphTargetName ) {

								influences[ morphTargetName ] = data.hierarchy[ h ].keys[ k ].morphTargetsInfluences[ m ];
								break;

							}

						}

						if ( m === data.hierarchy[ h ].keys[ k ].morphTargets.length ) {

							influences[ morphTargetName ] = 0;

						}

					}

					data.hierarchy[ h ].keys[ k ].morphTargetsInfluences = influences;

				}

			}


			// remove all keys that are on the same time

			for ( var k = 1; k < data.hierarchy[ h ].keys.length; k ++ ) {

				if ( data.hierarchy[ h ].keys[ k ].time === data.hierarchy[ h ].keys[ k - 1 ].time ) {

					data.hierarchy[ h ].keys.splice( k, 1 );
					k --;

				}

			}


			// set index

			for ( var k = 0; k < data.hierarchy[ h ].keys.length; k ++ ) {

				data.hierarchy[ h ].keys[ k ].index = k;

			}

		}

		data.initialized = true;

		return data;

	},

	parse: function ( root ) {

		var parseRecurseHierarchy = function ( root, hierarchy ) {

			hierarchy.push( root );

			for ( var c = 0; c < root.children.length; c ++ )
				parseRecurseHierarchy( root.children[ c ], hierarchy );

		};

		// setup hierarchy

		var hierarchy = [];

		if ( root instanceof THREE.SkinnedMesh ) {

			for ( var b = 0; b < root.skeleton.bones.length; b ++ ) {

				hierarchy.push( root.skeleton.bones[ b ] );

			}

		} else {

			parseRecurseHierarchy( root, hierarchy );

		}

		return hierarchy;

	},

	play: function ( animation ) {

		if ( this.animations.indexOf( animation ) === - 1 ) {

			this.animations.push( animation );

		}

	},

	stop: function ( animation ) {

		var index = this.animations.indexOf( animation );

		if ( index !== - 1 ) {

			this.animations.splice( index, 1 );

		}

	},

	update: function ( deltaTimeMS ) {

		for ( var i = 0; i < this.animations.length; i ++ ) {

			this.animations[ i ].resetBlendWeights( );

		}

		for ( var i = 0; i < this.animations.length; i ++ ) {

			this.animations[ i ].update( deltaTimeMS );

		}

	}

};

// File:src/extras/animation/Animation.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.Animation = function ( root, data ) {

	this.root = root;
	this.data = THREE.AnimationHandler.init( data );
	this.hierarchy = THREE.AnimationHandler.parse( root );

	this.currentTime = 0;
	this.timeScale = 1;

	this.isPlaying = false;
	this.loop = true;
	this.weight = 0;

	this.interpolationType = THREE.AnimationHandler.LINEAR;

};


THREE.Animation.prototype.keyTypes = [ "pos", "rot", "scl" ];


THREE.Animation.prototype.play = function ( startTime, weight ) {

	this.currentTime = startTime !== undefined ? startTime : 0;
	this.weight = weight !== undefined ? weight: 1;

	this.isPlaying = true;

	this.reset();

	THREE.AnimationHandler.play( this );

};


THREE.Animation.prototype.stop = function() {

	this.isPlaying = false;

	THREE.AnimationHandler.stop( this );

};

THREE.Animation.prototype.reset = function () {

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

		var object = this.hierarchy[ h ];

		object.matrixAutoUpdate = true;

		if ( object.animationCache === undefined ) {

			object.animationCache = {
				animations: {},
				blending: {
					positionWeight: 0.0,
					quaternionWeight: 0.0,
					scaleWeight: 0.0
				}
			};
		}

		if ( object.animationCache.animations[this.data.name] === undefined ) {

			object.animationCache.animations[this.data.name] = {};
			object.animationCache.animations[this.data.name].prevKey = { pos: 0, rot: 0, scl: 0 };
			object.animationCache.animations[this.data.name].nextKey = { pos: 0, rot: 0, scl: 0 };
			object.animationCache.animations[this.data.name].originalMatrix = object.matrix;

		}

		var animationCache = object.animationCache.animations[this.data.name];

		// Get keys to match our current time

		for ( var t = 0; t < 3; t ++ ) {

			var type = this.keyTypes[ t ];

			var prevKey = this.data.hierarchy[ h ].keys[ 0 ];
			var nextKey = this.getNextKeyWith( type, h, 1 );

			while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

				prevKey = nextKey;
				nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

			}

			animationCache.prevKey[ type ] = prevKey;
			animationCache.nextKey[ type ] = nextKey;

		}

	}

};

THREE.Animation.prototype.resetBlendWeights = function () {

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

		var object = this.hierarchy[ h ];

		if ( object.animationCache !== undefined ) {

			object.animationCache.blending.positionWeight = 0.0;
			object.animationCache.blending.quaternionWeight = 0.0;
			object.animationCache.blending.scaleWeight = 0.0;

		}

	}

};

THREE.Animation.prototype.update = (function(){

	var points = [];
	var target = new THREE.Vector3();
	var newVector = new THREE.Vector3();
	var newQuat = new THREE.Quaternion();

	// Catmull-Rom spline

	var interpolateCatmullRom = function ( points, scale ) {

		var c = [], v3 = [],
		point, intPoint, weight, w2, w3,
		pa, pb, pc, pd;

		point = ( points.length - 1 ) * scale;
		intPoint = Math.floor( point );
		weight = point - intPoint;

		c[ 0 ] = intPoint === 0 ? intPoint : intPoint - 1;
		c[ 1 ] = intPoint;
		c[ 2 ] = intPoint > points.length - 2 ? intPoint : intPoint + 1;
		c[ 3 ] = intPoint > points.length - 3 ? intPoint : intPoint + 2;

		pa = points[ c[ 0 ] ];
		pb = points[ c[ 1 ] ];
		pc = points[ c[ 2 ] ];
		pd = points[ c[ 3 ] ];

		w2 = weight * weight;
		w3 = weight * w2;

		v3[ 0 ] = interpolate( pa[ 0 ], pb[ 0 ], pc[ 0 ], pd[ 0 ], weight, w2, w3 );
		v3[ 1 ] = interpolate( pa[ 1 ], pb[ 1 ], pc[ 1 ], pd[ 1 ], weight, w2, w3 );
		v3[ 2 ] = interpolate( pa[ 2 ], pb[ 2 ], pc[ 2 ], pd[ 2 ], weight, w2, w3 );

		return v3;

	};

	var interpolate = function ( p0, p1, p2, p3, t, t2, t3 ) {

		var v0 = ( p2 - p0 ) * 0.5,
			v1 = ( p3 - p1 ) * 0.5;

		return ( 2 * ( p1 - p2 ) + v0 + v1 ) * t3 + ( - 3 * ( p1 - p2 ) - 2 * v0 - v1 ) * t2 + v0 * t + p1;

	};

	return function ( delta ) {

		if ( this.isPlaying === false ) return;

		this.currentTime += delta * this.timeScale;

		if ( this.weight === 0 )
			return;

		//

		var duration = this.data.length;

		if ( this.currentTime > duration || this.currentTime < 0 ) {

			if ( this.loop ) {

				this.currentTime %= duration;

				if ( this.currentTime < 0 )
					this.currentTime += duration;

				this.reset();

			} else {

				this.stop();
				return;

			}

		}

		for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

			var object = this.hierarchy[ h ];
			var animationCache = object.animationCache.animations[this.data.name];
			var blending = object.animationCache.blending;

			// loop through pos/rot/scl

			for ( var t = 0; t < 3; t ++ ) {

				// get keys

				var type    = this.keyTypes[ t ];
				var prevKey = animationCache.prevKey[ type ];
				var nextKey = animationCache.nextKey[ type ];

				if ( ( this.timeScale > 0 && nextKey.time <= this.currentTime ) ||
					( this.timeScale < 0 && prevKey.time >= this.currentTime ) ) {

					prevKey = this.data.hierarchy[ h ].keys[ 0 ];
					nextKey = this.getNextKeyWith( type, h, 1 );

					while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

						prevKey = nextKey;
						nextKey = this.getNextKeyWith( type, h, nextKey.index + 1 );

					}

					animationCache.prevKey[ type ] = prevKey;
					animationCache.nextKey[ type ] = nextKey;

				}

				object.matrixAutoUpdate = true;
				object.matrixWorldNeedsUpdate = true;

				var scale = ( this.currentTime - prevKey.time ) / ( nextKey.time - prevKey.time );

				var prevXYZ = prevKey[ type ];
				var nextXYZ = nextKey[ type ];

				if ( scale < 0 ) scale = 0;
				if ( scale > 1 ) scale = 1;

				// interpolate

				if ( type === "pos" ) {

					if ( this.interpolationType === THREE.AnimationHandler.LINEAR ) {

						newVector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
						newVector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
						newVector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

						// blend
						var proportionalWeight = this.weight / ( this.weight + blending.positionWeight );
						object.position.lerp( newVector, proportionalWeight );
						blending.positionWeight += this.weight;

					} else if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
								this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

						points[ 0 ] = this.getPrevKeyWith( "pos", h, prevKey.index - 1 )[ "pos" ];
						points[ 1 ] = prevXYZ;
						points[ 2 ] = nextXYZ;
						points[ 3 ] = this.getNextKeyWith( "pos", h, nextKey.index + 1 )[ "pos" ];

						scale = scale * 0.33 + 0.33;

						var currentPoint = interpolateCatmullRom( points, scale );
						var proportionalWeight = this.weight / ( this.weight + blending.positionWeight );
						blending.positionWeight += this.weight;

						// blend

						var vector = object.position;
						
						vector.x = vector.x + ( currentPoint[ 0 ] - vector.x ) * proportionalWeight;
						vector.y = vector.y + ( currentPoint[ 1 ] - vector.y ) * proportionalWeight;
						vector.z = vector.z + ( currentPoint[ 2 ] - vector.z ) * proportionalWeight;

						if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

							var forwardPoint = interpolateCatmullRom( points, scale * 1.01 );

							target.set( forwardPoint[ 0 ], forwardPoint[ 1 ], forwardPoint[ 2 ] );
							target.sub( vector );
							target.y = 0;
							target.normalize();

							var angle = Math.atan2( target.x, target.z );
							object.rotation.set( 0, angle, 0 );

						}

					}

				} else if ( type === "rot" ) {

					THREE.Quaternion.slerp( prevXYZ, nextXYZ, newQuat, scale );

					// Avoid paying the cost of an additional slerp if we don't have to
					if ( blending.quaternionWeight === 0 ) {

						object.quaternion.copy(newQuat);
						blending.quaternionWeight = this.weight;

					} else {

						var proportionalWeight = this.weight / ( this.weight + blending.quaternionWeight );
						THREE.Quaternion.slerp( object.quaternion, newQuat, object.quaternion, proportionalWeight );
						blending.quaternionWeight += this.weight;

					}

				} else if ( type === "scl" ) {

					newVector.x = prevXYZ[ 0 ] + ( nextXYZ[ 0 ] - prevXYZ[ 0 ] ) * scale;
					newVector.y = prevXYZ[ 1 ] + ( nextXYZ[ 1 ] - prevXYZ[ 1 ] ) * scale;
					newVector.z = prevXYZ[ 2 ] + ( nextXYZ[ 2 ] - prevXYZ[ 2 ] ) * scale;

					var proportionalWeight = this.weight / ( this.weight + blending.scaleWeight );
					object.scale.lerp( newVector, proportionalWeight );
					blending.scaleWeight += this.weight;

				}

			}

		}

		return true;

	};

})();





// Get next key with

THREE.Animation.prototype.getNextKeyWith = function ( type, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;

	if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
		 this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

		key = key < keys.length - 1 ? key : keys.length - 1;

	} else {

		key = key % keys.length;

	}

	for ( ; key < keys.length; key ++ ) {

		if ( keys[ key ][ type ] !== undefined ) {

			return keys[ key ];

		}

	}

	return this.data.hierarchy[ h ].keys[ 0 ];

};

// Get previous key with

THREE.Animation.prototype.getPrevKeyWith = function ( type, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;

	if ( this.interpolationType === THREE.AnimationHandler.CATMULLROM ||
		this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ) {

		key = key > 0 ? key : 0;

	} else {

		key = key >= 0 ? key : key + keys.length;

	}


	for ( ; key >= 0; key -- ) {

		if ( keys[ key ][ type ] !== undefined ) {

			return keys[ key ];

		}

	}

	return this.data.hierarchy[ h ].keys[ keys.length - 1 ];

};

// File:src/extras/animation/KeyFrameAnimation.js

/**
 * @author mikael emtinger / http://gomo.se/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author khang duong
 * @author erik kitson
 */

THREE.KeyFrameAnimation = function ( data ) {

	this.root = data.node;
	this.data = THREE.AnimationHandler.init( data );
	this.hierarchy = THREE.AnimationHandler.parse( this.root );
	this.currentTime = 0;
	this.timeScale = 0.001;
	this.isPlaying = false;
	this.isPaused = true;
	this.loop = true;

	// initialize to first keyframes

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

		var keys = this.data.hierarchy[h].keys,
			sids = this.data.hierarchy[h].sids,
			obj = this.hierarchy[h];

		if ( keys.length && sids ) {

			for ( var s = 0; s < sids.length; s ++ ) {

				var sid = sids[ s ],
					next = this.getNextKeyWith( sid, h, 0 );

				if ( next ) {

					next.apply( sid );

				}

			}

			obj.matrixAutoUpdate = false;
			this.data.hierarchy[h].node.updateMatrix();
			obj.matrixWorldNeedsUpdate = true;

		}

	}

};


THREE.KeyFrameAnimation.prototype.play = function ( startTime ) {

	this.currentTime = startTime !== undefined ? startTime : 0;

	if ( this.isPlaying === false ) {

		this.isPlaying = true;

		// reset key cache

		var h, hl = this.hierarchy.length,
			object,
			node;

		for ( h = 0; h < hl; h ++ ) {

			object = this.hierarchy[ h ];
			node = this.data.hierarchy[ h ];

			if ( node.animationCache === undefined ) {

				node.animationCache = {};
				node.animationCache.prevKey = null;
				node.animationCache.nextKey = null;
				node.animationCache.originalMatrix = object.matrix;

			}

			var keys = this.data.hierarchy[h].keys;

			if (keys.length) {

				node.animationCache.prevKey = keys[ 0 ];
				node.animationCache.nextKey = keys[ 1 ];

				this.startTime = Math.min( keys[0].time, this.startTime );
				this.endTime = Math.max( keys[keys.length - 1].time, this.endTime );

			}

		}

		this.update( 0 );

	}

	this.isPaused = false;

	THREE.AnimationHandler.play( this );

};


THREE.KeyFrameAnimation.prototype.stop = function() {

	this.isPlaying = false;
	this.isPaused  = false;

	THREE.AnimationHandler.stop( this );

	// reset JIT matrix and remove cache

	for ( var h = 0; h < this.data.hierarchy.length; h ++ ) {
		
		var obj = this.hierarchy[ h ];
		var node = this.data.hierarchy[ h ];

		if ( node.animationCache !== undefined ) {

			var original = node.animationCache.originalMatrix;

			original.copy( obj.matrix );
			obj.matrix = original;

			delete node.animationCache;

		}

	}

};


// Update

THREE.KeyFrameAnimation.prototype.update = function ( delta ) {

	if ( this.isPlaying === false ) return;

	this.currentTime += delta * this.timeScale;

	//

	var duration = this.data.length;

	if ( this.loop === true && this.currentTime > duration ) {

		this.currentTime %= duration;

	}

	this.currentTime = Math.min( this.currentTime, duration );

	for ( var h = 0, hl = this.hierarchy.length; h < hl; h ++ ) {

		var object = this.hierarchy[ h ];
		var node = this.data.hierarchy[ h ];

		var keys = node.keys,
			animationCache = node.animationCache;


		if ( keys.length ) {

			var prevKey = animationCache.prevKey;
			var nextKey = animationCache.nextKey;

			if ( nextKey.time <= this.currentTime ) {

				while ( nextKey.time < this.currentTime && nextKey.index > prevKey.index ) {

					prevKey = nextKey;
					nextKey = keys[ prevKey.index + 1 ];

				}

				animationCache.prevKey = prevKey;
				animationCache.nextKey = nextKey;

			}

			if ( nextKey.time >= this.currentTime ) {

				prevKey.interpolate( nextKey, this.currentTime );

			} else {

				prevKey.interpolate( nextKey, nextKey.time );

			}

			this.data.hierarchy[ h ].node.updateMatrix();
			object.matrixWorldNeedsUpdate = true;

		}

	}

};

// Get next key with

THREE.KeyFrameAnimation.prototype.getNextKeyWith = function( sid, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;
	key = key % keys.length;

	for ( ; key < keys.length; key ++ ) {

		if ( keys[ key ].hasTarget( sid ) ) {

			return keys[ key ];

		}

	}

	return keys[ 0 ];

};

// Get previous key with

THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function( sid, h, key ) {

	var keys = this.data.hierarchy[ h ].keys;
	key = key >= 0 ? key : key + keys.length;

	for ( ; key >= 0; key -- ) {

		if ( keys[ key ].hasTarget( sid ) ) {

			return keys[ key ];

		}

	}

	return keys[ keys.length - 1 ];

};

// File:src/extras/animation/MorphAnimation.js

/**
 * @author mrdoob / http://mrdoob.com
 */

THREE.MorphAnimation = function ( mesh ) {

	this.mesh = mesh;
	this.frames = mesh.morphTargetInfluences.length;
	this.currentTime = 0;
	this.duration = 1000;
	this.loop = true;

	this.isPlaying = false;

};

THREE.MorphAnimation.prototype = {

	play: function () {

		this.isPlaying = true;

	},

	pause: function () {

		this.isPlaying = false;

	},

	update: ( function () {

		var lastFrame = 0;
		var currentFrame = 0;

		return function ( delta ) {

			if ( this.isPlaying === false ) return;

			this.currentTime += delta;

			if ( this.loop === true && this.currentTime > this.duration ) {

				this.currentTime %= this.duration;

			}

			this.currentTime = Math.min( this.currentTime, this.duration );

			var interpolation = this.duration / this.frames;
			var frame = Math.floor( this.currentTime / interpolation );

			if ( frame != currentFrame ) {

				this.mesh.morphTargetInfluences[ lastFrame ] = 0;
				this.mesh.morphTargetInfluences[ currentFrame ] = 1;
				this.mesh.morphTargetInfluences[ frame ] = 0;

				lastFrame = currentFrame;
				currentFrame = frame;

			}

			this.mesh.morphTargetInfluences[ frame ] = ( this.currentTime % interpolation ) / interpolation;
			this.mesh.morphTargetInfluences[ lastFrame ] = 1 - this.mesh.morphTargetInfluences[ frame ];

		}

	} )()

};

// File:src/extras/geometries/BoxGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Cube.as
 */

THREE.BoxGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments ) {

	THREE.Geometry.call( this );

	this.type = 'BoxGeometry';

	this.parameters = {
		width: width,
		height: height,
		depth: depth,
		widthSegments: widthSegments,
		heightSegments: heightSegments,
		depthSegments: depthSegments
	};

	this.widthSegments = widthSegments || 1;
	this.heightSegments = heightSegments || 1;
	this.depthSegments = depthSegments || 1;

	var scope = this;

	var width_half = width / 2;
	var height_half = height / 2;
	var depth_half = depth / 2;

	buildPlane( 'z', 'y', - 1, - 1, depth, height, width_half, 0 ); // px
	buildPlane( 'z', 'y',   1, - 1, depth, height, - width_half, 1 ); // nx
	buildPlane( 'x', 'z',   1,   1, width, depth, height_half, 2 ); // py
	buildPlane( 'x', 'z',   1, - 1, width, depth, - height_half, 3 ); // ny
	buildPlane( 'x', 'y',   1, - 1, width, height, depth_half, 4 ); // pz
	buildPlane( 'x', 'y', - 1, - 1, width, height, - depth_half, 5 ); // nz

	function buildPlane( u, v, udir, vdir, width, height, depth, materialIndex ) {

		var w, ix, iy,
		gridX = scope.widthSegments,
		gridY = scope.heightSegments,
		width_half = width / 2,
		height_half = height / 2,
		offset = scope.vertices.length;

		if ( ( u === 'x' && v === 'y' ) || ( u === 'y' && v === 'x' ) ) {

			w = 'z';

		} else if ( ( u === 'x' && v === 'z' ) || ( u === 'z' && v === 'x' ) ) {

			w = 'y';
			gridY = scope.depthSegments;

		} else if ( ( u === 'z' && v === 'y' ) || ( u === 'y' && v === 'z' ) ) {

			w = 'x';
			gridX = scope.depthSegments;

		}

		var gridX1 = gridX + 1,
		gridY1 = gridY + 1,
		segment_width = width / gridX,
		segment_height = height / gridY,
		normal = new THREE.Vector3();

		normal[ w ] = depth > 0 ? 1 : - 1;

		for ( iy = 0; iy < gridY1; iy ++ ) {

			for ( ix = 0; ix < gridX1; ix ++ ) {

				var vector = new THREE.Vector3();
				vector[ u ] = ( ix * segment_width - width_half ) * udir;
				vector[ v ] = ( iy * segment_height - height_half ) * vdir;
				vector[ w ] = depth;

				scope.vertices.push( vector );

			}

		}

		for ( iy = 0; iy < gridY; iy ++ ) {

			for ( ix = 0; ix < gridX; ix ++ ) {

				var a = ix + gridX1 * iy;
				var b = ix + gridX1 * ( iy + 1 );
				var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				var d = ( ix + 1 ) + gridX1 * iy;

				var uva = new THREE.Vector2( ix / gridX, 1 - iy / gridY );
				var uvb = new THREE.Vector2( ix / gridX, 1 - ( iy + 1 ) / gridY );
				var uvc = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - ( iy + 1 ) / gridY );
				var uvd = new THREE.Vector2( ( ix + 1 ) / gridX, 1 - iy / gridY );

				var face = new THREE.Face3( a + offset, b + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

				face = new THREE.Face3( b + offset, c + offset, d + offset );
				face.normal.copy( normal );
				face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
				face.materialIndex = materialIndex;

				scope.faces.push( face );
				scope.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

			}

		}

	}

	this.mergeVertices();

};

THREE.BoxGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/CircleGeometry.js

/**
 * @author hughes
 */

THREE.CircleGeometry = function ( radius, segments, thetaStart, thetaLength ) {

	THREE.Geometry.call( this );

	this.type = 'CircleGeometry';

	this.parameters = {
		radius: radius,
		segments: segments,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	radius = radius || 50;
	segments = segments !== undefined ? Math.max( 3, segments ) : 8;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	var i, uvs = [],
	center = new THREE.Vector3(), centerUV = new THREE.Vector2( 0.5, 0.5 );

	this.vertices.push(center);
	uvs.push( centerUV );

	for ( i = 0; i <= segments; i ++ ) {

		var vertex = new THREE.Vector3();
		var segment = thetaStart + i / segments * thetaLength;

		vertex.x = radius * Math.cos( segment );
		vertex.y = radius * Math.sin( segment );

		this.vertices.push( vertex );
		uvs.push( new THREE.Vector2( ( vertex.x / radius + 1 ) / 2, ( vertex.y / radius + 1 ) / 2 ) );

	}

	var n = new THREE.Vector3( 0, 0, 1 );

	for ( i = 1; i <= segments; i ++ ) {

		this.faces.push( new THREE.Face3( i, i + 1, 0, [ n.clone(), n.clone(), n.clone() ] ) );
		this.faceVertexUvs[ 0 ].push( [ uvs[ i ].clone(), uvs[ i + 1 ].clone(), centerUV.clone() ] );

	}

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREE.CircleGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/CubeGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 */


THREE.CubeGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments ) {

	console.warn( 'THREE.CubeGeometry has been renamed to THREE.BoxGeometry.' );
	return new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );

 };

// File:src/extras/geometries/CylinderGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.CylinderGeometry = function ( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded ) {

	THREE.Geometry.call( this );

	this.type = 'CylinderGeometry';

	this.parameters = {
		radiusTop: radiusTop,
		radiusBottom: radiusBottom,
		height: height,
		radialSegments: radialSegments,
		heightSegments: heightSegments,
		openEnded: openEnded
	};

	radiusTop = radiusTop !== undefined ? radiusTop : 20;
	radiusBottom = radiusBottom !== undefined ? radiusBottom : 20;
	height = height !== undefined ? height : 100;

	radialSegments = radialSegments || 8;
	heightSegments = heightSegments || 1;

	openEnded = openEnded !== undefined ? openEnded : false;

	var heightHalf = height / 2;

	var x, y, vertices = [], uvs = [];

	for ( y = 0; y <= heightSegments; y ++ ) {

		var verticesRow = [];
		var uvsRow = [];

		var v = y / heightSegments;
		var radius = v * ( radiusBottom - radiusTop ) + radiusTop;

		for ( x = 0; x <= radialSegments; x ++ ) {

			var u = x / radialSegments;

			var vertex = new THREE.Vector3();
			vertex.x = radius * Math.sin( u * Math.PI * 2 );
			vertex.y = - v * height + heightHalf;
			vertex.z = radius * Math.cos( u * Math.PI * 2 );

			this.vertices.push( vertex );

			verticesRow.push( this.vertices.length - 1 );
			uvsRow.push( new THREE.Vector2( u, 1 - v ) );

		}

		vertices.push( verticesRow );
		uvs.push( uvsRow );

	}

	var tanTheta = ( radiusBottom - radiusTop ) / height;
	var na, nb;

	for ( x = 0; x < radialSegments; x ++ ) {

		if ( radiusTop !== 0 ) {

			na = this.vertices[ vertices[ 0 ][ x ] ].clone();
			nb = this.vertices[ vertices[ 0 ][ x + 1 ] ].clone();

		} else {

			na = this.vertices[ vertices[ 1 ][ x ] ].clone();
			nb = this.vertices[ vertices[ 1 ][ x + 1 ] ].clone();

		}

		na.setY( Math.sqrt( na.x * na.x + na.z * na.z ) * tanTheta ).normalize();
		nb.setY( Math.sqrt( nb.x * nb.x + nb.z * nb.z ) * tanTheta ).normalize();

		for ( y = 0; y < heightSegments; y ++ ) {

			var v1 = vertices[ y ][ x ];
			var v2 = vertices[ y + 1 ][ x ];
			var v3 = vertices[ y + 1 ][ x + 1 ];
			var v4 = vertices[ y ][ x + 1 ];

			var n1 = na.clone();
			var n2 = na.clone();
			var n3 = nb.clone();
			var n4 = nb.clone();

			var uv1 = uvs[ y ][ x ].clone();
			var uv2 = uvs[ y + 1 ][ x ].clone();
			var uv3 = uvs[ y + 1 ][ x + 1 ].clone();
			var uv4 = uvs[ y ][ x + 1 ].clone();

			this.faces.push( new THREE.Face3( v1, v2, v4, [ n1, n2, n4 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv4 ] );

			this.faces.push( new THREE.Face3( v2, v3, v4, [ n2.clone(), n3, n4.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv2.clone(), uv3, uv4.clone() ] );

		}

	}

	// top cap

	if ( openEnded === false && radiusTop > 0 ) {

		this.vertices.push( new THREE.Vector3( 0, heightHalf, 0 ) );

		for ( x = 0; x < radialSegments; x ++ ) {

			var v1 = vertices[ 0 ][ x ];
			var v2 = vertices[ 0 ][ x + 1 ];
			var v3 = this.vertices.length - 1;

			var n1 = new THREE.Vector3( 0, 1, 0 );
			var n2 = new THREE.Vector3( 0, 1, 0 );
			var n3 = new THREE.Vector3( 0, 1, 0 );

			var uv1 = uvs[ 0 ][ x ].clone();
			var uv2 = uvs[ 0 ][ x + 1 ].clone();
			var uv3 = new THREE.Vector2( uv2.x, 0 );

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

		}

	}

	// bottom cap

	if ( openEnded === false && radiusBottom > 0 ) {

		this.vertices.push( new THREE.Vector3( 0, - heightHalf, 0 ) );

		for ( x = 0; x < radialSegments; x ++ ) {

			var v1 = vertices[ y ][ x + 1 ];
			var v2 = vertices[ y ][ x ];
			var v3 = this.vertices.length - 1;

			var n1 = new THREE.Vector3( 0, - 1, 0 );
			var n2 = new THREE.Vector3( 0, - 1, 0 );
			var n3 = new THREE.Vector3( 0, - 1, 0 );

			var uv1 = uvs[ y ][ x + 1 ].clone();
			var uv2 = uvs[ y ][ x ].clone();
			var uv3 = new THREE.Vector2( uv2.x, 1 );

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

		}

	}

	this.computeFaceNormals();

}

THREE.CylinderGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/ExtrudeGeometry.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * Creates extruded geometry from a path shape.
 *
 * parameters = {
 *
 *  curveSegments: <int>, // number of points on the curves
 *  steps: <int>, // number of points for z-side extrusions / used for subdividing segements of extrude spline too
 *  amount: <int>, // Depth to extrude the shape
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into the original shape bevel goes
 *  bevelSize: <float>, // how far from shape outline is bevel
 *  bevelSegments: <int>, // number of bevel layers
 *
 *  extrudePath: <THREE.CurvePath> // 3d spline path to extrude shape along. (creates Frames if .frames aren't defined)
 *  frames: <THREE.TubeGeometry.FrenetFrames> // containing arrays of tangents, normals, binormals
 *
 *  material: <int> // material index for front and back faces
 *  extrudeMaterial: <int> // material index for extrusion and beveled faces
 *  uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/

THREE.ExtrudeGeometry = function ( shapes, options ) {

	if ( typeof( shapes ) === "undefined" ) {
		shapes = [];
		return;
	}

	THREE.Geometry.call( this );

	this.type = 'ExtrudeGeometry';

	shapes = shapes instanceof Array ? shapes : [ shapes ];

	this.addShapeList( shapes, options );

	this.computeFaceNormals();

	// can't really use automatic vertex normals
	// as then front and back sides get smoothed too
	// should do separate smoothing just for sides

	//this.computeVertexNormals();

	//console.log( "took", ( Date.now() - startTime ) );

};

THREE.ExtrudeGeometry.prototype = Object.create( THREE.Geometry.prototype );

THREE.ExtrudeGeometry.prototype.addShapeList = function ( shapes, options ) {
	var sl = shapes.length;

	for ( var s = 0; s < sl; s ++ ) {
		var shape = shapes[ s ];
		this.addShape( shape, options );
	}
};

THREE.ExtrudeGeometry.prototype.addShape = function ( shape, options ) {

	var amount = options.amount !== undefined ? options.amount : 100;

	var bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6; // 10
	var bevelSize = options.bevelSize !== undefined ? options.bevelSize : bevelThickness - 2; // 8
	var bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;

	var bevelEnabled = options.bevelEnabled !== undefined ? options.bevelEnabled : true; // false

	var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;

	var steps = options.steps !== undefined ? options.steps : 1;

	var extrudePath = options.extrudePath;
	var extrudePts, extrudeByPath = false;

	var material = options.material;
	var extrudeMaterial = options.extrudeMaterial;

	// Use default WorldUVGenerator if no UV generators are specified.
	var uvgen = options.UVGenerator !== undefined ? options.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;

	var splineTube, binormal, normal, position2;
	if ( extrudePath ) {

		extrudePts = extrudePath.getSpacedPoints( steps );

		extrudeByPath = true;
		bevelEnabled = false; // bevels not supported for path extrusion

		// SETUP TNB variables

		// Reuse TNB from TubeGeomtry for now.
		// TODO1 - have a .isClosed in spline?

		splineTube = options.frames !== undefined ? options.frames : new THREE.TubeGeometry.FrenetFrames(extrudePath, steps, false);

		// console.log(splineTube, 'splineTube', splineTube.normals.length, 'steps', steps, 'extrudePts', extrudePts.length);

		binormal = new THREE.Vector3();
		normal = new THREE.Vector3();
		position2 = new THREE.Vector3();

	}

	// Safeguards if bevels are not enabled

	if ( ! bevelEnabled ) {

		bevelSegments = 0;
		bevelThickness = 0;
		bevelSize = 0;

	}

	// Variables initalization

	var ahole, h, hl; // looping of holes
	var scope = this;
	var bevelPoints = [];

	var shapesOffset = this.vertices.length;

	var shapePoints = shape.extractPoints( curveSegments );

	var vertices = shapePoints.shape;
	var holes = shapePoints.holes;

	var reverse = ! THREE.Shape.Utils.isClockWise( vertices ) ;

	if ( reverse ) {

		vertices = vertices.reverse();

		// Maybe we should also check if holes are in the opposite direction, just to be safe ...

		for ( h = 0, hl = holes.length; h < hl; h ++ ) {

			ahole = holes[ h ];

			if ( THREE.Shape.Utils.isClockWise( ahole ) ) {

				holes[ h ] = ahole.reverse();

			}

		}

		reverse = false; // If vertices are in order now, we shouldn't need to worry about them again (hopefully)!

	}


	var faces = THREE.Shape.Utils.triangulateShape ( vertices, holes );

	/* Vertices */

	var contour = vertices; // vertices has all points but contour has only points of circumference

	for ( h = 0, hl = holes.length;  h < hl; h ++ ) {

		ahole = holes[ h ];

		vertices = vertices.concat( ahole );

	}


	function scalePt2 ( pt, vec, size ) {

		if ( ! vec ) console.log( "die" );

		return vec.clone().multiplyScalar( size ).add( pt );

	}

	var b, bs, t, z,
		vert, vlen = vertices.length,
		face, flen = faces.length,
		cont, clen = contour.length;


	// Find directions for point movement

	var RAD_TO_DEGREES = 180 / Math.PI;


	function getBevelVec( inPt, inPrev, inNext ) {

		var EPSILON = 0.0000000001;
		
		// computes for inPt the corresponding point inPt' on a new contour
		//   shiftet by 1 unit (length of normalized vector) to the left
		// if we walk along contour clockwise, this new contour is outside the old one
		//
		// inPt' is the intersection of the two lines parallel to the two
		//  adjacent edges of inPt at a distance of 1 unit on the left side.
		
		var v_trans_x, v_trans_y, shrink_by = 1;		// resulting translation vector for inPt

		// good reading for geometry algorithms (here: line-line intersection)
		// http://geomalgorithms.com/a05-_intersect-1.html

		var v_prev_x = inPt.x - inPrev.x, v_prev_y = inPt.y - inPrev.y;
		var v_next_x = inNext.x - inPt.x, v_next_y = inNext.y - inPt.y;
		
		var v_prev_lensq = ( v_prev_x * v_prev_x + v_prev_y * v_prev_y );
		
		// check for colinear edges
		var colinear0 = ( v_prev_x * v_next_y - v_prev_y * v_next_x );
		
		if ( Math.abs( colinear0 ) > EPSILON ) {		// not colinear
			
			// length of vectors for normalizing
	
			var v_prev_len = Math.sqrt( v_prev_lensq );
			var v_next_len = Math.sqrt( v_next_x * v_next_x + v_next_y * v_next_y );
			
			// shift adjacent points by unit vectors to the left
	
			var ptPrevShift_x = ( inPrev.x - v_prev_y / v_prev_len );
			var ptPrevShift_y = ( inPrev.y + v_prev_x / v_prev_len );
			
			var ptNextShift_x = ( inNext.x - v_next_y / v_next_len );
			var ptNextShift_y = ( inNext.y + v_next_x / v_next_len );
	
			// scaling factor for v_prev to intersection point
	
			var sf = (  ( ptNextShift_x - ptPrevShift_x ) * v_next_y -
						( ptNextShift_y - ptPrevShift_y ) * v_next_x    ) /
					  ( v_prev_x * v_next_y - v_prev_y * v_next_x );
	
			// vector from inPt to intersection point
	
			v_trans_x = ( ptPrevShift_x + v_prev_x * sf - inPt.x );
			v_trans_y = ( ptPrevShift_y + v_prev_y * sf - inPt.y );
	
			// Don't normalize!, otherwise sharp corners become ugly
			//  but prevent crazy spikes
			var v_trans_lensq = ( v_trans_x * v_trans_x + v_trans_y * v_trans_y )
			if ( v_trans_lensq <= 2 ) {
				return	new THREE.Vector2( v_trans_x, v_trans_y );
			} else {
				shrink_by = Math.sqrt( v_trans_lensq / 2 );
			}
			
		} else {		// handle special case of colinear edges

			var direction_eq = false;		// assumes: opposite
			if ( v_prev_x > EPSILON ) {
				if ( v_next_x > EPSILON ) { direction_eq = true; }
			} else {
				if ( v_prev_x < - EPSILON ) {
					if ( v_next_x < - EPSILON ) { direction_eq = true; }
				} else {
					if ( Math.sign(v_prev_y) == Math.sign(v_next_y) ) { direction_eq = true; }
				}
			}

			if ( direction_eq ) {
				// console.log("Warning: lines are a straight sequence");
				v_trans_x = - v_prev_y;
				v_trans_y =  v_prev_x;
				shrink_by = Math.sqrt( v_prev_lensq );
			} else {
				// console.log("Warning: lines are a straight spike");
				v_trans_x = v_prev_x;
				v_trans_y = v_prev_y;
				shrink_by = Math.sqrt( v_prev_lensq / 2 );
			}

		}

		return	new THREE.Vector2( v_trans_x / shrink_by, v_trans_y / shrink_by );

	}


	var contourMovements = [];

	for ( var i = 0, il = contour.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

		if ( j === il ) j = 0;
		if ( k === il ) k = 0;

		//  (j)---(i)---(k)
		// console.log('i,j,k', i, j , k)

		var pt_i = contour[ i ];
		var pt_j = contour[ j ];
		var pt_k = contour[ k ];

		contourMovements[ i ]= getBevelVec( contour[ i ], contour[ j ], contour[ k ] );

	}

	var holesMovements = [], oneHoleMovements, verticesMovements = contourMovements.concat();

	for ( h = 0, hl = holes.length; h < hl; h ++ ) {

		ahole = holes[ h ];

		oneHoleMovements = [];

		for ( i = 0, il = ahole.length, j = il - 1, k = i + 1; i < il; i ++, j ++, k ++ ) {

			if ( j === il ) j = 0;
			if ( k === il ) k = 0;

			//  (j)---(i)---(k)
			oneHoleMovements[ i ]= getBevelVec( ahole[ i ], ahole[ j ], ahole[ k ] );

		}

		holesMovements.push( oneHoleMovements );
		verticesMovements = verticesMovements.concat( oneHoleMovements );

	}


	// Loop bevelSegments, 1 for the front, 1 for the back

	for ( b = 0; b < bevelSegments; b ++ ) {
	//for ( b = bevelSegments; b > 0; b -- ) {

		t = b / bevelSegments;
		z = bevelThickness * ( 1 - t );

		//z = bevelThickness * t;
		bs = bevelSize * ( Math.sin ( t * Math.PI/2 ) ) ; // curved
		//bs = bevelSize * t ; // linear

		// contract shape

		for ( i = 0, il = contour.length; i < il; i ++ ) {

			vert = scalePt2( contour[ i ], contourMovements[ i ], bs );

			v( vert.x, vert.y,  - z );

		}

		// expand holes

		for ( h = 0, hl = holes.length; h < hl; h ++ ) {

			ahole = holes[ h ];
			oneHoleMovements = holesMovements[ h ];

			for ( i = 0, il = ahole.length; i < il; i ++ ) {

				vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );

				v( vert.x, vert.y,  - z );

			}

		}

	}

	bs = bevelSize;

	// Back facing vertices

	for ( i = 0; i < vlen; i ++ ) {

		vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

		if ( ! extrudeByPath ) {

			v( vert.x, vert.y, 0 );

		} else {

			// v( vert.x, vert.y + extrudePts[ 0 ].y, extrudePts[ 0 ].x );

			normal.copy( splineTube.normals[0] ).multiplyScalar(vert.x);
			binormal.copy( splineTube.binormals[0] ).multiplyScalar(vert.y);

			position2.copy( extrudePts[0] ).add(normal).add(binormal);

			v( position2.x, position2.y, position2.z );

		}

	}

	// Add stepped vertices...
	// Including front facing vertices

	var s;

	for ( s = 1; s <= steps; s ++ ) {

		for ( i = 0; i < vlen; i ++ ) {

			vert = bevelEnabled ? scalePt2( vertices[ i ], verticesMovements[ i ], bs ) : vertices[ i ];

			if ( ! extrudeByPath ) {

				v( vert.x, vert.y, amount / steps * s );

			} else {

				// v( vert.x, vert.y + extrudePts[ s - 1 ].y, extrudePts[ s - 1 ].x );

				normal.copy( splineTube.normals[s] ).multiplyScalar( vert.x );
				binormal.copy( splineTube.binormals[s] ).multiplyScalar( vert.y );

				position2.copy( extrudePts[s] ).add( normal ).add( binormal );

				v( position2.x, position2.y, position2.z );

			}

		}

	}


	// Add bevel segments planes

	//for ( b = 1; b <= bevelSegments; b ++ ) {
	for ( b = bevelSegments - 1; b >= 0; b -- ) {

		t = b / bevelSegments;
		z = bevelThickness * ( 1 - t );
		//bs = bevelSize * ( 1-Math.sin ( ( 1 - t ) * Math.PI/2 ) );
		bs = bevelSize * Math.sin ( t * Math.PI/2 ) ;

		// contract shape

		for ( i = 0, il = contour.length; i < il; i ++ ) {

			vert = scalePt2( contour[ i ], contourMovements[ i ], bs );
			v( vert.x, vert.y,  amount + z );

		}

		// expand holes

		for ( h = 0, hl = holes.length; h < hl; h ++ ) {

			ahole = holes[ h ];
			oneHoleMovements = holesMovements[ h ];

			for ( i = 0, il = ahole.length; i < il; i ++ ) {

				vert = scalePt2( ahole[ i ], oneHoleMovements[ i ], bs );

				if ( ! extrudeByPath ) {

					v( vert.x, vert.y,  amount + z );

				} else {

					v( vert.x, vert.y + extrudePts[ steps - 1 ].y, extrudePts[ steps - 1 ].x + z );

				}

			}

		}

	}

	/* Faces */

	// Top and bottom faces

	buildLidFaces();

	// Sides faces

	buildSideFaces();


	/////  Internal functions

	function buildLidFaces() {

		if ( bevelEnabled ) {

			var layer = 0 ; // steps + 1
			var offset = vlen * layer;

			// Bottom faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 2 ]+ offset, face[ 1 ]+ offset, face[ 0 ] + offset );

			}

			layer = steps + bevelSegments * 2;
			offset = vlen * layer;

			// Top faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 0 ] + offset, face[ 1 ] + offset, face[ 2 ] + offset );

			}

		} else {

			// Bottom faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 2 ], face[ 1 ], face[ 0 ] );

			}

			// Top faces

			for ( i = 0; i < flen; i ++ ) {

				face = faces[ i ];
				f3( face[ 0 ] + vlen * steps, face[ 1 ] + vlen * steps, face[ 2 ] + vlen * steps );

			}
		}

	}

	// Create faces for the z-sides of the shape

	function buildSideFaces() {

		var layeroffset = 0;
		sidewalls( contour, layeroffset );
		layeroffset += contour.length;

		for ( h = 0, hl = holes.length;  h < hl; h ++ ) {

			ahole = holes[ h ];
			sidewalls( ahole, layeroffset );

			//, true
			layeroffset += ahole.length;

		}

	}

	function sidewalls( contour, layeroffset ) {

		var j, k;
		i = contour.length;

		while ( --i >= 0 ) {

			j = i;
			k = i - 1;
			if ( k < 0 ) k = contour.length - 1;

			//console.log('b', i,j, i-1, k,vertices.length);

			var s = 0, sl = steps  + bevelSegments * 2;

			for ( s = 0; s < sl; s ++ ) {

				var slen1 = vlen * s;
				var slen2 = vlen * ( s + 1 );

				var a = layeroffset + j + slen1,
					b = layeroffset + k + slen1,
					c = layeroffset + k + slen2,
					d = layeroffset + j + slen2;

				f4( a, b, c, d, contour, s, sl, j, k );

			}
		}

	}


	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c ) {

		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;

		// normal, color, material
		scope.faces.push( new THREE.Face3( a, b, c, null, null, material ) );

		var uvs = uvgen.generateTopUV( scope, a, b, c );

 		scope.faceVertexUvs[ 0 ].push( uvs );

	}

	function f4( a, b, c, d, wallContour, stepIndex, stepsLength, contourIndex1, contourIndex2 ) {

		a += shapesOffset;
		b += shapesOffset;
		c += shapesOffset;
		d += shapesOffset;

 		scope.faces.push( new THREE.Face3( a, b, d, null, null, extrudeMaterial ) );
 		scope.faces.push( new THREE.Face3( b, c, d, null, null, extrudeMaterial ) );

 		var uvs = uvgen.generateSideWallUV( scope, a, b, c, d );

 		scope.faceVertexUvs[ 0 ].push( [ uvs[ 0 ], uvs[ 1 ], uvs[ 3 ] ] );
 		scope.faceVertexUvs[ 0 ].push( [ uvs[ 1 ], uvs[ 2 ], uvs[ 3 ] ] );

	}

};

THREE.ExtrudeGeometry.WorldUVGenerator = {

	generateTopUV: function ( geometry, indexA, indexB, indexC ) {

		var vertices = geometry.vertices;

		var a = vertices[ indexA ];
		var b = vertices[ indexB ];
		var c = vertices[ indexC ];

		return [
			new THREE.Vector2( a.x, a.y ),
			new THREE.Vector2( b.x, b.y ),
			new THREE.Vector2( c.x, c.y )
		];

	},

	generateSideWallUV: function ( geometry, indexA, indexB, indexC, indexD ) {

		var vertices = geometry.vertices;

		var a = vertices[ indexA ];
		var b = vertices[ indexB ];
		var c = vertices[ indexC ];
		var d = vertices[ indexD ];

		if ( Math.abs( a.y - b.y ) < 0.01 ) {
			return [
				new THREE.Vector2( a.x, 1 - a.z ),
				new THREE.Vector2( b.x, 1 - b.z ),
				new THREE.Vector2( c.x, 1 - c.z ),
				new THREE.Vector2( d.x, 1 - d.z )
			];
		} else {
			return [
				new THREE.Vector2( a.y, 1 - a.z ),
				new THREE.Vector2( b.y, 1 - b.z ),
				new THREE.Vector2( c.y, 1 - c.z ),
				new THREE.Vector2( d.y, 1 - d.z )
			];
		}
	}
};

// File:src/extras/geometries/ShapeGeometry.js

/**
 * @author jonobr1 / http://jonobr1.com
 *
 * Creates a one-sided polygonal geometry from a path shape. Similar to
 * ExtrudeGeometry.
 *
 * parameters = {
 *
 *	curveSegments: <int>, // number of points on the curves. NOT USED AT THE MOMENT.
 *
 *	material: <int> // material index for front and back faces
 *	uvGenerator: <Object> // object that provides UV generator functions
 *
 * }
 **/

THREE.ShapeGeometry = function ( shapes, options ) {

	THREE.Geometry.call( this );

	this.type = 'ShapeGeometry';

	if ( shapes instanceof Array === false ) shapes = [ shapes ];

	this.addShapeList( shapes, options );

	this.computeFaceNormals();

};

THREE.ShapeGeometry.prototype = Object.create( THREE.Geometry.prototype );

/**
 * Add an array of shapes to THREE.ShapeGeometry.
 */
THREE.ShapeGeometry.prototype.addShapeList = function ( shapes, options ) {

	for ( var i = 0, l = shapes.length; i < l; i ++ ) {

		this.addShape( shapes[ i ], options );

	}

	return this;

};

/**
 * Adds a shape to THREE.ShapeGeometry, based on THREE.ExtrudeGeometry.
 */
THREE.ShapeGeometry.prototype.addShape = function ( shape, options ) {

	if ( options === undefined ) options = {};
	var curveSegments = options.curveSegments !== undefined ? options.curveSegments : 12;

	var material = options.material;
	var uvgen = options.UVGenerator === undefined ? THREE.ExtrudeGeometry.WorldUVGenerator : options.UVGenerator;

	//

	var i, l, hole, s;

	var shapesOffset = this.vertices.length;
	var shapePoints = shape.extractPoints( curveSegments );

	var vertices = shapePoints.shape;
	var holes = shapePoints.holes;

	var reverse = ! THREE.Shape.Utils.isClockWise( vertices );

	if ( reverse ) {

		vertices = vertices.reverse();

		// Maybe we should also check if holes are in the opposite direction, just to be safe...

		for ( i = 0, l = holes.length; i < l; i ++ ) {

			hole = holes[ i ];

			if ( THREE.Shape.Utils.isClockWise( hole ) ) {

				holes[ i ] = hole.reverse();

			}

		}

		reverse = false;

	}

	var faces = THREE.Shape.Utils.triangulateShape( vertices, holes );

	// Vertices

	var contour = vertices;

	for ( i = 0, l = holes.length; i < l; i ++ ) {

		hole = holes[ i ];
		vertices = vertices.concat( hole );

	}

	//

	var vert, vlen = vertices.length;
	var face, flen = faces.length;
	var cont, clen = contour.length;

	for ( i = 0; i < vlen; i ++ ) {

		vert = vertices[ i ];

		this.vertices.push( new THREE.Vector3( vert.x, vert.y, 0 ) );

	}

	for ( i = 0; i < flen; i ++ ) {

		face = faces[ i ];

		var a = face[ 0 ] + shapesOffset;
		var b = face[ 1 ] + shapesOffset;
		var c = face[ 2 ] + shapesOffset;

		this.faces.push( new THREE.Face3( a, b, c, null, null, material ) );
		this.faceVertexUvs[ 0 ].push( uvgen.generateTopUV( this, a, b, c ) );

	}

};

// File:src/extras/geometries/LatheGeometry.js

/**
 * @author astrodud / http://astrodud.isgreat.org/
 * @author zz85 / https://github.com/zz85
 * @author bhouston / http://exocortex.com
 */

// points - to create a closed torus, one must use a set of points 
//    like so: [ a, b, c, d, a ], see first is the same as last.
// segments - the number of circumference segments to create
// phiStart - the starting radian
// phiLength - the radian (0 to 2*PI) range of the lathed section
//    2*pi is a closed lathe, less than 2PI is a portion.

THREE.LatheGeometry = function ( points, segments, phiStart, phiLength ) {

	THREE.Geometry.call( this );

	this.type = 'LatheGeometry';

	this.parameters = {
		points: points,
		segments: segments,
		phiStart: phiStart,
		phiLength: phiLength
	};

	segments = segments || 12;
	phiStart = phiStart || 0;
	phiLength = phiLength || 2 * Math.PI;

	var inversePointLength = 1.0 / ( points.length - 1 );
	var inverseSegments = 1.0 / segments;

	for ( var i = 0, il = segments; i <= il; i ++ ) {

		var phi = phiStart + i * inverseSegments * phiLength;

		var c = Math.cos( phi ),
			s = Math.sin( phi );

		for ( var j = 0, jl = points.length; j < jl; j ++ ) {

			var pt = points[ j ];

			var vertex = new THREE.Vector3();

			vertex.x = c * pt.x - s * pt.y;
			vertex.y = s * pt.x + c * pt.y;
			vertex.z = pt.z;

			this.vertices.push( vertex );

		}

	}

	var np = points.length;

	for ( var i = 0, il = segments; i < il; i ++ ) {

		for ( var j = 0, jl = points.length - 1; j < jl; j ++ ) {

			var base = j + np * i;
			var a = base;
			var b = base + np;
			var c = base + 1 + np;
			var d = base + 1;

			var u0 = i * inverseSegments;
			var v0 = j * inversePointLength;
			var u1 = u0 + inverseSegments;
			var v1 = v0 + inversePointLength;

			this.faces.push( new THREE.Face3( a, b, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u0, v0 ),
				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u0, v1 )

			] );

			this.faces.push( new THREE.Face3( b, c, d ) );

			this.faceVertexUvs[ 0 ].push( [

				new THREE.Vector2( u1, v0 ),
				new THREE.Vector2( u1, v1 ),
				new THREE.Vector2( u0, v1 )

			] );


		}

	}

	this.mergeVertices();
	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.LatheGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/PlaneGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

THREE.PlaneGeometry = function ( width, height, widthSegments, heightSegments ) {

	console.info( 'THREE.PlaneGeometry: Consider using THREE.PlaneBufferGeometry for lower memory footprint.' );

	THREE.Geometry.call( this );

	this.type = 'PlaneGeometry';

	this.parameters = {
		width: width,
		height: height,
		widthSegments: widthSegments,
		heightSegments: heightSegments
	};

	this.fromBufferGeometry( new THREE.PlaneBufferGeometry( width, height, widthSegments, heightSegments ) );

};

THREE.PlaneGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/PlaneBufferGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
 */

THREE.PlaneBufferGeometry = function ( width, height, widthSegments, heightSegments ) {

	THREE.BufferGeometry.call( this );

	this.type = 'PlaneBufferGeometry';

	this.parameters = {
		width: width,
		height: height,
		widthSegments: widthSegments,
		heightSegments: heightSegments
	};

	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = widthSegments || 1;
	var gridY = heightSegments || 1;

	var gridX1 = gridX + 1;
	var gridY1 = gridY + 1;

	var segment_width = width / gridX;
	var segment_height = height / gridY;

	var vertices = new Float32Array( gridX1 * gridY1 * 3 );
	var normals = new Float32Array( gridX1 * gridY1 * 3 );
	var uvs = new Float32Array( gridX1 * gridY1 * 2 );

	var offset = 0;
	var offset2 = 0;

	for ( var iy = 0; iy < gridY1; iy ++ ) {

		var y = iy * segment_height - height_half;

		for ( var ix = 0; ix < gridX1; ix ++ ) {

			var x = ix * segment_width - width_half;

			vertices[ offset     ] = x;
			vertices[ offset + 1 ] = - y;

			normals[ offset + 2 ] = 1;

			uvs[ offset2     ] = ix / gridX;
			uvs[ offset2 + 1 ] = 1 - ( iy / gridY );

			offset += 3;
			offset2 += 2;

		}

	}

	offset = 0;

	var indices = new ( ( vertices.length / 3 ) > 65535 ? Uint32Array : Uint16Array )( gridX * gridY * 6 );

	for ( var iy = 0; iy < gridY; iy ++ ) {

		for ( var ix = 0; ix < gridX; ix ++ ) {

			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			indices[ offset     ] = a;
			indices[ offset + 1 ] = b;
			indices[ offset + 2 ] = d;

			indices[ offset + 3 ] = b;
			indices[ offset + 4 ] = c;
			indices[ offset + 5 ] = d;

			offset += 6;

		}

	}

	this.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	this.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
	this.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

};

THREE.PlaneBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );

// File:src/extras/geometries/RingGeometry.js

/**
 * @author Kaleb Murphy
 */

THREE.RingGeometry = function ( innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength ) {

	THREE.Geometry.call( this );

	this.type = 'RingGeometry';

	this.parameters = {
		innerRadius: innerRadius,
		outerRadius: outerRadius,
		thetaSegments: thetaSegments,
		phiSegments: phiSegments,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	innerRadius = innerRadius || 0;
	outerRadius = outerRadius || 50;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	thetaSegments = thetaSegments !== undefined ? Math.max( 3, thetaSegments ) : 8;
	phiSegments = phiSegments !== undefined ? Math.max( 1, phiSegments ) : 8;

	var i, o, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments );

	for ( i = 0; i < phiSegments + 1; i ++ ) { // concentric circles inside ring

		for ( o = 0; o < thetaSegments + 1; o ++ ) { // number of segments per circle

			var vertex = new THREE.Vector3();
			var segment = thetaStart + o / thetaSegments * thetaLength;
			vertex.x = radius * Math.cos( segment );
			vertex.y = radius * Math.sin( segment );

			this.vertices.push( vertex );
			uvs.push( new THREE.Vector2( ( vertex.x / outerRadius + 1 ) / 2, ( vertex.y / outerRadius + 1 ) / 2 ) );
		}

		radius += radiusStep;

	}

	var n = new THREE.Vector3( 0, 0, 1 );

	for ( i = 0; i < phiSegments; i ++ ) { // concentric circles inside ring

		var thetaSegment = i * (thetaSegments + 1);

		for ( o = 0; o < thetaSegments ; o ++ ) { // number of segments per circle

			var segment = o + thetaSegment;

			var v1 = segment;
			var v2 = segment + thetaSegments + 1;
			var v3 = segment + thetaSegments + 2;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

			v1 = segment;
			v2 = segment + thetaSegments + 2;
			v3 = segment + 1;

			this.faces.push( new THREE.Face3( v1, v2, v3, [ n.clone(), n.clone(), n.clone() ] ) );
			this.faceVertexUvs[ 0 ].push( [ uvs[ v1 ].clone(), uvs[ v2 ].clone(), uvs[ v3 ].clone() ]);

		}
	}

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREE.RingGeometry.prototype = Object.create( THREE.Geometry.prototype );


// File:src/extras/geometries/SphereGeometry.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.SphereGeometry = function ( radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength ) {

	THREE.Geometry.call( this );

	this.type = 'SphereGeometry';

	this.parameters = {
		radius: radius,
		widthSegments: widthSegments,
		heightSegments: heightSegments,
		phiStart: phiStart,
		phiLength: phiLength,
		thetaStart: thetaStart,
		thetaLength: thetaLength 
	};

	radius = radius || 50;

	widthSegments = Math.max( 3, Math.floor( widthSegments ) || 8 );
	heightSegments = Math.max( 2, Math.floor( heightSegments ) || 6 );

	phiStart = phiStart !== undefined ? phiStart : 0;
	phiLength = phiLength !== undefined ? phiLength : Math.PI * 2;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI;

	var x, y, vertices = [], uvs = [];

	for ( y = 0; y <= heightSegments; y ++ ) {

		var verticesRow = [];
		var uvsRow = [];

		for ( x = 0; x <= widthSegments; x ++ ) {

			var u = x / widthSegments;
			var v = y / heightSegments;

			var vertex = new THREE.Vector3();
			vertex.x = - radius * Math.cos( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );
			vertex.y = radius * Math.cos( thetaStart + v * thetaLength );
			vertex.z = radius * Math.sin( phiStart + u * phiLength ) * Math.sin( thetaStart + v * thetaLength );

			this.vertices.push( vertex );

			verticesRow.push( this.vertices.length - 1 );
			uvsRow.push( new THREE.Vector2( u, 1 - v ) );

		}

		vertices.push( verticesRow );
		uvs.push( uvsRow );

	}

	for ( y = 0; y < heightSegments; y ++ ) {

		for ( x = 0; x < widthSegments; x ++ ) {

			var v1 = vertices[ y ][ x + 1 ];
			var v2 = vertices[ y ][ x ];
			var v3 = vertices[ y + 1 ][ x ];
			var v4 = vertices[ y + 1 ][ x + 1 ];

			var n1 = this.vertices[ v1 ].clone().normalize();
			var n2 = this.vertices[ v2 ].clone().normalize();
			var n3 = this.vertices[ v3 ].clone().normalize();
			var n4 = this.vertices[ v4 ].clone().normalize();

			var uv1 = uvs[ y ][ x + 1 ].clone();
			var uv2 = uvs[ y ][ x ].clone();
			var uv3 = uvs[ y + 1 ][ x ].clone();
			var uv4 = uvs[ y + 1 ][ x + 1 ].clone();

			if ( Math.abs( this.vertices[ v1 ].y ) === radius ) {

				uv1.x = ( uv1.x + uv2.x ) / 2;
				this.faces.push( new THREE.Face3( v1, v3, v4, [ n1, n3, n4 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv3, uv4 ] );

			} else if ( Math.abs( this.vertices[ v3 ].y ) === radius ) {

				uv3.x = ( uv3.x + uv4.x ) / 2;
				this.faces.push( new THREE.Face3( v1, v2, v3, [ n1, n2, n3 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3 ] );

			} else {

				this.faces.push( new THREE.Face3( v1, v2, v4, [ n1, n2, n4 ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv4 ] );

				this.faces.push( new THREE.Face3( v2, v3, v4, [ n2.clone(), n3, n4.clone() ] ) );
				this.faceVertexUvs[ 0 ].push( [ uv2.clone(), uv3, uv4.clone() ] );

			}

		}

	}

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );

};

THREE.SphereGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/TextGeometry.js

/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author alteredq / http://alteredqualia.com/
 *
 * For creating 3D text geometry in three.js
 *
 * Text = 3D Text
 *
 * parameters = {
 *  size: 			<float>, 	// size of the text
 *  height: 		<float>, 	// thickness to extrude text
 *  curveSegments: 	<int>,		// number of points on the curves
 *
 *  font: 			<string>,		// font name
 *  weight: 		<string>,		// font weight (normal, bold)
 *  style: 			<string>,		// font style  (normal, italics)
 *
 *  bevelEnabled:	<bool>,			// turn on bevel
 *  bevelThickness: <float>, 		// how deep into text bevel goes
 *  bevelSize:		<float>, 		// how far from text outline is bevel
 *  }
 *
 */

/*	Usage Examples

	// TextGeometry wrapper

	var text3d = new TextGeometry( text, options );

	// Complete manner

	var textShapes = THREE.FontUtils.generateShapes( text, options );
	var text3d = new ExtrudeGeometry( textShapes, options );

*/


THREE.TextGeometry = function ( text, parameters ) {

	parameters = parameters || {};

	var textShapes = THREE.FontUtils.generateShapes( text, parameters );

	// translate parameters to ExtrudeGeometry API

	parameters.amount = parameters.height !== undefined ? parameters.height : 50;

	// defaults

	if ( parameters.bevelThickness === undefined ) parameters.bevelThickness = 10;
	if ( parameters.bevelSize === undefined ) parameters.bevelSize = 8;
	if ( parameters.bevelEnabled === undefined ) parameters.bevelEnabled = false;

	THREE.ExtrudeGeometry.call( this, textShapes, parameters );

	this.type = 'TextGeometry';

};

THREE.TextGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );

// File:src/extras/geometries/TorusGeometry.js

/**
 * @author oosmoxiecode
 * @author mrdoob / http://mrdoob.com/
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3DLite/src/away3dlite/primitives/Torus.as?r=2888
 */

THREE.TorusGeometry = function ( radius, tube, radialSegments, tubularSegments, arc ) {

	THREE.Geometry.call( this );

	this.type = 'TorusGeometry';

	this.parameters = {
		radius: radius,
		tube: tube,
		radialSegments: radialSegments,
		tubularSegments: tubularSegments,
		arc: arc
	};

	radius = radius || 100;
	tube = tube || 40;
	radialSegments = radialSegments || 8;
	tubularSegments = tubularSegments || 6;
	arc = arc || Math.PI * 2;

	var center = new THREE.Vector3(), uvs = [], normals = [];

	for ( var j = 0; j <= radialSegments; j ++ ) {

		for ( var i = 0; i <= tubularSegments; i ++ ) {

			var u = i / tubularSegments * arc;
			var v = j / radialSegments * Math.PI * 2;

			center.x = radius * Math.cos( u );
			center.y = radius * Math.sin( u );

			var vertex = new THREE.Vector3();
			vertex.x = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
			vertex.y = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
			vertex.z = tube * Math.sin( v );

			this.vertices.push( vertex );

			uvs.push( new THREE.Vector2( i / tubularSegments, j / radialSegments ) );
			normals.push( vertex.clone().sub( center ).normalize() );

		}

	}

	for ( var j = 1; j <= radialSegments; j ++ ) {

		for ( var i = 1; i <= tubularSegments; i ++ ) {

			var a = ( tubularSegments + 1 ) * j + i - 1;
			var b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
			var c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
			var d = ( tubularSegments + 1 ) * j + i;

			var face = new THREE.Face3( a, b, d, [ normals[ a ].clone(), normals[ b ].clone(), normals[ d ].clone() ] );
			this.faces.push( face );
			this.faceVertexUvs[ 0 ].push( [ uvs[ a ].clone(), uvs[ b ].clone(), uvs[ d ].clone() ] );

			face = new THREE.Face3( b, c, d, [ normals[ b ].clone(), normals[ c ].clone(), normals[ d ].clone() ] );
			this.faces.push( face );
			this.faceVertexUvs[ 0 ].push( [ uvs[ b ].clone(), uvs[ c ].clone(), uvs[ d ].clone() ] );

		}

	}

	this.computeFaceNormals();

};

THREE.TorusGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/TorusKnotGeometry.js

/**
 * @author oosmoxiecode
 * based on http://code.google.com/p/away3d/source/browse/trunk/fp10/Away3D/src/away3d/primitives/TorusKnot.as?spec=svn2473&r=2473
 */

THREE.TorusKnotGeometry = function ( radius, tube, radialSegments, tubularSegments, p, q, heightScale ) {

	THREE.Geometry.call( this );

	this.type = 'TorusKnotGeometry';

	this.parameters = {
		radius: radius,
		tube: tube,
		radialSegments: radialSegments,
		tubularSegments: tubularSegments,
		p: p,
		q: q,
		heightScale: heightScale
	};

	radius = radius || 100;
	tube = tube || 40;
	radialSegments = radialSegments || 64;
	tubularSegments = tubularSegments || 8;
	p = p || 2;
	q = q || 3;
	heightScale = heightScale || 1;
	
	var grid = new Array( radialSegments );
	var tang = new THREE.Vector3();
	var n = new THREE.Vector3();
	var bitan = new THREE.Vector3();

	for ( var i = 0; i < radialSegments; ++ i ) {

		grid[ i ] = new Array( tubularSegments );
		var u = i / radialSegments * 2 * p * Math.PI;
		var p1 = getPos( u, q, p, radius, heightScale );
		var p2 = getPos( u + 0.01, q, p, radius, heightScale );
		tang.subVectors( p2, p1 );
		n.addVectors( p2, p1 );

		bitan.crossVectors( tang, n );
		n.crossVectors( bitan, tang );
		bitan.normalize();
		n.normalize();

		for ( var j = 0; j < tubularSegments; ++ j ) {

			var v = j / tubularSegments * 2 * Math.PI;
			var cx = - tube * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			var cy = tube * Math.sin( v );

			var pos = new THREE.Vector3();
			pos.x = p1.x + cx * n.x + cy * bitan.x;
			pos.y = p1.y + cx * n.y + cy * bitan.y;
			pos.z = p1.z + cx * n.z + cy * bitan.z;

			grid[ i ][ j ] = this.vertices.push( pos ) - 1;

		}

	}

	for ( var i = 0; i < radialSegments; ++ i ) {

		for ( var j = 0; j < tubularSegments; ++ j ) {

			var ip = ( i + 1 ) % radialSegments;
			var jp = ( j + 1 ) % tubularSegments;

			var a = grid[ i ][ j ];
			var b = grid[ ip ][ j ];
			var c = grid[ ip ][ jp ];
			var d = grid[ i ][ jp ];

			var uva = new THREE.Vector2( i / radialSegments, j / tubularSegments );
			var uvb = new THREE.Vector2( ( i + 1 ) / radialSegments, j / tubularSegments );
			var uvc = new THREE.Vector2( ( i + 1 ) / radialSegments, ( j + 1 ) / tubularSegments );
			var uvd = new THREE.Vector2( i / radialSegments, ( j + 1 ) / tubularSegments );

			this.faces.push( new THREE.Face3( a, b, d ) );
			this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

			this.faces.push( new THREE.Face3( b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

		}
	}

	this.computeFaceNormals();
	this.computeVertexNormals();

	function getPos( u, in_q, in_p, radius, heightScale ) {

		var cu = Math.cos( u );
		var su = Math.sin( u );
		var quOverP = in_q / in_p * u;
		var cs = Math.cos( quOverP );

		var tx = radius * ( 2 + cs ) * 0.5 * cu;
		var ty = radius * ( 2 + cs ) * su * 0.5;
		var tz = heightScale * radius * Math.sin( quOverP ) * 0.5;

		return new THREE.Vector3( tx, ty, tz );

	}

};

THREE.TorusKnotGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/TubeGeometry.js

/**
 * @author WestLangley / https://github.com/WestLangley
 * @author zz85 / https://github.com/zz85
 * @author miningold / https://github.com/miningold
 *
 * Modified from the TorusKnotGeometry by @oosmoxiecode
 *
 * Creates a tube which extrudes along a 3d spline
 *
 * Uses parallel transport frames as described in
 * http://www.cs.indiana.edu/pub/techreports/TR425.pdf
 */

THREE.TubeGeometry = function ( path, segments, radius, radialSegments, closed ) {

	THREE.Geometry.call( this );

	this.type = 'TubeGeometry';

	this.parameters = {
		path: path,
		segments: segments,
		radius: radius,
		radialSegments: radialSegments,
		closed: closed
	};

	segments = segments || 64;
	radius = radius || 1;
	radialSegments = radialSegments || 8;
	closed = closed || false;

	var grid = [];

	var scope = this,

		tangent,
		normal,
		binormal,

		numpoints = segments + 1,

		x, y, z,
		tx, ty, tz,
		u, v,

		cx, cy,
		pos, pos2 = new THREE.Vector3(),
		i, j,
		ip, jp,
		a, b, c, d,
		uva, uvb, uvc, uvd;

	var frames = new THREE.TubeGeometry.FrenetFrames( path, segments, closed ),
		tangents = frames.tangents,
		normals = frames.normals,
		binormals = frames.binormals;

	// proxy internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	function vert( x, y, z ) {

		return scope.vertices.push( new THREE.Vector3( x, y, z ) ) - 1;

	}

	// consruct the grid

	for ( i = 0; i < numpoints; i ++ ) {

		grid[ i ] = [];

		u = i / ( numpoints - 1 );

		pos = path.getPointAt( u );

		tangent = tangents[ i ];
		normal = normals[ i ];
		binormal = binormals[ i ];

		for ( j = 0; j < radialSegments; j ++ ) {

			v = j / radialSegments * 2 * Math.PI;

			cx = - radius * Math.cos( v ); // TODO: Hack: Negating it so it faces outside.
			cy = radius * Math.sin( v );

			pos2.copy( pos );
			pos2.x += cx * normal.x + cy * binormal.x;
			pos2.y += cx * normal.y + cy * binormal.y;
			pos2.z += cx * normal.z + cy * binormal.z;

			grid[ i ][ j ] = vert( pos2.x, pos2.y, pos2.z );

		}
	}


	// construct the mesh

	for ( i = 0; i < segments; i ++ ) {

		for ( j = 0; j < radialSegments; j ++ ) {

			ip = ( closed ) ? (i + 1) % segments : i + 1;
			jp = (j + 1) % radialSegments;

			a = grid[ i ][ j ];		// *** NOT NECESSARILY PLANAR ! ***
			b = grid[ ip ][ j ];
			c = grid[ ip ][ jp ];
			d = grid[ i ][ jp ];

			uva = new THREE.Vector2( i / segments, j / radialSegments );
			uvb = new THREE.Vector2( ( i + 1 ) / segments, j / radialSegments );
			uvc = new THREE.Vector2( ( i + 1 ) / segments, ( j + 1 ) / radialSegments );
			uvd = new THREE.Vector2( i / segments, ( j + 1 ) / radialSegments );

			this.faces.push( new THREE.Face3( a, b, d ) );
			this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvd ] );

			this.faces.push( new THREE.Face3( b, c, d ) );
			this.faceVertexUvs[ 0 ].push( [ uvb.clone(), uvc, uvd.clone() ] );

		}
	}

	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.TubeGeometry.prototype = Object.create( THREE.Geometry.prototype );


// For computing of Frenet frames, exposing the tangents, normals and binormals the spline
THREE.TubeGeometry.FrenetFrames = function ( path, segments, closed ) {

	var	tangent = new THREE.Vector3(),
		normal = new THREE.Vector3(),
		binormal = new THREE.Vector3(),

		tangents = [],
		normals = [],
		binormals = [],

		vec = new THREE.Vector3(),
		mat = new THREE.Matrix4(),

		numpoints = segments + 1,
		theta,
		epsilon = 0.0001,
		smallest,

		tx, ty, tz,
		i, u, v;


	// expose internals
	this.tangents = tangents;
	this.normals = normals;
	this.binormals = binormals;

	// compute the tangent vectors for each segment on the path

	for ( i = 0; i < numpoints; i ++ ) {

		u = i / ( numpoints - 1 );

		tangents[ i ] = path.getTangentAt( u );
		tangents[ i ].normalize();

	}

	initialNormal3();

	/*
	function initialNormal1(lastBinormal) {
		// fixed start binormal. Has dangers of 0 vectors
		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		if (lastBinormal===undefined) lastBinormal = new THREE.Vector3( 0, 0, 1 );
		normals[ 0 ].crossVectors( lastBinormal, tangents[ 0 ] ).normalize();
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();
	}

	function initialNormal2() {

		// This uses the Frenet-Serret formula for deriving binormal
		var t2 = path.getTangentAt( epsilon );

		normals[ 0 ] = new THREE.Vector3().subVectors( t2, tangents[ 0 ] ).normalize();
		binormals[ 0 ] = new THREE.Vector3().crossVectors( tangents[ 0 ], normals[ 0 ] );

		normals[ 0 ].crossVectors( binormals[ 0 ], tangents[ 0 ] ).normalize(); // last binormal x tangent
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] ).normalize();

	}
	*/

	function initialNormal3() {
		// select an initial normal vector perpenicular to the first tangent vector,
		// and in the direction of the smallest tangent xyz component

		normals[ 0 ] = new THREE.Vector3();
		binormals[ 0 ] = new THREE.Vector3();
		smallest = Number.MAX_VALUE;
		tx = Math.abs( tangents[ 0 ].x );
		ty = Math.abs( tangents[ 0 ].y );
		tz = Math.abs( tangents[ 0 ].z );

		if ( tx <= smallest ) {
			smallest = tx;
			normal.set( 1, 0, 0 );
		}

		if ( ty <= smallest ) {
			smallest = ty;
			normal.set( 0, 1, 0 );
		}

		if ( tz <= smallest ) {
			normal.set( 0, 0, 1 );
		}

		vec.crossVectors( tangents[ 0 ], normal ).normalize();

		normals[ 0 ].crossVectors( tangents[ 0 ], vec );
		binormals[ 0 ].crossVectors( tangents[ 0 ], normals[ 0 ] );
	}


	// compute the slowly-varying normal and binormal vectors for each segment on the path

	for ( i = 1; i < numpoints; i ++ ) {

		normals[ i ] = normals[ i-1 ].clone();

		binormals[ i ] = binormals[ i-1 ].clone();

		vec.crossVectors( tangents[ i-1 ], tangents[ i ] );

		if ( vec.length() > epsilon ) {

			vec.normalize();

			theta = Math.acos( THREE.Math.clamp( tangents[ i-1 ].dot( tangents[ i ] ), - 1, 1 ) ); // clamp for floating pt errors

			normals[ i ].applyMatrix4( mat.makeRotationAxis( vec, theta ) );

		}

		binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

	}


	// if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

	if ( closed ) {

		theta = Math.acos( THREE.Math.clamp( normals[ 0 ].dot( normals[ numpoints-1 ] ), - 1, 1 ) );
		theta /= ( numpoints - 1 );

		if ( tangents[ 0 ].dot( vec.crossVectors( normals[ 0 ], normals[ numpoints-1 ] ) ) > 0 ) {

			theta = - theta;

		}

		for ( i = 1; i < numpoints; i ++ ) {

			// twist a little...
			normals[ i ].applyMatrix4( mat.makeRotationAxis( tangents[ i ], theta * i ) );
			binormals[ i ].crossVectors( tangents[ i ], normals[ i ] );

		}

	}
};

// File:src/extras/geometries/PolyhedronGeometry.js

/**
 * @author clockworkgeek / https://github.com/clockworkgeek
 * @author timothypratley / https://github.com/timothypratley
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.PolyhedronGeometry = function ( vertices, indices, radius, detail ) {

	THREE.Geometry.call( this );

	this.type = 'PolyhedronGeometry';

	this.parameters = {
		vertices: vertices,
		indices: indices,
		radius: radius,
		detail: detail
	};

	radius = radius || 1;
	detail = detail || 0;

	var that = this;

	for ( var i = 0, l = vertices.length; i < l; i += 3 ) {

		prepare( new THREE.Vector3( vertices[ i ], vertices[ i + 1 ], vertices[ i + 2 ] ) );

	}

	var midpoints = [], p = this.vertices;

	var faces = [];

	for ( var i = 0, j = 0, l = indices.length; i < l; i += 3, j ++ ) {

		var v1 = p[ indices[ i     ] ];
		var v2 = p[ indices[ i + 1 ] ];
		var v3 = p[ indices[ i + 2 ] ];

		faces[ j ] = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );

	}

	var centroid = new THREE.Vector3();

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		subdivide( faces[ i ], detail );

	}


	// Handle case when face straddles the seam

	for ( var i = 0, l = this.faceVertexUvs[ 0 ].length; i < l; i ++ ) {

		var uvs = this.faceVertexUvs[ 0 ][ i ];

		var x0 = uvs[ 0 ].x;
		var x1 = uvs[ 1 ].x;
		var x2 = uvs[ 2 ].x;

		var max = Math.max( x0, Math.max( x1, x2 ) );
		var min = Math.min( x0, Math.min( x1, x2 ) );

		if ( max > 0.9 && min < 0.1 ) { // 0.9 is somewhat arbitrary

			if ( x0 < 0.2 ) uvs[ 0 ].x += 1;
			if ( x1 < 0.2 ) uvs[ 1 ].x += 1;
			if ( x2 < 0.2 ) uvs[ 2 ].x += 1;

		}

	}


	// Apply radius

	for ( var i = 0, l = this.vertices.length; i < l; i ++ ) {

		this.vertices[ i ].multiplyScalar( radius );

	}


	// Merge vertices

	this.mergeVertices();

	this.computeFaceNormals();

	this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), radius );


	// Project vector onto sphere's surface

	function prepare( vector ) {

		var vertex = vector.normalize().clone();
		vertex.index = that.vertices.push( vertex ) - 1;

		// Texture coords are equivalent to map coords, calculate angle and convert to fraction of a circle.

		var u = azimuth( vector ) / 2 / Math.PI + 0.5;
		var v = inclination( vector ) / Math.PI + 0.5;
		vertex.uv = new THREE.Vector2( u, 1 - v );

		return vertex;

	}


	// Approximate a curved face with recursively sub-divided triangles.

	function make( v1, v2, v3 ) {

		var face = new THREE.Face3( v1.index, v2.index, v3.index, [ v1.clone(), v2.clone(), v3.clone() ] );
		that.faces.push( face );

		centroid.copy( v1 ).add( v2 ).add( v3 ).divideScalar( 3 );

		var azi = azimuth( centroid );

		that.faceVertexUvs[ 0 ].push( [
			correctUV( v1.uv, v1, azi ),
			correctUV( v2.uv, v2, azi ),
			correctUV( v3.uv, v3, azi )
		] );

	}


	// Analytically subdivide a face to the required detail level.

	function subdivide( face, detail ) {

		var cols = Math.pow(2, detail);
		var cells = Math.pow(4, detail);
		var a = prepare( that.vertices[ face.a ] );
		var b = prepare( that.vertices[ face.b ] );
		var c = prepare( that.vertices[ face.c ] );
		var v = [];

		// Construct all of the vertices for this subdivision.

		for ( var i = 0 ; i <= cols; i ++ ) {

			v[ i ] = [];

			var aj = prepare( a.clone().lerp( c, i / cols ) );
			var bj = prepare( b.clone().lerp( c, i / cols ) );
			var rows = cols - i;

			for ( var j = 0; j <= rows; j ++) {

				if ( j == 0 && i == cols ) {

					v[ i ][ j ] = aj;

				} else {

					v[ i ][ j ] = prepare( aj.clone().lerp( bj, j / rows ) );

				}

			}

		}

		// Construct all of the faces.

		for ( var i = 0; i < cols ; i ++ ) {

			for ( var j = 0; j < 2 * (cols - i) - 1; j ++ ) {

				var k = Math.floor( j / 2 );

				if ( j % 2 == 0 ) {

					make(
						v[ i ][ k + 1],
						v[ i + 1 ][ k ],
						v[ i ][ k ]
					);

				} else {

					make(
						v[ i ][ k + 1 ],
						v[ i + 1][ k + 1],
						v[ i + 1 ][ k ]
					);

				}

			}

		}

	}


	// Angle around the Y axis, counter-clockwise when looking from above.

	function azimuth( vector ) {

		return Math.atan2( vector.z, - vector.x );

	}


	// Angle above the XZ plane.

	function inclination( vector ) {

		return Math.atan2( - vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );

	}


	// Texture fixing helper. Spheres have some odd behaviours.

	function correctUV( uv, vector, azimuth ) {

		if ( ( azimuth < 0 ) && ( uv.x === 1 ) ) uv = new THREE.Vector2( uv.x - 1, uv.y );
		if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) uv = new THREE.Vector2( azimuth / 2 / Math.PI + 0.5, uv.y );
		return uv.clone();

	}


};

THREE.PolyhedronGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/DodecahedronGeometry.js

/**
 * @author Abe Pazos / https://hamoid.com
 */

THREE.DodecahedronGeometry = function ( radius, detail ) {

	this.parameters = {
		radius: radius,
		detail: detail
	};

	var t = ( 1 + Math.sqrt( 5 ) ) / 2;
	var r = 1 / t;

	var vertices = [

		// (±1, ±1, ±1)
		-1, -1, -1,    -1, -1,  1,
		-1,  1, -1,    -1,  1,  1,
		 1, -1, -1,     1, -1,  1,
		 1,  1, -1,     1,  1,  1,

		// (0, ±1/φ, ±φ)
		 0, -r, -t,     0, -r,  t,
		 0,  r, -t,     0,  r,  t,

		// (±1/φ, ±φ, 0)
		-r, -t,  0,    -r,  t,  0,
		 r, -t,  0,     r,  t,  0,

		// (±φ, 0, ±1/φ)
		-t,  0, -r,     t,  0, -r,
		-t,  0,  r,     t,  0,  r
	];

	var indices = [
		 3, 11,  7,      3,  7, 15,      3, 15, 13,
		 7, 19, 17,      7, 17,  6,      7,  6, 15,
		17,  4,  8,     17,  8, 10,     17, 10,  6,
		 8,  0, 16,      8, 16,  2,      8,  2, 10,
		 0, 12,  1,      0,  1, 18,      0, 18, 16,
		 6, 10,  2,      6,  2, 13,      6, 13, 15,
		 2, 16, 18,      2, 18,  3,      2,  3, 13,
		18,  1,  9,     18,  9, 11,     18, 11,  3,
		 4, 14, 12,      4, 12,  0,      4,  0,  8,
		11,  9,  5,     11,  5, 19,     11, 19,  7,
		19,  5, 14,     19, 14,  4,     19,  4, 17,
		 1, 12, 14,      1, 14,  5,      1,  5,  9
	];

	THREE.PolyhedronGeometry.call( this, vertices, indices, radius, detail );

};

THREE.DodecahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/IcosahedronGeometry.js

/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.IcosahedronGeometry = function ( radius, detail ) {

	var t = ( 1 + Math.sqrt( 5 ) ) / 2;

	var vertices = [
		- 1,  t,  0,    1,  t,  0,   - 1, - t,  0,    1, - t,  0,
		 0, - 1,  t,    0,  1,  t,    0, - 1, - t,    0,  1, - t,
		 t,  0, - 1,    t,  0,  1,   - t,  0, - 1,   - t,  0,  1
	];

	var indices = [
		 0, 11,  5,    0,  5,  1,    0,  1,  7,    0,  7, 10,    0, 10, 11,
		 1,  5,  9,    5, 11,  4,   11, 10,  2,   10,  7,  6,    7,  1,  8,
		 3,  9,  4,    3,  4,  2,    3,  2,  6,    3,  6,  8,    3,  8,  9,
		 4,  9,  5,    2,  4, 11,    6,  2, 10,    8,  6,  7,    9,  8,  1
	];

	THREE.PolyhedronGeometry.call( this, vertices, indices, radius, detail );

	this.type = 'IcosahedronGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};
};

THREE.IcosahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/OctahedronGeometry.js

/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.OctahedronGeometry = function ( radius, detail ) {

	this.parameters = {
		radius: radius,
		detail: detail
	};

	var vertices = [
		1, 0, 0,   - 1, 0, 0,    0, 1, 0,    0,- 1, 0,    0, 0, 1,    0, 0,- 1
	];

	var indices = [
		0, 2, 4,    0, 4, 3,    0, 3, 5,    0, 5, 2,    1, 2, 5,    1, 5, 3,    1, 3, 4,    1, 4, 2
	];

	THREE.PolyhedronGeometry.call( this, vertices, indices, radius, detail );

	this.type = 'OctahedronGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};
};

THREE.OctahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/TetrahedronGeometry.js

/**
 * @author timothypratley / https://github.com/timothypratley
 */

THREE.TetrahedronGeometry = function ( radius, detail ) {

	var vertices = [
		 1,  1,  1,   - 1, - 1,  1,   - 1,  1, - 1,    1, - 1, - 1
	];

	var indices = [
		 2,  1,  0,    0,  3,  2,    1,  3,  0,    2,  3,  1
	];

	THREE.PolyhedronGeometry.call( this, vertices, indices, radius, detail );

	this.type = 'TetrahedronGeometry';

	this.parameters = {
		radius: radius,
		detail: detail
	};

};

THREE.TetrahedronGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/geometries/ParametricGeometry.js

/**
 * @author zz85 / https://github.com/zz85
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
 *
 * new THREE.ParametricGeometry( parametricFunction, uSegments, ySegements );
 *
 */

THREE.ParametricGeometry = function ( func, slices, stacks ) {

	THREE.Geometry.call( this );

	this.type = 'ParametricGeometry';

	this.parameters = {
		func: func,
		slices: slices,
		stacks: stacks
	};

	var verts = this.vertices;
	var faces = this.faces;
	var uvs = this.faceVertexUvs[ 0 ];

	var i, il, j, p;
	var u, v;

	var stackCount = stacks + 1;
	var sliceCount = slices + 1;

	for ( i = 0; i <= stacks; i ++ ) {

		v = i / stacks;

		for ( j = 0; j <= slices; j ++ ) {

			u = j / slices;

			p = func( u, v );
			verts.push( p );

		}
	}

	var a, b, c, d;
	var uva, uvb, uvc, uvd;

	for ( i = 0; i < stacks; i ++ ) {

		for ( j = 0; j < slices; j ++ ) {

			a = i * sliceCount + j;
			b = i * sliceCount + j + 1;
			c = (i + 1) * sliceCount + j + 1;
			d = (i + 1) * sliceCount + j;

			uva = new THREE.Vector2( j / slices, i / stacks );
			uvb = new THREE.Vector2( ( j + 1 ) / slices, i / stacks );
			uvc = new THREE.Vector2( ( j + 1 ) / slices, ( i + 1 ) / stacks );
			uvd = new THREE.Vector2( j / slices, ( i + 1 ) / stacks );

			faces.push( new THREE.Face3( a, b, d ) );
			uvs.push( [ uva, uvb, uvd ] );

			faces.push( new THREE.Face3( b, c, d ) );
			uvs.push( [ uvb.clone(), uvc, uvd.clone() ] );

		}

	}

	// console.log(this);

	// magic bullet
	// var diff = this.mergeVertices();
	// console.log('removed ', diff, ' vertices by merging');

	this.computeFaceNormals();
	this.computeVertexNormals();

};

THREE.ParametricGeometry.prototype = Object.create( THREE.Geometry.prototype );

// File:src/extras/helpers/AxisHelper.js

/**
 * @author sroucheray / http://sroucheray.org/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.AxisHelper = function ( size ) {

	size = size || 1;

	var vertices = new Float32Array( [
		0, 0, 0,  size, 0, 0,
		0, 0, 0,  0, size, 0,
		0, 0, 0,  0, 0, size
	] );

	var colors = new Float32Array( [
		1, 0, 0,  1, 0.6, 0,
		0, 1, 0,  0.6, 1, 0,
		0, 0, 1,  0, 0.6, 1
	] );

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

};

THREE.AxisHelper.prototype = Object.create( THREE.Line.prototype );

// File:src/extras/helpers/ArrowHelper.js

/**
 * @author WestLangley / http://github.com/WestLangley
 * @author zz85 / http://github.com/zz85
 * @author bhouston / http://exocortex.com
 *
 * Creates an arrow for visualizing directions
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 */

THREE.ArrowHelper = ( function () {

	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 1, 0 ) );

	var coneGeometry = new THREE.CylinderGeometry( 0, 0.5, 1, 5, 1 );
	coneGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, - 0.5, 0 ) );

	return function ( dir, origin, length, color, headLength, headWidth ) {

		// dir is assumed to be normalized

		THREE.Object3D.call( this );

		if ( color === undefined ) color = 0xffff00;
		if ( length === undefined ) length = 1;
		if ( headLength === undefined ) headLength = 0.2 * length;
		if ( headWidth === undefined ) headWidth = 0.2 * headLength;

		this.position.copy( origin );

		this.line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: color } ) );
		this.line.matrixAutoUpdate = false;
		this.add( this.line );

		this.cone = new THREE.Mesh( coneGeometry, new THREE.MeshBasicMaterial( { color: color } ) );
		this.cone.matrixAutoUpdate = false;
		this.add( this.cone );

		this.setDirection( dir );
		this.setLength( length, headLength, headWidth );

	}

}() );

THREE.ArrowHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.ArrowHelper.prototype.setDirection = ( function () {

	var axis = new THREE.Vector3();
	var radians;

	return function ( dir ) {

		// dir is assumed to be normalized

		if ( dir.y > 0.99999 ) {

			this.quaternion.set( 0, 0, 0, 1 );

		} else if ( dir.y < - 0.99999 ) {

			this.quaternion.set( 1, 0, 0, 0 );

		} else {

			axis.set( dir.z, 0, - dir.x ).normalize();

			radians = Math.acos( dir.y );

			this.quaternion.setFromAxisAngle( axis, radians );

		}

	};

}() );

THREE.ArrowHelper.prototype.setLength = function ( length, headLength, headWidth ) {

	if ( headLength === undefined ) headLength = 0.2 * length;
	if ( headWidth === undefined ) headWidth = 0.2 * headLength;

	this.line.scale.set( 1, length, 1 );
	this.line.updateMatrix();

	this.cone.scale.set( headWidth, headLength, headWidth );
	this.cone.position.y = length;
	this.cone.updateMatrix();

};

THREE.ArrowHelper.prototype.setColor = function ( color ) {

	this.line.material.color.set( color );
	this.cone.material.color.set( color );

};

// File:src/extras/helpers/BoxHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.BoxHelper = function ( object ) {

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( 72 ), 3 ) );

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: 0xffff00 } ), THREE.LinePieces );

	if ( object !== undefined ) {

		this.update( object );

	}

};

THREE.BoxHelper.prototype = Object.create( THREE.Line.prototype );

THREE.BoxHelper.prototype.update = function ( object ) {

	var geometry = object.geometry;

	if ( geometry.boundingBox === null ) {

		geometry.computeBoundingBox();

	}

	var min = geometry.boundingBox.min;
	var max = geometry.boundingBox.max;

	/*
	  5____4
	1/___0/|
	| 6__|_7
	2/___3/

	0: max.x, max.y, max.z
	1: min.x, max.y, max.z
	2: min.x, min.y, max.z
	3: max.x, min.y, max.z
	4: max.x, max.y, min.z
	5: min.x, max.y, min.z
	6: min.x, min.y, min.z
	7: max.x, min.y, min.z
	*/

	var vertices = this.geometry.attributes.position.array;

	vertices[  0 ] = max.x; vertices[  1 ] = max.y; vertices[  2 ] = max.z;
	vertices[  3 ] = min.x; vertices[  4 ] = max.y; vertices[  5 ] = max.z;

	vertices[  6 ] = min.x; vertices[  7 ] = max.y; vertices[  8 ] = max.z;
	vertices[  9 ] = min.x; vertices[ 10 ] = min.y; vertices[ 11 ] = max.z;

	vertices[ 12 ] = min.x; vertices[ 13 ] = min.y; vertices[ 14 ] = max.z;
	vertices[ 15 ] = max.x; vertices[ 16 ] = min.y; vertices[ 17 ] = max.z;

	vertices[ 18 ] = max.x; vertices[ 19 ] = min.y; vertices[ 20 ] = max.z;
	vertices[ 21 ] = max.x; vertices[ 22 ] = max.y; vertices[ 23 ] = max.z;

	//

	vertices[ 24 ] = max.x; vertices[ 25 ] = max.y; vertices[ 26 ] = min.z;
	vertices[ 27 ] = min.x; vertices[ 28 ] = max.y; vertices[ 29 ] = min.z;

	vertices[ 30 ] = min.x; vertices[ 31 ] = max.y; vertices[ 32 ] = min.z;
	vertices[ 33 ] = min.x; vertices[ 34 ] = min.y; vertices[ 35 ] = min.z;

	vertices[ 36 ] = min.x; vertices[ 37 ] = min.y; vertices[ 38 ] = min.z;
	vertices[ 39 ] = max.x; vertices[ 40 ] = min.y; vertices[ 41 ] = min.z;

	vertices[ 42 ] = max.x; vertices[ 43 ] = min.y; vertices[ 44 ] = min.z;
	vertices[ 45 ] = max.x; vertices[ 46 ] = max.y; vertices[ 47 ] = min.z;

	//

	vertices[ 48 ] = max.x; vertices[ 49 ] = max.y; vertices[ 50 ] = max.z;
	vertices[ 51 ] = max.x; vertices[ 52 ] = max.y; vertices[ 53 ] = min.z;

	vertices[ 54 ] = min.x; vertices[ 55 ] = max.y; vertices[ 56 ] = max.z;
	vertices[ 57 ] = min.x; vertices[ 58 ] = max.y; vertices[ 59 ] = min.z;

	vertices[ 60 ] = min.x; vertices[ 61 ] = min.y; vertices[ 62 ] = max.z;
	vertices[ 63 ] = min.x; vertices[ 64 ] = min.y; vertices[ 65 ] = min.z;

	vertices[ 66 ] = max.x; vertices[ 67 ] = min.y; vertices[ 68 ] = max.z;
	vertices[ 69 ] = max.x; vertices[ 70 ] = min.y; vertices[ 71 ] = min.z;

	this.geometry.attributes.position.needsUpdate = true;

	this.geometry.computeBoundingSphere();

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

};

// File:src/extras/helpers/BoundingBoxHelper.js

/**
 * @author WestLangley / http://github.com/WestLangley
 */

// a helper to show the world-axis-aligned bounding box for an object

THREE.BoundingBoxHelper = function ( object, hex ) {

	var color = ( hex !== undefined ) ? hex : 0x888888;

	this.object = object;

	this.box = new THREE.Box3();

	THREE.Mesh.call( this, new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: color, wireframe: true } ) );

};

THREE.BoundingBoxHelper.prototype = Object.create( THREE.Mesh.prototype );

THREE.BoundingBoxHelper.prototype.update = function () {

	this.box.setFromObject( this.object );

	this.box.size( this.scale );

	this.box.center( this.position );

};

// File:src/extras/helpers/CameraHelper.js

/**
 * @author alteredq / http://alteredqualia.com/
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */

THREE.CameraHelper = function ( camera ) {

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );

	var pointMap = {};

	// colors

	var hexFrustum = 0xffaa00;
	var hexCone = 0xff0000;
	var hexUp = 0x00aaff;
	var hexTarget = 0xffffff;
	var hexCross = 0x333333;

	// near

	addLine( "n1", "n2", hexFrustum );
	addLine( "n2", "n4", hexFrustum );
	addLine( "n4", "n3", hexFrustum );
	addLine( "n3", "n1", hexFrustum );

	// far

	addLine( "f1", "f2", hexFrustum );
	addLine( "f2", "f4", hexFrustum );
	addLine( "f4", "f3", hexFrustum );
	addLine( "f3", "f1", hexFrustum );

	// sides

	addLine( "n1", "f1", hexFrustum );
	addLine( "n2", "f2", hexFrustum );
	addLine( "n3", "f3", hexFrustum );
	addLine( "n4", "f4", hexFrustum );

	// cone

	addLine( "p", "n1", hexCone );
	addLine( "p", "n2", hexCone );
	addLine( "p", "n3", hexCone );
	addLine( "p", "n4", hexCone );

	// up

	addLine( "u1", "u2", hexUp );
	addLine( "u2", "u3", hexUp );
	addLine( "u3", "u1", hexUp );

	// target

	addLine( "c", "t", hexTarget );
	addLine( "p", "c", hexCross );

	// cross

	addLine( "cn1", "cn2", hexCross );
	addLine( "cn3", "cn4", hexCross );

	addLine( "cf1", "cf2", hexCross );
	addLine( "cf3", "cf4", hexCross );

	function addLine( a, b, hex ) {

		addPoint( a, hex );
		addPoint( b, hex );

	}

	function addPoint( id, hex ) {

		geometry.vertices.push( new THREE.Vector3() );
		geometry.colors.push( new THREE.Color( hex ) );

		if ( pointMap[ id ] === undefined ) {

			pointMap[ id ] = [];

		}

		pointMap[ id ].push( geometry.vertices.length - 1 );

	}

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

	this.camera = camera;
	this.matrix = camera.matrixWorld;
	this.matrixAutoUpdate = false;

	this.pointMap = pointMap;

	this.update();

};

THREE.CameraHelper.prototype = Object.create( THREE.Line.prototype );

THREE.CameraHelper.prototype.update = function () {

	var geometry, pointMap;
	
	var vector = new THREE.Vector3();
	var camera = new THREE.Camera();

	var setPoint = function ( point, x, y, z ) {

		vector.set( x, y, z ).unproject( camera );

		var points = pointMap[ point ];

		if ( points !== undefined ) {

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				geometry.vertices[ points[ i ] ].copy( vector );

			}

		}

	};

	return function () {

		geometry = this.geometry;
		pointMap = this.pointMap;

		var w = 1, h = 1;

		// we need just camera projection matrix
		// world matrix must be identity

		camera.projectionMatrix.copy( this.camera.projectionMatrix );

		// center / target

		setPoint( "c", 0, 0, - 1 );
		setPoint( "t", 0, 0,  1 );

		// near

		setPoint( "n1", - w, - h, - 1 );
		setPoint( "n2",   w, - h, - 1 );
		setPoint( "n3", - w,   h, - 1 );
		setPoint( "n4",   w,   h, - 1 );

		// far

		setPoint( "f1", - w, - h, 1 );
		setPoint( "f2",   w, - h, 1 );
		setPoint( "f3", - w,   h, 1 );
		setPoint( "f4",   w,   h, 1 );

		// up

		setPoint( "u1",   w * 0.7, h * 1.1, - 1 );
		setPoint( "u2", - w * 0.7, h * 1.1, - 1 );
		setPoint( "u3",         0, h * 2,   - 1 );

		// cross

		setPoint( "cf1", - w,   0, 1 );
		setPoint( "cf2",   w,   0, 1 );
		setPoint( "cf3",   0, - h, 1 );
		setPoint( "cf4",   0,   h, 1 );

		setPoint( "cn1", - w,   0, - 1 );
		setPoint( "cn2",   w,   0, - 1 );
		setPoint( "cn3",   0, - h, - 1 );
		setPoint( "cn4",   0,   h, - 1 );

		geometry.verticesNeedUpdate = true;

	};

}();

// File:src/extras/helpers/DirectionalLightHelper.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.DirectionalLightHelper = function ( light, size ) {

	THREE.Object3D.call( this );

	this.light = light;
	this.light.updateMatrixWorld();

	this.matrix = light.matrixWorld;
	this.matrixAutoUpdate = false;

	size = size || 1;

	var geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3( - size,   size, 0 ),
		new THREE.Vector3(   size,   size, 0 ),
		new THREE.Vector3(   size, - size, 0 ),
		new THREE.Vector3( - size, - size, 0 ),
		new THREE.Vector3( - size,   size, 0 )
	);

	var material = new THREE.LineBasicMaterial( { fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	this.lightPlane = new THREE.Line( geometry, material );
	this.add( this.lightPlane );

	geometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(),
		new THREE.Vector3()
	);

	material = new THREE.LineBasicMaterial( { fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	this.targetLine = new THREE.Line( geometry, material );
	this.add( this.targetLine );

	this.update();

};

THREE.DirectionalLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.DirectionalLightHelper.prototype.dispose = function () {

	this.lightPlane.geometry.dispose();
	this.lightPlane.material.dispose();
	this.targetLine.geometry.dispose();
	this.targetLine.material.dispose();
};

THREE.DirectionalLightHelper.prototype.update = function () {

	var v1 = new THREE.Vector3();
	var v2 = new THREE.Vector3();
	var v3 = new THREE.Vector3();

	return function () {

		v1.setFromMatrixPosition( this.light.matrixWorld );
		v2.setFromMatrixPosition( this.light.target.matrixWorld );
		v3.subVectors( v2, v1 );

		this.lightPlane.lookAt( v3 );
		this.lightPlane.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

		this.targetLine.geometry.vertices[ 1 ].copy( v3 );
		this.targetLine.geometry.verticesNeedUpdate = true;
		this.targetLine.material.color.copy( this.lightPlane.material.color );

	};

}();

// File:src/extras/helpers/EdgesHelper.js

/**
 * @author WestLangley / http://github.com/WestLangley
 */

THREE.EdgesHelper = function ( object, hex ) {

	var color = ( hex !== undefined ) ? hex : 0xffffff;

	var edge = [ 0, 0 ], hash = {};
	var sortFunction = function ( a, b ) { return a - b };

	var keys = [ 'a', 'b', 'c' ];
	var geometry = new THREE.BufferGeometry();

	var geometry2 = object.geometry.clone();

	geometry2.mergeVertices();
	geometry2.computeFaceNormals();

	var vertices = geometry2.vertices;
	var faces = geometry2.faces;
	var numEdges = 0;

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		var face = faces[ i ];

		for ( var j = 0; j < 3; j ++ ) {

			edge[ 0 ] = face[ keys[ j ] ];
			edge[ 1 ] = face[ keys[ ( j + 1 ) % 3 ] ];
			edge.sort( sortFunction );

			var key = edge.toString();

			if ( hash[ key ] === undefined ) {

				hash[ key ] = { vert1: edge[ 0 ], vert2: edge[ 1 ], face1: i, face2: undefined };
				numEdges ++;

			} else {

				hash[ key ].face2 = i;

			}

		}

	}

	var coords = new Float32Array( numEdges * 2 * 3 );

	var index = 0;

	for ( var key in hash ) {

		var h = hash[ key ];

		if ( h.face2 === undefined || faces[ h.face1 ].normal.dot( faces[ h.face2 ].normal ) < 0.9999 ) { // hardwired const OK

			var vertex = vertices[ h.vert1 ];
			coords[ index ++ ] = vertex.x;
			coords[ index ++ ] = vertex.y;
			coords[ index ++ ] = vertex.z;

			vertex = vertices[ h.vert2 ];
			coords[ index ++ ] = vertex.x;
			coords[ index ++ ] = vertex.y;
			coords[ index ++ ] = vertex.z;

		}

	}

	geometry.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: color } ), THREE.LinePieces );

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

};

THREE.EdgesHelper.prototype = Object.create( THREE.Line.prototype );

// File:src/extras/helpers/FaceNormalsHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.FaceNormalsHelper = function ( object, size, hex, linewidth ) {

	this.object = object;

	this.size = ( size !== undefined ) ? size : 1;

	var color = ( hex !== undefined ) ? hex : 0xffff00;

	var width = ( linewidth !== undefined ) ? linewidth : 1;

	var geometry = new THREE.Geometry();

	var faces = this.object.geometry.faces;

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		geometry.vertices.push( new THREE.Vector3(), new THREE.Vector3() );

	}

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: color, linewidth: width } ), THREE.LinePieces );

	this.matrixAutoUpdate = false;

	this.normalMatrix = new THREE.Matrix3();

	this.update();

};

THREE.FaceNormalsHelper.prototype = Object.create( THREE.Line.prototype );

THREE.FaceNormalsHelper.prototype.update = function () {

	var vertices = this.geometry.vertices;

	var object = this.object;
	var objectVertices = object.geometry.vertices;
	var objectFaces = object.geometry.faces;
	var objectWorldMatrix = object.matrixWorld;

	object.updateMatrixWorld( true );

	this.normalMatrix.getNormalMatrix( objectWorldMatrix );

	for ( var i = 0, i2 = 0, l = objectFaces.length; i < l; i ++, i2 += 2 ) {

		var face = objectFaces[ i ];

		vertices[ i2 ].copy( objectVertices[ face.a ] )
			.add( objectVertices[ face.b ] )
			.add( objectVertices[ face.c ] )
			.divideScalar( 3 )
			.applyMatrix4( objectWorldMatrix );

		vertices[ i2 + 1 ].copy( face.normal )
			.applyMatrix3( this.normalMatrix )
			.normalize()
			.multiplyScalar( this.size )
			.add( vertices[ i2 ] );

	}

	this.geometry.verticesNeedUpdate = true;

	return this;

};


// File:src/extras/helpers/GridHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.GridHelper = function ( size, step ) {

	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	this.color1 = new THREE.Color( 0x444444 );
	this.color2 = new THREE.Color( 0x888888 );

	for ( var i = - size; i <= size; i += step ) {

		geometry.vertices.push(
			new THREE.Vector3( - size, 0, i ), new THREE.Vector3( size, 0, i ),
			new THREE.Vector3( i, 0, - size ), new THREE.Vector3( i, 0, size )
		);

		var color = i === 0 ? this.color1 : this.color2;

		geometry.colors.push( color, color, color, color );

	}

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

};

THREE.GridHelper.prototype = Object.create( THREE.Line.prototype );

THREE.GridHelper.prototype.setColors = function( colorCenterLine, colorGrid ) {

	this.color1.set( colorCenterLine );
	this.color2.set( colorGrid );

	this.geometry.colorsNeedUpdate = true;

}

// File:src/extras/helpers/HemisphereLightHelper.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.HemisphereLightHelper = function ( light, sphereSize, arrowLength, domeSize ) {

	THREE.Object3D.call( this );

	this.light = light;
	this.light.updateMatrixWorld();

	this.matrix = light.matrixWorld;
	this.matrixAutoUpdate = false;

	this.colors = [ new THREE.Color(), new THREE.Color() ];

	var geometry = new THREE.SphereGeometry( sphereSize, 4, 2 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	for ( var i = 0, il = 8; i < il; i ++ ) {

		geometry.faces[ i ].color = this.colors[ i < 4 ? 0 : 1 ];

	}

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, wireframe: true } );

	this.lightSphere = new THREE.Mesh( geometry, material );
	this.add( this.lightSphere );

	this.update();

};

THREE.HemisphereLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.HemisphereLightHelper.prototype.dispose = function () {
	this.lightSphere.geometry.dispose();
	this.lightSphere.material.dispose();
};

THREE.HemisphereLightHelper.prototype.update = function () {

	var vector = new THREE.Vector3();

	return function () {

		this.colors[ 0 ].copy( this.light.color ).multiplyScalar( this.light.intensity );
		this.colors[ 1 ].copy( this.light.groundColor ).multiplyScalar( this.light.intensity );

		this.lightSphere.lookAt( vector.setFromMatrixPosition( this.light.matrixWorld ).negate() );
		this.lightSphere.geometry.colorsNeedUpdate = true;

	}

}();

// File:src/extras/helpers/PointLightHelper.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointLightHelper = function ( light, sphereSize ) {

	this.light = light;
	this.light.updateMatrixWorld();

	var geometry = new THREE.SphereGeometry( sphereSize, 4, 2 );
	var material = new THREE.MeshBasicMaterial( { wireframe: true, fog: false } );
	material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	THREE.Mesh.call( this, geometry, material );

	this.matrix = this.light.matrixWorld;
	this.matrixAutoUpdate = false;

	/*
	var distanceGeometry = new THREE.IcosahedronGeometry( 1, 2 );
	var distanceMaterial = new THREE.MeshBasicMaterial( { color: hexColor, fog: false, wireframe: true, opacity: 0.1, transparent: true } );

	this.lightSphere = new THREE.Mesh( bulbGeometry, bulbMaterial );
	this.lightDistance = new THREE.Mesh( distanceGeometry, distanceMaterial );

	var d = light.distance;

	if ( d === 0.0 ) {

		this.lightDistance.visible = false;

	} else {

		this.lightDistance.scale.set( d, d, d );

	}

	this.add( this.lightDistance );
	*/

};

THREE.PointLightHelper.prototype = Object.create( THREE.Mesh.prototype );

THREE.PointLightHelper.prototype.dispose = function () {

	this.geometry.dispose();
	this.material.dispose();
};

THREE.PointLightHelper.prototype.update = function () {

	this.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	/*
	var d = this.light.distance;

	if ( d === 0.0 ) {

		this.lightDistance.visible = false;

	} else {

		this.lightDistance.visible = true;
		this.lightDistance.scale.set( d, d, d );

	}
	*/

};

// File:src/extras/helpers/SkeletonHelper.js

/**
 * @author Sean Griffin / http://twitter.com/sgrif
 * @author Michael Guerrero / http://realitymeltdown.com
 * @author mrdoob / http://mrdoob.com/
 * @author ikerr / http://verold.com
 */

THREE.SkeletonHelper = function ( object ) {

	this.bones = this.getBoneList( object );

	var geometry = new THREE.Geometry();

	for ( var i = 0; i < this.bones.length; i ++ ) {

		var bone = this.bones[ i ];

		if ( bone.parent instanceof THREE.Bone ) {

			geometry.vertices.push( new THREE.Vector3() );
			geometry.vertices.push( new THREE.Vector3() );
			geometry.colors.push( new THREE.Color( 0, 0, 1 ) );
			geometry.colors.push( new THREE.Color( 0, 1, 0 ) );

		}

	}

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, depthTest: false, depthWrite: false, transparent: true } );

	THREE.Line.call( this, geometry, material, THREE.LinePieces );

	this.root = object;

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

	this.update();

};


THREE.SkeletonHelper.prototype = Object.create( THREE.Line.prototype );

THREE.SkeletonHelper.prototype.getBoneList = function( object ) {

	var boneList = [];

	if ( object instanceof THREE.Bone ) {

		boneList.push( object );

	}

	for ( var i = 0; i < object.children.length; i ++ ) {

		boneList.push.apply( boneList, this.getBoneList( object.children[ i ] ) );

	}

	return boneList;

};

THREE.SkeletonHelper.prototype.update = function () {

	var geometry = this.geometry;

	var matrixWorldInv = new THREE.Matrix4().getInverse( this.root.matrixWorld );

	var boneMatrix = new THREE.Matrix4();

	var j = 0;

	for ( var i = 0; i < this.bones.length; i ++ ) {

		var bone = this.bones[ i ];

		if ( bone.parent instanceof THREE.Bone ) {

			boneMatrix.multiplyMatrices( matrixWorldInv, bone.matrixWorld );
			geometry.vertices[ j ].setFromMatrixPosition( boneMatrix );

			boneMatrix.multiplyMatrices( matrixWorldInv, bone.parent.matrixWorld );
			geometry.vertices[ j + 1 ].setFromMatrixPosition( boneMatrix );

			j += 2;

		}

	}

	geometry.verticesNeedUpdate = true;

	geometry.computeBoundingSphere();

};

// File:src/extras/helpers/SpotLightHelper.js

/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.SpotLightHelper = function ( light ) {

	THREE.Object3D.call( this );

	this.light = light;
	this.light.updateMatrixWorld();

	this.matrix = light.matrixWorld;
	this.matrixAutoUpdate = false;

	var geometry = new THREE.CylinderGeometry( 0, 1, 1, 8, 1, true );

	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, - 0.5, 0 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

	var material = new THREE.MeshBasicMaterial( { wireframe: true, fog: false } );

	this.cone = new THREE.Mesh( geometry, material );
	this.add( this.cone );

	this.update();

};

THREE.SpotLightHelper.prototype = Object.create( THREE.Object3D.prototype );

THREE.SpotLightHelper.prototype.dispose = function () {
	this.cone.geometry.dispose();
	this.cone.material.dispose();
};

THREE.SpotLightHelper.prototype.update = function () {

	var vector = new THREE.Vector3();
	var vector2 = new THREE.Vector3();

	return function () {

		var coneLength = this.light.distance ? this.light.distance : 10000;
		var coneWidth = coneLength * Math.tan( this.light.angle );

		this.cone.scale.set( coneWidth, coneWidth, coneLength );

		vector.setFromMatrixPosition( this.light.matrixWorld );
		vector2.setFromMatrixPosition( this.light.target.matrixWorld );

		this.cone.lookAt( vector2.sub( vector ) );

		this.cone.material.color.copy( this.light.color ).multiplyScalar( this.light.intensity );

	};

}();

// File:src/extras/helpers/VertexNormalsHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.VertexNormalsHelper = function ( object, size, hex, linewidth ) {

	this.object = object;

	this.size = ( size !== undefined ) ? size : 1;

	var color = ( hex !== undefined ) ? hex : 0xff0000;

	var width = ( linewidth !== undefined ) ? linewidth : 1;

	var geometry = new THREE.Geometry();

	var vertices = object.geometry.vertices;

	var faces = object.geometry.faces;

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		var face = faces[ i ];

		for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

			geometry.vertices.push( new THREE.Vector3(), new THREE.Vector3() );

		}

	}

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: color, linewidth: width } ), THREE.LinePieces );

	this.matrixAutoUpdate = false;

	this.normalMatrix = new THREE.Matrix3();

	this.update();

};

THREE.VertexNormalsHelper.prototype = Object.create( THREE.Line.prototype );

THREE.VertexNormalsHelper.prototype.update = ( function ( object ) {

	var v1 = new THREE.Vector3();

	return function( object ) {

		var keys = [ 'a', 'b', 'c', 'd' ];

		this.object.updateMatrixWorld( true );

		this.normalMatrix.getNormalMatrix( this.object.matrixWorld );

		var vertices = this.geometry.vertices;

		var verts = this.object.geometry.vertices;

		var faces = this.object.geometry.faces;

		var worldMatrix = this.object.matrixWorld;

		var idx = 0;

		for ( var i = 0, l = faces.length; i < l; i ++ ) {

			var face = faces[ i ];

			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				var vertexId = face[ keys[ j ] ];
				var vertex = verts[ vertexId ];

				var normal = face.vertexNormals[ j ];

				vertices[ idx ].copy( vertex ).applyMatrix4( worldMatrix );

				v1.copy( normal ).applyMatrix3( this.normalMatrix ).normalize().multiplyScalar( this.size );

				v1.add( vertices[ idx ] );
				idx = idx + 1;

				vertices[ idx ].copy( v1 );
				idx = idx + 1;

			}

		}

		this.geometry.verticesNeedUpdate = true;

		return this;

	}

}());

// File:src/extras/helpers/VertexTangentsHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
*/

THREE.VertexTangentsHelper = function ( object, size, hex, linewidth ) {

	this.object = object;

	this.size = ( size !== undefined ) ? size : 1;

	var color = ( hex !== undefined ) ? hex : 0x0000ff;

	var width = ( linewidth !== undefined ) ? linewidth : 1;

	var geometry = new THREE.Geometry();

	var vertices = object.geometry.vertices;

	var faces = object.geometry.faces;

	for ( var i = 0, l = faces.length; i < l; i ++ ) {

		var face = faces[ i ];

		for ( var j = 0, jl = face.vertexTangents.length; j < jl; j ++ ) {

			geometry.vertices.push( new THREE.Vector3() );
			geometry.vertices.push( new THREE.Vector3() );

		}

	}

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: color, linewidth: width } ), THREE.LinePieces );

	this.matrixAutoUpdate = false;

	this.update();

};

THREE.VertexTangentsHelper.prototype = Object.create( THREE.Line.prototype );

THREE.VertexTangentsHelper.prototype.update = ( function ( object ) {

	var v1 = new THREE.Vector3();

	return function( object ) {

		var keys = [ 'a', 'b', 'c', 'd' ];

		this.object.updateMatrixWorld( true );

		var vertices = this.geometry.vertices;

		var verts = this.object.geometry.vertices;

		var faces = this.object.geometry.faces;

		var worldMatrix = this.object.matrixWorld;

		var idx = 0;

		for ( var i = 0, l = faces.length; i < l; i ++ ) {

			var face = faces[ i ];

			for ( var j = 0, jl = face.vertexTangents.length; j < jl; j ++ ) {

				var vertexId = face[ keys[ j ] ];
				var vertex = verts[ vertexId ];

				var tangent = face.vertexTangents[ j ];

				vertices[ idx ].copy( vertex ).applyMatrix4( worldMatrix );

				v1.copy( tangent ).transformDirection( worldMatrix ).multiplyScalar( this.size );

				v1.add( vertices[ idx ] );
				idx = idx + 1;

				vertices[ idx ].copy( v1 );
				idx = idx + 1;

			}

		}

		this.geometry.verticesNeedUpdate = true;

		return this;

	}

}());

// File:src/extras/helpers/WireframeHelper.js

/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.WireframeHelper = function ( object, hex ) {

	var color = ( hex !== undefined ) ? hex : 0xffffff;

	var edge = [ 0, 0 ], hash = {};
	var sortFunction = function ( a, b ) { return a - b };

	var keys = [ 'a', 'b', 'c' ];
	var geometry = new THREE.BufferGeometry();

	if ( object.geometry instanceof THREE.Geometry ) {

		var vertices = object.geometry.vertices;
		var faces = object.geometry.faces;
		var numEdges = 0;

		// allocate maximal size
		var edges = new Uint32Array( 6 * faces.length );

		for ( var i = 0, l = faces.length; i < l; i ++ ) {

			var face = faces[ i ];

			for ( var j = 0; j < 3; j ++ ) {

				edge[ 0 ] = face[ keys[ j ] ];
				edge[ 1 ] = face[ keys[ ( j + 1 ) % 3 ] ];
				edge.sort( sortFunction );

				var key = edge.toString();

				if ( hash[ key ] === undefined ) {

					edges[ 2 * numEdges ] = edge[ 0 ];
					edges[ 2 * numEdges + 1 ] = edge[ 1 ];
					hash[ key ] = true;
					numEdges ++;

				}

			}

		}

		var coords = new Float32Array( numEdges * 2 * 3 );

		for ( var i = 0, l = numEdges; i < l; i ++ ) {

			for ( var j = 0; j < 2; j ++ ) {

				var vertex = vertices[ edges [ 2 * i + j] ];

				var index = 6 * i + 3 * j;
				coords[ index + 0 ] = vertex.x;
				coords[ index + 1 ] = vertex.y;
				coords[ index + 2 ] = vertex.z;

			}

		}

		geometry.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

	} else if ( object.geometry instanceof THREE.BufferGeometry ) {

		if ( object.geometry.attributes.index !== undefined ) { // Indexed BufferGeometry

			var vertices = object.geometry.attributes.position.array;
			var indices = object.geometry.attributes.index.array;
			var drawcalls = object.geometry.drawcalls;
			var numEdges = 0;

			if ( drawcalls.length === 0 ) {

				drawcalls = [ { count : indices.length, index : 0, start : 0 } ];

			}

			// allocate maximal size
			var edges = new Uint32Array( 2 * indices.length );

			for ( var o = 0, ol = drawcalls.length; o < ol; ++ o ) {

				var start = drawcalls[ o ].start;
				var count = drawcalls[ o ].count;
				var index = drawcalls[ o ].index;

				for ( var i = start, il = start + count; i < il; i += 3 ) {

					for ( var j = 0; j < 3; j ++ ) {

						edge[ 0 ] = index + indices[ i + j ];
						edge[ 1 ] = index + indices[ i + ( j + 1 ) % 3 ];
						edge.sort( sortFunction );

						var key = edge.toString();

						if ( hash[ key ] === undefined ) {

							edges[ 2 * numEdges ] = edge[ 0 ];
							edges[ 2 * numEdges + 1 ] = edge[ 1 ];
							hash[ key ] = true;
							numEdges ++;

						}

					}

				}

			}

			var coords = new Float32Array( numEdges * 2 * 3 );

			for ( var i = 0, l = numEdges; i < l; i ++ ) {

				for ( var j = 0; j < 2; j ++ ) {

					var index = 6 * i + 3 * j;
					var index2 = 3 * edges[ 2 * i + j];
					coords[ index + 0 ] = vertices[ index2 ];
					coords[ index + 1 ] = vertices[ index2 + 1 ];
					coords[ index + 2 ] = vertices[ index2 + 2 ];

				}

			}

			geometry.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

		} else { // non-indexed BufferGeometry

			var vertices = object.geometry.attributes.position.array;
			var numEdges = vertices.length / 3;
			var numTris = numEdges / 3;

			var coords = new Float32Array( numEdges * 2 * 3 );

			for ( var i = 0, l = numTris; i < l; i ++ ) {

				for ( var j = 0; j < 3; j ++ ) {

					var index = 18 * i + 6 * j;

					var index1 = 9 * i + 3 * j;
					coords[ index + 0 ] = vertices[ index1 ];
					coords[ index + 1 ] = vertices[ index1 + 1 ];
					coords[ index + 2 ] = vertices[ index1 + 2 ];

					var index2 = 9 * i + 3 * ( ( j + 1 ) % 3 );
					coords[ index + 3 ] = vertices[ index2 ];
					coords[ index + 4 ] = vertices[ index2 + 1 ];
					coords[ index + 5 ] = vertices[ index2 + 2 ];

				}

			}

			geometry.addAttribute( 'position', new THREE.BufferAttribute( coords, 3 ) );

		}

	}

	THREE.Line.call( this, geometry, new THREE.LineBasicMaterial( { color: color } ), THREE.LinePieces );

	this.matrix = object.matrixWorld;
	this.matrixAutoUpdate = false;

};

THREE.WireframeHelper.prototype = Object.create( THREE.Line.prototype );

// File:src/extras/objects/ImmediateRenderObject.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ImmediateRenderObject = function () {

	THREE.Object3D.call( this );

	this.render = function ( renderCallback ) {};

};

THREE.ImmediateRenderObject.prototype = Object.create( THREE.Object3D.prototype );

// File:src/extras/objects/MorphBlendMesh.js

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MorphBlendMesh = function( geometry, material ) {

	THREE.Mesh.call( this, geometry, material );

	this.animationsMap = {};
	this.animationsList = [];

	// prepare default animation
	// (all frames played together in 1 second)

	var numFrames = this.geometry.morphTargets.length;

	var name = "__default";

	var startFrame = 0;
	var endFrame = numFrames - 1;

	var fps = numFrames / 1;

	this.createAnimation( name, startFrame, endFrame, fps );
	this.setAnimationWeight( name, 1 );

};

THREE.MorphBlendMesh.prototype = Object.create( THREE.Mesh.prototype );

THREE.MorphBlendMesh.prototype.createAnimation = function ( name, start, end, fps ) {

	var animation = {

		startFrame: start,
		endFrame: end,

		length: end - start + 1,

		fps: fps,
		duration: ( end - start ) / fps,

		lastFrame: 0,
		currentFrame: 0,

		active: false,

		time: 0,
		direction: 1,
		weight: 1,

		directionBackwards: false,
		mirroredLoop: false

	};

	this.animationsMap[ name ] = animation;
	this.animationsList.push( animation );

};

THREE.MorphBlendMesh.prototype.autoCreateAnimations = function ( fps ) {

	var pattern = /([a-z]+)_?(\d+)/;

	var firstAnimation, frameRanges = {};

	var geometry = this.geometry;

	for ( var i = 0, il = geometry.morphTargets.length; i < il; i ++ ) {

		var morph = geometry.morphTargets[ i ];
		var chunks = morph.name.match( pattern );

		if ( chunks && chunks.length > 1 ) {

			var name = chunks[ 1 ];
			var num = chunks[ 2 ];

			if ( ! frameRanges[ name ] ) frameRanges[ name ] = { start: Infinity, end: - Infinity };

			var range = frameRanges[ name ];

			if ( i < range.start ) range.start = i;
			if ( i > range.end ) range.end = i;

			if ( ! firstAnimation ) firstAnimation = name;

		}

	}

	for ( var name in frameRanges ) {

		var range = frameRanges[ name ];
		this.createAnimation( name, range.start, range.end, fps );

	}

	this.firstAnimation = firstAnimation;

};

THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = 1;
		animation.directionBackwards = false;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.direction = - 1;
		animation.directionBackwards = true;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationFPS = function ( name, fps ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.fps = fps;
		animation.duration = ( animation.end - animation.start ) / animation.fps;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationDuration = function ( name, duration ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.duration = duration;
		animation.fps = ( animation.end - animation.start ) / animation.duration;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationWeight = function ( name, weight ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.weight = weight;

	}

};

THREE.MorphBlendMesh.prototype.setAnimationTime = function ( name, time ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = time;

	}

};

THREE.MorphBlendMesh.prototype.getAnimationTime = function ( name ) {

	var time = 0;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		time = animation.time;

	}

	return time;

};

THREE.MorphBlendMesh.prototype.getAnimationDuration = function ( name ) {

	var duration = - 1;

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		duration = animation.duration;

	}

	return duration;

};

THREE.MorphBlendMesh.prototype.playAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.time = 0;
		animation.active = true;

	} else {

		console.warn( "animation[" + name + "] undefined" );

	}

};

THREE.MorphBlendMesh.prototype.stopAnimation = function ( name ) {

	var animation = this.animationsMap[ name ];

	if ( animation ) {

		animation.active = false;

	}

};

THREE.MorphBlendMesh.prototype.update = function ( delta ) {

	for ( var i = 0, il = this.animationsList.length; i < il; i ++ ) {

		var animation = this.animationsList[ i ];

		if ( ! animation.active ) continue;

		var frameTime = animation.duration / animation.length;

		animation.time += animation.direction * delta;

		if ( animation.mirroredLoop ) {

			if ( animation.time > animation.duration || animation.time < 0 ) {

				animation.direction *= - 1;

				if ( animation.time > animation.duration ) {

					animation.time = animation.duration;
					animation.directionBackwards = true;

				}

				if ( animation.time < 0 ) {

					animation.time = 0;
					animation.directionBackwards = false;

				}

			}

		} else {

			animation.time = animation.time % animation.duration;

			if ( animation.time < 0 ) animation.time += animation.duration;

		}

		var keyframe = animation.startFrame + THREE.Math.clamp( Math.floor( animation.time / frameTime ), 0, animation.length - 1 );
		var weight = animation.weight;

		if ( keyframe !== animation.currentFrame ) {

			this.morphTargetInfluences[ animation.lastFrame ] = 0;
			this.morphTargetInfluences[ animation.currentFrame ] = 1 * weight;

			this.morphTargetInfluences[ keyframe ] = 0;

			animation.lastFrame = animation.currentFrame;
			animation.currentFrame = keyframe;

		}

		var mix = ( animation.time % frameTime ) / frameTime;

		if ( animation.directionBackwards ) mix = 1 - mix;

		this.morphTargetInfluences[ animation.currentFrame ] = mix * weight;
		this.morphTargetInfluences[ animation.lastFrame ] = ( 1 - mix ) * weight;

	}

};

/***********************************************************************************************
			MTL LOADER			
************************************************************************************************/

/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */

THREE.MTLLoader = function( baseUrl, options, crossOrigin ) {

	this.baseUrl = baseUrl;
	this.options = options;
	this.crossOrigin = crossOrigin;

};

THREE.MTLLoader.prototype = {

	constructor: THREE.MTLLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader();
		loader.setCrossOrigin( this.crossOrigin );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	/**
	 * Parses loaded MTL file
	 * @param text - Content of MTL file
	 * @return {THREE.MTLLoader.MaterialCreator}
	 */
	parse: function ( text ) {

		var lines = text.split( "\n" );
		var info = {};
		var delimiter_pattern = /\s+/;
		var materialsInfo = {};

		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				// Blank line or comment ignore
				continue;

			}

			var pos = line.indexOf( ' ' );

			var key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
			key = key.toLowerCase();

			var value = ( pos >= 0 ) ? line.substring( pos + 1 ) : "";
			value = value.trim();

			if ( key === "newmtl" ) {

				// New material

				info = { name: value };
				materialsInfo[ value ] = info;

			} else if ( info ) {

				if ( key === "ka" || key === "kd" || key === "ks" ) {

					var ss = value.split( delimiter_pattern, 3 );
					info[ key ] = [ parseFloat( ss[0] ), parseFloat( ss[1] ), parseFloat( ss[2] ) ];

				} else {

					info[ key ] = value;

				}

			}

		}

		var materialCreator = new THREE.MTLLoader.MaterialCreator( this.baseUrl, this.options );
		materialCreator.setMaterials( materialsInfo );
		return materialCreator;

	}

};

/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 *                  invertTransparency: If transparency need to be inverted (inversion is needed if d = 0 is fully opaque)
 *                                      Default: false (d = 1 is fully opaque)
 * @constructor
 */

THREE.MTLLoader.MaterialCreator = function( baseUrl, options ) {

	this.baseUrl = baseUrl;
	this.options = options;
	this.materialsInfo = {};
	this.materials = {};
	this.materialsArray = [];
	this.nameLookup = {};

	this.side = ( this.options && this.options.side )? this.options.side: THREE.FrontSide;
	this.wrap = ( this.options && this.options.wrap )? this.options.wrap: THREE.RepeatWrapping;

};

THREE.MTLLoader.MaterialCreator.prototype = {

	constructor: THREE.MTLLoader.MaterialCreator,

	setMaterials: function( materialsInfo ) {

		this.materialsInfo = this.convert( materialsInfo );
		this.materials = {};
		this.materialsArray = [];
		this.nameLookup = {};

	},

	convert: function( materialsInfo ) {

		if ( !this.options ) return materialsInfo;

		var converted = {};

		for ( var mn in materialsInfo ) {

			// Convert materials info into normalized form based on options

			var mat = materialsInfo[ mn ];

			var covmat = {};

			converted[ mn ] = covmat;

			for ( var prop in mat ) {

				var save = true;
				var value = mat[ prop ];
				var lprop = prop.toLowerCase();

				switch ( lprop ) {

					case 'kd':
					case 'ka':
					case 'ks':

						// Diffuse color (color under white light) using RGB values

						if ( this.options && this.options.normalizeRGB ) {

							value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

						}

						if ( this.options && this.options.ignoreZeroRGBs ) {

							if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 1 ] === 0 ) {

								// ignore

								save = false;

							}
						}

						break;

					case 'd':

						// According to MTL format (http://paulbourke.net/dataformats/mtl/):
						//   d is dissolve for current material
						//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)

						if ( this.options && this.options.invertTransparency ) {

							value = 1 - value;

						}

						break;

					default:

						break;
				}

				if ( save ) {

					covmat[ lprop ] = value;

				}

			}

		}

		return converted;

	},

	preload: function () {

		for ( var mn in this.materialsInfo ) {

			this.create( mn );

		}

	},

	getIndex: function( materialName ) {

		return this.nameLookup[ materialName ];

	},

	getAsArray: function() {

		var index = 0;

		for ( var mn in this.materialsInfo ) {

			this.materialsArray[ index ] = this.create( mn );
			this.nameLookup[ mn ] = index;
			index ++;

		}

		return this.materialsArray;

	},

	create: function ( materialName ) {

		if ( this.materials[ materialName ] === undefined ) {

			this.createMaterial_( materialName );

		}

		return this.materials[ materialName ];

	},

	createMaterial_: function ( materialName ) {

		// Create material

		var mat = this.materialsInfo[ materialName ];
		var params = {

			name: materialName,
			side: this.side

		};

		for ( var prop in mat ) {

			var value = mat[ prop ];

			switch ( prop.toLowerCase() ) {

				// Ns is material specular exponent

				case 'kd':

					// Diffuse color (color under white light) using RGB values

					params[ 'diffuse' ] = new THREE.Color().fromArray( value );

					break;

				case 'ka':

					// Ambient color (color under shadow) using RGB values

					params[ 'ambient' ] = new THREE.Color().fromArray( value );

					break;

				case 'ks':

					// Specular color (color when light is reflected from shiny surface) using RGB values
					params[ 'specular' ] = new THREE.Color().fromArray( value );

					break;

				case 'map_kd':

					// Diffuse texture map

					params[ 'map' ] = this.loadTexture( this.baseUrl + value );
					params[ 'map' ].wrapS = this.wrap;
					params[ 'map' ].wrapT = this.wrap;

					break;

				case 'ns':

					// The specular exponent (defines the focus of the specular highlight)
					// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

					params['shininess'] = value;

					break;

				case 'd':

					// According to MTL format (http://paulbourke.net/dataformats/mtl/):
					//   d is dissolve for current material
					//   factor of 1.0 is fully opaque, a factor of 0 is fully dissolved (completely transparent)

					if ( value < 1 ) {

						params['transparent'] = true;
						params['opacity'] = value;

					}

					break;

				default:
					break;

			}

		}

		if ( params[ 'diffuse' ] ) {

			if ( !params[ 'ambient' ]) params[ 'ambient' ] = params[ 'diffuse' ];
			params[ 'color' ] = params[ 'diffuse' ];

		}

		this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
		return this.materials[ materialName ];

	},


	loadTexture: function ( url, mapping, onLoad, onError ) {

		var texture;
		var loader = THREE.Loader.Handlers.get( url );

		if ( loader !== null ) {

			texture = loader.load( url, onLoad );

		} else {

			texture = new THREE.Texture();

			loader = new THREE.ImageLoader();
			loader.crossOrigin = this.crossOrigin;
			loader.load( url, function ( image ) {

				texture.image = THREE.MTLLoader.ensurePowerOfTwo_( image );
				texture.needsUpdate = true;

				if ( onLoad ) onLoad( texture );

			} );

		}

		texture.mapping = mapping;

		return texture;

	}

};

THREE.MTLLoader.ensurePowerOfTwo_ = function ( image ) {

	if ( ! THREE.Math.isPowerOfTwo( image.width ) || ! THREE.Math.isPowerOfTwo( image.height ) ) {

		var canvas = document.createElement( "canvas" );
		canvas.width = THREE.MTLLoader.nextHighestPowerOfTwo_( image.width );
		canvas.height = THREE.MTLLoader.nextHighestPowerOfTwo_( image.height );

		var ctx = canvas.getContext("2d");
		ctx.drawImage( image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height );
		return canvas;

	}

	return image;

};

THREE.MTLLoader.nextHighestPowerOfTwo_ = function( x ) {

	--x;

	for ( var i = 1; i < 32; i <<= 1 ) {

		x = x | x >> i;

	}

	return x + 1;

};

THREE.EventDispatcher.prototype.apply( THREE.MTLLoader.prototype );

/***********************************************************************************************
			OBJMTL LOADER 			
************************************************************************************************/

/**
 * Loads a Wavefront .obj file with materials
 *
 * @author mrdoob / http://mrdoob.com/
 * @author angelxuanchang
 */

THREE.OBJMTLLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.OBJMTLLoader.prototype = {

	constructor: THREE.OBJMTLLoader,

	load: function ( url, mtlurl, onLoad, onProgress, onError ) {

		var scope = this;

		var mtlLoader = new THREE.MTLLoader( url.substr( 0, url.lastIndexOf( "/" ) + 1 ) );
		mtlLoader.load( mtlurl, function ( materials ) {

			var materialsCreator = materials;
			materialsCreator.preload();

			var loader = new THREE.XHRLoader( scope.manager );
			loader.setCrossOrigin( this.crossOrigin );
			loader.load( url, function ( text ) {

				var object = scope.parse( text );

				object.traverse( function ( object ) {

					if ( object instanceof THREE.Mesh ) {

						if ( object.material.name ) {

							var material = materialsCreator.create( object.material.name );

							if ( material ) object.material = material;

						}

					}

				} );

				onLoad( object );

			}, onProgress, onError );

		}, onProgress, onError );

	},

	/**
	 * Parses loaded .obj file
	 * @param data - content of .obj file
	 * @param mtllibCallback - callback to handle mtllib declaration (optional)
	 * @return {THREE.Object3D} - Object3D (with default material)
	 */

	parse: function ( data, mtllibCallback ) {

		function vector( x, y, z ) {

			return new THREE.Vector3( x, y, z );

		}

		function uv( u, v ) {

			return new THREE.Vector2( u, v );

		}

		function face3( a, b, c, normals ) {

			return new THREE.Face3( a, b, c, normals );

		}

		var face_offset = 0;

		function meshN( meshName, materialName ) {

			if ( vertices.length > 0 ) {

				geometry.vertices = vertices;

				geometry.mergeVertices();
				geometry.computeFaceNormals();
				geometry.computeBoundingSphere();

				object.add( mesh );

				geometry = new THREE.Geometry();
				mesh = new THREE.Mesh( geometry, material );

			}

			if ( meshName !== undefined ) mesh.name = meshName;

			if ( materialName !== undefined ) {

				material = new THREE.MeshLambertMaterial();
				material.name = materialName;

				mesh.material = material;

			}

		}

		var group = new THREE.Group();
		var object = group;

		var geometry = new THREE.Geometry();
		var material = new THREE.MeshLambertMaterial();
		var mesh = new THREE.Mesh( geometry, material );

		var vertices = [];
		var normals = [];
		var uvs = [];

		function add_face( a, b, c, normals_inds ) {

			if ( normals_inds === undefined ) {

				geometry.faces.push( face3(
					parseInt( a ) - (face_offset + 1),
					parseInt( b ) - (face_offset + 1),
					parseInt( c ) - (face_offset + 1)
				) );

			} else {

				geometry.faces.push( face3(
					parseInt( a ) - (face_offset + 1),
					parseInt( b ) - (face_offset + 1),
					parseInt( c ) - (face_offset + 1),
					[
						normals[ parseInt( normals_inds[ 0 ] ) - 1 ].clone(),
						normals[ parseInt( normals_inds[ 1 ] ) - 1 ].clone(),
						normals[ parseInt( normals_inds[ 2 ] ) - 1 ].clone()
					]
				) );

			}

		}

		function add_uvs( a, b, c ) {

			geometry.faceVertexUvs[ 0 ].push( [
				uvs[ parseInt( a ) - 1 ].clone(),
				uvs[ parseInt( b ) - 1 ].clone(),
				uvs[ parseInt( c ) - 1 ].clone()
			] );

		}

		function handle_face_line(faces, uvs, normals_inds) {

			if ( faces[ 3 ] === undefined ) {

				add_face( faces[ 0 ], faces[ 1 ], faces[ 2 ], normals_inds );

				if (!(uvs === undefined) && uvs.length > 0) {
					add_uvs( uvs[ 0 ], uvs[ 1 ], uvs[ 2 ] );
				}

			} else {

				if (!(normals_inds === undefined) && normals_inds.length > 0) {

					add_face( faces[ 0 ], faces[ 1 ], faces[ 3 ], [ normals_inds[ 0 ], normals_inds[ 1 ], normals_inds[ 3 ] ]);
					add_face( faces[ 1 ], faces[ 2 ], faces[ 3 ], [ normals_inds[ 1 ], normals_inds[ 2 ], normals_inds[ 3 ] ]);

				} else {

					add_face( faces[ 0 ], faces[ 1 ], faces[ 3 ]);
					add_face( faces[ 1 ], faces[ 2 ], faces[ 3 ]);

				}

				if (!(uvs === undefined) && uvs.length > 0) {

					add_uvs( uvs[ 0 ], uvs[ 1 ], uvs[ 3 ] );
					add_uvs( uvs[ 1 ], uvs[ 2 ], uvs[ 3 ] );

				}

			}

		}


		// v float float float

		var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

		// vn float float float

		var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

		// vt float float

		var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

		// f vertex vertex vertex ...

		var face_pattern1 = /f( +\d+)( +\d+)( +\d+)( +\d+)?/;

		// f vertex/uv vertex/uv vertex/uv ...

		var face_pattern2 = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/;

		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

		var face_pattern3 = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/;

		// f vertex//normal vertex//normal vertex//normal ...

		var face_pattern4 = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/

		//

		var lines = data.split( "\n" );

		for ( var i = 0; i < lines.length; i ++ ) {

			var line = lines[ i ];
			line = line.trim();

			var result;

			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

				continue;

			} else if ( ( result = vertex_pattern.exec( line ) ) !== null ) {

				// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

				vertices.push( vector(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				) );

			} else if ( ( result = normal_pattern.exec( line ) ) !== null ) {

				// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

				normals.push( vector(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] ),
					parseFloat( result[ 3 ] )
				) );

			} else if ( ( result = uv_pattern.exec( line ) ) !== null ) {

				// ["vt 0.1 0.2", "0.1", "0.2"]

				uvs.push( uv(
					parseFloat( result[ 1 ] ),
					parseFloat( result[ 2 ] )
				) );

			} else if ( ( result = face_pattern1.exec( line ) ) !== null ) {

				// ["f 1 2 3", "1", "2", "3", undefined]

				handle_face_line([ result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ] ]);

			} else if ( ( result = face_pattern2.exec( line ) ) !== null ) {

				// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

				handle_face_line(
					[ result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ] ], //faces
					[ result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ] ] //uv
				);

			} else if ( ( result = face_pattern3.exec( line ) ) !== null ) {

				// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

				handle_face_line(
					[ result[ 2 ], result[ 6 ], result[ 10 ], result[ 14 ] ], //faces
					[ result[ 3 ], result[ 7 ], result[ 11 ], result[ 15 ] ], //uv
					[ result[ 4 ], result[ 8 ], result[ 12 ], result[ 16 ] ] //normal
				);

			} else if ( ( result = face_pattern4.exec( line ) ) !== null ) {

				// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

				handle_face_line(
					[ result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ] ], //faces
					[ ], //uv
					[ result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ] ] //normal
				);

			} else if ( /^o /.test( line ) ) {

				// object

				meshN();
				face_offset = face_offset + vertices.length;
				vertices = [];
				object = new THREE.Object3D();
				object.name = line.substring( 2 ).trim();
				group.add( object );

			} else if ( /^g /.test( line ) ) {

				// group

				meshN( line.substring( 2 ).trim(), undefined );

			} else if ( /^usemtl /.test( line ) ) {

				// material

				meshN( undefined, line.substring( 7 ).trim() );

			} else if ( /^mtllib /.test( line ) ) {

				// mtl file

				if ( mtllibCallback ) {

					var mtlfile = line.substring( 7 );
					mtlfile = mtlfile.trim();
					mtllibCallback( mtlfile );

				}

			} else if ( /^s /.test( line ) ) {

				// Smooth shading

			} else {

				console.log( "THREE.OBJMTLLoader: Unhandled line " + line );

			}

		}

		//Add last object
		meshN(undefined, undefined);

		return group;

	}

};

THREE.EventDispatcher.prototype.apply( THREE.OBJMTLLoader.prototype );

/***********************************************************************************************
			SOUND JS 			
************************************************************************************************/

/**
 * @module SoundJS
 */
this.createjs = this.createjs || {};

(function () {

	/**
	 * Static class holding library specific information such as the version and buildDate of the library.
	 * The SoundJS class has been renamed {{#crossLink "Sound"}}{{/crossLink}}.  Please see {{#crossLink "Sound"}}{{/crossLink}}
	 * for information on using sound.
	 * @class SoundJS
	 **/
	var s = createjs.SoundJS = createjs.SoundJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*version*/"NEXT"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*date*/"Mon, 27 Oct 2014 20:40:07 GMT"; // injected by build process

})();
/*
* EventDispatcher
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
 *
 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
 * 
 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
 * 
 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
 * 
 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
 *
 * <h4>Example</h4>
 * Add EventDispatcher capabilities to the "MyClass" class.
 *
 *      EventDispatcher.initialize(MyClass.prototype);
 *
 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
 *
 *      instance.addEventListener("eventName", handlerMethod);
 *      function handlerMethod(event) {
 *          console.log(event.target + " Was Clicked");
 *      }
 *
 * <b>Maintaining proper scope</b><br />
 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
 * method to subscribe to events simplifies this.
 *
 *      instance.addEventListener("click", function(event) {
 *          console.log(instance == this); // false, scope is ambiguous.
 *      });
 *      
 *      instance.on("click", function(event) {
 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
 *      });
 * 
 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
 *      
 *
 * @class EventDispatcher
 * @constructor
 **/
var EventDispatcher = function() {
/*	this.initialize(); */ // not needed.
};
var p = EventDispatcher.prototype;
EventDispatcher.prototype.constructor = EventDispatcher;


	/**
	 * Static initializer to mix EventDispatcher methods into a target object or prototype.
	 * 
	 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
	 * 		EventDispatcher.initialize(myObject); // add to a specific instance
	 * 
	 * @method initialize
	 * @static
	 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
	 * prototype.
	 **/
	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
		target.willTrigger = p.willTrigger;
	};
	
// constructor:

// private properties:
	/**
	 * @protected
	 * @property _listeners
	 * @type Object
	 **/
	p._listeners = null;

	/**
	 * @protected
	 * @property _captureListeners
	 * @type Object
	 **/
	p._captureListeners = null;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @protected
	 **/
	p.initialize = function() {};

// public methods:
	/**
	 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
	 * multiple callbacks getting fired.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *         // Click happened.
	 *      }
	 *
	 * @method addEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function | Object} Returns the listener for chaining or assignment.
	 **/
	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; // remove may have deleted the array
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	
	/**
	 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
	 * only run once, associate arbitrary data with the listener, and remove the listener.
	 * 
	 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
	 * The created anonymous function is returned for use with .removeEventListener (or .off).
	 * 
	 * <h4>Example</h4>
	 * 
	 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
	 * 		function handleClick(evt, data) {
	 * 			data.count -= 1;
	 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
	 * 			if (data.count == 0) {
	 * 				alert("clicked 3 times!");
	 * 				myBtn.off("click", listener);
	 * 				// alternately: evt.remove();
	 * 			}
	 * 		}
	 * 
	 * @method on
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
	 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
	 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
	 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
	 **/
	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};

	/**
	 * Removes the specified event listener.
	 *
	 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
	 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
	 * closure will not work.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.removeEventListener("click", handleClick);
	 *
	 * @method removeEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } // allows for faster checks.
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	
	/**
	 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
	 * .on method.
	 *
	 * @method off
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.off = p.removeEventListener;

	/**
	 * Removes all listeners for the specified type, or all listeners of all types.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Remove all listeners
	 *      displayObject.removeAllEventListeners();
	 *
	 *      // Remove all click listeners
	 *      displayObject.removeAllEventListeners("click");
	 *
	 * @method removeAllEventListeners
	 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
	 **/
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};

	/**
	 * Dispatches the specified event to all listeners.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Use a string event
	 *      this.dispatchEvent("complete");
	 *
	 *      // Use an Event instance
	 *      var event = new createjs.Event("progress");
	 *      this.dispatchEvent(event);
	 *
	 * @method dispatchEvent
	 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
	 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
	 * dispatchEvent will construct an Event instance with the specified type.
	 * @return {Boolean} Returns the value of eventObj.defaultPrevented.
	 **/
	p.dispatchEvent = function(eventObj) {
		if (typeof eventObj == "string") {
			// won't bubble, so skip everything if there's no listeners:
			var listeners = this._listeners;
			if (!listeners || !listeners[eventObj]) { return false; }
			eventObj = new createjs.Event(eventObj);
		} else if (eventObj.target && eventObj.clone) {
			// redispatching an active event object, so clone it:
			eventObj = eventObj.clone();
		}
		try { eventObj.target = this; } catch (e) {} // try/catch allows redispatching of native events

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			// capture & atTarget
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			// bubbling
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return eventObj.defaultPrevented;
	};

	/**
	 * Indicates whether there is at least one listener for the specified event type.
	 * @method hasEventListener
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns true if there is at least one listener for the specified event.
	 **/
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};
	
	/**
	 * Indicates whether there is at least one listener for the specified event type on this object or any of its
	 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
	 * specified type is dispatched from this object, it will trigger at least one listener.
	 * 
	 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
	 * event flow for a listener, not just this object.
	 * @method willTrigger
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns `true` if there is at least one listener for the specified event.
	 **/
	p.willTrigger = function(type) {
		var o = this;
		while (o) {
			if (o.hasEventListener(type)) { return true; }
			o = o.parent;
		}
		return false;
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[EventDispatcher]";
	};

// private methods:
	/**
	 * @method _dispatchEvent
	 * @param {Object | String | Event} eventObj
	 * @param {Object} eventPhase
	 * @protected
	 **/
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, listeners = (eventPhase==1) ? this._captureListeners : this._listeners;
		if (eventObj && listeners) {
			var arr = listeners[eventObj.type];
			if (!arr||!(l=arr.length)) { return; }
			try { eventObj.currentTarget = this; } catch (e) {}
			try { eventObj.eventPhase = eventPhase; } catch (e) {}
			eventObj.removed = false;
			arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
	};


createjs.EventDispatcher = EventDispatcher;
}());
/*
* Event
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified
 * files of each library and are available on the createsjs namespace directly.
 *
 * <h4>Example</h4>
 *
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @module CreateJS
 * @main CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";

/**
 * Contains properties and methods shared by all events for use with
 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
 * 
 * Note that Event objects are often reused, so you should never
 * rely on an event object's state outside of the call stack it was received in.
 * @class Event
 * @param {String} type The event type.
 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
 * @constructor
 **/
var Event = function(type, bubbles, cancelable) {
  this.initialize(type, bubbles, cancelable);
};
var p = Event.prototype;
Event.prototype.constructor = Event;

// events:

// public properties:

	/**
	 * The type of event.
	 * @property type
	 * @type String
	 **/
	p.type = null;

	/**
	 * The object that generated an event.
	 * @property target
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.target = null;

	/**
	 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
	 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
	 * is generated from childObj, then a listener on parentObj would receive the event with
	 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
	 * @property currentTarget
	 * @type Object
	 * @default null
	 * @readonly
	*/
	p.currentTarget = null;

	/**
	 * For bubbling events, this indicates the current event phase:<OL>
	 * 	<LI> capture phase: starting from the top parent to the target</LI>
	 * 	<LI> at target phase: currently being dispatched from the target</LI>
	 * 	<LI> bubbling phase: from the target to the top parent</LI>
	 * </OL>
	 * @property eventPhase
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.eventPhase = 0;

	/**
	 * Indicates whether the event will bubble through the display list.
	 * @property bubbles
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.bubbles = false;

	/**
	 * Indicates whether the default behaviour of this event can be cancelled via
	 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
	 * @property cancelable
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.cancelable = false;

	/**
	 * The epoch time at which this event was created.
	 * @property timeStamp
	 * @type Number
	 * @default 0
	 * @readonly
	*/
	p.timeStamp = 0;

	/**
	 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
	 * on this event.
	 * @property defaultPrevented
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.defaultPrevented = false;

	/**
	 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
	 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
	 * @property propagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.propagationStopped = false;

	/**
	 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
	 * on this event.
	 * @property immediatePropagationStopped
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.immediatePropagationStopped = false;
	
	/**
	 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
	 * @property removed
	 * @type Boolean
	 * @default false
	 * @readonly
	*/
	p.removed = false;

// constructor:
	/**
	 * Initialization method.
	 * @method initialize
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @protected
	 **/
	p.initialize = function(type, bubbles, cancelable) {
		this.type = type;
		this.bubbles = bubbles;
		this.cancelable = cancelable;
		this.timeStamp = (new Date()).getTime();
	};

// public methods:

	/**
	 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * Causes the active listener to be removed via removeEventListener();
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * Returns a clone of the Event instance.
	 * @method clone
	 * @return {Event} a clone of the Event instance.
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on the instance.
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the instance.
	 * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

createjs.Event = Event;
}());
/*
* IndexOf
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
  * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */
(function() {
	"use strict";

	/*
	 * Employs Duff's Device to make a more performant implementation of indexOf.
	 * see http://jsperf.com/duffs-indexof/2
	 * #method indexOf
	 * @param {Array} array Array to search for searchElement
	 * @param searchElement Element to search array for.
	 * @return {Number} The position of the first occurrence of a specified value searchElement in the passed in array ar.
	 * @constructor
	 */
	/* replaced with simple for loop for now, perhaps will be researched further
	createjs.indexOf = function (ar, searchElement) {
		var l = ar.length;

		var n = (l * 0.125) ^ 0;	// 0.125 == 1/8, using multiplication because it's faster in some browsers	// ^0 floors result
		for (var i = 0; i < n; i++) {
			if(searchElement === ar[i*8])   { return (i*8);}
			if(searchElement === ar[i*8+1]) { return (i*8+1);}
			if(searchElement === ar[i*8+2]) { return (i*8+2);}
			if(searchElement === ar[i*8+3]) { return (i*8+3);}
			if(searchElement === ar[i*8+4]) { return (i*8+4);}
			if(searchElement === ar[i*8+5]) { return (i*8+5);}
			if(searchElement === ar[i*8+6]) { return (i*8+6);}
			if(searchElement === ar[i*8+7]) { return (i*8+7);}
		}

		var n = l % 8;
		for (var i = 0; i < n; i++) {
			if (searchElement === ar[l-n+i]) {
				return l-n+i;
			}
		}

		return -1;
	}
	*/

	/**
	 * Finds the first occurrence of a specified value searchElement in the passed in array, and returns the index of
	 * that value.  Returns -1 if value is not found.
	 *
	 *      var i = createjs.indexOf(myArray, myElementToFind);
	 *
	 * @method indexOf
	 * @param {Array} array Array to search for searchElement
	 * @param searchElement Element to find in array.
	 * @return {Number} The first index of searchElement in array.
	 */
	createjs.indexOf = function (array, searchElement){
		for (var i = 0,l=array.length; i < l; i++) {
			if (searchElement === array[i]) {
				return i;
			}
		}
		return -1;
	}

}());/*
* Proxy
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

/**
 * Various utilities that the CreateJS Suite uses. Utilities are created as separate files, and will be available on the
 * createjs namespace directly:
 *
 * <h4>Example</h4>
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @class Utility Methods
 * @main Utility Methods
 */

(function() {
	"use strict";

	/**
	 * A function proxy for methods. By default, JavaScript methods do not maintain scope, so passing a method as a
	 * callback will result in the method getting called in the scope of the caller. Using a proxy ensures that the
	 * method gets called in the correct scope.
	 *
	 * Additional arguments can be passed that will be applied to the function when it is called.
	 *
	 * <h4>Example</h4>
	 *      myObject.addEventListener("event", createjs.proxy(myHandler, this, arg1, arg2));
	 *
	 *      function myHandler(arg1, arg2) {
	 *           // This gets called when myObject.myCallback is executed.
	 *      }
	 *
	 * @method proxy
	 * @param {Function} method The function to call
	 * @param {Object} scope The scope to call the method name on
	 * @param {mixed} [arg] * Arguments that are appended to the callback for additional params.
	 * @public
	 * @static
	 */
	createjs.proxy = function (method, scope) {
		var aArgs = Array.prototype.slice.call(arguments, 2);
		return function () {
			return method.apply(scope, Array.prototype.slice.call(arguments, 0).concat(aArgs));
		};
	}

}());/*
* defineProperty
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
  * @module CreateJS
 */

// namespace:
this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */
(function() {
	"use strict";

	/**
	 * Boolean value indicating if Object.defineProperty is supported.
	 *
	 * @property definePropertySupported
	 * @type {Boolean}
	 * @default true
	 */
	var t = Object.defineProperty ? true : false;

	// IE8 has Object.defineProperty, but only for DOM objects, so check if fails to suppress errors
	var foo = {};
	try {
		Object.defineProperty(foo, "bar", {
			get: function() {
				return this._bar;
			},
			set: function(value) {
				this._bar = value;
			}
		});
	} catch (e) {
		t = false;
	};

	createjs.definePropertySupported = t;
}());/*
 * Sound
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


// namespace:
this.createjs = this.createjs || {};

/**
 * The SoundJS library manages the playback of audio on the web. It works via plugins which abstract the actual audio
 * implementation, so playback is possible on any platform without specific knowledge of what mechanisms are necessary
 * to play sounds.
 *
 * To use SoundJS, use the public API on the {{#crossLink "Sound"}}{{/crossLink}} class. This API is for:
 * <ul><li>Installing audio playback Plugins</li>
 *      <li>Registering (and preloading) sounds</li>
 *      <li>Creating and playing sounds</li>
 *      <li>Master volume, mute, and stop controls for all sounds at once</li>
 * </ul>
 *
 * <b>Controlling Sounds</b><br />
 * Playing sounds creates {{#crossLink "SoundInstance"}}{{/crossLink}} instances, which can be controlled individually.
 * <ul><li>Pause, resume, seek, and stop sounds</li>
 *      <li>Control a sound's volume, mute, and pan</li>
 *      <li>Listen for events on sound instances to get notified when they finish, loop, or fail</li>
 * </ul>
 *
 * <h4>Feature Set Example</h4>
 *      createjs.Sound.alternateExtensions = ["mp3"];
 *      createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, this));
 *      createjs.Sound.registerSound("path/to/mySound.ogg", "sound");
 *      function loadHandler(event) {
 *          // This is fired for each sound that is registered.
 *          var instance = createjs.Sound.play("sound");  // play using id.  Could also use full sourcepath or event.src.
 *          instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
 *          instance.volume = 0.5;
 *      }
 *
 * <h4>Browser Support</h4>
 * Audio will work in browsers which support WebAudio (<a href="http://caniuse.com/audio-api">http://caniuse.com/audio-api</a>)
 * or HTMLAudioElement (<a href="http://caniuse.com/audio">http://caniuse.com/audio</a>). A Flash fallback can be added
 * as well, which will work in any browser that supports the Flash player.
 * @module SoundJS
 * @main SoundJS
 */

(function () {

	"use strict";

	/**
	 * The Sound class is the public API for creating sounds, controlling the overall sound levels, and managing plugins.
	 * All Sound APIs on this class are static.
	 *
	 * <b>Registering and Preloading</b><br />
	 * Before you can play a sound, it <b>must</b> be registered. You can do this with {{#crossLink "Sound/registerSound"}}{{/crossLink}},
	 * or register multiple sounds using {{#crossLink "Sound/registerManifest"}}{{/crossLink}}. If you don't register a
	 * sound prior to attempting to play it using {{#crossLink "Sound/play"}}{{/crossLink}} or create it using {{#crossLink "Sound/createInstance"}}{{/crossLink}},
	 * the sound source will be automatically registered but playback will fail as the source will not be ready. If you use
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>, registration is handled for you when the sound is
	 * preloaded. It is recommended to preload sounds either internally using the register functions or externally using
	 * PreloadJS so they are ready when you want to use them.
	 *
	 * <b>Playback</b><br />
	 * To play a sound once it's been registered and preloaded, use the {{#crossLink "Sound/play"}}{{/crossLink}} method.
	 * This method returns a {{#crossLink "SoundInstance"}}{{/crossLink}} which can be paused, resumed, muted, etc.
	 * Please see the {{#crossLink "SoundInstance"}}{{/crossLink}} documentation for more on the instance control APIs.
	 *
	 * <b>Plugins</b><br />
	 * By default, the {{#crossLink "WebAudioPlugin"}}{{/crossLink}} or the {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * are used (when available), although developers can change plugin priority or add new plugins (such as the
	 * provided {{#crossLink "FlashPlugin"}}{{/crossLink}}). Please see the {{#crossLink "Sound"}}{{/crossLink}} API
	 * methods for more on the playback and plugin APIs. To install plugins, or specify a different plugin order, see
	 * {{#crossLink "Sound/installPlugins"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
	 *      createjs.Sound.alternateExtensions = ["mp3"];
	 *      createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, (this));
	 *      createjs.Sound.registerSound("path/to/mySound.ogg", "sound");
	 *      function loadHandler(event) {
     *          // This is fired for each sound that is registered.
     *          var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
     *          instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
     *          instance.volume = 0.5;
	 *      }
	 *
	 * The maximum number of concurrently playing instances of the same sound can be specified in the "data" argument
	 * of {{#crossLink "Sound/registerSound"}}{{/crossLink}}.  Note that if not specified, the active plugin will apply
	 * a default limit.  Currently HTMLAudioPlugin sets a default limit of 2, while WebAudioPlugin and FlashPlugin set a
	 * default limit of 100.
	 *
	 *      createjs.Sound.registerSound("sound.mp3", "soundId", 4);
	 *
	 * Sound can be used as a plugin with PreloadJS to help preload audio properly. Audio preloaded with PreloadJS is
	 * automatically registered with the Sound class. When audio is not preloaded, Sound will do an automatic internal
	 * load. As a result, it may fail to play the first time play is called if the audio is not finished loading. Use the
	 * {{#crossLink "Sound/fileload"}}{{/crossLink}} event to determine when a sound has finished internally preloading.
	 * It is recommended that all audio is preloaded before it is played.
	 *
	 *      var queue = new createjs.LoadQueue();
	 *		queue.installPlugin(createjs.Sound);
	 *
	 * <b>Audio Sprites</b><br />
	 * SoundJS has added support for Audio Sprites, available as of version 0.5.3.
	 * For those unfamiliar with audio sprites, they are much like CSS sprites or sprite sheets: multiple audio assets
	 * grouped into a single file.
	 *
	 * Benefits of Audio Sprites
	 * <ul><li>More robust support for older browsers and devices that only allow a single audio instance, such as iOS 5.</li>
	 * <li>They provide a work around for the Internet Explorer 9 audio tag limit, which until now restricted how many
	 * different sounds we could load at once.</li>
	 * <li>Faster loading by only requiring a single network request for several sounds, especially on mobile devices
	 * where the network round trip for each file can add significant latency.</li></ul>
	 *
	 * Drawbacks of Audio Sprites
	 * <ul><li>No guarantee of smooth looping when using HTML or Flash audio.  If you have a track that needs to loop
	 * smoothly and you are supporting non-web audio browsers, do not use audio sprites for that sound if you can avoid it.</li>
	 * <li>No guarantee that HTML audio will play back immediately, especially the first time. In some browsers (Chrome!),
	 * HTML audio will only load enough to play through – so we rely on the “canplaythrough” event to determine if the audio is loaded.
	 * Since audio sprites must jump ahead to play specific sounds, the audio may not yet have downloaded.</li>
	 * <li>Audio sprites share the same core source, so if you have a sprite with 5 sounds and are limited to 2
	 * concurrently playing instances, that means you can only play 2 of the sounds at the same time.</li></ul>
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.initializeDefaultPlugins();
	 *		var assetsPath = "./assets/";
	 *		var manifest = [{
	 *			src:"MyAudioSprite.ogg", data: {
	 *				audioSprite: [
	 *					{id:"sound1", startTime:0, duration:500},
	 *					{id:"sound2", startTime:1000, duration:400},
	 *					{id:"sound3", startTime:1700, duration: 1000}
	 *				]}
 *				}
	 *		];
	 *		createjs.Sound.alternateExtensions = ["mp3"];
	 *		createjs.Sound.addEventListener("fileload", loadSound);
	 *		createjs.Sound.registerManifest(manifest, assetsPath);
	 *		// after load is complete
	 *		createjs.Sound.play("sound2");
	 *
	 * You can also create audio sprites on the fly by setting the startTime and duration when creating an new SoundInstance.
	 *
	 * 		createjs.Sound.play("MyAudioSprite", {startTime: 1000, duration: 400});
	 *
	 * <b>Mobile Safe Approach</b><br />
	 * Mobile devices require sounds to be played inside of a user initiated event (touch/click) in varying degrees.
	 * As of SoundJS 0.4.1, you can launch a site inside of a user initiated event and have audio playback work. To
	 * enable as broadly as possible, the site needs to setup the Sound plugin in its initialization (for example via
	 * <code>createjs.Sound.initializeDefaultPlugins();</code>), and all sounds need to be played in the scope of the
	 * application.  See the MobileSafe demo for a working example.
	 *
	 * <h4>Example</h4>
	 *     document.getElementById("status").addEventListener("click", handleTouch, false);    // works on Android and iPad
	 *     function handleTouch(event) {
	 *       document.getElementById("status").removeEventListener("click", handleTouch, false);    // remove the listener
	 *       var thisApp = new myNameSpace.MyApp();    // launch the app
	 *     }
	 *
	 * <h4>Known Browser and OS issues</h4>
	 * <b>IE 9 HTML Audio limitations</b><br />
	 * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
	 * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
	 * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
     * <li>MP3 encoding will not always work for audio tags, particularly in Internet Explorer. We've found default
	 * encoding with 64kbps works.</li>
	 * <li>Occasionally very short samples will get cut off.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.</li></ul>
	 *
	 * <b>Firefox 25 Web Audio limitations</b>
	 * <ul><li>mp3 audio files do not load properly on all windows machines, reported
	 * <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=929969" target="_blank">here</a>. </br>
	 * For this reason it is recommended to pass another FF supported type (ie ogg) first until this bug is resolved, if possible.</li></ul>

	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 Web Audio limitations</b><br />
	 * <ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event
	 * (touch/click).</li>
	 * <li>A bug exists that will distort un-cached web audio when a video element is present in the DOM that has audio at a different sampleRate.</li>
	 * <li>Note HTMLAudioPlugin is not supported on iOS by default.  See {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}
	 * for more details.</li>
	 * </ul>
	 *
	 * <b>Android HTML Audio limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 * <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use
	 * a delay.</li></ul>
	 *
	 *
	 * @class Sound
	 * @static
	 * @uses EventDispatcher
	 */
	function Sound() {
		throw "Sound cannot be instantiated";
	}

	var s = Sound;

	// TODO DEPRECATED
	/**
	 * REMOVED
	 * Use {{#crossLink "Sound/alternateExtensions:property"}}{{/crossLink}} instead
	 * @property DELIMITER
	 * @type {String}
	 * @default |
	 * @static
	 * @deprecated
	 */

	/**
	 * The interrupt value to interrupt any currently playing instance with the same source, if the maximum number of
	 * instances of the sound are already playing.
	 * @property INTERRUPT_ANY
	 * @type {String}
	 * @default any
	 * @static
	 */
	s.INTERRUPT_ANY = "any";

	/**
	 * The interrupt value to interrupt the earliest currently playing instance with the same source that progressed the
	 * least distance in the audio track, if the maximum number of instances of the sound are already playing.
	 * @property INTERRUPT_EARLY
	 * @type {String}
	 * @default early
	 * @static
	 */
	s.INTERRUPT_EARLY = "early";

	/**
	 * The interrupt value to interrupt the currently playing instance with the same source that progressed the most
	 * distance in the audio track, if the maximum number of instances of the sound are already playing.
	 * @property INTERRUPT_LATE
	 * @type {String}
	 * @default late
	 * @static
	 */
	s.INTERRUPT_LATE = "late";

	/**
	 * The interrupt value to not interrupt any currently playing instances with the same source, if the maximum number of
	 * instances of the sound are already playing.
	 * @property INTERRUPT_NONE
	 * @type {String}
	 * @default none
	 * @static
	 */
	s.INTERRUPT_NONE = "none";

// The playState in plugins should be implemented with these values.
	/**
	 * Defines the playState of an instance that is still initializing.
	 * @property PLAY_INITED
	 * @type {String}
	 * @default playInited
	 * @static
	 */
	s.PLAY_INITED = "playInited";

	/**
	 * Defines the playState of an instance that is currently playing or paused.
	 * @property PLAY_SUCCEEDED
	 * @type {String}
	 * @default playSucceeded
	 * @static
	 */
	s.PLAY_SUCCEEDED = "playSucceeded";

	/**
	 * Defines the playState of an instance that was interrupted by another instance.
	 * @property PLAY_INTERRUPTED
	 * @type {String}
	 * @default playInterrupted
	 * @static
	 */
	s.PLAY_INTERRUPTED = "playInterrupted";

	/**
	 * Defines the playState of an instance that completed playback.
	 * @property PLAY_FINISHED
	 * @type {String}
	 * @default playFinished
	 * @static
	 */
	s.PLAY_FINISHED = "playFinished";

	/**
	 * Defines the playState of an instance that failed to play. This is usually caused by a lack of available channels
	 * when the interrupt mode was "INTERRUPT_NONE", the playback stalled, or the sound could not be found.
	 * @property PLAY_FAILED
	 * @type {String}
	 * @default playFailed
	 * @static
	 */
	s.PLAY_FAILED = "playFailed";

	/**
	 * A list of the default supported extensions that Sound will <i>try</i> to play. Plugins will check if the browser
	 * can play these types, so modifying this list before a plugin is initialized will allow the plugins to try to
	 * support additional media types.
	 *
	 * NOTE this does not currently work for {{#crossLink "FlashPlugin"}}{{/crossLink}}.
	 *
	 * More details on file formats can be found at <a href="http://en.wikipedia.org/wiki/Audio_file_format" target="_blank">http://en.wikipedia.org/wiki/Audio_file_format</a>.<br />
	 * A very detailed list of file formats can be found at <a href="http://www.fileinfo.com/filetypes/audio" target="_blank">http://www.fileinfo.com/filetypes/audio</a>.
	 * @property SUPPORTED_EXTENSIONS
	 * @type {Array[String]}
	 * @default ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"]
	 * @since 0.4.0
	 */
	s.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"];

	/**
	 * Some extensions use another type of extension support to play (one of them is a codex).  This allows you to map
	 * that support so plugins can accurately determine if an extension is supported.  Adding to this list can help
	 * plugins determine more accurately if an extension is supported.
	 *
 	 * A useful list of extensions for each format can be found at <a href="http://html5doctor.com/html5-audio-the-state-of-play/" target="_blank">http://html5doctor.com/html5-audio-the-state-of-play/</a>.
	 * @property EXTENSION_MAP
	 * @type {Object}
	 * @since 0.4.0
	 * @default {m4a:"mp4"}
	 */
	s.EXTENSION_MAP = {
		m4a:"mp4"
	};

	/**
	 * The RegExp pattern used to parse file URIs. This supports simple file names, as well as full domain URIs with
	 * query strings. The resulting match is: protocol:$1 domain:$2 path:$3 file:$4 extension:$5 query:$6.
	 * @property FILE_PATTERN
	 * @type {RegExp}
	 * @static
	 * @protected
	 */
	s.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;

	/**
	 * Determines the default behavior for interrupting other currently playing instances with the same source, if the
	 * maximum number of instances of the sound are already playing.  Currently the default is {{#crossLink "Sound/INTERRUPT_NONE:property"}}{{/crossLink}}
	 * but this can be set and will change playback behavior accordingly.  This is only used when {{#crossLink "Sound/play"}}{{/crossLink}}
	 * is called without passing a value for interrupt.
	 * @property defaultInterruptBehavior
	 * @type {String}
	 * @default Sound.INTERRUPT_NONE, or "none"
	 * @static
	 * @since 0.4.0
	 */
	s.defaultInterruptBehavior = s.INTERRUPT_NONE;  // OJR does s.INTERRUPT_ANY make more sense as default?  Needs game dev testing to see which case makes more sense.

	/**
	 * An array of extensions to attempt to use when loading sound, if the default is unsupported by the active plugin.
	 * These are applied in order, so if you try to Load Thunder.ogg in a browser that does not support ogg, and your
	 * extensions array is ["mp3", "m4a", "wav"] it will check mp3 support, then m4a, then wav. The audio files need
	 * to exist in the same location, as only the extension is altered.
	 *
	 * Note that regardless of which file is loaded, you can call {{#crossLink "Sound/createInstance"}}{{/crossLink}}
	 * and {{#crossLink "Sound/play"}}{{/crossLink}} using the same id or full source path passed for loading.
	 * <h4>Example</h4>
	 *	var manifest = [
	 *		{src:"myPath/mySound.ogg", id:"example"},
	 *	];
	 *	createjs.Sound.alternateExtensions = ["mp3"]; // now if ogg is not supported, SoundJS will try asset0.mp3
	 *	createjs.Sound.addEventListener("fileload", handleLoad); // call handleLoad when each sound loads
	 *	createjs.Sound.registerManifest(manifest, assetPath);
	 *	// ...
	 *	createjs.Sound.play("myPath/mySound.ogg"); // works regardless of what extension is supported.  Note calling with ID is a better approach
	 *
	 * @property alternateExtensions
	 * @type {Array}
	 * @since 0.5.2
	 */
	s.alternateExtensions = [];

	/**
	 * Used internally to assign unique IDs to each SoundInstance.
	 * @property _lastID
	 * @type {Number}
	 * @static
	 * @protected
	 */
	s._lastID = 0;

	/**
	 * The currently active plugin. If this is null, then no plugin could be initialized. If no plugin was specified,
	 * Sound attempts to apply the default plugins: {{#crossLink "WebAudioPlugin"}}{{/crossLink}}, followed by
	 * {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
	 * @property activePlugin
	 * @type {Object}
	 * @static
	 */
    s.activePlugin = null;

	/**
	 * Determines if the plugins have been registered. If false, the first call to play() will instantiate the default
	 * plugins ({{#crossLink "WebAudioPlugin"}}{{/crossLink}}, followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}).
	 * If plugins have been registered, but none are applicable, then sound playback will fail.
	 * @property _pluginsRegistered
	 * @type {Boolean}
	 * @default false
	 * @static
	 * @protected
	 */
	s._pluginsRegistered = false;

	/**
	 * The master volume value, which affects all sounds. Use {{#crossLink "Sound/getVolume"}}{{/crossLink}} and
	 * {{#crossLink "Sound/setVolume"}}{{/crossLink}} to modify the volume of all audio.
	 * @property _masterVolume
	 * @type {Number}
	 * @default 1
	 * @protected
	 * @since 0.4.0
	 */
	s._masterVolume = 1;

	/**
	 * The master mute value, which affects all sounds.  This is applies to all sound instances.  This value can be set
	 * through {{#crossLink "Sound/setMute"}}{{/crossLink}} and accessed via {{#crossLink "Sound/getMute"}}{{/crossLink}}.
	 * @property _masterMute
	 * @type {Boolean}
	 * @default false
	 * @protected
	 * @static
	 * @since 0.4.0
	 */
	s._masterMute = false;

	/**
	 * An array containing all currently playing instances. This allows Sound to control the volume, mute, and playback of
	 * all instances when using static APIs like {{#crossLink "Sound/stop"}}{{/crossLink}} and {{#crossLink "Sound/setVolume"}}{{/crossLink}}.
	 * When an instance has finished playback, it gets removed via the {{#crossLink "Sound/finishedPlaying"}}{{/crossLink}}
	 * method. If the user replays an instance, it gets added back in via the {{#crossLink "Sound/_beginPlaying"}}{{/crossLink}}
	 * method.
	 * @property _instances
	 * @type {Array}
	 * @protected
	 * @static
	 */
	s._instances = [];

	/**
	 * An object hash storing objects with sound sources, startTime, and duration via there corresponding ID.
	 * @property _idHash
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._idHash = {};

	/**
	 * An object hash that stores preloading sound sources via the parsed source that is passed to the plugin.  Contains the
	 * source, id, and data that was passed in by the user.  Parsed sources can contain multiple instances of source, id,
	 * and data.
	 * @property _preloadHash
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._preloadHash = {};

	/**
	 * An object that stands in for audio that fails to play. This allows developers to continue to call methods
	 * on the failed instance without having to check if it is valid first. The instance is instantiated once, and
	 * shared to keep the memory footprint down.
	 * @property _defaultSoundInstance
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._defaultSoundInstance = null;

// mix-ins:
	// EventDispatcher methods:
	s.addEventListener = null;
	s.removeEventListener = null;
	s.removeAllEventListeners = null;
	s.dispatchEvent = null;
	s.hasEventListener = null;
	s._listeners = null;

	createjs.EventDispatcher.initialize(s); // inject EventDispatcher methods.


// Events
	/**
	 * This event is fired when a file finishes loading internally. This event is fired for each loaded sound,
	 * so any handler methods should look up the <code>event.src</code> to handle a particular sound.
	 * @event fileload
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {String} src The source of the sound that was loaded.
	 * @param {String} [id] The id passed in when the sound was registered. If one was not provided, it will be null.
	 * @param {Number|Object} [data] Any additional data associated with the item. If not provided, it will be undefined.
	 * @since 0.4.1
	 */

	/**
	 * Used by external plugins to dispatch file load events.
	 * @method _sendFileLoadEvent
	 * @param {String} src A sound file has completed loading, and should be dispatched.
	 * @protected
	 * @static
	 * @since 0.4.1
	 */
	s._sendFileLoadEvent = function (src) {
		if (!s._preloadHash[src]) {return;}

		for (var i = 0, l = s._preloadHash[src].length; i < l; i++) {
			var item = s._preloadHash[src][i];
			s._preloadHash[src][i] = true;

			if (!s.hasEventListener("fileload")) { continue; }

			var event = new createjs.Event("fileload");
			event.src = item.src;
			event.id = item.id;
			event.data = item.data;
			event.sprite = item.sprite;

			s.dispatchEvent(event);
		}
	};

	/**
	 * Get the preload rules to allow Sound to be used as a plugin by <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.
	 * Any load calls that have the matching type or extension will fire the callback method, and use the resulting
	 * object, which is potentially modified by Sound. This helps when determining the correct path, as well as
	 * registering the audio instance(s) with Sound. This method should not be called, except by PreloadJS.
	 * @method getPreloadHandlers
	 * @return {Object} An object containing:
	 * <ul><li>callback: A preload callback that is fired when a file is added to PreloadJS, which provides
	 *      Sound a mechanism to modify the load parameters, select the correct file format, register the sound, etc.</li>
	 *      <li>types: A list of file types that are supported by Sound (currently supports "sound").</li>
	 *      <li>extensions: A list of file extensions that are supported by Sound (see {{#crossLink "Sound.SUPPORTED_EXTENSIONS"}}{{/crossLink}}).</li></ul>
	 * @static
	 * @protected
	 */
	s.getPreloadHandlers = function () {
		return {
			callback:createjs.proxy(s.initLoad, s),
			types:["sound"],
			extensions:s.SUPPORTED_EXTENSIONS
		};
	};

	/**
	 * Used by {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} to register a Sound plugin.
	 *
	 * @method _registerPlugin
	 * @param {Object} plugin The plugin class to install.
	 * @return {Boolean} Whether the plugin was successfully initialized.
	 * @static
	 * @private
	 */
	s._registerPlugin = function (plugin) {
		// Note: Each plugin is passed in as a class reference, but we store the activePlugin as an instance
		if (plugin.isSupported()) {
			s.activePlugin = new plugin();
			return true;
		}
		return false;
	};

	/**
	 * Register a list of Sound plugins, in order of precedence. To register a single plugin, pass a single element in the array.
	 *
	 * <h4>Example</h4>
	 *      createjs.FlashPlugin.swfPath = "../src/SoundJS/";
	 *      createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	 *
	 * @method registerPlugins
	 * @param {Array} plugins An array of plugins classes to install.
	 * @return {Boolean} Whether a plugin was successfully initialized.
	 * @static
	 */
	s.registerPlugins = function (plugins) {
		s._pluginsRegistered = true;
		for (var i = 0, l = plugins.length; i < l; i++) {
			if (s._registerPlugin(plugins[i])) {
				return true;
			}
		}
		return false;
	};

	/**
	 * Initialize the default plugins. This method is automatically called when any audio is played or registered before
	 * the user has manually registered plugins, and enables Sound to work without manual plugin setup. Currently, the
	 * default plugins are {{#crossLink "WebAudioPlugin"}}{{/crossLink}} followed by {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 * 	if (!createjs.initializeDefaultPlugins()) { return; }
	 *
	 * @method initializeDefaultPlugins
	 * @returns {Boolean} True if a plugin was initialized, false otherwise.
	 * @since 0.4.0
	 */
	s.initializeDefaultPlugins = function () {
		if (s.activePlugin != null) {return true;}
		if (s._pluginsRegistered) {return false;}
		if (s.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin])) {return true;}
		return false;
	};

	/**
	 * Determines if Sound has been initialized, and a plugin has been activated.
	 *
	 * <h4>Example</h4>
	 * This example sets up a Flash fallback, but only if there is no plugin specified yet.
	 *
	 * 	if (!createjs.Sound.isReady()) {
	 *		createjs.FlashPlugin.swfPath = "../src/SoundJS/";
	 * 		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	 *	}
	 *
	 * @method isReady
	 * @return {Boolean} If Sound has initialized a plugin.
	 * @static
	 */
	s.isReady = function () {
		return (s.activePlugin != null);
	};

	/**
	 * Get the active plugins capabilities, which help determine if a plugin can be used in the current environment,
	 * or if the plugin supports a specific feature. Capabilities include:
	 * <ul>
	 *     <li><b>panning:</b> If the plugin can pan audio from left to right</li>
	 *     <li><b>volume;</b> If the plugin can control audio volume.</li>
	 *     <li><b>tracks:</b> The maximum number of audio tracks that can be played back at a time. This will be -1
	 *     if there is no known limit.</li>
	 * <br />An entry for each file type in {{#crossLink "Sound/SUPPORTED_EXTENSIONS:property"}}{{/crossLink}}:
	 *     <li><b>mp3:</b> If MP3 audio is supported.</li>
	 *     <li><b>ogg:</b> If OGG audio is supported.</li>
	 *     <li><b>wav:</b> If WAV audio is supported.</li>
	 *     <li><b>mpeg:</b> If MPEG audio is supported.</li>
	 *     <li><b>m4a:</b> If M4A audio is supported.</li>
	 *     <li><b>mp4:</b> If MP4 audio is supported.</li>
	 *     <li><b>aiff:</b> If aiff audio is supported.</li>
	 *     <li><b>wma:</b> If wma audio is supported.</li>
	 *     <li><b>mid:</b> If mid audio is supported.</li>
	 * </ul>
	 * @method getCapabilities
	 * @return {Object} An object containing the capabilities of the active plugin.
	 * @static
	 */
	s.getCapabilities = function () {
		if (s.activePlugin == null) {return null;}
		return s.activePlugin._capabilities;
	};

	/**
	 * Get a specific capability of the active plugin. See {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} for a
	 * full list of capabilities.
	 *
	 * <h4>Example</h4>
	 *      var maxAudioInstances = createjs.Sound.getCapability("tracks");
	 *
	 * @method getCapability
	 * @param {String} key The capability to retrieve
	 * @return {Number|Boolean} The value of the capability.
	 * @static
	 * @see getCapabilities
	 */
	s.getCapability = function (key) {
		if (s.activePlugin == null) {return null;}
		return s.activePlugin._capabilities[key];
	};

	/**
	 * Process manifest items from <a href="http://preloadjs.com" target="_blank">PreloadJS</a>. This method is intended
	 * for usage by a plugin, and not for direct interaction.
	 * @method initLoad
	 * @param {String | Object} src The src or object to load. This is usually a string path, but can also be an
	 * HTMLAudioElement or similar audio playback object.
	 * @param {String} [type] The type of object. Will likely be "sound" or null.
	 * @param {String} [id] An optional user-specified id that is used to play sounds.
	 * @param {Number|String|Boolean|Object} [data] Data associated with the item. Sound uses the data parameter as the
	 * number of channels for an audio instance, however a "channels" property can be appended to the data object if
	 * this property is used for other information. The audio channels will set a default based on plugin if no value is found.
	 * @return {Boolean|Object} An object with the modified values of those that were passed in, or false if the active
	 * plugin can not play the audio type.
	 * @protected
	 * @static
	 */
	s.initLoad = function (src, type, id, data) {
		return s._registerSound(src, id, data);
	};

	/**
	 * Internal method for loading sounds.  This should not be called directly.
	 *
	 * @method _registerSound
	 * @param {String | Object} src The source to load.
	 * @param {String} [id] An id specified by the user to play the sound later.
	 * @param {Number | Object} [data] Data associated with the item. Sound uses the data parameter as the number of
	 * channels for an audio instance, however a "channels" property can be appended to the data object if it is used
	 * for other information. The audio channels will set a default based on plugin if no value is found.
	 * Sound also uses the data property to hold an audioSprite array of objects in the following format {id, startTime, duration}.<br/>
	 *   id used to play the sound later, in the same manner as a sound src with an id.<br/>
	 *   startTime is the initial offset to start playback and loop from, in milliseconds.<br/>
	 *   duration is the amount of time to play the clip for, in milliseconds.<br/>
	 * This allows Sound to support audio sprites that are played back by id.
	 * @return {Object} An object with the modified values that were passed in, which defines the sound.
	 * Returns false if the source cannot be parsed or no plugins can be initialized.
	 * Returns true if the source is already loaded.
	 * @static
	 * @private
	 * @since 0.5.3
	 */

	s._registerSound = function (src, id, data) {
		if (!s.initializeDefaultPlugins()) {return false;}

		var details = s._parsePath(src);
		if (details == null) {return false;}
		details.type = "sound";
		details.id = id;
		details.data = data;

		var numChannels = s.activePlugin.defaultNumChannels || null;
		if (data != null) {
			if (!isNaN(data.channels)) {
				numChannels = parseInt(data.channels);
			} else if (!isNaN(data)) {
				numChannels = parseInt(data);
			}

			if(data.audioSprite) {
				var sp;
				for(var i = data.audioSprite.length; i--; ) {
					sp = data.audioSprite[i];
					s._idHash[sp.id] = {src: details.src, startTime: parseInt(sp.startTime), duration: parseInt(sp.duration)};
				}
			}
		}
		if (id != null) {s._idHash[id] = {src: details.src}};
		var loader = s.activePlugin.register(details.src, numChannels);  // Note only HTML audio uses numChannels

		SoundChannel.create(details.src, numChannels);

		// return the number of instances to the user.  This will also be returned in the load event.
		if (data == null || !isNaN(data)) {
			details.data = numChannels || SoundChannel.maxPerChannel();
		} else {
			details.data.channels = numChannels || SoundChannel.maxPerChannel();
		}

		details.tag = loader.tag;
		if (loader.completeHandler) {details.completeHandler = loader.completeHandler;}
		if (loader.type) {details.type = loader.type;}

		return details;
	};

	/**
	 * Register an audio file for loading and future playback in Sound. This is automatically called when using
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.  It is recommended to register all sounds that
	 * need to be played back in order to properly prepare and preload them. Sound does internal preloading when required.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.alternateExtensions = ["mp3"];
	 *      createjs.Sound.addEventListener("fileload", handleLoad); // add an event listener for when load is completed
	 *      createjs.Sound.registerSound("myAudioPath/mySound.ogg", "myID", 3);
	 *
	 * @method registerSound
	 * @param {String | Object} src The source or an Object with a "src" property
	 * @param {String} [id] An id specified by the user to play the sound later.
	 * @param {Number | Object} [data] Data associated with the item. Sound uses the data parameter as the number of
	 * channels for an audio instance, however a "channels" property can be appended to the data object if it is used
	 * for other information. The audio channels will set a default based on plugin if no value is found.
	 * Sound also uses the data property to hold an audioSprite array of objects in the following format {id, startTime, duration}.<br/>
	 *   id used to play the sound later, in the same manner as a sound src with an id.<br/>
	 *   startTime is the initial offset to start playback and loop from, in milliseconds.<br/>
	 *   duration is the amount of time to play the clip for, in milliseconds.<br/>
	 * This allows Sound to support audio sprites that are played back by id.
	 * @param {string} basePath Set a path that will be prepended to src for loading.
	 * @return {Object} An object with the modified values that were passed in, which defines the sound.
	 * Returns false if the source cannot be parsed or no plugins can be initialized.
	 * Returns true if the source is already loaded.
	 * @static
	 * @since 0.4.0
	 */
	s.registerSound = function (src, id, data, basePath) {
		if (src instanceof Object) {
			basePath = id;
			id = src.id;
			data = src.data;
			src = src.src;
		}

		if (basePath != null) {src = basePath + src;}

		var details = s._registerSound(src, id, data);
		if(!details) {return false;}

		if (!s._preloadHash[details.src]) {	s._preloadHash[details.src] = [];}
		s._preloadHash[details.src].push({src:src, id:id, data:details.data});
		if (s._preloadHash[details.src].length == 1) {
			// OJR note this will disallow reloading a sound if loading fails or the source changes
			s.activePlugin.preload(details.src, details.tag);
		} else {
			if (s._preloadHash[details.src][0] == true) {return true;}
		}

		return details;
	};

	/**
	 * Register a manifest of audio files for loading and future playback in Sound. It is recommended to register all
	 * sounds that need to be played back in order to properly prepare and preload them. Sound does internal preloading
	 * when required.
	 *
	 * <h4>Example</h4>
	 *      var manifest = [
	 *          {src:"asset0.ogg", id:"example"},
	 *          {src:"asset1.ogg", id:"1", data:6},
	 *          {src:"asset2.mp3", id:"works"}
	 *      ];
	 *      createjs.Sound.alternateExtensions = ["mp3"];	// if the passed extension is not supported, try this extension
	 *      createjs.Sound.addEventListener("fileload", handleLoad); // call handleLoad when each sound loads
	 *      createjs.Sound.registerManifest(manifest, assetPath);
	 *
	 * @method registerManifest
	 * @param {Array} manifest An array of objects to load. Objects are expected to be in the format needed for
	 * {{#crossLink "Sound/registerSound"}}{{/crossLink}}: <code>{src:srcURI, id:ID, data:Data}</code>
	 * with "id" and "data" being optional.
	 * @param {string} basePath Set a path that will be prepended to each src when loading.  When creating, playing, or removing
	 * audio that was loaded with a basePath by src, the basePath must be included.
	 * @return {Object} An array of objects with the modified values that were passed in, which defines each sound.
	 * Like registerSound, it will return false for any values when the source cannot be parsed or if no plugins can be initialized.
	 * Also, it will return true for any values when the source is already loaded.
	 * @static
	 * @since 0.4.0
	 */
	s.registerManifest = function (manifest, basePath) {
		var returnValues = [];
		for (var i = 0, l = manifest.length; i < l; i++) {
			returnValues[i] = createjs.Sound.registerSound(manifest[i].src, manifest[i].id, manifest[i].data, basePath);
		}
		return returnValues;
	};

	/**
	 * Remove a sound that has been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * <br />Note this will stop playback on active instances playing this sound before deleting them.
	 * <br />Note if you passed in a basePath, you need to pass it or prepend it to the src here.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.removeSound("myAudioBasePath/mySound.ogg");
	 *      createjs.Sound.removeSound("myID");
	 *
	 * @method removeSound
	 * @param {String | Object} src The src or ID of the audio, or an Object with a "src" property
	 * @param {string} basePath Set a path that will be prepended to each src when removing.
	 * @return {Boolean} True if sound is successfully removed.
	 * @static
	 * @since 0.4.1
	 */
	s.removeSound = function(src, basePath) {
		if (s.activePlugin == null) {return false;}

		if (src instanceof Object) {src = src.src;}
		src = s._getSrcById(src).src;
		if (basePath != null) {src = basePath + src;}

		var details = s._parsePath(src);
		if (details == null) {return false;}
		src = details.src;

		for(var prop in s._idHash){
			if(s._idHash[prop].src == src) {
				delete(s._idHash[prop]);
			}
		}

		// clear from SoundChannel, which also stops and deletes all instances
		SoundChannel.removeSrc(src);

		delete(s._preloadHash[src]);

		s.activePlugin.removeSound(src);

		return true;
	};

	/**
	 * Remove a manifest of audio files that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * <br />Note this will stop playback on active instances playing this audio before deleting them.
	 * <br />Note if you passed in a basePath, you need to pass it or prepend it to the src here.
	 *
	 * <h4>Example</h4>
	 *      var manifest = [
	 *          {src:"asset0.ogg", id:"example"},
	 *          {src:"asset1.ogg", id:"1", data:6},
	 *          {src:"asset2.mp3", id:"works"}
	 *      ];
	 *      createjs.Sound.removeManifest(manifest, assetPath);
	 *
	 * @method removeManifest
	 * @param {Array} manifest An array of objects to remove. Objects are expected to be in the format needed for
	 * {{#crossLink "Sound/removeSound"}}{{/crossLink}}: <code>{srcOrID:srcURIorID}</code>
	 * @param {string} basePath Set a path that will be prepended to each src when removing.
	 * @return {Object} An array of Boolean values representing if the sounds with the same array index in manifest was
	 * successfully removed.
	 * @static
	 * @since 0.4.1
	 */
	s.removeManifest = function (manifest, basePath) {
		var returnValues = [];
		for (var i = 0, l = manifest.length; i < l; i++) {
			returnValues[i] = createjs.Sound.removeSound(manifest[i].src, basePath);
		}
		return returnValues;
	};

	/**
	 * Remove all sounds that have been registered with {{#crossLink "Sound/registerSound"}}{{/crossLink}} or
	 * {{#crossLink "Sound/registerManifest"}}{{/crossLink}}.
	 * <br />Note this will stop playback on all active sound instances before deleting them.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.removeAllSounds();
	 *
	 * @method removeAllSounds
	 * @static
	 * @since 0.4.1
	 */
	s.removeAllSounds = function() {
		s._idHash = {};
		s._preloadHash = {};
		SoundChannel.removeAll();
		if (s.activePlugin) {s.activePlugin.removeAllSounds();}
	};

	/**
	 * Check if a source has been loaded by internal preloaders. This is necessary to ensure that sounds that are
	 * not completed preloading will not kick off a new internal preload if they are played.
	 *
	 * <h4>Example</h4>
	 *     var mySound = "assetPath/asset0.ogg";
	 *     if(createjs.Sound.loadComplete(mySound) {
	 *         createjs.Sound.play(mySound);
	 *     }
	 *
	 * @method loadComplete
	 * @param {String} src The src or id that is being loaded.
	 * @return {Boolean} If the src is already loaded.
	 * @since 0.4.0
	 */
	s.loadComplete = function (src) {
		if (!s.isReady()) { return false; }
		var details = s._parsePath(src);
		if (details) {
			src = s._getSrcById(details.src).src;
		} else {
			src = s._getSrcById(src).src;
		}
		return (s._preloadHash[src][0] == true);  // src only loads once, so if it's true for the first it's true for all
	};

	/**
	 * Parse the path of a sound, usually from a manifest item. alternate extensions will be attempted in order if the
	 * current extension is not supported
	 * @method _parsePath
	 * @param {String} value The path to an audio source.
	 * @return {Object} A formatted object that can be registered with the {{#crossLink "Sound/activePlugin:property"}}{{/crossLink}}
	 * and returned to a preloader like <a href="http://preloadjs.com" target="_blank">PreloadJS</a>.
	 * @protected
	 */
	s._parsePath = function (value) {
		if (typeof(value) != "string") {value = value.toString();}

		var match = value.match(s.FILE_PATTERN);
		if (match == null) {return false;}

		var name = match[4];
		var ext = match[5];
		var c = s.getCapabilities();
		var i = 0;
		while (!c[ext]) {
			ext = s.alternateExtensions[i++];
			if (i > s.alternateExtensions.length) { return null;}	// no extensions are supported
		}
		value = value.replace("."+match[5], "."+ext);

		var ret = {name:name, src:value, extension:ext};
		return ret;
	};

	/* ---------------
	 Static API.
	 --------------- */
	/**
	 * Play a sound and get a {{#crossLink "SoundInstance"}}{{/crossLink}} to control. If the sound fails to play, a
	 * SoundInstance will still be returned, and have a playState of {{#crossLink "Sound/PLAY_FAILED:property"}}{{/crossLink}}.
	 * Note that even on sounds with failed playback, you may still be able to call SoundInstance {{#crossLink "SoundInstance/play"}}{{/crossLink}},
	 * since the failure could be due to lack of available channels. If the src does not have a supported extension or
	 * if there is no available plugin, a default SoundInstance will be returned which will not play any audio, but will not generate errors.
	 *
	 * <h4>Example</h4>
	 *      createjs.Sound.addEventListener("fileload", handleLoad);
	 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
	 *      function handleLoad(event) {
	 *      	createjs.Sound.play("myID");
	 *      	// we can pass in options we want to set inside of an object, and store off SoundInstance for controlling
	 *      	var myInstance = createjs.Sound.play("myID", {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
	 *      	// alternately, we can pass full source path and specify each argument individually
	 *      	var myInstance = createjs.Sound.play("myAudioPath/mySound.mp3", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 1, 0);
	 *      }
	 *
	 * NOTE to create an audio sprite that has not already been registered, both startTime and duration need to be set.
	 * This is only when creating a new audio sprite, not when playing using the id of an already registered audio sprite.
	 *
	 * @method play
	 * @param {String} src The src or ID of the audio.
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior:property"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, pan, startTime, and duration (see the above code sample).
	 * @param {Number} [delay=0] The amount of time to delay the start of audio playback, in milliseconds.
	 * @param {Number} [offset=0] The offset from the start of the audio to begin playback, in milliseconds.
	 * @param {Number} [loop=0] How many times the audio loops when it reaches the end of playback. The default is 0 (no
	 * loops), and -1 can be used for infinite playback.
	 * @param {Number} [volume=1] The volume of the sound, between 0 and 1. Note that the master volume is applied
	 * against the individual volume.
	 * @param {Number} [pan=0] The left-right pan of the sound (if supported), between -1 (left) and 1 (right).
	 * @param {Number} [startTime=null] To create an audio sprite (with duration), the initial offset to start playback and loop from, in milliseconds.
	 * @param {Number} [duration=null] To create an audio sprite (with startTime), the amount of time to play the clip for, in milliseconds.
	 * @return {SoundInstance} A {{#crossLink "SoundInstance"}}{{/crossLink}} that can be controlled after it is created.
	 * @static
	 */
	s.play = function (src, interrupt, delay, offset, loop, volume, pan, startTime, duration) {
		if (interrupt instanceof Object) {
			delay = interrupt.delay;
			offset = interrupt.offset;
			loop = interrupt.loop;
			volume = interrupt.volume;
			pan = interrupt.pan;
			startTime = interrupt.startTime;
			duration = interrupt.duration;
			interrupt = interrupt.interrupt;

		}
		var instance = s.createInstance(src, startTime, duration);
		var ok = s._playInstance(instance, interrupt, delay, offset, loop, volume, pan);
		if (!ok) {instance.playFailed();}
		return instance;
	};

	/**
	 * Creates a {{#crossLink "SoundInstance"}}{{/crossLink}} using the passed in src. If the src does not have a
	 * supported extension or if there is no available plugin, a default SoundInstance will be returned that can be
	 * called safely but does nothing.
	 *
	 * <h4>Example</h4>
	 *      var myInstance = null;
	 *      createjs.Sound.addEventListener("fileload", handleLoad);
	 *      createjs.Sound.registerSound("myAudioPath/mySound.mp3", "myID", 3);
	 *      function handleLoad(event) {
	 *      	myInstance = createjs.Sound.createInstance("myID");
	 *      	// alternately we could call the following
	 *      	myInstance = createjs.Sound.createInstance("myAudioPath/mySound.mp3");
	 *      }
	 *
	 * NOTE to create an audio sprite that has not already been registered, both startTime and duration need to be set.
	 * This is only when creating a new audio sprite, not when playing using the id of an already registered audio sprite.
	 *
	 * @method createInstance
	 * @param {String} src The src or ID of the audio.
	 * @param {Number} [startTime=null] To create an audio sprite (with duration), the initial offset to start playback and loop from, in milliseconds.
	 * @param {Number} [duration=null] To create an audio sprite (with startTime), the amount of time to play the clip for, in milliseconds.
	 * @return {SoundInstance} A {{#crossLink "SoundInstance"}}{{/crossLink}} that can be controlled after it is created.
	 * Unsupported extensions will return the default SoundInstance.
	 * @since 0.4.0
	 */
	s.createInstance = function (src, startTime, duration) {
		if (!s.initializeDefaultPlugins()) {return s._defaultSoundInstance;}

		src = s._getSrcById(src);

		var details = s._parsePath(src.src);

		var instance = null;
		if (details != null && details.src != null) {
			SoundChannel.create(details.src);
			if (startTime == null) {startTime = src.startTime;}
			instance = s.activePlugin.create(details.src, startTime, duration || src.duration);
		} else {
			instance = Sound._defaultSoundInstance;
		}

		instance.uniqueId = s._lastID++;

		return instance;
	};

	/**
	 * Set the master volume of Sound. The master volume is multiplied against each sound's individual volume.  For
	 * example, if master volume is 0.5 and a sound's volume is 0.5, the resulting volume is 0.25. To set individual
	 * sound volume, use SoundInstance {{#crossLink "SoundInstance/setVolume"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.setVolume(0.5);
	 *
	 * @method setVolume
	 * @param {Number} value The master volume value. The acceptable range is 0-1.
	 * @static
	 */
	s.setVolume = function (value) {
		if (Number(value) == null) {return false;}
		value = Math.max(0, Math.min(1, value));
		s._masterVolume = value;
		if (!this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(value)) {
			var instances = this._instances;
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterVolume(value);
			}
		}
	};

	/**
	 * Get the master volume of Sound. The master volume is multiplied against each sound's individual volume.
	 * To get individual sound volume, use SoundInstance {{#crossLink "SoundInstance/volume:property"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     var masterVolume = createjs.Sound.getVolume();
	 *
	 * @method getVolume
	 * @return {Number} The master volume, in a range of 0-1.
	 * @static
	 */
	s.getVolume = function () {
		return s._masterVolume;
	};

	/**
	 * Mute/Unmute all audio. Note that muted audio still plays at 0 volume. This global mute value is maintained
	 * separately and when set will override, but not change the mute property of individual instances. To mute an individual
	 * instance, use SoundInstance {{#crossLink "SoundInstance/setMute"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.setMute(true);
	 *
	 * @method setMute
	 * @param {Boolean} value Whether the audio should be muted or not.
	 * @return {Boolean} If the mute was set.
	 * @static
	 * @since 0.4.0
	 */
	s.setMute = function (value) {
		if (value == null) {return false;}

		this._masterMute = value;
		if (!this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(value)) {
			var instances = this._instances;
			for (var i = 0, l = instances.length; i < l; i++) {
				instances[i].setMasterMute(value);
			}
		}
		return true;
	};

	/**
	 * Returns the global mute value. To get the mute value of an individual instance, use SoundInstance
	 * {{#crossLink "SoundInstance/getMute"}}{{/crossLink}} instead.
	 *
	 * <h4>Example</h4>
	 *     var muted = createjs.Sound.getMute();
	 *
	 * @method getMute
	 * @return {Boolean} The mute value of Sound.
	 * @static
	 * @since 0.4.0
	 */
	s.getMute = function () {
		return this._masterMute;
	};

	/**
	 * Stop all audio (global stop). Stopped audio is reset, and not paused. To play audio that has been stopped,
	 * call SoundInstance {{#crossLink "SoundInstance/play"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *     createjs.Sound.stop();
	 *
	 * @method stop
	 * @static
	 */
	s.stop = function () {
		var instances = this._instances;
		for (var i = instances.length; i--; ) {
			instances[i].stop();  // NOTE stop removes instance from this._instances
		}
	};


	/* ---------------
	 Internal methods
	 --------------- */
	/**
	 * Play an instance. This is called by the static API, as well as from plugins. This allows the core class to
	 * control delays.
	 * @method _playInstance
	 * @param {SoundInstance} instance The {{#crossLink "SoundInstance"}}{{/crossLink}} to start playing.
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by {{#crossLink "Sound/defaultInterruptBehavior"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, and pan (see the above code sample).
	 * @param {Number} [delay=0] Time in milliseconds before playback begins.
	 * @param {Number} [offset=instance.offset] Time into the sound to begin playback in milliseconds.  Defaults to the
	 * current value on the instance.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use 0 for no loops, and -1 for an infinite loop.
	 * @param {Number} [volume] The volume of the sound between 0 and 1. Defaults to current instance value.
	 * @param {Number} [pan] The pan of the sound between -1 and 1. Defaults to current instance value.
	 * @return {Boolean} If the sound can start playing. Sounds that fail immediately will return false. Sounds that
	 * have a delay will return true, but may still fail to play.
	 * @protected
	 * @static
	 */
	s._playInstance = function (instance, interrupt, delay, offset, loop, volume, pan) {
		if (interrupt instanceof Object) {
			delay = interrupt.delay;
			offset = interrupt.offset;
			loop = interrupt.loop;
			volume = interrupt.volume;
			pan = interrupt.pan;
			interrupt = interrupt.interrupt;
		}

		interrupt = interrupt || s.defaultInterruptBehavior;
		if (delay == null) {delay = 0;}
		if (offset == null) {offset = instance.getPosition();}
		if (loop == null) {loop = instance.loop;}
		if (volume == null) {volume = instance.volume;}
		if (pan == null) {pan = instance.pan;}

		if (delay == 0) {
			var ok = s._beginPlaying(instance, interrupt, offset, loop, volume, pan);
			if (!ok) {return false;}
		} else {
			//Note that we can't pass arguments to proxy OR setTimeout (IE only), so just wrap the function call.
			// OJR WebAudio may want to handle this differently, so it might make sense to move this functionality into the plugins in the future
			var delayTimeoutId = setTimeout(function () {
				s._beginPlaying(instance, interrupt, offset, loop, volume, pan);
			}, delay);
			instance._delayTimeoutId = delayTimeoutId;
		}

		this._instances.push(instance);

		return true;
	};

	/**
	 * Begin playback. This is called immediately or after delay by {{#crossLink "Sound/playInstance"}}{{/crossLink}}.
	 * @method _beginPlaying
	 * @param {SoundInstance} instance A {{#crossLink "SoundInstance"}}{{/crossLink}} to begin playback.
	 * @param {String} [interrupt=none] How this sound interrupts other instances with the same source. Defaults to
	 * {{#crossLink "Sound/INTERRUPT_NONE:property"}}{{/crossLink}}. Interrupts are defined as <code>INTERRUPT_TYPE</code>
	 * constants on Sound.
	 * @param {Number} [offset] Time in milliseconds into the sound to begin playback.  Defaults to the current value on
	 * the instance.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use 0 for no loops, and -1 for an infinite loop.
	 * @param {Number} [volume] The volume of the sound between 0 and 1. Defaults to the current value on the instance.
	 * @param {Number} [pan=instance.pan] The pan of the sound between -1 and 1. Defaults to current instance value.
	 * @return {Boolean} If the sound can start playing. If there are no available channels, or the instance fails to
	 * start, this will return false.
	 * @protected
	 * @static
	 */
	s._beginPlaying = function (instance, interrupt, offset, loop, volume, pan) {
		if (!SoundChannel.add(instance, interrupt)) {
			return false;
		}
		var result = instance._beginPlaying(offset, loop, volume, pan);
		if (!result) {
			var index = createjs.indexOf(this._instances, instance);
			if (index > -1) {this._instances.splice(index, 1);}
			return false;
		}
		return true;
	};

	/**
	 * Get the source of a sound via the ID passed in with a register call. If no ID is found the value is returned
	 * instead.
	 * @method _getSrcById
	 * @param {String} value The ID the sound was registered with.
	 * @return {String} The source of the sound if it has been registered with this ID or the value that was passed in.
	 * @protected
	 * @static
	 */
	s._getSrcById = function (value) {
		return s._idHash[value] || {src: value};
	};

	/**
	 * A sound has completed playback, been interrupted, failed, or been stopped. This method removes the instance from
	 * Sound management. It will be added again, if the sound re-plays. Note that this method is called from the
	 * instances themselves.
	 * @method _playFinished
	 * @param {SoundInstance} instance The instance that finished playback.
	 * @protected
	 * @static
	 */
	s._playFinished = function (instance) {
		SoundChannel.remove(instance);
		var index = createjs.indexOf(this._instances, instance);
		if (index > -1) {this._instances.splice(index, 1);}	// OJR this will always be > -1, there is no way for an instance to exist without being added to this._instances
	};

	createjs.Sound = Sound;

	/**
	 * An internal class that manages the number of active {{#crossLink "SoundInstance"}}{{/crossLink}} instances for
	 * each sound type. This method is only used internally by the {{#crossLink "Sound"}}{{/crossLink}} class.
	 *
	 * The number of sounds is artificially limited by Sound in order to prevent over-saturation of a
	 * single sound, as well as to stay within hardware limitations, although the latter may disappear with better
	 * browser support.
	 *
	 * When a sound is played, this class ensures that there is an available instance, or interrupts an appropriate
	 * sound that is already playing.
	 * #class SoundChannel
	 * @param {String} src The source of the instances
	 * @param {Number} [max=1] The number of instances allowed
	 * @constructor
	 * @protected
	 */
	function SoundChannel(src, max) {
		this.init(src, max);
	}

	/* ------------
	 Static API
	 ------------ */
	/**
	 * A hash of channel instances indexed by source.
	 * #property channels
	 * @type {Object}
	 * @static
	 */
	SoundChannel.channels = {};

	/**
	 * Create a sound channel. Note that if the sound channel already exists, this will fail.
	 * #method create
	 * @param {String} src The source for the channel
	 * @param {Number} max The maximum amount this channel holds. The default is {{#crossLink "SoundChannel.maxDefault"}}{{/crossLink}}.
	 * @return {Boolean} If the channels were created.
	 * @static
	 */
	SoundChannel.create = function (src, max) {
		var channel = SoundChannel.get(src);
		if (channel == null) {
			SoundChannel.channels[src] = new SoundChannel(src, max);
			return true;
		}
		return false;
	};
	/**
	 * Delete a sound channel, stop and delete all related instances. Note that if the sound channel does not exist, this will fail.
	 * #method remove
	 * @param {String} src The source for the channel
	 * @return {Boolean} If the channels were deleted.
	 * @static
	 */
	SoundChannel.removeSrc = function (src) {
		var channel = SoundChannel.get(src);
		if (channel == null) {return false;}
		channel._removeAll();	// this stops and removes all active instances
		delete(SoundChannel.channels[src]);
		return true;
	};
	/**
	 * Delete all sound channels, stop and delete all related instances.
	 * #method removeAll
	 * @static
	 */
	SoundChannel.removeAll = function () {
		for(var channel in SoundChannel.channels) {
			SoundChannel.channels[channel]._removeAll();	// this stops and removes all active instances
		}
		SoundChannel.channels = {};
	};
	/**
	 * Add an instance to a sound channel.
	 * #method add
	 * @param {SoundInstance} instance The instance to add to the channel
	 * @param {String} interrupt The interrupt value to use. Please see the {{#crossLink "Sound/play"}}{{/crossLink}}
	 * for details on interrupt modes.
	 * @return {Boolean} The success of the method call. If the channel is full, it will return false.
	 * @static
	 */
	SoundChannel.add = function (instance, interrupt) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {return false;}
		return channel._add(instance, interrupt);
	};
	/**
	 * Remove an instance from the channel.
	 * #method remove
	 * @param {SoundInstance} instance The instance to remove from the channel
	 * @return The success of the method call. If there is no channel, it will return false.
	 * @static
	 */
	SoundChannel.remove = function (instance) {
		var channel = SoundChannel.get(instance.src);
		if (channel == null) {return false;}
		channel._remove(instance);
		return true;
	};
	/**
	 * Get the maximum number of sounds you can have in a channel.
	 * #method maxPerChannel
	 * @return {Number} The maximum number of sounds you can have in a channel.
	 */
	SoundChannel.maxPerChannel = function () {
		return p.maxDefault;
	};
	/**
	 * Get a channel instance by its src.
	 * #method get
	 * @param {String} src The src to use to look up the channel
	 * @static
	 */
	SoundChannel.get = function (src) {
		return SoundChannel.channels[src];
	};

	var p = SoundChannel.prototype;
	p.constructor = SoundChannel;

	/**
	 * The source of the channel.
	 * #property src
	 * @type {String}
	 */
	p.src = null;

	/**
	 * The maximum number of instances in this channel.  -1 indicates no limit
	 * #property max
	 * @type {Number}
	 */
	p.max = null;

	/**
	 * The default value to set for max, if it isn't passed in.  Also used if -1 is passed.
	 * #property maxDefault
	 * @type {Number}
	 * @default 100
	 * @since 0.4.0
	 */
	p.maxDefault = 100;

	/**
	 * The current number of active instances.
	 * #property length
	 * @type {Number}
	 */
	p.length = 0;

	/**
	 * Initialize the channel.
	 * #method init
	 * @param {String} src The source of the channel
	 * @param {Number} max The maximum number of instances in the channel
	 * @protected
	 */
	p.init = function (src, max) {
		this.src = src;
		this.max = max || this.maxDefault;
		if (this.max == -1) {this.max = this.maxDefault;}
		this._instances = [];
	};

	/**
	 * Get an instance by index.
	 * #method get
	 * @param {Number} index The index to return.
	 * @return {SoundInstance} The SoundInstance at a specific instance.
	 */
	p._get = function (index) {
		return this._instances[index];
	};

	/**
	 * Add a new instance to the channel.
	 * #method add
	 * @param {SoundInstance} instance The instance to add.
	 * @return {Boolean} The success of the method call. If the channel is full, it will return false.
	 */
	p._add = function (instance, interrupt) {
		if (!this._getSlot(interrupt, instance)) {return false;}
		this._instances.push(instance);
		this.length++;
		return true;
	};

	/**
	 * Remove an instance from the channel, either when it has finished playing, or it has been interrupted.
	 * #method remove
	 * @param {SoundInstance} instance The instance to remove
	 * @return {Boolean} The success of the remove call. If the instance is not found in this channel, it will
	 * return false.
	 */
	p._remove = function (instance) {
		var index = createjs.indexOf(this._instances, instance);
		if (index == -1) {return false;}
		this._instances.splice(index, 1);
		this.length--;
		return true;
	};

	/**
	 * Stop playback and remove all instances from the channel.  Usually in response to a delete call.
	 * #method removeAll
	 */
	p._removeAll = function () {
		// Note that stop() removes the item from the list
		for (var i=this.length-1; i>=0; i--) {
			this._instances[i].stop();
		}
	};

	/**
	 * Get an available slot depending on interrupt value and if slots are available.
	 * #method getSlot
	 * @param {String} interrupt The interrupt value to use.
	 * @param {SoundInstance} instance The sound instance that will go in the channel if successful.
	 * @return {Boolean} Determines if there is an available slot. Depending on the interrupt mode, if there are no slots,
	 * an existing SoundInstance may be interrupted. If there are no slots, this method returns false.
	 */
	p._getSlot = function (interrupt, instance) {
		var target, replacement;

		if (interrupt != Sound.INTERRUPT_NONE) {
			// First replacement candidate
			replacement = this._get(0);
			if (replacement == null) {
				return true;
			}
		}

		for (var i = 0, l = this.max; i < l; i++) {
			target = this._get(i);

			// Available Space
			if (target == null) {
				return true;
			}

			// Audio is complete or not playing
			if (target.playState == Sound.PLAY_FINISHED ||
				target.playState == Sound.PLAY_INTERRUPTED ||
				target.playState == Sound.PLAY_FAILED) {
				replacement = target;
				break;
			}

			if (interrupt == Sound.INTERRUPT_NONE) {
				continue;
			}

			// Audio is a better candidate than the current target, according to playhead
			if ((interrupt == Sound.INTERRUPT_EARLY && target.getPosition() < replacement.getPosition()) ||
				(interrupt == Sound.INTERRUPT_LATE && target.getPosition() > replacement.getPosition())) {
					replacement = target;
			}
		}

		if (replacement != null) {
			replacement._interrupt();
			this._remove(replacement);
			return true;
		}
		return false;
	};

	p.toString = function () {
		return "[Sound SoundChannel]";
	};

	// do not add SoundChannel to namespace


	// This is a dummy sound instance, which allows Sound to return something so developers don't need to check nulls.
	function SoundInstance() {
		this.isDefault = true;
		this.addEventListener = this.on = this.off = this.removeEventListener = this.removeAllEventListeners = this.dispatchEvent = this.hasEventListener = this._listeners = this._interrupt = this._playFailed = this.pause = this.resume = this.play = this._beginPlaying = this._cleanUp = this.stop = this.setMasterVolume = this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = this.playFailed = function () {
			return false;
		};
		this.getVolume = this.getPan = this.getDuration = function () {
			return 0;
		}
		this.playState = Sound.PLAY_FAILED;
		this.toString = function () {
			return "[Sound Default Sound Instance]";
		}
	}

	Sound._defaultSoundInstance = new SoundInstance();


	/**
	 * An additional module to determine the current browser, version, operating system, and other environment
	 * variables. It is not publically documented.
	 * #class BrowserDetect
	 * @param {Boolean} isFirefox True if our browser is Firefox.
	 * @param {Boolean} isOpera True if our browser is opera.
	 * @param {Boolean} isChrome True if our browser is Chrome.  Note that Chrome for Android returns true, but is a
	 * completely different browser with different abilities.
	 * @param {Boolean} isIOS True if our browser is safari for iOS devices (iPad, iPhone, and iPad).
	 * @param {Boolean} isAndroid True if our browser is Android.
	 * @param {Boolean} isBlackberry True if our browser is Blackberry.
	 * @constructor
	 * @static
	 */
	function BrowserDetect() {
	}

	BrowserDetect.init = function () {
		var agent = window.navigator.userAgent;
		BrowserDetect.isWindowPhone =  (agent.indexOf("IEMobile") > -1) || (agent.indexOf("Windows Phone") > -1);
		BrowserDetect.isFirefox = (agent.indexOf("Firefox") > -1);
		BrowserDetect.isOpera = (window.opera != null);
		BrowserDetect.isChrome = (agent.indexOf("Chrome") > -1);  // NOTE that Chrome on Android returns true but is a completely different browser with different abilities
		BrowserDetect.isIOS = (agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1) && !BrowserDetect.isWindowPhone;
		BrowserDetect.isAndroid = (agent.indexOf("Android") > -1);
		BrowserDetect.isBlackberry = (agent.indexOf("Blackberry") > -1);
	};

	BrowserDetect.init();

	createjs.Sound.BrowserDetect = BrowserDetect;

}());
/*
 * WebAudioPlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module SoundJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using Web Audio in the browser. The WebAudioPlugin is currently the default plugin, and will be used
	 * anywhere that it is supported. To change plugin priority, check out the Sound API
	 * {{#crossLink "Sound/registerPlugins"}}{{/crossLink}} method.

	 * <h4>Known Browser and OS issues for Web Audio</h4>
	 * <b>Firefox 25</b>
	 * <ul><li>mp3 audio files do not load properly on all windows machines, reported
	 * <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=929969" target="_blank">here</a>. </br>
	 * For this reason it is recommended to pass another FF supported type (ie ogg) first until this bug is resolved, if possible.</li></ul>
	 * <br />
	 * <b>Webkit (Chrome and Safari)</b>
	 * <ul><li>AudioNode.disconnect does not always seem to work.  This can cause the file size to grow over time if you
	 * are playing a lot of audio files.</li></ul>
	 * <br />
	 * <b>iOS 6 limitations</b>
	 * 	<ul><li>Sound is initially muted and will only unmute through play being called inside a user initiated event (touch/click).</li>
	 *	<li>A bug exists that will distort uncached audio when a video element is present in the DOM.  You can avoid this bug
	 * 	by ensuring the audio and video audio share the same sampleRate.</li>
	 * </ul>
	 * @class WebAudioPlugin
	 * @constructor
	 * @since 0.4.0
	 */
	function WebAudioPlugin() {
		this._init();
	}


	var s = WebAudioPlugin;

	/**
	 * The capabilities of the plugin. This is generated via the {{#crossLink "WebAudioPlugin/_generateCapabilities:method"}}{{/crossLink}}
	 * method and is used internally.
	 * @property _capabilities
	 * @type {Object}
	 * @default null
	 * @protected
	 * @static
	 */
	s._capabilities = null;

	/**
	 * Determine if the plugin can be used in the current browser/OS.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		// check if this is some kind of mobile device, Web Audio works with local protocol under PhoneGap and it is unlikely someone is trying to run a local file
		var isMobilePhoneGap = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry;
		// OJR isMobile may be redundant with _isFileXHRSupported available.  Consider removing.
		if (location.protocol == "file:" && !isMobilePhoneGap && !this._isFileXHRSupported()) { return false; }  // Web Audio requires XHR, which is not usually available locally
		s._generateCapabilities();
		if (s.context == null) {return false;}
		return true;
	};

	/**
	 * Determine if XHR is supported, which is necessary for web audio.
	 * @method _isFileXHRSupported
	 * @return {Boolean} If XHR is supported.
	 * @since 0.4.2
	 * @protected
	 * @static
	 */
	s._isFileXHRSupported = function() {
		// it's much easier to detect when something goes wrong, so let's start optimistically
		var supported = true;

		var xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", "WebAudioPluginTest.fail", false); // loading non-existant file triggers 404 only if it could load (synchronous call)
		} catch (error) {
			// catch errors in cases where the onerror is passed by
			supported = false;
			return supported;
		}
		xhr.onerror = function() { supported = false; }; // cause irrelevant
		// with security turned off, we can get empty success results, which is actually a failed read (status code 0?)
		xhr.onload = function() { supported = this.status == 404 || (this.status == 200 || (this.status == 0 && this.response != "")); };
		try {
			xhr.send();
		} catch (error) {
			// catch errors in cases where the onerror is passed by
			supported = false;
		}

		return supported;
	};

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method _generateCapabilities
	 * @static
	 * @protected
	 */
	s._generateCapabilities = function () {
		if (s._capabilities != null) {return;}
		// Web Audio can be in any formats supported by the audio element, from http://www.w3.org/TR/webaudio/#AudioContext-section
		var t = document.createElement("audio");
		if (t.canPlayType == null) {return null;}

		if (window.AudioContext) {
			s.context = new AudioContext();
		} else if (window.webkitAudioContext) {
			s.context = new webkitAudioContext();
		} else {
			return null;
		}

		s._compatibilitySetUp();

		// playing this inside of a touch event will enable audio on iOS, which starts muted
		s.playEmptySound();

		s._capabilities = {
			panning:true,
			volume:true,
			tracks:-1
		};

		// determine which extensions our browser supports for this plugin by iterating through Sound.SUPPORTED_EXTENSIONS
		var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s._capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  // OJR another way to do this might be canPlayType:"m4a", codex: mp4

		// 0=no output, 1=mono, 2=stereo, 4=surround, 6=5.1 surround.
		// See http://www.w3.org/TR/webaudio/#AudioChannelSplitter for more details on channels.
		if (s.context.destination.numberOfChannels < 2) {
			s._capabilities.panning = false;
		}
	};

	/**
	 * Set up compatibility if only deprecated web audio calls are supported.
	 * See http://www.w3.org/TR/webaudio/#DeprecationNotes
	 * Needed so we can support new browsers that don't support deprecated calls (Firefox) as well as old browsers that
	 * don't support new calls.
	 *
	 * @method _compatibilitySetUp
	 * @static
	 * @protected
	 * @since 0.4.2
	 */
	s._compatibilitySetUp = function() {
		s._panningModel = "equalpower";
		//assume that if one new call is supported, they all are
		if (s.context.createGain) { return; }

		// simple name change, functionality the same
		s.context.createGain = s.context.createGainNode;

		// source node, add to prototype
		var audioNode = s.context.createBufferSource();
		audioNode.__proto__.start = audioNode.__proto__.noteGrainOn;	// note that noteGrainOn requires all 3 parameters
		audioNode.__proto__.stop = audioNode.__proto__.noteOff;

		// panningModel
		s._panningModel = 0;
	};

	/**
	 * Plays an empty sound in the web audio context.  This is used to enable web audio on iOS devices, as they
	 * require the first sound to be played inside of a user initiated event (touch/click).  This is called when
	 * {{#crossLink "WebAudioPlugin"}}{{/crossLink}} is initialized (by Sound {{#crossLink "Sound/initializeDefaultPlugins"}}{{/crossLink}}
	 * for example).
	 *
	 * <h4>Example</h4>
	 *     function handleTouch(event) {
	 *         createjs.WebAudioPlugin.playEmptySound();
	 *     }
	 *
	 * @method playEmptySound
	 * @static
	 * @since 0.4.1
	 */
	s.playEmptySound = function() {
		var source = s.context.createBufferSource();
		source.buffer = s.context.createBuffer(1, 1, 22050);
		source.connect(s.context.destination);
		source.start(0, 0, 0);
	};


	var p = WebAudioPlugin.prototype;
	p.constructor = WebAudioPlugin;

	p._capabilities = null; // doc'd above

	/**
	 * The internal master volume value of the plugin.
	 * @property _volume
	 * @type {Number}
	 * @default 1
	 * @protected
	 */
	p._volume = 1;

	/**
	 * The web audio context, which WebAudio uses to play audio. All nodes that interact with the WebAudioPlugin
	 * need to be created within this context.
	 * @property context
	 * @type {AudioContext}
	 */
	p.context = null;

	/**
	 * Value to set panning model to equal power for SoundInstance.  Can be "equalpower" or 0 depending on browser implementation.
	 * @property _panningModel
	 * @type {Number / String}
	 * @protected
	 */
	p._panningModel = "equalpower";

	/**
	 * A DynamicsCompressorNode, which is used to improve sound quality and prevent audio distortion.
	 * It is connected to <code>context.destination</code>.
	 *
	 * Can be accessed by advanced users through createjs.Sound.activePlugin.dynamicsCompressorNode.
	 * @property dynamicsCompressorNode
	 * @type {AudioNode}
	 */
	p.dynamicsCompressorNode = null;

	/**
	 * A GainNode for controlling master volume. It is connected to {{#crossLink "WebAudioPlugin/dynamicsCompressorNode:property"}}{{/crossLink}}.
	 *
	 * Can be accessed by advanced users through createjs.Sound.activePlugin.gainNode.
	 * @property gainNode
	 * @type {AudioGainNode}
	 */
	p.gainNode = null;

	/**
	 * An object hash used internally to store ArrayBuffers, indexed by the source URI used to load it. This
	 * prevents having to load and decode audio files more than once. If a load has been started on a file,
	 * <code>arrayBuffers[src]</code> will be set to true. Once load is complete, it is set the the loaded
	 * ArrayBuffer instance.
	 * @property _arrayBuffers
	 * @type {Object}
	 * @protected
	 */
	p._arrayBuffers = null;

	/**
	 * An initialization function run by the constructor
	 * @method _init
	 * @protected
	 */
	p._init = function () {
		this._capabilities = s._capabilities;
		this._arrayBuffers = {};

		this.context = s.context;
		this._panningModel = s._panningModel;

		// set up AudioNodes that all of our source audio will connect to
		this.dynamicsCompressorNode = this.context.createDynamicsCompressor();
		this.dynamicsCompressorNode.connect(this.context.destination);
		this.gainNode = this.context.createGain();
		this.gainNode.connect(this.dynamicsCompressorNode);
	};

	/**
	 * Pre-register a sound for preloading and setup. This is called by {{#crossLink "Sound"}}{{/crossLink}}.
	 * Note that WebAudio provides a <code>Loader</code> instance, which <a href="http://preloadjs.com" target="_blank">PreloadJS</a>
	 * can use to assist with preloading.
	 * @method register
	 * @param {String} src The source of the audio
	 * @param {Number} instances The number of concurrently playing instances to allow for the channel at any time.
	 * Note that the WebAudioPlugin does not manage this property.
	 * @return {Object} A result object, containing a "tag" for preloading purposes.
	 */
	p.register = function (src, instances) {
		this._arrayBuffers[src] = true;
		var loader = {tag: new createjs.WebAudioPlugin.Loader(src, this)};
		return loader;
	};

	/**
	 * Checks if preloading has started for a specific source. If the source is found, we can assume it is loading,
	 * or has already finished loading.
	 * @method isPreloadStarted
	 * @param {String} src The sound URI to check.
	 * @return {Boolean}
	 */
	p.isPreloadStarted = function (src) {
		return (this._arrayBuffers[src] != null);
	};

	/**
	 * Checks if preloading has finished for a specific source.
	 * @method isPreloadComplete
	 * @param {String} src The sound URI to load.
	 * @return {Boolean}
	 */
	p.isPreloadComplete = function (src) {
		return (!(this._arrayBuffers[src] == null || this._arrayBuffers[src] == true));
	};

	/**
	 * Remove a sound added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeSound
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeSound = function (src) {
		delete(this._arrayBuffers[src]);
	};

	/**
	 * Remove all sounds added using {{#crossLink "WebAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeAllSounds
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeAllSounds = function () {
		this._arrayBuffers = {};
	};

	/**
	 * Add loaded results to the preload object hash.
	 * @method addPreloadResults
	 * @param {String} src The sound URI to unload.
	 * @return {Boolean}
	 */
	p.addPreloadResults = function (src, result) {
		this._arrayBuffers[src] = result;
	};

	/**
	 * Handles internal preload completion.
	 * @method _handlePreloadComplete
	 * @protected
	 */
	p._handlePreloadComplete = function (loader) {
		createjs.Sound._sendFileLoadEvent(loader.src);
		loader.cleanUp();
	};

	/**
	 * Internally preload a sound. Loading uses XHR2 to load an array buffer for use with WebAudio.
	 * @method preload
	 * @param {String} src The sound URI to load.
	 * @param {Object} tag Not used in this plugin.
	 */
	p.preload = function (src, tag) {
		this._arrayBuffers[src] = true;
		var loader = new createjs.WebAudioPlugin.Loader(src, this);
		loader.onload = this._handlePreloadComplete;
		loader.load();
	};

	/**
	 * Create a sound instance. If the sound has not been preloaded, it is internally preloaded here.
	 * @method create
	 * @param {String} src The sound source to use.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @return {SoundInstance} A sound instance for playback and control.
	 */
	p.create = function (src, startTime, duration) {
		if (!this.isPreloadStarted(src)) {this.preload(src);}
		return new createjs.WebAudioPlugin.SoundInstance(src, startTime, duration, this);
	};

	/**
	 * Set the master volume of the plugin, which affects all SoundInstances.
	 * @method setVolume
	 * @param {Number} value The volume to set, between 0 and 1.
	 * @return {Boolean} If the plugin processes the setVolume call (true). The Sound class will affect all the
	 * instances manually otherwise.
	 */
	p.setVolume = function (value) {
		this._volume = value;
		this._updateVolume();
		return true;
	};

	/**
	 * Set the gain value for master audio. Should not be called externally.
	 * @method _updateVolume
	 * @protected
	 */
	p._updateVolume = function () {
		var newVolume = createjs.Sound._masterMute ? 0 : this._volume;
		if (newVolume != this.gainNode.gain.value) {
			this.gainNode.gain.value = newVolume;
		}
	};

	/**
	 * Get the master volume of the plugin, which affects all SoundInstances.
	 * @method getVolume
	 * @return The volume level, between 0 and 1.
	 */
	p.getVolume = function () {
		return this._volume;
	};

	/**
	 * Mute all sounds via the plugin.
	 * @method setMute
	 * @param {Boolean} value If all sound should be muted or not. Note that plugin-level muting just looks up
	 * the mute value of Sound {{#crossLink "Sound/getMute"}}{{/crossLink}}, so this property is not used here.
	 * @return {Boolean} If the mute call succeeds.
	 */
	p.setMute = function (value) {
		this._updateVolume();
		return true;
	};

	p.toString = function () {
		return "[WebAudioPlugin]";
	};

	createjs.WebAudioPlugin = WebAudioPlugin;
}());

(function () {

	"use strict";

	/**
	 * A SoundInstance is created when any calls to the Sound API method {{#crossLink "Sound/play"}}{{/crossLink}} or
	 * {{#crossLink "Sound/createInstance"}}{{/crossLink}} are made. The SoundInstance is returned by the active plugin
	 * for control by the user.
	 *
	 * <h4>Example</h4>
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *
	 * A number of additional parameters provide a quick way to determine how a sound is played. Please see the Sound
	 * API method {{#crossLink "Sound/play"}}{{/crossLink}} for a list of arguments.
	 *
	 * Once a SoundInstance is created, a reference can be stored that can be used to control the audio directly through
	 * the SoundInstance. If the reference is not stored, the SoundInstance will play out its audio (and any loops), and
	 * is then de-referenced from the {{#crossLink "Sound"}}{{/crossLink}} class so that it can be cleaned up. If audio
	 * playback has completed, a simple call to the {{#crossLink "SoundInstance/play"}}{{/crossLink}} instance method
	 * will rebuild the references the Sound class need to control it.
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3", {loop:2});
	 *      myInstance.addEventListener("loop", handleLoop);
	 *      function handleLoop(event) {
	 *          myInstance.volume = myInstance.volume * 0.5;
	 *      }
	 *
	 * Events are dispatched from the instance to notify when the sound has completed, looped, or when playback fails
	 *
	 *      var myInstance = createjs.Sound.play("myAssetPath/mySrcFile.mp3");
	 *      myInstance.addEventListener("complete", handleComplete);
	 *      myInstance.addEventListener("loop", handleLoop);
	 *      myInstance.addEventListener("failed", handleFailed);
	 *
	 *
	 * @class SoundInstance
	 * @param {String} src The path to and file name of the sound.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @param {Object} owner The plugin instance that created this SoundInstance.
	 * @extends EventDispatcher
	 * @constructor
	 */
	function SoundInstance(src, startTime, duration, owner) {
		this._init(src, startTime, duration, owner);
	}

	var p = SoundInstance.prototype = new createjs.EventDispatcher();
	p.constructor = SoundInstance;

	/**
	 * The source of the sound.
	 * @property src
	 * @type {String}
	 * @default null
	 */
	p.src = null;

	/**
	 * The unique ID of the instance. This is set by {{#crossLink "Sound"}}{{/crossLink}}.
	 * @property uniqueId
	 * @type {String} | Number
	 * @default -1
	 */
	p.uniqueId = -1;

	/**
	 * The play state of the sound. Play states are defined as constants on {{#crossLink "Sound"}}{{/crossLink}}.
	 * @property playState
	 * @type {String}
	 * @default null
	 */
	p.playState = null;

	/**
	 * The plugin that created the instance
	 * @property _owner
	 * @type {WebAudioPlugin}
	 * @default null
	 * @protected
	 */
	p._owner = null;

	/**
	 * How far into the sound to begin playback in milliseconds. This is passed in when play is called and used by
	 * pause and setPosition to track where the sound should be at.
	 * Note this is converted from milliseconds to seconds for consistency with the WebAudio API.
	 * @property _offset
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p._offset = 0;

	/**
	 * Audio sprite property used to determine the starting offset.
	 * @type {Number}
	 * @default null
	 * @protected
	 */
	p._startTime = 0;

	/**
	 * The volume of the sound, between 0 and 1.
	 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower and Opera versions 11.50 or lower,
	 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "SoundInstance/setVolume"}}{{/crossLink}} and {{#crossLink "SoundInstance/getVolume"}}{{/crossLink}}.
	 *
	 * The actual output volume of a sound can be calculated using:
	 * <code>myInstance.volume * createjs.Sound.getVolume();</code>
	 *
	 * @property volume
	 * @type {Number}
	 * @default 1
	 */
	p._volume =  1;
	if (createjs.definePropertySupported) {
		Object.defineProperty(p, "volume", {
		get: function() {
			return this._volume;
		},
		set: function(value) {
			if (Number(value) == null) {return false}
			value = Math.max(0, Math.min(1, value));
			this._volume = value;
			this._updateVolume();
		}
		});
	}

	/**
	 * The pan of the sound, between -1 (left) and 1 (right). Note that pan is not supported by HTML Audio.
	 *
	 * <br />Note this uses a getter setter, which is not supported by Firefox versions 3.6 or lower, Opera versions 11.50 or lower,
	 * and Internet Explorer 8 or lower.  Instead use {{#crossLink "SoundInstance/setPan"}}{{/crossLink}} and {{#crossLink "SoundInstance/getPan"}}{{/crossLink}}.
	 * <br />Note in WebAudioPlugin this only gives us the "x" value of what is actually 3D audio.
	 *
	 * @property pan
	 * @type {Number}
	 * @default 0
	 */
	p._pan =  0;
	if (createjs.definePropertySupported) {
		Object.defineProperty(p, "pan", {
			get: function() {
				return this._pan;
			},
			set: function(value) {
				if (!this._owner._capabilities.panning || Number(value) == null) {return false;}

				value = Math.max(-1, Math.min(1, value));	// force pan to stay in the -1 to 1 range
				// Note that panning in WebAudioPlugin can support 3D audio, but our implementation does not.
				this._pan = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
				this.panNode.setPosition(value, 0, -0.5);  // z need to be -0.5 otherwise the sound only plays in left, right, or center
			}
		});
	}

/**
	 * The length of the audio clip, in milliseconds.
	 * Use {{#crossLink "SoundInstance/getDuration:method"}}{{/crossLink}} to access.
	 * @property _duration
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p._duration = 0;

	/**
	 * The number of play loops remaining. Negative values will loop infinitely.
	 *
	 * @property loop
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	p._remainingLoops = 0;
	if (createjs.definePropertySupported) {
		Object.defineProperty(p, "loop", {
			get: function() {
				return this._remainingLoops;
			},
			set: function(value) {
				// remove looping
				if (this._remainingLoops != 0 && value == 0) {
					this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
				}
				// add looping
				if (this._remainingLoops == 0 && value != 0) {
					this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
				}
				this._remainingLoops = value;
			}
		});
	}

	/**
	 * A Timeout created by {{#crossLink "Sound"}}{{/crossLink}} when this SoundInstance is played with a delay.
	 * This allows SoundInstance to remove the delay if stop, pause, or cleanup are called before playback begins.
	 * @property _delayTimeoutId
	 * @type {timeoutVariable}
	 * @default null
	 * @protected
	 * @since 0.4.0
	 */
	p._delayTimeoutId = null;

	/**
	 * Timeout that is created internally to handle sound playing to completion. Stored so we can remove it when
	 * stop, pause, or cleanup are called
	 * @property _soundCompleteTimeout
	 * @type {timeoutVariable}
	 * @default null
	 * @protected
	 * @since 0.4.0
	 */
	p._soundCompleteTimeout = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * <br />GainNode for controlling <code>SoundInstance</code> volume. Connected to the WebAudioPlugin {{#crossLink "WebAudioPlugin/gainNode:property"}}{{/crossLink}}
	 * that sequences to <code>context.destination</code>.
	 * @property gainNode
	 * @type {AudioGainNode}
	 * @since 0.4.0
	 *
	 */
	p.gainNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * <br />A panNode allowing left and right audio channel panning only. Connected to SoundInstance {{#crossLink "SoundInstance/gainNode:property"}}{{/crossLink}}.
	 * @property panNode
	 * @type {AudioPannerNode}
	 * @since 0.4.0
	 */
	p.panNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * <br />sourceNode is the audio source. Connected to SoundInstance {{#crossLink "SoundInstance/panNode:property"}}{{/crossLink}}.
	 * @property sourceNode
	 * @type {AudioNode}
	 * @since 0.4.0
	 *
	 */
	p.sourceNode = null;

	/**
	 * NOTE this only exists as a {{#crossLink "WebAudioPlugin"}}{{/crossLink}} property and is only intended for use by advanced users.
	 * _sourceNodeNext is the audio source for the next loop, inserted in a look ahead approach to allow for smooth
	 * looping. Connected to {{#crossLink "SoundInstance/gainNode:property"}}{{/crossLink}}.
	 * @property _sourceNodeNext
	 * @type {AudioNode}
	 * @default null
	 * @protected
	 * @since 0.4.1
	 *
	 */
	p._sourceNodeNext = null;

	/**
	 * Determines if the audio is currently muted.
	 * Use {{#crossLink "SoundInstance/getMute:method"}}{{/crossLink}} and {{#crossLink "SoundInstance/setMute:method"}}{{/crossLink}} to access.
	 * @property _muted
	 * @type {Boolean}
	 * @default false
	 * @protected
	 */
	p._muted = false;

	/**
	 * Read only value that tells you if the audio is currently paused.
	 * Use {{#crossLink "SoundInstance/pause:method"}}{{/crossLink}} and {{#crossLink "SoundInstance/resume:method"}}{{/crossLink}} to set.
	 * @property paused
	 * @type {Boolean}
	 */
	p.paused = false;	// this value will not be used, and is only set
	p._paused = false;	// this value is used internally for setting paused

	/**
	 * WebAudioPlugin only.
	 * Time audio started playback, in seconds. Used to handle set position, get position, and resuming from paused.
	 * @property _playbackStartTime
	 * @type {Number}
	 * @default 0
	 * @protected
	 * @since 0.4.0
	 */
	p._playbackStartTime = 0;

	// Proxies, make removing listeners easier.
	p._endedHandler = null;

// Events
	/**
	 * The event that is fired when playback has started successfully.
	 * @event succeeded
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback is interrupted. This happens when another sound with the same
	 * src property is played using an interrupt value that causes this instance to stop playing.
	 * @event interrupted
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback has failed. This happens when there are too many channels with the same
	 * src property already playing (and the interrupt value doesn't cause an interrupt of another instance), or
	 * the sound could not be played, perhaps due to a 404 error.
	 * @event failed
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when a sound has completed playing but has loops remaining.
	 * @event loop
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * The event that is fired when playback completes. This means that the sound has finished playing in its
	 * entirety, including its loop iterations.
	 * @event complete
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @since 0.4.0
	 */

	/**
	 * A helper method that dispatches all events for SoundInstance.
	 * @method _sendEvent
	 * @param {String} type The event type
	 * @protected
	 */
	p._sendEvent = function (type) {
		var event = new createjs.Event(type);
		this.dispatchEvent(event);
	};

// Constructor
	/**
	 * Initialize the SoundInstance. This is called from the constructor.
	 * @method _init
	 * @param {string} src The source of the audio.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @param {Class} owner The plugin that created this instance.
	 * @protected
	 */
	p._init = function (src, startTime, duration, owner) {
		this.src = src;
		this._startTime = startTime * 0.001 || 0;	// convert ms to s as web audio handles everything in seconds
		this._duration = duration || 0;
		this._owner = owner;

		this.gainNode = this._owner.context.createGain();

		this.panNode = this._owner.context.createPanner();
		this.panNode.panningModel = this._owner._panningModel;
		this.panNode.connect(this.gainNode);

		if (this._owner.isPreloadComplete(this.src) && !this._duration) {this._duration = this._owner._arrayBuffers[this.src].duration * 1000;}

		this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
	};

	/**
	 * Clean up the instance. Remove references and clean up any additional properties such as timers.
	 * @method _cleanUp
	 * @protected
	 */
	p._cleanUp = function () {
		if (this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
			this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
		}

		if (this.gainNode.numberOfOutputs != 0) {this.gainNode.disconnect(0);}
		// OJR there appears to be a bug that this doesn't always work in webkit (Chrome and Safari). According to the documentation, this should work.

		clearTimeout(this._delayTimeoutId); // clear timeout that plays delayed sound
		clearTimeout(this._soundCompleteTimeout);  // clear timeout that triggers sound complete

		this._playbackStartTime = 0;	// This is used by getPosition

		createjs.Sound._playFinished(this);
	};

	/**
	 * Turn off and disconnect an audioNode, then set reference to null to release it for garbage collection
	 * @method _cleanUpAudioNode
	 * @param audioNode
	 * @return {audioNode}
	 * @protected
	 * @since 0.4.1
	 */
	p._cleanUpAudioNode = function(audioNode) {
		if(audioNode) {
			audioNode.stop(0);
			audioNode.disconnect(0);
			audioNode = null;
		}
		return audioNode;
	};

	/**
	 * The sound has been interrupted.
	 * @method _interrupt
	 * @protected
	 */
	p._interrupt = function () {
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_INTERRUPTED;
		this.paused = this._paused = false;
		this._sendEvent("interrupted");
	};

	/**
	 * Handles starting playback when the sound is ready for playing.
	 * @method _handleSoundReady
	 * @protected
 	 */
	p._handleSoundReady = function (event) {
		if (!this._duration) {this._duration = this._owner._arrayBuffers[this.src].duration * 1000;} // NOTE *1000 because WebAudio reports everything in seconds but js uses milliseconds
		if ((this._offset*1000) > this._duration) {
			this.playFailed();
			return;
		} else if (this._offset < 0) {  // may not need this check if play ignores negative values, this is not specified in the API http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
			this._offset = 0;
		}

		this.playState = createjs.Sound.PLAY_SUCCEEDED;
		this.paused = this._paused = false;

		this.gainNode.connect(this._owner.gainNode);  // this line can cause a memory leak.  Nodes need to be disconnected from the audioDestination or any sequence that leads to it.

		var dur = this._duration * 0.001;
		this.sourceNode = this._createAndPlayAudioNode((this._owner.context.currentTime - dur), this._offset);
		this._playbackStartTime = this.sourceNode.startTime - this._offset;

		this._soundCompleteTimeout = setTimeout(this._endedHandler, (dur - this._offset) * 1000);

		if(this._remainingLoops != 0) {
			this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
		}
	};

	/**
	 * Creates an audio node using the current src and context, connects it to the gain node, and starts playback.
	 * @method _createAndPlayAudioNode
	 * @param {Number} startTime The time to add this to the web audio context, in seconds.
	 * @param {Number} offset The amount of time into the src audio to start playback, in seconds.
	 * @return {audioNode}
	 * @protected
	 * @since 0.4.1
	 */
	p._createAndPlayAudioNode = function(startTime, offset) {
		var audioNode = this._owner.context.createBufferSource();
		audioNode.buffer = this._owner._arrayBuffers[this.src];
		audioNode.connect(this.panNode);
		var dur = this._duration * 0.001;
		audioNode.startTime = startTime + dur;
		audioNode.start(audioNode.startTime, offset+this._startTime, dur - offset);
		return audioNode;
	};

	// Public API
	/**
	 * Play an instance. This method is intended to be called on SoundInstances that already exist (created
	 * with the Sound API {{#crossLink "Sound/createInstance"}}{{/crossLink}} or {{#crossLink "Sound/play"}}{{/crossLink}}).
	 *
	 * <h4>Example</h4>
	 *      var myInstance = createjs.Sound.createInstance(mySrc);
	 *      myInstance.play({offset:1, loop:2, pan:0.5});	// options as object properties
	 *      myInstance.play(createjs.Sound.INTERRUPT_ANY);	// options as parameters
	 *
	 * Note that if this sound is already playing, this call will do nothing.
	 *
	 * @method play
	 * @param {String | Object} [interrupt="none"|options] How to interrupt any currently playing instances of audio with the same source,
	 * if the maximum number of instances of the sound are already playing. Values are defined as <code>INTERRUPT_TYPE</code>
	 * constants on the Sound class, with the default defined by Sound {{#crossLink "Sound/defaultInterruptBehavior:property"}}{{/crossLink}}.
	 * <br /><strong>OR</strong><br />
	 * This parameter can be an object that contains any or all optional properties by name, including: interrupt,
	 * delay, offset, loop, volume, and pan (see the above code sample).
	 * @param {Number} [delay=0] The delay in milliseconds before the sound starts
	 * @param {Number} [offset=0] How far into the sound to begin playback, in milliseconds.
	 * @param {Number} [loop=0] The number of times to loop the audio. Use -1 for infinite loops.
	 * @param {Number} [volume=1] The volume of the sound, between 0 and 1.
	 * @param {Number} [pan=0] The pan of the sound between -1 (left) and 1 (right). Note that pan is not supported
	 * for HTML Audio.
	 */
	p.play = function (interrupt, delay, offset, loop, volume, pan) {
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			if (interrupt instanceof Object) {
				offset = interrupt.offset;
				loop = interrupt.loop;
				volume = interrupt.volume;
				pan = interrupt.pan;
			}
			if (offset != null) { this.setPosition(offset) }
			if (loop != null) { this.loop = loop; }
			if (volume != null) { this.setVolume(volume); }
			if (pan != null) { this.setPan(pan); }
			if (this._paused) {	this.resume(); }
			return;
		}
		this._cleanUp();
		createjs.Sound._playInstance(this, interrupt, delay, offset, loop, volume, pan);
	};

	/**
	 * Called by the Sound class when the audio is ready to play (delay has completed). Starts sound playing if the
	 * src is loaded, otherwise playback will fail.
	 * @method _beginPlaying
	 * @param {Number} offset How far into the sound to begin playback, in milliseconds.
	 * @param {Number} loop The number of times to loop the audio. Use -1 for infinite loops.
	 * @param {Number} volume The volume of the sound, between 0 and 1.
	 * @param {Number} pan The pan of the sound between -1 (left) and 1 (right). Note that pan does not work for HTML Audio.
	 * @protected
	 */
	p._beginPlaying = function (offset, loop, volume, pan) {
		this._offset = offset * 0.001;  //convert ms to sec
		this._remainingLoops = loop;
		this.volume = volume;
		this.pan = pan;

		if (this._owner.isPreloadComplete(this.src)) {
			this._handleSoundReady(null);
			this._sendEvent("succeeded");
			return 1;
		} else {
			this.playFailed();
			return;
		}
	};

	/**
	 * Pause the instance. Paused audio will stop at the current time, and can be resumed using
	 * {{#crossLink "SoundInstance/resume"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.pause();
	 *
	 * @method pause
	 * @return {Boolean} If the pause call succeeds. This will return false if the sound isn't currently playing.
	 */
	p.pause = function () {
		if (this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED) {return false;}

		this.paused = this._paused = true;

		this._offset = this._owner.context.currentTime - this._playbackStartTime;  // this allows us to restart the sound at the same point in playback
		this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
		this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);

		if (this.gainNode.numberOfOutputs != 0) {this.gainNode.disconnect(0);}

		clearTimeout(this._delayTimeoutId);
		clearTimeout(this._soundCompleteTimeout);
		return true;
	};

	/**
	 * Resume an instance that has been paused using {{#crossLink "SoundInstance/pause"}}{{/crossLink}}. Audio that
	 * has not been paused will not playback when this method is called.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.pause();
	 *     // do some stuff
	 *     myInstance.resume();
	 *
	 * @method resume
	 * @return {Boolean} If the resume call succeeds. This will return false if called on a sound that is not paused.
	 */
	p.resume = function () {
		if (!this._paused) {return false;}
		this._handleSoundReady();
		return true;
	};

	/**
	 * Stop playback of the instance. Stopped sounds will reset their position to 0, and calls to {{#crossLink "SoundInstance/resume"}}{{/crossLink}}
	 * will fail.  To start playback again, call {{#crossLink "SoundInstance/play"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.stop();
	 *
	 * @method stop
	 * @return {Boolean} If the stop call succeeds.
	 */
	p.stop = function () {
		this.paused = this._paused = false;
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FINISHED;
		this._offset = 0;  // set audio to start at the beginning
		return true;
	};

	/**
	 * NOTE that you can set volume directly as a property, and setVolume remains to allow support for IE8 with FlashPlugin.
	 * Set the volume of the instance. You can retrieve the volume using {{#crossLink "SoundInstance/getVolume"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.setVolume(0.5);
	 *
	 * Note that the master volume set using the Sound API method {{#crossLink "Sound/setVolume"}}{{/crossLink}}
	 * will be applied to the instance volume.
	 *
	 * @method setVolume
	 * @param value The volume to set, between 0 and 1.
	 * @return {Boolean} If the setVolume call succeeds.
	 */
	p.setVolume = function (value) {
		this.volume = value;
		return true;
	};

	/**
	 * Internal function used to update the volume based on the instance volume, master volume, instance mute value,
	 * and master mute value.
	 * @method _updateVolume
	 * @protected
	 */
	p._updateVolume = function () {
		var newVolume = this._muted ? 0 : this._volume;
		if (newVolume != this.gainNode.gain.value) {
			this.gainNode.gain.value = newVolume;
		}
	};

	/**
	 * NOTE that you can access volume directly as a property, and getVolume remains to allow support for IE8 with FlashPlugin.
	 *
	 * Get the volume of the instance. The actual output volume of a sound can be calculated using:
	 * <code>myInstance.getVolume() * createjs.Sound.getVolume();</code>
	 *
	 * @method getVolume
	 * @return The current volume of the sound instance.
	 */
	p.getVolume = function () {
		return this.volume;
	};

	/**
	 * Mute and unmute the sound. Muted sounds will still play at 0 volume. Note that an unmuted sound may still be
	 * silent depending on {{#crossLink "Sound"}}{{/crossLink}} volume, instance volume, and Sound mute.
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.setMute(true);
	 *
	 * @method setMute
	 * @param {Boolean} value If the sound should be muted.
	 * @return {Boolean} If the mute call succeeds.
	 * @since 0.4.0
	 */
	p.setMute = function (value) {
		if (value == null) {return false;}

		this._muted = value;
		this._updateVolume();
		return true;
	};

	/**
	 * Get the mute value of the instance.
	 *
	 * <h4>Example</h4>
	 *
	 *      var isMuted = myInstance.getMute();
	 *
	 * @method getMute
	 * @return {Boolean} If the sound is muted.
	 * @since 0.4.0
	 */
	p.getMute = function () {
		return this._muted;
	};

	/**
	 * NOTE that you can set pan directly as a property, and getPan remains to allow support for IE8 with FlashPlugin.
	 *
	 * Set the left(-1)/right(+1) pan of the instance. Note that {{#crossLink "HTMLAudioPlugin"}}{{/crossLink}} does not
	 * support panning, and only simple left/right panning has been implemented for {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.
	 * The default pan value is 0 (center).
	 *
	 * <h4>Example</h4>
	 *
	 *     myInstance.setPan(-1);  // to the left!
	 *
	 * @method setPan
	 * @param {Number} value The pan value, between -1 (left) and 1 (right).
	 * @return {Number} If the setPan call succeeds.
	 */
	p.setPan = function (value) {
		this.pan = value;  // Unfortunately panner does not give us a way to access this after it is set http://www.w3.org/TR/webaudio/#AudioPannerNode
		if(this.pan != value) {return false;}
		return true;
	};

	/**
	 * NOTE that you can access pan directly as a property, and getPan remains to allow support for IE8 with FlashPlugin.
	 *
	 * Get the left/right pan of the instance. Note in WebAudioPlugin this only gives us the "x" value of what is
	 * actually 3D audio.
	 *
	 * <h4>Example</h4>
	 *
	 *     var myPan = myInstance.getPan();
	 *
	 * @method getPan
	 * @return {Number} The value of the pan, between -1 (left) and 1 (right).
	 */
	p.getPan = function () {
		return this.pan;
	};

	/**
	 * Get the position of the playhead of the instance in milliseconds.
	 *
	 * <h4>Example</h4>
	 *
	 *     var currentOffset = myInstance.getPosition();
	 *
	 * @method getPosition
	 * @return {Number} The position of the playhead in the sound, in milliseconds.
	 */
	p.getPosition = function () {
		if (this._paused || this.sourceNode == null) {
			var pos = this._offset;
		} else {
			var pos = this._owner.context.currentTime - this._playbackStartTime;
		}

		return pos * 1000; // pos in seconds * 1000 to give milliseconds
	};

	/**
	 * Set the position of the playhead in the instance. This can be set while a sound is playing, paused, or
	 * stopped.
	 *
	 * <h4>Example</h4>
	 *
	 *      myInstance.setPosition(myInstance.getDuration()/2); // set audio to its halfway point.
	 *
	 * @method setPosition
	 * @param {Number} value The position to place the playhead, in milliseconds.
	 */
	p.setPosition = function (value) {
		this._offset = value * 0.001; // convert milliseconds to seconds

		if (this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			// we need to stop this sound from continuing to play, as we need to recreate the sourceNode to change position
			this.sourceNode = this._cleanUpAudioNode(this.sourceNode);
			this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext);
			clearTimeout(this._soundCompleteTimeout);  // clear timeout that triggers sound complete
		}  // NOTE we cannot just call cleanup because it also calls the Sound function _playFinished which releases this instance in SoundChannel

		if (!this._paused && this.playState == createjs.Sound.PLAY_SUCCEEDED) {this._handleSoundReady();}

		return true;
	};

	/**
	 * Get the duration of the instance, in milliseconds. Note in most cases, you need to play a sound using
	 * {{#crossLink "SoundInstance/play"}}{{/crossLink}} or the Sound API {{#crossLink "Sound/play"}}{{/crossLink}}
	 * method before its duration can be reported accurately.
	 *
	 * <h4>Example</h4>
	 *
	 *     var soundDur = myInstance.getDuration();
	 *
	 * @method getDuration
	 * @return {Number} The duration of the sound instance in milliseconds.
	 */
	p.getDuration = function () {
		return this._duration;
	};

	/**
	 * Audio has finished playing. Manually loop it if required.
	 * @method _handleSoundComplete
	 * @param event
	 * @protected
	 */
	 // called internally by _soundCompleteTimeout in WebAudioPlugin
	p._handleSoundComplete = function (event) {
		this._offset = 0;  // have to set this as it can be set by pause during playback

		if (this._remainingLoops != 0) {
			this._remainingLoops--;  // NOTE this introduces a theoretical limit on loops = float max size x 2 - 1

			// OJR we are using a look ahead approach to ensure smooth looping.  We add _sourceNodeNext to the audio
			// context so that it starts playing even if this callback is delayed.  This technique and the reasons for
			// using it are described in greater detail here:  http://www.html5rocks.com/en/tutorials/audio/scheduling/
			// NOTE the cost of this is that our audio loop may not always match the loop event timing precisely.
			if(this._sourceNodeNext) { // this can be set to null, but this should not happen when looping
				this._cleanUpAudioNode(this.sourceNode);
				this.sourceNode = this._sourceNodeNext;
				this._playbackStartTime = this.sourceNode.startTime;
				this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0);
				this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration);
			}
			else {
				this._handleSoundReady();
			}

			this._sendEvent("loop");
			return;
		}

		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FINISHED;
		this._sendEvent("complete");
	};

	// Play has failed, which can happen for a variety of reasons.
	p.playFailed = function () {
		this._cleanUp();
		this.playState = createjs.Sound.PLAY_FAILED;
		this._sendEvent("failed");
	};

	p.toString = function () {
		return "[WebAudioPlugin SoundInstance]";
	};

	createjs.WebAudioPlugin.SoundInstance = SoundInstance;
}());

(function () {

	"use strict";

	/**
	 * An internal helper class that preloads web audio via XHR. Note that this class and its methods are not documented
	 * properly to avoid generating HTML documentation.
	 * #class Loader
	 * @param {String} src The source of the sound to load.
	 * @param {Object} owner A reference to the class that created this instance.
	 * @constructor
	 */
	function Loader(src, owner) {
		this._init(src, owner);
	}

	var p = Loader.prototype;
	p.constructor = Loader;

	// the request object for or XHR2 request
	p.request = null;

	p.owner = null;
	p.progress = -1;

	/**
	 * The source of the sound to load. Used by callback functions when we return this class.
	 * #property src
	 * @type {String}
	 */
	p.src = null;

	/**
	 * The decoded AudioBuffer array that is returned when loading is complete.
	 * #property result
	 * @type {AudioBuffer}
	 * @protected
	 */
	p.result = null;

	// Calbacks
	/**
	 * The callback that fires when the load completes. This follows HTML tag naming.
	 * #property onload
	 * @type {Method}
	 */
	p.onload = null;

	/**
	 * The callback that fires as the load progresses. This follows HTML tag naming.
	 * #property onprogress
	 * @type {Method}
	 */
	p.onprogress = null;

	/**
	 * The callback that fires if the load hits an error.  This follows HTML tag naming.
	 * #property onerror
	 * @type {Method}
	 * @protected
	 */
	p.onerror = null;

	// constructor
	p._init = function (src, owner) {
		this.src = src;
		this.owner = owner;
	};

	/**
	 * Begin loading the content.
	 * #method load
	 * @param {String} src The path to the sound.
	 */
	p.load = function (src) {
		if (src != null) {this.src = src;}

		this.request = new XMLHttpRequest();
		this.request.open("GET", this.src, true);
		this.request.responseType = "arraybuffer";
		this.request.onload = createjs.proxy(this.handleLoad, this);
		this.request.onerror = createjs.proxy(this.handleError, this);
		this.request.onprogress = createjs.proxy(this.handleProgress, this);

		this.request.send();
	};

	/**
	 * The loader has reported progress.
	 *
	 * <strong>Note</strong>: this is not a public API, but is used to allow preloaders to subscribe to load
	 * progress as if this is an HTML audio tag. This reason is why this still uses a callback instead of an event.
	 * #method handleProgress
	 * @param {event} event Progress event that gives event.loaded and event.total if server is configured correctly
	 * @protected
	 */
	p.handleProgress = function (event) {
		if (!event || event.loaded > 0 && event.total == 0) {
					return; // Sometimes we get no "total", so just ignore the progress event.
		}
		this.progress = event.loaded / event.total;
		this.onprogress && this.onprogress({loaded:event.loaded, total:event.total, progress:this.progress});
	};

	/**
	 * The sound has completed loading.
	 * #method handleLoad
	 * @protected
	 */
	p.handleLoad = function () {
		this.owner.context.decodeAudioData(this.request.response,
				createjs.proxy(this.handleAudioDecoded, this),
				createjs.proxy(this.handleError, this));
	};

	/**
	 * The audio has been decoded.
	 * #method handleAudioDecoded
	 * @protected
	 */
	p.handleAudioDecoded = function (decodedAudio) {
		this.progress = 1;
		this.result = decodedAudio;
		this.owner.addPreloadResults(this.src, this.result);
		this.onload && this.onload(this);
	};

	/**
	 * Errors have been caused by the loader.
	 * #method handleError
	 * @protected
	 */
	p.handleError = function (evt) {
		this.owner.removeSound(this.src);
		this.onerror && this.onerror(evt);
	};

	/**
	 * Remove all external references from loader
	 * #method cleanUp
	 */
	p.cleanUp = function () {
		if(!this.request) {return;}
		this.src = null;
		this.owner = null;
		this.request.onload = null;
		this.request.onerror = null;
		this.request.onprogress = null;
		this.request = null;
		this.onload = null;
		this.onprogress = null;
		this.onerror = null;
	};

	p.toString = function () {
		return "[WebAudioPlugin Loader]";
	};

	createjs.WebAudioPlugin.Loader = Loader;

}());
/*
 * HTMLAudioPlugin
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 *
 * Copyright (c) 2012 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module SoundJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {

	"use strict";

	/**
	 * Play sounds using HTML &lt;audio&gt; tags in the browser. This plugin is the second priority plugin installed
	 * by default, after the {{#crossLink "WebAudioPlugin"}}{{/crossLink}}.  For older browsers that do not support html
	 * audio, include and install the {{#crossLink "FlashPlugin"}}{{/crossLink}}.
	 *
	 * <h4>Known Browser and OS issues for HTML Audio</h4>
	 * <b>All browsers</b><br />
	 * Testing has shown in all browsers there is a limit to how many audio tag instances you are allowed.  If you exceed
	 * this limit, you can expect to see unpredictable results.  This will be seen as soon as you register sounds, as
	 * tags are precreated to allow Chrome to load them.  Please use {{#crossLink "Sound.MAX_INSTANCES"}}{{/crossLink}} as
	 * a guide to how many total audio tags you can safely use in all browsers.
	 *
     * <b>IE html limitations</b><br />
     * <ul><li>There is a delay in applying volume changes to tags that occurs once playback is started. So if you have
     * muted all sounds, they will all play during this delay until the mute applies internally. This happens regardless of
     * when or how you apply the volume change, as the tag seems to need to play to apply it.</li>
     * <li>MP3 encoding will not always work for audio tags if it's not default.  We've found default encoding with
     * 64kbps works.</li>
	 * <li>Occasionally very short samples will get cut off.</li>
	 * <li>There is a limit to how many audio tags you can load and play at once, which appears to be determined by
	 * hardware and browser settings.  See {{#crossLink "HTMLAudioPlugin.MAX_INSTANCES"}}{{/crossLink}} for a safe estimate.
	 * Note that audio sprites can be used as a solution to this issue.</li></ul>
	 *
	 * <b>Safari limitations</b><br />
	 * <ul><li>Safari requires Quicktime to be installed for audio playback.</li></ul>
	 *
	 * <b>iOS 6 limitations</b><br />
	 * <ul><li>Note it is recommended to use {{#crossLink "WebAudioPlugin"}}{{/crossLink}} for iOS (6+)</li>
	 * 		<li>HTML Audio is disabled by default because</li>
	 * 		<li>can only have one &lt;audio&gt; tag</li>
	 * 		<li>can not preload or autoplay the audio</li>
	 * 		<li>can not cache the audio</li>
	 * 		<li>can not play the audio except inside a user initiated event.</li>
	 * 		<li>audio sprites can be used to mitigate some of these issues and are strongly recommended on iOS</li>
	 * </ul>
	 *
	 * <b>Android Native Browser limitations</b><br />
	 * <ul><li>We have no control over audio volume. Only the user can set volume on their device.</li>
	 *      <li>We can only play audio inside a user event (touch/click).  This currently means you cannot loop sound or use a delay.</li></ul>
	 * <b> Android Chrome 26.0.1410.58 specific limitations</b><br />
	 * <ul><li>Chrome reports true when you run createjs.Sound.BrowserDetect.isChrome, but is a different browser
	 *      with different abilities.</li>
	 *      <li>Can only play 1 sound at a time.</li>
	 *      <li>Sound is not cached.</li>
	 *      <li>Sound can only be loaded in a user initiated touch/click event.</li>
	 *      <li>There is a delay before a sound is played, presumably while the src is loaded.</li>
	 * </ul>
	 *
	 * See {{#crossLink "Sound"}}{{/crossLink}} for general notes on known issues.
	 *
	 * @class HTMLAudioPlugin
	 * @constructor
	 */
	function HTMLAudioPlugin() {
		this._init();
	}

	var s = HTMLAudioPlugin;

	/**
	 * The maximum number of instances that can be loaded and played. This is a browser limitation, primarily limited to IE9.
	 * The actual number varies from browser to browser (and is largely hardware dependant), but this is a safe estimate.
	 * @property MAX_INSTANCES
	 * @type {Number}
	 * @default 30
	 * @static
	 */
	s.MAX_INSTANCES = 30;

	/**
	 * Event constant for the "canPlayThrough" event for cleaner code.
	 * @property _AUDIO_READY
	 * @type {String}
	 * @default canplaythrough
	 * @static
	 * @protected
	 */
	s._AUDIO_READY = "canplaythrough";

	/**
	 * Event constant for the "ended" event for cleaner code.
	 * @property _AUDIO_ENDED
	 * @type {String}
	 * @default ended
	 * @static
	 * @protected
	 */
	s._AUDIO_ENDED = "ended";

	/**
	 * Event constant for the "seeked" event for cleaner code.  We utilize this event for maintaining loop events.
	 * @property _AUDIO_SEEKED
	 * @type {String}
	 * @default seeked
	 * @static
	 * @protected
	 */
	s._AUDIO_SEEKED = "seeked";

	/**
	 * Event constant for the "stalled" event for cleaner code.
	 * @property _AUDIO_STALLED
	 * @type {String}
	 * @default stalled
	 * @static
	 * @protected
	 */
	s._AUDIO_STALLED = "stalled";

	/**
	 * Event constant for the "timeupdate" event for cleaner code.  Utilized for looping audio sprites.
	 * This event callsback ever 15 to 250ms and can be dropped by the browser for performance.
	 * @property _TIME_UPDATE
	 * @type {String}
	 * @default timeupdate
	 * @static
	 * @protected
	 */
	s._TIME_UPDATE = "timeupdate";

	/**
	 * The capabilities of the plugin. This is generated via the the SoundInstance {{#crossLink "HTMLAudioPlugin/_generateCapabilities"}}{{/crossLink}}
	 * method. Please see the Sound {{#crossLink "Sound/getCapabilities"}}{{/crossLink}} method for an overview of all
	 * of the available properties.
	 * @property _capabilities
	 * @type {Object}
	 * @protected
	 * @static
	 */
	s._capabilities = null;

	/**
	 * Deprecated now that we have audio sprite support.  Audio sprites are strongly recommend on iOS.
	 * <li>it can only have one &lt;audio&gt; tag</li>
	 * <li>can not preload or autoplay the audio</li>
	 * <li>can not cache the audio</li>
	 * <li>can not play the audio except inside a user initiated event</li>
	 *
	 * @property enableIOS
	 * @type {Boolean}
	 * @default false
	 * @deprecated
	 */
	s.enableIOS = false;

	/**
	 * Determine if the plugin can be used in the current browser/OS. Note that HTML audio is available in most modern
	 * browsers, but is disabled in iOS because of its limitations.
	 * @method isSupported
	 * @return {Boolean} If the plugin can be initialized.
	 * @static
	 */
	s.isSupported = function () {
		s._generateCapabilities();
		if (s._capabilities == null) {return false;}
		return true;
	};

	/**
	 * Determine the capabilities of the plugin. Used internally. Please see the Sound API {{#crossLink "Sound/getCapabilities"}}{{/crossLink}}
	 * method for an overview of plugin capabilities.
	 * @method _generateCapabilities
	 * @static
	 * @protected
	 */
	s._generateCapabilities = function () {
		if (s._capabilities != null) {return;}
		var t = document.createElement("audio");
		if (t.canPlayType == null) {return null;}

		s._capabilities = {
			panning:true,
			volume:true,
			tracks:-1
		};

		// determine which extensions our browser supports for this plugin by iterating through Sound.SUPPORTED_EXTENSIONS
		var supportedExtensions = createjs.Sound.SUPPORTED_EXTENSIONS;
		var extensionMap = createjs.Sound.EXTENSION_MAP;
		for (var i = 0, l = supportedExtensions.length; i < l; i++) {
			var ext = supportedExtensions[i];
			var playType = extensionMap[ext] || ext;
			s._capabilities[ext] = (t.canPlayType("audio/" + ext) != "no" && t.canPlayType("audio/" + ext) != "") || (t.canPlayType("audio/" + playType) != "no" && t.canPlayType("audio/" + playType) != "");
		}  // OJR another way to do this might be canPlayType:"m4a", codex: mp4
	}

	var p = HTMLAudioPlugin.prototype;
	p.constructor = HTMLAudioPlugin;

	// doc'd above
	p._capabilities = null;

	/**
	 * Object hash indexed by the source of each file to indicate if an audio source is loaded, or loading.
	 * @property _audioSources
	 * @type {Object}
	 * @protected
	 * @since 0.4.0
	 */
	p._audioSources = null;

	/**
	 * The default number of instances to allow.  Used by {{#crossLink "Sound"}}{{/crossLink}} when a source
	 * is registered using the {{#crossLink "Sound/register"}}{{/crossLink}} method.  This is only used if
	 * a value is not provided.
	 *
	 * <b>NOTE this property only exists as a limitation of HTML audio.</b>
	 * @property defaultNumChannels
	 * @type {Number}
	 * @default 2
	 * @since 0.4.0
	 */
	p.defaultNumChannels = 2;

	/**
	 * An initialization function run by the constructor
	 * @method _init
	 * @protected
	 */
	p._init = function () {
		this._capabilities = s._capabilities;
		this._audioSources = {};
	};

	/**
	 * Pre-register a sound instance when preloading/setup. This is called by {{#crossLink "Sound"}}{{/crossLink}}.
	 * Note that this provides an object containing a tag used for preloading purposes, which
	 * <a href="http://preloadjs.com" target="_blank">PreloadJS</a> can use to assist with preloading.
	 * @method register
	 * @param {String} src The source of the audio
	 * @param {Number} instances The number of concurrently playing instances to allow for the channel at any time.
	 * @return {Object} A result object, containing a tag for preloading purposes and a numChannels value for internally
	 * controlling how many instances of a source can be played by default.
	 */
	p.register = function (src, instances) {
		this._audioSources[src] = true;  // Note this does not mean preloading has started
		var channel = createjs.HTMLAudioPlugin.TagPool.get(src);
		var tag = null;
		var l = instances;
		for (var i = 0; i < l; i++) {
			tag = this._createTag(src);
			channel.add(tag);
		}

		return {
			tag:tag // Return one instance for preloading purposes
		};
	};

	/**
	 * Create an HTML audio tag.
	 * @method _createTag
	 * @param {String} src The source file to set for the audio tag.
	 * @return {HTMLElement} Returns an HTML audio tag.
	 * @protected
	 */
	p._createTag = function (src) {
		var tag = document.createElement("audio");
		tag.autoplay = false;
		tag.preload = "none";
		//LM: Firefox fails when this the preload="none" for other tags, but it needs to be "none" to ensure PreloadJS works.
		tag.src = src;
		return tag;
	};

	/**
	 * Remove a sound added using {{#crossLink "HTMLAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel
	 * a preload.
	 * @method removeSound
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeSound = function (src) {
		delete(this._audioSources[src]);
		createjs.HTMLAudioPlugin.TagPool.remove(src);
	};

	/**
	 * Remove all sounds added using {{#crossLink "HTMLAudioPlugin/register"}}{{/crossLink}}. Note this does not cancel a preload.
	 * @method removeAllSounds
	 * @param {String} src The sound URI to unload.
	 * @since 0.4.1
	 */
	p.removeAllSounds = function () {
		this._audioSources = {};
		createjs.HTMLAudioPlugin.TagPool.removeAll();
	};

	/**
	 * Create a sound instance. If the sound has not been preloaded, it is internally preloaded here.
	 * @method create
	 * @param {String} src The sound source to use.
	 * @param {Number} startTime Audio sprite property used to apply an offset, in milliseconds.
	 * @param {Number} duration Audio sprite property used to set the time the clip plays for, in milliseconds.
	 * @return {SoundInstance} A sound instance for playback and control.
	 */
	p.create = function (src, startTime, duration) {
		// if this sound has not be registered, create a tag and preload it
		if (!this.isPreloadStarted(src)) {
			var channel = createjs.HTMLAudioPlugin.TagPool.get(src);
			var tag = this._createTag(src);
			tag.id = src;
			channel.add(tag);
			this.preload(src, {tag:tag});
		}

		return new createjs.HTMLAudioPlugin.SoundInstance(src, startTime, duration, this);
	};

	/**
	 * Checks if preloading has started for a specific source.
	 * @method isPreloadStarted
	 * @param {String} src The sound URI to check.
	 * @return {Boolean} If the preload has started.
	 * @since 0.4.0
	 */
	p.isPreloadStarted = function (src) {
		return (this._audioSources[src] != null);
	};

	/**
	 * Internally preload a sound.
	 * @method preload
	 * @param {String} src The sound URI to load.
	 * @param {Object} tag An HTML audio tag used to load src.
	 * @since 0.4.0
	 */
	p.preload = function (src, tag) {
		this._audioSources[src] = true;
		new createjs.HTMLAudioPlugin.Loader(src, tag);
	};

	p.toString = function () {
		return "[HTMLAudioPlugin]";
	};

	createjs.HTMLAudioPlugin = HTMLAudioPlugin;
}());


(function () {

	"use strict";

	// NOTE Documentation for the SoundInstance class in WebAudioPlugin file. Each plugin generates a SoundInstance that
	// follows the same interface.
	function SoundInstance(src, startTime, duration, owner) {
		this._init(src, startTime, duration, owner);
	}

	var p = SoundInstance.prototype = new createjs.EventDispatcher();
	p.constructor = SoundInstance;

	p.src = null;
	p.uniqueId = -1;
	p.playState = null;
	p._owner = null;
	p.loaded = false;
	p._offset = 0;
	p._startTime = 0;
	p._volume =  1;
	if (createjs.definePropertySupported) {
		Object.defineProperty(p, "volume", {
			get: function() {
				return this._volume;
			},
			set: function(value) {
				if (Number(value) == null) {return;}
				value = Math.max(0, Math.min(1, value));
				this._volume = value;
				this._updateVolume();
			}
		});
	}
	p.pan = 0;
	p._duration = 0;
	p._audioSpriteStopTime = null;	// HTMLAudioPlugin only
	p._remainingLoops = 0;
	if (createjs.definePropertySupported) {
		Object.defineProperty(p, "loop", {
			get: function() {
				return this._remainingLoops;
			},
			set: function(value) {
				if (this.tag != null) {
					// remove looping
					if (this._remainingLoops != 0 && value == 0) {
						this.tag.loop = false;
						this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
					}
					// add looping
					if (this._remainingLoops == 0 && value != 0) {
						this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
						this.tag.loop = true;
					}
				}
				this._remainingLoops = value;
			}
		});
	}
	p._delayTimeoutId = null;
	p.tag = null;
	p._muted = false;
	p.paused = false;
	p._paused = false;

	// Proxies, make removing listeners easier.
	p._endedHandler = null;
	p._readyHandler = null;
	p._stalledHandler = null;
	p._audioSpriteEndHandler = null;
	p.loopHandler = null;

// Constructor
	p._init = function (src, startTime, duration, owner) {
		this.src = src;
		this._startTime = startTime || 0;	// convert ms to s as web audio handles everything in seconds
		if (duration) {
			this._duration = duration;
			this._audioSpriteStopTime = (startTime + duration) * 0.001;
		} else {
			this._duration = createjs.HTMLAudioPlugin.TagPool.getDuration(this.src);
		}
		this._owner = owner;

		this._endedHandler = createjs.proxy(this._handleSoundComplete, this);
		this._readyHandler = createjs.proxy(this._handleSoundReady, this);
		this._stalledHandler = createjs.proxy(this._handleSoundStalled, this);
		this.__audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this);
		this.loopHandler = createjs.proxy(this.handleSoundLoop, this);
	};

	p._sendEvent = function (type) {
		var event = new createjs.Event(type);
		this.dispatchEvent(event);
	};

	p._cleanUp = function () {
		var tag = this.tag;
		if (tag != null) {
			tag.pause();
			this.tag.loop = false;
			tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
			tag.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this.__audioSpriteEndHandler, false);

			try {
				tag.currentTime = this._startTime;
			} catch (e) {
			} // Reset Position
			createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, tag);
			this.tag = null;
		}

		clearTimeout(this._delayTimeoutId);
		createjs.Sound._playFinished(this);
	};

	p._interrupt = function () {
		if (this.tag == null) {return;}
		this.playState = createjs.Sound.PLAY_INTERRUPTED;
		this._cleanUp();
		this.paused = this._paused = false;
		this._sendEvent("interrupted");
	};

// Public API
	p.play = function (interrupt, delay, offset, loop, volume, pan) {
		if (this.playState == createjs.Sound.PLAY_SUCCEEDED) {
			if (interrupt instanceof Object) {
				offset = interrupt.offset;
				loop = interrupt.loop;
				volume = interrupt.volume;
				pan = interrupt.pan;
			}
			if (offset != null) { this.setPosition(offset) }
			if (loop != null) { this.loop = loop; }
			if (volume != null) { this.setVolume(volume); }
			if (pan != null) { this.setPan(pan); }
			if (this._paused) {	this.resume(); }
			return;
		}
		this._cleanUp();
		createjs.Sound._playInstance(this, interrupt, delay, offset, loop, volume, pan);
	};

	p._beginPlaying = function (offset, loop, volume, pan) {
		var tag = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
		if (tag == null) {
			this.playFailed();
			return -1;
		}

		tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);

		// Reset this instance.
		this._offset = offset;
		this.volume = volume;
		this._updateVolume();
		this._remainingLoops = loop;

		if (tag.readyState !== 4) {
			tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
			tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, false);
			tag.preload = "auto"; // This is necessary for Firefox, as it won't ever "load" until this is set.
			tag.load();
		} else {
			this._handleSoundReady(null);
		}

		this._sendEvent("succeeded");
		return 1;
	};

	// Note: Sounds stall when trying to begin playback of a new audio instance when the existing instances
	//  has not loaded yet. This doesn't mean the sound will not play.
	p._handleSoundStalled = function (event) {
		this._cleanUp();  // OJR this will stop playback, we could remove this and let the developer decide how to handle stalled instances
		this._sendEvent("failed");
	};

	p._handleSoundReady = function (event) {
		this.playState = createjs.Sound.PLAY_SUCCEEDED;
		this.paused = this._paused = false;
		this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, false);
		this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);

		if (this._offset >= this.getDuration()) {
			this.playFailed();
			return;
		}
		this.tag.currentTime = (this._startTime + this._offset) * 0.001;

		if (this._audioSpriteStopTime) {
			this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, false);
			this.tag.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this.__audioSpriteEndHandler, false);
		} else {
			if(this._remainingLoops != 0) {
				this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
				this.tag.loop = true;
			}
		}

		this.tag.play();
	};

	p.pause = function () {
		if (!this._paused && this.playState == createjs.Sound.PLAY_SUCCEEDED && this.tag != null) {
			this.paused = this._paused = true;
			this.tag.pause();
			clearTimeout(this._delayTimeoutId);
			return true;
		}
		return false;
	};

	p.resume = function () {
		if (!this._paused || this.tag == null) {return false;}
		this.paused = this._paused = false;
		this.tag.play();
		return true;
	};

	p.stop = function () {
		this._offset = 0;
		this.pause();
		this.playState = createjs.Sound.PLAY_FINISHED;
		this._cleanUp();
		return true;
	};

	p.setMasterVolume = function (value) {
		this._updateVolume();
	};

	p.setVolume = function (value) {
		this.volume = value;
		return true;
	};

	p._updateVolume = function () {
		if (this.tag != null) {
			var newVolume = (this._muted || createjs.Sound._masterMute) ? 0 : this._volume * createjs.Sound._masterVolume;
			if (newVolume != this.tag.volume) {this.tag.volume = newVolume;}
		}
	};

	p.getVolume = function (value) {
		return this.volume;
	};

	p.setMasterMute = function (isMuted) {
		this._updateVolume();
	};

	p.setMute = function (isMuted) {
		if (isMuted == null) {return false;}
		this._muted = isMuted;
		this._updateVolume();
		return true;
	};

	p.getMute = function () {
		return this._muted;
	};

	// Can not set pan in HTML audio
	p.setPan = function (value) {
		return false;
	};

	p.getPan = function () {
		return 0;
	};

	p.getPosition = function () {
		if (this.tag == null) {return this._offset;}
		return (this.tag.currentTime * 1000) - this._startTime;
	};

	p.setPosition = function (value) {
		if (this.tag == null) {
			this._offset = value
		} else {
			this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
			this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
			try {
				value = value + this._startTime;
				this.tag.currentTime = value * 0.001;
			} catch (error) { // Out of range
				this._handleSetPositionSeek(null);
				return false;
			}
		}
		return true;
	};

	p._handleSetPositionSeek = function(event) {
		if (this.tag == null) { return; }
		this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, false);
		this.tag.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
	};

	p.getDuration = function () {  // NOTE this will always return 0 until sound has been played unless it is set
		return this._duration;
	};

	p._handleSoundComplete = function (event) {
		this._offset = 0;
		this.playState = createjs.Sound.PLAY_FINISHED;
		this._cleanUp();
		this._sendEvent("complete");
	};

	// NOTE because of the inaccuracies in the timeupdate event (15 - 250ms) and in setting the tag to the desired timed
	// (up to 300ms), it is strongly recommended not to loop audio sprites with HTML Audio if smooth looping is desired
	p._handleAudioSpriteLoop = function (event) {
		if(this.tag.currentTime <= this._audioSpriteStopTime) {return;}
		this.tag.pause();
		if(this._remainingLoops == 0) {
			this._handleSoundComplete(null);
		} else {
			this._offset = 0;
			this._remainingLoops--;
			this.tag.currentTime = this._startTime * 0.001;
			if(!this._paused) {this.tag.play();}
			this._sendEvent("loop");
		}
	};

	// NOTE with this approach audio will loop as reliably as the browser allows
	// but we could end up sending the loop event after next loop playback begins
	p.handleSoundLoop = function (event) {
		this._offset = 0;
		this._remainingLoops--;
		if(this._remainingLoops == 0) {
			this.tag.loop = false;
			this.tag.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, false);
		}
		this._sendEvent("loop");
	};

	p.playFailed = function () {
		this.playState = createjs.Sound.PLAY_FAILED;
		this._cleanUp();
		this._sendEvent("failed");
	};

	p.toString = function () {
		return "[HTMLAudioPlugin SoundInstance]";
	};

	createjs.HTMLAudioPlugin.SoundInstance = SoundInstance;

}());


(function () {

	"use strict";

	/**
	 * An internal helper class that preloads html audio via HTMLAudioElement tags. Note that PreloadJS will NOT use
	 * this load class like it does Flash and WebAudio plugins.
	 * Note that this class and its methods are not documented properly to avoid generating HTML documentation.
	 * #class Loader
	 * @param {String} src The source of the sound to load.
	 * @param {HTMLAudioElement} tag The audio tag of the sound to load.
	 * @constructor
	 * @protected
	 * @since 0.4.0
	 */
	function Loader(src, tag) {
		this._init(src, tag);
	};

	var p = Loader.prototype;
	p.constructor = Loader;

	/**
	 * The source to be loaded.
	 * #property src
	 * @type {String}
	 * @default null
	 * @protected
	 */
	p.src = null;

	/**
	 * The tag to load the source with / into.
	 * #property tag
	 * @type {AudioTag}
	 * @default null
	 * @protected
	 */
	p.tag = null;

	/**
	 * An interval used to give us progress.
	 * #property preloadTimer
	 * @type {String}
	 * @default null
	 * @protected
	 */
	p.preloadTimer = null;

	// Proxies, make removing listeners easier.
	p.loadedHandler = null;

	// constructor
	p._init = function (src, tag) {
		this.src = src;
		this.tag = tag;

		this.preloadTimer = setInterval(createjs.proxy(this.preloadTick, this), 200);

		// This will tell us when audio is buffered enough to play through, but not when its loaded.
		// The tag doesn't keep loading in Chrome once enough has buffered, and we have decided that behaviour is sufficient.
		// Note that canplaythrough callback doesn't work in Chrome, we have to use the event.
		this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this);  // we need this bind to be able to remove event listeners
		this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler);
		if(this.tag.onreadystatechange == null) {
			this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);
		} else {
			var f = this.tag.onreadystatechange;
			this.tag.onreadystatechange = function() {
				f();
				this.tag.onreadystatechange = createjs.proxy(this.sendLoadedEvent, this);
			}
		}

		this.tag.preload = "auto";
		//this.tag.src = src;
		this.tag.load();
	};

	/**
	 * Allows us to have preloading progress and tell when its done.
	 * #method preloadTick
	 * @protected
	 */
	p.preloadTick = function () {
		var buffered = this.tag.buffered;
		var duration = this.tag.duration;

		if (buffered.length > 0) {
			if (buffered.end(0) >= duration - 1) {
				this.handleTagLoaded();
			}
		}
	};

	/**
	 * Internal handler for when a tag is loaded.
	 * #method handleTagLoaded
	 * @protected
	 */
	p.handleTagLoaded = function () {
		clearInterval(this.preloadTimer);
	};

	/**
	 * Communicates back to Sound that a load is complete.
	 * #method sendLoadedEvent
	 * @param {Object} evt The load Event
	 */
	p.sendLoadedEvent = function (evt) {
		this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler);  // cleanup and so we don't send the event more than once
		this.tag.onreadystatechange = null;  // cleanup and so we don't send the event more than once
		createjs.Sound._sendFileLoadEvent(this.src);  // fire event or callback on Sound

	};

	// used for debugging
	p.toString = function () {
		return "[HTMLAudioPlugin Loader]";
	};

	createjs.HTMLAudioPlugin.Loader = Loader;

}());


(function () {

	"use strict";

	/**
	 * The TagPool is an object pool for HTMLAudio tag instances. In Chrome, we have to pre-create the number of HTML
	 * audio tag instances that we are going to play before we load the data, otherwise the audio stalls.
	 * (Note: This seems to be a bug in Chrome)
	 * #class TagPool
	 * @param {String} src The source of the channel.
	 * @protected
	 */
	function TagPool(src) {
		this._init(src);
	}

	var s = TagPool;

	/**
	 * A hash lookup of each sound channel, indexed by the audio source.
	 * #property tags
	 * @static
	 * @protected
	 */
	s.tags = {};

	/**
	 * Get a tag pool. If the pool doesn't exist, create it.
	 * #method get
	 * @param {String} src The source file used by the audio tag.
	 * @static
	 * @protected
	 */
	s.get = function (src) {
		var channel = s.tags[src];
		if (channel == null) {
			channel = s.tags[src] = new TagPool(src);
		}
		return channel;
	};

	/**
	 * Delete a TagPool and all related tags. Note that if the TagPool does not exist, this will fail.
	 * #method remove
	 * @param {String} src The source for the tag
	 * @return {Boolean} If the TagPool was deleted.
	 * @static
	 */
	s.remove = function (src) {
		var channel = s.tags[src];
		if (channel == null) {return false;}
		channel.removeAll();
		delete(s.tags[src]);
		return true;
	};

	/**
	 * Delete all TagPools and all related tags.
	 * #method removeAll
	 * @static
	 */
	s.removeAll = function () {
		for(var channel in s.tags) {
			s.tags[channel].removeAll();	// this stops and removes all active instances
		}
		s.tags = {};
	};

	/**
	 * Get a tag instance. This is a shortcut method.
	 * #method getInstance
	 * @param {String} src The source file used by the audio tag.
	 * @static
	 * @protected
	 */
	s.getInstance = function (src) {
		var channel = s.tags[src];
		if (channel == null) {return null;}
		return channel.get();
	};

	/**
	 * Return a tag instance. This is a shortcut method.
	 * #method setInstance
	 * @param {String} src The source file used by the audio tag.
	 * @param {HTMLElement} tag Audio tag to set.
	 * @static
	 * @protected
	 */
	s.setInstance = function (src, tag) {
		var channel = s.tags[src];
		if (channel == null) {return null;}
		return channel.set(tag);
	};

	/**
	 * Gets the duration of the src audio in milliseconds
	 * #method getDuration
	 * @param {String} src The source file used by the audio tag.
	 * @return {Number} Duration of src in milliseconds
	 */
	s.getDuration= function (src) {
		var channel = s.tags[src];
		if (channel == null) {return 0;}
		return channel.getDuration();
	};

	var p = TagPool.prototype;
	p.constructor = TagPool;

	/**
	 * The source of the tag pool.
	 * #property src
	 * @type {String}
	 * @protected
	 */
	p.src = null;

	/**
	 * The total number of HTMLAudio tags in this pool. This is the maximum number of instance of a certain sound
	 * that can play at one time.
	 * #property length
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.length = 0;

	/**
	 * The number of unused HTMLAudio tags.
	 * #property available
	 * @type {Number}
	 * @default 0
	 * @protected
	 */
	p.available = 0;

	/**
	 * A list of all available tags in the pool.
	 * #property tags
	 * @type {Array}
	 * @protected
	 */
	p.tags = null;

	/**
	 * The duration property of all audio tags, converted to milliseconds, which originally is only available on the
	 * last tag in the tags array because that is the one that is loaded.
	 * #property
	 * @type {Number}
	 * @protected
	 */
	p.duration = 0;

	// constructor
	p._init = function (src) {
		this.src = src;
		this.tags = [];
	};

	/**
	 * Add an HTMLAudio tag into the pool.
	 * #method add
	 * @param {HTMLAudioElement} tag A tag to be used for playback.
	 */
	p.add = function (tag) {
		this.tags.push(tag);
		this.length++;
		this.available++;
	};

	/**
	 * Remove all tags from the channel.  Usually in response to a delete call.
	 * #method removeAll
	 */
	p.removeAll = function () {
		var tag;
		while(this.length--) {
			tag = this.tags[this.length];
			if(tag.parentNode) {
				tag.parentNode.removeChild(tag);
			}
			delete(this.tags[this.length]);	// NOTE that the audio playback is already stopped by this point
		}
		this.src = null;
		this.tags.length = 0;
	};

	/**
	 * Get an HTMLAudioElement for immediate playback. This takes it out of the pool.
	 * #method get
	 * @return {HTMLAudioElement} An HTML audio tag.
	 */
	p.get = function () {
		if (this.tags.length == 0) {return null;}
		this.available = this.tags.length;
		var tag = this.tags.pop();
		if (tag.parentNode == null) {document.body.appendChild(tag);}
		return tag;
	};

	/**
	 * Put an HTMLAudioElement back in the pool for use.
	 * #method set
	 * @param {HTMLAudioElement} tag HTML audio tag
	 */
	p.set = function (tag) {
		var index = createjs.indexOf(this.tags, tag);
		if (index == -1) {this.tags.push(tag);}
		this.available = this.tags.length;
	};

	/**
	 * Gets the duration for the src audio and on first call stores it to this.duration
	 * #method getDuration
	 * @return {Number} Duration of the src in milliseconds
	 */
	p.getDuration = function () {
		// this will work because this will be only be run the first time a sound instance is created and before any tags are taken from the pool
		if (!this.duration) {this.duration = this.tags[this.tags.length - 1].duration * 1000;}
		return this.duration;
	};

	p.toString = function () {
		return "[HTMLAudioPlugin TagPool]";
	};

	createjs.HTMLAudioPlugin.TagPool = TagPool;

}());
