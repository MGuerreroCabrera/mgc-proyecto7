// Traer librería dotenv y configurarla
require("dotenv").config();

// Traer librería express
const express = require("express");
const { connectDB } = require("./src/config/db");
const gamesRouter = require("./src/api/routes/games");
const platformsRouter = require("./src/api/routes/platforms");
const usersRouter = require("./src/api/routes/users");

// Declarar el servidor que es express ejecutado
const app = express();

// Conexión con la BBDD
connectDB();

// Configurar servidor para que reciba datos json
app.use(express.json());

// Definir rutas para juegos
app.use("/api/v1/games", gamesRouter);
// Definir rutas para plataformas
app.use("/api/v1/platforms", platformsRouter);
// Definir rutas para usuarios
app.use("/api/v1/users", usersRouter);

// Controlar acceso a rutas que no están definidas
app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
});

// Definir puerto de escucha
const port = 3000;

// Levantar el servidor en el puerto especificado
app.listen(port, () => {
    console.log("El servidor está levantado en: http://localhost:" + port + " 🥳");
});