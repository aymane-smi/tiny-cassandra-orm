let {ORM} = require("./orm");
let instance = null;
//using singleton design pattern
class Example extends ORM{
    constructor(){
        if(instance !== null)
            instance = this;
        else
            super(["localhost"], "datacenter1", "audit_tool", "table");
    }
}

const ExampleInstance = Object.freeze(new Example());

module.exports = ExampleInstance;