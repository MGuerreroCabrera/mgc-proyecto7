const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

// Crear función de autenticación
const isAuth = async (req, res, next) => {
    try {
        
        // Crear el token
        const token = req.headers.authorization;

        // Eliminar "Bearer " del token recibido
        const parsedToken = token.replace("Bearer ", "");

        // Obtener el id del usuario
        const { id } = verifyJwt(parsedToken);

        // Buscar los datos del usuario
        const user = await User.findById(id);

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
        
        // Crear el token
        const token = req.headers.authorization;

        // Eliminar "Bearer " del token recibido
        const parsedToken = token.replace("Bearer ", "");

        // Obtener el id del usuario
        const { id } = verifyJwt(parsedToken);

        // Buscar los datos del usuario
        const user = await User.findById(id);

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