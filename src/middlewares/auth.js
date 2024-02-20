const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");
const { validateUser } = require("../utils/validateUser");

// Crear función de autenticación
const isAuth = async (req, res, next) => {
    try {
        
        // Buscar los datos del usuario
        const user = validateUser(req.headers.authorization);

        // Poner la contraseña a null
        user.password = null;

        // Poner el usuario en los datos de la request
        req.user = user; 

        // Seguimos a lo siguiente que haya que hacer
        next();

    } catch (error) {

        // Devolver error y json
        return res.status(400).json("No estás autorizado");
        
    }
};

// Crear función de autenticación para administradores
const isAdmin = async (req, res, next) => {
    try {
        // Buscar datos del usuario en BBDD
        const user = await validateUser(req.headers.authorization);
        
        // Comprobar el rol del usuario
        if(user.rol === "admin"){
            // Poner la contraseña a null
            user.password = null;

            // Poner el usuario en los datos de la request
            req.user = user; 

            // Seguimos a lo siguiente que haya que hacer
            next();
        }else{
            return res.status(400).json("Funcionalidad restringida a los administradores");
        }

    } catch (error) {

        // Devolver error y json
        return res.status(400).json("No estás autorizado");
        
    }
};

module.exports = { isAuth, isAdmin }