module.exports = class Player {
    
    constructor(name,  id) {
        this.playerName = name;
        this.playerId = id;
        this.position = 0
        console.info("Created new Player:" + name + " with id: " + id)
    }

}
//exports.Player = Player