import jwt from "jsonwebtoken";
import config from "../config/index.js";

// Generar token JWT
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpires }
  );
};

// Verificar token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    return null; // o lanzar error según tu lógica
  }
};
