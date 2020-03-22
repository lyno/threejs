/**
 * @author benaadams / https://twitter.com/ben_a_adams
 * @author Mugen87 / https://github.com/Mugen87
 * @author hughes
 */

import { Geometry } from '../core/Geometry.js';
import { BufferGeometry } from '../core/BufferGeometry.js';
import { Float32BufferAttribute } from '../core/BufferAttribute.js';
import { Vector3 } from '../math/Vector3.js';
import { Vector2 } from '../math/Vector2.js';

// CircleGeometry
/**
 * 圆形几何体
 * @param {*} radius 圆形的半径，默认值为1
 * @param {*} segments 分段（三角面）的数量，最小值为3，默认值为8。
 * @param {*} thetaStart 第一个分段的起始角度，默认为0
 * @param {*} thetaLength 圆形扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆。
 */
function CircleGeometry( radius, segments, thetaStart, thetaLength ) {

	Geometry.call( this );

	this.type = 'CircleGeometry';

	this.parameters = {
		radius: radius,
		segments: segments,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	this.fromBufferGeometry( new CircleBufferGeometry( radius, segments, thetaStart, thetaLength ) );
	this.mergeVertices();

}

CircleGeometry.prototype = Object.create( Geometry.prototype );
CircleGeometry.prototype.constructor = CircleGeometry;

// CircleBufferGeometry
/**
 * 圆形缓冲几何体
 * @param {number} radius 圆形的半径，默认值为1
 * @param {number} segments 分段（三角面）的数量，最小值为3，默认值为8。
 * @param {number} thetaStart 第一个分段的起始角度，默认为0 ,逆时针方向
 * @param {number} thetaLength 
 */
function CircleBufferGeometry( radius, segments, thetaStart, thetaLength ) {

	BufferGeometry.call( this );

	this.type = 'CircleBufferGeometry';

	this.parameters = {
		radius: radius,
		segments: segments,
		thetaStart: thetaStart,
		thetaLength: thetaLength
	};

	radius = radius || 1;
	segments = segments !== undefined ? Math.max( 3, segments ) : 8;

	thetaStart = thetaStart !== undefined ? thetaStart : 0;
	thetaLength = thetaLength !== undefined ? thetaLength : Math.PI * 2;

	// buffers

	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	// helper variables

	var i, s;
	var vertex = new Vector3();
	var uv = new Vector2();

	// center point

	vertices.push( 0, 0, 0 );
	normals.push( 0, 0, 1 );
	uvs.push( 0.5, 0.5 );

	for ( s = 0, i = 3; s <= segments; s ++, i += 3 ) {

		var segment = thetaStart + s / segments * thetaLength;

		// vertex

		vertex.x = radius * Math.cos( segment );
		vertex.y = radius * Math.sin( segment );

		vertices.push( vertex.x, vertex.y, vertex.z );

		// normal

		normals.push( 0, 0, 1 );

		// uvs

		uv.x = ( vertices[ i ] / radius + 1 ) / 2;
		uv.y = ( vertices[ i + 1 ] / radius + 1 ) / 2;

		uvs.push( uv.x, uv.y );

	}

	// indices

	for ( i = 1; i <= segments; i ++ ) {

		indices.push( i, i + 1, 0 );

	}

	// build geometry

	this.setIndex( indices );
	this.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
	this.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
	this.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

CircleBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
CircleBufferGeometry.prototype.constructor = CircleBufferGeometry;


export { CircleGeometry, CircleBufferGeometry };
