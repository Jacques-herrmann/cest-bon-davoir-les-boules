import {Scene, PerspectiveCamera, BoxBufferGeometry, MeshBasicMaterial, Mesh} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Engine from "../Engine";


export default class GameScene {
	constructor() {
		this.engine = new Engine()
		this.instance = new Scene()

		this.cameras = {}
		this.cameras.main = new PerspectiveCamera(75, this.engine.sizes.width / this.engine.sizes.height, 0.1, 1000)
		this.activeCamera = this.cameras.main

		this.instance.add(...Object.values(this.cameras))
		this.instance.add(new Mesh(new BoxBufferGeometry(1, 1, 1), new MeshBasicMaterial({color: 0x00ffff})))
		this.cameras.main.position.set(0, 0, -5)
		this.controls = new OrbitControls(this.activeCamera, this.engine.canvas)

		window.addEventListener('resize', this.resize.bind(this))
		window.requestAnimationFrame(this.render.bind(this))
	}

	resize() {
		Object.keys(this.cameras).forEach(key => {
			this.cameras[key].aspect = window.innerWidth / window.innerHeight
			this.cameras[key].updateProjectionMatrix()
		})
	}

	render() {
		this.engine.renderer.render(this.instance, this.activeCamera)
	}
}