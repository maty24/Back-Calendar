const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,        
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});
//esto para que no muestre el id y la _v
EventoSchema.method('toJSON', function() {//para hacer referencia al this
    const { __v, _id, ...object } = this.toObject();//extraigo las que me sriven y los demas con el operador espred
    object.id = _id;//renombro el id
    return object;//y solo me traigo lo demas
});



module.exports = model('Evento', EventoSchema );

