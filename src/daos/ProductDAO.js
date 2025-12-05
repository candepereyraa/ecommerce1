import Product from '../models/Product.js';


export default class ProductDAO {
async getAll() { return Product.find().lean(); }
async getById(id) { return Product.findById(id).lean(); }
async create(data) { return Product.create(data); }
async update(id, data) { return Product.findByIdAndUpdate(id, data, { new: true }); }
async delete(id) { return Product.findByIdAndDelete(id); }
}