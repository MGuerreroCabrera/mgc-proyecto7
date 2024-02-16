const { isAdmin } = require("../../middlewares/auth");
const { getPlatformById, postPlatform, putPlatform, deletePlatform, getPlatforms } = require("../controllers/platforms");

// Traer express - Router
const platformsRouter = require("express").Router();

// Ruta para registro por id
platformsRouter.get("/:id", getPlatformById);

// Ruta para crear un registro
platformsRouter.post("/", [isAdmin], postPlatform);

// Ruta para actualizar registro
platformsRouter.put("/:id", [isAdmin], putPlatform);

// Ruta para eliminar registro
platformsRouter.delete("/:id",[isAdmin], deletePlatform);

// Ruta para listar todos los registros
platformsRouter.get("/", getPlatforms);

// Exportar enrutador
module.exports = platformsRouter;