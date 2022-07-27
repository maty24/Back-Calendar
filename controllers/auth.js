const {response} = require('express');
const bycrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) =>{
    const {email, password} = req.body;
    try {

        let usuario = await Usuario.findOne({email});//gurada el email enviado por post

        if(usuario){//si el usario es true(existe)
            return res.status(400).json({
                ok:false,
                msg: 'El usuario ya existe con ese correo rey'
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bycrypt.genSaltSync();

        
        usuario.password = bycrypt.hashSync(password, salt)//esto hace que el primer paramtro sea la contraseña y el segundo para que la encripte
        await usuario.save();

         // Generar JWT
         const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


        //const usuario = new Usuario(req.body);//le envio los datos al schema
        //await usuario.save();//esto hace que se guarde el usuario en la bd
    
        
    } catch (error) {
        console.log(error);
        res.status(201).json({
            ok: false,
            msg: 'hable con los master supremos',
        })

    }

}

const loginUsuario = async(req, res = response)=>{
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {//si el usuario es false (no existe el email)
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bycrypt.compareSync( password, usuario.password );//esto compara las contraseñas

        if ( !validPassword ) {//no existe la contraseña o incorreacta
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }


}
const revalidarToken =async (req, res = response)=>{
    const { uid, name } = req;

    // Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}