import User from '../models/User.js';


export default class UserDAO {
async create(user){ return User.create(user); }
async getByEmail(email){ return User.findOne({ email }); }
async getById(id){ return User.findById(id).lean(); }
async updatePassword(id, hash){ return User.findByIdAndUpdate(id, { password: hash }); }
}