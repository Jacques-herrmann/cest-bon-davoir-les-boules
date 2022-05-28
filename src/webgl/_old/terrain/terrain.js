import WebGL from '../webgl'
import { Group, MeshNormalMaterial, Mesh } from 'three'
import { Body, Trimesh } from 'cannon-es'
import Finish from './finish'
import Lobby from './lobby'
import SpeedsUp from './speedsUp'

let webgl

export default class Terrain extends Group {
  constructor () {
    super()
    webgl = new WebGL()
    this.physics = []
    this.init()
    this.initPhysics()
  }

  init () {
    this.instance = {}
    this.instance.geometry = webgl.assetManager.items.terrain.scene.children[0].geometry
    this.instance.material = new MeshNormalMaterial()
    this.instance.mesh = new Mesh(this.instance.geometry, this.instance.material)
    this.add(this.instance.mesh)

    this.finish = new Finish()
    this.add(this.finish)

    this.lobby = new Lobby()
    this.add(this.lobby)

    this.speedsUp = new SpeedsUp()
    this.add(this.speedsUp)

    this.update()
  }

  initPhysics () {
    const vertices = this.instance.geometry.attributes.position.array
    const indices = this.instance.geometry.index.array

    const p = new Body({
      type: Body.STATIC,
      shape: new Trimesh(vertices, indices)
    })
    p.position.set(this.position.x, this.position.y, this.position.z)
    this.physics.push(p)
    webgl.stage.physics.toPhysicWorld(p.name, p)
  }

  update () {
  }

  resize () {
  }
}
