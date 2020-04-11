module.exports = class GameBoardField{
    constructor(pos) {
        this.position = pos;
        this.description;
        this.action;
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