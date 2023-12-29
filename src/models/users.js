module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "tbl_users",
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
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      mobile_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alt_mobile_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      marital_status: {
        type: Sequelize.ENUM,
        values: ["SINGLE", "MARRIED"],
        defaultValue: "SINGLE",
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["MALE", "FEMALE", "OTHERS"],
        defaultValue: "MALE",
      },
      role: {
        type: Sequelize.ENUM,
        values: [
          "ADMIN",
          "ACCOUNTANT",
          "MEMBER",
          "GUEST",
          "FRONTDESK",
          "RESTAURANT",
          "ROOMGUEST",
          "EVENTGUEST",
          "ACTIVITYMEMBER",
          "MANAGER",
          "ASSTMANAGER",
          "STAFF",
        ],
        defaultValue: "MEMBER",
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      pincode: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      membership_transction_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      type_of_membership: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      photo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      dob: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      access_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fingerprint: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      card_serial_no: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      relation: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      membershipuserid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      walletbalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      membership_start_date: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: "0",
      },
      membership_end_date: {
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
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );

  return Users;
};

