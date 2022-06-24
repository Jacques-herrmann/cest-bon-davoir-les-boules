import {
	Box3,
	Color,
	Group,
	Vector3,
	BoxBufferGeometry, MeshBasicMaterial, Mesh
} from 'three'
import constraints from "./constraints";
import Grid from "./Grid";

const materials = []
constraints.forEach(c => {
	materials.push(new MeshBasicMaterial({color: new Color(c.color)}))
})

export class Node extends Group {
	constructor(x, y, bounds) {
		super()
		this.x = x
		this.y = y
		this.type = undefined

		this.box = new Box3(bounds[0], bounds[1])
		this.center = new Vector3()
		this.box.getCenter(this.center)

		this.neighbour = [0, 1, 2, 3]
	}

	setNodeType(index) {
		if (!index) {
			if (this.neighbour.length) {
				index = this.neighbour[Math.floor(Math.random() * this.neighbour.length)]
			} else {
				index = Math.floor(Math.random() * materials.length)
			}
		}
		this.type = index
		this.mesh = new Mesh(new BoxBufferGeometry(), materials[index])
		this.mesh.position.add(new Vector3(this.center.x, 0, this.center.z))
		this.add(this.mesh)
	}

	collapse(type, position) {
		if (this.type !== undefined) return
		const constraint = constraints.find(c => c.index === type)
		this.neighbour = this.neighbour.filter(n => constraint.neighbour.indexOf(n) !== -1)

		if (this.neighbour.length === 1) {
			this.setNodeType(this.neighbour[0])
			Grid.propagate(this)
		}
	}

	update() {
	}
}
