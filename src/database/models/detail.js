"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Detail.hasMany(models.Product, {
        foreignKey: "details_id",
        as: "Products",
      });
    }
  }
  Detail.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Detail",
    }
  );
  return Detail;
};
