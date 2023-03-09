const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function(){//se modifica el metodo para retornar solo algunos datos
    const {__v, estado, ...data} = this.toObject(); //genera instancia y se quita __v, estado. Lo demas se guarda en data // 
    return data;
}

module.exports = model('Categoria', CategoriaSchema);