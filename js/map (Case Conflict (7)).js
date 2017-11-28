/***********************************************************
	CS4200: Artificial Intelligence, Fall 2017
	Final Project
	
	@author rob@robdoesweb.com

	Map.js
	Map prototype for FireEscape application

************************************************************/

var Map = function(width, height) {

	this.data = [];
	this.width = width;
	this.height = height;
	this.tiles = {
		  clear: 0,
		   wall: 1,
		   door: 2,
		 window: 3,
		   exit: 4
	}

	this.scale = 1;

	// initialize map on width and height
	for (var x = 0; x < this.width; x++) {
		this.data[x] = [];
		for (var y = 0; y < this.width; y++) {
			this.data[x][y] = this.tiles.clear;
		}
	}

}


/**
	addWalls rectangular walls from (sx, sy) to (dx, dy)
**/
Map.prototype.addWalls = function(sx, sy, dx, dy) {

}

Map.prototype.fillRect = function(sx, sy, dx, dy, tile) {

}

Map.prototype.clearRect = function(sx, sy, dx, dy) {
	this.fillRect(this.tiles.clear);
}