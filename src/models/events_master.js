module.exports = (sequelize, Sequelize) => {
  const events_master = sequelize.define(
    "tbl_events_master",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      member_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      non_member_amount: {
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
      days_hours: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      event_description: {
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

  return events_master;
};
