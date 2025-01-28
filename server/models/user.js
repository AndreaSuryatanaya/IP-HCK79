"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Movies, {
        through: models.FavoriteMovies,
        foreignKey: "user_id",
        as: "favoriteMovies",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        // allowNull: false, // Validasi notNull
        // validate: {
        //   notNull: { msg: "Username is required" },
        //   notEmpty: { msg: "Username is required" },
        // },
      },
      email: {
        type: DataTypes.STRING,
        // unique: true,
        // allowNull: false, // Validasi notNull
        // validate: {
        //   notNull: { msg: "Email is required" },
        //   notEmpty: { msg: "Email is required" },
        //   isEmail: {
        //     args: true,
        //     msg: "Must be a valid email format",
        //   },
        // },
      },
      password: {
        type: DataTypes.STRING,
        // allowNull: false, // Validasi notNull
        // validate: {
        //   notNull: { msg: "Password is required" },
        //   notEmpty: { msg: "Password is required" },
        //   len: {
        //     args: [5],
        //     msg: "Password must be at least 5 characters long",
        //   },
        // },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
