// Traer librería mongoose
const mongoose = require("mongoose");

// Crear el Schema
const platformShema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: "games" }]
}, {
    timestamps: true,
    collection: "platforms"
});

// Crear el modelo
const Platform = mongoose.model("platforms", platformShema, "platforms");

// Exportar el modelo
module.exports = Platform;