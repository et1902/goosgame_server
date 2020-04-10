const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

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
	}

	getActivePlayer() {
		return this.players[this.activeplayer]
	}
	
	static getFromDb( gameID)
	{
		return db.get('games').find({gameID: gameID}).value();
	} 

	saveToDb()
	{
		db.get('games').find({gameId: this.gameId}).assign( this ).write();
	}
}