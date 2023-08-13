const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

//Validar el Rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

//Validar el Email
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo}) ;

    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra en la base de datos registrado`);
    }
}

//Validar si el usuario existe
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste
}