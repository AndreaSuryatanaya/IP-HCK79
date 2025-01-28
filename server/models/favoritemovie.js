"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FavoriteMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteMovies.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "user_id is required" },
          notEmpty: { msg: "user_id is required" },
        },
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "movie_id is required" },
          notEmpty: { msg: "movie_id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "FavoriteMovies",
    }
  );
  return FavoriteMovies;
};
