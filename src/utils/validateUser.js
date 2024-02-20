const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

// Función que valida si un usuario existe en BBDD y devuelve los datos del usuario
const validateUser = async (token) => {
    try {    
        // Crear el token parseado
        const parsedToken = token.replace("Bearer ", "");
        // Obtener el id de usuario
        const { id } = verifyJwt(parsedToken);
        // Buscar los datos del usuario    
        const user = await User.findById(id);
        return user;
    } catch (error) {
        return error;
    }
}

// Exportar función
module.exports = { validateUser }