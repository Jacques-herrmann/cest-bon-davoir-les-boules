import WebGL from './webgl'
import Camera from './camera'
import Terrain from './terrain/terrain'
import Ball from './ball/ball'
import { AmbientLight } from 'three'
import GameControls from './GameControls'
import Physics from './physics'

export default class Stage {
  constructor () {
    this.webgl = new WebGL()
    this.scene = this.webgl.scene
    this.assetManager = this.webgl.assetManager
    this.camera = new Camera()
    this.ready = false

    // Setup
    this.assetManager.on('ready', () => {
      this.init()
      this.ready = true
    })
  }

  init () {
    this.physics = new Physics()
    this.terrain = new Terrain()
    this.ball = new Ball()
    this.gameControl = new GameControls(this.ball)
    this.light = new AmbientLight('#4526f6', 10)
    this.webgl.scene.add(this.terrain)
    this.webgl.scene.add(this.ball)
    this.webgl.scene.add(this.light)
    this.camera.init()
  }

  update () {
    if (!this.ready) return
    if (this.webgl.stage.gameControl.state === GameControls.STATES.GAME) {
      this.physics.update()
      this.gameControl.update()
      this.ball.updateFromPhysics()
      this.camera.update()
    } else {
      this.ball.update()
    }
  }

  resize () {
    this.camera.resize()
  }
}
