Input = {
	keys: {},

	mouse: {},

	clickHandlers: [],

	onClick: function(callback) {
		Input.clickHandlers.push(callback);
	},

	scroll: 0

}

var squid = document.getElementById('squid');

document.addEventListener('keydown', function(e){
	//e.preventDefault();
	Input.keys[e.key] = true;
	console.log("Detected key " + e.key);
});

document.addEventListener('keyup', function(e){
	//e.preventDefault();
	Input.keys[e.key] = false;
	if (e.key == "+") {
		config.tileSize += 2;
	} else if (e.key == "-") {
		config.tileSize -= 2;
	}
});

// get canvas dimensions and position
var rect = document.getElementById('squid').getBoundingClientRect();
squid.addEventListener('mousemove', function(e){	
	// update rect first in case scroll or window resize occured
	rect = document.getElementById('squid').getBoundingClientRect();
	Input.mouse.x = e.clientX - rect.left;
	Input.mouse.y = e.clientY - rect.top;
});

// var once = false;
// $('#squid').mousemove(function(e){
// 	Input.mouse.x = e.clientX;
// 	Input.mouse.y = e.clientY;
// 	if (!once) {
// 		console.log(e);
// 		once = true;
// 	}
	
// });

squid.addEventListener('mousedown', function(e){
	Input.mouse.down = true;
});

squid.addEventListener('mouseup', function(e){
	Input.mouse.down = false;
});


squid.addEventListener('click', function(e){
	for (var i = 0; i < Input.clickHandlers.length; i++) {
		Input.clickHandlers[i]();
	}
});

var lastSt = window.pageYOffset || document.documentElement.scrollTop;
$(document).scroll(function(e){
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastSt) {
		Input.scroll = 1;
	} else {
		Input.scroll = -1;
	}
});

// 	$(document).bind("tap", tapHandle);

// var tapHandle = function(e) {
// 	console.log(tapHandle);
// }