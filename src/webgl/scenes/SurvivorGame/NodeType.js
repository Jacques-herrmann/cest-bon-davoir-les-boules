import constraints from "./constraints";

const instances = []

export class NodeType {
	constructor(params) {
		this.name = params.name
		this.index = params.index
		this.neighbour = params.neighbour
		this.weight = params.weight

		this.color = params.color

		instances.push(this)
	}

	static get instances() {
		return instances
	}

	static getWeightedRand(neighbour) {
		const table = []

		for (let i = 0; i < neighbour.length; i++) {
			const weight = instances.find(t => t.index === neighbour[i]).weight
			if (weight) {
				for (let j = 0; j < weight; j++) {
					table.push(neighbour[i])
				}
			}
		}
		return table[Math.floor(Math.random() * table.length)]
	}
}

constraints.forEach(c => new NodeType(c))
