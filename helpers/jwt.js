const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {//recibo los payload del usuario

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };//creamos el payload

        //estoy formado el token envio el payload y el firma
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //estas son opciones
            expiresIn: '2h'//expira en 2 horas
        }, (err, token ) => {//si hay un error envia el error y envia el token si sale todo vien

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );//si se hace correactamente se resuelve el token

        })


    })
}



module.exports = {
    generarJWT
}


