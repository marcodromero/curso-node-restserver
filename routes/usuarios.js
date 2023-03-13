const { Router } = require('express');
const { body, param} = require('express-validator');

const { validarCampos,
        validarJWT,
        tieneRole
} = require('../middlewares');

const { esRoleValido,
        emailExiste,
        existeUsuarioPorId
} = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch, 
        usuariosDelete 
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
        param('id', 'No es un ID valido').isMongoId(), // validar que sea un id de mongo
        param('id').custom(existeUsuarioPorId),
        body('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.post('/', [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('password', 'El password debe ser más de 6 letras').isLength({min: 6}),
        body('correo', 'El correo no es válido').isEmail(),
        body('correo').custom(emailExiste),
        body('rol').custom(esRoleValido), //Versión simplificada de .custom((rol) => esRoleValido(rol))
        validarCampos
], usuariosPost);

router.delete('/:id', [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'USER_ROLE'),
        param('id', 'No es un ID valido').isMongoId(), 
        param('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

module.exports = router;