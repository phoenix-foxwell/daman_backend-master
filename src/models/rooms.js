module.exports = (sequelize, Sequelize) => {
  const Rooms = sequelize.define(
    "tbl_rooms",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roomtype: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      room_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },

      member_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      nonmember_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      no_of_bed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      amenities: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "0",
      },
      start_date: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      end_date: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },

      photo1: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      photo2: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      photo3: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "",
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );

  return Rooms;
};
