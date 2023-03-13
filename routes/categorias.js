const { Router } = require('express');
const { body, param} = require('express-validator');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT,
        validarCampos,
        esAdminRole
} = require('../middlewares/');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria
} = require('../controllers/categorias');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id',[
   param('id', 'No es un id de mmongo valido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

router.post('/', [
    validarJWT,
    body('nombre', ' El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

router.put('/:id', [
    validarJWT,
    body('nombre', 'el nombre es obligatorio').not().isEmpty(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    param('id', "No es un id Mongo válido").custom(existeCategoriaPorId),
    validarCampos

], borrarCategoria);


module.exports = router;