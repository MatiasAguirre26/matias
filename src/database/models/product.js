"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categories_id",
        as: "category",
      });

      Product.belongsTo(models.Size, {
        foreignKey: "sizes_id",
        as: "size",
      });

      Product.belongsTo(models.Detail, {
        foreignKey: "details_id",
        as: "detail",
      });

      Product.belongsTo(models.State, {
        foreignKey: "states_id",
        as: "state",
      });

      Product.belongsTo(models.Editorial, {
        foreignKey: "editorials_id",
        as: "editorial",
      });

      Product.hasMany(models.Image, {
        foreignKey: "products_id",
        as: "images",
      });

      Product.hasMany(models.New, {
        foreignKey: "products_id",
        as: "news",
      });

      Product.hasMany(models.Offer, {
        foreignKey: "products_id",
        as: "offers",
      });

      Product.belongsToMany(models.Author, {
        as: "autores",
        through: "product_author",
        foreignKey: "products_id",
        otherKey: "author_id",
        timestamps: false,
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      stock_min: DataTypes.INTEGER,
      stock_max: DataTypes.INTEGER,
      categories_id: DataTypes.INTEGER,
      sizes_id: DataTypes.INTEGER,
      details_id: DataTypes.INTEGER,
      editorials_id: DataTypes.INTEGER,
      states_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
