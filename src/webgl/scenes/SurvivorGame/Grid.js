import {Group, Vector3} from 'three'
import {Node} from './Node'

export default class Grid extends Group {
	constructor(division) {
		super()
		this.division = division

		this.tileSize = 1
		this.size = division * this.tileSize

		this.tiles = []
		this.computeBoxs(division)
		this.run()
	}

	computeBoxs(division) {
		for (let x = 0; x < division; x++) {
			this.tiles.push([])
			for (let y = 0; y < division; y++) {
				const topLeft = new Vector3(
						-(this.size / 2) + x * this.tileSize,
						0,
						-(this.size / 2) + y * this.tileSize
				)
				const bottomRight = new Vector3().copy(topLeft)
				bottomRight.add(new Vector3(this.tileSize, 2, this.tileSize))

				const node = new Node(x, y, [topLeft, bottomRight])
				this.tiles[x].push(node)
				this.add(node)
			}
		}
	}

	run() {
		const remainingNode = this.tiles.flat().filter(n => n.type === undefined)
		if (remainingNode.length) {
			const random = Math.floor(Math.random() * remainingNode.length)
			remainingNode[random].setNodeType()
			this.propagate(remainingNode[random])
			this.run()
		}
	}

	propagate(node) {
		if (node.x > 0) {
			this.tiles[node.x - 1][node.y].collapse(node.type, 'top', this.propagate)
		}
		if (node.x < this.division - 1) {
			this.tiles[node.x + 1][node.y].collapse(node.type, 'bottom', this.propagate)
		}
		if (node.y > 0) {
			this.tiles[node.x][node.y - 1].collapse(node.type, 'left', this.propagate)
		}
		if (node.y < this.division - 1) {
			this.tiles[node.x][node.y + 1].collapse(node.type, 'right', this.propagate)
		}
	}

	update() {
		Object.keys(this.tiles).forEach((k) => {
			this.tiles[k].update()
		})
	}
}
