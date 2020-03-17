import { Vector3 } from './Vector3.js';
import { MathUtils } from './MathUtils.js';

/**
 * @author bhouston / http://clara.io
 */

var _startP = new Vector3();
var _startEnd = new Vector3();

function Line3( start, end ) {

	this.start = ( start !== undefined ) ? start : new Vector3();
	this.end = ( end !== undefined ) ? end : new Vector3();

}

Object.assign( Line3.prototype, {

	set: function ( start, end ) {

		this.start.copy( start );
		this.end.copy( end );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( line ) {

		this.start.copy( line.start );
		this.end.copy( line.end );

		return this;

	},

	getCenter: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Line3: .getCenter() target is now required' );
			target = new Vector3();

		}

		return target.addVectors( this.start, this.end ).multiplyScalar( 0.5 );

	},

	/**
	 * 获取线段的向量
	 * @param {Vector3} target 
	 * @returns {Vector3}
	 */
	delta: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Line3: .delta() target is now required' );
			target = new Vector3();

		}

		return target.subVectors( this.end, this.start );

	},

	/**
	 * 获取当前线段起点到结束点的点积
	 * @returns {number}
	 */
	distanceSq: function () {

		return this.start.distanceToSquared( this.end );

	},

	/**
	 * 获取当前起点到结束点的距离
	 * @returns {number}
	 */
	distance: function () {

		return this.start.distanceTo( this.end );

	},

	/**
	 * 获取当前三维线段方向的任意向量
	 * @param {float} t  [0,1] 当t=0,返回起点向量,当t=1返回结束点向量
	 * @param {Vector3} target 
	 * @returns {Vector3}
	 */
	at: function ( t, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Line3: .at() target is now required' );
			target = new Vector3();

		}

		return this.delta( target ).multiplyScalar( t ).add( this.start );

	},

	/**
	 * 返回一个基于点投影到线段上点的参数(就是参数point投影到线段的位置)
	 * @param {Vector3} point 
	 * @param {boolean} clampToLine 
	 * @returns {float}
	 */
	closestPointToPointParameter: function ( point, clampToLine ) {

		_startP.subVectors( point, this.start );
		_startEnd.subVectors( this.end, this.start );

		var startEnd2 = _startEnd.dot( _startEnd );
		var startEnd_startP = _startEnd.dot( _startP );

		var t = startEnd_startP / startEnd2;

		if ( clampToLine ) {

			t = MathUtils.clamp( t, 0, 1 );

		}

		return t;

	},

	/**
	 * 返回一个基于点投影到线段上的向量
	 * @param {Vector3} point 
	 * @param {boolean} clampToLine 
	 * @param {Vector3} target 
	 */
	closestPointToPoint: function ( point, clampToLine, target ) {

		var t = this.closestPointToPointParameter( point, clampToLine );

		if ( target === undefined ) {

			console.warn( 'THREE.Line3: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		return this.delta( target ).multiplyScalar( t ).add( this.start );

	},

	/**
	 * 线段的起始点,结束点应用矩阵变换.达到旋转,缩放,移动的目的
	 * @param {Matrix4} matrix 
	 * @returns {this}
	 */
	applyMatrix4: function ( matrix ) {

		this.start.applyMatrix4( matrix );
		this.end.applyMatrix4( matrix );

		return this;

	},

	equals: function ( line ) {

		return line.start.equals( this.start ) && line.end.equals( this.end );

	}

} );


export { Line3 };
