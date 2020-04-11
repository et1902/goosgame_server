module.exports = class Action{
/**
 * 
 * @param waitForPlayersToPass skip turns until he is last (true/false)
 * @param move number of fields the player will move (+ forwards, - backwards, 0 stay)
 * @param reroll can roll again? (true/false)
 * @param skipTurns Number of turns the player has to skip
 */

    constructor(wait, move, reroll, skipTurns) {
        this.waitForPlayersToPass = wait;
        this.playermovement = move;
        this.reroll = reroll;
        this.skipTurns = skipTurns;
    }

    getDoNothingAction(){
        return new this(false, 0, false, 0);
    }

    turnWaited() {
        skipTurns -= 1;
    }

    equalsAction(other){
        var eqWait = (other.waitForPlayersToPass == this.waitForPlayersToPass);
        var eqMove = (other.playermovement == this.playermovement);
        var eqRoll = (other.reroll == this.reroll);
        var eqSkip = (other.skipTurns == this.skipTurns);
        return eqWait && eqMove && eqRoll && eqSkip;
    }

    isNothinAction(){
        return this.equalsAction(this.getDoNothingAction());
    }

}