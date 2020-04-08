const Board = require('./board.js');

module.exports = class game{
	constructor( id ) {
		this.gameId = id;
		this.players = [];
		this.activeplayer;
		this.created = new Date();
		this.board = new Board(69);
		console.info("Created new Game with id: " + id);
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