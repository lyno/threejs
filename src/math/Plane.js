import { Matrix3 } from './Matrix3.js';
import { Vector3 } from './Vector3.js';

/**
 * @author bhouston / http://clara.io
 */

var _vector1 = new Vector3();
var _vector2 = new Vector3();
var _normalMatrix = new Matrix3();

/**
 * Plane对象的构造函数.用来在三维空间内创建一个法线向量为normal,从原点到平面的距离为constant的无限延展的二维平面对象.Plane对象的功能函数採用
 * @param {Vector3} normal 
 * @param {number} constant 
 */
function Plane( normal, constant ) {

	// normal is assumed to be normalized

	this.normal = ( normal !== undefined ) ? normal : new Vector3( 1, 0, 0 );
	this.constant = ( constant !== undefined ) ? constant : 0;

}

Object.assign( Plane.prototype, {

	isPlane: true,

	set: function ( normal, constant ) {

		this.normal.copy( normal );
		this.constant = constant;

		return this;

	},

	/**
	 * 通过x,y,z,w分量设置二维平面的法线向量normal,原点到平面的距离constant,并返回新的二维平面.
	 * @param {number} x 平面法线向量x坐标
	 * @param {number} y 平面法线向量y坐标
	 * @param {number} z 平面法线向量z坐标
	 * @param {number} w 二维平面离原点的距离
	 */
	setComponents: function ( x, y, z, w ) {

		this.normal.set( x, y, z );
		this.constant = w;

		return this;

	},

	/**
	 * 通过參数normal(平面法线向量)和參数point(共面的点)设置二维平面的法线向量normal,原点到平面的距离constant,并返回新的二维平面.
	 * @param {Vector3} normal 
	 * @param {Vector3} point 
	 */
	setFromNormalAndCoplanarPoint: function ( normal, point ) {

		this.normal.copy( normal );
		// 点积是两个单位向量长度的余弦值
		this.constant = - point.dot( this.normal );

		return this;

	},

	/**
	 * 用来通过共面的点a,b,c重新设置二维平面的法线向量normal,原点到平面的距离constant,并返回新的二维平面.
	 * setFromCoplanarPoints方法接受的3个点a,b,c,需要按照逆时针方向的顺序传入,来确定发现的方向.
	 * @param {Vector3} a 
	 * @param {Vector3} b 
	 * @param {Vector3} c 
	 */
	setFromCoplanarPoints: function ( a, b, c ) {

		// _vector1 和_vector2 决定了一个平面，叉乘得该平面的法向量
		var normal = _vector1.subVectors( c, b ).cross( _vector2.subVectors( a, b ) ).normalize();

		// Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
		// 假设法向量normal是0,会产生一个无效的平面对象.

		this.setFromNormalAndCoplanarPoint( normal, a );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	/**
	 * 
	 * @param {Plane} plane 
	 */
	copy: function ( plane ) {

		// 二维平面的法线向量normal
		this.normal.copy( plane.normal );
		// 原点到平面的距离constant值
		this.constant = plane.constant;

		return this;

	},

	/**
	 * 用来规范化法线向量,并调整constant常量的值(获得单位平面).
	 */
	normalize: function () {

		// Note: will lead to a divide by zero if the plane is invalid.
		// 注意假设平面无效将产生除数是0的错误.

		var inverseNormalLength = 1.0 / this.normal.length();
		this.normal.multiplyScalar( inverseNormalLength );
		this.constant *= inverseNormalLength;

		return this;

	},

	/**
	 * 用来翻转法线,获得当前平面的背面,
	 */
	negate: function () {

		this.constant *= - 1;
		this.normal.negate();

		return this;

	},

	/**
	 * 用来获得三维空间内一点到Plane二维平面对象表面的最小距离.
	 * constant是平面原点到平面的距离，如果normal与原点同侧，则为正值
	 * 异侧则为负值
	 * @param {Vector3} point 
	 */
	distanceToPoint: function ( point ) {

		return this.normal.dot( point ) + this.constant;

	},

	distanceToSphere: function ( sphere ) {

		return this.distanceToPoint( sphere.center ) - sphere.radius;

	},

	/**
	 * 返回三维空间中一点到当前平面的投影.点到面上的投影等于从参数point到平面上的垂足.
	 * @param {Vector3} point 
	 * @param {Vector3} target 
	 * @returns {Vector3}
	 */
	projectPoint: function ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .projectPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.distanceToPoint( point ) ).add( point );

	},

	/**
	 * 获取当前二维平面与参数line相交的交点,如果和参数Line不相交返回undefined,如果线和当前二维平面共面返回线的起点.
	 * @param {Line3} line 
	 * @param {Vector3} target 
	 */
	intersectLine: function ( line, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .intersectLine() target is now required' );
			target = new Vector3();

		}

		var direction = line.delta( _vector1 );

		var denominator = this.normal.dot( direction );

		if ( denominator === 0 ) {

			// line is coplanar, return origin
			if ( this.distanceToPoint( line.start ) === 0 ) {

				return target.copy( line.start );

			}

			// Unsure if this is the correct method to handle this case.
			return undefined;

		}

		var t = - ( line.start.dot( this.normal ) + this.constant ) / denominator;

		if ( t < 0 || t > 1 ) {

			return undefined;

		}

		return target.copy( direction ).multiplyScalar( t ).add( line.start );

	},

	/**
	 * 判断线段line是否与平面相交
	 * @param {Line3} line 
	 */
	intersectsLine: function ( line ) {

		// Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.

		var startSign = this.distanceToPoint( line.start );
		var endSign = this.distanceToPoint( line.end );

		return ( startSign < 0 && endSign > 0 ) || ( endSign < 0 && startSign > 0 );

	},

	/**
	 * 判断立方体box是否与平面相交
	 * @param {Box} box 
	 */
	intersectsBox: function ( box ) {

		return box.intersectsPlane( this );

	},

	/**
	 * 判断球体spherre是否与平面相交
	 * @param {Sphere} sphere 
	 */
	intersectsSphere: function ( sphere ) {

		return sphere.intersectsPlane( this );

	},

	/**
	 * 获取当前二维平面的法线向量到当前二维平面投影(垂足,与当前平面的共面的点)
	 * @param {Vector3} target 
	 */
	coplanarPoint: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Plane: .coplanarPoint() target is now required' );
			target = new Vector3();

		}

		return target.copy( this.normal ).multiplyScalar( - this.constant );

	},

	/**
	 * 通过传递matrix(旋转,缩放,移动等变换矩阵)对当前Plane二维平面对象的法线向量normal和,应用变换
	 * @param {Matrix} matrix 
	 * @param {Matrix} optionalNormalMatrix 
	 */
	applyMatrix4: function ( matrix, optionalNormalMatrix ) {

		var normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix( matrix );

		var referencePoint = this.coplanarPoint( _vector1 ).applyMatrix4( matrix );

		var normal = this.normal.applyMatrix3( normalMatrix ).normalize();

		this.constant = - referencePoint.dot( normal );

		return this;

	},

	/**
	 * 用来通过參数offset,移动当前二维平面的位置.
	 * 将平面沿法向量方向移动一定的距离
	 * @param {Vector3} offset 
	 */
	translate: function ( offset ) {

		this.constant -= offset.dot( this.normal );

		return this;

	},

	equals: function ( plane ) {

		return plane.normal.equals( this.normal ) && ( plane.constant === this.constant );

	}

} );


export { Plane };
