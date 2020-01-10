var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var morgan = require('morgan'); 

var authentication = require('./Auth/authentication');
var blog = require('./blog');

var port = process.env.port || 8000; //Puerto escucha

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

//ruta basica
app.get('/',function(req,res){
    res.send('Api funcionando');
});

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//rutas api
var apiRoutes = express.Router();

apiRoutes.post('/authenticate',authentication.authenticate); //Ruta autenticacion

//apiRoutes.use(authentication.verifyToken); //middleware verificacion token

apiRoutes.get('/blog/entradas', blog.getEntradas);
apiRoutes.get('/blog/entrada/:id', blog.getEntrada);
apiRoutes.post('/blog/entrada', blog.insertEntrada);

app.use('/api', apiRoutes);

//Iniciamos servidor
app.listen(port);
console.log('Servidor iniciado en puerto ' + port);



