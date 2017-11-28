
// test and example for squid
var astar;
var player;
var thePath;
var goal;
var win = false,
	debug = true;

Maze = {
	astar: {},
	player: {},
	goal: [],
	map: [[]],
	state: "UNINITIALIZED",
	sqd: new Squid(document.getElementById('squid'), window.screen.width, window.screen.height),


	init: function() {
		/********************************************************
		/*  CREATE THE PLAYER
		/*******************************************************/
		Maze.player = new SQUID.Entity(0, 0, 32, 32);
		Maze.player.tileX = Maze.config.playerStartX;
		Maze.player.tileY = Maze.config.playerStartY;
		Maze.player.lastMove = 0;
		Maze.player.anims = {
			idle: new SQUID.Animation("img/warrior.png", 0, 0, 32, 32, 10),
			walk: new SQUID.Animation("img/warrior.png", 0, 64, 32, 32, 10),
			attack: new SQUID.Animation("img/warrior.png", 0, 96, 32, 32, 10)
		};
		Maze.player.animation = Maze.player.idle;
		Maze.player.x = 480; // TODO: middle of screen coordinates
		Maze.player.y = 320;
		
		Maze.player.update = function(dt) {
			// TODO: blocked checking function for multiple tile indices
			if (Maze.player.lastMove > 0.1) { // 10 moves / sec
				if (Input.keys["ArrowRight"] && map[Maze.player.tileX + 1][Maze.player.tileY] !== 1) {
						Maze.player.tileX += 1;
				} else if (Input.keys["ArrowLeft"] && map[Maze.player.tileX - 1][Maze.player.tileY] !== 1) {
						Maze.player.tileX -= 1;
				} else if (Input.keys["ArrowDown"] && map[Maze.player.tileX][Maze.player.tileY + 1] !== 1) {
						Maze.player.tileY += 1;
				} else if (Input.keys["ArrowUp"] && map[Maze.player.tileX][Maze.player.tileY - 1] !== 1) {
						Maze.player.tileY -= 1;
				}
				Maze.player.lastMove = 0;
			} else {
				player.lastMove += dt;
			}

			if (player.tileX == goal.x && player.tileY == goal.y) {
				win = true;
			}

		}
		/********************************************************
		/*  CREATE THE MAZE
		/*******************************************************/
		// TODO: namespace map functions
		noise(Maze.map, 0, 0, 1000, 1000, [0, 1]);
		mazeify(Maze.map, 1000, 1000, 2, 5);

		Maze.astar = new EasyStar.js();
		Maze.astar.setGrid(Maze.map);
		Maze.astar.setAcceptableTiles([0, 1]);

		var goalOk = false;
		while (!goalOk) {
			Maze.goal = [random(Maze.player.tileX - 250, Maze.player.tileX + 250), 
						 random(Maze.player.tileY - 250, Maze.player.tileY - 250)];
			Maze.astar.findPath(Maze.player.tileX, Maze.player.tileY, Maze.goal[0], Maze.goal[1], function(path) {
			if (!path) {
				return;
			} else {
				goalOk = true;
				Maze.map[Maze.goal[0]][Maze.goal[1]] = 2;
			}
		});
		}
		

		

	},

	setGoal: function() {

	},


}

$(document).ready(function(){

	sqd = new Squid(document.getElementById('squid'), window.screen.width, window.screen.height);
	sqd.ctx.imageSmoothingEnabled = false;
	//sqd.ctx.scale(2, 2);
	
	sqd.resources = ['img/arrow.png', 'img/circle.png', 'img/light.png', 'img/spritesheet.png', 'img/ranger.png', 'img/warrior.png', 'img/grass.jpg'];
	var arrow = new SQUID.Entity(75, 75, 50, 50);
	arrow.center = {x: 25, y: 25};
	arrow.update = function(dt){
		this.rot = Math.atan2(goal.y - player.tileY, goal.x - player.tileX);
	};
	arrow.render = function(ctx){
		ctx.drawImage(Resources.get('img/arrow.png'), -this.w / 2, -this.h / 2);
	};
	var player = new SQUID.Entity(0, 0, 32, 32);
	player.tileX = 499;
	player.tileY = 499;
	player.lastMove = 0;
	player.idle = new SQUID.Animation("img/warrior.png", 0, 0, 32, 32, 10);
	player.walk = new SQUID.Animation("img/warrior.png", 0, 64, 32, 32, 10);
	player.attack = new SQUID.Animation("img/warrior.png", 0, 96, 32, 32, 10);
	//ranger.attack.loop = false;
	player.animation = player.idle;
	player.update = function(dt) {
		if (player.lastMove > 0.1) {
			player.x = 15 * 32;
			player.y = 10 * 32;
			if (Input.keys["ArrowRight"] && map[player.tileX + 1][player.tileY] !== 1) {
					player.tileX += 1;
			} else if (Input.keys["ArrowLeft"] && map[player.tileX - 1][player.tileY] !== 1) {
					player.tileX -= 1;
			} else if (Input.keys["ArrowDown"] && map[player.tileX][player.tileY + 1] !== 1) {
					player.tileY += 1;
			} else if (Input.keys["ArrowUp"] && map[player.tileX][player.tileY - 1] !== 1) {
					player.tileY -= 1;
			}
			player.lastMove = 0;
		} else {
			player.lastMove += dt;
		}

		if (Input.keys[" "]) {
			player.animation = player.attack;
		} else {
			player.animation = player.idle;
		}

		if (player.tileX == goal.x && player.tileY == goal.y) {
			console.log("you win bitch!");
			win = true;
		}
	};

	// player.render = function(ctx) {
	// 	ctx.fillStyle = '#ff0000';
	// 	ctx.fillRect(0, 0, 32, 32);
	// }

	var haze = new SQUID.Entity(0, 0, 31 * 32, 21 * 32);
	haze.render = function(ctx) {
		ctx.globalCompositeOperation = 'darken';
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 31 * 32, 160);
		ctx.fillRect(0, 160, 320, 352);
		ctx.fillRect(21 * 32, 160, 320, 352);
		ctx.fillRect(0, 16 * 32, 31 * 32, 160);
	}

	var light = new SQUID.Entity(320, 160, 352, 352);
	light.render = function(ctx) {
		ctx.drawImage(Resources.get('img/circle.png'), 0, 0, this.w, this.h);
		ctx.globalCompositeOperation = 'overlay';
		ctx.drawImage(Resources.get('img/light.png'), 0, 0, this.w, this.h);
	}



	var maze = new SQUID.Entity(0, 0, 0, 0);
	maze.render = function(ctx) {
		var xtiles = 31;
		var ytiles = 21;
		var ground = {x: 0, y: 14 * 32};
		var door = {x: 17 * 32, y: 15 * 32};
		var wall = {x: 40 * 32, y: 18 * 32};
		var startX = player.tileX - (Math.floor((xtiles - 1) / 2));
		var startY = player.tileY - (Math.floor((ytiles - 1) / 2));
		for (var y = 0; y < ytiles; y++) {
			for (var x = 0; x < xtiles; x++) {
				if (startX + x < 0 || startY + y < 0 || startX + x > map_config.w || startY + y > map_config.h) {
					ctx.fillStyle = '#000000';
					ctx.fillRect(x * 32, y * 32, 32, 32);
				} else if (map[startX + x][startY + y] == 1) {
					ctx.fillStyle = '#000000';
					ctx.fillRect(x * 32, y * 32, 32, 32);
					//ctx.drawImage(Resources.get('img/spritesheet.png'), wall.x, wall.y, 32, 32, x * 32, y * 32, 32, 32);
				} else if (map[startX + x][startY + y] == 0) {
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(x * 32, y * 32, 32, 32);
					//ctx.drawImage(Resources.get('img/spritesheet.png'), ground.x, ground.y, 32, 32, x * 32, y * 32, 32, 32);
				} else if (map[startX + x][startY + y] == 2) {
					ctx.fillStyle = '#0000ff';
					ctx.fillRect(x * 32, y * 32, 32, 32);
					//ctx.drawImage(Resources.get('img/spritesheet.png'), door.x, door.y, 32, 32, x * 32, y * 32, 32, 32);
				} else if (map[startX + x][startY + y] == 3) {
					ctx.fillStyle = '#ff0000';
					ctx.fillRect(x * 32, y * 32, 32, 32);
					//ctx.drawImage(Resources.get('img/spritesheet.png'), door.x, door.y, 32, 32, x * 32, y * 32, 32, 32);
				}

				
			}
		}
	};

	mazeify(map, 1000, 1000, 2, 5);
	map[player.tileX][player.tileY] = 0;
	walls(map, 0, 0, 1000, 1000, 1);
	var astar = new EasyStar.js();
	astar.setGrid(map);
	astar.setAcceptableTiles([0]);
	goal = {x: rand(player.tileX - 250, player.tileY + 250), y: rand(player.tileY - 250, player.tileY + 250)};
	map[goal.x][goal.y] = 2;
	astar.findPath(player.tileX, player.tileY, goal.x, goal.y, function(path){
		if (path) {
			console.log("goal: " + goal.x + ", " + goal.y);
			console.log(path);

			for (var i = 0; i < path.length; i++) {
				map[path[i].x][path[i].y] = 3;
				console.log (path[i].x + "," + path[i].y);
			}
			thePath = path;			
		}

	});
	astar.calculate();
	sqd.newLayer('maze');
	sqd.newLayer('player');
	sqd.layers.player.add(player);
	sqd.layers.maze.add(maze);
	sqd.newLayer('haze');
	//sqd.layers.haze.add(haze);
	//sqd.layers.haze.add(light);
	sqd.layers.haze.add(arrow);

	cons = new SQUID.Entity(10, 15, 800, 600);
	cons.update = function(dt) {
			if (win) {
				cons.msg = "You've escaped the dungeon!";
				clear(map, 0, 0, 1000, 1000, 0);

			} else if (debug) {
				cons.msg = "lastmove: " + player.lastMove.toFixed(5) + " pos:" + player.tileX + ", " + player.tileY;
			}
		};
	cons.render = function(ctx){
			ctx.font = '16px monospace';
			ctx.fillStyle = '#0F0';
			ctx.fillText(cons.msg, cons.x, cons.y);
			//console.log('drawing');
		};


	

	
	//sqd.layers.gui.add(ranger);

	label = new SQUID.Entity(0, 0, 1, 1);
	label.lifespan = 0.75;
	label.lifetime = 0;
	label.update = function(dt) {
		if (label.active) {
			if (this.lifetime > this.lifespan) {
				this.active = false;
				this.lifetime = 0;
				this.y = 0;
			} else {
				this.lifetime += dt;
				this.y -= 50 * dt;
			}
		}
	};

	label.render = function(ctx) {
		if (label.active) {
			ctx.font = "16px monospace";
			ctx.fillStyle = '#0F0';
			var alpha = 1 - (this.lifetime / this.lifespan);
			ctx.globalAlpha = (this.lifetime / this.lifespan > 1) ? 0 : alpha;
			ctx.fillText("x: " + Input.mouse.x + ", y: " + Input.mouse.y, Input.mouse.x - 50, Input.mouse.y - 10);
		}
	};
	sqd.newLayer('gui');

	sqd.layers.gui.add(label);
	sqd.background = '#000';
	sqd.layers.gui.add(cons);

	sqd.start();


});

	// ground = new SQUID.Entity(0, 0, 400, 400);
	// ground.render = function(ctx) {
	// 	for (var i = 0; i < Math.floor(sqd.height / this.h); i++) {
	// 		for (var j = 0; j < Math.floor(sqd.width / this.w); j++) {
	// 			ctx.drawImage(Resources.get("img/grass.jpg"), 0, 0, 400, 400, j * this.w, i * this.h, this.w, this.h);
	// 		}
	// 	}
	// }
	// sqd.layers.base.add(ground);
	// ranger = new SQUID.Entity(100, 100, 32, 32);
	// ranger.idle = new SQUID.Animation("img/warrior.png", 0, 0, 32, 32, 10);
	// ranger.walk = new SQUID.Animation("img/warrior.png", 0, 64, 32, 32, 10);
	// ranger.attack = new SQUID.Animation("img/warrior.png", 0, 96, 32, 32, 10);
	// //ranger.attack.loop = false;
	// ranger.animation = ranger.idle;
	// ranger.update = function(dt) {
	// 	if (this.direction == "left") {
	// 		this.animation.flipx = true;
	// 	} else {
	// 		this.animation.flipx = false;
	// 	}
	// 	if (Input.keys["ArrowRight"]) {
	// 		this.animation = ranger.walk;
	// 		this.x += 100 * dt;
	// 		this.direction = "right";
	// 	} else if (Input.keys["ArrowLeft"]) {
	// 		this.animation = ranger.walk;
	// 		this.x -= 100 * dt;
	// 		this.direction = "left";
	// 	} else if (Input.keys["ArrowDown"]) {
	// 		this.animation = ranger.walk;
	// 		this.y += 100 * dt;
	// 	} else if (Input.keys["ArrowUp"]) {
	// 		this.animation = ranger.walk;
	// 		this.y -= 100 * dt;
	// 	} else {
	// 		this.animation = ranger.idle;
	// 	}

	// 	if (Input.keys[" "]) {
	// 		this.animation = ranger.attack;
	// 	}

	// }

