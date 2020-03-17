import { Vector3 } from './Vector3.js';
import { Plane } from './Plane.js';

/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */

var _v0 = new Vector3();
var _v1 = new Vector3();
var _v2 = new Vector3();
var _v3 = new Vector3();

var _vab = new Vector3();
var _vac = new Vector3();
var _vbc = new Vector3();
var _vap = new Vector3();
var _vbp = new Vector3();
var _vcp = new Vector3();
/**
 * 由三个点生成一个三角形
 * @param {Vector3} a 
 * @param {Vector3} c 
 * @param {Vector3} b 
 */
function Triangle( a, b, c ) {

	this.a = ( a !== undefined ) ? a : new Vector3();
	this.b = ( b !== undefined ) ? b : new Vector3();
	this.c = ( c !== undefined ) ? c : new Vector3();

}

Object.assign( Triangle, {

	/**
	 * 计算三角形的法线向量
	 * @param {Vector3} a 
	 * @param {Vector3} b 
	 * @param {Vector3} c 
	 * @param {Vector3} target 
	 */
	getNormal: function ( a, b, c, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getNormal() target is now required' );
			target = new Vector3();

		}

		target.subVectors( c, b );
		_v0.subVectors( a, b );
		target.cross( _v0 );

		var targetLengthSq = target.lengthSq();
		if ( targetLengthSq > 0 ) {

			return target.multiplyScalar( 1 / Math.sqrt( targetLengthSq ) );

		}

		return target.set( 0, 0, 0 );

	},

	// static/instance method to calculate barycentric coordinates
	// based on: http://www.blackpawn.com/texts/pointinpoly/default.html
	/**
	 * 计算返回参数a,b,c所组成的三角形所在的平面上任意点(参数point)所表示三角形顶点的加权平均值
	 * 这个权值就是重心坐标
	 * @param {Vector3} point 
	 * @param {Vector3} a 
	 * @param {Vector3} b 
	 * @param {Vector3} c 
	 * @param {Vector3} target 
	 */
	getBarycoord: function ( point, a, b, c, target ) {

		_v0.subVectors( c, a );
		_v1.subVectors( b, a );
		_v2.subVectors( point, a );

		var dot00 = _v0.dot( _v0 );
		var dot01 = _v0.dot( _v1 );
		var dot02 = _v0.dot( _v2 );
		var dot11 = _v1.dot( _v1 );
		var dot12 = _v1.dot( _v2 );

		var denom = ( dot00 * dot11 - dot01 * dot01 );

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getBarycoord() target is now required' );
			target = new Vector3();

		}

		// collinear or singular triangle
		if ( denom === 0 ) {

			// arbitrary location outside of triangle?
			// not sure if this is the best idea, maybe should be returning undefined
			return target.set( - 2, - 1, - 1 );

		}

		var invDenom = 1 / denom;
		var u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
		var v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

		// barycentric coordinates must always sum to 1
		return target.set( 1 - u - v, v, u );

	},

	/**
	 * 判断任意点(参数point)是否在a,b,c所组成的三角形内
	 * @param {Vector3} point 
	 * @param {Vector3} a 
	 * @param {Vector3} b 
	 * @param {Vector3} c 
	 */
	containsPoint: function ( point, a, b, c ) {

		Triangle.getBarycoord( point, a, b, c, _v3 );

		return ( _v3.x >= 0 ) && ( _v3.y >= 0 ) && ( ( _v3.x + _v3.y ) <= 1 );

	},

	/**
	 * 
	 * @param {*} point 
	 * @param {*} p1 
	 * @param {*} p2 
	 * @param {*} p3 
	 * @param {*} uv1 
	 * @param {*} uv2 
	 * @param {*} uv3 
	 * @param {*} target 
	 */
	getUV: function ( point, p1, p2, p3, uv1, uv2, uv3, target ) {

		this.getBarycoord( point, p1, p2, p3, _v3 );

		target.set( 0, 0 );
		target.addScaledVector( uv1, _v3.x );
		target.addScaledVector( uv2, _v3.y );
		target.addScaledVector( uv3, _v3.z );

		return target;

	},

	isFrontFacing: function ( a, b, c, direction ) {

		_v0.subVectors( c, b );
		_v1.subVectors( a, b );

		// strictly front facing
		return ( _v0.cross( _v1 ).dot( direction ) < 0 ) ? true : false;

	}

} );

Object.assign( Triangle.prototype, {

	set: function ( a, b, c ) {

		this.a.copy( a );
		this.b.copy( b );
		this.c.copy( c );

		return this;

	},

	/**
	 * 通过数组和索引设置三角平面
	 * @param {*} points 
	 * @param {*} i0 
	 * @param {*} i1 
	 * @param {*} i2 
	 */
	setFromPointsAndIndices: function ( points, i0, i1, i2 ) {

		this.a.copy( points[ i0 ] );
		this.b.copy( points[ i1 ] );
		this.c.copy( points[ i2 ] );

		return this;

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( triangle ) {

		this.a.copy( triangle.a );
		this.b.copy( triangle.b );
		this.c.copy( triangle.c );

		return this;

	},

	/**
	 * 计算三角形面积
	 */
	getArea: function () {

		_v0.subVectors( this.c, this.b );
		_v1.subVectors( this.a, this.b );

		return _v0.cross( _v1 ).length() * 0.5;

	},

	/**
	 * 计算三角形中心
	 * @param {Vector3} target 
	 */
	getMidpoint: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getMidpoint() target is now required' );
			target = new Vector3();

		}

		return target.addVectors( this.a, this.b ).add( this.c ).multiplyScalar( 1 / 3 );

	},

	/**
	 * 计算三角形的法向量
	 * @param {Vector3} target 
	 */
	getNormal: function ( target ) {

		return Triangle.getNormal( this.a, this.b, this.c, target );

	},

	/**
	 * 创建三角形共面的平面Plane对象
	 * @param {Vector3} target 
	 */
	getPlane: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .getPlane() target is now required' );
			target = new Plane();

		}

		return target.setFromCoplanarPoints( this.a, this.b, this.c );

	},

	/**
	 * 计算返回当前三角形所在的平面上任意点(参数point)所表示当前三角形顶点的加权平均值
	 * 这个权值就是重心坐标
	 * @param {Vector3} point 
	 * @param {Vector3} target 
	 */
	getBarycoord: function ( point, target ) {

		return Triangle.getBarycoord( point, this.a, this.b, this.c, target );

	},

	getUV: function ( point, uv1, uv2, uv3, target ) {

		return Triangle.getUV( point, this.a, this.b, this.c, uv1, uv2, uv3, target );

	},

	containsPoint: function ( point ) {

		return Triangle.containsPoint( point, this.a, this.b, this.c );

	},

	isFrontFacing: function ( direction ) {

		return Triangle.isFrontFacing( this.a, this.b, this.c, direction );

	},

	intersectsBox: function ( box ) {

		return box.intersectsTriangle( this );

	},

	closestPointToPoint: function ( p, target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Triangle: .closestPointToPoint() target is now required' );
			target = new Vector3();

		}

		var a = this.a, b = this.b, c = this.c;
		var v, w;

		// algorithm thanks to Real-Time Collision Detection by Christer Ericson,
		// published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
		// under the accompanying license; see chapter 5.1.5 for detailed explanation.
		// basically, we're distinguishing which of the voronoi regions of the triangle
		// the point lies in with the minimum amount of redundant computation.

		_vab.subVectors( b, a );
		_vac.subVectors( c, a );
		_vap.subVectors( p, a );
		var d1 = _vab.dot( _vap );
		var d2 = _vac.dot( _vap );
		if ( d1 <= 0 && d2 <= 0 ) {

			// vertex region of A; barycentric coords (1, 0, 0)
			return target.copy( a );

		}

		_vbp.subVectors( p, b );
		var d3 = _vab.dot( _vbp );
		var d4 = _vac.dot( _vbp );
		if ( d3 >= 0 && d4 <= d3 ) {

			// vertex region of B; barycentric coords (0, 1, 0)
			return target.copy( b );

		}

		var vc = d1 * d4 - d3 * d2;
		if ( vc <= 0 && d1 >= 0 && d3 <= 0 ) {

			v = d1 / ( d1 - d3 );
			// edge region of AB; barycentric coords (1-v, v, 0)
			return target.copy( a ).addScaledVector( _vab, v );

		}

		_vcp.subVectors( p, c );
		var d5 = _vab.dot( _vcp );
		var d6 = _vac.dot( _vcp );
		if ( d6 >= 0 && d5 <= d6 ) {

			// vertex region of C; barycentric coords (0, 0, 1)
			return target.copy( c );

		}

		var vb = d5 * d2 - d1 * d6;
		if ( vb <= 0 && d2 >= 0 && d6 <= 0 ) {

			w = d2 / ( d2 - d6 );
			// edge region of AC; barycentric coords (1-w, 0, w)
			return target.copy( a ).addScaledVector( _vac, w );

		}

		var va = d3 * d6 - d5 * d4;
		if ( va <= 0 && ( d4 - d3 ) >= 0 && ( d5 - d6 ) >= 0 ) {

			_vbc.subVectors( c, b );
			w = ( d4 - d3 ) / ( ( d4 - d3 ) + ( d5 - d6 ) );
			// edge region of BC; barycentric coords (0, 1-w, w)
			return target.copy( b ).addScaledVector( _vbc, w ); // edge region of BC

		}

		// face region
		var denom = 1 / ( va + vb + vc );
		// u = va * denom
		v = vb * denom;
		w = vc * denom;

		return target.copy( a ).addScaledVector( _vab, v ).addScaledVector( _vac, w );

	},

	equals: function ( triangle ) {

		return triangle.a.equals( this.a ) && triangle.b.equals( this.b ) && triangle.c.equals( this.c );

	}

} );


export { Triangle };
