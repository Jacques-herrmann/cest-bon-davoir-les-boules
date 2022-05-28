import WebGL from './webgl'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { config } from './config'
import Debug from './utils/debug'
import { Spherical, Vector3 } from 'three'

export default class Camera {
  constructor () {
    this.config = config.global.camera

    this.webgl = new WebGL()
    this.debug = new Debug()
    this.sizes = this.webgl.sizes
    this.scene = this.webgl.scene
    this.canvas = this.webgl.canvas

    this.setInstance()
    if (this.debug.active && !config.controls.forceControl) {
      this.setOrbitControls()
      this.setDebug()
    } else {
      this.instance.position.set(-95, 88, 0)
    }
  }

  setInstance () {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      10000
    )
    this.scene.add(this.instance)
  }

  init () {
    const relative = new Spherical(60, 0.75 * Math.PI / 2, -Math.PI / 2)
    const ballPosition = this.webgl.stage.terrain.lobby.getCenter()
    this.instance.position.copy(new Vector3().setFromSpherical(relative).add(ballPosition))
    this.lastPosition = new Vector3().copy(this.instance.position)
    this.instance.lookAt(ballPosition.x, ballPosition.y, ballPosition.z)
  }

  setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize () {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    if (this.controls) {
      this.controls.update()
    } else {
      if (!this.webgl.stage.ball) { return }
      const ballPosition = this.webgl.stage.ball.position
      this.instance.position.lerp(this.webgl.stage.ball.history[0], 0.15)
      this.instance.lookAt(ballPosition.x, ballPosition.y, ballPosition.z)
      this.lastPosition.copy(ballPosition)
    }
  }

  setDebug () {
    this.debug.debugCamera(this.instance)
    console.log('debug')
  }
}
