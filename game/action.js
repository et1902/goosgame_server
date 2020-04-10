module.exports = class Action{
/**
 * 
 * @param waitForPlayersToPass skip turns until he is last (true/false)
 * @param move number of fields the player will move (+ forwards, - backwards, 0 stay)
 * @param reroll can roll again? (true/false)
 */

    constructor(waitForPlayersToPass, move, reroll) {
        this.waitForPlayersToPass = waitForPlayersToPass;
        this.playermovement = move;
        this.reroll = reroll;
    }


}