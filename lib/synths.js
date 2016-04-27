
// JavaScript Array
var synths = [
    {id: 0, name: 'korg',model:'Poly-800', price: 250.00},
    {id: 1, name: 'nord',model:'Micro-Modular', price: 400.00},
    {id: 2, name: 'elektron',model:'Monomachine', price: 500.00},
    {id: 3, name: 'ensoniq',model:'Fizmo', price: 1500.00},
    {id: 4, name: 'moog',model:'Memory Moog', price: 2500.00},
    {id: 5, name: 'buchla',model:'Who In Their Right Mind Would Buy This?', price: 6500.00},
    ];
    
//Sends out Search Results back to Index    
exports.getSynth = function(synthName) {
    
    return synths.find(function(item) {
       return item.name == synthName;
    });

};

//Sends out Search Results back to Index
exports.addSynth = function(synth) {
    var found = false;
    synths.forEach(function(item,index){
        if (item.name == synth.name) {
            item = synth;
            found = true;
        }        
    });
    if (!found) {
        synths.push(synth);
    }
    return {"added": !found, "total": synths.length };
};

exports.deleteSynth = function(name) {
    var deleted = false;
    console.log(name)
    synths.forEach(function(item,index){
        if (item.name == name) {
            console.log(item)
            synths.splice(index, 1);
            deleted = true;
        }        
    });
    return { "deleted": deleted, total: synths.length };
}
    

var byPrice = function(synths0, synths5) {

 // sorts synths by price in ascending order

 return synths0.price - synths5.price;

};

console.log(synths.sort(byPrice));

// find cheap synths
var cheap = function findCheap(synths) {

return synths.price < 1000;

};

console.log(synths.find(cheap));

