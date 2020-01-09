var jwt = require('jsonwebtoken');
var config = require('./authconfig');

function authenticate(req,res) {

    var name = req.body.name;
    var pass = req.body.password;

    //Todo: obtener usuario de repositorio

    if(false){
        res.json({ success: false, message: 'Error de autenticacion. Usuario no encontrado.' });
    } else {

        //Todo: comprobar password
        if(false)
        {
            res.json({ success: false, message: 'Error de autenticacion. Password incorrecto.' });
        } else {

            const payload = {
                admin: true,
                user: "Usuario"
            };

            var token = jwt.sign(payload, config.secret, { 
                expiresIn: 1440 //24 horas
            });

            res.json({
                success: true,
                message: 'Token valido',
                token: token
            });
        }

    }
}

function verifyToken(req, res, next){

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){

        jwt.verify(token,config.secret, function(err,decoded){

            if(err){
                return res.json({success: false, message: 'Error autenticando token'});
            }else{
                req.decoded = decoded;
                next();
            }

        });
    } else {

        return res.status(403).send({
            success: false,
            message: 'No hay ningun token'
        });
    }
}

module.exports.authenticate = authenticate;
module.exports.verifyToken = verifyToken;