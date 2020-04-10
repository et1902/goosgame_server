module.exports = class GameBoardField{
    constructor(pos) {
        this.position = pos;
        this.description;
        this.action;

        console.log("Created new boardField with total Fileds: " + this.numberOfFields);
    }

    setDescription(desc) {
        this.description = desc;
    }

    setAction(ac) {
        this.action = ac;
    }

    getAction() {
        return this.action;
    }

    getPosition() {
        return this.position;
    }
    
}