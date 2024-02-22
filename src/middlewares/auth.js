const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");
const { validateUser, initUser } = require("../utils/validateUser");

// Crear función de autenticación
const isAuth = async (req, res, next) => {
    try {
        
        // Buscar los datos del usuario
        const user = validateUser(req.headers.authorization);

        // Llamar a la función initUser que incializa los valores de user.password a null y pone el usuario en la request        
        initUser(req, user);

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
            // llamar a la función initUser que inicializa el valor de pwd a null y pone el usuario en la request
            initUser(req, user);
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