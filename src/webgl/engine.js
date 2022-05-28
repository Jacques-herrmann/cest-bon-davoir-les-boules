import {Scene, WebGLRenderer, PerspectiveCamera, BoxBufferGeometry, MeshBasicMaterial, Mesh} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let instance = null;

export default class Engine {
	constructor(canvas) {
		if (instance) {
			return instance
		}
		instance = this

		this.canvas = canvas

		this.scene = new Scene()
		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setClearColor(0x000000, 1)
		this.camera = new PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000)
		this.scene.add(this.camera)
		this.scene.add(new Mesh(new BoxBufferGeometry(1, 1, 1), new MeshBasicMaterial({color: 0x00ffff})))
		this.camera.position.set(0, 0, -5)
		this.controls = new OrbitControls(this.camera, this.canvas)

		window.addEventListener('resize', this.resize.bind(this))
		window.requestAnimationFrame(this.render.bind(this))
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)
	}

	render() {
		this.renderer.render(this.scene, this.camera)
		window.requestAnimationFrame(this.render.bind(this))
	}
}