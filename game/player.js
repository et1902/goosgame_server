module.exports = class Player {
    
    constructor(name,  id) {
        this.playerName = name;
        this.playerId = id;
        this.position = 0
        this.actionToDo = null;
        console.info("Created new Player:" + name + " with id: " + id)
    }

    isFree(){
        return (this.actionToDo == null)
    }

    setAction(action) {
        if (this.isFree()) {
            this.actionToDo = action;
        } else {
            console.error("Player isnt free! Do your action first")
        }
    }

    getAction() {
        return this.actionToDo;
    }



}
//exports.Player = Player