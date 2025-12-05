import Cart from '../models/Cart.js';


export default class CartDAO {
async create(data){ return Cart.create(data); }
async getById(id){ return Cart.findById(id).populate('products.product').lean(); }
async update(id, data){ return Cart.findByIdAndUpdate(id, data, { new: true }); }
}