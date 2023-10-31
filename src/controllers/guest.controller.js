const config = require("../../config/config");
//DB DECLARATION
const db = require("../models");
const jwt = require("jsonwebtoken");
const Op = db.Sequelize.Op;
var moment = require("moment");

//TABLES DECLARATION
const guests = db.guests;

//USER CONTROLLER
class GuestsController {
  add_guest = async (req, res) => {
    try {
      await guests
        .findOne({
          where: { mobile_no: req.body.mobile_no },
        })
        .then(async (res_user) => {
          if (res_user) {
            return res.status(200).json({
              status: true,
              message: "Already user is added.",
            });
          } else {
            await guests.create(req.body).then(async (res_user) => {
              return res.status(200).json({
                status: false,
                message: "Guest added.",
              });
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

  get_guest_list = async (req, res) => {
    try {
      // let visitdate=req.body.visitdate?req.body.visitdate:moment().format("YYYY-MM-DD");
      await guests
        .findAll({
          where: { user_id: req.body.user_id },
          order: [["visitdate", "DESC"]],
        })
        .then(async (res_user) => {
          if (res_user && res_user.length > 0) {
            return res.status(200).json({
              status: true,
              message: "Guests found.",
              data: res_user,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Guest not found.",
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

  update_guest = async (req, res) => {
    try {
      let data = req.body;

      await guests
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
            await db.guests
              .update(update_obj, { where: { id: data.id }, limit: 1 })
              .then(async (update_res) => {
                return res.status(200).json({
                  status: true,
                  message: "Guest updated successfully",
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

  get_all_guest = async (req, res) => {
    try {
      await guests
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
              message: "Guests found.",
              data: res_user,
            });
          } else {
            return res.status(200).json({
              status: false,
              message: "Guest not found.",
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
}

module.exports = new GuestsController();
