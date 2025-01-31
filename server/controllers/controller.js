const { User } = require("../models");
const { comparePass } = require("../helpers/hashPassword");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
// const { where } = require("sequelize");
const gemini = require("../helpers/geminiAi");

class Controller {
  static async geminiAi(req, res, next) {
    try {
      const { input } = req.body;
      let data = await gemini(input);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "ISE" });
    }
  }

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
      console.log(err);
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

  static async handleGoogleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      if (!googleToken) {
        return res.status(400).json({ message: "Missing Google token!" });
      }

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID, // Client ID Anda
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Date.now().toString() + Math.random().toString(),
          role: "user",
        },
      });

      const token = signToken({ id: user.id, email: user.email });
      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      console.error(err);
      next(err); // Kirim error ke middleware error handler
    }
  }
}

module.exports = Controller;
