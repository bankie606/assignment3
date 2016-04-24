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
    res.render('home', {synth: synth.getSynth()});
    res.sendfile('./public/home.html');
});

app.get('/contact', function(req,res){
    res.type('text/html');
    res.sendfile('./public/contact.html');
});






app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});


