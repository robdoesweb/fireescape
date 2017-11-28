map_config = {
	w: 1000,
	h: 1000
}

var map = [[]];

// TODO: namespace map functions

// fill map with random values
function noise (map, sx, sy, w, h, values) {
	for (var y = sy; y < (sy + h); y++) {
		map[y] = [];
		for (var x = sx; x < (sx + w); x++) {
			map[y][x] = values[rand(0, values.length - 1)];
		}
	}
}

noise(map, 0, 0, 1000, 1000, [0, 1]);

function walls (map, sx, sy, w, h, val) {
	for (var y = sy; y < (sy + h); y++) {
		// console.log("sx + w: " + (sx + w) + " y: " + y)
		map[sx][y] = val;
		map[parseInt(sx + w - 1)][y] = val;
	}
	for (var x = sx; x < (sx + w); x++) {
		map[x][sy] = val;
		map[x][parseInt(sy + h - 1)] = val;
	}
}

function clear (map, sx, sy, w, h, val) {
	for (var y = sy; y < sy + h; y++) {
		for (var x = sx; x < sx + w; x++) {
			map[x][y] = 0;
		}
	}
}

function mazeify (map, w, h, depth, iters) {
	for (var i = 0; i < iters; i++) {
		clean (map, w, h, 1);
		build (map, w, h, 1);
		clean (map, w, h, 1);
	}
}

function room (map, sx, sy, w, h, wall_val, clear_val) {
	walls (map, sx, sy, w, h, wall_val);
	clear (map, sx + 1, sy + 1, w - 1, h - 1, clear_val);
}

function clean (map, w, h, iters) {
	var neighbors, val;
	for (var i = 0; i < iters; i++) {
		for (var y = 1; y < h - 1; y++) {
			for (var x = 1; x < w - 1; x++) {
				neighbors = [[x, y - 1], [x - 1, y], [x + 1, y], [x, y + 1]]; // up, left, right, down
				val = map[neighbors[0][0]][neighbors[0][1]] +
					  map[neighbors[1][0]][neighbors[1][1]] +
					  map[neighbors[2][0]][neighbors[2][1]] +
					  map[neighbors[3][0]][neighbors[3][1]];
				if (val > 2) {
					target = rand(0, 3);
					map[neighbors[target][0]][neighbors[target][1]] = 0;
				}
			}
		}
	}
}

function build(map, w, h, iters) {
		var neighbors, val;
	for (var i = 0; i < iters; i++) {
		for (var y = 1; y < h - 1; y++) {
			for (var x = 1; x < w - 1; x++) {
				neighbors = [[x, y - 1], [x - 1, y], [x + 1, y], [x, y + 1]]; // up, left, right, down
				val = map[neighbors[0][0]][neighbors[0][1]] +
					  map[neighbors[1][0]][neighbors[1][1]] +
					  map[neighbors[2][0]][neighbors[2][1]] +
					  map[neighbors[3][0]][neighbors[3][1]];
				if (val < 2) {
					target = rand(0, 3);
					map[neighbors[target][0]][neighbors[target][1]] = 1;
				}
			}
		}
	}
}