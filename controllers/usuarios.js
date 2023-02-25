const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const {q, nombre = "no name", apikey} = req. query;

    res.json({
        msg: "get Api - controlador",
        q,
        nombre,
        apikey
    });
  }

  const usuariosPost = (req, res = response) => {
    
    const {nombre, edad} = req.body;

    res.json({
        msg: "Post Api - controlador",
        nombre,
        edad
    });
  }

  const usuariosPut = (req, res = response) => {
    
    const {id} = req.params;

    res.json({
        msg: "Put Api - controlador",
        id
    });
  }
  const usuariosPatch = (req, res = response) => {
    
    res.json({
        msg: "Patch Api - controlador"
    });
  }

  const usuariosDelete = (req, res = response) => {
    
    res.json({
        msg: "Delete Api - controlador"
    });
  }

  module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPut,
    usuariosPost
  }