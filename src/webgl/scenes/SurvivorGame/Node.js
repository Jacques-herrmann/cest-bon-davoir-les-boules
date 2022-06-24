import {
	Box3,
	Color,
	Group,
	Vector3,
	BoxBufferGeometry, MeshBasicMaterial, Mesh
} from 'three'

const materials = [
	new MeshBasicMaterial({color: new Color("#7ec850")}), // grass
	new MeshBasicMaterial({color: new Color("#eab875")}), // sand
	new MeshBasicMaterial({color: new Color("#808487")}), // rock
	new MeshBasicMaterial({color: new Color("#80c5de")}), // water

	new MeshBasicMaterial({color: new Color(Math.random(), Math.random(), Math.random())}), // rdm
	new MeshBasicMaterial({color: new Color(Math.random(), Math.random(), Math.random())}), // rdm
	new MeshBasicMaterial({color: new Color(Math.random(), Math.random(), Math.random())}), // rdm
	new MeshBasicMaterial({color: new Color(Math.random(), Math.random(), Math.random())}), // rdm
]

let collapsed = 0

export class Node extends Group {
	constructor(x, y, bounds) {
		super()
		this.x = x
		this.y = y
		this.key = this.y + '-' + this.x
		this.type = undefined

		this.box = new Box3(bounds[0], bounds[1])
		this.center = new Vector3()
		this.box.getCenter(this.center)

		this.degreeOfFreedom = [0, 1, 2, 3, 4, 5, 6, 7]
	}

	setNodeType(index) {
		if (!index) {
			if (this.degreeOfFreedom.length) {
				index = this.degreeOfFreedom[Math.floor(Math.random() * this.degreeOfFreedom.length)]
			} else {
				index = Math.floor(Math.random() * materials.length)
			}
		}
		this.type = index
		this.mesh = new Mesh(new BoxBufferGeometry(), materials[index])
		this.mesh.position.add(new Vector3(this.center.x, 0, this.center.z))
		this.add(this.mesh)
	}

	collapse(type, position, propagate) {
		// Update Degree of freedom if neighbour node has type
		const i = this.degreeOfFreedom.indexOf(type)
		if (type !== -1) {
			this.degreeOfFreedom.splice(i, 1)
		}
		if (this.degreeOfFreedom.length === 1) {
			this.setNodeType(this.degreeOfFreedom[0])
			propagate(this)
		}
	}

	update() {
	}
}
