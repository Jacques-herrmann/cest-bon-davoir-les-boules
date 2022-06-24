import {Scene, PerspectiveCamera, BoxBufferGeometry, MeshBasicMaterial, Mesh} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Engine from "../Engine";
import Terrain from "./SurvivorGame/Terrain";


export default class SurvivorGameScene {
	constructor() {
		this.engine = new Engine()
		this.instance = new Scene()

		this.cameras = {}
		this.cameras.main = new PerspectiveCamera(75, this.engine.sizes.width / this.engine.sizes.height, 0.1, 1000)
		this.activeCamera = this.cameras.main
		this.cameras.main.position.set(5, 10, -5)

		this.instance.add(...Object.values(this.cameras))

		this.terrain = new Terrain()
		this.instance.add(this.terrain)

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