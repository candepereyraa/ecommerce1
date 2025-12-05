import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';


export default class AuthService{
constructor(userRepo){ this.userRepo = userRepo; }


async register(payload){
const hashed = bcrypt.hashSync(payload.password, 10);
payload.password = hashed;
return this.userRepo.create(payload);
}


async login(email, password){
const user = await this.userRepo.findByEmail(email);
if(!user) throw new Error('Invalid creds');
const ok = bcrypt.compareSync(password, user.password);
if(!ok) throw new Error('Invalid creds');
const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpires });
return { token, user };
}
}