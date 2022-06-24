import {Scene, PerspectiveCamera, BoxBufferGeometry, MeshBasicMaterial, Mesh, AxesHelper, Color} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Engine from "../Engine";
import Carousel from "./Intro/Carousel";
import CarouselItem from "./Intro/CarouselItem";
import Button from "../objects/Button";
import {EventEmitter2} from "eventemitter2";


export default class IntroScene extends EventEmitter2 {
	constructor() {
		super()
		this.engine = new Engine()
		this.instance = new Scene()

		this.cameras = {}
		this.cameras.main = new PerspectiveCamera(75, this.engine.sizes.width / this.engine.sizes.height, 0.1, 1000)
		this.activeCamera = this.cameras.main
		this.instance.add(...Object.values(this.cameras))
		this.cameras.main.position.set(0, 0, 1)

		this.addCarousel()
		this.addButton()
		// this.controls = new OrbitControls(this.activeCamera, this.engine.canvas)

		window.addEventListener('resize', this.resize.bind(this))
		window.requestAnimationFrame(this.render.bind(this))
	}

	addCarousel() {
		this.carousel = new Carousel(5, 30)
		for (let i = 0; i < 5; i++) {
			this.carousel.addItem(new CarouselItem())
		}
		this.carousel.position.set(0, 0, -6)
		this.instance.add(this.carousel)
	}

	addButton() {
		this.startButton = new Button('Play !')
		this.instance.add(this.startButton)
		this.startButton.addEventListener('click', this.onPlay.bind(this))
	}

	onPlay() {
		this.emit("selected", this.carousel.index)
	}

	resize() {
		Object.keys(this.cameras).forEach(key => {
			this.cameras[key].aspect = window.innerWidth / window.innerHeight
			this.cameras[key].updateProjectionMatrix()
		})
	}

	render() {
		this.engine.renderer.render(this.instance, this.activeCamera)
		this.startButton.update()
	}
}