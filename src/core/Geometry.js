import { EventDispatcher } from './EventDispatcher.js';
import { Face3 } from './Face3.js';
import { Matrix3 } from '../math/Matrix3.js';
import { Sphere } from '../math/Sphere.js';
import { Box3 } from '../math/Box3.js';
import { Vector3 } from '../math/Vector3.js';
import { Matrix4 } from '../math/Matrix4.js';
import { Vector2 } from '../math/Vector2.js';
import { Color } from '../math/Color.js';
import { Object3D } from './Object3D.js';
import { MathUtils } from '../math/MathUtils.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 * @author bhouston / http://clara.io
 */

var _geometryId = 0; // Geometry uses even numbers as Id
var _m1 = new Matrix4();
var _obj = new Object3D();
var _offset = new Vector3();
/**
 * 几何体对象基类
 * Geometry是场景中由顶点和三角面构成的几何体对象的基类,保存描述几何体所有必要的数据
 */
function Geometry() {

	Object.defineProperty( this, 'id', { value: _geometryId += 2 } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	this.type = 'Geometry';

	/** {Vector3[]} 几何体顶点列表*/
	this.vertices = [];
	/** {Vector3[]}  何体顶点颜色列表，和索引一对一 */
	this.colors = [];
	/**几何体三角面数组 */
	this.faces = [];
	/** {Vector2[][]} 几何体UV数组 按照三角面的索引顺序,将三角面的顶点按照顶点在三角面中的索引顺序存放在数组中,这里是一个二维数组 */
	this.faceVertexUvs = [[]];

	/**变形顶点数组,每个变形顶点都是一个javascript对象 */
	this.morphTargets = [];
	/**变形法线向量数组也有和变形顶点数组类似的结构,每个法向量是javascript对象 */
	this.morphNormals = [];

	/**蒙皮权重数组,和顶点数组的数量和顺序保持一致 */
	this.skinWeights = [];
	/**蒙皮指数数组,和顶点数组的数量和顺序保持一致 */
	this.skinIndices = [];

	/**这个数组包含将顶点按照索引顺序依次连线产生的几何线段的长度 */
	this.lineDistances = [];

	/**立方体界限,根据当前几何体生成的立方体界限 */
	this.boundingBox = null;
	/**球体界限,根据当前几何体生成的球体界限 */
	this.boundingSphere = null;

	// update flags

	/**如果已经更新this.faces属性,需要将 Geometry.elementsNeedUpdate设置为true. */
	this.elementsNeedUpdate = false;
	/**如果已经更新this.vertices属性,需要将 Geometry.verticesNeedUpdat设置为true. */
	this.verticesNeedUpdate = false;
	/**如果已经更新this.faceVertexUvs属性,需要将 Geometry.uvsNeedUpdate设置为true */
	this.uvsNeedUpdate = false;
	/**如果三角面对象的法线向量数组已经更新,需要将Geometry.normalsNeedUpdate属性设置为true */
	this.normalsNeedUpdate = false;
	/**如果已经要更新this.colors属性,需要将Geometry.colorsNeedUpdate设置为true */
	this.colorsNeedUpdate = false;
	/**如果已经要更新this.lineDistances属性,需要将Geometry.lineDistancesNeedUpdate设置为true */
	this.lineDistancesNeedUpdate = false;
	/**如果想组中添加删除对象,设置为true */
	this.groupsNeedUpdate = false;

}

Geometry.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: Geometry,

	isGeometry: true,

	/**
	 * 对对象的vertices属性应用矩阵变换.达到旋转,缩放,移动的目的
	 * 3D物体的形变(位移，旋转，缩放)涉及到两个方面，一是顶点位置的变化，二是法向量的变化。顶点位置变化才能实现形变的各种效果，法向量变化实现更新物体的光照反射的效果。在Geometry.js中，物体形变通过applyMatrix实现
	 * 更新geometry中的所有顶点坐标和表面的法线向量，所做的实际上是用变换矩阵matrix对geometry形体进行空间变换
	 * @param {Matrix4} matrix 
	 */
	applyMatrix: function ( matrix ) {

		// normalMatrix是参数matrix左上角3×3矩阵的正规矩阵（当前矩阵的逆矩阵的转置矩阵），该矩阵用来旋转矢量（面法线和顶点法线，而不是顶点坐标）
		// 问题：为什么要用normalMatrix对法线作变换，而不是直接用matrix???
		// 用法向量乘以形变矩阵的逆转置矩阵，就可以得到形变后的法向量
		var normalMatrix = new Matrix3().getNormalMatrix( matrix );

		// 遍历vertices数组，对每个顶点做矩阵变换
		for ( var i = 0, il = this.vertices.length; i < il; i ++ ) {

			var vertex = this.vertices[ i ];
			vertex.applyMatrix4( matrix );

		}
		// https://zhuanlan.zhihu.com/p/29474729
		// 更新法向量 
		// 遍历faces数组，对每个face的法线(normal)和顶点法线(vertexNormal)中的每个顶点应用变换
		for ( var i = 0, il = this.faces.length; i < il; i ++ ) {

			var face = this.faces[ i ];
			// 遍历物体每个面的法向量，得到形变后的法向量
			face.normal.applyMatrix3( normalMatrix ).normalize();
			// 遍历物体每个面的顶点法向量，得到形变后的顶点法向量
			for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

				face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

			}

		}

		// 更新(重新计算)计算当前Geometry对象的立方体界限
		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		// 更新(重新计算)计算当前Geometry对象的球体界限
		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		this.verticesNeedUpdate = true;
		this.normalsNeedUpdate = true;

		return this;

	},

	rotateX: function ( angle ) {

		// rotate geometry around world x-axis

		_m1.makeRotationX( angle );

		this.applyMatrix( _m1 );

		return this;

	},

	rotateY: function ( angle ) {

		// rotate geometry around world y-axis

		_m1.makeRotationY( angle );

		this.applyMatrix( _m1 );

		return this;

	},

	rotateZ: function ( angle ) {

		// rotate geometry around world z-axis

		_m1.makeRotationZ( angle );

		this.applyMatrix( _m1 );

		return this;

	},

	translate: function ( x, y, z ) {

		// translate geometry

		_m1.makeTranslation( x, y, z );

		this.applyMatrix( _m1 );

		return this;

	},

	/**
	 * 对几何体进行缩放
	 * 方法是：构建一个在三个坐标轴方向绽放分别是，x,y,z的的缩放矩阵，并应用该矩阵
	 * @param {number} x 
	 * @param {number} y 
	 * @param {number} z 
	 */
	scale: function ( x, y, z ) {

		// scale geometry

		_m1.makeScale( x, y, z );

		this.applyMatrix( _m1 );

		return this;

	},

	/**
	 * 设置几何体的朝向
	 * @param {Vector3} vector 
	 */
	lookAt: function ( vector ) {

		_obj.lookAt( vector );

		_obj.updateMatrix();

		this.applyMatrix( _obj.matrix );

		return this;

	},

	/**
	 * 从Buffer构造Geometry对象
	 * @param {BufferGeometry} geometry 
	 */
	fromBufferGeometry: function ( geometry ) {

		var scope = this;

		// 索引数组
		var indices = geometry.index !== null ? geometry.index.array : undefined;
		// Geometry属性
		var attributes = geometry.attributes;

		if ( attributes.position === undefined ) {

			console.error( 'THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion.' );
			return this;

		}

		// 顶点数组 Array<number>
		var positions = attributes.position.array;
		// 法线数组 Array<number>
		var normals = attributes.normal !== undefined ? attributes.normal.array : undefined;
		// 顶点颜色数组 Array<number>
		var colors = attributes.color !== undefined ? attributes.color.array : undefined;
		// uv数组 Array<number>
		var uvs = attributes.uv !== undefined ? attributes.uv.array : undefined;
		var uvs2 = attributes.uv2 !== undefined ? attributes.uv2.array : undefined;

		if ( uvs2 !== undefined ) this.faceVertexUvs[ 1 ] = [];

		for ( var i = 0; i < positions.length; i += 3 ) {

			// 添加顶点
			scope.vertices.push( new Vector3().fromArray( positions, i ) );

			if ( colors !== undefined ) {
				// 添加颜色
				scope.colors.push( new Color().fromArray( colors, i ) );

			}

		}

		function addFace( a, b, c, materialIndex ) {

			var vertexColors = ( colors === undefined ) ? [] : [
				scope.colors[ a ].clone(),
				scope.colors[ b ].clone(),
				scope.colors[ c ].clone() ];

			var vertexNormals = ( normals === undefined ) ? [] : [
				new Vector3().fromArray( normals, a * 3 ),
				new Vector3().fromArray( normals, b * 3 ),
				new Vector3().fromArray( normals, c * 3 )
			];

			var face = new Face3( a, b, c, vertexNormals, vertexColors, materialIndex );

			scope.faces.push( face );

			if ( uvs !== undefined ) {

				scope.faceVertexUvs[ 0 ].push( [
					new Vector2().fromArray( uvs, a * 2 ),
					new Vector2().fromArray( uvs, b * 2 ),
					new Vector2().fromArray( uvs, c * 2 )
				] );

			}

			if ( uvs2 !== undefined ) {

				scope.faceVertexUvs[ 1 ].push( [
					new Vector2().fromArray( uvs2, a * 2 ),
					new Vector2().fromArray( uvs2, b * 2 ),
					new Vector2().fromArray( uvs2, c * 2 )
				] );

			}

		}

		var groups = geometry.groups;

		if ( groups.length > 0 ) {

			for ( var i = 0; i < groups.length; i ++ ) {

				var group = groups[ i ];

				var start = group.start;
				var count = group.count;

				for ( var j = start, jl = start + count; j < jl; j += 3 ) {

					if ( indices !== undefined ) {

						addFace( indices[ j ], indices[ j + 1 ], indices[ j + 2 ], group.materialIndex );

					} else {

						addFace( j, j + 1, j + 2, group.materialIndex );

					}

				}

			}

		} else {

			if ( indices !== undefined ) {

				for ( var i = 0; i < indices.length; i += 3 ) {

					addFace( indices[ i ], indices[ i + 1 ], indices[ i + 2 ] );

				}

			} else {

				for ( var i = 0; i < positions.length / 3; i += 3 ) {

					addFace( i, i + 1, i + 2 );

				}

			}

		}

		this.computeFaceNormals();

		if ( geometry.boundingBox !== null ) {

			this.boundingBox = geometry.boundingBox.clone();

		}

		if ( geometry.boundingSphere !== null ) {

			this.boundingSphere = geometry.boundingSphere.clone();

		}

		return this;

	},

	/**
	 * 计算出当前Geometry对象的立方体界限的中心
	 */
	center: function () {

		this.computeBoundingBox();

		this.boundingBox.getCenter( _offset ).negate();

		this.translate( _offset.x, _offset.y, _offset.z );

		return this;

	},

	normalize: function () {

		this.computeBoundingSphere();

		var center = this.boundingSphere.center;
		var radius = this.boundingSphere.radius;

		var s = radius === 0 ? 1 : 1.0 / radius;

		var matrix = new Matrix4();
		matrix.set(
			s, 0, 0, - s * center.x,
			0, s, 0, - s * center.y,
			0, 0, s, - s * center.z,
			0, 0, 0, 1
		);

		this.applyMatrix( matrix );

		return this;

	},

	/**
	 * 重新计算三角面对象的法线向量
	 * 计算法线向量，影响的是face数组中每个元素的normal属性，一个face只有1个
	 */
	computeFaceNormals: function () {

		var cb = new Vector3(), ab = new Vector3();

		for ( var f = 0, fl = this.faces.length; f < fl; f ++ ) {

			var face = this.faces[ f ];

			var vA = this.vertices[ face.a ];
			var vB = this.vertices[ face.b ];
			var vC = this.vertices[ face.c ];

			cb.subVectors( vC, vB );
			ab.subVectors( vA, vB );
			cb.cross( ab );

			cb.normalize();

			face.normal.copy( cb );

		}

	},

	/**
	 * 重新计算三角面对象顶点的法线向量
	 * face数组中每个元素的vertexNormal属性，一个face3型对象有3个<br />
	 * 但是需要注意的是，被多个表面共享的顶点，其法线向量只有一个，同时受到多个表面的影响。比如中心在原点，三组表面都垂直于轴的立方体<br />
	 * 其第一象限中的顶点，法线向量是(1,1,1)的归一化。虽然看上去不可思议，平面的顶点的法线居然不是垂直于平面的，但这种指定法线的方法<br />
	 * 在利用平面模拟曲面的时候有很好的效果<br />
	 * 顶点法线（Vertex Normal）是过顶点的一个矢量，用于在高洛德着色（Gouraud Shading）中的计算光照和纹理效果。在生成曲面时<br />
	 * 通常令顶点法线和相邻平面的法线保持等角，如图1，这样进行渲染时，会在平面接缝处产生一种平滑过渡的效果。如果是多边形<br />
	 * 则令顶点法线等于该点所属平面（三角形）的法线，以便在接缝处产生突出的边缘
	 * @param {boolean} areaWeighted true表示face数组中的发线没有被计算,false或者忽略表示已经计算过了
	 */
	computeVertexNormals: function ( areaWeighted ) {

		// 一个三角面只会有一个法向量。一个顶点会属于不同的三角面，因此一个顶点会有多个法向量
		if ( areaWeighted === undefined ) areaWeighted = true;

		var v, vl, f, fl, face, vertices;

		vertices = new Array( this.vertices.length );

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ] = new Vector3();

		}

		if ( areaWeighted ) {

			// vertex normals weighted by triangle areas
			// http://www.iquilezles.org/www/articles/normals/normals.htm

			var vA, vB, vC;
			var cb = new Vector3(), ab = new Vector3();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vA = this.vertices[ face.a ];
				vB = this.vertices[ face.b ];
				vC = this.vertices[ face.c ];

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				vertices[ face.a ].add( cb );
				vertices[ face.b ].add( cb );
				vertices[ face.c ].add( cb );

			}

		} else {

			this.computeFaceNormals();

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				vertices[ face.a ].add( face.normal );
				vertices[ face.b ].add( face.normal );
				vertices[ face.c ].add( face.normal );

			}

		}

		for ( v = 0, vl = this.vertices.length; v < vl; v ++ ) {

			vertices[ v ].normalize();

		}

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			var vertexNormals = face.vertexNormals;

			if ( vertexNormals.length === 3 ) {

				vertexNormals[ 0 ].copy( vertices[ face.a ] );
				vertexNormals[ 1 ].copy( vertices[ face.b ] );
				vertexNormals[ 2 ].copy( vertices[ face.c ] );

			} else {

				vertexNormals[ 0 ] = vertices[ face.a ].clone();
				vertexNormals[ 1 ] = vertices[ face.b ].clone();
				vertexNormals[ 2 ] = vertices[ face.c ].clone();

			}

		}

		if ( this.faces.length > 0 ) {

			this.normalsNeedUpdate = true;

		}

	},

	computeFlatVertexNormals: function () {

		var f, fl, face;

		this.computeFaceNormals();

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			var vertexNormals = face.vertexNormals;

			if ( vertexNormals.length === 3 ) {

				vertexNormals[ 0 ].copy( face.normal );
				vertexNormals[ 1 ].copy( face.normal );
				vertexNormals[ 2 ].copy( face.normal );

			} else {

				vertexNormals[ 0 ] = face.normal.clone();
				vertexNormals[ 1 ] = face.normal.clone();
				vertexNormals[ 2 ] = face.normal.clone();

			}

		}

		if ( this.faces.length > 0 ) {

			this.normalsNeedUpdate = true;

		}

	},

	/**
	 * 重新计算三角面对象变形顶点的法线向量,morph应该是用作显示固定连续动画的变形效果
	 */
	computeMorphNormals: function () {

		var i, il, f, fl, face;

		// save original normals
		// - create temp variables on first access
		//   otherwise just copy (for faster repeated calls)

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			if ( ! face.__originalFaceNormal ) {

				face.__originalFaceNormal = face.normal.clone();

			} else {

				face.__originalFaceNormal.copy( face.normal );

			}

			if ( ! face.__originalVertexNormals ) face.__originalVertexNormals = [];

			for ( i = 0, il = face.vertexNormals.length; i < il; i ++ ) {

				if ( ! face.__originalVertexNormals[ i ] ) {

					face.__originalVertexNormals[ i ] = face.vertexNormals[ i ].clone();

				} else {

					face.__originalVertexNormals[ i ].copy( face.vertexNormals[ i ] );

				}

			}

		}

		// use temp geometry to compute face and vertex normals for each morph

		var tmpGeo = new Geometry();
		tmpGeo.faces = this.faces;

		for ( i = 0, il = this.morphTargets.length; i < il; i ++ ) {

			// create on first access

			if ( ! this.morphNormals[ i ] ) {

				this.morphNormals[ i ] = {};
				this.morphNormals[ i ].faceNormals = [];
				this.morphNormals[ i ].vertexNormals = [];

				var dstNormalsFace = this.morphNormals[ i ].faceNormals;
				var dstNormalsVertex = this.morphNormals[ i ].vertexNormals;

				var faceNormal, vertexNormals;

				for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

					faceNormal = new Vector3();
					vertexNormals = { a: new Vector3(), b: new Vector3(), c: new Vector3() };

					dstNormalsFace.push( faceNormal );
					dstNormalsVertex.push( vertexNormals );

				}

			}

			var morphNormals = this.morphNormals[ i ];

			// set vertices to morph target

			tmpGeo.vertices = this.morphTargets[ i ].vertices;

			// compute morph normals

			tmpGeo.computeFaceNormals();
			tmpGeo.computeVertexNormals();

			// store morph normals

			var faceNormal, vertexNormals;

			for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

				face = this.faces[ f ];

				faceNormal = morphNormals.faceNormals[ f ];
				vertexNormals = morphNormals.vertexNormals[ f ];

				faceNormal.copy( face.normal );

				vertexNormals.a.copy( face.vertexNormals[ 0 ] );
				vertexNormals.b.copy( face.vertexNormals[ 1 ] );
				vertexNormals.c.copy( face.vertexNormals[ 2 ] );

			}

		}

		// restore original normals

		for ( f = 0, fl = this.faces.length; f < fl; f ++ ) {

			face = this.faces[ f ];

			face.normal = face.__originalFaceNormal;
			face.vertexNormals = face.__originalVertexNormals;

		}

	},

	/**
	 * 重新计算当前几何体对象的立方体界限,并更新this.boundingBox[]属性
	 */
	computeBoundingBox: function () {

		if ( this.boundingBox === null ) {

			this.boundingBox = new Box3();

		}

		this.boundingBox.setFromPoints( this.vertices );

	},

	/**
	 * 重新计算当前几何体对象的球体界限,并更新this.boundingSphere[]属性
	 */
	computeBoundingSphere: function () {

		if ( this.boundingSphere === null ) {

			this.boundingSphere = new Sphere();

		}

		this.boundingSphere.setFromPoints( this.vertices );

	},

	/**
	 * 将两个几何体对象或者Object3D里面的几何体对象合并,(使用对象的变换)将几何体的顶点,面,UV分别合并.
	 * @param {Geometry} geometry 要被合并的几何体
	 * @param {Matrix4} matrix 可选参数,变换矩阵,当指定了该参数,合并后的对象会应用变换
	 * @param {number} materialIndexOffset 材质索引偏移量
	 */
	merge: function ( geometry, matrix, materialIndexOffset ) {

		if ( ! ( geometry && geometry.isGeometry ) ) {

			console.error( 'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.', geometry );
			return;

		}

		var normalMatrix,
			vertexOffset = this.vertices.length,
			vertices1 = this.vertices,
			vertices2 = geometry.vertices,
			faces1 = this.faces,
			faces2 = geometry.faces,
			colors1 = this.colors,
			colors2 = geometry.colors;

		if ( materialIndexOffset === undefined ) materialIndexOffset = 0;

		if ( matrix !== undefined ) {

			normalMatrix = new Matrix3().getNormalMatrix( matrix );

		}

		// vertices

		for ( var i = 0, il = vertices2.length; i < il; i ++ ) {

			var vertex = vertices2[ i ];

			var vertexCopy = vertex.clone();

			if ( matrix !== undefined ) vertexCopy.applyMatrix4( matrix );

			vertices1.push( vertexCopy );

		}

		// colors

		for ( var i = 0, il = colors2.length; i < il; i ++ ) {

			colors1.push( colors2[ i ].clone() );

		}

		// faces

		for ( i = 0, il = faces2.length; i < il; i ++ ) {

			var face = faces2[ i ], faceCopy, normal, color,
				faceVertexNormals = face.vertexNormals,
				faceVertexColors = face.vertexColors;

			faceCopy = new Face3( face.a + vertexOffset, face.b + vertexOffset, face.c + vertexOffset );
			faceCopy.normal.copy( face.normal );

			if ( normalMatrix !== undefined ) {

				faceCopy.normal.applyMatrix3( normalMatrix ).normalize();

			}

			for ( var j = 0, jl = faceVertexNormals.length; j < jl; j ++ ) {

				normal = faceVertexNormals[ j ].clone();

				if ( normalMatrix !== undefined ) {

					normal.applyMatrix3( normalMatrix ).normalize();

				}

				faceCopy.vertexNormals.push( normal );

			}

			faceCopy.color.copy( face.color );

			for ( var j = 0, jl = faceVertexColors.length; j < jl; j ++ ) {

				color = faceVertexColors[ j ];
				faceCopy.vertexColors.push( color.clone() );

			}

			faceCopy.materialIndex = face.materialIndex + materialIndexOffset;

			faces1.push( faceCopy );

		}

		// uvs

		for ( var i = 0, il = geometry.faceVertexUvs.length; i < il; i ++ ) {

			var faceVertexUvs2 = geometry.faceVertexUvs[ i ];

			if ( this.faceVertexUvs[ i ] === undefined ) this.faceVertexUvs[ i ] = [];

			for ( var j = 0, jl = faceVertexUvs2.length; j < jl; j ++ ) {

				var uvs2 = faceVertexUvs2[ j ], uvsCopy = [];

				for ( var k = 0, kl = uvs2.length; k < kl; k ++ ) {

					uvsCopy.push( uvs2[ k ].clone() );

				}

				this.faceVertexUvs[ i ].push( uvsCopy );

			}

		}

	},

	mergeMesh: function ( mesh ) {

		if ( ! ( mesh && mesh.isMesh ) ) {

			console.error( 'THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.', mesh );
			return;

		}

		if ( mesh.matrixAutoUpdate ) mesh.updateMatrix();

		this.merge( mesh.geometry, mesh.matrix );

	},

	/**
	 * 清理几何体中重复的顶点 （ fromBufferGeometry 时，会有些重复的点，用此方法去重）
	 * Checks for duplicate vertices with hashmap.用HashMap检查重复的顶点
	 * Duplicated vertices are removed删除重复的顶点
	 * and faces' vertices are updated.并且更新面的顶点
	 * @returns {number} 相差的点数目
	 */
	mergeVertices: function () {

		// 定义HashMap查找顶点的位置坐标,确保顶点的位置坐标是唯一的.
		var verticesMap = {}; // Hashmap for looking up vertices by position coordinates (and making sure they are unique)
		var unique = [], changes = [];

		var v, key;
		// 数字的小数点长度,比如值为4,相应的小数为0.0001
		var precisionPoints = 4; // number of decimal points, e.g. 4 for epsilon of 0.0001
		var precision = Math.pow( 10, precisionPoints ); // 精度是10000，就是小数点后4位
		var i, il, face;
		var indices, j, jl;

		for ( i = 0, il = this.vertices.length; i < il; i ++ ) {

			v = this.vertices[ i ];
			key = Math.round( v.x * precision ) + '_' + Math.round( v.y * precision ) + '_' + Math.round( v.z * precision );

			if ( verticesMap[ key ] === undefined ) {

				// verticesMap存放不重复的顶点在vertices中索引index（原索引值)
				verticesMap[ key ] = i;
				// unique存放不重复的顶点
				unique.push( this.vertices[ i ] );
				// changes 的value值为不重复的顶点在unique中索引（新索引值)
				// changes 的key值为vertices的key值
				// 也就是changes存放了顶点在vertices和unique中的对应关系
				changes[ i ] = unique.length - 1;

			} else {

				//console.log('Duplicate vertex found. ', i, ' could be using ', verticesMap[key]);
				changes[ i ] = changes[ verticesMap[ key ] ];

			}

		}


		// if faces are completely degenerate after merging vertices, we
		// have to remove them from the geometry.如果合并顶点后面完全退化，我们必须将其从几何图形中删除
		var faceIndicesToRemove = [];

		for ( i = 0, il = this.faces.length; i < il; i ++ ) {

			face = this.faces[ i ];

			// 修改顶点的索引值
			face.a = changes[ face.a ];
			face.b = changes[ face.b ];
			face.c = changes[ face.c ];

			indices = [ face.a, face.b, face.c ];

			// if any duplicate vertices are found in a Face3
			// we have to remove the face as nothing can be saved
			// 如果在Face3中存在顶点重复，必须删除该面，因为无法保存任何内容
			// 1.判断面中是否顶点重复，将其索引添加到faceIndicesToRemove中
			for ( var n = 0; n < 3; n ++ ) {

				if ( indices[ n ] === indices[ ( n + 1 ) % 3 ] ) {

					faceIndicesToRemove.push( i );
					break;

				}

			}

		}

		// 2. 删除faceIndicesToRemove中的索引对应的面 及其对应的uv
		for ( i = faceIndicesToRemove.length - 1; i >= 0; i -- ) {

			var idx = faceIndicesToRemove[ i ];

			this.faces.splice( idx, 1 );

			for ( j = 0, jl = this.faceVertexUvs.length; j < jl; j ++ ) {

				this.faceVertexUvs[ j ].splice( idx, 1 );

			}

		}

		// Use unique set of vertices

		var diff = this.vertices.length - unique.length;
		this.vertices = unique;
		return diff;

	},

	/**
	 * 从二维或三维向量数组生成几何体
	 * @param {Vector2[]|Vector3[]} points 
	 */
	setFromPoints: function ( points ) {

		this.vertices = [];

		for ( var i = 0, l = points.length; i < l; i ++ ) {

			var point = points[ i ];
			this.vertices.push( new Vector3( point.x, point.y, point.z || 0 ) );

		}

		return this;

	},

	/**
	 * 按照材质索引对面（face & faceVertexUvs）重新排序
	 */
	sortFacesByMaterialIndex: function () {

		var faces = this.faces;
		var length = faces.length;

		// tag faces

		for ( var i = 0; i < length; i ++ ) {

			faces[ i ]._id = i;

		}

		// sort faces 降序

		function materialIndexSort( a, b ) {

			return a.materialIndex - b.materialIndex;

		}

		faces.sort( materialIndexSort );

		// sort uvs

		var uvs1 = this.faceVertexUvs[ 0 ];
		var uvs2 = this.faceVertexUvs[ 1 ];

		var newUvs1, newUvs2;

		if ( uvs1 && uvs1.length === length ) newUvs1 = [];
		if ( uvs2 && uvs2.length === length ) newUvs2 = [];

		for ( var i = 0; i < length; i ++ ) {

			var id = faces[ i ]._id;

			if ( newUvs1 ) newUvs1.push( uvs1[ id ] );
			if ( newUvs2 ) newUvs2.push( uvs2[ id ] );

		}

		if ( newUvs1 ) this.faceVertexUvs[ 0 ] = newUvs1;
		if ( newUvs2 ) this.faceVertexUvs[ 1 ] = newUvs2;

	},

	toJSON: function () {

		var data = {
			metadata: {
				version: 4.5,
				type: 'Geometry',
				generator: 'Geometry.toJSON'
			}
		};

		// standard Geometry serialization

		data.uuid = this.uuid;
		data.type = this.type;
		if ( this.name !== '' ) data.name = this.name;

		if ( this.parameters !== undefined ) {

			var parameters = this.parameters;

			for ( var key in parameters ) {

				if ( parameters[ key ] !== undefined ) data[ key ] = parameters[ key ];

			}

			return data;

		}

		var vertices = [];

		for ( var i = 0; i < this.vertices.length; i ++ ) {

			var vertex = this.vertices[ i ];
			vertices.push( vertex.x, vertex.y, vertex.z );

		}

		var faces = [];
		var normals = [];
		var normalsHash = {};
		var colors = [];
		var colorsHash = {};
		var uvs = [];
		var uvsHash = {};

		for ( var i = 0; i < this.faces.length; i ++ ) {

			var face = this.faces[ i ];

			var hasMaterial = true;
			var hasFaceUv = false; // deprecated
			var hasFaceVertexUv = this.faceVertexUvs[ 0 ][ i ] !== undefined;
			var hasFaceNormal = face.normal.length() > 0;
			var hasFaceVertexNormal = face.vertexNormals.length > 0;
			var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
			var hasFaceVertexColor = face.vertexColors.length > 0;

			var faceType = 0;

			faceType = setBit( faceType, 0, 0 ); // isQuad
			faceType = setBit( faceType, 1, hasMaterial );
			faceType = setBit( faceType, 2, hasFaceUv );
			faceType = setBit( faceType, 3, hasFaceVertexUv );
			faceType = setBit( faceType, 4, hasFaceNormal );
			faceType = setBit( faceType, 5, hasFaceVertexNormal );
			faceType = setBit( faceType, 6, hasFaceColor );
			faceType = setBit( faceType, 7, hasFaceVertexColor );

			faces.push( faceType );
			faces.push( face.a, face.b, face.c );
			faces.push( face.materialIndex );

			if ( hasFaceVertexUv ) {

				var faceVertexUvs = this.faceVertexUvs[ 0 ][ i ];

				faces.push(
					getUvIndex( faceVertexUvs[ 0 ] ),
					getUvIndex( faceVertexUvs[ 1 ] ),
					getUvIndex( faceVertexUvs[ 2 ] )
				);

			}

			if ( hasFaceNormal ) {

				faces.push( getNormalIndex( face.normal ) );

			}

			if ( hasFaceVertexNormal ) {

				var vertexNormals = face.vertexNormals;

				faces.push(
					getNormalIndex( vertexNormals[ 0 ] ),
					getNormalIndex( vertexNormals[ 1 ] ),
					getNormalIndex( vertexNormals[ 2 ] )
				);

			}

			if ( hasFaceColor ) {

				faces.push( getColorIndex( face.color ) );

			}

			if ( hasFaceVertexColor ) {

				var vertexColors = face.vertexColors;

				faces.push(
					getColorIndex( vertexColors[ 0 ] ),
					getColorIndex( vertexColors[ 1 ] ),
					getColorIndex( vertexColors[ 2 ] )
				);

			}

		}

		function setBit( value, position, enabled ) {

			return enabled ? value | ( 1 << position ) : value & ( ~ ( 1 << position ) );

		}

		function getNormalIndex( normal ) {

			var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

			if ( normalsHash[ hash ] !== undefined ) {

				return normalsHash[ hash ];

			}

			normalsHash[ hash ] = normals.length / 3;
			normals.push( normal.x, normal.y, normal.z );

			return normalsHash[ hash ];

		}

		function getColorIndex( color ) {

			var hash = color.r.toString() + color.g.toString() + color.b.toString();

			if ( colorsHash[ hash ] !== undefined ) {

				return colorsHash[ hash ];

			}

			colorsHash[ hash ] = colors.length;
			colors.push( color.getHex() );

			return colorsHash[ hash ];

		}

		function getUvIndex( uv ) {

			var hash = uv.x.toString() + uv.y.toString();

			if ( uvsHash[ hash ] !== undefined ) {

				return uvsHash[ hash ];

			}

			uvsHash[ hash ] = uvs.length / 2;
			uvs.push( uv.x, uv.y );

			return uvsHash[ hash ];

		}

		data.data = {};

		data.data.vertices = vertices;
		data.data.normals = normals;
		if ( colors.length > 0 ) data.data.colors = colors;
		if ( uvs.length > 0 ) data.data.uvs = [ uvs ]; // temporal backward compatibility
		data.data.faces = faces;

		return data;

	},

	clone: function () {

		/*
		 // Handle primitives

		 var parameters = this.parameters;

		 if ( parameters !== undefined ) {

		 var values = [];

		 for ( var key in parameters ) {

		 values.push( parameters[ key ] );

		 }

		 var geometry = Object.create( this.constructor.prototype );
		 this.constructor.apply( geometry, values );
		 return geometry;

		 }

		 return new this.constructor().copy( this );
		 */

		return new Geometry().copy( this );

	},

	copy: function ( source ) {

		var i, il, j, jl, k, kl;

		// reset

		this.vertices = [];
		this.colors = [];
		this.faces = [];
		this.faceVertexUvs = [[]];
		this.morphTargets = [];
		this.morphNormals = [];
		this.skinWeights = [];
		this.skinIndices = [];
		this.lineDistances = [];
		this.boundingBox = null;
		this.boundingSphere = null;

		// name

		this.name = source.name;

		// vertices

		var vertices = source.vertices;

		for ( i = 0, il = vertices.length; i < il; i ++ ) {

			this.vertices.push( vertices[ i ].clone() );

		}

		// colors

		var colors = source.colors;

		for ( i = 0, il = colors.length; i < il; i ++ ) {

			this.colors.push( colors[ i ].clone() );

		}

		// faces

		var faces = source.faces;

		for ( i = 0, il = faces.length; i < il; i ++ ) {

			this.faces.push( faces[ i ].clone() );

		}

		// face vertex uvs

		for ( i = 0, il = source.faceVertexUvs.length; i < il; i ++ ) {

			var faceVertexUvs = source.faceVertexUvs[ i ];

			if ( this.faceVertexUvs[ i ] === undefined ) {

				this.faceVertexUvs[ i ] = [];

			}

			for ( j = 0, jl = faceVertexUvs.length; j < jl; j ++ ) {

				var uvs = faceVertexUvs[ j ], uvsCopy = [];

				for ( k = 0, kl = uvs.length; k < kl; k ++ ) {

					var uv = uvs[ k ];

					uvsCopy.push( uv.clone() );

				}

				this.faceVertexUvs[ i ].push( uvsCopy );

			}

		}

		// morph targets

		var morphTargets = source.morphTargets;

		for ( i = 0, il = morphTargets.length; i < il; i ++ ) {

			var morphTarget = {};
			morphTarget.name = morphTargets[ i ].name;

			// vertices

			if ( morphTargets[ i ].vertices !== undefined ) {

				morphTarget.vertices = [];

				for ( j = 0, jl = morphTargets[ i ].vertices.length; j < jl; j ++ ) {

					morphTarget.vertices.push( morphTargets[ i ].vertices[ j ].clone() );

				}

			}

			// normals

			if ( morphTargets[ i ].normals !== undefined ) {

				morphTarget.normals = [];

				for ( j = 0, jl = morphTargets[ i ].normals.length; j < jl; j ++ ) {

					morphTarget.normals.push( morphTargets[ i ].normals[ j ].clone() );

				}

			}

			this.morphTargets.push( morphTarget );

		}

		// morph normals

		var morphNormals = source.morphNormals;

		for ( i = 0, il = morphNormals.length; i < il; i ++ ) {

			var morphNormal = {};

			// vertex normals

			if ( morphNormals[ i ].vertexNormals !== undefined ) {

				morphNormal.vertexNormals = [];

				for ( j = 0, jl = morphNormals[ i ].vertexNormals.length; j < jl; j ++ ) {

					var srcVertexNormal = morphNormals[ i ].vertexNormals[ j ];
					var destVertexNormal = {};

					destVertexNormal.a = srcVertexNormal.a.clone();
					destVertexNormal.b = srcVertexNormal.b.clone();
					destVertexNormal.c = srcVertexNormal.c.clone();

					morphNormal.vertexNormals.push( destVertexNormal );

				}

			}

			// face normals

			if ( morphNormals[ i ].faceNormals !== undefined ) {

				morphNormal.faceNormals = [];

				for ( j = 0, jl = morphNormals[ i ].faceNormals.length; j < jl; j ++ ) {

					morphNormal.faceNormals.push( morphNormals[ i ].faceNormals[ j ].clone() );

				}

			}

			this.morphNormals.push( morphNormal );

		}

		// skin weights

		var skinWeights = source.skinWeights;

		for ( i = 0, il = skinWeights.length; i < il; i ++ ) {

			this.skinWeights.push( skinWeights[ i ].clone() );

		}

		// skin indices

		var skinIndices = source.skinIndices;

		for ( i = 0, il = skinIndices.length; i < il; i ++ ) {

			this.skinIndices.push( skinIndices[ i ].clone() );

		}

		// line distances

		var lineDistances = source.lineDistances;

		for ( i = 0, il = lineDistances.length; i < il; i ++ ) {

			this.lineDistances.push( lineDistances[ i ] );

		}

		// bounding box

		var boundingBox = source.boundingBox;

		if ( boundingBox !== null ) {

			this.boundingBox = boundingBox.clone();

		}

		// bounding sphere

		var boundingSphere = source.boundingSphere;

		if ( boundingSphere !== null ) {

			this.boundingSphere = boundingSphere.clone();

		}

		// update flags

		this.elementsNeedUpdate = source.elementsNeedUpdate;
		this.verticesNeedUpdate = source.verticesNeedUpdate;
		this.uvsNeedUpdate = source.uvsNeedUpdate;
		this.normalsNeedUpdate = source.normalsNeedUpdate;
		this.colorsNeedUpdate = source.colorsNeedUpdate;
		this.lineDistancesNeedUpdate = source.lineDistancesNeedUpdate;
		this.groupsNeedUpdate = source.groupsNeedUpdate;

		return this;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	}

} );


export { Geometry };
