var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var morgan = require('morgan'); 

var port = process.env.port || 8000; //Puerto escucha

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

//rutas
app.get('/',function(req,res){
    res.send('Api funcionando');
});


//Iniciamos servidor
app.listen(port);
console.log('Servidor iniciado en puerto ' + port);



