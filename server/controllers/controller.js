const { User } = require("../models");
const { jwt } = require("jsonwebtoken");
const { comparePass } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");
const { where } = require("sequelize");

class Controller {
  static async handleRegister(req, res, next) {
    try {
      const { userName, email, password } = req.body;
      let checkUser = await User.findOne({
        where: { email },
      });
      if (checkUser) {
        throw { name: "BadRequest", message: "Email is exist" };
      }
      let newUser = await User.create({ userName, email, password });
      res.status(201).json({
        // token: token,
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async handleLogin(req, res) {
    try {
    } catch (error) {}
  }
}

module.exports = Controller;
