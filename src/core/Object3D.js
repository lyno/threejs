import { Quaternion } from '../math/Quaternion.js';
import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';
import { EventDispatcher } from './EventDispatcher.js';
import { Euler } from '../math/Euler.js';
import { Layers } from './Layers.js';
import { Matrix3 } from '../math/Matrix3.js';
import { MathUtils } from '../math/MathUtils.js';

var _object3DId = 0;

var _v1 = new Vector3();
var _q1 = new Quaternion();
var _m1 = new Matrix4();
var _target = new Vector3();

var _position = new Vector3();
var _scale = new Vector3();
var _quaternion = new Quaternion();

var _xAxis = new Vector3( 1, 0, 0 );
var _yAxis = new Vector3( 0, 1, 0 );
var _zAxis = new Vector3( 0, 0, 1 );

var _addedEvent = { type: 'added' };
var _removedEvent = { type: 'removed' };

/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author elephantatwork / www.elephantatwork.ch
 */

/**
 * Object3D是ThreeJS中大部分物体的基类，它包含了物体的位移，旋转，缩放，以及各个物体父子关系的js实现
 *
 */
function Object3D() {

	// Object.defineProperty（obj, prop ， descriptior） ：表示新增或者修改一个已经存在的属性，并返回这个对象;
	// 等同于this.id = _object3DId ++;
	Object.defineProperty( this, 'id', { value: _object3DId ++ } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	this.type = 'Object3D';

	// 父对象
	this.parent = null;
	// 子对象
	this.children = [];

	// Vector3 初始化以Y轴正方向的向量
	this.up = Object3D.DefaultUp.clone();

	// 表示物体的位移
	var position = new Vector3();

	// 物体朝向的一个属性–rotation，这是一个欧拉类型的值，有三个轴旋转的角度，单位是π，还有一个旋转的顺序组成。
	// 要使物体旋转可以改动这个rotation的值
	var rotation = new Euler();
	// 初始化成四元数，quaternion代表物体的旋转，
	// Euler和Quaternion是3D物体统一旋转的不同数学表达方式
	var quaternion = new Quaternion();
	// scale表示物体的缩放
	var scale = new Vector3( 1, 1, 1 );

	/**
	 * 当rotation属性值更改，调用setFromEuler()方法
	 */
	function onRotationChange() {

		//欧拉角转化成四元数
		quaternion.setFromEuler( rotation, false );

	}

	/**
	 * 当quaternion属性值更改，setFromQuaternion()方法
	 * onRotationChange, onQuaternionChange这两个回调用于同步欧拉角和四元数，保证他们代表着相同的旋转角度。
	 */
	function onQuaternionChange() {

		// 通过设置四元，旋转得到坐标
		rotation.setFromQuaternion( quaternion, undefined, false );

	}

	// 给对象rotation属性绑定onRotationChange()方法
	rotation._onChange( onRotationChange );
	// 给对象quaternion属性绑定onQuaternionChange()方法
	quaternion._onChange( onQuaternionChange );

	// 定义一些基本属性
	// 其中modelViewMatrix
	// normalMatrix
	Object.defineProperties( this, {
		position: {
			configurable: true,
			enumerable: true,
			value: position
		},

		rotation: {
			configurable: true,
			enumerable: true,
			value: rotation
		},
		quaternion: {
			configurable: true,
			enumerable: true,
			value: quaternion
		},
		scale: {
			configurable: true,
			enumerable: true,
			value: scale
		},
		modelViewMatrix: {
			value: new Matrix4()
		},
		normalMatrix: {
			value: new Matrix3()
		}
	} );

	// Matrix4本地形变矩阵，表示物体自身的本地形变
	this.matrix = new Matrix4();
	// Matrix4全局形变矩阵，表示物体的全局形变，当物体没有父对象时，全局形变就是本地形变
	// 当该对象有父物体的时候，matrixWorld= 父物体的世界矩阵matrixWorld * matrix，即this.matrixWorld = this.parent.matrixWorld*this.matrix
	this.matrixWorld = new Matrix4();

	//矩阵自动更新
	this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
	// 每帧是否重新计算世界矩阵
	this.matrixWorldNeedsUpdate = false;

	//层
	this.layers = new Layers();
	//是否隐藏
	this.visible = true;

	//是否生成阴影
	this.castShadow = false;
	//是否接受阴影
	this.receiveShadow = false;

	//锥形剔除
	this.frustumCulled = true;
	//渲染命令
	this.renderOrder = 0;

	//用户自定义数据
	this.userData = {};

}
// 默认Y轴正方向的向量
Object3D.DefaultUp = new Vector3( 0, 1, 0 );
// 默认矩阵自动更新
Object3D.DefaultMatrixAutoUpdate = true;
// 定义Object3D的原型对象
// 其中EventDispatcher.prototype是原型对象的原型
Object3D.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: Object3D,

	isObject3D: true,

	onBeforeRender: function () {},
	onAfterRender: function () {},

	/**
	 * 应用矩阵变换，达到缩放，旋转，移动的目的
	 * @param {Matrix4} matrix
	 */
	applyMatrix: function ( matrix ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		// 为物体加上形变，这里用的是左乘
		this.matrix.premultiply( matrix );

		// 把变换矩阵分解成 平移分量，旋转四元数分量，缩放分量，存放在相应的position, quaternion, 和scale中
		this.matrix.decompose( this.position, this.quaternion, this.scale );

	},

	/**
	 * 通过四元数旋转物体。
	 * @param {Quaternion} q
	 */
	applyQuaternion: function ( q ) {

		// 左乘
		this.quaternion.premultiply( q );

		return this;

	},

	/**
	 * 通过四元数的方式旋转任意坐标轴(参数axis)旋转角度(参数angle),最后将结果返回到this.quternion属性中
	 * @param {Vector3}} axis 转轴向量(axis必须是单位向量)
	 * @param {number} angle 旋转弧度
	 * @returns {undefined}
	 */
	setRotationFromAxisAngle: function ( axis, angle ) {

		// assumes axis is normalized假设轴已归一化(axis必须是单位向量)
		this.quaternion.setFromAxisAngle( axis, angle );

	},

	/**
	 * 通过将欧拉角转换为四元数来旋转物体。最后将结果返回到this.quternion属性中
	 * @param {Euler} euler
	 * @returns {undefined}
	 */
	setRotationFromEuler: function ( euler ) {

		this.quaternion.setFromEuler( euler, true );

	},

	/**
	 * 通过将传入的旋转矩阵转换为四元数来旋转物体。
	 * @param {Matrix4} m
	 */
	setRotationFromMatrix: function ( m ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		this.quaternion.setFromRotationMatrix( m );

	},

	setRotationFromQuaternion: function ( q ) {

		// assumes q is normalized

		this.quaternion.copy( q );

	},

	/**
	 * 将物体绕轴旋转。指定旋转的轴，这里的axis是一个Vector3类型的值
	 * 具体实现中，通过将旋转轴和旋转角转换成四元数来实现旋转。
	 * @param {Vector3} axis
	 * @param {number} angle
	 */
	rotateOnAxis: function ( axis, angle ) {

		// rotate object on axis in object space
		// axis is assumed to be normalized

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.multiply( _q1 );

		return this;

	},

	rotateOnWorldAxis: function ( axis, angle ) {

		// rotate object on axis in world space
		// axis is assumed to be normalized
		// method assumes no rotated parent

		_q1.setFromAxisAngle( axis, angle );

		this.quaternion.premultiply( _q1 );

		return this;

	},
	/**
	 * 将物体绕X轴旋转。
	 * 是rotateOnAxis的具体化。
	 * @param {Vector3} _xAxis
	 * @param {number} angle
	 */
	rotateX: function ( angle ) {

		return this.rotateOnAxis( _xAxis, angle );

	},

	/**
	 * 将物体绕Y轴旋转。
	 * 是rotateOnAxis的具体化。
	 * @param {Vector3} _xAxis
	 * @param {number} angle
	 */
	rotateY: function ( angle ) {

		return this.rotateOnAxis( _yAxis, angle );

	},

	/**
	 * 将物体绕Z轴旋转。
	 * 是rotateOnAxis的具体化。
	 * @param {Vector3} _xAxis
	 * @param {number} angle
	 */
	rotateZ: function ( angle ) {

		return this.rotateOnAxis( _zAxis, angle );

	},

	/**
	 * 这个方法提供了让物体基于本地空间进行位移的功能。
	 * 由于物体发生过旋转，因此需要先将位移的目标向量进行同样的旋转，然后再相加：
	 * @param {Vector3} axis
	 * @param {number} distance
	 */
	translateOnAxis: function ( axis, distance ) {

		// translate object by distance along axis in object space
		// axis is assumed to be normalized

		_v1.copy( axis ).applyQuaternion( this.quaternion );

		this.position.add( _v1.multiplyScalar( distance ) );

		return this;

	},

	/**
	 * 这个方法提供了让物体基于本地空间沿X轴进行位移的功能。
	 * 是translateOnAxis的具体化。
	 * @param {Vector3} axis
	 * @param {number} distance
	 */
	translateX: function ( distance ) {

		return this.translateOnAxis( _xAxis, distance );

	},

	/**
	 * 这个方法提供了让物体基于本地空间沿Y轴进行位移的功能。
	 * 是translateOnAxis的具体化。
	 * @param {Vector3} axis
	 * @param {number} distance
	 */
	translateY: function ( distance ) {

		return this.translateOnAxis( _yAxis, distance );

	},

	/**
	 * 这个方法提供了让物体基于本地空间沿Z轴进行位移的功能。
	 * 是translateOnAxis的具体化。
	 * @param {Vector3} axis
	 * @param {number} distance
	 */
	translateZ: function ( distance ) {

		return this.translateOnAxis( _zAxis, distance );

	},

	/**
	 * 这个方法提供了将向量转化到世界空间。
	 * 实现非常简单，只需将世界矩阵相乘左乘目标向量即可
	 * @param {Vector3} vector
	 * @returns {Vector3} 世界空间的向量
	 */
	localToWorld: function ( vector ) {

		// 将世界矩阵相乘左乘目标向量
		return vector.applyMatrix4( this.matrixWorld );

	},

	/**
	 * 这个方法提供了将向量转化到本地空间。
	 * 实现非常简单，只需将世界矩阵的逆矩阵相乘左乘目标向量即可
	 * @param {Vector3} vector
	 * @returns {Vector3} 世界空间的向量
	 */
	worldToLocal: function ( vector ) {

		// 将世界矩阵的逆矩阵相乘左乘目标向量
		return vector.applyMatrix4( _m1.getInverse( this.matrixWorld ) );

	},

	lookAt: function ( x, y, z ) {

		// This method does not support objects having non-uniformly-scaled parent(s)

		if ( x.isVector3 ) {

			_target.copy( x );

		} else {

			_target.set( x, y, z );

		}

		var parent = this.parent;

		this.updateWorldMatrix( true, false );

		_position.setFromMatrixPosition( this.matrixWorld );

		if ( this.isCamera || this.isLight ) {

			_m1.lookAt( _position, _target, this.up );

		} else {

			_m1.lookAt( _target, _position, this.up );

		}

		this.quaternion.setFromRotationMatrix( _m1 );

		if ( parent ) {

			_m1.extractRotation( parent.matrixWorld );
			_q1.setFromRotationMatrix( _m1 );
			this.quaternion.premultiply( _q1.inverse() );

		}

	},

	/**
	 * 通过add为物体添加子对象
	 * 如果该子对象有其他的父对象，会先解除子对象和旧的父对象的父子关系
	 * @param {Object3D} object
	 * @returns {this} 返回当前对象
	 */
	add: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( "THREE.Object3D.add: object can't be added as a child of itself.", object );
			return this;

		}

		if ( ( object && object.isObject3D ) ) {

			// 如果该子对象有其他的父对象，会先解除子对象和旧的父对象的父子关系
			if ( object.parent !== null ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			object.dispatchEvent( _addedEvent );

		} else {

			console.error( "THREE.Object3D.add: object not an instance of THREE.Object3D.", object );

		}

		return this;

	},

	remove: function ( object ) {

		if ( arguments.length > 1 ) {

			for ( var i = 0; i < arguments.length; i ++ ) {

				this.remove( arguments[ i ] );

			}

			return this;

		}

		var index = this.children.indexOf( object );

		if ( index !== - 1 ) {

			object.parent = null;
			this.children.splice( index, 1 );

			object.dispatchEvent( _removedEvent );

		}

		return this;

	},

	attach: function ( object ) {

		// adds object as a child of this, while maintaining the object's world transform

		this.updateWorldMatrix( true, false );

		_m1.getInverse( this.matrixWorld );

		if ( object.parent !== null ) {

			object.parent.updateWorldMatrix( true, false );

			_m1.multiply( object.parent.matrixWorld );

		}

		object.applyMatrix( _m1 );

		object.updateWorldMatrix( false, false );

		this.add( object );

		return this;

	},

	getObjectById: function ( id ) {

		return this.getObjectByProperty( 'id', id );

	},

	getObjectByName: function ( name ) {

		return this.getObjectByProperty( 'name', name );

	},

	getObjectByProperty: function ( name, value ) {

		if ( this[ name ] === value ) return this;

		for ( var i = 0, l = this.children.length; i < l; i ++ ) {

			var child = this.children[ i ];
			var object = child.getObjectByProperty( name, value );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	},

	/**
	 * 这个方法提供获取对象在世界空间中的位移
	 * @param {Vector3} target
	 */
	getWorldPosition: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldPosition() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		return target.setFromMatrixPosition( this.matrixWorld );

	},

	/**
	 * 获取物体在世界空间中的旋转，结果以四元数返回
	 * @param {Quaternion} target
	 */
	getWorldQuaternion: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldQuaternion() target is now required' );
			target = new Quaternion();

		}

		this.updateMatrixWorld( true );

		this.matrixWorld.decompose( _position, target, _scale );

		return target;

	},

	/**
	 * 获取物体在世界空间中的缩放，结果以三维向量返回
	 * @param {Vector3} target
	 */
	getWorldScale: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldScale() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		this.matrixWorld.decompose( _position, _quaternion, target );

		return target;

	},

	getWorldDirection: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Object3D: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		var e = this.matrixWorld.elements;

		return target.set( e[ 8 ], e[ 9 ], e[ 10 ] ).normalize();

	},

	raycast: function () {},

	traverse: function ( callback ) {

		callback( this );

		var children = this.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverse( callback );

		}

	},

	traverseVisible: function ( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		var children = this.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverseVisible( callback );

		}

	},

	traverseAncestors: function ( callback ) {

		var parent = this.parent;

		if ( parent !== null ) {

			callback( parent );

			parent.traverseAncestors( callback );

		}

	},

	/**
	 * 将平移、旋转和缩放分量合在一起，存入在矩阵matrix中
	 * 即将this.position, this.quaternion, this.scale和this.matrix同步
	 * @returns {undefined}
	 */
	updateMatrix: function () {

		// 根据参数设置当前变换矩阵的平移、旋转和缩放设置
		this.matrix.compose( this.position, this.quaternion, this.scale );

		this.matrixWorldNeedsUpdate = true;

	},

	/**
	 * 更新世界矩阵
	 * 如果父对象发生了形变，那么他的形变需要传递到下面所有的子对象
	 * this.matrixWorld保存了物体在世界空间的形变，这个形变也是需要传递给所有子对象的形变。
	 * @param {boolean} force
	 */
	updateMatrixWorld: function ( force ) {

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent === null ) {

				this.matrixWorld.copy( this.matrix );

			} else {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

			}

			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		var children = this.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].updateMatrixWorld( force );

		}

	},

	/**
	 * 更新世界矩阵，从v0.110.0新增
	 * 相比于updateMatrixWorld(), 增加了可对父对象的世界矩阵的更新
	 * @param {*} updateParents
	 * @param {*} updateChildren
	 */
	updateWorldMatrix: function ( updateParents, updateChildren ) {

		var parent = this.parent;

		if ( updateParents === true && parent !== null ) {

			parent.updateWorldMatrix( true, false );

		}

		if ( this.matrixAutoUpdate ) this.updateMatrix();

		if ( this.parent === null ) {

			this.matrixWorld.copy( this.matrix );

		} else {

			this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

		}

		// update children

		if ( updateChildren === true ) {

			var children = this.children;

			for ( var i = 0, l = children.length; i < l; i ++ ) {

				children[ i ].updateWorldMatrix( false, true );

			}

		}

	},

	/**
	 *
	 * @param {*} meta
	 */
	toJSON: function ( meta ) {

		// meta is a string when called from JSON.stringify
		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		var output = {};

		// meta is a hash used to collect geometries, materials.
		// not providing it implies that this is the root object
		// being serialized.
		if ( isRootObject ) {

			// initialize meta obj
			meta = {
				geometries: {},
				materials: {},
				textures: {},
				images: {},
				shapes: {}
			};

			output.metadata = {
				version: 4.5,
				type: 'Object',
				generator: 'Object3D.toJSON'
			};

		}

		// standard Object3D serialization

		var object = {};

		object.uuid = this.uuid;
		object.type = this.type;

		if ( this.name !== '' ) object.name = this.name;
		if ( this.castShadow === true ) object.castShadow = true;
		if ( this.receiveShadow === true ) object.receiveShadow = true;
		if ( this.visible === false ) object.visible = false;
		if ( this.frustumCulled === false ) object.frustumCulled = false;
		if ( this.renderOrder !== 0 ) object.renderOrder = this.renderOrder;
		if ( JSON.stringify( this.userData ) !== '{}' ) object.userData = this.userData;

		object.layers = this.layers.mask;
		object.matrix = this.matrix.toArray();

		if ( this.matrixAutoUpdate === false ) object.matrixAutoUpdate = false;

		// object specific properties

		if ( this.isInstancedMesh ) {

			object.type = 'InstancedMesh';
			object.count = this.count;
			object.instanceMatrix = this.instanceMatrix.toJSON();

		}

		//

		function serialize( library, element ) {

			if ( library[ element.uuid ] === undefined ) {

				library[ element.uuid ] = element.toJSON( meta );

			}

			return element.uuid;

		}

		if ( this.isMesh || this.isLine || this.isPoints ) {

			object.geometry = serialize( meta.geometries, this.geometry );

			var parameters = this.geometry.parameters;

			if ( parameters !== undefined && parameters.shapes !== undefined ) {

				var shapes = parameters.shapes;

				if ( Array.isArray( shapes ) ) {

					for ( var i = 0, l = shapes.length; i < l; i ++ ) {

						var shape = shapes[ i ];

						serialize( meta.shapes, shape );

					}

				} else {

					serialize( meta.shapes, shapes );

				}

			}

		}

		if ( this.material !== undefined ) {

			if ( Array.isArray( this.material ) ) {

				var uuids = [];

				for ( var i = 0, l = this.material.length; i < l; i ++ ) {

					uuids.push( serialize( meta.materials, this.material[ i ] ) );

				}

				object.material = uuids;

			} else {

				object.material = serialize( meta.materials, this.material );

			}

		}

		//

		if ( this.children.length > 0 ) {

			object.children = [];

			for ( var i = 0; i < this.children.length; i ++ ) {

				object.children.push( this.children[ i ].toJSON( meta ).object );

			}

		}

		if ( isRootObject ) {

			var geometries = extractFromCache( meta.geometries );
			var materials = extractFromCache( meta.materials );
			var textures = extractFromCache( meta.textures );
			var images = extractFromCache( meta.images );
			var shapes = extractFromCache( meta.shapes );

			if ( geometries.length > 0 ) output.geometries = geometries;
			if ( materials.length > 0 ) output.materials = materials;
			if ( textures.length > 0 ) output.textures = textures;
			if ( images.length > 0 ) output.images = images;
			if ( shapes.length > 0 ) output.shapes = shapes;

		}

		output.object = object;

		return output;

		// extract data from the cache hash
		// remove metadata on each item
		// and return as array
		function extractFromCache( cache ) {

			var values = [];
			for ( var key in cache ) {

				var data = cache[ key ];
				delete data.metadata;
				values.push( data );

			}
			return values;

		}

	},

	/**
	 * 该方法提供克隆一个新的对象， 并返回这个新对象
	 * @param {boolean} recursive 是否克隆子对象
	 * @returns {this}
	 */
	clone: function ( recursive ) {

		return new this.constructor().copy( this, recursive );

	},

	/**
	 * 该方法提供从源对象source复制属性值到当前的对象
	 * @param {Object3D} source 要复制源对象
	 * @param {boolean} recursive 是否克隆子对象
	 */
	copy: function ( source, recursive ) {

		if ( recursive === undefined ) recursive = true;

		this.name = source.name;

		this.up.copy( source.up );

		this.position.copy( source.position );
		this.quaternion.copy( source.quaternion );
		this.scale.copy( source.scale );

		this.matrix.copy( source.matrix );
		this.matrixWorld.copy( source.matrixWorld );

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.castShadow = source.castShadow;
		this.receiveShadow = source.receiveShadow;

		this.frustumCulled = source.frustumCulled;
		this.renderOrder = source.renderOrder;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		if ( recursive === true ) {

			for ( var i = 0; i < source.children.length; i ++ ) {

				var child = source.children[ i ];
				this.add( child.clone() );

			}

		}

		return this;

	}

} );


export { Object3D };
