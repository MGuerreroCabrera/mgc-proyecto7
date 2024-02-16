// Traer librería mongoose
const mongoose = require("mongoose");

// Crear el Schema juego - 'game'
const gameShema = mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        img: { type: String, required: true },
        category: { type: String, required: true, enum: ["Puzzles", "Plataformas", "Deportes", "Coches", "Plataformas", "Disparos"] },
        verified: { type: Boolean, required: true, default: false }
    }, 
    {
        timestamps: true,
        collection: "games"
    }
);

// Crear el modelo
const Game = mongoose.model("games", gameShema, "games");

// Exportar el modelo
module.exports = Game;