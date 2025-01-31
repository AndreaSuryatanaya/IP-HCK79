const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function comparePass(password, hasdedPassword) {
  return bcrypt.compareSync(password, hasdedPassword);
}

module.exports = { hashPassword, comparePass };
