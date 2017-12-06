
// test and example for squid
var astar;
var player;
var thePath;
var goal;
var debug = true;

config = {
	tileSize: 16, 	  // number of pixels to represent 1 square unit of floorspace
	tilesAcross: 61,  // number of tiles to render width-wise (should be odd, so marker can be at center)
	tilesDown: 61     // number of tiles to render height-wise ( ^^^ )
}

app = {
	astar: {}, 	// placeholder for easystar 

	marker: {}, // "You are Here" place marker

	floorplan: new Floorplan(100, 100, "feet"),

	state: "UNINIT",

	mode: "EDITOR",

	tool: {},

	sqd: new Squid(document.getElementById('squid'), window.screen.innerWidth, window.screen.innerHeight), // graphics library

	init: function() {
		// DELETE THIS some test code
		app.floorplan.data[22][22] = 5;
		app.floorplan.offX = 0;
		app.floorplan.offY = 0;


		app.state = "INITIALIZING"; 					 // update the current state
		

		/**
			initialize the map (floorplan)
		**/
		app.map = new SQUID.Entity(0, 0, window.screen.innerWidth, window.screen.innerHeight);
		app.map.update = function(dt) {

		};

		app.map.render = function(ctx) {
			// get sx, sy so that marker is in center of screen
			app.floorplan.offX = app.marker.location[0] - ((config.tilesAcross - 1) / 2);
			app.floorplan.offY = app.marker.location[1] - ((config.tilesAcross - 1) / 2);

			app.map.currX = app.floorplan.offX;
			app.map.currY = app.floorplan.offY;
			for (y = app.floorplan.offY; y < (app.floorplan.offY + config.tilesDown); y++) {
				for (x = app.floorplan.offX; x < (app.floorplan.offX + config.tilesAcross); x++) {
					if (app.floorplan.data[x][y] !== null) {
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
		app.tool = new SQUID.Entity(0, 0, config.tileSize, config.tileSize);
		app.tool.update = function(dt) {
			this.x = config.tileSize * (Math.floor(Input.mouse.x / config.tileSize));
			this.y = config.tileSize * (Math.floor(Input.mouse.y / config.tileSize));
			if (Input.keys['1']) {
				this.tileType = 1;
			} else if (Input.keys['0']) {
				this.tileType = 0;
			} else if (Input.keys['2']) {
				this.tileType = 2;
			} else if (Input.keys['3']) {
				this.tileType = 3;
			} else if (Input.keys['4']) {
				this.tileType = 4;
			} else if (Input.keys['5']) {
				this.tileType = 5;
			} else if (Input.keys['6']) {
				this.tileType = 6;
			} else if (Input.keys['7']) {
				this.tileType = 7;
			}
		}

		app.tool.render = function(ctx) {
			ctx.strokeStyle = '#ff0000';
			ctx.strokeRect(0, 0, config.tileSize, config.tileSize);
		}

		Input.onClick(function(e){
			if (app.mode = "EDITOR" && app.tool.tileType) {
				var x = (Math.floor(Input.mouse.x / config.tileSize)) + app.map.currX;
				var y = (Math.floor(Input.mouse.y / config.tileSize)) + app.map.currY;
				app.floorplan.data[x][y] = app.tool.tileType;
				console.log("Tried changing [" + x + "," + y + "] to " + app.tool.tileType);
			}

		});

		/**
			initialize the position marker
		**/
		app.marker = new SQUID.Entity(window.screen.innerWidth / 2, window.screen.innerHeight / 2, config.tileSize, config.tileSize); 
		app.marker.location = [50, 50]; // TODO: update to map position
		app.marker.render = function(ctx) {
			ctx.fillStyle = '#ff0000';
			ctx.fillRect(0, 0, config.tileSize, config.tileSize);
		}

		/**
			initialize astar
		**/


		/**
			add app components to SQUID
		**/
		app.sqd.layers.base.add(app.map);
		app.sqd.layers.base.add(app.marker);
		app.sqd.layers.base.add(app.tool);

		// assign background style
		app.sqd.background = 'rgba(0, 0, 0, 1)';

	},


}

$(document).ready(function(){
	app.init();
	app.sqd.start();
});

// $(document).ready(function(){

// 	sqd = new Squid(document.getElementById('squid'), window.screen.width, window.screen.height);
// 	sqd.ctx.imageSmoothingEnabled = false;
// 	//sqd.ctx.scale(2, 2);
	
// 	sqd.resources = ['img/arrow.png', 'img/circle.png', 'img/light.png', 'img/spritesheet.png', 'img/ranger.png', 'img/warrior.png', 'img/grass.jpg'];
// 	var arrow = new SQUID.Entity(75, 75, 50, 50);
// 	arrow.center = {x: 25, y: 25};
// 	arrow.update = function(dt){
// 		this.rot = Math.atan2(goal.y - player.tileY, goal.x - player.tileX);
// 	};
// 	arrow.render = function(ctx){
// 		ctx.drawImage(Resources.get('img/arrow.png'), -this.w / 2, -this.h / 2);
// 	};
// 	var player = new SQUID.Entity(0, 0, 32, 32);
// 	player.tileX = 499;
// 	player.tileY = 499;
// 	player.lastMove = 0;
// 	player.idle = new SQUID.Animation("img/warrior.png", 0, 0, 32, 32, 10);
// 	player.walk = new SQUID.Animation("img/warrior.png", 0, 64, 32, 32, 10);
// 	player.attack = new SQUID.Animation("img/warrior.png", 0, 96, 32, 32, 10);
// 	//ranger.attack.loop = false;
// 	player.animation = player.idle;
// 	player.update = function(dt) {
// 		if (player.lastMove > 0.1) {
// 			player.x = 15 * 32;
// 			player.y = 10 * 32;
// 			if (Input.keys["ArrowRight"] && map[player.tileX + 1][player.tileY] !== 1) {
// 					player.tileX += 1;
// 			} else if (Input.keys["ArrowLeft"] && map[player.tileX - 1][player.tileY] !== 1) {
// 					player.tileX -= 1;
// 			} else if (Input.keys["ArrowDown"] && map[player.tileX][player.tileY + 1] !== 1) {
// 					player.tileY += 1;
// 			} else if (Input.keys["ArrowUp"] && map[player.tileX][player.tileY - 1] !== 1) {
// 					player.tileY -= 1;
// 			}
// 			player.lastMove = 0;
// 		} else {
// 			player.lastMove += dt;
// 		}

// 		if (Input.keys[" "]) {
// 			player.animation = player.attack;
// 		} else {
// 			player.animation = player.idle;
// 		}

// 		if (player.tileX == goal.x && player.tileY == goal.y) {
// 			console.log("you win bitch!");
// 			win = true;
// 		}
// 	};

// 	// player.render = function(ctx) {
// 	// 	ctx.fillStyle = '#ff0000';
// 	// 	ctx.fillRect(0, 0, 32, 32);
// 	// }

// 	var haze = new SQUID.Entity(0, 0, 31 * 32, 21 * 32);
// 	haze.render = function(ctx) {
// 		ctx.globalCompositeOperation = 'darken';
// 		ctx.fillStyle = '#000000';
// 		ctx.fillRect(0, 0, 31 * 32, 160);
// 		ctx.fillRect(0, 160, 320, 352);
// 		ctx.fillRect(21 * 32, 160, 320, 352);
// 		ctx.fillRect(0, 16 * 32, 31 * 32, 160);
// 	}

// 	var light = new SQUID.Entity(320, 160, 352, 352);
// 	light.render = function(ctx) {
// 		ctx.drawImage(Resources.get('img/circle.png'), 0, 0, this.w, this.h);
// 		ctx.globalCompositeOperation = 'overlay';
// 		ctx.drawImage(Resources.get('img/light.png'), 0, 0, this.w, this.h);
// 	}



// 	var maze = new SQUID.Entity(0, 0, 0, 0);
// 	maze.render = function(ctx) {
// 		var xtiles = 31;
// 		var ytiles = 21;
// 		var ground = {x: 0, y: 14 * 32};
// 		var door = {x: 17 * 32, y: 15 * 32};
// 		var wall = {x: 40 * 32, y: 18 * 32};
// 		var startX = player.tileX - (Math.floor((xtiles - 1) / 2));
// 		var startY = player.tileY - (Math.floor((ytiles - 1) / 2));
// 		for (var y = 0; y < ytiles; y++) {
// 			for (var x = 0; x < xtiles; x++) {
// 				if (startX + x < 0 || startY + y < 0 || startX + x > map_config.w || startY + y > map_config.h) {
// 					ctx.fillStyle = '#000000';
// 					ctx.fillRect(x * 32, y * 32, 32, 32);
// 				} else if (map[startX + x][startY + y] == 1) {
// 					ctx.fillStyle = '#000000';
// 					ctx.fillRect(x * 32, y * 32, 32, 32);
// 					//ctx.drawImage(Resources.get('img/spritesheet.png'), wall.x, wall.y, 32, 32, x * 32, y * 32, 32, 32);
// 				} else if (map[startX + x][startY + y] == 0) {
// 					ctx.fillStyle = '#ffffff';
// 					ctx.fillRect(x * 32, y * 32, 32, 32);
// 					//ctx.drawImage(Resources.get('img/spritesheet.png'), ground.x, ground.y, 32, 32, x * 32, y * 32, 32, 32);
// 				} else if (map[startX + x][startY + y] == 2) {
// 					ctx.fillStyle = '#0000ff';
// 					ctx.fillRect(x * 32, y * 32, 32, 32);
// 					//ctx.drawImage(Resources.get('img/spritesheet.png'), door.x, door.y, 32, 32, x * 32, y * 32, 32, 32);
// 				} else if (map[startX + x][startY + y] == 3) {
// 					ctx.fillStyle = '#ff0000';
// 					ctx.fillRect(x * 32, y * 32, 32, 32);
// 					//ctx.drawImage(Resources.get('img/spritesheet.png'), door.x, door.y, 32, 32, x * 32, y * 32, 32, 32);
// 				}

				
// 			}
// 		}
// 	};

// 	mazeify(map, 1000, 1000, 2, 5);
// 	map[player.tileX][player.tileY] = 0;
// 	walls(map, 0, 0, 1000, 1000, 1);
// 	var astar = new EasyStar.js();
// 	astar.setGrid(map);
// 	astar.setAcceptableTiles([0]);
// 	goal = {x: rand(player.tileX - 250, player.tileY + 250), y: rand(player.tileY - 250, player.tileY + 250)};
// 	map[goal.x][goal.y] = 2;
// 	astar.findPath(player.tileX, player.tileY, goal.x, goal.y, function(path){
// 		if (path) {
// 			console.log("goal: " + goal.x + ", " + goal.y);
// 			console.log(path);

// 			for (var i = 0; i < path.length; i++) {
// 				map[path[i].x][path[i].y] = 3;
// 				console.log (path[i].x + "," + path[i].y);
// 			}
// 			thePath = path;			
// 		}

// 	});
// 	astar.calculate();
// 	sqd.newLayer('maze');
// 	sqd.newLayer('player');
// 	sqd.layers.player.add(player);
// 	sqd.layers.maze.add(maze);
// 	sqd.newLayer('haze');
// 	//sqd.layers.haze.add(haze);
// 	//sqd.layers.haze.add(light);
// 	sqd.layers.haze.add(arrow);

// 	cons = new SQUID.Entity(10, 15, 800, 600);
// 	cons.update = function(dt) {
// 			if (win) {
// 				cons.msg = "You've escaped the dungeon!";
// 				clear(map, 0, 0, 1000, 1000, 0);

// 			} else if (debug) {
// 				cons.msg = "lastmove: " + player.lastMove.toFixed(5) + " pos:" + player.tileX + ", " + player.tileY;
// 			}
// 		};
// 	cons.render = function(ctx){
// 			ctx.font = '16px monospace';
// 			ctx.fillStyle = '#0F0';
// 			ctx.fillText(cons.msg, cons.x, cons.y);
// 			//console.log('drawing');
// 		};


	

	
// 	//sqd.layers.gui.add(ranger);

// 	label = new SQUID.Entity(0, 0, 1, 1);
// 	label.lifespan = 0.75;
// 	label.lifetime = 0;
// 	label.update = function(dt) {
// 		if (label.active) {
// 			if (this.lifetime > this.lifespan) {
// 				this.active = false;
// 				this.lifetime = 0;
// 				this.y = 0;
// 			} else {
// 				this.lifetime += dt;
// 				this.y -= 50 * dt;
// 			}
// 		}
// 	};

// 	label.render = function(ctx) {
// 		if (label.active) {
// 			ctx.font = "16px monospace";
// 			ctx.fillStyle = '#0F0';
// 			var alpha = 1 - (this.lifetime / this.lifespan);
// 			ctx.globalAlpha = (this.lifetime / this.lifespan > 1) ? 0 : alpha;
// 			ctx.fillText("x: " + Input.mouse.x + ", y: " + Input.mouse.y, Input.mouse.x - 50, Input.mouse.y - 10);
// 		}
// 	};
// 	sqd.newLayer('gui');

// 	sqd.layers.gui.add(label);
// 	sqd.background = '#000';
// 	sqd.layers.gui.add(cons);

// 	sqd.start();


// });
