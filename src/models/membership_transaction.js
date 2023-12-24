module.exports = (sequelize, Sequelize) => {
  const MembershipTransaction = sequelize.define(
    "tbl_membership_trans",
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
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      relation_member: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      membershiptype_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      start_date: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: Sequelize.literal("GETDATE"),
      },
      end_date: {
        type: Sequelize.STRING(255),
        allowNull: false,
        default: Sequelize.literal("GETDATE"),
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

  return MembershipTransaction;
};

// amount:{
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     defaultValue: 0
// },
// payment_type: {
//     type: Sequelize.STRING(255),
//     allowNull: true
// },

// card_no: {
//     type: Sequelize.STRING(255),
//     allowNull: true,
//   },

// paymentref: {
//     type: Sequelize.STRING(255),
//     allowNull: true,
//   },
