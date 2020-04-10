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
		rv.gameBoard = game.gameBoard;

		return rv;
	} 

	saveToDb()
	{
		db.get('games').find({gameId: this.gameId}).assign( this ).write();
	}

	//////////////////////////////////////////////////////
	/*				game helper methods					*/
	//////////////////////////////////////////////////////

	/**
	 * Main function for playing
	 */
	nextTurn(){
		this.nextPlayer()
		if(!this.getActivePlayer().isFree()) {
			return
		}
		var movement = this.throwDice();
		this.movePlayer(movement);
		this.performActions();
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
		}else if(action.playermovement != 0) {
			activePlayer.move(action.playermovement);
			activePlayer.clearAction();

		}else if(action.reroll == true) {
			//Do reroll i guess??????
			console.info("You did a reroll! Trust me, i am a console!")
			activePlayer.clearAction();
		} else if (action.skipTurns != 0) {
			activePlayer.setAction(new Action(false, 0, false, skipTurns - 1));
		}
		saveToDb();	
	}

	movePlayer(amount){
		this.getActivePlayer().move(amount);
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

	throwDice()
	{
		var dice = 1 + Math.floor(Math.random()*6);
		return dice;
	}

	addPlayer(player) {
		this.players.push(player);
		this.saveToDb();

		return this;
	}


  	/**
 	 * Returns the activePlayer Object
 	 */	
	 getActivePlayer() {
		return this.players[this.activeplayer]
	}

}