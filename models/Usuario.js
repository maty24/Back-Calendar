const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({//esto me crea la tabla
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true//el email no se puede repetir
    },
    password: {
        type: String,
        require: true
    }
});


module.exports = model('Usuario', UsuarioSchema );//el schema se llama usuario
