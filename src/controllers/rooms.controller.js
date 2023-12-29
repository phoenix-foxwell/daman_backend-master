const e = require("express");
const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var moment = require("moment");

//TABLES DECLARATION
const rooms = db.rooms;
const room_reservation = db.room_reservation;
const users = db.users;
const wallet_trans = db.wallet_trans;

// .query(
//   `SELECT sum(quantity) as total,room_id FROM tbl_room_reservations where from_date ='${from_date}' or to_date = '${to_date}' group by room_id`,
//   { type: db.sequelize.QueryTypes.SELECT }
// )

//USER CONTROLLER

// let isavailable = get_room_reservation.find(
//   (item) => item.room_id == element.id
// );

// if (
//   typeof isavailable != "undefined" &&
//   isavailable.total == element.qty
// ) {
//   continue;
// }
// if (
//   typeof isavailable != "undefined" &&
//   isavailable.total < element.qty
// ) {
//   element.qty = element.qty - isavailable.total;
// }

class RoomsController {
  get_room_list = async (req, res) => {
    try {
      let from_date = req.body.from_date
        ? req.body.from_date
        : moment().format("YYYY-MM-DD");
      let to_date = req.body.to_date
        ? req.body.to_date
        : moment().format("YYYY-MM-DD");

      const get_room_reservation = await db.sequelize.query(
        `SELECT * FROM tbl_room_reservations where from_date ='${from_date}' or to_date = '${to_date}' group by room_id`,
        { type: db.sequelize.QueryTypes.SELECT }
      );

      if (get_room_reservation) {
        const res_user = await rooms.findAll({
          where: { status: true },
        });

        let room_array = [];

        for (let i = 0; i < res_user.length; i++) {
          let element = res_user[i].dataValues;

          let isRoomAvailable = get_room_reservation.every((reservation) => {
            if (reservation.room_id != element.id) {
              return true;
            }

            const r_f_date = moment(reservation.from_date);
            const r_t_date = moment(reservation.to_date);

            return (
              moment(from_date).isAfter(r_t_date) ||
              moment(to_date).isBefore(r_f_date)
            );
          });

          if (isRoomAvailable) {
            room_array.push(element);
          }
        }

        if (room_array.length > 0) {
          return res.status(200).json({
            status: true,
            message: "Rooms found.",
            data: room_array,
          });
        } else {
          return res.status(200).json({
            status: false,
            message: "Rooms not found.",
          });
        }
      } else {
        return res.status(200).json({
          status: false,
          message: "Not available.",
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

  room_reservation = async (req, res) => {
    try {
      let data = req.body;
      let user_data = await users.findOne({ where: { id: data.user_id } });
      await db.sequelize
        .query(
          `SELECT * FROM tbl_room_reservations where room_id=${data.room_id} and (from_date in ('${data.from_date}','${data.to_date}'))`,
          { type: db.sequelize.QueryTypes.SELECT }
        )
        .then(async (resp) => {
          if (resp) {
            if (user_data.dataValues.walletbalance >= data.price) {
              await room_reservation.create(req.body).then(async (resps) => {
                await users.update(
                  {
                    walletbalance:
                      user_data.dataValues.walletbalance - data.price,
                  },
                  { where: { id: user_data.id }, limit: 1 }
                );
                await wallet_trans.create({
                  user_id: user_data.dataValues.id,
                  amount: data.price,
                  credit_debit: 2,
                  machine_id: 2,
                  mode: 4,
                });
                return res.status(200).json({
                  status: true,
                  message: "Room booked.",
                });
              });
            } else {
              return res.status(200).json({
                status: false,
                message: "Please Recharge your wallet.",
              });
            }
          } else {
            return res.status(200).json({
              status: false,
              message: "Not available.",
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

  manager_room_reservation = async (req, res) => {
    try {
      let data = req.body;
      let user_data = await users.findOne({ where: { id: data.user_id } });
      await db.sequelize
        .query(
          `SELECT * FROM tbl_room_reservations where room_id=${data.room_id} and (from_date in ('${data.from_date}','${data.to_date}'))`,
          { type: db.sequelize.QueryTypes.SELECT }
        )
        .then(async (resp) => {
          if (resp) {
            if (user_data.dataValues.walletbalance >= data.price) {
              await room_reservation.create(req.body).then(async (resps) => {
                if (data.transaction_details.toLowerCase() == "wallet") {
                  await wallet_trans.create({
                    user_id: user_data.dataValues.id,
                    amount: data.price,
                    credit_debit: 2,
                    machine_id: 2,
                    mode: 4,
                  });
                }
                return res.status(200).json({
                  status: true,
                  message: "Room booked.",
                });
              });
            } else {
              return res.status(200).json({
                status: false,
                message: "Please Recharge your wallet.",
              });
            }
          } else {
            return res.status(200).json({
              status: false,
              message: "Not available.",
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

  get_room_reservation = async (req, res) => {
    try {
      let data = req.body;
      await room_reservation
        .findAll({
          order: [["from_date", "DESC"]],
          where: { user_id: data.user_id },
        })
        .then(async (resp) => {
          if (resp.length > 0) {
            return res.status(200).json({
              status: true,
              message: "Rooms found.",
              data: resp,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Rooms not available.",
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

  get_all_room_list = async (req, res) => {
    try {
      await room_reservation
        .findAll({
          order: [["from_date", "DESC"]],
        })
        .then(async (resp) => {
          if (resp.length > 0) {
            return res.status(200).json({
              status: true,
              message: "Rooms found.",
              data: resp,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Rooms not available.",
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

  update_room_status = async (req, res) => {
    try {
      let data = req.body;
      await room_reservation
        .update({ status: data.status }, { where: { id: data.id }, limit: 1 })
        .then(async (resp) => {
          if (resp) {
            return res.status(200).json({
              status: true,
              message: "Item Updated found.",
              data: resp,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Items not found.",
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

module.exports = new RoomsController();
