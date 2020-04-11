const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid');

const gameBoard = require('./gameboard.js');

module.exports = class game{
	
	constructor( id ) {
		this.gameID= id;
		this.players = [];
		this.activeplayer = 0;
		this.created = new Date();
		this.gameBoard = new gameBoard(69);
		this.createdBy;
		this.stateMode = {
			open: 1,
			started: 5,
			finished: 10
		  };
		this.state = this.stateMode.open;
	}

	//////////////////////////////////////////////////////
	/*				object helper methods				*/
	//////////////////////////////////////////////////////

	static new()
	{
		var game = new this( shortid.generate() );
		db.get('games').push( game ).write();
		console.info("Created new Game with ID: " + game.gameID);
		return game;
	}

	static getFromDb( gameID )
	{
		var game = db.get('games').find({gameID: gameID}).value();

		var rv = new this( game.gameID );
		rv.players = game.players;
		rv.activeplayer = game.activeplayer;
		rv.created = game.created;
		rv.gameBoard = game.gameBoard;
		console.log('Fetched new game object of ' + rv.gameID + ' from database');

		return rv;
	} 

	saveToDb()
	{
		db.get('games').find({gameID: this.gameID}).assign( this ).write();
		console.log('Saved game ' + this.gameID +' to database')
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

	addPlayer( player ) {
		if( this.state == this.stateMode.open)
		{
			if( db.get('games').find({gameID: this.gameID}).get('players').find({playerID: player.playerID}).value() )
			{
				console.log('Player already joined game!')
				return "Player already joined game!";
			
			}
			this.players = [player];
			this.saveToDb();
			return this;
		}
		console.log('Game already started! No join possible!');
		return 'Game already started! No join possible!';
	}

	getActivePlayer() {
		return this.players[this.activeplayer]
	}
	

}