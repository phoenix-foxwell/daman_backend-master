module.exports = (sequelize, Sequelize) => {
  const event_transaction = sequelize.define(
    "tbl_event_transaction",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_venue: {
        type: Sequelize.STRING(255),
        allowNull: true,
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
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      event_description: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      pay_mode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      pay_ref: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
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

  return event_transaction;
};
