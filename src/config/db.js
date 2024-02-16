// Traer librería mongoose para poder trabajar con BBDD
const mongoose = require("mongoose");

// Crear función de conexión con la BBDD
const connectDB = async () => {
    try {

        // Resolver asincronía y conectar con la BBDD
        await mongoose.connect(process.env.DB_URL);

        console.log("Conectado a la BBDD 🤩");
        
    } catch (error) {

        // Mostar error
        console.log(error);
        
    }
};

// Exportar función de conexión a la BBDD
module.exports = { connectDB };