const Express = require('express')();
const Http = require('http').Server(Express);
const Websocket = require('socket.io')(Http);

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ games: [] }).write()

const shortid = require('shortid');

const Player = require('./game/player.js');
const Game = require('./game/game.js');


Websocket.on("connect", socket => {
	console.log("Websocket Event: Player connected!")
});

Websocket.on("connection", socket => {

	socket.on('GenID', function(data, callback) {
		callback( shortid.generate() );
	});

	socket.on("CreateGame", function(data, callback) {
		callback(  Game.new().gameID );
	});

	socket.on('JoinGame', function(data, callback) {
		console.log('Recieved JoinGame');
		try {
			var gameID = data.gameID;
			var name = data.playername;		

			var game = Game.getFromDb( gameID );
			game.addPlayer( createPlayer(name, socket.id) );
		
			callback( game );
		}
		catch (e)
		{
			console.log('Exception thrown: ' + e.message);
			callback( e.message );
		}
	});

	socket.on('StartGame', function(data, callback) {
		callback();
	});

	socket.on('ThrowDice', function(data, callback) {
		var playerID = socket.id;

		var rv= 1;
		console.log('Throwing dice for player ' + playerID);

		callback( rv );
	});

	socket.on('NextPlayer', function(data, callback) {
		
		callback();
	});

	socket.on('LeaveGame', function(data, callback) {

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

	socket.join( gameId );
	return db.get('games').find({gameId: gameId}).value();
}

function createGame() {
	var game = new Game( shortid.generate() );
	game.saveToDb();
	return game;
}

function createPlayer(playername,id ) {
	//Use socketId as the player id
	return new Player( playername, id );
}