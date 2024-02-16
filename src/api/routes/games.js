const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getGameById, postGame, putGame, deleteGame, getGames, getAllGames } = require("../controllers/games");

// Traer express - Router
const gamesRouter = require("express").Router();

// Ruta para registro por id
gamesRouter.get("/:id", [isAdmin], getGameById);

// Ruta para crear un registro
gamesRouter.post("/", [isAuth], postGame);

// Ruta para actualizar registro
gamesRouter.put("/:id", [isAdmin], putGame);

// Ruta para eliminar registro
gamesRouter.delete("/:id", [isAdmin], deleteGame);

// Ruta para todos los registros Admin
gamesRouter.get("/admin", [isAdmin], getAllGames);

// Ruta para listar todos los registros
gamesRouter.get("/", getGames);

// Exportar enrutador
module.exports = gamesRouter;