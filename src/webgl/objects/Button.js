import {Group, Sprite, SpriteMaterial, Texture} from "three";
import Cursor from "../utils/Cursor";

const baseColor = '#69f'
export default class Button extends Group {
	constructor(text) {
		super()

		this.textures = {}
		this.textures.base = this.createTextTexture(" Play !")
		this.textures.hover = this.createTextTexture(" Play !", {backgroundColor: {r: 102, g: 153, b: 255, a: 1.0}})
		this.container = new Sprite(new SpriteMaterial({map: this.textures.base}));
		this.container.scale.set(0.4, 0.1, 1)
		this.container.position.setY(-0.5)

		this.cursor = new Cursor()
		this.cursor.on('click', this.onClick.bind(this))

		this.hovered = false

		this.add(this.container)
	}

	createTextTexture(text, options) {
		const parameters = {
			fontFace: 'Arial',
			fontSize: 48,
			borderThickness: 0,
			borderColor: {r: 0, g: 0, b: 0, a: 1.0},
			backgroundColor: {r: 32, g: 231, b: 89, a: 1.0},
			textColor: {r: 0, g: 0, b: 0, a: 1.0}
		}
		if (options) {
			Object.assign(parameters, options)
		}

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		context.font = "Bold " + parameters.fontSize + "px " + parameters.fontFace
		const textWidth = context.measureText(text).width;

		context.fillStyle = this.colorToStr(parameters.backgroundColor)
		context.strokeStyle = this.colorToStr(parameters.borderColor)

		context.lineWidth = parameters.borderThickness
		this.roundRect(context, parameters.borderThickness / 2, parameters.borderThickness / 2, (textWidth + parameters.borderThickness) * 1.1, parameters.fontSize * 1.4 + parameters.borderThickness, 8);

		context.fillStyle = this.colorToStr(parameters.textColor)
		context.fillText(text, parameters.borderThickness, parameters.fontSize + parameters.borderThickness);

		const texture = new Texture(canvas)
		texture.needsUpdate = true;

		return texture
	}

	colorToStr(v) {
		return "rgba(" + v.r + "," + v.g + "," + v.b + "," + v.a + ")"
	}

	roundRect(ctx, x, y, w, h, r) {
		ctx.beginPath()
		ctx.moveTo(x + r, y)
		ctx.lineTo(x + w - r, y)
		ctx.quadraticCurveTo(x + w, y, x + w, y + r)
		ctx.lineTo(x + w, y + h - r)
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
		ctx.lineTo(x + r, y + h)
		ctx.quadraticCurveTo(x, y + h, x, y + h - r)
		ctx.lineTo(x, y + r)
		ctx.quadraticCurveTo(x, y, x + r, y)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
	}

	update() {
		if (!this.cursor.raycaster.camera) return
		const intersect = this.cursor.raycaster.intersectObject(this.container)
		this.container.material.map = this.textures.base
		document.body.style.cursor = 'auto'
		this.hovered = false
		if (intersect[0]) {
			this.container.material.map = this.textures.hover
			document.body.style.cursor = 'pointer'
			this.hovered = true
		}
		this.container.material.needsUpdate = true
	}

	onClick() {
		if (!this.hovered) return
		this.dispatchEvent({type: 'click'})
	}
}