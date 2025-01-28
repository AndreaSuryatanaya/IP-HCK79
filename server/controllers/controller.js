const { User } = require("../models");
const { comparePass } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async handleRegister(req, res, next) {
    try {
      const { username, email, password } = req.body;

      let checkUser = await User.findOne({
        where: { email },
      });

      if (checkUser) {
        throw { name: "BadRequest", message: "Email is exist" };
      }
      let newUser = await User.create({ username, email, password });

      res.status(201).json({
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async handleLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }

      let foundUser = await User.findOne({
        where: { email },
      });

      if (!foundUser) {
        throw {
          name: "Unauthorized",
          message: "error invalid username or email or password",
        };
      }
      let checkPassowrd = comparePass(password, foundUser.password);
      if (!checkPassowrd) {
        throw {
          name: "Unauthorized",
          message: "error invalid username or email or password",
        };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      };
      const token = signToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
