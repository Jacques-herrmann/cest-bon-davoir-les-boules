import {WebGLRenderer} from "three";
import IntroScene from "./scenes/IntroScene";
import GameScene from "./scenes/GameScene";
import Sizes from "./utils/Sizes";
import SurvivorGameScene from "./scenes/SurvivorGameScene";

let instance = null;

export default class Engine {
	constructor(canvas) {
		if (instance) {
			return instance
		}
		instance = this
		console.log(instance)
		this.canvas = canvas
		this.renderer = new WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setClearColor(0xffffff, 1)

		this.sizes = new Sizes()
		this.sizes.on('resize', this.resize.bind(this))

		this.createScenes()
		window.requestAnimationFrame(this.render.bind(this))
	}

	createScenes() {
		this.scenes = {}
		this.scenes.intro = new IntroScene()
		this.scenes.game = new GameScene()
		this.scenes.survivor = new SurvivorGameScene()

		this.activeScene = this.scenes.survivor
		this.scenes.intro.on("selected", this.toScene.bind(this))
	}

	toScene(index) {
		this.activeScene = this.scenes.survivor
	}

	resize() {
		this.activeScene.resize()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio)
	}

	render() {
		this.activeScene.render()
		window.requestAnimationFrame(this.render.bind(this))
	}
}