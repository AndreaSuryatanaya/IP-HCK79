"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movies.belongsToMany(models.User, {
        through: models.FavoriteMovies,
        foreignKey: "movie_id",
        as: "likedByUsers",
      });

      Movies.belongsTo(models.TypeMovies, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  Movies.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      release_year: {
        type: DataTypes.INTEGER,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "Release_year is required" },
          notEmpty: { msg: "Release_year is required" },
        },
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Validasi notNull
        validate: {
          notNull: { msg: "Type_id is required" },
          notEmpty: { msg: "Type_id is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Movies",
    }
  );
  return Movies;
};
