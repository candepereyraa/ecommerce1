export default class CartRepository{
constructor(dao){ this.dao = dao; }
async create(cart){ return this.dao.create(cart); }
async get(id){ return this.dao.getById(id); }
async update(id, data){ return this.dao.update(id, data); }
}