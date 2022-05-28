import WebGL from '../webgl'
import { Group, Mesh, MeshBasicMaterial, Vector3, ArrowHelper, Raycaster } from 'three'
import { Body, Sphere } from 'cannon-es'

let webgl, raycaster
const down = new Vector3(0, -20, 0)

export default class Ball extends Group {
  constructor () {
    super()
    webgl = new WebGL()
    raycaster = new Raycaster()
    this.history = []
    this.direction = new Vector3()
    this.init()
    this.initPhysics()
    this.debug()
  }

  debug () {
    const origin = new Vector3().copy(this.instance.mesh.position)
    this.helper = new ArrowHelper(down, origin, 25)
    this.add(this.helper)
  }

  init () {
    this.instance = {}
    this.instance.geometry = webgl.assetManager.items.ball.scene.children[0].geometry
    this.instance.geometry.center()
    this.instance.material = new MeshBasicMaterial({ color: 'red' })
    this.instance.mesh = new Mesh(this.instance.geometry, this.instance.material)
    this.instance.mesh.scale.set(3, 3, 3)
    raycaster.set(this.instance.mesh.position, down)
    this.position.copy(webgl.stage.terrain.lobby.getCenter())
    this.add(this.instance.mesh)
  }

  initPhysics () {
    this.physics = new Body({ mass: 1, shape: new Sphere(1.5) })
    this.physics.position.set(this.position.x, this.position.y, this.position.z)
    webgl.stage.physics.toPhysicWorld('ball', this.physics, 'ball')
  }

  savePosition () {
    this.history.push(new Vector3().copy(this.position))
    if (this.history.length > 50) {
      this.history.shift()
    }
  }

  updateFromPhysics () {
    this.position.copy(this.physics.position)
    raycaster.set(this.position, down)
    if (this.history.length > 3) {
      this.direction.copy(new Vector3().subVectors(this.position, this.history[this.history.length - 2]).normalize())
    }
    this.savePosition()
    this.instance.mesh.quaternion.copy(this.physics.quaternion)

    const intersects = raycaster.intersectObjects(webgl.stage.terrain.speedsUp.children, true)
    if (intersects.length) {
      this.physics.applyImpulse(new Vector3().copy(this.direction).multiplyScalar(10))
    }
    // this.helper.setDirection(dir)
  }

  update () {
  }

  applyForce (force) {
    this.physics.velocity.copy(force)
    // this.physics.applyForce(force)
    console.log(force)
  }

  resize () {
  }
}
