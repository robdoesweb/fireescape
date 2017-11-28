function astar(map, start, end) {
	var current = [];
	var neighbors = [];
	var 
}

function neighbors(start) {
	return [{x: start.x + 1, y: start.y},
			{x: start.x - 1, y: start.y},
			{x: start.x, y: start.y + 1},
			{x: start.x, y: start.y - 1}];
}

function manhattan(start, end) {
	return (Math.abs(end.x - start.x)) + (Math.abs(end.y - start.y));
}