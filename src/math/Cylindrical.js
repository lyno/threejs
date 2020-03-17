/**
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Ref: https://en.wikipedia.org/wiki/Cylindrical_coordinate_system
 *
 */
/**
 * 创建圆柱体
 * @param {number} radius 
 * @param {number} theta 从正z轴以弧度表示的x-z平面的逆时针角度。默认值为0
 * @param {number} y x-z平面的的高度，默认是0
 */
function Cylindrical( radius, theta, y ) {

	this.radius = ( radius !== undefined ) ? radius : 1.0; // distance from the origin to a point in the x-z plane
	this.theta = ( theta !== undefined ) ? theta : 0; // counterclockwise angle in the x-z plane measured in radians from the positive z-axis
	this.y = ( y !== undefined ) ? y : 0; // height above the x-z plane

	return this;

}

Object.assign( Cylindrical.prototype, {

	set: function ( radius, theta, y ) {

		this.radius = radius;
		this.theta = theta;
		this.y = y;

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( other ) {

		this.radius = other.radius;
		this.theta = other.theta;
		this.y = other.y;

		return this;

	},

	/**
	 * 将圆柱体的三个参数用向量值来代替
	 * @param {Vector3} v 
	 */
	setFromVector3: function ( v ) {

		return this.setFromCartesianCoords( v.x, v.y, v.z );

	},

	/**
	 * 从笛卡尔坐标设置
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 */
	setFromCartesianCoords: function ( x, y, z ) {

		this.radius = Math.sqrt( x * x + z * z );
		this.theta = Math.atan2( x, z );
		this.y = y;

		return this;

	}

} );


export { Cylindrical };
