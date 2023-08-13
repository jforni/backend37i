const Rol = require('../models/rol');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Curso = require('../models/curso');

//Validar Rol
const esRolValido = async (rol) => {
    const existeRol = await Rol.findOne({rol})

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la base de datos`);
    }
}

//Validar email
const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
}

//Si existe el usuario por id
const usuarioExiste = async (id) => {
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario){
        throw new Error(`El id ${id} no corresponde a ningún usuario registrado`);
    }
}

//Si existe la categoría por id
const categoriaExiste = async (id) => {
    const existeCategoria = await Categoria.findById(id)

    if(!existeCategoria){
        throw new Error(`El id ${id} no corresponde a ninguna categoría registrada`);
    }
}

//Si existe la categoría por id
const cursoExiste = async (id) => {
    const existeCurso = await Curso.findById(id)

    if(!existeCurso){
        throw new Error(`El id ${id} no corresponde a ningún curso registrado`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    cursoExiste
}