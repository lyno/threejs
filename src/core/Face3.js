import { Color } from '../math/Color.js';
import { Vector3 } from '../math/Vector3.js';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */
/**
 * 三角形面类（三维空间内）
 *
 * @param {*} a 三角面角点a的索引
 * @param {*} b 三角面角点b的索引
 * @param {*} c 三角面角点c的索引
 * @param {*} normal 三角面法线向量,或顶点法线向量数组
 * @param {*} color 三角面颜色值,或顶点颜色值数组
 * @param {*} materialIndex 材质索引数组
 * @example 用法: 创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c三点组成的,法线指向normal,材质索引为0的三角面对象<br />
 * var a=0,b=1,c=2;<br />
 * var normal1 = new THREE.Vector3( 0, 1, 0 ),
 * normal2 = new THREE.Vector3( 0, 1, 0 ),
 * normal3 = new THREE.Vector3( 0, 1, 0 );<br />
 * normal = new Array(normal1,normal2,normal3);<br />
 * var color1 = new THREE.Color( 0xffaa00 ),
 * color2 = new THREE.Color( 0x00aaff ),
 * color3 = new THREE.Color( 0x00ffaa );<br />
 * var color = new Array(color1,color2,color3);<br />
 * var face = new THREE.Face3( a, b, c, normal, color, 0 );<br />
 * 创建一个颜色为0xffaa00,0x00aaff,0x00ffaa的a,b,c三点组成的,法线指向normal,材质索引为0的三角面对象
 */
function Face3( a, b, c, normal, color, materialIndex ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.normal = ( normal && normal.isVector3 ) ? normal : new Vector3();
	// 一个三角面只会有一个法向量。一个顶点会属于不同的三角面，因此一个顶点会有多个法向量
	this.vertexNormals = Array.isArray( normal ) ? normal : [];

	this.color = ( color && color.isColor ) ? color : new Color();
	// 一个三角面可能包含上百个像素。vertexColors指定了三角面顶点的颜色，GPU通过插值的方式算出其他像素的颜色，最终实现整个三角面着色
	this.vertexColors = Array.isArray( color ) ? color : [];

	this.materialIndex = materialIndex !== undefined ? materialIndex : 0;

}

Object.assign( Face3.prototype, {

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.a = source.a;
		this.b = source.b;
		this.c = source.c;

		this.normal.copy( source.normal );
		this.color.copy( source.color );

		this.materialIndex = source.materialIndex;

		for ( var i = 0, il = source.vertexNormals.length; i < il; i ++ ) {

			this.vertexNormals[ i ] = source.vertexNormals[ i ].clone();

		}

		for ( var i = 0, il = source.vertexColors.length; i < il; i ++ ) {

			this.vertexColors[ i ] = source.vertexColors[ i ].clone();

		}

		return this;

	}

} );


export { Face3 };
