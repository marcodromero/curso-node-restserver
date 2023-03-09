const { Router } = require('express');
const { body, param} = require('express-validator');

const { obtenerProducto, 
        obtenerProductos,
        crearProducto, 
        actualizarProducto, 
        borrarProducto 
} = require('../controllers/productos');

const { existeProductoPorId } = require('../helpers/db-validators');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT,
     validarCampos,
      esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id',[
   param('id', 'No es un id de mongo valido').isMongoId(),
   param('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    body('nombre', ' El nombre es obligatorio').not().isEmpty(),
    body('categoria', 'No es un id de Mongo').not().isEmpty(),
    body('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    param('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    param('id', 'No es un id de Mongo').not().isEmpty(),
    param('id', "No es un id Mongo válido").custom(existeProductoPorId),
    validarCampos
],
borrarProducto);


module.exports = router;