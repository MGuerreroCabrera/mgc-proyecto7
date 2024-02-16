// Traer librería bcrypt
const bcrypt = require("bcrypt");

const { model } = require("mongoose");
const User = require("../models/users");
const { generateSign } = require("../../config/jwt");


// Listado de registros
const getUsers = async (req, res, next) => {
    try {

        // Crear variable que contendrá los registros
        const users = await User.find();

        // Devolver el resultado OK y json con registros
        return res.status(200).json(users);
        
    } catch (error) {

        // Devolver error 400 y json con error
        return res.status(400).json(error);
        
    }
};

// Obtener registro por ID
const getUserById = async (req, res, next) => {
    try {

        // Recoger el id del usuario a buscar
        const { id } = req.params;

        // Crear variable para el registro encontrado
        const user = await User.findById(id);

        // Devolver resultado OK y json con registro
        return res.status(200).json(user);
        
    } catch (error) {

        // Devolver error 400 y json con error
        return res.status(400).json(error);
        
    }
};

// Crear registro
const register = async (req, res, next) => {
    try {

        // Crear nuevo registro obligando que el rol sea siempre user.
        const newUser = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            yearOfBird: req.body.yearOfBird,
            rol: "user",
            avatar: req.body.avatar
        });

        // Comprobar duplicidad del userName
        const duplicatedUserName = await User.findOne({ userName: req.body.userName });

        if(duplicatedUserName){
            return res.status(400).json("El usuario ya existe");
        }

        // Lanzar la petición de guardar el registro
        const userSaved = await newUser.save();

        // Devoler el resultado OK y json con registro guardado
        return res.status(201).json(userSaved);
        
    } catch (error) {

        // Devolver error 400 y json con error
        return res.status(400).json(error);
        
    }
};

// Actualizar registro
const putUser = async (req, res, next) => {
    try {
        
        // Recoger el id del registro a actualizar
        const { id } = req.params;

        // Crear variable con datos a actualizar
        const newUser = new User(req.body);

        // Asignar el mismo id al nuevo registro
        newUser._id = id;

        // Lanzar la petición de actualizar el registro
        const userUpadated = await User.findByIdAndUpdate(id, newUser, { new: true });

        // Devolver resultado y json con datos del registro actualizado
        return res.status(200).json(userUpadated);

    } catch (error) {
        
        // Devolver error 400 y json con error
        return res.status(400).json(error);

    }
};

// Eliminar registro
const deleteUser = async (req, res, next) => {
    try {

        // Recoger id del registro a eliminar
        const { id } = req.params;

        // Crear variable que contendrá los datos del registro eliminado
        const userDeleted = await User.findByIdAndDelete(id);

        // Devolver resultado y json con datos del registro
        return res.status(200).json(userDeleted);
        
    } catch (error) {

        // Devolver error 400 y json con error
        return res.status(400).json(error);
        
    }
};

// Crear función de login
const login = async (req, res, next) => {
    try {
        
        // Comprobar si el usuario existe
        const user = await User.findOne({ userName: req.body.userName });
        
        // Si no existe el usuario salir del login
        if(!user) {
            return res.status(400).json("El usuario no existe");
        }

        // Comprobar contraseña
        if(bcrypt.compareSync(req.body.password, user.password)){
            
            // Crear el token
            const token = generateSign(user._id);

            return res.status(200).json({ user, token });

        }else{

            // Devolver mensaje de datos incorrectos
            return res.status(400).json("Usuario o contraseña incorrectos");
        }

        // Devolver resultado OK y json
        return res.status(200).json("Usuario logueado");

    } catch (error) {
        
        // Devolver error 400 y json con error
        return res.status(400).json(error);

    }
};

module.exports = { getUsers, getUserById, putUser, deleteUser, register, login };