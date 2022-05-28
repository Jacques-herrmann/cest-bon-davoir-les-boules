import WebGL from '../webgl'
import { Group, MeshNormalMaterial, Mesh } from 'three'

let webgl

export default class Lobby extends Group {
  constructor () {
    super()
    webgl = new WebGL()
    this.init()
  }

  init () {
    this.instance = {}
    this.instance.geometry = webgl.assetManager.items.begin.scene.children[0].geometry
    this.instance.geometry.computeBoundingSphere()
    this.instance.material = new MeshNormalMaterial()
    this.instance.mesh = new Mesh(this.instance.geometry, this.instance.material)
    this.add(this.instance.mesh)
  }

  getCenter () {
    return this.instance.geometry.boundingSphere.center
  }
}
