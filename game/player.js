module.exports = class Player {
    
    constructor(name,  id) {
        this.playerName = name;
        this.playerId = id;
        console.info("Created new Player:" + name + " with id: " + id)
    }

    throwDice()
	{
		var dice = 1 + Math.floor(Math.random()*6);
		this.postion += dice;
	}
}
//exports.Player = Player