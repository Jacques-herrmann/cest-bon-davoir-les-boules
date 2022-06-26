import {
	Box3,
	Color,
	Group,
	Vector3,
	BoxBufferGeometry, MeshBasicMaterial, Mesh
} from 'three'
import Grid from "./Grid";
import Loader from "../../utils/Loader";
import gsap from 'gsap'
import {NodeType} from "./NodeType";

const materials = []
NodeType.instances.forEach(n => {
	materials.push(new MeshBasicMaterial({color: new Color(n.color)}))
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

	setNodeType(type) {
		if (!type) {
			if (this.neighbour.length) {
				// Here we choose the current type
				type = NodeType.getWeightedRand(this.neighbour)
			} else {
				// Nobody should be here
				type = Math.floor(Math.random() * materials.length)
			}
		}
		this.type = type
		const name = NodeType.instances.find(c => c.index === type).name
		this.mesh = Loader.items[name].scene.children[0].clone()
		this.mesh.position.copy(new Vector3()).add(new Vector3(this.center.x, 0.4, this.center.z))
		this.add(this.mesh)
		// setTimeout(() => {
		// 	gsap.to(this.mesh.position, {
		// 		y: 0,
		// 		duration: 0.4,
		// 		ease: 'back.out(1.2)'
		// 	})
		// }, Math.random() * 400)
	}

	collapse(type, position) {
		if (this.type !== undefined) return
		const constraint = NodeType.instances.find(c => c.index === type)
		this.neighbour = this.neighbour.filter(n => constraint.neighbour.indexOf(n) !== -1)

		if (this.neighbour.length === 1) {
			this.setNodeType(this.neighbour[0])
			Grid.propagate(this)
		}
	}

	update() {
	}
}
