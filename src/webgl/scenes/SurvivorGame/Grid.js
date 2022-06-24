import {Group, Vector3} from 'three'
import {Node} from './Node'

const tiles = []

export default class Grid extends Group {
	constructor(division) {
		super()
		this.division = division

		this.tileSize = 1
		this.size = division * this.tileSize

		this.computeBoxs(division)
		this.run()
	}

	static tiles() {
		return tiles
	}

	static propagate(node) {
		if (node.x > 0) {
			tiles[node.x - 1][node.y].collapse(node.type, 'top')
		}
		if (node.x < tiles.length - 1) {
			tiles[node.x + 1][node.y].collapse(node.type, 'bottom')
		}
		if (node.y > 0) {
			tiles[node.x][node.y - 1].collapse(node.type, 'left')
		}
		if (node.y < tiles[node.x].length - 1) {
			tiles[node.x][node.y + 1].collapse(node.type, 'right')
		}
	}

	computeBoxs(division) {
		for (let x = 0; x < division; x++) {
			tiles.push([])
			for (let y = 0; y < division; y++) {
				const topLeft = new Vector3(
						-(this.size / 2) + x * this.tileSize,
						0,
						-(this.size / 2) + y * this.tileSize
				)
				const bottomRight = new Vector3().copy(topLeft)
				bottomRight.add(new Vector3(this.tileSize, 2, this.tileSize))

				const node = new Node(x, y, [topLeft, bottomRight])
				tiles[x].push(node)
				this.add(node)
			}
		}
	}

	run() {
		const remainingNode = tiles.flat().filter(n => n.type === undefined)
		if (remainingNode.length) {
			remainingNode.sort(n => n.neighbour.length)
			remainingNode[0].setNodeType()
			Grid.propagate(remainingNode[0])
			this.run()
		}
	}

	update() {
		Object.keys(tiles).forEach((k) => {
			tiles[k].update()
		})
	}
}
