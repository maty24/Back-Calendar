const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth')
const { validarJWT } = require('../middleware/validar-jwt');



const router = Router();

//rutas 
router.post(
    '/new', 
    [ // coleccion de  middlewares  
        check('name', 'El nombre es obligatorio').not().isEmpty(),//not -empty para que no este vacio
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);

router.get('/renew', validarJWT ,revalidarToken );


module.exports = router;