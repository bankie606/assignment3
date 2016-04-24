var express = require("express");
var app = express();
// JavaScript Array
var synths = [
    {id: 0, name: 'korg',model:'Poly-800', have: true, price: 250.00},
    {id: 1, name: 'nord',model:'Micro-Modular',have: true, price: 400.00},
    {id: 2, name: 'elektron',model:'Monomachine',have: true, price: 500.00},
    {id: 3, name: 'ensoniq',model:'Fizmo',have: true, price: 1500.00},
    {id: 4, name: 'moog',model:'Memory Moog',have: true, price: 2500.00},
    {id: 5, name: 'buchla',model:'Who In Their Right Mind Would Buy This?',have: false,  price: 6500.00},
    ];
    
    
exports.getSynth = function() {
    var idx = Math.floor(Math.random() * synths.length);
    return synths[idx];
};


//search function
app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.search_term.toLowerCase()+ '<br>';
    var found = synths.find(function(item) {
       return item.name == req.body.search_term.toLowerCase();
    });
    var synthmodel = found.model + ' ';
    
    var dohave = found.have + ' ';
    
    if (found) {
        res.send(header + "Do we have this item in stock? " + dohave + '<br>' + synthmodel + "Price: " + found.price);
    } else {
        res.send(header + "No such synth exists in our inventory.");
    }});
    
    
//add item to database
app.post('/add', function(req,res){
    res.type('text/html');
    synths.push(req.add_term); 
    document.getElementById("sortresults").innerHTML = synths;
});
    

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


app.post('/search', function(req, res)
{
    var data = "";

    // For each value in the array
    for (var i = 0; i < synths.length; i++) 
    {
         // Add it to the data string (each record will be separated by a space)
         data += synths[i] + ' ';
    }

    document.getElementById("sortresults").innerHTML += "Data: " + data;
});
