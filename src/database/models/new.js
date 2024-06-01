"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class New extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      New.belongsTo(models.Product, {
        foreignKey: "products_id",
        as: "products",
      });
    }
  }
  New.init(
    {
      date: DataTypes.DATE,
      products_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "New",
    }
  );
  return New;
};
