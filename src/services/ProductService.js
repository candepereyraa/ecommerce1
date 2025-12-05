
import Product from '../models/Product.js';

export default class ProductService {
  async list(filter = {}) {
    return Product.find(filter).lean();
  }

  async getById(id) {
    return Product.findById(id).lean();
  }

  async create(payload) {
    return Product.create(payload);
  }

  async update(id, payload) {
    return Product.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return Product.findByIdAndDelete(id);
  }
}
