import { Vec3, World, Material, ContactMaterial } from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import WebGL from './webgl'
import GameControls from './GameControls'

export default class Physics {
  constructor () {
    this.webgl = new WebGL()
    this.world = new World({
      gravity: new Vec3(0, -9.82, 0)
    })
    this.debugger = new CannonDebugger(this.webgl.scene, this.world, {})
    this.objects = {}
    this.materials = {}
    this.contacts = {}
    this.createMaterials()
  }

  createMaterials () {
    this.materials.default = new Material('default')
    this.materials.ball = new Material('ball')

    this.contacts.defaultBall = new ContactMaterial(this.materials.default, this.materials.ball, { friction: 5, restitution: 0.3, contactEquationStiffness: 1000 })
    this.world.addContactMaterial(this.contacts.defaultBall)
  }

  toPhysicWorld (name, obj, mat = 'default') {
    if (!Object.keys(this.materials).includes(mat)) {
      mat = 'default'
    }
    obj.material = this.materials[mat]
    this.objects[name] = obj
    this.world.addBody(obj)
  }

  update () {
    if (this.webgl.stage.gameControl.state === GameControls.STATES.GAME) {
      this.world.step(1 / 60, this.webgl.time.delta, 3)
      this.debugger.update()
    }
  }
}
