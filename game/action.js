module.exports = class Action{
/**
 * 
 * @param waitForPlayersToPass skip turns until he is last (true/false)
 * @param move number of fields the player will move (+ forwards, - backwards, 0 stay)
 * @param reroll can roll again? (true/false)
 * @param skipTurns Number of turns the player has to skip
 */

    constructor(waitForPlayersToPass, move, reroll, skipTurns) {
        this.waitForPlayersToPass = waitForPlayersToPass;
        this.playermovement = move;
        this.reroll = reroll;
        this.skipTurns = skipTurns;
    }

    getDoNothingAction(){
        return new this(false, 0, false, 0);
    }


}