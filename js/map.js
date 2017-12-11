
// creates a new, blank floorplan
function Floorplan(size_x, size_y, tile_scale) {
	this.x = size_x; // int, max width of floorplan
	this.y = size_y; // int, max height of floorplan
	this.tile_scale = tile_scale; // string, unit of measurement for display only
	this.data = [[]]; // 2d array with x cols and y rows
	this.exits = [];  // 1d array of exits with position objects {x,y}
	this.default_start = {x: 0, y: 0}; // initial placement for marker, can be updated later

	for (var x = 0; x < (size_x); x++) {
		this.data[x] = [];
		for (var y = 0; y < (size_y); y++) {
			this.data[x][y] = 1;
		}
	}
}

Floorplan.prototype.fillTile = function(x, y, block_type) {
	this.data[x][y] = block_type;
}

Floorplan.prototype.fillBlock = function(sx, sy, w, h, block_type) {
	var _self = this;
	for (var y = sy; y < h + sy; y++) {
		for (var x = sx; x < w + sx; x++) {
			_self.data[x][y] = block_type;
		}
	}
}

Floorplan.prototype.drawRoom = function(sx, sy, w, h, block_type) {
	Floorplan.prototype.fillBlock(sx, sy, w, h, blocks.WALL);
	Floorplan.prototype.fillBlock(sx + 1, sy + 1, w - 1, h - 1, blocks.CLEAR);
}

Floorplan.prototype.eraseBlock = function(sx, sy, w, h) {
	Floorplan.prototype.fillBlock(sx, sy, w, h, blocks.CLEAR);
}

Floorplan.prototype.findGoals = function() {
	this.exits = [];
	for (var y = 0; y < this.y; y++) {
		for (var x = 0; x < this.x; x++) {
			if (this.data[x][y] == blocks.EXIT) {
				this.exits.push({x: x, y: y});
			}
		}
	}
}

map_config = {
	w: 1000,
	h: 1000
}

/**
	blocks denote different parts of floor plan
**/
blocks = {
	WALL: 0,
	CLEAR: 1,
	DOOR: 2,
	WINDOW: 3,
	OBST: 4,
	HAZARD: 5,
	LINK: 6,
	EXIT: 7,

	getColor: function(blockId) {
		switch (blockId) {
			case 0:
				return '#000'; // clear
			case 1:
				return '#FFF'; // wall
			case 2:
				return '#ABABAB'; // door
			case 3:
				return '#0000FF'; // window
			case 4:
				return '#FFFF00'; // obstruction
			case 5:
				return '#FF9900'; // hazard
			case 6:
				return '#00CCFF'; // link (door to another floorplan)
			case 7:
				return '#00FF00'; // exit, goal
			default:
				return '#000000';
		}
	}
}