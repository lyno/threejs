/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

import { EventDispatcher } from '../core/EventDispatcher.js';
import {
	MirroredRepeatWrapping,
	ClampToEdgeWrapping,
	RepeatWrapping,
	LinearEncoding,
	UnsignedByteType,
	RGBAFormat,
	LinearMipmapLinearFilter,
	LinearFilter,
	UVMapping
} from '../constants.js';
import { MathUtils } from '../math/MathUtils.js';
import { Vector2 } from '../math/Vector2.js';
import { Matrix3 } from '../math/Matrix3.js';
import { ImageUtils } from '../extras/ImageUtils.js';

var textureId = 0;

/**
 * 
 * @param {HTMLImageElement | HTMLCanvasElement | HTMLVideoElement} image 
 * @param {Mapping} mapping 
 * @param {Wrapping} wrapS 纹理在水平方向的扩展方式，对应于uv贴图的u
 * @param {Wrapping} wrapT 纹理在垂直方向的扩展方式，对应于uv贴图的v
 * @param {TextureFilter} magFilter 纹理如何采样，当一个纹理覆盖超过一个像素时。默认THREE.LinearFilter
 * @param {TextureFilter} minFilter 纹理如何采样，当一个纹理覆盖不超过一个像素时，默认THREE.LinearMipLinearFilter
 * @param {PixelFormat} format 默认THREE.RGBAFormat,对于JPG会自动设置为THREE.RGBFormat
 * @param {TextureDataType} type 和format相对于，用于大多数纹理效果
 * @param {number} anisotropy  默认1，值越高结果越模糊，使用的纹理样本就越多，通常为2的幂
 * @param {TextureEncoding} encoding 
 */
function Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding ) {

	Object.defineProperty( this, 'id', { value: textureId ++ } );

	this.uuid = MathUtils.generateUUID();

	this.name = '';
	// 典型的创建方法用TextureLoader.load(),可以是任何图片或视频(VideoTexture会处理)
	this.image = image !== undefined ? image : Texture.DEFAULT_IMAGE;
	this.mipmaps = [];
	// 默认对象类型THREE.UVMapping。如何将图片引用于对象
	this.mapping = mapping !== undefined ? mapping : Texture.DEFAULT_MAPPING;
	// wrapS/wrapT 纹理在水平和垂直方向的扩展方式，分别对应于uv贴图的u,v。详细的看Constants-Texture(纹理的常量) 只有图像的(维数)大小是2的幂，图像在纹理上的平铺在起作用，这个WebGL的一个限制
	this.wrapS = wrapS !== undefined ? wrapS : ClampToEdgeWrapping;
	this.wrapT = wrapT !== undefined ? wrapT : ClampToEdgeWrapping;
	// 纹理如何采样，当一个纹理覆盖超过一个像素时。默认THREE.LinearFilter
	this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
	// 纹理如何采样，当一个纹理覆盖不超过一个像素时，默认THREE.LinearMipLinearFilter
	this.minFilter = minFilter !== undefined ? minFilter : LinearMipmapLinearFilter;
	// 默认1，值越高结果越模糊，使用的纹理样本就越多，通常为2的幂
	this.anisotropy = anisotropy !== undefined ? anisotropy : 1;
	// 默认THREE.RGBAFormat,对于JPG会自动设置为THREE.RGBFormat
	this.format = format !== undefined ? format : RGBAFormat;
	this.internalFormat = null;
	// 和format相对于，用于大多数纹理效果
	this.type = type !== undefined ? type : UnsignedByteType;

	// Vector2 单个纹理的重复从开始偏移多少，在每个u,v方向
	this.offset = new Vector2( 0, 0 );
	// Vector2 纹理在每个U，V方向上重复多少次，每个方向重复大于1，需要设置wrapS/T 为THREE.RepeatWraping/THREE.MirroredRepeatWraping,实现平铺
	this.repeat = new Vector2( 1, 1 );
	// ector2 旋转发生的点 默认(0.,0) 表示左下角，(0.5,0.5)纹理的中心
	this.center = new Vector2( 0, 0 );
	// Number 纹理围绕它的中心点旋转，弧度表示，正值逆时针方向，默认0
	this.rotation = 0;

	//Boolean 默认true,矩阵从纹理属性，偏移，重复，旋转和中心来更新纹理UV变换，如果直接指定变换矩阵，设置为false
	this.matrixAutoUpdate = true;
	//  Matrix3 纹理的UV变换矩形，默认恒等矩阵
	this.matrix = new Matrix3();

	// Boolean 默认true,是否为纹理生成mipmaps(如果可能)，手动创建设为false
	this.generateMipmaps = true;
	// Boolean 默认false,PNG图片的规范。设置为true如果RGB已经存储，就乘alpha
	this.premultiplyAlpha = false;
	//  Boolean 默认true,旋转图像的y轴，以匹配WebGL的纹理坐标空间
	this.flipY = true;
	// Number 默认4，内存中每个像素行的起始对齐要求
	this.unpackAlignment = 4;	// valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

	// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
	//
	// Also changing the encoding after already used by a Material will not automatically make the Material
	// update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
	this.encoding = encoding !== undefined ? encoding : LinearEncoding;
	// Integer 从0开始计算多少次，needsUpdate设置为true
	this.version = 0;
	// Function 纹理更新的回调
	this.onUpdate = null;

}

Texture.DEFAULT_IMAGE = undefined;
Texture.DEFAULT_MAPPING = UVMapping;

Texture.prototype = Object.assign( Object.create( EventDispatcher.prototype ), {

	constructor: Texture,

	isTexture: true,

	updateMatrix: function () {

		this.matrix.setUvTransform( this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y );

	},

	clone: function () {

		return new this.constructor().copy( this );

	},

	copy: function ( source ) {

		this.name = source.name;

		this.image = source.image;
		this.mipmaps = source.mipmaps.slice( 0 );

		this.mapping = source.mapping;

		this.wrapS = source.wrapS;
		this.wrapT = source.wrapT;

		this.magFilter = source.magFilter;
		this.minFilter = source.minFilter;

		this.anisotropy = source.anisotropy;

		this.format = source.format;
		this.internalFormat = source.internalFormat;
		this.type = source.type;

		this.offset.copy( source.offset );
		this.repeat.copy( source.repeat );
		this.center.copy( source.center );
		this.rotation = source.rotation;

		this.matrixAutoUpdate = source.matrixAutoUpdate;
		this.matrix.copy( source.matrix );

		this.generateMipmaps = source.generateMipmaps;
		this.premultiplyAlpha = source.premultiplyAlpha;
		this.flipY = source.flipY;
		this.unpackAlignment = source.unpackAlignment;
		this.encoding = source.encoding;

		return this;

	},

	toJSON: function ( meta ) {

		var isRootObject = ( meta === undefined || typeof meta === 'string' );

		if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

			return meta.textures[ this.uuid ];

		}

		var output = {

			metadata: {
				version: 4.5,
				type: 'Texture',
				generator: 'Texture.toJSON'
			},

			uuid: this.uuid,
			name: this.name,

			mapping: this.mapping,

			repeat: [ this.repeat.x, this.repeat.y ],
			offset: [ this.offset.x, this.offset.y ],
			center: [ this.center.x, this.center.y ],
			rotation: this.rotation,

			wrap: [ this.wrapS, this.wrapT ],

			format: this.format,
			type: this.type,
			encoding: this.encoding,

			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,

			flipY: this.flipY,

			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment

		};

		if ( this.image !== undefined ) {

			// TODO: Move to THREE.Image

			var image = this.image;

			if ( image.uuid === undefined ) {

				image.uuid = MathUtils.generateUUID(); // UGH

			}

			if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

				var url;

				if ( Array.isArray( image ) ) {

					// process array of images e.g. CubeTexture

					url = [];

					for ( var i = 0, l = image.length; i < l; i ++ ) {

						url.push( ImageUtils.getDataURL( image[ i ] ) );

					}

				} else {

					// process single image

					url = ImageUtils.getDataURL( image );

				}

				meta.images[ image.uuid ] = {
					uuid: image.uuid,
					url: url
				};

			}

			output.image = image.uuid;

		}

		if ( ! isRootObject ) {

			meta.textures[ this.uuid ] = output;

		}

		return output;

	},

	dispose: function () {

		this.dispatchEvent( { type: 'dispose' } );

	},

	transformUv: function ( uv ) {

		if ( this.mapping !== UVMapping ) return uv;

		uv.applyMatrix3( this.matrix );

		if ( uv.x < 0 || uv.x > 1 ) {

			switch ( this.wrapS ) {

				case RepeatWrapping:

					uv.x = uv.x - Math.floor( uv.x );
					break;

				case ClampToEdgeWrapping:

					uv.x = uv.x < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.x ) % 2 ) === 1 ) {

						uv.x = Math.ceil( uv.x ) - uv.x;

					} else {

						uv.x = uv.x - Math.floor( uv.x );

					}
					break;

			}

		}

		if ( uv.y < 0 || uv.y > 1 ) {

			switch ( this.wrapT ) {

				case RepeatWrapping:

					uv.y = uv.y - Math.floor( uv.y );
					break;

				case ClampToEdgeWrapping:

					uv.y = uv.y < 0 ? 0 : 1;
					break;

				case MirroredRepeatWrapping:

					if ( Math.abs( Math.floor( uv.y ) % 2 ) === 1 ) {

						uv.y = Math.ceil( uv.y ) - uv.y;

					} else {

						uv.y = uv.y - Math.floor( uv.y );

					}
					break;

			}

		}

		if ( this.flipY ) {

			uv.y = 1 - uv.y;

		}

		return uv;

	}

} );

Object.defineProperty( Texture.prototype, "needsUpdate", {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );


export { Texture };
