const Express = require('express')();
const Http = require('http').Server(Express);
const Websocket = require('socket.io')(Http);
//const Player = require('./game/player.js')

class Player {
    constructor(name, id) {
        this.playerName = name;
		this.playerId = id;
		this.position = 0;
	}

	throwDice()
	{
		var dice = 1 + Math.floor(Math.random()*6);
		this.postion += dice;
	}
}

class Game {
	constructor( id ) {
		this.gameId = id;
		this.players = [];
		this.activeplayer;
	}

	next()
	{
		if( activeplayer == this.players.length() )
		{
			activeplayer = 0;
		}
		else
		{
			++activeplayer;
		}

		this.players[activeplayer].throwDice();
	}
}

var gamelist = [];


Websocket.on("connect", socket => {
	console.log("Websocket Event: Player connected!")
});

Websocket.on("disconnect", socket => {
	console.log("Websocket Event: Player disconnected!")
});

Websocket.on("connection", socket => {
	console.log("Websocket Event:")

	socket.on("createGame", (gameId) => {
		var game = new Game( gameId );
		gamelist.push(game);
		socket.emit( 'game', game );
		console.log("Game created!");
		console.log(gamelist);
	});
	
	socket.on("joinGame", (playername, gameId) => {
		var game;
		for (let i of gamelist)
		{
			if( i.gameId == gameId)
			{
				game = i;
				break;
			}
		}
		var player = new Player( playername, socket.id  );
		game.players.push( player );
		console.log(" Player joined Game!")
		//var id = socket.id;
		socket.join( gameId );
		socket.emit( 'player', game );
		console.log(gamelist);
	});
	
	Websocket.on("leaveGame", () => {
		console.log(" Player leaved Game!")
	});
});

Http.listen( 3000, () => {	
	console.log("Listening at Port 3000");
});