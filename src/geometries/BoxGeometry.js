/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Geometry } from '../core/Geometry.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { Vector3 } from '../math/Vector3.js';

// BoxGeometry

class BoxGeometry extends Geometry {

	constructor( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		super();

		this.type = 'BoxGeometry';

		this.parameters = {
			width: width,
			height: height,
			depth: depth,
			widthSegments: widthSegments,
			heightSegments: heightSegments,
			depthSegments: depthSegments
		};

		this.fromBufferGeometry( new BoxBufferGeometry( width, height, depth, widthSegments, heightSegments, depthSegments ) );
		this.mergeVertices();

	}

}

// BoxBufferGeometry
/**
 * BufferGeometry中封装了所有的对外的接口，BoxBufferGeometry类只是填充BufferGeometry中的数据
 */
class BoxBufferGeometry extends BufferGeometry {

	constructor( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		super();

		this.type = 'BoxBufferGeometry';

		this.parameters = {
			width: width,//宽
			height: height,//高
			depth: depth,// 深度
			widthSegments: widthSegments,// 宽的分段
			heightSegments: heightSegments,// 高的分段
			depthSegments: depthSegments// 深度分段
		};

		var scope = this;

		 //默认的宽、高、深度都是1
		width = width || 1;
		height = height || 1;
		depth = depth || 1;

		// segments

		//默认的宽、高、深度分段都是1
		widthSegments = Math.floor( widthSegments ) || 1;
		heightSegments = Math.floor( heightSegments ) || 1;
		depthSegments = Math.floor( depthSegments ) || 1;

		// buffers
		//索引、顶点、法线、uv的数组
		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		//顶点总的数量
		var numberOfVertices = 0;
		//绘制批次的开始
		var groupStart = 0;

		// build each side of the box geometry建立盒子几何的每一面
		// 创建盒子几何体每个面的顶点属性（索引、顶点、法线、uv）
		// px nx py ny pz nz 分别表示六个面，从立方体模型的中心点的参考点则：
		// px Right
		// nx Left
		// py Up
		// ny Down
		// pz Back
		// nz Front
		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
		buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
		buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
		buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
		buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
		buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

		// build geometry
		// 填充父类（BufferGeometry）中的数据
		this.setIndex( indices );
		// 每个面是四个顶点，六个面就是24个顶点
		this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		// 顶点法线
		this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

		/**
		 * 构造一个由指定segments所构成的矩形面，并设置 vertices、normals、uv 属性
		 * @param {string} u 
		 * @param {string} v 
		 * @param {string} w 
		 * @param {number} udir 
		 * @param {number} vdir 
		 * @param {number} width 面的宽
		 * @param {number} height 面的高
		 * @param {number} depth 面的深度
		 * @param {number} gridX 宽分段数
		 * @param {number} gridY 高的分段数
		 * @param {number} materialIndex 材质索引
		 */
		function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {

			var segmentWidth = width / gridX;
			var segmentHeight = height / gridY;

			var widthHalf = width / 2;
			var heightHalf = height / 2;
			var depthHalf = depth / 2;

			// 宽分段数加1， 即为宽度的顶点数
			var gridX1 = gridX + 1;
			// 高分段数加1， 即为高方向的顶点数
			var gridY1 = gridY + 1;

			var vertexCounter = 0;
			var groupCount = 0;

			var ix, iy;

			var vector = new Vector3();

			// generate vertices, normals and uvs

			for ( iy = 0; iy < gridY1; iy ++ ) {

				var y = iy * segmentHeight - heightHalf;

				for ( ix = 0; ix < gridX1; ix ++ ) {

					var x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z );

					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( iy = 0; iy < gridY; iy ++ ) {

				for ( ix = 0; ix < gridX; ix ++ ) {

					var a = numberOfVertices + ix + gridX1 * iy;
					var b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					var c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					var d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support

			scope.addGroup( groupStart, groupCount, materialIndex );

			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;

		}

	}

}

export { BoxGeometry, BoxBufferGeometry };
