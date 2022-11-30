let options = [
	{
		stock: 18,
		paths: [1, 1, 1, 0],
	},
	{
		stock: 20,
		paths: [1, 1, 0, 0],
	},
	{
		stock: 12,
		paths: [1, 0, 1, 0],
	},
];
let currentId = 0;

export function getTile() {
	let availableOptions = options.filter((opt) => opt.stock);
	let type = Math.floor(Math.random() * availableOptions.length);

	let tile = {
		id: currentId,
		paths: [...availableOptions[type].paths],
	};
	let rotations = Math.floor(Math.random() * 4);
	for (let i = 0; i < rotations; i++) {
		tile.paths.unshift(tile.paths.pop());
	}
	availableOptions[type].stock--;
	currentId++;
	return tile;
}

export function generateBoard() {
	let board = [];
	for (let i = 0; i < 7; i++) {
		let col = [];
		for (let i = 0; i < 7; i++) {
			col.push(getTile());
		}
		board.push(col);
	}
	console.log(options);
	return board;
}
