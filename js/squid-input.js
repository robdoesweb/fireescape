Input = {
	keys: {},

	mouse: {},

	clickHandlers: [],

	onClick: function(callback) {
		Input.clickHandlers.push(callback);
	}

}

document.addEventListener('keydown', function(e){
	e.preventDefault();
	Input.keys[e.key] = true;
});

document.addEventListener('keyup', function(e){
	e.preventDefault();
	Input.keys[e.key] = false;
});

var rect = document.getElementById('squid').getBoundingClientRect();

document.addEventListener('mousemove', function(e){	
	Input.mouse.x = e.clientX - rect.left;
	Input.mouse.y = e.clientY - rect.top;
});

document.addEventListener('click', function(e){
	for (var i = 0; i < Input.clickHandlers.length; i++) {
		Input.clickHandlers[i]();
	}
});

// 	$(document).bind("tap", tapHandle);

// var tapHandle = function(e) {
// 	console.log(tapHandle);
// }