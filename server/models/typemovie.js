"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/hashPassword");

module.exports = (sequelize, DataTypes) => {
  class TypeMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeMovies.hasMany(models.Movies, {
        foreignKey: "type_id",
        as: "movies",
      });
    }
  }
  TypeMovies.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "TypeMovies",
    }
  );
  return TypeMovies;
};
