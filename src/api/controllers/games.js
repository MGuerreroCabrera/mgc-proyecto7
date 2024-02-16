const Game = require("../models/games");


// Listado de registros
const getGames = async (req, res, next) => {
    try {

        // Crear variable donde irán los registros
        const games = await Game.find({ verified: true });

        // Devolver el resultado y json con registros
        return res.status(200).json(games);
        
    } catch (error) {
        
        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);

    }
};

// Obtener registro por ID
const getGameById = async (req, res, next) => {
    try {

        // Recoger el id del registro
        const { id } = req.params;

        // Crear variable que contendrá el registro
        const game = await Game.findById(id);

        // Devolver resultado y json con registro
        return res.status(200).json(game);
        
    } catch (error) {
        
        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);

    }
};

// Listado de registros Admin
const getGamesNotVerified = async (req, res, next) => {
    try {
        
        // Crear variable donde irán los registros
        const games = await Game.find({ verified: false });

        // Devolver el resultado y json con registros
        return res.status(200).json(games);

    } catch (error) {
        
        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);

    }
};

// Insertar registro
const postGame = async (req, res, next) => {
    try {

        // Crear variable con los datos del nuevo registro
        const newGame = new Game(req.body);

        // Comprobar qué tipo de usuario crea el registro "user" o "admin"
        if(req.user.rol === "admin"){
            newGame.verified = true;
        }else{
            newGame.verified = false;
        }

        // Lanzar la petición para guardar el resitro
        const gameSaved = await newGame.save();

        // Devolver resultado y json con registro guardado
        return res.status(201).json(gameSaved);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

// Actualizar registro
const putGame = async (req, res, next) => {
    try {

        // Obtener el id del registro a actualizar
        const { id } = req.params;

        // Crear variable con datos a actualizar
        const newGame = new Game(req.body);

        // Asignar el mmismo id
        newGame._id = id;

        // Lanzar petición de actualizar el registro
        const gameUpdated = await Game.findByIdAndUpdate(id, newGame, { new: true });

        // Devolver resultado y json con registro actualizado
        return res.status(200).json(gameUpdated);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

// Eliminar registro
const deleteGame = async (req, res, next) => {
    try {

        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Crear variable donde se almacena el registro eliminado
        const gameDeleted = await Game.findByIdAndDelete(id);

        // Devolver resultado y json
        return res.status(200).json(gameDeleted);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

module.exports = { getGames, getGameById, postGame, putGame, deleteGame, getGamesNotVerified };
