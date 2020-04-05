const Express = require('express')();
const Http = require('http').Server(Express);
const Websocket = require('socket.io')(Http);
const Player = require('./game/player.js')

var game ={
	players: [],
	activeplayer: 1,
}

Websocket.on("connect", (playername) => {
	console.log("Websocket Event: Player connected!");
	var player = new Player( playername );
	socket.emit( player );
});

Websocket.on("disconnect", socket => {
	console.log("Websocket Event: Player disconnected!")
});

Websocket.on("createGame", socket => {
	console.log("Websocket Event: Game created!")
});

Websocket.on("joinGame", socket => {
	console.log("Websocket Event: Player joined Game!")
	socket.join( gameId );
});

Websocket.on("leaveGame", socket => {
	console.log("Websocket Event: Player leaved Game!")
});

Http.listen( 3000, () => {	
	console.log("Listening at Port 3000");
});