const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");

//TABLES DECLARATION
const activities_master = db.activities_master;
const event_transaction = db.event_transaction;
const wallet_trans = db.wallet_trans;
const users = db.users;

const Op = db.Sequelize.Op;

//USER CONTROLLER
class EventsMasterController {
  get_event_master = async (req, res) => {
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
              message: "Club event found.",
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

  add_event = async (req, res) => {
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

      const res_user = await users.findOne({
        where: { id: req.body.user_id },
      });

      if (res_user) {
        // check if user is guest
        if (data.membership_type.toLowerCase() == "guest") {
          if (data.transaction_details.toLowerCase() == "wallet") {
            //check user select wallet
            if (data.amount > res_user.dataValues.walletbalance) {
              return res.status(200).json({
                status: false,
                message: "Insufficient wallet balance.",
                data: error,
              });
            } else {
              // main code for gest start from here

              const addevent = await event_transaction.create({
                user_id: data.user_id,
                amount: data.amount,
                from_date: fromDate,
                to_date: fromDate,
                event_name: data.event_name,
                pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                transaction_details: data.transaction_details,
                transaction_date: new Date().toISOString(),
                pay_status: data.pay_status,
                remark: data.remark,
                status: 1,
                updated_by: data.updated_user_id,
              });

              if (addevent) {
                const user_wallet = await users.update(
                  {
                    walletbalance:
                      res_user.dataValues.walletbalance - data.amount,
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
                      message: "Club event created.",
                      data: addevent,
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
                  });
                }
              } else {
                return res.status(200).json({
                  status: false,
                  message: "Oops something went wrong.",
                  data: error,
                });
              }
              // main code for gest end start from here
            }
          } else {
            // if user donsen't select wallet

            const addevent = await event_transaction.create({
              user_id: data.user_id,
              amount: data.amount,
              from_date: fromDate,
              to_date: fromDate,
              event_name: data.event_name,
              pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
              transaction_details: data.transaction_details,
              transaction_date: new Date().toISOString(),
              pay_status: data.pay_status,
              remark: data.remark,
              status: 1,
              updated_by: data.updated_user_id,
            });
            if (addevent) {
              return res.status(200).json({
                status: true,
                message: "Club event created for guest.",
                data: addevent,
              });
            } else {
              return res.status(200).json({
                status: false,
                message: "Oops something went wrong.",
                data: error,
              });
            }
          }
        } else {
          // if user is not guest
          const findevent = await event_transaction.findOne({
            where: {
              user_id: data.user_id,
              status: 1,
              event_name: data.event_name,
            },
            order: [["created_at", "DESC"]],
          });

          if (findevent) {
            if (findevent.dataValues.to_date > new Date().toISOString()) {
              return res.status(200).json({
                status: false,
                message: "User event active.",
              });
            } else {
              if (data.transaction_details.toLowerCase() == "wallet") {
                //check user select wallet
                if (data.amount > res_user.dataValues.walletbalance) {
                  return res.status(200).json({
                    status: false,
                    message: "Insufficient wallet balance.",
                  });
                } else {
                  // main code for gest start from here
                  const addevent = await event_transaction.create({
                    user_id: data.user_id,
                    amount: data.amount,
                    from_date: fromDate,
                    to_date: validityEndDate,
                    event_name: data.event_name,
                    pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                    transaction_details: data.transaction_details,
                    transaction_date: new Date().toISOString(),
                    pay_status: data.pay_status,
                    remark: data.remark,
                    status: 1,
                    updated_by: data.updated_user_id,
                  });

                  if (addevent) {
                    const user_wallet = await users.update(
                      {
                        walletbalance:
                          res_user.dataValues.walletbalance - data.amount,
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
                          message: "Club event created.",
                          data: addevent,
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
                      });
                    }
                  } else {
                    return res.status(200).json({
                      status: false,
                      message: "Oops something went wrong.",
                      data: error,
                    });
                  }
                  // main code for gest end start from here
                }
              } else {
                // if user donsen't select wallet

                const addevent = await event_transaction.create({
                  user_id: data.user_id,
                  amount: data.amount,
                  from_date: fromDate,
                  to_date: validityEndDate,
                  event_name: data.event_name,
                  pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                  transaction_details: data.transaction_details,
                  transaction_date: new Date().toISOString(),
                  pay_status: data.pay_status,
                  remark: data.remark,
                  status: 1,
                  updated_by: data.updated_user_id,
                });
                if (addevent) {
                  return res.status(200).json({
                    status: true,
                    message: "Club event created for guest.",
                    data: addevent,
                  });
                } else {
                  return res.status(200).json({
                    status: false,
                    message: "Oops something went wrong.",
                    data: error,
                  });
                }
              }
            }
          } else {
            if (data.transaction_details.toLowerCase() == "wallet") {
              //check user select wallet
              if (data.amount > res_user.dataValues.walletbalance) {
                return res.status(200).json({
                  status: false,
                  message: "Insufficient wallet balance.",
                  data: error,
                });
              } else {
                // main code for gest start from here
                const addevent = await event_transaction.create({
                  user_id: data.user_id,
                  amount: data.amount,
                  from_date: fromDate,
                  to_date: validityEndDate,
                  event_name: data.event_name,
                  pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                  transaction_details: data.transaction_details,
                  transaction_date: new Date().toISOString(),
                  pay_status: data.pay_status,
                  remark: data.remark,
                  status: 1,
                  updated_by: data.updated_user_id,
                });

                if (addevent) {
                  const user_wallet = await users.update(
                    {
                      walletbalance:
                        res_user.dataValues.walletbalance - data.amount,
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
                        message: "Club event created.",
                        data: addevent,
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
                    });
                  }
                } else {
                  return res.status(200).json({
                    status: false,
                    message: "Oops something went wrong.",
                    data: error,
                  });
                }
                // main code for gest end start from here
              }
            } else {
              // if user donsen't select wallet

              const addevent = await event_transaction.create({
                user_id: data.user_id,
                amount: data.amount,
                from_date: fromDate,
                to_date: validityEndDate,
                event_name: data.event_name,
                pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                transaction_details: data.transaction_details,
                transaction_date: new Date().toISOString(),
                pay_status: data.pay_status,
                remark: data.remark,
                status: 1,
                updated_by: data.updated_user_id,
              });
              if (addevent) {
                return res.status(200).json({
                  status: true,
                  message: "Club event created for guest.",
                  data: addevent,
                });
              } else {
                return res.status(200).json({
                  status: false,
                  message: "Oops something went wrong.",
                  data: error,
                });
              }
            }
          }
        }
      } else {
        return res.status(200).json({
          status: false,
          message: "User not found.",
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

  get_user_event = async (req, res) => {
    const data = req.body;
    try {
      const event_data = await event_transaction.findAll({
        where: {
          user_id: data.user_id,
          status: 1,
        },
      });

      if (event_data) {
        return res.status(200).json({
          status: true,
          message: "Club event found.",
          data: event_data,
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "Guest not found.",
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
}

module.exports = new EventsMasterController();
