module.exports = (sequelize, Sequelize) => {
  const room_events = sequelize.define(
    "tbl_room_events",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

  return room_events;
};
