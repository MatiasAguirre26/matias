"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Offer.belongsTo(models.Product, {
        foreignKey: "products_id",
        as: "products",
      });
    }
  }
  Offer.init(
    {
      discount: DataTypes.INTEGER,
      products_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Offer",
    }
  );
  return Offer;
};
