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