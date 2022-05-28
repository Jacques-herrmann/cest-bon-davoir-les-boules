import WebGL from '../webgl'
import { Group, MeshNormalMaterial, Mesh } from 'three'

let webgl

export default class Finish extends Group {
  constructor () {
    super()
    webgl = new WebGL()
    this.init()
  }

  init () {
    this.instance = {}
    this.instance.geometry = webgl.assetManager.items.end.scene.children[0].geometry
    this.instance.material = new MeshNormalMaterial()
    this.instance.mesh = new Mesh(this.instance.geometry, this.instance.material)
    this.add(this.instance.mesh)
  }
}
