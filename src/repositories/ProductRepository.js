export default class ProductRepository{
constructor(dao){ this.dao = dao; }
async list(){ return this.dao.getAll(); }
async find(id){ return this.dao.getById(id); }
async add(product){ return this.dao.create(product); }
async edit(id, data){ return this.dao.update(id, data); }
async remove(id){ return this.dao.delete(id); }
}