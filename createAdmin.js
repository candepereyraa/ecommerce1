import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// 🔥 Usa las variables correctas del .env
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URL) {
  console.error("❌ ERROR: MONGO_URL no está definido en .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URL, { dbName: DB_NAME });
console.log("Mongo conectado");

// Schema y modelo
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model("User", userSchema);

// Datos del admin
const adminEmail = "admin@ecommerce.com";
const adminPassword = "admin123";

// Crear admin
const createAdmin = async () => {
  const existing = await User.findOne({ email: adminEmail });
  
  if (existing) {
    console.log("Admin ya existe:", existing.email);
  } else {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    const admin = new User({
      first_name: "Admin",
      last_name: "User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin creado con éxito:", admin.email);
  }

  process.exit();
};

createAdmin();
