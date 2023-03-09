const {response} = require('express');
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino = '', res = response) =>{
    const esMongoID = ObjectId.isValid( termino );
    
    //busqueda por id
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    //busqueda por otros argumentos
    const regex = new RegExp(termino, 'i'); //busqueda insensible

    const usuarios = await Usuario.find({ //puede usarse el metodo count si se quiere contar
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    })
}

const buscarCategorias = async(termino = '', res = response) =>{
    const esMongoID = ObjectId.isValid( termino );
    
    //busqueda por id
    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    //busqueda por otros argumentos
    const regex = new RegExp(termino, 'i'); //busqueda insensible

    const categoria = await Categoria.find({ nombre: regex, estado: true});

    res.json({
        results: categoria
    })
}

const buscarProductos = async(termino = '', res = response) =>{
    const esMongoID = ObjectId.isValid( termino );
    
    //busqueda por id
    if(esMongoID){
        const producto = await Producto.findById(termino)
                            .populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    //busqueda por otros argumentos
    const regex = new RegExp(termino, 'i'); //busqueda insensible

    const producto = await Producto.find({ nombre: regex, estado: true})
                        .populate('categoria', 'nombre');

    res.json({
        results: producto
    })
}


const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
    }

}

module.exports = {
    buscar
}