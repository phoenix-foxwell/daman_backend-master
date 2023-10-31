const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var moment = require("moment");

//TABLES DECLARATION
const table_reservation = db.table_reservation;

// 1 resturent
// 2 swimming pool
// 3 theater
// 4 pool /snooker table
// 5 kids room

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
            console.log(req.body);
            const data = await table_reservation
              .create(req.body)
              .then(async (res_user) => {
                console.log(res_user);
                return res.status(200).json({
                  status: false,
                  message: "Table Reservation added.",
                });
              });
            // console.log(data);
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

  get_table_reservation_list = async (req, res) => {
    try {
      const query = {
        type: req.body.type,
      };
      if (!(req.body.user_id == null || req.body.user_id == undefined)) {
        query["user_id"] = req.body.user_id;
      }

      await table_reservation
        .findAll({
          where: query,
          // where: {
          //   user_id: req.body.user_id,
          //   type: req.body.type,
          // },
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
        message: "Oops something went wrong.",
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
              message: "Oops something went wrong.",
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        status: false,
        message: "Oops something went wrong.",
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
        message: "Oops something went wrong.",
        data: error,
      });
    }
  };

  update_table_reservation_status = async (req, res) => {
    try {
      let data = req.body;
      await table_reservation
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
module.exports = new TableReservationController();
