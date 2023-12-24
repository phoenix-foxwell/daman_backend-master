module.exports = (sequelize, Sequelize) => {
  const RoomReservation = sequelize.define(
    "tbl_room_reservation",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      from_date: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: Sequelize.literal("GETDATE"),
      },
      to_date: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: Sequelize.literal("GETDATE"),
      },
      transaction_date: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: "0",
      },
      transaction_details: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: "0",
      },
      remark: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: "0",
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

  return RoomReservation;
};
