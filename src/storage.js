var fs = require('fs');
export function saveState(state){
    fs.writeFileSync("state.json", JSON.stringify(state), function(err) {
        if (err) {
            console.log(err);
        }
    });

}

export function loadState(def){
    var state
    if(!fs.existsSync("state.json")){
        console.log("state.json does not exist, creating");
        fs.writeFileSync("state.json",JSON.stringify(def));
        return def;
    }
    try{
        state = JSON.parse(fs.readFileSync("state.json"));
    } catch(err){
        console.log(err);
        return def
    }
   
    
    return state;
}