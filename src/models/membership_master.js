module.exports = (sequelize, Sequelize) => {
  const MembershipMaster = sequelize.define(
    "tbl_membership_master",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      membership_type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      membership_amt: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      membership_gst: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      membership_period: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      no_of_family_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      no_of_secondary_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      start_date: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      end_date: {
        type: Sequelize.STRING(255),
        allowNull: true,
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

  return MembershipMaster;
};
