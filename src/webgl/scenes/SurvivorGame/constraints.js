export default [
	{
		name: 'grass',
		index: 0,
		neighbour: [0, 1, 2],
		weight: 3,
		color: "#7ec850"
	},
	{
		name: 'sand',
		index: 1,
		neighbour: [0, 1, 3],
		weight: 2,
		color: "#eab875"
	},
	{
		name: 'rock',
		index: 2,
		neighbour: [0],
		weight: 1,
		color: "#808487"
	},
	{
		name: 'water',
		index: 3,
		neighbour: [1, 3],
		weight: 2,
		color: "#80c5de"
	}
]

// Next separate neighbour by side + rotation