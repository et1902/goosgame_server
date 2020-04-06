const Express = require('express')();
const Http = require('http').Server(Express);
const Websocket = require('socket.io')(Http);
//const Player = require('./game/player.js')

class Player {
    
    constructor(name, id) {
        this.playerName = name;
        this.playerId = id;
    }
}


Websocket.on("connect", socket => {
	console.log("Websocket Event: Player connected!")
});

Websocket.on("disconnect", socket => {
	console.log("Websocket Event: Player disconnected!")
});

Websocket.on("connection", socket => {
	console.log("Websocket Event:")

	socket.on("createGame", () => {
		console.log("Game created!")
	});
	
	socket.on("joinGame", (playername, gameId) => {
		console.log(" Player joined Game!")
		socket.join( gameId );
		var player = new Player( playername. socket. );
		socket.emit( 'player', player );
	});
	
	Websocket.on("leaveGame", () => {
		console.log(" Player leaved Game!")
	});
});

Http.listen( 3000, () => {	
	console.log("Listening at Port 3000");
});