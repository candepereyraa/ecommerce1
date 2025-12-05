import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generaHash = (password) => bcrypt.hashSync(password, 10);
export const validaPass = (pass, hash) => bcrypt.compareSync(pass, hash);

export const generateToken = (user) => {
  return jwt.sign(
    { user: { _id: user._id, email: user.email, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// === Función temporal para generar hash de admin ===
export const generarHashAdmin = () => {
  const password = "admin123"; 
  const hash = generaHash(password);
  console.log("Hash generado para admin:", hash);
};
