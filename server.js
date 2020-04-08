const Express = require('express')();
const Http = require('http').Server(Express);
const Websocket = require('socket.io')(Http);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid');

db.defaults({ games: [], players: [], count: 0 })
  .write()

const Player = require('./game/player.js');
const Game = require('./game/game.js');


Websocket.on("connect", socket => {
	console.log("Websocket Event: Player connected!")
});

Websocket.on("disconnect", socket => {
	console.log("Websocket Event: Player disconnected!")
});

Websocket.on("connection", socket => {

	socket.on("CreateGame", () => {
		var game = new Game( shortid.generate() );
		db.get('games').push( game ).write();

		socket.emit('GameCreated', game );
	});

	
	socket.on("JoinGame", (playername, gameId) => {

		var player = new Player( playername, socket.id  );

		db.get('games').find({gameId: gameId}).get('players').push(player).write();

		socket.join( gameId );
		socket.emit( 'Info', db.get('games').find({gameId: gameId}).value() );
	});
	
});

Http.listen( 3000, () => {	
	console.log("Listening at Port 3000");
});