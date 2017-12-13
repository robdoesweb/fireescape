

$('#edit').click(function(e){
	app.mode = "EDITOR";
	$('#status').html("Edit Mode");
	console.log("changed to edit mode");
});

$('#user').click(function(e){
	app.mode = "USER";
	$('#status').html("User Mode");
	console.log("changed to user mode");
});

$('#update').click(function(e){
	console.log("clicked update");
	app.update();
});