const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var moment = require("moment");

//TABLES DECLARATION
const table_reservation = db.table_reservation;

//USER CONTROLLER
class TableReservationController {
  add_table_reservation = async (req, res) => {
    try {
      await table_reservation
        .findOne({
          where: { user_id: req.body.mobile_no },
        })
        .then(async (res_user) => {
          if (res_user) {
            return res.status(200).json({
              status: true,
              message: "Already user is added.",
            });
          } else {
            await table_reservation.create(req.body).then(async (res_user) => {
              return res.status(200).json({
                status: false,
                message: "Table Reservation added.",
              });
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        status: false,
        message: "Opps something went wrong.",
        data: error,
      });
    }
  };

  get_table_reservation_list = async (req, res) => {
    try {
      // let visitdate=req.body.visitdate?req.body.visitdate:moment().format("YYYY-MM-DD");
      await table_reservation
        .findAll({
          where: { user_id: req.body.user_id },
          order: [["visitdate", "DESC"]],
        })
        .then(async (res_user) => {
          if (res_user && res_user.length > 0) {
            return res.status(200).json({
              status: true,
              message: "Table Reservation found.",
              data: res_user,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Table Reservation not found.",
              data: [],
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        status: false,
        message: "Opps something went wrong.",
        data: error,
      });
    }
  };

  update_table_reservation = async (req, res) => {
    try {
      let data = req.body;

      await table_reservation
        .findOne({
          where: { id: data.id },
        })
        .then(async (res_user) => {
          if (res_user) {
            let update_obj = {
              mobile_no: data.mobile_no,
              name: data.name,
              visitdate: data.visitdate,
            };
            await db.table_reservation
              .update(update_obj, { where: { id: data.id }, limit: 1 })
              .then(async (update_res) => {
                return res.status(200).json({
                  status: true,
                  message: "Table Reservation updated successfully",
                });
              });
          } else {
            return res.status(200).json({
              status: false,
              message: "Opps something went wrong.",
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        status: false,
        message: "Opps something went wrong.",
        data: error,
      });
    }
  };

  get_all_table_reservation = async (req, res) => {
    try {
      await table_reservation
        .findAll({
          where: {
            // visitdate: {
            //   [Op.lt]: new Date(),
            //   [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            // },
          },
        })
        .then(async (res_user) => {
          if (res_user.length > 0) {
            return res.status(200).json({
              status: true,
              message: "Table Reservation found.",
              data: res_user,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Table Reservation not found.",
              data: [],
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        status: false,
        message: "Opps something went wrong.",
        data: error,
      });
    }
  };
}

module.exports = new TableReservationController();
