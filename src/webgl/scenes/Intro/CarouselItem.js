import {
	BoxBufferGeometry,
	Color,
	Group,
	Mesh,
	MeshBasicMaterial,
} from "three";

export default class CarouselItem extends Mesh {
	constructor() {
		super()

		this.baseMaterial = new MeshBasicMaterial({ color: new Color(Math.random() , Math.random() , Math.random()) })
		this.material = this.baseMaterial
		this.geometry = new BoxBufferGeometry(1, 1, 1)
	}
}