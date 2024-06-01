"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(1234),
      },
      price: {
        type: Sequelize.FLOAT,
      },
      stock_min: {
        type: Sequelize.INTEGER,
      },
      stock_max: {
        type: Sequelize.INTEGER,
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      sizes_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sizes",
          key: "id",
        },
      },
      details_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Details",
          key: "id",
        },
      },
      editorials_id: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Editorials',
          key: 'id',
        }
      },
      states_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "States",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
