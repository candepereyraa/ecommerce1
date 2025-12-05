import mongoose from 'mongoose';


const tokenSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
token: String,
expiresAt: Date
});


const Token = mongoose.model('PasswordToken', tokenSchema);


export default class TokenDAO{
async create(obj){ return Token.create(obj); }
async find(token){ return Token.findOne({ token }); }
async delete(token){ return Token.findOneAndDelete({ token }); }
async deleteByUser(userId){ return Token.deleteMany({ userId }); }
}