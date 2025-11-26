import userModel from "../models/user.model.js";
import { generaHash, validaPass } from "../utils/hashUtils.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const exist = await userModel.findOne({ email });
  if (exist) return res.status(400).json({ message: "User already exists" });

  const newUser = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password: generaHash(password)   // <- acá se usa
  });

  res.status(201).json({ message: "User created", user: newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user || !validaPass(password, user.password))  // <- acá se usa
    return res.status(401).json({ message: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ message: "Login successful", token });
};