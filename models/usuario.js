const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function(){//se modifica el metodo
    const {__v, password, ...usuario} = this.toObject(); //genera instancia y se quita __v, password. Lo demas se guarda en usuario // 
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);