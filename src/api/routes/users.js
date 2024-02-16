const { isAdmin } = require("../../middlewares/auth");
const { getUserById, putUser, deleteUser, getUsers, register, login } = require("../controllers/users");


// Traer express - Router
const usersRouter = require("express").Router();

// Ruta para el registro po ID
usersRouter.get("/:id", [isAdmin], getUserById);

// Ruta para crear un registro
usersRouter.post("/", register);

// Ruta para actualizar registro
usersRouter.put("/:id", [isAdmin], putUser);

// Ruta para eliminar registro
usersRouter.delete("/:id", [isAdmin], deleteUser);

// Ruta para login
usersRouter.post("/login", login);

// Ruta listar todos los registros
usersRouter.get("/", [isAdmin], getUsers);

// Exportar enrutador
module.exports = usersRouter;