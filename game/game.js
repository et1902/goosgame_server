const Board = require('./board.js');

module.exports = class game{
	constructor( id ) {
		this.gameId = id;
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
	}
}