// Traer la librería jsonwebtoken
const jwt = require("jsonwebtoken");

// Crear función de generación de llaves
const generateSign = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" })
};

// Crear función que comprueba que nosotros hemos creado el token
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Exportar la función
module.exports = { generateSign, verifyJwt }