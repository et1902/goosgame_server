module.exports = class Player {
    
    constructor(name,  id) {
        this.playerName = name;
        this.playerId = id;
        this.position = 0
        this.actionToDo = null;
        console.info("Created new Player:" + name + " with id: " + id)
    }

    isFree(){
        var isFree = false;
        if (this.actionToDo == null) {
            isFree = true;
        } else if (this.actionToDo.skipTurns != 0) {
            isFree = false;
        }
        return isFree;
    }

    clearAction() {
        this.actionToDo = null;
    }

    setAction(action) {
        this.actionToDo = action;
    }

    getAction() {
        return this.actionToDo;
    }

    move(amount) {
        this.position += amount;
    }



}
//exports.Player = Player