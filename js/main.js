
// test and example for squid
var astar;
var player;
var thePath;
var goal;
var debug = true;

config = {
	tileSize: 16, 	  // number of pixels to represent 1 square unit of floorspace
	tilesAcross: 61,  // number of tiles to render width-wise (should be odd, so marker can be at center)
	tilesDown: 61,     // number of tiles to render height-wise ( ^^^ )
}

config.width = config.tileSize * config.tilesAcross,
config.height = config.tileSize * config.tilesDown

estimator = {
	fps: 4.54667
}

app = {

	marker: {}, // "You are Here" place marker

	floorplan: new Floorplan(100, 100, "feet"),

	state: "UNINIT",

	path: new SQUID.Entity(0, 0, 0, 0),

	mode: "EDITOR",

	selectedTool: "Drawing",

	tool: {},

	sqd: new Squid(document.getElementById('squid'), config.width, config.height), // graphics library

	init: function() {
		app.floorplan.offX = 0;
		app.floorplan.offY = 0;

		app.state = "INITIALIZING"; 					 // update the current state

		/**
			initialize the map (floorplan)
		**/
		app.map = new SQUID.Entity(0, 0, window.screen.innerWidth, window.screen.innerHeight);
		app.map.lastMove = 0;
		app.map.update = function(dt) {
			this.lastMove += dt;
			if (this.lastMove > 0.1) {
				if (Input.keys['w']) {
					app.currentPos.y -= 1;
					this.lastMove = 0;
				}
				if (Input.keys['s']) {
					app.currentPos.y += 1;
					this.lastMove = 0;
				}
				if (Input.keys['a']) {
					app.currentPos.x -= 1;
					this.lastMove = 0;
				}
				if (Input.keys['d']) {
					app.currentPos.x += 1;
					this.lastMove = 0;
				}
			}
		};

		app.currentPos = {x: 50, y: 50};

		app.map.render = function(ctx) {
			// get sx, sy so that marker is in center of screen
			app.floorplan.offX = app.currentPos.x - ((config.tilesAcross - 1) / 2);
			app.floorplan.offY = app.currentPos.y - ((config.tilesAcross - 1) / 2);

			app.map.currX = app.floorplan.offX;
			app.map.currY = app.floorplan.offY;
			for (var x = app.floorplan.offX; x < (app.floorplan.offX + config.tilesAcross); x++) {
				for (var y = app.floorplan.offY; y < (app.floorplan.offY + config.tilesDown); y++) {
					//console.log(x + "," + y);
					if ((x >= 0 && x <= app.floorplan.x) && (y >= 0 && y <= app.floorplan.y) && app.floorplan.data[x][y] !== null) {
						ctx.fillStyle = blocks.getColor(app.floorplan.data[x][y]);
					} else {
						ctx.fillStyle = '#000000';
					}
					
					ctx.fillRect((x * config.tileSize) - (app.floorplan.offX * config.tileSize), (y * config.tileSize) - (app.floorplan.offY * config.tileSize), config.tileSize, config.tileSize);
				}
			}

			
		};

		/**
			map tools
		**/
		// make the tool a squid entity to render
		app.tool = new SQUID.Entity(0, 0, config.tileSize, config.tileSize);
		// entity.pos will store tile index positions
		app.tool.pos = {x: ((Math.floor(Input.mouse.x / config.tileSize)) + app.floorplan.offX), y: ((Math.floor(Input.mouse.y / config.tileSize)) + app.floorplan.offY)};
		app.tool.update = function(dt) {
				this.pos = {x: ((Math.floor(Input.mouse.x / config.tileSize)) + app.floorplan.offX), y: ((Math.floor(Input.mouse.y / config.tileSize)) + app.floorplan.offY)};
				this.x = (this.pos.x - app.floorplan.offX) * config.tileSize; // raw x and y for renderer
				this.y = (this.pos.y - app.floorplan.offY)* config.tileSize; 
				if (app.mode === "EDITOR") {
					if (Input.keys['0']) {
						app.tool.tileType = blocks.CLEAR;
					} else if (Input.keys['1']) {
						app.tool.tileType = blocks.WALL;
					} else if (Input.keys['2']) {
						app.tool.tileType = blocks.DOOR;
					} else if (Input.keys['3']) {
						app.tool.tileType = blocks.WINDOW;
					} else if (Input.keys['4']) {
						app.tool.tileType = blocks.OBSTACLE;
					} else if (Input.keys['5']) {
						app.tool.tileType = blocks.HAZARD;
					} else if (Input.keys['6']) {
						app.tool.tileType = blocks.LINK;
					} else if (Input.keys['7']) {
						app.tool.tileType = blocks.EXIT;
					}
					state.update();
					//console.log("Tool is now " + app.tool.tileType);
				}



				if ((app.mode == "EDITOR") && (app.tool.tileType !== null) && Input.mouse.down) {
					if (app.selectedTool = "Drawing") {
						var x = (Math.floor(Input.mouse.x / config.tileSize)) + app.map.currX;
						var y = (Math.floor(Input.mouse.y / config.tileSize)) + app.map.currY;
						app.floorplan.data[x][y] = app.tool.tileType;
					}

					//console.log("app mode: " + app.mode);
					//console.log("Tried changing [" + x + "," + y + "] to " + app.tool.tileType);
				}
		}

		app.tool.render = function(ctx) {
			ctx.strokeStyle = '#ff0000';
			ctx.strokeRect(0, 0, config.tileSize, config.tileSize);
			ctx.strokeText(((Math.floor(Input.mouse.x / config.tileSize)) + app.floorplan.offX)
							 + " , " + ((Math.floor(Input.mouse.y / config.tileSize)) + app.floorplan.offY), -15, -15);
		};

		/**
			initialize the position marker
		**/
		app.marker = new SQUID.Entity(window.screen.innerWidth / 2, window.screen.innerHeight / 2, config.tileSize, config.tileSize); 
		app.marker.pos = {x: 50, y: 50};

		Input.onClick(function(e){
			if (app.mode === "USER") {
				app.marker.pos = app.tool.pos;
				console.log("Changed user position to: " + app.marker.pos.x + " , " + app.marker.pos.y);
			}
		});

		app.marker.update = function(dt) {

		};

		app.marker.render = function(ctx) {
			ctx.fillStyle = '#ff0000';
			ctx.fillRect((this.pos.x - app.floorplan.offX) * config.tileSize, (this.pos.y - app.floorplan.offY) * config.tileSize, config.tileSize, config.tileSize);
		};

		/**
			initialize astar
		**/

		var ponce = false;
		app.path.render = function(ctx) {
			ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
			if (app.path.data) {
				for (var i = 0; i < app.path.data.length; i++) {
					var x = ((app.path.data[i].x - app.floorplan.offX) * config.tileSize);
					var y = ((app.path.data[i].y - app.floorplan.offY) * config.tileSize);
					ctx.fillRect(x, y, config.tileSize, config.tileSize);
				}
			}
		};

		app.path.update = function(dt) {
			if (app.path.data) {
				app.update();
				state.update();
			}
		};


		


		/**
			add app components to SQUID
		**/
		app.sqd.layers.base.add(app.map);
		app.sqd.layers.base.add(app.marker);
		app.sqd.layers.base.add(app.tool);
		app.sqd.layers.base.add(app.path);

		// assign background style
		app.sqd.background = 'rgba(0, 0, 0, 1)';

	},

	// aka FindNearestExit()
	update: function() {
		// find the closest goal tile to the position marker
		var closest = {};
		var minDist = Infinity;
		app.floorplan.findGoals();
		if (app.floorplan.exits.length > 0) {
			for (var i = 0; i < app.floorplan.exits.length; i++) {
				var goal = app.floorplan.exits[i];
				if (manhattan(app.marker.pos, goal) < minDist) {
					closest = goal;
					minDist = manhattan(app.marker.pos, goal);
				}
			}
			var graph = new Graph(app.floorplan.data);
			var start = graph.grid[app.marker.pos.x][app.marker.pos.y];
			var end = graph.grid[closest.x][closest.y];
			app.path.data = astar.search(graph, start, end);
			var pathLength = app.path.data.length;
			if (pathLength > 0) {
				state.timeToExit = "Exit is " + pathLength + " " + app.floorplan.units + " and " + pathLength * estimator.fps + " seconds away.";
			} else {
				state.timeToExit = "Could not find a path to the exit.";
			}
		} else {
			state.timeToExit = "Could not find an exit.";
		}


		
	}


}

$(document).ready(function(){
	app.init();
	app.sqd.start();
});

