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

	socket.on("CreateGame", function(data, callback) {
		var game = createGame();

		db.get('games').push( game ).write();

		var responseData = game.gameId;

		callback( responseData );
	});

	socket.on('JoinGame', function(data, callback) {
		console.log('Recieved JoinGame');
		try {
		var ID = data.gameID;
		var name = data.playername;
		}
		catch (e)
		{
			console.log('Exception thrown: ' + e.message);
			callback( e.message );
		}

		var player = createPlayer(name, socket.id);
		var game = addPlayerToGame(player, ID, socket);
		callback( game );
	});



	/*
	socket.on("JoinGame", (playername, gameId) => {
		socket.emit('Log', db.get('games').find({gameId: gameId}));
		if((playername == null)||(playername == "")) {
			socket.emit('MissingNameField', playername);
			return null;
		} else if((gameId == null)||(gameId == "")) {
			socket.emit('MissingIdField', gameId);
			return null;
		} else if(db.get('games').find({gameId: gameId}) == null) {
			//Todo fix
			socket.emit('MissingIdField', (gameId, 'Game not found!'));
			return null;
		}

		var player = createPlayer(playername, socket.id);
		addPlayerToGame(player, gameId, socket);
		
		socket.emit('Log', "Player " + playername + " joind game " + gameId);
		socket.emit( 'Info', db.get('games').find({gameId: gameId}).value());
	});*/
	
});

Http.listen( 3000, () => {	
	console.log("Listening at Port 3000");
});

function addPlayerToGame(player, gameId, socket) {
	//TODO check if player name already in use?
	var players = db.get('games').find({gameId: gameId}).get('players')

	db.get('games').find({gameId: gameId}).get('players').push(player).write();
	socket.join( gameId );
	return db.get('games').find({gameId: gameId}).value();
}

function createGame() {
	var game = new Game( shortid.generate() );
	db.get('games').push( game ).write();
	return game;
}

function createPlayer(playername,id ) {
	//Use socketId as the player id
	return new Player( playername, id );
}