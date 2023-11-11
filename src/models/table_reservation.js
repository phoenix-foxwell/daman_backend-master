const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Guests = sequelize.define(
    "tbl_table_reservation",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      no_of_guest: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      mobile_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "0",
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      visitdate: {
        type: DataTypes.DATE,
        allowNull: false,
        // default: Sequelize.literal("GETDATE"),
      },
      visittime: {
        type: DataTypes.TIME,
        allowNull: false,
        // defaultValue: Sequelize.literal("CURRENT_TIME"),
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Guests;
};
