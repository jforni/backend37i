const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req=request, res=response) => {
    const {desde=0, limite=5} = req.query;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limite),
    ])

    res.json({
        msg: 'Usuarios obtenidos',
        total,
        usuarios
    })
}

const usuariosPost = async (req=request, res=response) => {
    //Recibir el cuerpo de la petición
    const datos = req.body;
    const {nombre, correo, password, rol} = datos;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    usuario.password = hash;

    //Guardar lso datos en la Base de datos
    await usuario.save();

    res.json({
        usuario,
        msg: "Usuario creado correctamente"
    })
}

const usuarioPut = async (req=request, res=response) => {
    
    const {id} = req.params;
    
    //Obtener datos para actualizar
    const { password, correo, ...resto} = req.body;

    //Si actualizo el password, hay que cifrarlo o encriptarlo
    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    resto.correo = correo; 

    //Buscar el usuario y actualizarlo
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json({
        msg: 'Usuario actualizado',
        usuario
    })
}

const usuarioDelete = async (req=request, res=response) => {
    const {id} = req.params;

    //Para cambiar el estado a false
    const usuario = await Usuario.findById(id);

    if(!usuario.estado){
        return res.json({
            msg: "El usuario ya está inactivo"
        })
    }

    const usuarioInactivado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});


    res.json({
        msg: "Usuario inactivo",
        usuarioInactivado
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioPut,
    usuarioDelete
};