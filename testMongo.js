import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { usuariosModelo } from "./models/usuario.model.js"; // tu modelo

// Datos del usuario nuevo
const nuevoUsuario = {
  nombre: "Candela",
  apellido: "Pereyra",
  email: "candela@test.com",
  password: "1234" // contraseña que quieras usar
};

// URL de conexión a MongoDB y nombre de DB
const mongoURL = "mongodb+srv://candepereyraa15_db_user:eccomerce@cluster0.oitzu2a.mongodb.net/?appName=Cluster0";
const dbName = "entrega1";

async function resetUsuario() {
  try {
    await mongoose.connect(mongoURL, { dbName });
    console.log("Conectado a MongoDB!");

    // Borrar usuario si ya existe
    await usuariosModelo.deleteOne({ email: nuevoUsuario.email });
    console.log(`Usuario con email ${nuevoUsuario.email} eliminado si existía.`);

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(nuevoUsuario.password, 10);
    nuevoUsuario.password = hashedPassword;

    // Crear usuario nuevo
    const usuarioCreado = await usuariosModelo.create(nuevoUsuario);
    console.log("Usuario creado:", usuarioCreado);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}

resetUsuario();
