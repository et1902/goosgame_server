const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid');

const GameBoard = require('./gameboard.js');
const Action = require('./action.js');

module.exports = class game{
	
	constructor( id ) {
		this.gameID= id;
		this.players = [];
		this.activeplayer = 0;
		this.created = new Date();
		this.gameBoard = new GameBoard(69);
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

	/**
	 * Main function for playing
	 */
	nextTurn(){
		this.nextPlayer()
		if(this.getActivePlayer().canMove()) {
			var movement = this.throwDice();
			this.movePlayer(movement);
			this.performActions();
		}
	}


	nextPlayer()
	{
		if( this.activeplayer == this.players.length ) {
			activeplayer = 0;
		} else {
			++activeplayer;
		}
		saveToDb();
	}

	performActions(){
		var activePlayer = this.getActivePlayer();
		var action = activePlayer.getAction();

		if(action.waitForPlayersToPass && !isLast() ){
			//Do Nothng
			//activePlayer.setAction(new Action(true, 0, false, 0));
			return;
		}else if(action.playermovement != 0) {
			//Move player position
			activePlayer.move(action.playermovement);
		}else if(action.reroll == true) {
			//Clear action, throw dice, move player and start over
			activePlayer.clearAction();
			var movement = this.throwDice();
			this.movePlayer(movement);
			//recursion if you keep hitting action fields
			//Do we need to save to DB here?!
			this.performActions();
			console.info("You did a reroll! Trust me, i'm a console!")
		} else if (action.skipTurns != 0) {
			activePlayer.getAction().turnWaited();
			return;
		}
		activePlayer.clearAction();
		saveToDb();	
	}

	movePlayer(amount){
		this.getActivePlayer().move(amount);
		//gives the action of the new field to the player
		var action = gameBoard.getFieldAt(this.getActivePlayer().position).getAction();
		this.getActivePlayer().setAction(action);
	}


	isPlayerLast(theGuy) {
		var isLast = true;
		players.array.forEach(element => {
			if(element.position < theGuy.position) {
				isLast = false;
			}
		});
		return isLast;
	}

	throwDice(){
		var dice = 1 + Math.floor(Math.random()*6);
		return dice;
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


  	/**
 	 * Returns the activePlayer Object
 	 */	
	 getActivePlayer() {
		return this.players[this.activeplayer]
	}

}