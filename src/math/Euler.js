import { Quaternion } from './Quaternion.js';
import { Vector3 } from './Vector3.js';
import { Matrix4 } from './Matrix4.js';
import { MathUtils } from './MathUtils.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

var _matrix = new Matrix4();
var _quaternion = new Quaternion();
/**
 *欧拉角这种旋转方式是最直观的，因为这种方式是将旋转表示为物体按坐标系的三个轴X(1,0,0) ,Y(0,1,0),Z(0,0,1)的旋转组合成的。这里首先要明确两个概念，1参考系：类似于物理中的参考系，是静止不动的，比如北极星，不管在那里，那就是北。2坐标系：坐标系是固定于物体的，随着物体的转动而发生变化，最简单的例子就是左右，人所说的左边一直是根据人所面对的方向来决定的。在下图中蓝色为参考系的三个轴，而红色是物体的坐标系的三个轴。虽然说欧拉角表示的旋转是有多个沿坐标轴的旋转组合而成的。但是旋转的顺序不同旋转就不同，所以，欧拉角中旋转的顺序要注明。这里的三个角是zxz顺规的欧拉角。物体先绕Z轴旋转了α°，然后物体坐标系的x轴的位置变化到了图中N的位置，然后绕这个N轴(X轴)旋转β°，最后再沿Z轴旋转γ°。
 * 表示将一个几何体绕x轴旋转x度，绕y轴旋转y度，绕z轴旋转z度;并且旋转的顺序是xyz ; 第三个参数旋转顺序可以是'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'
 * @param {*} x
 * @param {*} y
 * @param {*} z
 * @param {*} order
 */
function Euler( x, y, z, order ) {

	this._x = x || 0;
	this._y = y || 0;
	this._z = z || 0;
	this._order = order || Euler.DefaultOrder;

}
// 旋转的顺序
Euler.RotationOrders = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

Euler.DefaultOrder = 'XYZ';

Object.defineProperties( Euler.prototype, {

	x: {

		get: function () {

			return this._x;

		},

		set: function ( value ) {

			this._x = value;
			this._onChangeCallback();

		}

	},

	y: {

		get: function () {

			return this._y;

		},

		set: function ( value ) {

			this._y = value;
			this._onChangeCallback();

		}

	},

	z: {

		get: function () {

			return this._z;

		},

		set: function ( value ) {

			this._z = value;
			this._onChangeCallback();

		}

	},

	order: {

		get: function () {

			return this._order;

		},

		set: function ( value ) {

			this._order = value;
			this._onChangeCallback();

		}

	}

} );

Object.assign( Euler.prototype, {

	isEuler: true,

	set: function ( x, y, z, order ) {

		this._x = x;
		this._y = y;
		this._z = z;
		this._order = order || this._order;

		this._onChangeCallback();

		return this;

	},

	clone: function () {

		return new this.constructor( this._x, this._y, this._z, this._order );

	},

	copy: function ( euler ) {

		this._x = euler._x;
		this._y = euler._y;
		this._z = euler._z;
		this._order = euler._order;

		this._onChangeCallback();

		return this;

	},
	/**
	 * 旋转矩阵转欧拉角
	 * @param {Matrix4} m
	 * @param {string} order 旋转顺序，先按z轴旋转、之后y轴旋转、之后x轴旋转，或是其他
	 * @param {boolean} update
	 */
	setFromRotationMatrix: function ( m, order, update ) {
		//clamp(钳)用来设置数值的取值范围
		var clamp = MathUtils.clamp;

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		// 确保参数m是一个3x3的旋转矩阵.
		var te = m.elements;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {
			// 从世界坐标系旋转到相机坐标系，这是一个正向旋转的过程，绕z,y,x 旋转矩阵为RxRyRz
			// https://blog.csdn.net/fireflychh/article/details/82352710
			// 但也有说，绕z,y,x 旋转的为ZYX，参见 https://www.learnopencv.com/rotation-matrix-to-euler-angles/
			// 线性变换为左乘变换矩阵，所以绕轴的顺序与书写的前后顺序相反。先绕的写后面，后绕的写最左边。
			// 参见：https://blog.csdn.net/csxiaoshui/article/details/65446125

			// 世界坐标系和相机坐标系转换，见https://blog.csdn.net/qq_28448117/article/details/79526431
			//
			// 重新认识（20200121）：由于定义旋转矩阵时还有其他歧义。 例如。 给定一个点 {（x，y，z）}，您可以将此点视为行向量[x，y，z]或列向量[x，y，z] ^ T。 如果使用行向量，则必须对3×3旋转矩阵进行后乘；如果使用列向量表示，则必须对旋转矩阵进行预乘以旋转点。 这两个旋转矩阵不相同（它们是彼此的转置）。
			// 此处采用的是右乘旋转矩阵，为变换矩阵的转置矩阵，因此绕轴顺序是X-Y-Z
			// https://www.learnopencv.com/rotation-matrix-to-euler-angles/


			// 更进步认识（20200122）：order === 'XYZ' 代表的是矩阵的书写顺充，而不是执行顺序，实际执行顺充正好相反。
			// 参见https://blog.csdn.net/csxiaoshui/article/details/65446125

			this._y = Math.asin( clamp( m13, - 1, 1 ) );

			if ( Math.abs( m13 ) < 0.9999999 ) {

				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {

				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {

			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.9999999 ) {

				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {

				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {

			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.9999999 ) {

				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {

				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.9999999 ) {

				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {

				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.9999999 ) {

				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {

				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.9999999 ) {

				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {

				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}

		} else {

			console.warn( 'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order );

		}

		this._order = order;

		if ( update !== false ) this._onChangeCallback();

		return this;

	},

	setFromQuaternion: function ( q, order, update ) {

		_matrix.makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( _matrix, order, update );

	},

	setFromVector3: function ( v, order ) {

		return this.set( v.x, v.y, v.z, order || this._order );

	},
	/**
	 * 欧拉角表示的旋转是有多个沿坐标轴的旋转组合而成的。但是旋转的顺序不同旋转就不同，所以，欧拉角中旋转的顺序要注明。
	 * @param {*} newOrder 如：YXZ
	 */
	reorder: function ( newOrder ) {

		// WARNING: this discards revolution information -bhouston

		_quaternion.setFromEuler( this );

		return this.setFromQuaternion( _quaternion, newOrder );

	},

	equals: function ( euler ) {

		return ( euler._x === this._x ) && ( euler._y === this._y ) && ( euler._z === this._z ) && ( euler._order === this._order );

	},

	fromArray: function ( array ) {

		this._x = array[ 0 ];
		this._y = array[ 1 ];
		this._z = array[ 2 ];
		if ( array[ 3 ] !== undefined ) this._order = array[ 3 ];

		this._onChangeCallback();

		return this;

	},

	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		array[ offset ] = this._x;
		array[ offset + 1 ] = this._y;
		array[ offset + 2 ] = this._z;
		array[ offset + 3 ] = this._order;

		return array;

	},

	toVector3: function ( optionalResult ) {

		if ( optionalResult ) {

			return optionalResult.set( this._x, this._y, this._z );

		} else {

			return new Vector3( this._x, this._y, this._z );

		}

	},

	_onChange: function ( callback ) {

		this._onChangeCallback = callback;

		return this;

	},

	_onChangeCallback: function () {}

} );


export { Euler };
