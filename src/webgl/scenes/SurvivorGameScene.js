import {
	Scene,
	PerspectiveCamera,
	BoxBufferGeometry,
	MeshBasicMaterial,
	Mesh,
	AmbientLight,
	PointLight,
	PointLightHelper, CameraHelper, DirectionalLight
} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Engine from "../Engine";
import Terrain from "./SurvivorGame/Terrain";
import Loader from "../utils/Loader";
import toLoad from "./SurvivorGame/toLoad";


export default class SurvivorGameScene {
	constructor() {
		this.engine = new Engine()
		this.loader = new Loader(toLoad)

		this.instance = new Scene()

		this.cameras = {}
		this.cameras.main = new PerspectiveCamera(75, this.engine.sizes.width / this.engine.sizes.height, 0.1, 1000)
		this.activeCamera = this.cameras.main
		this.cameras.main.position.set(5, 10, -5)

		this.instance.add(...Object.values(this.cameras))

		window.addEventListener('resize', this.resize.bind(this))
		window.requestAnimationFrame(this.render.bind(this))

		this.loader.on('ready', this.init.bind(this))
	}

	init() {
		this.terrain = new Terrain()
		this.instance.add(this.terrain)
		this.instance.add(new AmbientLight())
		const p = new PointLight("#ffff00", 0.2)
		p.position.set(-2, 6, 3)
		this.instance.add(p)

		this.controls = new OrbitControls(this.activeCamera, this.engine.canvas)
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