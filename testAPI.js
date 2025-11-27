import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usuariosModelo } from "./models/usuario.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "miclave123";

async function main() {
  try {
    // Conexión a MongoDB
    await mongoose.connect(MONGO_URL, { dbName: "entrega1" });
    console.log("Conectado a MongoDB!");

    // Datos de prueba
    const email = "candela@test.com";   // email del usuario que creaste
    const password = "1234";            // contraseña que pusiste en testMongo.js

    // Buscar usuario
    const usuario = await usuariosModelo.findOne({ email });
    if (!usuario) {
      console.log("Usuario no encontrado");
      return;
    }

    // Validar contraseña
    const passCorrecta = bcrypt.compareSync(password, usuario.password);
    if (!passCorrecta) {
      console.log("Contraseña incorrecta");
      return;
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, nombre: usuario.nombre },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login exitoso!");
    console.log("Token JWT:", token);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

main();
