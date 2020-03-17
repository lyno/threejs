import { Ray } from '../math/Ray.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author bhouston / http://clara.io/
 * @author stephomi / http://stephaneginier.com/
 */
/**
 * 射线拾取对象, (比Math/Ray 类多了near,far两个参数 )
 *
 * @param {*} origin 射线起点
 * @param {*} direction 射线方向
 * @param {*} near 最近距离
 * @param {*} far 最远距离
 */
function Raycaster( origin, direction, near, far ) {

	// 射线
	this.ray = new Ray( origin, direction );
	// direction is assumed to be normalized (for accurate distance calculations)

	this.near = near || 0;
	this.far = far || Infinity;
	this.camera = null;

	// 拾取结果
	this.params = {
		Mesh: {},
		Line: {},
		LOD: {},
		Points: { threshold: 1 },
		Sprite: {}
	};

	Object.defineProperties( this.params, {
		PointCloud: {
			get: function () {

				console.warn( 'THREE.Raycaster: params.PointCloud has been renamed to params.Points.' );
				return this.Points;

			}
		}
	} );

}
/**
 * 距离升序排序方法
 * 距离从小到大排列， 近的排在前，远的排在后。
 * @param {Intersection} a
 * @param {Intersection} b
 * @returns
 */
function ascSort( a, b ) {

	return a.distance - b.distance;

}
/**
 * 相交对象, 判断物体object是否与射线相交，若相交则添加至intersects数组
 *
 * @param {Object3D} object 
 * @param {Raycaster} raycaster
 * @param {Intersection[]} intersects 拾取结果对象数组，结果添加至数组
 * @param {boolean} recursive 是否递归判断子对象
 * @returns
 */
function intersectObject( object, raycaster, intersects, recursive ) {

	if ( object.visible === false ) return;

	object.raycast( raycaster, intersects );

	if ( recursive === true ) {

		var children = object.children;

		for ( var i = 0, l = children.length; i < l; i ++ ) {

			intersectObject( children[ i ], raycaster, intersects, true );

		}

	}

}

Object.assign( Raycaster.prototype, {

	linePrecision: 1,

	set: function ( origin, direction ) {

		// direction is assumed to be normalized (for accurate distance calculations)

		this.ray.set( origin, direction );

	},

	/**
	 * 
	 * @param {*} coords 
	 * @param {*} camera 
	 */
	setFromCamera: function ( coords, camera ) {

		if ( ( camera && camera.isPerspectiveCamera ) ) {

			this.ray.origin.setFromMatrixPosition( camera.matrixWorld );
			this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( this.ray.origin ).normalize();
			this.camera = camera;

		} else if ( ( camera && camera.isOrthographicCamera ) ) {

			this.ray.origin.set( coords.x, coords.y, ( camera.near + camera.far ) / ( camera.near - camera.far ) ).unproject( camera ); // set origin in plane of camera
			this.ray.direction.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
			this.camera = camera;

		} else {

			console.error( 'THREE.Raycaster: Unsupported camera type.' );

		}

	},

	/**
	 * 拾取相交判断
	 * @param {Object3D} object 
	 * @param {boolean} recursive 
	 * @param {Intersection[]} optionalTarget 
	 * @returns {Intersection[]}
	 */
	intersectObject: function ( object, recursive, optionalTarget ) {

		var intersects = optionalTarget || [];

		intersectObject( object, this, intersects, recursive );

		intersects.sort( ascSort );

		return intersects;

	},

	/**
	 * 拾取相交判断
	 * @param {Object3D[]} objects 
	 * @param {boolean} recursive 
	 * @param {Intersection[]} optionalTarget 
	 * @returns {Intersection[]}
	 */
	intersectObjects: function ( objects, recursive, optionalTarget ) {

		var intersects = optionalTarget || [];

		if ( Array.isArray( objects ) === false ) {

			console.warn( 'THREE.Raycaster.intersectObjects: objects is not an Array.' );
			return intersects;

		}

		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			intersectObject( objects[ i ], this, intersects, recursive );

		}

		intersects.sort( ascSort );

		return intersects;

	}

} );


export { Raycaster };
