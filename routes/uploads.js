const { Router } = require('express');
const { param} = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    param('id', ' El id debe ser de mongo').isMongoId(),
    param('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)
//], actualizarImagen);

router.get('/:coleccion/:id', [
    param('id', ' El id debe ser de mongo').isMongoId(),
    param('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);



module.exports= router;