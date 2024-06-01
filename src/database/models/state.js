"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.Product, {
        foreignKey: "states_id",
        as: "products",
      });
    }
  }
  State.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "State",
    }
  );
  return State;
};
