export default class UserRepository {
  constructor(dao) { this.dao = dao; }

  create(user) { return this.dao.create(user); }

  findByEmail(email) { return this.dao.getByEmail(email); }

  findById(id) { return this.dao.getById(id); }

  updatePassword(id, hash) { return this.dao.updatePassword(id, hash); }
}
