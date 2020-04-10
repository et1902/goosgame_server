const Action = require('./action.js');

module.exports = class Player {
    
    constructor(name,  id) {
        this.playerName = name;
        this.playerId = id;
        this.position = 0;
        this.actionToDo = new Action(false, 0, false, 0);
        console.info("Created new Player:" + name + " with id: " + id);
    }

    canMove(){
        var can = false;
        if (this.actionToDo == null) {
            //no action: can always move            
            can = true;
        } else if (this.actionToDo.isNothinAction()) {
            //dosn't need to skip turns, nor needs to wait for players
            can = true;
        }
        return can;
    }

    clearAction() {
        //basically the getDoNothingAction();
        this.actionToDo = new Action(false, 0, false, 0);
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