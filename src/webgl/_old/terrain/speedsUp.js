import WebGL from '../webgl'
import { Group, MeshBasicMaterial, Mesh } from 'three'

let webgl

export default class SpeedsUp extends Group {
  constructor () {
    super()
    webgl = new WebGL()
    this.init()
  }

  init () {
    this.instance = {}
    this.instance.geometry = webgl.assetManager.items.speedsUp.scene.children[0].geometry
    this.instance.material = new MeshBasicMaterial({ color: 'red' })
    this.instance.mesh = new Mesh(this.instance.geometry, this.instance.material)
    this.add(this.instance.mesh)
  }
}
