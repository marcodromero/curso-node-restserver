const { Router } = require('express');
const { body} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    body('correo', 'El correo es obligatorio').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    body('id_token', 'el id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports= router;