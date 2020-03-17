import { Vector2 } from './Vector2.js';

/**
 * @author bhouston / http://clara.io
 */

var _vector = new Vector2();

/**
 * 通过最大max 和最小min 的两个二维向量设置四边平行于坐标轴的靠边四边形
 * max 和min代表了两个对顶的坐标点
 * @param {Vector2} min 
 * @param {Vector2} max 
 */
function Box2( min, max ) {

	this.min = ( min !== undefined ) ? min : new Vector2( + Infinity, + Infinity );
	this.max = ( max !== undefined ) ? max : new Vector2( - Infinity, - Infinity );

}

Object.assign( Box2.prototype, {

	set: function ( min, max ) {

		this.min.copy( min );
		this.max.copy( max );

		return this;

	},

	setFromPoints: function ( points ) {

		this.makeEmpty();

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			this.expandByPoint( points[ i ] );

		}

		return this;

	},

	setFromCenterAndSize: function ( center, size ) {

		var halfSize = _vector.copy( size ).multiplyScalar( 0.5 );
		this.min.copy( center ).sub( halfSize );
		this.max.copy( center ).add( halfSize );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( box ) {

		this.min.copy( box.min );
		this.max.copy( box.max );

		return this;

	},

	/**
	 * 置空四边形
	 */
	makeEmpty: function () {

		this.min.x = this.min.y = + Infinity;
		this.max.x = this.max.y = - Infinity;

		return this;

	},

	isEmpty: function () {

		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes

		return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );

	},

	getCenter: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box2: .getCenter() target is now required' );
			target = new Vector2();

		}

		return this.isEmpty() ? target.set( 0, 0 ) : target.addVectors( this.min, this.max ).multiplyScalar( 0.5 );

	},

	getSize: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box2: .getSize() target is now required' );
			target = new Vector2();

		}

		return this.isEmpty() ? target.set( 0, 0 ) : target.subVectors( this.max, this.min );

	},

	/**
	 * 通过Vector3对象(point参数)扩展立方体边界的最小值,最大值,min,max坐标值.并返回新的坐标值的立方体边界.
	 * expandByPoint方法与expandByVector方法都传递一个Vector3对象,
	 * expandByPoint方法将当前边界的最大值,最小值的x,y坐标对比,获得新的边界
	 * expandByVector方法将立方体边界的最大值加上参数vector,最小值减去参数vector,
	 * @param {Vector2}} point 
	 */
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

	/**
	 * 判断二维坐标是否在是否在当前盒子（等边四边形）内
	 * @param {Vector2} point 
	 * @returns {boolean}
	 */
	containsPoint: function ( point ) {

		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ? false : true;

	},

	/**
	 * 判断当前四边形盒子是否包含参数盒子
	 * @param {Box2} box 
	 */
	containsBox: function ( box ) {

		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y;

	},

	getParameter: function ( point, target ) {

		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		if ( target === undefined ) {

			console.warn( 'THREE.Box2: .getParameter() target is now required' );
			target = new Vector2();

		}

		return target.set(
			( point.x - this.min.x ) / ( this.max.x - this.min.x ),
			( point.y - this.min.y ) / ( this.max.y - this.min.y )
		);

	},

	intersectsBox: function ( box ) {

		// using 4 splitting planes to rule out intersections

		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ? false : true;

	},

	clampPoint: function ( point, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Box2: .clampPoint() target is now required' );
			target = new Vector2();

		}

		return target.copy( point ).clamp( this.min, this.max );

	},

	distanceToPoint: function ( point ) {

		var clampedPoint = _vector.copy( point ).clamp( this.min, this.max );
		return clampedPoint.sub( point ).length();

	},

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

	}

} );


export { Box2 };
