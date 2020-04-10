const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid');

const Board = require('./board.js');

module.exports = class game{
	constructor( id ) {
		this.gameID= id;
		this.players = [];
		this.activeplayer = 0;
		this.created = new Date();
		this.board = new Board(69);
		console.info("Created new Game with id: " + id);
	}

	//////////////////////////////////////////////////////
	/*				object helper methods				*/
	//////////////////////////////////////////////////////

	static new()
	{
		var game = new this( shortid.generate() );
		db.get('games').push( game ).write();
		return game;
	}

	static getFromDb( gameID)
	{
		var game;
		if(! db.get('games').has(gameID).value()) {
			game = new this(gameID);
			console.info('Created new game. Given gameId could not be found:' + gameID);
		} else {
			game = db.get('games').find({gameID: gameID}).value();
		}

		var rv = new this( game.gameID );
		rv.players = game.players;
		rv.activeplayer = game.activeplayer;
		rv.created = game.created;
		rv.board = game.board;

		return rv;
	} 

	saveToDb()
	{
		db.get('games').find({gameId: this.gameId}).assign( this ).write();
	}

	//////////////////////////////////////////////////////
	/*				game helper methods					*/
	//////////////////////////////////////////////////////

	next()
	{
		if( this.activeplayer == this.players.length )
		{
			activeplayer = 0;
		}
		else
		{
			++activeplayer;
		}

		throwDice();
	}

	throwDice()
	{
		var dice = 1 + Math.floor(Math.random()*6);
		this.players[activeplayer].postion += dice;
		console.info("Player " + thisplayers[activeplayer].playerName + " roled a " + dice + "and moved to field " + this.players[activeplayer].postion)
	}

	addPlayer(player) {
		this.players.push(player);
		this.saveToDb();

		return this;
	}

	getActivePlayer() {
		return this.players[this.activeplayer]
	}
	

}