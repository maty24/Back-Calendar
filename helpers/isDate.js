const moment = require('moment');//esto es parra vidar fechas

const isDate = ( value ) => {

    if ( !value ) {
        return false;
    }

    const fecha = moment( value );
    if ( fecha.isValid() ) {//validaion propia de moment
        return true;
    } else {
        return false;
    }
    
}



module.exports = { isDate };


