"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Editorial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Editorial.hasMany(models.Product, {
        foreignKey: "editorials_id",
        as: "products",
      });
    }
  }
  Editorial.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Editorial",
    }
  );
  return Editorial;
};
