var state = {
	mode: "Edit Mode",
	tool: "Drawing",
	tile: "Wall",
	timeToExit: "",


	getStatus: function() {
		state.mode = app.mode + " MODE";
		state.tool = app.selectedTool;
		state.tile = blocks.getBlockName(app.tool.tileType);
		if (app.mode == "EDITOR") 
			return state.mode + " - " + state.tool + " - " + state.tile;
		if (app.mode == "USER")
			return state.timeToExit;
	},

	update: function() {
		$('#status').html(state.getStatus());
	}
};

$('#edit').click(function(e){
	app.mode = "EDITOR";
	$('#options').hide();
	$('#status').html(state.getStatus());
	$('#tools').show();
	console.log("changed to edit mode");
});

$('#user').click(function(e){
	app.mode = "USER";
	$('#tools').hide();
	app.update();
	$('#status').html(state.getStatus());
	$('#options').show();
	console.log("changed to user mode");
});

$('#update').click(function(e){
	console.log("clicked update");
	app.update();
});

$('#options').hide();

$("#draw").click(function(e){
	app.selectedTool = "drawing";
});

$("#room").click(function(e){
	app.selectedTool = "room";
});

$("#clear").click(function(e){
	app.tool.tileType = blocks.CLEAR;
});

$("#wall").click(function(e){
	app.tool.tileType = blocks.WALL;
});

$("#door").click(function(e){
	app.tool.tileType = blocks.DOOR;
});

$("#window").click(function(e){
	app.tool.tileType = blocks.WINDOW;
});

$("#obstacle").click(function(e){
	app.tool.tileType = blocks.OBSTACLE;
});

$("#hazard").click(function(e){
	app.tool.tileType = blocks.HAZARD;
});

$("#exit").click(function(e){
	app.tool.tileType = blocks.EXIT;
});

$("#user-hazard").click(function(e){
	app.selectedTool = "hazard";
});

$("#changepos").click(function(e){
	app.selectedTool = "position";
});