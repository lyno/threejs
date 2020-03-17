import { Box3 } from './Box3.js';
import { Vector3 } from './Vector3.js';

var _box = new Box3();

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */
/**
 * 创建一个圆心是center半径是radius的球体
 * @param {Vector3} center 中心点坐标值
 * @param {number} radius Number球体半径
 */
function Sphere( center, radius ) {

	this.center = ( center !== undefined ) ? center : new Vector3();
	this.radius = ( radius !== undefined ) ? radius : 0;

}

Object.assign( Sphere.prototype, {

	set: function ( center, radius ) {

		this.center.copy( center );
		this.radius = radius;

		return this;

	},

	/**
	 * 通过获得Vector3对象组成的points数组中的到圆心距离最大的值重新设置球体的半径,通过可选参数optionalCenter用来设置球体的圆心.并返回新半径,坐标值的球体
	 * 如果给setFromPoints()方法设置了optionalCenter参数,points数组中数值到圆心的距离将会改变.
	 * @param {Vector3[]} points 
	 * @param {Vector3} optionalCenter 
	 */
	setFromPoints: function ( points, optionalCenter ) {

		var center = this.center;

		if ( optionalCenter !== undefined ) {

			center.copy( optionalCenter );

		} else {

			_box.setFromPoints( points ).getCenter( center );

		}

		var maxRadiusSq = 0;

		for ( var i = 0, il = points.length; i < il; i ++ ) {

			maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( points[ i ] ) );

		}

		this.radius = Math.sqrt( maxRadiusSq );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( sphere ) {

		this.center.copy( sphere.center );
		this.radius = sphere.radius;

		return this;

	},

	empty: function () {

		return ( this.radius <= 0 );

	},

	/**
	 * 获得参数point(一个Vector3的三维点坐标)是否在当前球体内.
	 * @param {Vector3} point 
	 */
	containsPoint: function ( point ) {

		return ( point.distanceToSquared( this.center ) <= ( this.radius * this.radius ) );

	},

	/**
	 * 获得三维空间内一点到Sphere球体对象表面的距离
	 * @param {Vector3} point 
	 */
	distanceToPoint: function ( point ) {

		return ( point.distanceTo( this.center ) - this.radius );

	},

	/**
	 * 获取当前球体是否与参数sphere球体对象相交,返回true 或者 false
	 * @param {Sphere} sphere 
	 * @returns {boolean}
	 */
	intersectsSphere: function ( sphere ) {

		var radiusSum = this.radius + sphere.radius;

		return sphere.center.distanceToSquared( this.center ) <= ( radiusSum * radiusSum );

	},

	/**
	 * 获取当前球体是否与参数box立方体对象相交,返回true 或者 false
	 * @param {Box3} box 
	 * @returns {boolean}
	 */
	intersectsBox: function ( box ) {

		return box.intersectsSphere( this );

	},

	/**
	 * 获取当前球体是否与参数plane平面对象相交,返回true 或者 false
	 * @param {Plane} plane 
	 * @returns {boolean}
	 */
	intersectsPlane: function ( plane ) {

		return Math.abs( plane.distanceToPoint( this.center ) ) <= this.radius;

	},

	/**
	 * 收缩参数point到球体内.如果point在球体内.如果point在球体外,强制将point设置到球体表面
	 * @param {Vector3} point 
	 * @param {Vector3} target 返回剪裁过的边界点
	 */
	clampPoint: function ( point, target ) {

		var deltaLengthSq = this.center.distanceToSquared( point );

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .clampPoint() target is now required' );
			target = new Vector3();

		}

		target.copy( point );

		// 如果point在球体外,强制将point设置到球体表面
		if ( deltaLengthSq > ( this.radius * this.radius ) ) {

			target.sub( this.center ).normalize();
			target.multiplyScalar( this.radius ).add( this.center );

		}

		return target;

	},

	/**
	 * 返回当前球体的Box3立方体边界(这里应该外切于球体的一个立方体)
	 * @param {Vector3} target 
	 */
	getBoundingBox: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Sphere: .getBoundingBox() target is now required' );
			target = new Box3();

		}

		target.set( this.center, this.center );
		target.expandByScalar( this.radius );

		return target;

	},

	/**
	 * 对当前球体应用变换矩阵matrix(旋转,缩放,移动等变换矩阵)变换。
	 * 对当前Sphere球体对象的圆心和半径,应用变换
	 * @param {Matrix4}} matrix 
	 */
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

	}

} );


export { Sphere };
