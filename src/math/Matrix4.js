import { Vector3 } from './Vector3.js';
import { Euler } from './Euler.js';

var _v1 = new Vector3();
var _m1 = new Matrix4();
var _zero = new Vector3( 0, 0, 0 );
var _one = new Vector3( 1, 1, 1 );
var _x = new Vector3();
var _y = new Vector3();
var _z = new Vector3();

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */
/**
 * Matrix4对象的构造函数.用来创建一个4x4矩阵.Matrix4对象的功能函数采用定义构造的函数原型对象来实现,实际就是一个数组
 * https://www.cnblogs.com/cxchanpin/p/6852938.html
 */
function Matrix4() {
	// 给定矩阵的初始值
	// 结合设置Matrix4的原型中set函数，可看出这个转置矩阵，前4个数为矩阵的第一列，依次类推，最后4个数为第4列。
	// 因此在使用中用到的是这个矩阵的转置矩阵
	// 为何三给空间的变换要采用4维矩阵，参见https://www.zhihu.com/question/26655998/answer/43847213
	this.elements = [

		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1

	];

	if ( arguments.length > 0 ) {

		console.error( 'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.' );

	}

}
// 设置Matrix4的原型


Object.assign( Matrix4.prototype, {

	isMatrix4: true,

	/**
	 * set方法用来设置Matrix4(4x4矩阵)的元素值.并返回当前Matrix4(4x4矩阵)
	 * 传参顺序为行1的4个数，行2的4个数，行3的4个数，行4的4个数
	 * 矩阵中第1组4个数是列1，第2组4个数是列2，第3组4个数是列3，第4组4个数是列4
	 * 使用方法: var m = new Matrix4();
	 * m.set(11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44);
	 *
	 * @param {number} n11
	 * @param {number} n12
	 * @param {number} n13
	 * @param {number} n14
	 * @param {number} n21
	 * @param {number} n22
	 * @param {number} n23
	 * @param {number} n24
	 * @param {number} n31
	 * @param {number} n32
	 * @param {number} n33
	 * @param {number} n34
	 * @param {number} n41
	 * @param {number} n42
	 * @param {number} n43
	 * @param {number} n44
	 * @returns {this}
	 */
	set: function ( n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44 ) {

		var te = this.elements;

		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

		return this;

	},

	/**
	 * identity方法用来获得一个4x4矩阵的单位矩阵。
	 * 在矩阵的乘法中。有一种矩阵起着特殊的作用，如同数的乘法中的1,我们称这样的矩阵为单位矩阵
	 * 它是个方阵，它的主对角线（从左上角到右下角的对角线）上的元素均为1以外全都为0
	 * 对于单位矩阵E。有AE=EA=A
	 * @returns {this} 当前矩阵
	 */
	identity: function () {

		this.set(

			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * clone方法用来复制当前4x4矩阵的元素值.并返回新的Matrix4(4x4矩阵).
	 * @returns {Matrix4}
	 */
	clone: function () {

		return new Matrix4().fromArray( this.elements );

	},

	/**
	 * copy方法用来复制一个4x4矩阵的元素值，到当前Matrix4(4x4矩阵)中，并返回当前Matrix4(4x4矩阵)。
	 * @param {Matrix4} m 4x4矩阵
	 * @returns {Matrix4} 当前4x4矩阵
	 */
	copy: function ( m ) {

		var te = this.elements;
		var me = m.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ]; te[ 3 ] = me[ 3 ];
		te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ]; te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ];
		te[ 8 ] = me[ 8 ]; te[ 9 ] = me[ 9 ]; te[ 10 ] = me[ 10 ]; te[ 11 ] = me[ 11 ];
		te[ 12 ] = me[ 12 ]; te[ 13 ] = me[ 13 ]; te[ 14 ] = me[ 14 ]; te[ 15 ] = me[ 15 ];

		return this;

	},

	/**
	 * copyPosition方法用来复制參数m(4x4矩阵)的平移分量（矩阵m的最后列的前3项的值），到当前Matrix4(4x4矩阵)中，并返回当前Matrix4(4x4矩阵).
	 * @param {Matrix4} m
	 * @returns {Matrix4} 当前4x4矩阵
	 */
	copyPosition: function ( m ) {

		var te = this.elements, me = m.elements;

		te[ 12 ] = me[ 12 ];
		te[ 13 ] = me[ 13 ];
		te[ 14 ] = me[ 14 ];

		return this;

	},

	/**
	 * 抽取基本值，将当前矩阵的第一列前3个值赋值给xAxis，第二列前3个值赋值给yAxis，第三列前3个值赋值给zAxis
	 * 并返回当前Matrix4(4x4矩阵)。
	 * @param {Vector3} xAxis
	 * @param {Vector3} yAxis
	 * @param {Vector3} zAxis
	 * @return {this}
	 */
	extractBasis: function ( xAxis, yAxis, zAxis ) {

		xAxis.setFromMatrixColumn( this, 0 );
		yAxis.setFromMatrixColumn( this, 1 );
		zAxis.setFromMatrixColumn( this, 2 );

		return this;

	},

	/**
	 * 设置基本值，根据传入的参数设置当前矩阵的基本值
	 * 并返回当前Matrix4(4x4矩阵)。
	 * @param {Vector3} xAxis
	 * @param {Vector3} yAxis
	 * @param {Vector3} zAxis
	 * @return {this} 返回当前Matrix4(4x4矩阵)。
	 */
	makeBasis: function ( xAxis, yAxis, zAxis ) {

		this.set(
			xAxis.x, yAxis.x, zAxis.x, 0,
			xAxis.y, yAxis.y, zAxis.y, 0,
			xAxis.z, yAxis.z, zAxis.z, 0,
			0, 0, 0, 1
		);

		return this;

	},

	/**
	 * extractRotation方法用来提取參数m(4x4矩阵)的旋转分量.并返回新的Matrix4(4x4矩阵).
	 * 使当前矩阵成为旋转矩阵，用于旋转变换
	 * @param {Matrix4} m
	 * @return {this} 返回当前Matrix4(4x4矩阵)。
	 */
	extractRotation: function ( m ) {

		// this method does not support reflection matrices

		var te = this.elements;
		var me = m.elements;

		// 求出三个坐标轴方向的向量长度的倒数。
		var scaleX = 1 / _v1.setFromMatrixColumn( m, 0 ).length();
		var scaleY = 1 / _v1.setFromMatrixColumn( m, 1 ).length();
		var scaleZ = 1 / _v1.setFromMatrixColumn( m, 2 ).length();

		te[ 0 ] = me[ 0 ] * scaleX;
		te[ 1 ] = me[ 1 ] * scaleX;
		te[ 2 ] = me[ 2 ] * scaleX;
		te[ 3 ] = 0;

		te[ 4 ] = me[ 4 ] * scaleY;
		te[ 5 ] = me[ 5 ] * scaleY;
		te[ 6 ] = me[ 6 ] * scaleY;
		te[ 7 ] = 0;

		te[ 8 ] = me[ 8 ] * scaleZ;
		te[ 9 ] = me[ 9 ] * scaleZ;
		te[ 10 ] = me[ 10 ] * scaleZ;
		te[ 11 ] = 0;

		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	/**
	 * makeRotationFromEuler方法通过欧拉角(參数euler)对当前Matrix4(4x4矩阵)设置旋转矩阵.
	 * @param {Euler} euler 欧拉角
	 * @returns {Matrix4} 当前4x4矩阵
	 */
	makeRotationFromEuler: function ( euler ) {

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.' );

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

		// bottom row 最下的一行
		te[ 3 ] = 0;
		te[ 7 ] = 0;
		te[ 11 ] = 0;

		// last column 最后一列
		te[ 12 ] = 0;
		te[ 13 ] = 0;
		te[ 14 ] = 0;
		te[ 15 ] = 1;

		return this;

	},

	/**
	 *
	 * @param {Quaternion} q
	 * @returns {Matrix4} 当前4x4矩阵
	 */
	/**
	 * makeRotationFromQuaternion方法通过四元数(參数q)对当前Matrix4(4x4矩阵)设置旋转矩阵.
	 * @param {Quaternion} q
	 * @returns {Matrix4} 当前4x4矩阵
	 */
	makeRotationFromQuaternion: function ( q ) {

		// _zero = (0,0,0)
		// _one = (1,1,1)
		return this.compose( _zero, q, _one );

	},

	/**
	 * lookAt(eye,center,up)将对象设定为一个视图矩阵。參数都是Vector3对象，该矩阵仅仅会用到eye和center的相对位置。
	 * @param {Vector3} eye 表示相机位置的Vector3三维向量
	 * @param {Vector3} target 表示目标的Vector3三维向量
	 * @param {Vector3} up 表示向上的Vector3三维向量
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	lookAt: function ( eye, target, up ) {

		var te = this.elements;

		_z.subVectors( eye, target );

		if ( _z.lengthSq() === 0 ) {

			// eye and target are in the same position

			_z.z = 1;

		}

		_z.normalize();
		_x.crossVectors( up, _z );

		if ( _x.lengthSq() === 0 ) {

			// up and z are parallel

			if ( Math.abs( up.z ) === 1 ) {

				_z.x += 0.0001;

			} else {

				_z.z += 0.0001;

			}

			_z.normalize();
			_x.crossVectors( up, _z );

		}

		_x.normalize();
		_y.crossVectors( _z, _x );

		te[ 0 ] = _x.x; te[ 4 ] = _y.x; te[ 8 ] = _z.x;
		te[ 1 ] = _x.y; te[ 5 ] = _y.y; te[ 9 ] = _z.y;
		te[ 2 ] = _x.z; te[ 6 ] = _y.z; te[ 10 ] = _z.z;

		return this;

	},

	/**
	 * multiply方法用来将当前Matrix4(4x4矩阵)与參数m相乘（m右乘当前Matrix4）.并返回当前Matrix4(4x4矩阵)
	 * @param {Matrix4} m 与当前对象元素值相乘的Matrix4(4x4矩阵)
	 * @param {Matrix4} n 推断是否有第二个參数w,假设有的话,调用.multiplyMatrices()方法
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	multiply: function ( m, n ) {

		if ( n !== undefined ) {

			console.warn( 'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
			return this.multiplyMatrices( m, n );

		}

		return this.multiplyMatrices( this, m );

	},

	/**
	 * m左乘当前Matrix4(4x4矩阵)
	 * @param {Matrix4} m
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	premultiply: function ( m ) {

		// 在现有的矩阵上进行变换，两个矩阵相乘，更新的矩阵Matrix4(4x4矩阵)
		return this.multiplyMatrices( m, this );

	},

	/**
	 * multiplyMatrices方法用来将矩阵a,b相乘,并返回当前Matrix4(4x4矩阵).
	 * @param {Matrix4} a
	 * @param {Matrix4} b
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
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

		// 矩阵a左乘b
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

	multiplyScalar: function ( s ) {

		var te = this.elements;

		te[ 0 ] *= s; te[ 4 ] *= s; te[ 8 ] *= s; te[ 12 ] *= s;
		te[ 1 ] *= s; te[ 5 ] *= s; te[ 9 ] *= s; te[ 13 ] *= s;
		te[ 2 ] *= s; te[ 6 ] *= s; te[ 10 ] *= s; te[ 14 ] *= s;
		te[ 3 ] *= s; te[ 7 ] *= s; te[ 11 ] *= s; te[ 15 ] *= s;

		return this;

	},

	/**
	 * determinant方法用来获得Matrix4(4x4矩阵)的行列式
	 * 通过求解行列式值的方式来推断矩阵的逆矩阵是否存在(行列式的值不等于0,表示该矩阵有逆矩阵).
	 * @returns {number} 行列式值
	 */
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

	/**
	 * transpose方法用来获得Matrix4(4x4矩阵)的转置矩阵.
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
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

	/**
	 * setPosition方法用来将参数（x,y,z）或三维向量x设置到当前矩阵中代表位置,并返回当前Matrix4(4x4矩阵).
	 * @param {Vector3|number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	setPosition: function ( x, y, z ) {

		var te = this.elements;

		if ( x.isVector3 ) {

			te[ 12 ] = x.x;
			te[ 13 ] = x.y;
			te[ 14 ] = x.z;

		} else {

			te[ 12 ] = x;
			te[ 13 ] = y;
			te[ 14 ] = z;

		}

		return this;

	},

	/**
	 * getInverse方法用来获得参数Matrix4(4x4矩阵)m的逆矩阵.
	 * @param {Matrix4} m 原矩阵
	 * @param {*} throwOnDegenerate 是否报错
	 * @returns {this}
	 */
	getInverse: function ( m, throwOnDegenerate ) {

		// based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
		var te = this.elements,
			me = m.elements,

			n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
			n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
			n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
			n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

		if ( det === 0 ) {

			var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

			if ( throwOnDegenerate === true ) {

				throw new Error( msg );

			} else {

				console.warn( msg );

			}

			return this.identity();

		}

		var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

		return this;

	},

	/**
	 * scale方法通过预先计算比例向量，将指定的比例向量应用到此 Matrix4(4x4矩阵)。
	 * @param {Vector3} v
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	scale: function ( v ) {

		var te = this.elements;
		var x = v.x, y = v.y, z = v.z;

		te[ 0 ] *= x; te[ 4 ] *= y; te[ 8 ] *= z;
		te[ 1 ] *= x; te[ 5 ] *= y; te[ 9 ] *= z;
		te[ 2 ] *= x; te[ 6 ] *= y; te[ 10 ] *= z;
		te[ 3 ] *= x; te[ 7 ] *= y; te[ 11 ] *= z;

		return this;

	},

	/**
	 * 获取三个轴方向的最大比例
	 * @returns {number} 返回最大比例值
	 */
	getMaxScaleOnAxis: function () {

		var te = this.elements;

		var scaleXSq = te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] + te[ 2 ] * te[ 2 ];
		var scaleYSq = te[ 4 ] * te[ 4 ] + te[ 5 ] * te[ 5 ] + te[ 6 ] * te[ 6 ];
		var scaleZSq = te[ 8 ] * te[ 8 ] + te[ 9 ] * te[ 9 ] + te[ 10 ] * te[ 10 ];

		return Math.sqrt( Math.max( scaleXSq, scaleYSq, scaleZSq ) );

	},

	/**
	 * makeTranslation方法依据x, y, z生成平移矩阵.
	 * 用法：左乘目标向量，实现向量平移
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	makeTranslation: function ( x, y, z ) {

		this.set(

			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * makeRotationX方法生成绕x轴转theta弧度的旋转矩阵
	 * 用法：左乘目标向量，实现向量旋转
	 * @param {number} theta 旋转弧度
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	makeRotationX: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			1, 0, 0, 0,
			0, c, - s, 0,
			0, s, c, 0,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * makeRotationY方法生成绕y轴转theta弧度的旋转矩阵
	 * 用法：左乘目标向量，实现向量旋转
	 * @param {number} theta 旋转弧度
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
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

	/**
	 * makeRotationZ方法生成绕z轴转theta弧度的旋转矩阵
	 * 用法：左乘目标向量，实现向量旋转
	 * @param {number} theta 旋转弧度
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	makeRotationZ: function ( theta ) {

		var c = Math.cos( theta ), s = Math.sin( theta );

		this.set(

			c, - s, 0, 0,
			s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * makeRotationAxis方法生成绕随意轴转angle弧度的旋转矩阵
	 * 用法：左乘目标向量，实现向量旋转
	 * @param {Vector3} axis 转轴向量(axis必须是单位向量)
	 * @param {number} angle 旋转弧度
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
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

	/**
	 * makeScale方法依据x, y, z生成缩放矩阵.
	 * 用法：左乘目标向量，实现向量缩放
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	makeScale: function ( x, y, z ) {

		this.set(

			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * makeShear方法依据x, y, z生成剪切矩阵.
	 * 用法：左乘目标向量，实现向量剪切
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 * @returns {this} 返回当前Matrix4(4x4矩阵)
	 */
	makeShear: function ( x, y, z ) {

		this.set(

			1, y, z, 0,
			x, 1, z, 0,
			x, y, 1, 0,
			0, 0, 0, 1

		);

		return this;

	},

	/**
	 * compose方法根据参数设置当前变换矩阵的平移、旋转和缩放设置
	 * @param {Vector3} position 平移向量
	 * @param {Quaternion} quaternion 旋转四元数
	 * @param {Vector3} scale 缩放向量
	 * @returns {this} Matrix4当前4x4矩阵
	 */
	compose: function ( position, quaternion, scale ) {

		var te = this.elements;

		var x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		var x2 = x + x,	y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

		var sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		// 最后一列 平移因子
		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;

	},

	/**
	 * decompose方法将矩阵的平移、旋转和缩放分量分离
	 * 分离结果分别放在参数中
	 * @param {Vector3} position 平移分量
	 * @param {Quaternion} quaternion 旋转四元数
	 * @param {Vector3} scale 缩放
	 * @returns {this} Matrix4当前4x4矩阵
	 */
	decompose: function ( position, quaternion, scale ) {

		var te = this.elements;

		var sx = _v1.set( te[ 0 ], te[ 1 ], te[ 2 ] ).length();
		var sy = _v1.set( te[ 4 ], te[ 5 ], te[ 6 ] ).length();
		var sz = _v1.set( te[ 8 ], te[ 9 ], te[ 10 ] ).length();

		// if determine is negative, we need to invert one scale
		// 假设行列式是负数,把比例转换成正数
		var det = this.determinant();
		if ( det < 0 ) sx = - sx;

		position.x = te[ 12 ];
		position.y = te[ 13 ];
		position.z = te[ 14 ];

		// scale the rotation part
		// 缩放有关旋转的元素
		_m1.copy( this );

		var invSX = 1 / sx;
		var invSY = 1 / sy;
		var invSZ = 1 / sz;

		_m1.elements[ 0 ] *= invSX;
		_m1.elements[ 1 ] *= invSX;
		_m1.elements[ 2 ] *= invSX;

		_m1.elements[ 4 ] *= invSY;
		_m1.elements[ 5 ] *= invSY;
		_m1.elements[ 6 ] *= invSY;

		_m1.elements[ 8 ] *= invSZ;
		_m1.elements[ 9 ] *= invSZ;
		_m1.elements[ 10 ] *= invSZ;

		quaternion.setFromRotationMatrix( _m1 );

		scale.x = sx;
		scale.y = sy;
		scale.z = sz;

		return this;

	},

	/**
	 * makePerspective方法依据left, right, bottom, top, near, far生成透视投影矩阵
	 * @param {number} left 指明相对于垂直平面的左侧坐标位置
	 * @param {number} right 指明相对于垂直平面的右侧坐标位置
	 * @param {number} top 指明相对于垂直平面的顶部坐标位置
	 * @param {number} bottom 指明相对于垂直平面的底部坐标位置
	 * @param {number} near 指明相对于深度剪切面的近的距离，必须为正数
	 * @param {number} far 指明相对于深度剪切面的远的距离，必须为正数
	 * @returns {this} Matrix4当前4x4矩阵
	 */
	makePerspective: function ( left, right, top, bottom, near, far ) {

		if ( far === undefined ) {

			console.warn( 'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.' );

		}

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

	/**
	 * makeOrthographic方法依据left, right, bottom, top, near, far生成正交投影矩阵
	 * @param {number} left 指明相对于垂直平面的左侧坐标位置
	 * @param {number} right 指明相对于垂直平面的右侧坐标位置
	 * @param {number} top 指明相对于垂直平面的顶部坐标位置
	 * @param {number} bottom 指明相对于垂直平面的底部坐标位置
	 * @param {number} near 指明相对于深度剪切面的近的距离，必须为正数
	 * @param {number} far 指明相对于深度剪切面的远的距离，必须为正数
	 * @returns {this} Matrix4当前4x4矩阵
	 */
	makeOrthographic: function ( left, right, top, bottom, near, far ) {

		var te = this.elements;
		var w = 1.0 / ( right - left );
		var h = 1.0 / ( top - bottom );
		var p = 1.0 / ( far - near );

		var x = ( right + left ) * w;
		var y = ( top + bottom ) * h;
		var z = ( far + near ) * p;

		te[ 0 ] = 2 * w;	te[ 4 ] = 0;	te[ 8 ] = 0;	te[ 12 ] = - x;
		te[ 1 ] = 0;	te[ 5 ] = 2 * h;	te[ 9 ] = 0;	te[ 13 ] = - y;
		te[ 2 ] = 0;	te[ 6 ] = 0;	te[ 10 ] = - 2 * p;	te[ 14 ] = - z;
		te[ 3 ] = 0;	te[ 7 ] = 0;	te[ 11 ] = 0;	te[ 15 ] = 1;

		return this;

	},

	/**
	 * 判断传入的矩阵是否与当前矩阵相等
	 * @param {Matrix} matrix
	 * @returns {boolean} 判断结果（true or false）
	 */
	equals: function ( matrix ) {

		var te = this.elements;
		var me = matrix.elements;

		for ( var i = 0; i < 16; i ++ ) {

			if ( te[ i ] !== me[ i ] ) return false;

		}

		return true;

	},

	/**
	 * fromArray方法将存储Matrix4(4x4矩阵)元素值的数组赋值给当前Matrix4(4x4矩阵)对象
	 * @param {number[]} array Matrix4(4x4矩阵)元素值的数组array
	 * @param {number} offset 偏移量
	 * @returns {this} Matrix4当前4x4矩阵
	 */
	fromArray: function ( array, offset ) {

		if ( offset === undefined ) offset = 0;

		for ( var i = 0; i < 16; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;

	},

	/**
	 * toArray方法将当前Matrix4(4x4矩阵)的元素值赋值给数组array.返回一个数组对象.
	 * @param {number[]} array 用来存储当前Matrix4(4x4矩阵)元素值的数组
	 * @param {number} offset 偏移量
	 * @returns {number[]} 数组对象
	 */
	toArray: function ( array, offset ) {

		if ( array === undefined ) array = [];
		if ( offset === undefined ) offset = 0;

		var te = this.elements;

		array[ offset ] = te[ 0 ];
		array[ offset + 1 ] = te[ 1 ];
		array[ offset + 2 ] = te[ 2 ];
		array[ offset + 3 ] = te[ 3 ];

		array[ offset + 4 ] = te[ 4 ];
		array[ offset + 5 ] = te[ 5 ];
		array[ offset + 6 ] = te[ 6 ];
		array[ offset + 7 ] = te[ 7 ];

		array[ offset + 8 ] = te[ 8 ];
		array[ offset + 9 ] = te[ 9 ];
		array[ offset + 10 ] = te[ 10 ];
		array[ offset + 11 ] = te[ 11 ];

		array[ offset + 12 ] = te[ 12 ];
		array[ offset + 13 ] = te[ 13 ];
		array[ offset + 14 ] = te[ 14 ];
		array[ offset + 15 ] = te[ 15 ];

		return array;

	}

} );


export { Matrix4 };
