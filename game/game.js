module.exports = class game{
	constructor( id ) {
		this.gameId = id;
		this.players = [];
		this.activeplayer;
		this.created = new Date();
		console.info("Created new Game with id: " + id)
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