var synth = require('./lib/synths.js');
var express = require("express");
var app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));


//routes
app.get('/', function(req,res){
    res.type('text/html');
    res.sendfile('./public/home.html', {synth: synth.getSynth()});
});

app.get('/contact', function(req,res){
    res.type('text/html');
    res.sendfile('./public/contact.html');
});

//search function
app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.search_term.toLowerCase()+ '<br>';
    var found = synth.getSynth( req.body.search_term.toLowerCase());
    
    
    var synthmodel = found.model + ' ';
    
    if (found) {
        res.send(header + synthmodel + "Price: " + found.price);
    } else {
        res.send(header + "No such synth exists in our inventory.");
    }});
    
      
//add item to array
app.post('/add', function(req,res){
    res.type('text/html');
    var newSynth = {"name":req.body.add_name,"model":req.body.model, "price":req.body.price}
    var result = synth.addSynth(req.body.add_name);
    if (result.added) {
        res.send("Added: " + req.body.add_name +" " + req.body.model + "<br>New total = " + result.total);
    } else {
        res.send("Updated: " + req.body.add_name);
    }
});
    
//delete item from array
app.post('/delete', function(req,res){
    res.type('text/html');
    var result = synth.deleteSynth(req.body.add_name);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.add_name + '<br>New total = ' + result.total);
    } else {
        res.send(req.body.add_name + " not found");
    }
});

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});

