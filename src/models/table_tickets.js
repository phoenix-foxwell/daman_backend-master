module.exports = (sequelize, Sequelize) => {
  const WalletTransaction = sequelize.define(
    "tbl_tickets",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      mobile: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      date: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      menu: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      category: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      problems: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      message: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      assign_to: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      menager_remark: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: "0",
      },
      type: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
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

  return WalletTransaction;
};
