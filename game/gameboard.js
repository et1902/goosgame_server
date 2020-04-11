const GameBoardField = require('./gameboardfield.js');

module.exports = class gameBoard{
    constructor(size) {
        this.fields = this.generateFields(size);
    }

    generateFields(size){
        var fields = [];
        for (let i = 0; i < size; i++) {
            var element = new GameBoardField(i);
            fields.push(element);
        }
        return fields;
    }

    getFieldAt(index){
        if (index < this.fields.length){
            return this.fields[index];
        }
    }
}