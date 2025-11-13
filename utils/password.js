const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hashSync(password, 10); // encripta
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash); // compara
}

module.exports = { hashPassword, comparePassword };
