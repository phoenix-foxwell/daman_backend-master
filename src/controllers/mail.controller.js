var sgMail = require("@sendgrid/mail");
const db = require("../models");
const Op = db.Sequelize.Op;
// sgMail.setApiKey(process.env.SEND_GRID);

//TABLES DECLARATION
const table_tickets = db.table_tickets;

class MailController {
  contact = async (req, res) => {
    var data = req.body;

    sgMail.setApiKey(process.env.SEND_GRID);

    const msg = {
      to: "smartechwebworks@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Contact Us",
      html: `<h2>A new contact us request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Email: ${data.email} </p><p>Message: ${data.message}</p>`,
    };

    try {
      await sgMail.send(msg);

      const dataresponse = await table_tickets.create({
        name: data.name,
        email: data.email,
        message: data.message,
        type: "1",
      });

      if (dataresponse) {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: false, message: "Something want wrong.Try Again!" });
    }
  };

  enquiry = async (req, res) => {
    var data = req.body;

    // sgMail.setApiKey(
    //   "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"
    // );

    sgMail.setApiKey(process.env.SEND_GRID);

    const msg = {
      to: "thedamanclub@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Enquiry",
      html: `<h2>A new enquiry request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Mobile Number: ${data.mobile} </p><p>Date: ${data.date}</p><p>Enquiry For: ${data.menu} </p><p>Message: ${data.message}</p>`,
    };

    try {
      await sgMail.send(msg);
      const dataresponse = await table_tickets.create({
        name: data.name,
        mobile: data.mobile,
        date: data.date,
        menu: data.menu,
        message: data.message,
        type: "2",
      });
      if (dataresponse) {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      }
    } catch (error) {
      return res
        .status(200)
        .json({ status: false, message: "Something want wrong.Try Again!" });
    }
  };

  complaint = async (req, res) => {
    var data = req.body;

    // sgMail.setApiKey(
    //   "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"
    // );

    sgMail.setApiKey(process.env.SEND_GRID);

    const msg = {
      to: "thedamanclub@gmail.com",
      from: "contact.thedamanclub@gmail.com",
      subject: "Complaint",
      html: `<h2>A new Complaint request has bee generated, Details as follows.</h2><h3>Name: ${data.name}</h3><p>Email: ${data.email} </p><p>Mobile Number: ${data.mobile}</p><p>Category: ${data.category}</p><p>Problem: ${data.subcategory}</p><p>Problem Description: ${data.message}</p><p>Ticket Number: ${data.ticket}</p>`,
    };

    try {
      await sgMail.send(msg);
      const dataresponse = await table_tickets.create({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        category: data.category,
        problems: data.subcategory,
        message: data.message,
        type: "3",
      });
      if (dataresponse) {
        return res
          .status(200)
          .json({ status: true, message: "Mail sent successfully." });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      }
    } catch (error) {
      return res
        .status(200)
        .json({ status: false, message: "Something want wrong.Try Again!" });
    }
  };
  getcec = async (req, res) => {
    const dataresponse = await table_tickets.findAll();

    if (dataresponse) {
      return res.status(200).json({
        status: true,
        message: "User data found.",
        data: dataresponse,
      });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Something want wrong.Try Again!" });
    }
  };

  updatecec = async (req, res) => {
    const data = req.body;

    const updatedata = Object.assign({}, data);
    delete updatedata.id;

    try {
      const dataresponse = await table_tickets.update(
        {
          ...updatedata,
        },
        { where: { id: data.id } }
      );

      if (dataresponse) {
        return res
          .status(200)
          .json({ status: true, message: "Data updated successfully." });
      } else {
        return res
          .status(200)
          .json({ status: false, message: "Something want wrong.Try Again!" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ status: false, message: "Something want wrong.Try Again!" });
    }
  };
}

module.exports = new MailController();
