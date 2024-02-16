// Traer mongoose
const mongoose = require("mongoose");
// Traer librería bcrypt
const bcrypt = require("bcrypt");

// Crear Schema
const userSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: true, unique: true },
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    yearOfBird: { type: Number, trim: true, required: true },
    rol: { type: String, trim: true, required: true, enum: ["admin", "user"] },
    avatar: { type: String, trim: true, required: true }
}, {
    timestamps: true,
    timeseries: true,
    collection: "users"
});

// Crear función para encriptar la contraseña
userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

// Crear modelo 
const User = mongoose.model("users", userSchema, "users");

// Exportar modelo
module.exports = User;