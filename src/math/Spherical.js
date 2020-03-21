import { MathUtils } from './MathUtils.js';

/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 *
 * Ref: https://en.wikipedia.org/wiki/Spherical_coordinate_system
 *
 * The polar angle (phi) is measured from the positive y-axis. The positive y-axis is up.
 * The azimuthal angle (theta) is measured from the positive z-axis.
 */
/**
 * 一个点的球坐标
 * 极角（phi）是从y轴的正方向测量的。 y轴正上方。
 * 方位角（θ）是从z轴正方向测量的。
 * @param {number} radius 
 * @param {number} phi 
 * @param {number} theta 
 */
function Spherical( radius, phi, theta ) {

	this.radius = ( radius !== undefined ) ? radius : 1.0;
	this.phi = ( phi !== undefined ) ? phi : 0; // polar angle
	this.theta = ( theta !== undefined ) ? theta : 0; // azimuthal angle

	return this;

}

Object.assign( Spherical.prototype, {

	set: function ( radius, phi, theta ) {

		this.radius = radius;
		this.phi = phi;
		this.theta = theta;

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( other ) {

		this.radius = other.radius;
		this.phi = other.phi;
		this.theta = other.theta;

		return this;

	},

	// restrict phi to be betwee EPS and PI-EPS 将phi限制在EPS和PI-EPS之间
	makeSafe: function () {

		var EPS = 0.000001;
		this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );

		return this;

	},

	setFromVector3: function ( v ) {

		return this.setFromCartesianCoords( v.x, v.y, v.z );

	},

	/**
	 * 从笛卡尔坐标设置
	 * @param {*} x 
	 * @param {*} y 
	 * @param {*} z 
	 */
	setFromCartesianCoords: function ( x, y, z ) {

		this.radius = Math.sqrt( x * x + y * y + z * z );

		if ( this.radius === 0 ) {

			this.theta = 0;
			this.phi = 0;

		} else {

			this.theta = Math.atan2( x, z );
			this.phi = Math.acos( MathUtils.clamp( y / this.radius, - 1, 1 ) );

		}

		return this;

	}

} );


export { Spherical };
