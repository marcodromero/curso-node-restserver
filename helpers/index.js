

const dbValidators = required('./db-validators.js');
const generarJWT = required('./generar-jwt.js');
const googleVerify = required('./google-verify.js');
const subirArchivo = required('./subir-archivo.js');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}