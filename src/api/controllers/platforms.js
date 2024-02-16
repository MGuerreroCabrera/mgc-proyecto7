const Platform = require("../models/platforms");


// Listado de registros
const getPlatforms = async (req, res, next) => {
    try {

        // Crear variable donde irán los registros
        const platforms = await Platform.find().populate("games");
        
        // Devolver el resultado y json con registros
        return res.status(200).json(platforms);
        
    } catch (error) {
        
        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);

    }
};

// Obtener registro por ID
const getPlatformById = async (req, res, next) => {
    try {

        // Recoger el id del registro
        const { id } = req.params;

        // Crear variable que contendrá el registro
        const platform = await Platform.findById(id).populate("games");

        // Devolver resultado y json con registro
        return res.status(200).json(platform);
        
    } catch (error) {
        
        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);

    }
};

// Insertar registro
const postPlatform = async (req, res, next) => {
    try {

        // Crear variable con los datos del nuevo registro
        const newPlatform = new Platform(req.body);

        // Lanzar la petición para guardar el resitro
        const platformSaved = await newPlatform.save();

        // Devolver resultado y json con registro guardado
        return res.status(201).json(platformSaved);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

// Actualizar registro
const putPlatform = async (req, res, next) => {
    try {

        // Obtener el id del registro a actualizar
        const { id } = req.params;

        // Recoger los datos que tenía anteriormente el registro
        const oldPlatform = await Platform.findById(id);

        // Crear variable con datos a actualizar
        const newPlatform = new Platform(req.body);

        // Asignar el mmismo id
        newPlatform._id = id;

        // Recoger los juegos que tenía si los tenía y creamos un array fusionando los datos nuevos que llegan con los que ya había.
        newPlatform.games = [...oldPlatform.games, ...req.body.games];

        // Lanzar petición de actualizar el registro
        const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, { new: true });

        // Devolver resultado y json con registro actualizado
        return res.status(200).json(platformUpdated);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

// Eliminar registro
const deletePlatform = async (req, res, next) => {
    try {

        // Recoger el id del registro a eliminar
        const { id } = req.params;

        // Crear variable donde se almacena el registro eliminado
        const platformDeleted = await Platform.findByIdAndDelete(id);

        // Devolver resultado y json
        return res.status(200).json(platformDeleted);
        
    } catch (error) {

        // Devolver error 400 e inyectarlo en el json
        return res.status(400).json(error);
        
    }
};

module.exports = { getPlatforms, getPlatformById, postPlatform, putPlatform, deletePlatform };
