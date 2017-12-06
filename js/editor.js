/**************************************************************************
* 
* layout editor server
*
**************************************************************************/


var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fm = require('./Classes/FileManager.js');
var bodyParser = require('body-parser');

var DEBUG = true;

//	serve editor app files
app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.get('/editor', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

http.listen(3000, function() {
	console.log('listening on *:3000...');
});

var gameData = {};

fm.load('item_data', function(error, data){
	console.log(data);
	gameData.item_data = data;
});

fm.load('map', function(error, data){
	console.log(data);
	gameData.map = data;
});



app.get('/load', function(req, res) {
	res.send(JSON.stringify(gameData));
	console.log('Sent game data to editor client.');
});

//	save objects
app.post('/savesprites', function(req, res) {

	console.log(req.body);
	fm.save(req.body, 'item_data');
	res.send('Sprite data saved.');

});

//  save map
app.post('/savemap', function(req, res){

	console.log(req.body);
	fm.save(req.body, 'map');
	res.send('Map saved.');

});

