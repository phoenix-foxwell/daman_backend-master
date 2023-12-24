const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");

//TABLES DECLARATION
const activities_master = db.activities_master;
const activity_transaction = db.activity_transaction;
const wallet_trans = db.wallet_trans;
const users = db.users;

const Op = db.Sequelize.Op;

//USER CONTROLLER
class ActivitiesMasterController {
  get_activity_master = async (req, res) => {
    const data = req.body;
    try {
      await activities_master
        .findAll({
          where: data.user_id
            ? { user_id: data.user_id, status: 1 }
            : {
                status: 1,
              },
        })
        .then(async (res_user) => {
          if (res_user) {
            let filtered = res_user.filter(function (el) {
              return el.end_date >= new Date().toISOString();
            });

            return res.status(200).json({
              status: true,
              message: "Club activity found.",
              data: filtered,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Guest not found.",
            });
          }
        });
    } catch (error) {
      return res.status(200).json({
        status: false,
        message: "Oops something went wrong.",
        data: error,
      });
    }
  };

  add_activity = async (req, res) => {
    const getpaymentmode = (value) => {
      switch (value.toLowerCase()) {
        case "cash":
          return "1";
        case "front desk":
          return "2";
        case "online":
          return "3";
        case "wallet":
          return "4";
        default:
          return "1";
      }
    };

    const data = req.body;
    try {
      const fromDate = new Date().toISOString();

      // Assuming data.validity is the number of days
      const validityInDays = data.validity;
      const validityEndDate = new Date(
        new Date().getTime() + validityInDays * 24 * 60 * 60 * 1000
      ).toISOString();

      const addactivity = await activity_transaction.create({
        user_id: data.user_id,
        amount: data.amount,
        from_date: fromDate,
        to_date: validityEndDate,
        activity_name: data.activity_name,
        pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
        transaction_details: data.transaction_details,
        transaction_date: new Date().toISOString(),
        pay_status: data.pay_status,
        remark: data.remark,
        status: 1,
        updated_by: data.updated_user_id,
      });

      if (addactivity) {
        const res_user = await users.findOne({
          where: { id: req.body.user_id },
        });

        if (res_user) {
          const user_wallet = await users.update(
            {
              walletbalance: res_user.dataValues.walletbalance - data.amount,
            },
            { where: { id: data.user_id }, limit: 1 }
          );

          if (user_wallet) {
            const res_wallet_trans = await wallet_trans.create({
              user_id: data.user_id,
              amount: data.amount,
              credit_debit: 2,
              machine_id: 1,
              mode: getpaymentmode(data.pay_mode),
            });

            if (res_wallet_trans) {
              return res.status(200).json({
                status: true,
                message: "Club activity created.",
                data: addactivity,
              });
            } else {
              return res.status(200).json({
                status: false,
                message: "Oops something went wrong.",
              });
            }
          } else {
            return res.status(200).json({
              status: false,
              message: "Oops something went wrong.",
              data: error,
            });
          }
        } else {
          return res.status(200).json({
            status: false,
            message: "User not found.",
            data: error,
          });
        }
      } else {
        return res.status(200).json({
          status: false,
          message: "Oops something went wrong.",
          data: error,
        });
      }
    } catch (error) {
      return res.status(200).json({
        status: false,
        message: "Oops something went wrong.",
        data: error,
      });
    }
  };

  get_user_activity = async (req, res) => {
    const data = req.body;
    try {
      await activity_transaction
        .findAll({
          where: {
            user_id: data.user_id,
            status: 1,
          },
        })
        .then(async (res_user) => {
          if (res_user) {
            return res.status(200).json({
              status: true,
              message: "Club activity found.",
              data: res_user,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Guest not found.",
            });
          }
        });
    } catch (error) {
      return res.status(200).json({
        status: false,
        message: "Oops something went wrong.",
        data: error,
      });
    }
  };
}

module.exports = new ActivitiesMasterController();
