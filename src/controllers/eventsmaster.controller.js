const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");

//TABLES DECLARATION
const events_master = db.events_master;
const event_transaction = db.event_transaction;
const wallet_trans = db.wallet_trans;
const users = db.users;

const Op = db.Sequelize.Op;

//USER CONTROLLER
class EventsMasterController {
  get_event_master = async (req, res) => {
    const data = req.body;
    try {
      await events_master
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

    function parseDate(dateString) {
      const parts = dateString.split("-");
      return new Date(parts[2], parts[1] - 1, parseInt(parts[0]) + 1);
    }

    function parseDateHours(dateString) {
      const [datePart, timePart, period] = dateString.split(" ");
      const [day, month, year] = datePart.split("-");
      const [hours, minutes] = timePart.split(":");

      let adjustedHours = parseInt(hours);

      if (period === "PM") {
        adjustedHours += 12;
      }

      const localDate = new Date(
        Date.UTC(year, month - 1, day, adjustedHours, parseInt(minutes))
      );
      return localDate;
    }

    const duration = data.duraction;
    const dayshours = data.daysHours;
    const startDate =
      dayshours == 0
        ? parseDate(data.start_datetime)
        : parseDateHours(data.start_datetime);

    let endDate;

    // duration in days
    if (dayshours == 0) {
      endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    } else {
      endDate = new Date(startDate.getTime() + duration * 60 * 60 * 1000);
    }

    try {
      const res_user = await users.findOne({
        where: { id: req.body.user_id },
      });

      if (res_user) {
        const findevent = await event_transaction.findOne({
          where: {
            user_id: data.user_id,
            status: 1,
            event_venue: data.event_venue,
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
            if (data.pay_mode.toLowerCase() == "wallet") {
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
                  start_date: startDate.toISOString(),
                  end_date: endDate.toISOString(),
                  event_venue: data.event_venue,
                  pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                  pay_status: data.pay_status,
                  pay_ref: "SoMeThInG fOr NoW",
                  event_description: data.event_description,
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
                    data: {},
                  });
                }
                // main code for gest end start from here
              }
            } else {
              // if user donsen't select wallet

              const addevent = await event_transaction.create({
                user_id: data.user_id,
                amount: data.amount,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                event_venue: data.event_venue,
                pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                pay_status: data.pay_status,
                pay_ref: "SoMeThInG fOr NoW",
                event_description: data.event_description,
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
                  data: {},
                });
              }
            }
          }
        } else {
          if (data.pay_mode.toLowerCase() == "wallet") {
            //check user select wallet
            if (data.amount > res_user.dataValues.walletbalance) {
              return res.status(200).json({
                status: false,
                message: "Insufficient wallet balance.",
                data: {},
              });
            } else {
              // main code for gest start from here
              const addevent = await event_transaction.create({
                user_id: data.user_id,
                amount: data.amount,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                event_venue: data.event_venue,
                pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
                pay_status: data.pay_status,
                pay_ref: "SoMeThInG fOr NoW",
                event_description: data.event_description,
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
                  data: {},
                });
              }
              // main code for gest end start from here
            }
          } else {
            // if user donsen't select wallet
            const addevent = await event_transaction.create({
              user_id: data.user_id,
              amount: data.amount,
              start_date: startDate.toISOString(),
              end_date: endDate.toISOString(),
              event_venue: data.event_venue,
              pay_mode: getpaymentmode(data.pay_mode.toLowerCase()),
              pay_status: data.pay_status,
              pay_ref: "SoMeThInG fOr NoW",
              event_description: data.event_description,
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
                data: {},
              });
            }
          }
        }
      } else {
        return res.status(200).json({
          status: false,
          message: "User not found.",
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
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

  get_name_event = async (req, res) => {
    const data = req.body;
    try {
      const event_data = await event_transaction.findAll({
        where: {
          event_venue: data.event_venue,
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
          message: "No evnets found.",
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
  get_all_event = async (req, res) => {
    try {
      const event_data = await event_transaction.findAll({
        where: {
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
          message: "No evnets found.",
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
